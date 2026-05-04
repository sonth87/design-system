import fs from 'fs';
import path from 'path';

const filesToUpdate = [
  'packages/ui/src/components/badge.tsx',
  'packages/ui/src/components/checkbox.tsx',
  'packages/ui/src/components/radio-group.tsx',
  'packages/ui/src/components/separator.tsx',
  'packages/ui/src/components/switch.tsx',
  'packages/ui/src/components/toggle.tsx',
];

const tailwindUtilities = new Set([
  'flex', 'inline-flex', 'block', 'inline-block', 'inline', 'grid', 'inline-grid',
  'contents', 'table', 'table-row', 'table-cell', 'absolute', 'fixed', 'relative',
  'sticky', 'gap', 'space-x', 'space-y', 'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl', 'm', 'mx',
  'my', 'mt', 'mr', 'mb', 'ml', 'w', 'h', 'min-w', 'min-h', 'max-w', 'max-h',
  'text', 'font', 'leading', 'tracking', 'line-clamp', 'whitespace', 'break',
  'bg', 'border', 'outline', 'ring', 'shadow', 'opacity', 'fill', 'stroke',
  'scale', 'rotate', 'translate', 'skew', 'transform',
  'rounded', 'justify', 'items', 'content', 'self', 'place', 'flex-direction', 'flex-wrap',
  'flex-grow', 'flex-shrink', 'flex-basis', 'order',
  'transition', 'duration', 'delay', 'ease', 'animate', 'animation',
  'hover', 'focus', 'focus-visible', 'active', 'group', 'disabled', 'enabled',
  'visited', 'target', 'first', 'last', 'only', 'even', 'odd',
  'top', 'right', 'bottom', 'left', 'inset', 'z',
  'visible', 'invisible', 'hidden', 'sr-only', 'not-sr-only',
  'blur', 'brightness', 'contrast', 'grayscale', 'hue-rotate', 'invert', 'saturate', 'sepia',
  'drop-shadow', 'backdrop', 'will-change', 'origin', 'perspective',
  'data', 'before', 'after', 'list', 'col', 'row', 'size', 'aspect',
  'sm', 'md', 'lg', 'xl', '2xl', 'dark', 'light', 'has', 'overflow', 'overscroll',
  'min', 'max', 'leading',
]);

const excludeClasses = new Set(['sr-only', 'blur-text', 'text-pressure-title', 'card', 'logo', 'read-the-docs']);

function shouldPrefix(className: string): boolean {
  if (className.startsWith('ds:')) return false;
  if (excludeClasses.has(className)) return false;
  if (className.includes('[') && !className.startsWith('data-') && !className.startsWith('[')) return false;
  
  const baseClass = className.split(':')[0].split('[')[0];
  
  for (const utility of tailwindUtilities) {
    if (baseClass === utility || baseClass.startsWith(utility + '-')) {
      return true;
    }
  }
  
  return false;
}

function prefixClass(className: string): string {
  if (!shouldPrefix(className)) return className;
  return `ds:${className}`;
}

function processClasses(classString: string): string {
  return classString
    .split(/\s+/)
    .filter(Boolean)
    .map(prefixClass)
    .join(' ');
}

function processFile(content: string): string {
  // Process method 1: Simple string literals inside colorVariants objects
  content = content.replace(
    /:\s*"([^"]+)"/g,
    (match, classStr) => {
      // Only process if it looks like a className (contains color or layout keywords)
      if (/border|bg-|text-|rounded|hover|data-\[|transition|height|width|size-|px|py|h-|w-|min-|leading/.test(classStr)) {
        const processed = processClasses(classStr);
        return `: "${processed}"`;
      }
      return match;
    }
  );
  
  return content;
}

async function updateVariants() {
  let totalFiles = 0;
  let filesModified = 0;

  for (const file of filesToUpdate) {
    try {
      if (!fs.existsSync(file)) {
        console.log(`⊘ Skipped (not found): ${path.basename(file)}`);
        continue;
      }
      
      let content = fs.readFileSync(file, 'utf-8');
      const originalContent = content;
      
      totalFiles++;
      
      const processed = processFile(content);
      
      if (processed !== originalContent) {
        fs.writeFileSync(file, processed, 'utf-8');
        filesModified++;
        console.log(`✓ Updated: ${path.basename(file)}`);
      } else {
        console.log(`✓ Already updated: ${path.basename(file)}`);
      }
    } catch (err) {
      console.error(`✗ Error processing ${file}:`, err);
    }
  }
  
  console.log('\n========== Summary ==========');
  console.log(`Total component files: ${totalFiles}`);
  console.log(`Files modified: ${filesModified}`);
}

updateVariants().catch(console.error);
