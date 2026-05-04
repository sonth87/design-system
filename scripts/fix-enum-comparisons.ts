import fs from "fs";
import path from "path";
import { globSync } from "glob";

// Files with enum comparison errors
const filesToFix = [
  "apps/design-system/src/components/Carousel/Carousel.tsx",
  "apps/design-system/src/components/DatePicker/DatePicker.tsx",
  "apps/design-system/src/components/DatePicker/RangePicker.tsx",
  "apps/design-system/src/components/DatePicker/TimePicker.tsx",
  "apps/design-system/src/components/InputOTP/InputOTP.tsx",
  "apps/design-system/src/components/Marquee/Marquee.tsx",
  "apps/design-system/src/components/Select/Select.tsx",
  "apps/design-system/src/components/Stepper/Stepper.tsx",
  "apps/design-system/src/components/Stepper/StepperWrapper.tsx",
  "apps/design-system/src/components/Tabs/Tabs.tsx",
];

// Map of incorrect enum comparisons to correct ones
const enumFixMap: { [key: string]: string } = {
  '"ds:horizontal"': '"horizontal"',
  '"ds:sm"': '"sm"',
  '"ds:lg"': '"lg"',
  '"ds:xl"': '"xl"',
  '"ds:warning"': '"warning"',
  '"ds:wheel"': '"wheel"',
  '"ds:outlined"': '"outlined"',
  '"ds:top"': '"top"',
  '"ds:bottom"': '"bottom"',
  '"ds:right"': '"right"',
  '"ds:left"': '"left"',
  '"ds:vertical"': '"vertical"',
  '"ds:underlined"': '"underlined"',
  'ds:horizontal': "horizontal",
  'ds:vertical': "vertical",
};

let totalModified = 0;

filesToFix.forEach((filePath) => {
  const fullPath = path.join("/Users/skyline/PROJECTS/design-system", filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(fullPath, "utf-8");
  const originalContent = content;

  // Replace incorrect enum comparisons
  Object.entries(enumFixMap).forEach(([incorrect, correct]) => {
    content = content.split(incorrect).join(correct);
  });

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content, "utf-8");
    console.log(`✓ Fixed: ${path.basename(filePath)}`);
    totalModified++;
  }
});

console.log(`\n========== Summary ==========`);
console.log(`Files modified: ${totalModified}`);
