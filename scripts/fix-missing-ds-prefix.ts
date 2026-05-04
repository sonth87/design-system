import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

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
  // Process simple className="..." patterns
  content = content.replace(
    /className="([^"]+)"/g,
    (match, classStr) => {
      const processed = processClasses(classStr);
      return `className="${processed}"`;
    }
  );
  
  // Process className={`...`} without expressions  
  content = content.replace(
    /className=\{\s*`([^$`]+)`\s*\}/g,
    (match, classStr) => {
      const processed = processClasses(classStr);
      return `className={\`${processed}\`}`;
    }
  );
  
  // Process cn(...) calls with string literals
  content = content.replace(
    /className=\{cn\(\s*"([^"]+)"/g,
    (match, classStr) => {
      const processed = processClasses(classStr);
      return `className={cn("${processed}"`;
    }
  );
  
  return content;
}

async function processComponentFiles() {
  const componentDir = 'packages/ui/src/components';
  const files = await glob(`${componentDir}/*.tsx`, {
    ignore: ['**/node_modules/**']
  });

  let totalFiles = 0;
  let filesModified = 0;

  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf-8');
      const originalContent = content;
      
      totalFiles++;
      
      const processed = processFile(content);
      
      if (processed !== originalContent) {
        fs.writeFileSync(file, processed, 'utf-8');
        filesModified++;
        console.log(`✓ Fixed: ${path.basename(file)}`);
      }
    } catch (err) {
      console.error(`✗ Error processing ${file}:`, err);
    }
  }
  
  console.log('\n========== Summary ==========');
  console.log(`Total component files: ${totalFiles}`);
  console.log(`Files fixed: ${filesModified}`);
}

processComponentFiles().catch(console.error);
