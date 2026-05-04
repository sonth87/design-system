import fs from "fs";
import path from "path";
import { globSync } from "glob";

const allFiles = globSync("**/*.tsx", {
  cwd: "/Users/skyline/PROJECTS/design-system",
  ignore: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
});

// Map of incorrectly prefixed keys to revert
const keyFixMap = new Map<string, string>([
  ['"ds:button-group"', '"button-group"'],
  ['"ds:option"', '"option"'],
  ['"ds:circle"', '"circle"'],
  ['"ds:default"', '"default"'],
  ['"ds:rounded"', '"rounded"'],
  ['"ds:outlined"', '"outlined"'],
  ['"ds:filled"', '"filled"'],
  ['"ds:underlined"', '"underlined"'],
  ['"ds:solid"', '"solid"'],
  ['"ds:light"', '"light"'],
  ['"ds:outline"', '"outline"'],
  ['"ds:ghost"', '"ghost"'],
  ['"ds:link"', '"link"'],
  ['"ds:primary"', '"primary"'],
  ['"ds:secondary"', '"secondary"'],
  ['"ds:accent"', '"accent"'],
  ['"ds:destructive"', '"destructive"'],
  ['"ds:muted"', '"muted"'],
  ['"ds:success"', '"success"'],
  ['"ds:error"', '"error"'],
  ['"ds:warning"', '"warning"'],
  ['"ds:foreground"', '"foreground"'],
]);

let filesModified = 0;
let fixesApplied = 0;

allFiles.forEach((filePath) => {
  const fullPath = path.join("/Users/skyline/PROJECTS/design-system", filePath);

  if (!fs.existsSync(fullPath)) return;
  if (!fullPath.includes("/src/")) return;

  let content = fs.readFileSync(fullPath, "utf-8");
  const originalContent = content;

  // Replace incorrect object keys
  keyFixMap.forEach((correct, incorrect) => {
    const pattern = new RegExp(incorrect.replace(/"/g, '\\"'), "g");
    if (pattern.test(content)) {
      content = content.replace(pattern, correct);
      fixesApplied++;
    }
  });

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, "utf-8");
    filesModified++;
    console.log(`✓ Fixed: ${path.basename(filePath)}`);
  }
});

console.log(`\n========== Summary ==========`);
console.log(`Files checked: ${allFiles.length}`);
console.log(`Files modified: ${filesModified}`);
console.log(`Keys reverted: ${fixesApplied}`);
