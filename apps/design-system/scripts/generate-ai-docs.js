#!/usr/bin/env node

/**
 * Script to generate AI Context documentation
 * Run this after build
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const srcPath = path.resolve(__dirname, "../src");
const distPath = path.resolve(__dirname, "../dist");

// Ensure dist exists (though it should run after build)
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

function getModulesFromDir(dirName) {
  const dirPath = path.join(srcPath, dirName);
  if (!fs.existsSync(dirPath)) return [];

  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  const modules = [];

  items.forEach((item) => {
    if (item.isDirectory()) {
      // Check if index file or Component file exists
      // Usually in this project structure: components/Button/Button.tsx or components/Button/index.ts
      const componentName = item.name;
      const indexFile = path.join(dirPath, item.name, `index.ts`);
      const componentFile = path.join(dirPath, item.name, `${item.name}.tsx`);

      let entryFile = null;
      if (fs.existsSync(componentFile)) {
        entryFile = componentFile;
      } else if (fs.existsSync(indexFile)) {
        entryFile = indexFile;
      }

      if (entryFile) {
        modules.push({
          name: item.name,
          path: entryFile,
          importPath: `./${item.name.toLowerCase()}` // Based on how generate-exports.js creates exports
        });
      }
    } else if (
        item.isFile() &&
        (item.name.endsWith(".ts") || item.name.endsWith(".tsx"))
      ) {
        // Standalone file
        const name = item.name.replace(/\.tsx?$/, "");
        modules.push({
            name: name,
            path: path.join(dirPath, item.name),
            importPath: `./${name.toLowerCase()}`
        });
      }
  });

  return modules;
}

function extractProps(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf-8");

    // Simple heuristic to extract Props definition
    // Look for "type XProps =" or "interface XProps"
    // This is naive but works for 80% of cases without a full AST parser

    const propsRegex = /(export\s+)?(type|interface)\s+([a-zA-Z0-9_]+Props)\s*(=|\{)/;
    const match = content.match(propsRegex);

    if (match) {
        // If found, try to grab the block.
        // We'll read from the match index until we find the closing brace/semicolon matching logic
        // For simplicity in this naive version, we'll grab the next 20 lines or until a new export

        const startIndex = match.index;
        // Naive block extractor: assume it ends with }; or uses standard indentation
        // Better: just extract the lines around it.

        const lines = content.slice(startIndex).split('\n');
        const extractedLines = [];
        let braceCount = 0;
        let foundStart = false;

        for (const line of lines) {
            extractedLines.push(line);

            if (line.includes('{')) {
                braceCount += (line.match(/\{/g) || []).length;
                foundStart = true;
            }
            if (line.includes('}')) {
                braceCount -= (line.match(/\}/g) || []).length;
            }

            // If we started finding braces and now we are back to 0, we are done
            if (foundStart && braceCount <= 0) break;

            // Safety break for "type X = Y & Z;" (no braces or single line)
            if (line.includes(';') && braceCount === 0) break;

            // Safety limit
            if (extractedLines.length > 50) break;
        }

        return extractedLines.join('\n');
    }

    return "No explicit Props type definition found in main file.";
  } catch (e) {
    return "Error reading props.";
  }
}

function generateContext() {
  const components = getModulesFromDir("components");

  let mdContent = `# Design System AI Context

This file is auto-generated to assist AI Agents in understanding the Component Library.

## Usage Guidelines

1. **Imports**: Components are exported from the root or subpaths.
   - Preferred: \`import { Button } from "@sth87/shadcn-design-system/button"\`
   - Or: \`import { Button } from "@sth87/shadcn-design-system"\` (if supported by tree-shaking)

2. **Styling**: All components accept a \`className\` prop which overrides internal styles using \`tailwind-merge\`.

## Component Reference

`;

  components.forEach(comp => {
    mdContent += `### ${comp.name}\n\n`;
    mdContent += `**Import:** \`@sth87/shadcn-design-system/${comp.name.toLowerCase()}\`\n\n`;

    const propsDef = extractProps(comp.path);
    mdContent += `**Props Definition:**\n\`\`\`typescript\n${propsDef}\n\`\`\`\n\n`;

    mdContent += `---\n\n`;
  });

  const outputPath = path.join(distPath, "AI_CONTEXT.md");
  fs.writeFileSync(outputPath, mdContent);
  console.log(`✅ AI Context generated at ${outputPath}`);
}

generateContext();
