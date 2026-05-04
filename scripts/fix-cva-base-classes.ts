import fs from "fs";
import path from "path";
import { globSync } from "glob";

const componentFiles = globSync(
  "packages/ui/src/components/**/*.tsx",
  { cwd: "/Users/skyline/PROJECTS/design-system" }
);

// Add ds: prefix to each class token (simple approach)
function prefixClassString(str: string): string {
  // Split by spaces, but preserve bracket groups
  const tokens = str.split(/\s+/).filter((t) => t);

  return tokens
    .map((token) => {
      // Already prefixed
      if (token.startsWith("ds:")) {
        return token;
      }

      // Bracket selector patterns like [&>svg]:pointer-events-none
      // These start with [ and contain &, :, or similar pseudo-selectors
      if (token.startsWith("[&") || token.startsWith("[")) {
        // Check if it's a selector or arbitrary value
        // Selectors have & in them: [&>svg], [&.child], etc.
        if (
          token.includes("&") &&
          token.includes("]") &&
          token.includes(":")
        ) {
          // This is a bracket selector like [&_svg]:pointer-events-none
          return token; // Keep as-is
        }
      }

      // Regular classes and utilities get ds: (including arbitrary like transition-[...])
      return "ds:" + token;
    })
    .join(" ");
}

let filesModified = 0;
let classesFixed = 0;

componentFiles.forEach((filePath) => {
  const fullPath = path.join(
    "/Users/skyline/PROJECTS/design-system",
    filePath
  );
  let content = fs.readFileSync(fullPath, "utf-8");
  const originalContent = content;

  // Find cva( calls and extract the first string argument
  // Match: cva\s*\(\s*"..."
  
  content = content.replace(
    /cva\s*\(\s*"([^"]*)"/g,
    (match, classStr) => {
      // Skip if already prefixed
      if (classStr.includes("ds:")) {
        return match;
      }
      const prefixed = prefixClassString(classStr);
      classesFixed++;
      return `cva(\n  "${prefixed}"`;
    }
  );

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, "utf-8");
    filesModified++;
    console.log(`✓ Fixed: ${path.basename(filePath)}`);
  }
});

console.log(`\n========== Summary ==========`);
console.log(`Files checked: ${componentFiles.length}`);
console.log(`Files modified: ${filesModified}`);
console.log(`CVA strings patched: ${classesFixed}`);
