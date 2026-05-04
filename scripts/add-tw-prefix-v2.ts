import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Tailwind utilities - these are the actual base utilities to match
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
  'visible', 'invisible', 'hidden', 'sr-only',
  'blur', 'brightness', 'contrast', 'grayscale', 'hue-rotate', 'invert', 'saturate', 'sepia',
  'drop-shadow', 'backdrop', 'will-change', 'origin', 'perspective',
  'data', 'before', 'after', 'list', 'col', 'row', 'size', 'aspect',
  'sm', 'md', 'lg', 'xl', '2xl', 'dark', 'light',
]);

// Custom classes to exclude
const excludeClasses = new Set([
  'sr-only', 'blur-text', 'text-pressure-title', 'card', 'logo', 'read-the-docs',
]);

/**
 * Check if a class should be prefixed
 */
function shouldPrefix(className: string): boolean {
  if (className.startsWith('ds:')) return false;
  if (excludeClasses.has(className)) return false;
  if (className.includes('[')) return false;
  
  const baseClass = className.split(':')[0];
  
  for (const utility of tailwindUtilities) {
    if (baseClass === utility || baseClass.startsWith(utility + '-')) {
      return true;
    }
  }
  
  return false;
}

/**
 * Prefix a single class
 */
function prefixClass(className: string): string {
  if (!shouldPrefix(className)) return className;
  return `ds:${className}`;
}

/**
 * Process a className string
 */
function processClasses(classString: string): string {
  return classString
    .split(/\s+/)
    .filter(Boolean)
    .map(prefixClass)
    .join(' ');
}

/**
 * Better regex-based replacement for className attributes
 */
function processFile(content: string, filePath: string): string {
  let modified = false;
  let classesUpdated = 0;
  
  // Process simple className="..." patterns (not in template literals or expressions)
  const singleQuotePattern = /className="([^"]+)"/g;
  content = content.replace(singleQuotePattern, (match, classStr) => {
    const processed = processClasses(classStr);
    if (processed !== classStr) {
      classesUpdated++;
      modified = true;
    }
    return `className="${processed}"`;
  });
  
  // Process className={`...`} with careful handling of ${}
  content = content.replace(
    /className=\{\s*`([^`]*\$\{[^}]*\}[^`]*)`\s*\}/g,
    (match) => {
      // This has expressions, just process the plain class parts (between spaces)
      const inner = match.match(/`([^`]*)`/)?.[1] || '';
      let result = inner;
      
      // Only process parts that are definitely class names (space-separated, no variables)
      const parts = inner.split(/\$\{.*?\}/).map((part, i) => {
        return part
          .split(/\s+/)
          .filter(Boolean)
          .map(cls => {
            if (shouldPrefix(cls)) {
              classesUpdated++;
              modified = true;
              return `ds:${cls}`;
            }
            return cls;
          })
          .join(' ');
      });
      
      let rebuilt = parts[0];
      let exprIndex = 0;
      const exprs = inner.match(/\$\{[^}]*\}/g) || [];
      for (let i = 0; i < exprs.length; i++) {
        rebuilt += exprs[i];
        if (parts[i + 1]) rebuilt += parts[i + 1];
      }
      
      return `className={\`${rebuilt}\`}`;
    }
  );
  
  // Process simple template literals without expressions
  content = content.replace(
    /className=\{\s*`([^$`]+)`\s*\}/g,
    (match, classStr) => {
      const processed = processClasses(classStr);
      if (processed !== classStr) {
        classesUpdated++;
        modified = true;
      }
      return `className={\`${processed}\`}`;
    }
  );
  
  // Process cn(...) calls - careful not to break variables
  content = content.replace(
    /className=\{cn\(\s*"([^"]+)"\s*,/g,
    (match, classStr) => {
      const processed = processClasses(classStr);
      if (processed !== classStr) {
        classesUpdated++;
        modified = true;
        return `className={cn("${processed}",`;
      }
      return match;
    }
  );
  
  return { content, modified, classesUpdated };
}

/**
 * Process all files
 */
async function processFiles() {
  const patterns = [
    'apps/design-system/src/**/*.{tsx,jsx}',
    'packages/ui/src/**/*.{tsx,jsx}',
    'apps/docs/**/*.{tsx,jsx}',
  ];
  
  let totalFiles = 0;
  let filesModified = 0;
  let totalClassesUpdated = 0;

  for (const pattern of patterns) {
    const files = await glob(pattern, { 
      ignore: ['**/node_modules/**', '**/.next/**', '**/dist/**', '**/.claude/**']
    });
    
    for (const file of files) {
      try {
        let content = fs.readFileSync(file, 'utf-8');
        const originalContent = content;
        
        totalFiles++;
        
        const { content: processedContent, modified, classesUpdated } = processFile(content, file);
        content = processedContent;
        
        if (modified) {
          fs.writeFileSync(file, content, 'utf-8');
          filesModified++;
          totalClassesUpdated += classesUpdated;
          console.log(`✓ Updated: ${file} (+${classesUpdated} classes)`);
        }
      } catch (err) {
        console.error(`✗ Error processing ${file}:`, err);
      }
    }
  }
  
  console.log('\n========== Summary ==========');
  console.log(`Total files scanned: ${totalFiles}`);
  console.log(`Files modified: ${filesModified}`);
  console.log(`Classes updated: ${totalClassesUpdated}`);
}

processFiles().catch(console.error);
