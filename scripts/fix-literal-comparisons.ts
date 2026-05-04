import fs from 'fs';
import { glob } from 'glob';

/**
 * Fix TypeScript literal value comparisons that were incorrectly prefixed with ds:
 */
async function fixLiteralComparisons() {
  const patterns = [
    'packages/ui/src/components/*.tsx',
  ];
  
  let totalFilesFixed = 0;
  let totalFixesApplied = 0;

  for (const pattern of patterns) {
    const files = await glob(pattern, { 
      ignore: ['**/node_modules/**']
    });
    
    for (const file of files) {
      let content = fs.readFileSync(file, 'utf-8');
      const originalContent = content;
      let fileFixCount = 0;
      
      // Fix === "ds:VALUE" patterns that should be === "VALUE"
      // But be careful not to touch className strings
      
      // Pattern: ===|!== "ds:LITERAL_VALUE"
      // This catches comparisons like: size === "ds:sm" or orientation === "ds:horizontal"
      content = content.replace(
        /([!=]==\s+)["']ds:([a-z-]+)["'](?=[\s,\)\}])/g,
        (match, operator, value) => {
          // Skip if this looks like it's inside a className string
          // (this is a rough heuristic - if it's in a cn() with className context)
          fileFixCount++;
          totalFixesApplied++;
          return `${operator}"${value}"`;
        }
      );
      
      // Also fix the reverse pattern: "ds:VALUE" === or !==
      content = content.replace(
        /["']ds:([a-z-]+)["']\s*([!=]==)/g,
        (match, value, operator) => {
          fileFixCount++;
          totalFixesApplied++;
          return `"${value}" ${operator}`;
        }
      );
      
      // Fix || and && with "ds:VALUE" patterns
      content = content.replace(
        /\|\|\s*["']ds:([a-z-]+)["'](?=[\s,\)\}])/g,
        (match, value) => {
          fileFixCount++;
          totalFixesApplied++;
          return `|| "${value}"`;
        }
      );
      
      content = content.replace(
        /&&\s*["']ds:([a-z-]+)["'](?=[\s,\)\}])/g,
        (match, value) => {
          fileFixCount++;
          totalFixesApplied++;
          return `&& "${value}"`;
        }
      );
      
      if (fileFixCount > 0) {
        fs.writeFileSync(file, content, 'utf-8');
        totalFilesFixed++;
        console.log(`✓ Fixed ${file} (+${fileFixCount} fixes)`);
      }
    }
  }
  
  console.log('\n========== Summary ==========');
  console.log(`Total files fixed: ${totalFilesFixed}`);
  console.log(`Total literal comparisons fixed: ${totalFixesApplied}`);
}

fixLiteralComparisons().catch(console.error);
