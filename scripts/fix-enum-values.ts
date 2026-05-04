import fs from "fs";
import path from "path";
import { globSync } from "glob";

const allFiles = globSync("**/*.tsx", {
  cwd: "/Users/skyline/PROJECTS/design-system",
  ignore: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
});

// Enum/type values that were incorrectly prefixed
// These should ONLY appear in comparisons, assignments, and properties - not as class strings
const enumValues = [
  "absolute",
  "relative", 
  "fixed",
  "horizontal",
  "vertical",
  "horizontal-tb",
  "top",
  "bottom",
  "left",
  "right",
  "lg",
  "sm",
  "xl",
  "xs",
  "preserve-3d",
  "data-cursor-container",
  "group",
  "separator",
  "item",
  "label",
  "checkbox",
  "radio",
];

let filesModified = 0;
let fixesApplied = 0;

allFiles.forEach((filePath) => {
  const fullPath = path.join("/Users/skyline/PROJECTS/design-system", filePath);

  if (!fs.existsSync(fullPath)) return;
  if (!fullPath.includes("/src/")) return;

  let content = fs.readFileSync(fullPath, "utf-8");
  const originalContent = content;

  // Fix enum comparisons and assignments
  // Pattern: === "ds:value" or = "ds:value" where value is an enum
  enumValues.forEach((value) => {
    const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    
    // Comparison pattern: === "ds:value" or = "ds:value"
    content = content.replace(
      new RegExp(`(===|==|!=|!==|=)\\s*"ds:${escapedValue}"`, "g"),
      `$1 "${value}"`
    );

    // Assignment in objects: value: "ds:enum"
    content = content.replace(
      new RegExp(`:\\s*"ds:${escapedValue}"(?=[,}\\s])`, "g"),
      `: "${value}"`
    );

    // Object property access: [sizeClasses["ds:horizontal"]] → [sizeClasses["horizontal"]]
    content = content.replace(
      new RegExp(`\\["ds:${escapedValue}"\\]`, "g"),
      `["${value}"]`
    );

    fixesApplied += (originalContent.match(new RegExp(`ds:${escapedValue}`, "g")) || []).length -
      (content.match(new RegExp(`ds:${escapedValue}`, "g")) || []).length;
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
console.log(`Enum values reverted: ${fixesApplied}`);
