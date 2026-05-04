import fs from "fs";
import path from "path";
import { globSync } from "glob";

const componentFiles = globSync(
  "packages/ui/src/components/**/*.tsx",
  { cwd: "/Users/skyline/PROJECTS/design-system" }
);

// Common tailwind utilities to recognize
const tailwindUtilities = new Set([
  "inline", "flex", "items", "justify", "gap", "p", "px", "py", "m", "mx", "my",
  "bg", "text", "border", "rounded", "w", "h", "size", "min", "max", "leading",
  "font", "transition", "opacity", "cursor", "disabled", "hover", "focus", "dark",
  "data", "group", "sr", "pointer", "shrink", "whitespace", "ring", "aria",
  "motion"
]);

// Check if a string looks like Tailwind classes (not a type/enum value)
function isTailwindClassString(str: string): boolean {
  if (!str) return false;
  // Too short = likely not a class string
  if (str.length < 5) return false;
  // Has dash or space = likely a class string
  if (str.includes("-") || str.includes(" ")) return true;
  // Check if it starts with known Tailwind pattern
  const firstToken = str.split(/[\s\-]/)[0];
  return tailwindUtilities.has(firstToken);
}

// Add ds: prefix to Tailwind class inside a string
function prefixTailwindInString(str: string): string {
  if (str.includes("ds:")) return str; // Already prefixed
  
  const tokens = str.split(/(\s+)/);
  return tokens
    .map((token) => {
      if (!token || /^\s+$/.test(token)) return token;
      if (token.startsWith("ds:")) return token;
      // Skip bracket selectors with &
      if (token.startsWith("[&")) return token;
      // Regular Tailwind class - add prefix
      return "ds:" + token;
    })
    .join("");
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

  // Pattern 1: Simple quoted strings with classes (variant values)
  // Match: : "..." but only if it looks like a class string
  content = content.replace(
    /:\s*"([^"]*)"/g,
    (match, str) => {
      if (
        !str ||
        str.includes("ds:") ||
        str.includes("(") ||
        str.length > 200 ||
        !isTailwindClassString(str)
      ) {
        return match;
      }

      const prefixed = prefixTailwindInString(str);
      if (prefixed !== str) {
        classesFixed++;
        return `: "${prefixed}"`;
      }
      return match;
    }
  );

  // Pattern 2: Strings in arrays
  content = content.replace(
    /,\s*"([^"]*)"/g,
    (match, str) => {
      if (
        !str ||
        str.includes("ds:") ||
        str.includes("(") ||
        str.length > 200 ||
        !isTailwindClassString(str)
      ) {
        return match;
      }

      const prefixed = prefixTailwindInString(str);
      if (prefixed !== str) {
        classesFixed++;
        return `, "${prefixed}"`;
      }
      return match;
    }
  );

  // Pattern 3: Inside cn() - "class string" inside function calls
  content = content.replace(
    /&&\s*"([^"]*)"/g,
    (match, str) => {
      if (
        !str ||
        str.includes("ds:") ||
        str.includes("(") ||
        str.length > 200 ||
        str.includes("${") ||
        !isTailwindClassString(str)
      ) {
        return match;
      }

      const prefixed = prefixTailwindInString(str);
      if (prefixed !== str) {
        classesFixed++;
        return `&& "${prefixed}"`;
      }
      return match;
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
console.log(`Class strings prefixed: ${classesFixed}`);

