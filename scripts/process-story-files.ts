import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

// Tailwind utilities pattern - matches common Tailwind classes
const tailwindUtilities = new Set([
  // Layout
  'flex', 'inline-flex', 'block', 'inline-block', 'inline', 'grid', 'inline-grid',
  'contents', 'table', 'table-row', 'table-cell', 'absolute', 'fixed', 'relative',
  'sticky', 'float', 'clear', 'display',
  
  // Spacing
  'gap', 'space-x', 'space-y', 'p', 'px', 'py', 'pt', 'pr', 'pb', 'pl', 'm', 'mx',
  'my', 'mt', 'mr', 'mb', 'ml', 'w', 'h', 'min-w', 'min-h', 'max-w', 'max-h',
  
  // Typography
  'text', 'font', 'leading', 'tracking', 'line-clamp', 'whitespace', 'break',
  'text-align', 'text-overflow', 'word-wrap',
  
  // Colors
  'bg', 'text', 'border', 'outline', 'ring', 'shadow', 'opacity', 'fill', 'stroke',
  
  // Transform
  'scale', 'rotate', 'translate', 'skew', 'transform', 'transform-scale', 'transform-rotate',
  
  // Borders
  'border', 'rounded', 'outline',
  
  // Effects
  'blur', 'brightness', 'contrast', 'grayscale', 'hue-rotate', 'invert', 'saturate',
  'sepia', 'drop-shadow', 'backdrop',
  
  // Positioning
  'top', 'right', 'bottom', 'left', 'inset', 'z',
  
  // Visibility
  'visible', 'invisible', 'hidden', 'sr-only', 'not-sr-only', 'opacity', 'display',
  
  // Flexbox
  'justify', 'items', 'content', 'self', 'place', 'flex-direction', 'flex-wrap',
  'flex-grow', 'flex-shrink', 'flex-basis', 'order',
  
  // Transitions & Animation
  'transition', 'duration', 'delay', 'ease', 'animate', 'animation',
  
  // Pseudo-classes
  'hover', 'focus', 'focus-visible', 'active', 'group-hover', 'group-focus',
  'disabled', 'enabled', 'visited', 'target', 'first', 'last', 'only', 'even', 'odd',
  
  // Data attributes
  'data',
  
  // Important
  'important',
  
  // Responsive and other modifiers
  'sm', 'md', 'lg', 'xl', '2xl',
  'dark', 'light',
  'before', 'after', 'first-letter', 'first-line', 'marker', 'selection',
  'backdrop-blur', 'backdrop-brightness', 'backdrop-contrast', 'backdrop-grayscale',
  'backdrop-hue-rotate', 'backdrop-invert', 'backdrop-opacity', 'backdrop-saturate',
  'backdrop-sepia',
  'will-change', 'origin', 'perspective', 'preserve-3d', 'backface-hidden',
  'list', 'list-item', 'columns', 'break-inside', 'col', 'row',
  'size', 'aspect',
]);

// Custom classes to exclude (not Tailwind utilities)
const excludeClasses = new Set([
  'sr-only', // Semantic HTML accessibility class
  'blur-text', // Custom class
  'text-pressure-title', // Custom class
  'card', // Custom class
  'logo', // Custom class
  'read-the-docs', // Custom class
]);

/**
 * Checks if a class should be prefixed
 */
function shouldPrefix(className: string): boolean {
  // Don't prefix if already has ds: prefix
  if (className.startsWith('ds:')) return false;
  
  // Don't prefix custom classes
  if (excludeClasses.has(className)) return false;
  
  // Don't prefix if it contains arbitrary values [...]
  if (className.includes('[')) return false;
  
  // Extract base class (before any :)
  const baseClass = className.split(':')[0];
  
  // Check if this matches any Tailwind pattern
  for (const utility of tailwindUtilities) {
    if (baseClass.startsWith(utility)) {
      return true;
    }
  }
  
  // Check for hyphenated classes that look like Tailwind
  if (/^[\w-]+-(\d+|xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|\d+\/\d+)$/.test(baseClass)) {
    return true;
  }
  
  return false;
}

/**
 * Prefixes a single class name
 */
function prefixClassName(className: string): string {
  if (!shouldPrefix(className)) {
    return className;
  }
  return `ds:${className}`;
}

/**
 * Process a className string value
 */
function processClassNameString(value: string): string {
  // Handle template literals and string interpolations
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map(prefixClassName)
    .join(' ');
}

/**
 * Main function to process story files
 */
async function processStoryFiles() {
  const storyPattern = 'apps/design-system/src/stories/**/*.stories.tsx';
  
  let totalFiles = 0;
  let filesModified = 0;
  let totalClassesUpdated = 0;

  const files = await glob(storyPattern, { 
    ignore: ['**/node_modules/**']
  });
  
  console.log(`Found ${files.length} story files to process...`);
  
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf-8');
    const originalContent = content;
    
    totalFiles++;
    
    // Process className="..." patterns
    content = content.replace(
      /className=["']([^"']+)["']/g,
      (match, classStr) => {
        const processed = processClassNameString(classStr);
        if (processed !== classStr) {
          totalClassesUpdated++;
        }
        return `className="${processed}"`;
      }
    );
    
    // Process className={...} patterns with template literals
    content = content.replace(
      /className={\s*`([^`]+)`\s*}/g,
      (match, classStr) => {
        const processed = processClassNameString(classStr);
        if (processed !== classStr) {
          totalClassesUpdated++;
        }
        return `className={\`${processed}\`}`;
      }
    );
    
    // Process className={cn(...)} patterns
    content = content.replace(
      /className=\{cn\(([^)]+)\)\}/g,
      (match, cnArg) => {
        // This is more complex - need to handle individual strings within cn()
        const processed = cnArg.replace(
          /["']([^"']+)["']/g,
          (strMatch, str) => {
            const processed = processClassNameString(str);
            if (processed !== str) {
              totalClassesUpdated++;
            }
            return `"${processed}"`;
          }
        );
        return `className={cn(${processed})}`;
      }
    );
    
    if (content !== originalContent) {
      fs.writeFileSync(file, content, 'utf-8');
      filesModified++;
      console.log(`✓ Updated: ${file}`);
    }
  }
  
  console.log('\n========== Summary ==========');
  console.log(`Total story files scanned: ${totalFiles}`);
  console.log(`Files modified: ${filesModified}`);
  console.log(`Classes updated: ${totalClassesUpdated}`);
}

processStoryFiles().catch(console.error);
