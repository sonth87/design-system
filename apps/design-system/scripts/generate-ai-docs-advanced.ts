
import * as ts from "typescript";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROJECT_ROOT = path.resolve(__dirname, "../");
const COMPONENTS_DIR = path.resolve(PROJECT_ROOT, "src/components");
const STORIES_DIR = path.resolve(PROJECT_ROOT, "src/stories");
const OUTPUT_FILE = path.resolve(PROJECT_ROOT, "dist/AI_CONTEXT.md");

// Ensure dist exists
if (!fs.existsSync(path.dirname(OUTPUT_FILE))) {
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
}

interface ComponentInfo {
  name: string;
  importPath: string;
  description: string;
  propsDefinition: string;
  example: string;
}

function getComponentDirectories(): string[] {
  if (!fs.existsSync(COMPONENTS_DIR)) return [];
  return fs.readdirSync(COMPONENTS_DIR).filter((item) => {
    return fs.statSync(path.join(COMPONENTS_DIR, item)).isDirectory();
  });
}

function findComponentEntryFile(dir: string): string | null {
  const componentName = path.basename(dir);
  const compTsx = path.join(dir, `${componentName}.tsx`);
  if (fs.existsSync(compTsx)) return compTsx;

  const indexTs = path.join(dir, "index.ts");
  if (fs.existsSync(indexTs)) return indexTs;

  return null;
}

function generateComponentInfo(
  componentName: string,
  checker: ts.TypeChecker,
  program: ts.Program
): ComponentInfo {
  const componentDir = path.join(COMPONENTS_DIR, componentName);
  const entryFile = findComponentEntryFile(componentDir);

  let info: ComponentInfo = {
    name: componentName,
    importPath: `@sth87/shadcn-design-system/${componentName.toLowerCase()}`,
    description: "",
    propsDefinition: "No explicit Props type definition found.",
    example: ""
  };

  if (!entryFile) return info;

  const sourceFile = program.getSourceFile(entryFile);
  if (!sourceFile) {
      console.log(`  ❌ Source file not found: ${entryFile}`);
      return info;
  }

  const moduleSymbol = checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) {
      console.log(`  ❌ Module symbol not found for: ${entryFile}`);
      // Fallback: iterate top-level statements
      ts.forEachChild(sourceFile, (node) => {
          if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
              if (node.name.getText() === `${componentName}Props` || node.name.getText().endsWith("Props")) {
                   // Clean up the text
                   info.propsDefinition = node.getText().replace(/^export\s+/, "");
                   console.log(`  ✅ Found Props via fallback scan: ${node.name.getText()}`);
              }
          }
      });
  } else {
      const exports = checker.getExportsOfModule(moduleSymbol);

      // 1. Description
      let componentSymbol = exports.find(s => s.name === componentName || s.name === "default");
      if (componentSymbol) {
           if (componentSymbol.flags & ts.SymbolFlags.Alias) {
               componentSymbol = checker.getAliasedSymbol(componentSymbol);
           }
           const doc = ts.displayPartsToString(componentSymbol.getDocumentationComment(checker));
           if (doc) info.description = doc;
      }

      // 2. Props
      let propsSymbol = exports.find(s => s.name === `${componentName}Props`);
      if (!propsSymbol) {
          propsSymbol = exports.find(s => s.name.endsWith("Props") && s.name !== "VariantProps");
      }

      if (propsSymbol) {
          if (propsSymbol.flags & ts.SymbolFlags.Alias) {
               propsSymbol = checker.getAliasedSymbol(propsSymbol);
           }

           // Try to get the text from the declaration directly
           const declaration = propsSymbol.declarations?.[0];
           if (declaration) {
               const rawText = declaration.getText();
               // Clean up the text: remove 'export' keyword to make it a local definition in the context doc
               info.propsDefinition = rawText.replace(/^export\s+/, "");
           } else {
               // Fallback to type string
               const propsType = checker.getTypeOfSymbolAtLocation(propsSymbol, propsSymbol.valueDeclaration!);
               info.propsDefinition = `type ${propsSymbol.name} = ${checker.typeToString(propsType)}`;
           }
      }
  }

  // 3. Example from Stories
  const storyFile = path.join(STORIES_DIR, `${componentName}.stories.tsx`);
  if (fs.existsSync(storyFile)) {
      const storyContent = fs.readFileSync(storyFile, "utf-8");

      const defaultStoryRegex = /export const Default.*?\=\s*(\(.*?\)\s*=>\s*\(.*?\);)/s;
      const match = storyContent.match(defaultStoryRegex);

      if (match && match[1]) {
          let exampleCode = match[1];
          info.example = `const Example = ${exampleCode}`;
      } else {
           const anyStoryRegex = /export const ([A-Za-z0-9_]+).*?\=\s*(\(.*?\)\s*=>\s*\(.*?\);)/s;
           const matchAny = storyContent.match(anyStoryRegex);
           if (matchAny && matchAny[2]) {
                info.example = `// Example from ${matchAny[1]} Story\nconst Example = ${matchAny[2]}`;
           }
      }
  }

  return info;
}

function generateDocs() {
  console.log("🚀 Starting AI Documentation Generation (AST Mode)...");

  const configFile = ts.findConfigFile(PROJECT_ROOT, ts.sys.fileExists, "tsconfig.json");
  if (!configFile) {
      console.error("❌ Could not find tsconfig.json");
      process.exit(1);
  }

  const parsedConfig = ts.readConfigFile(configFile, ts.sys.readFile);
  const compilerOptions = ts.parseJsonConfigFileContent(
      parsedConfig.config,
      ts.sys,
      path.dirname(configFile)
  ).options;

  const componentDirs = getComponentDirectories();
  const files: string[] = [];

  componentDirs.forEach(dir => {
      const entry = findComponentEntryFile(path.join(COMPONENTS_DIR, dir));
      if (entry) files.push(entry);
  });

  const program = ts.createProgram(files, compilerOptions);
  const checker = program.getTypeChecker();

  let mdContent = `# Design System AI Context

This file is auto-generated to assist AI Agents in understanding the Component Library.

## Usage Guidelines
1. **Imports**: Components are exported from the root or subpaths.
   - Preferred: \`import { Button } from "@sth87/shadcn-design-system/button"\`
   - Or: \`import { Button } from "@sth87/shadcn-design-system"\`
2. **Styling**: All components accept a \`className\` prop which overrides internal styles using \`tailwind-merge\`.

## Component Reference

`;

  componentDirs.forEach(compName => {
      console.log(`Processing ${compName}...`);
      const info = generateComponentInfo(compName, checker, program);

      mdContent += `### ${info.name}\n\n`;
      if (info.description) {
          mdContent += `${info.description}\n\n`;
      }

      mdContent += `**Import:** \`${info.importPath}\`\n\n`;

      mdContent += `**Props:**\n\`\`\`typescript\n${info.propsDefinition}\n\`\`\`\n\n`;

      if (info.example) {
          mdContent += `**Example Usage:**\n\`\`\`tsx\n${info.example}\n\`\`\`\n\n`;
      }

      mdContent += `---\n\n`;
  });

  fs.writeFileSync(OUTPUT_FILE, mdContent);
  console.log(`✅ AI Context generated at ${OUTPUT_FILE}`);
}

generateDocs();
