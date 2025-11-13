#!/bin/bash

# 🎯 Test Build Script
# Run this to test the complete build process

set -e  # Exit on error

echo "🧹 Cleaning previous build..."
pnpm run clean

echo ""
echo "📦 Building library (ESM + CJS)..."
pnpm run build:lib

echo ""
echo "📝 Generating TypeScript declarations..."
pnpm run build:types

echo ""
echo "🔄 Generating exports map..."
pnpm run build:exports

echo ""
echo "✅ Build complete!"
echo ""
echo "📊 Build output:"
du -sh dist/
echo ""
echo "ESM output:"
du -sh dist/esm/
echo ""
echo "CJS output:"
du -sh dist/cjs/
echo ""
echo "Types output:"
du -sh dist/types/

echo ""
echo "📁 Directory structure:"
tree -L 2 dist/ || ls -R dist/

echo ""
echo "🎉 Success! Check the dist/ folder for output."
echo ""
echo "Next steps:"
echo "1. Review dist/ folder structure"
echo "2. Test imports locally with 'npm link'"
echo "3. Update version with 'npm version patch'"
echo "4. Publish with 'npm publish --access public'"
