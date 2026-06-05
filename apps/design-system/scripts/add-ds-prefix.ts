#!/usr/bin/env tsx
/**
 * add-ds-prefix.ts
 * Thêm "ds:" prefix vào tất cả Tailwind utility classes trong project.
 *
 * Chạy:
 *   npx tsx apps/design-system/scripts/add-ds-prefix.ts [--dry-run] [--file=path]
 *
 * Options:
 *   --dry-run      Chỉ xem, không ghi file
 *   --file=<path>  Chỉ xử lý 1 file cụ thể (để test)
 */
import {
  Project,
  SyntaxKind,
  Node,
  SourceFile,
  StringLiteral,
  NoSubstitutionTemplateLiteral,
  TemplateExpression,
  VariableDeclaration,
} from "ts-morph";
import * as path from "path";
import { createRequire } from "module";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PREFIX = "ds:";
const DRY_RUN = process.argv.includes("--dry-run");
const FILE_ARG = process.argv.find((a) => a.startsWith("--file="))?.slice(7);

// Tên hàm có arguments chứa class strings
const CLASS_FUNCTIONS = new Set(["cn", "clsx", "cx", "twMerge", "cva", "cvx", "tv"]);

// Suffix tên biến được coi là class map objects
const CLASS_MAP_SUFFIXES = [
  "Variants",
  "Styles",
  "Classes",
  "ClassNames",
  "ClassMap",
  "variants",
  "styles",
  "classes",
  "classNames",
];

// JSX attribute names chứa class strings (class, className, *ClassName)
const CLASS_ATTR_RE = /^(class|className)$|[Cc]lassName$/;

// ── Token transform ───────────────────────────────────────────────────────────

function prefixToken(token: string): string {
  if (!token || token.startsWith(PREFIX)) return token;
  return `${PREFIX}${token}`;
}

/**
 * Thêm ds: vào từng whitespace-separated token, giữ nguyên leading/trailing whitespace
 * và newline/indent bên trong chuỗi nhiều dòng.
 */
function prefixClassString(str: string): string {
  return str.replace(/\S+/g, prefixToken);
}

// ── String / template literal processors ─────────────────────────────────────

function processStringLiteral(node: StringLiteral) {
  const original = node.getLiteralValue();
  if (!original.trim()) return;
  const transformed = prefixClassString(original);
  if (transformed !== original) {
    node.setLiteralValue(transformed);
  }
}

function processNoSubstitutionTemplate(node: NoSubstitutionTemplateLiteral) {
  const raw = node.getText(); // e.g. `flex items-center`
  const inner = raw.slice(1, -1); // strip surrounding backticks
  const transformed = prefixClassString(inner);
  if (transformed !== inner) {
    node.replaceWithText("`" + transformed + "`");
  }
}

function processTemplateExpression(node: TemplateExpression) {
  // `flex ${x} bg-blue` → chỉ transform phần text cứng (quasis), không touch expressions
  // Dùng getText() vì TemplateHead/Middle/Tail không có getLiteralValue() trong mọi version
  const head = node.getHead();
  const headRaw = head.getText(); // e.g. "`flex ${"
  // TemplateHead: strip leading ` and trailing ${
  const headContent = headRaw.slice(1, -2);
  const transformedHead = prefixClassString(headContent);

  const spans = node.getTemplateSpans();
  const spanData = spans.map((span) => {
    const lit = span.getLiteral();
    const litRaw = lit.getText(); // TemplateMiddle: "} foo ${" | TemplateTail: "} foo`"
    const isMiddle = lit.getKind() === SyntaxKind.TemplateMiddle;
    // strip leading } and trailing ${ (middle) or ` (tail)
    const litContent = litRaw.slice(1, isMiddle ? -2 : -1);
    return {
      exprText: span.getExpression().getText(),
      originalLit: litContent,
      transformedLit: prefixClassString(litContent),
    };
  });

  const hasChange =
    transformedHead !== headContent || spanData.some((s) => s.transformedLit !== s.originalLit);

  if (hasChange) {
    let newText = "`" + transformedHead;
    for (const { exprText, transformedLit } of spanData) {
      newText += "${" + exprText + "}" + transformedLit;
    }
    newText += "`";
    node.replaceWithText(newText);
  }
}

// ── Recursive class node processor ───────────────────────────────────────────

/**
 * Process một node mà theo context là "class container".
 * Đệ quy: string, template, array, object (keys only), conditional, nested calls.
 */
function processClassNode(node: Node | undefined) {
  if (!node) return;

  // String literal: process trực tiếp
  if (Node.isStringLiteral(node)) {
    processStringLiteral(node);
    return;
  }

  // Template literals
  if (Node.isNoSubstitutionTemplateLiteral(node)) {
    processNoSubstitutionTemplate(node);
    return;
  }
  if (Node.isTemplateExpression(node)) {
    processTemplateExpression(node);
    return;
  }
  // Tagged template: tw`flex items-center` → process the template part
  if (Node.isTaggedTemplateExpression(node)) {
    processClassNode((node as any).getTemplate());
    return;
  }

  // Array: cn(["flex", "items-center"]) → process từng element
  if (Node.isArrayLiteralExpression(node)) {
    for (const el of node.getElements()) {
      processClassNode(el);
    }
    return;
  }

  // Object: cn({ "opacity-50": disabled, "font-bold": true })
  // ONLY keys = class strings; values = boolean expressions → KHÔNG touch
  if (Node.isObjectLiteralExpression(node)) {
    for (const prop of node.getProperties()) {
      if (Node.isPropertyAssignment(prop)) {
        const nameNode = prop.getNameNode();
        if (Node.isStringLiteral(nameNode)) {
          processStringLiteral(nameNode);
        }
        // value (condition) → KHÔNG process
      }
      if (Node.isSpreadAssignment(prop)) {
        // skip
      }
    }
    return;
  }

  // Conditional: condition ? "text-sm" : "text-lg"
  if (Node.isConditionalExpression(node)) {
    processClassNode(node.getWhenTrue());
    processClassNode(node.getWhenFalse());
    return;
  }

  // Nested call expression: cn(...), clsx(...), cva(...), etc.
  if (Node.isCallExpression(node)) {
    const funcName = getCallName(node);
    if (!funcName) return;
    if (funcName === "cva" || funcName === "cvx") {
      processCvaCall(node);
    } else if (CLASS_FUNCTIONS.has(funcName)) {
      for (const arg of node.getArguments()) {
        processClassNode(arg);
      }
    }
    return;
  }

  // Binary expression: phân biệt theo operator
  if (Node.isBinaryExpression(node)) {
    const opKind = node.getOperatorToken().getKind();
    if (opKind === SyntaxKind.PlusToken) {
      // "flex " + someVar + " items-center" → string concatenation, process cả hai vế
      processClassNode(node.getLeft());
      processClassNode(node.getRight());
    } else if (opKind === SyntaxKind.AmpersandAmpersandToken) {
      // condition && "class-name" → chỉ vế phải là class, vế trái là condition
      processClassNode(node.getRight());
    } else if (
      opKind === SyntaxKind.BarBarToken ||
      opKind === SyntaxKind.QuestionQuestionToken
    ) {
      // fallback || "default-class" → cả hai có thể là class
      processClassNode(node.getLeft());
      processClassNode(node.getRight());
    }
    // ===, !==, <, >, <=, >= → KHÔNG process (comparison operators)
    return;
  }

  // Parenthesized: ("flex items-center")
  if (Node.isParenthesizedExpression(node)) {
    processClassNode(node.getExpression());
    return;
  }

  // JSX expression wrapper: {cn(...)}
  if (Node.isJsxExpression(node)) {
    processClassNode(node.getExpression());
    return;
  }
}

function getCallName(node: Node): string | undefined {
  if (!Node.isCallExpression(node)) return undefined;
  const expr = node.getExpression();
  if (Node.isIdentifier(expr)) return expr.getText();
  if (Node.isPropertyAccessExpression(expr)) return expr.getName();
  return undefined;
}

// ── cva() processor ───────────────────────────────────────────────────────────

function processCvaCall(node: Node) {
  if (!Node.isCallExpression(node)) return;
  const args = node.getArguments();

  // Arg 0: base class string(s)
  if (args[0]) processClassNode(args[0]);

  // Arg 1: config object
  const configArg = args[1];
  if (!configArg || !Node.isObjectLiteralExpression(configArg)) return;

  for (const prop of configArg.getProperties()) {
    if (!Node.isPropertyAssignment(prop)) continue;
    const key = prop.getName();
    const value = prop.getInitializer();
    if (!value) continue;

    if (key === "variants" && Node.isObjectLiteralExpression(value)) {
      // variants: { size: { sm: "h-8 p-2", md: "h-10 p-3" } }
      for (const variantGroup of value.getProperties()) {
        if (!Node.isPropertyAssignment(variantGroup)) continue;
        const groupInit = variantGroup.getInitializer();
        if (!groupInit || !Node.isObjectLiteralExpression(groupInit)) continue;
        for (const variantValue of groupInit.getProperties()) {
          if (!Node.isPropertyAssignment(variantValue)) continue;
          const classNode = variantValue.getInitializer();
          if (classNode) processClassNode(classNode);
        }
      }
    } else if (key === "compoundVariants" && Node.isArrayLiteralExpression(value)) {
      // compoundVariants: [{ size: "sm", class: "font-bold" }]
      for (const el of value.getElements()) {
        if (!Node.isObjectLiteralExpression(el)) continue;
        for (const p of el.getProperties()) {
          if (!Node.isPropertyAssignment(p)) continue;
          const pName = p.getName();
          if (pName === "class" || pName === "className") {
            const cv = p.getInitializer();
            if (cv) processClassNode(cv);
          }
        }
      }
    }
    // defaultVariants: skip — values là variant key names, không phải class
  }
}

// ── Class map processor (cho *Variants, *Styles, *Classes objects) ────────────

/**
 * Đệ quy process tất cả string VALUES trong một object/array.
 * Keys không được process (là variant names: "primary", "sm", "default"...).
 */
function processClassMapValue(node: Node) {
  if (Node.isStringLiteral(node)) {
    processStringLiteral(node);
    return;
  }
  if (Node.isObjectLiteralExpression(node)) {
    for (const prop of node.getProperties()) {
      if (Node.isPropertyAssignment(prop)) {
        const val = prop.getInitializer();
        if (val) processClassMapValue(val);
      }
    }
    return;
  }
  if (Node.isArrayLiteralExpression(node)) {
    for (const el of node.getElements()) {
      processClassMapValue(el);
    }
    return;
  }
}

// ── Per-file processing ───────────────────────────────────────────────────────

function processFile(sourceFile: SourceFile): boolean {
  const before = sourceFile.getFullText();

  // ─ Phase 1: JSX className / *ClassName attributes ─────────────────────────
  for (const attr of sourceFile.getDescendantsOfKind(SyntaxKind.JsxAttribute)) {
    const attrName = attr.getNameNode().getText();
    if (!CLASS_ATTR_RE.test(attrName)) continue;

    const init = attr.getInitializer();
    if (!init) continue;

    if (Node.isStringLiteral(init)) {
      processStringLiteral(init);
    } else if (Node.isJsxExpression(init)) {
      processClassNode(init.getExpression());
    }
  }

  // ─ Phase 2: cn / clsx / twMerge / cva call expressions ───────────────────
  // Lưu ý: dùng Array.from vì getDescendantsOfKind trả iterator và AST mutates
  const calls = Array.from(sourceFile.getDescendantsOfKind(SyntaxKind.CallExpression));
  for (const call of calls) {
    const funcName = getCallName(call);
    if (!funcName) continue;

    if (funcName === "cva" || funcName === "cvx") {
      processCvaCall(call);
    } else if (CLASS_FUNCTIONS.has(funcName)) {
      for (const arg of call.getArguments()) {
        processClassNode(arg);
      }
    }
  }

  // ─ Phase 3: Variable declarations *Variants / *Styles / *Classes ──────────
  const decls = Array.from(
    sourceFile.getDescendantsOfKind(SyntaxKind.VariableDeclaration)
  );
  for (const decl of decls) {
    const name = decl.getName();
    if (!CLASS_MAP_SUFFIXES.some((suffix) => name.endsWith(suffix))) continue;
    const init = decl.getInitializer();
    if (init) processClassMapValue(init);
  }

  // ─ Phase 4: SwitchStatement inside useMemo<string> / functions that return string ─
  // Covers: const x = useMemo<string>(() => { switch(...) { case: return "class1 class2" } })
  // Strategy: find SwitchStatement → scan all ReturnStatement string literals inside
  // Only process when the switch is inside a function whose return type annotation is "string"
  const switches = Array.from(sourceFile.getDescendantsOfKind(SyntaxKind.SwitchStatement));
  for (const sw of switches) {
    // Walk up to find the nearest ArrowFunction / FunctionExpression
    let parent: Node | undefined = sw.getParent();
    let isStringReturner = false;
    while (parent && !Node.isSourceFile(parent)) {
      if (
        Node.isArrowFunction(parent) ||
        Node.isFunctionExpression(parent) ||
        Node.isFunctionDeclaration(parent)
      ) {
        const returnTypeNode = parent.getReturnTypeNode();
        if (returnTypeNode && returnTypeNode.getText().trim() === "string") {
          isStringReturner = true;
        }
        break;
      }
      parent = parent.getParent();
    }
    if (!isStringReturner) continue;

    // Process all ReturnStatement string literals within this switch
    for (const ret of sw.getDescendantsOfKind(SyntaxKind.ReturnStatement)) {
      const expr = ret.getExpression();
      if (expr && Node.isStringLiteral(expr)) {
        processStringLiteral(expr);
      }
    }
  }

  return sourceFile.getFullText() !== before;
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const root = path.resolve(__dirname, "../../..");

  const project = new Project({
    skipAddingFilesFromTsConfig: true,
    skipFileDependencyResolution: true,
  });

  if (FILE_ARG) {
    // Single file mode
    const absPath = path.resolve(FILE_ARG);
    project.addSourceFileAtPath(absPath);
  } else {
    const patterns = [
      `${root}/apps/design-system/src/**/*.{ts,tsx}`,
      `${root}/packages/ui/src/**/*.{ts,tsx}`,
      `${root}/apps/docs/app/**/*.{ts,tsx}`,
      `${root}/apps/docs/components/**/*.{ts,tsx}`,
    ];
    for (const pattern of patterns) {
      project.addSourceFilesAtPaths(pattern);
    }
  }

  const sourceFiles = project.getSourceFiles();
  console.log(`\n📁 Processing ${sourceFiles.length} file(s)${DRY_RUN ? " [DRY RUN]" : ""}...\n`);

  let changed = 0;
  let unchanged = 0;
  let errors = 0;

  for (const sf of sourceFiles) {
    const filePath = path.relative(root, sf.getFilePath());
    try {
      const wasChanged = processFile(sf);
      if (wasChanged) {
        if (!DRY_RUN) await sf.save();
        console.log(`  ✓  ${filePath}`);
        changed++;
      } else {
        unchanged++;
      }
    } catch (e) {
      console.error(`  ✗  ${filePath}`);
      console.error(`     ${e}`);
      errors++;
    }
  }

  console.log("");
  if (DRY_RUN) {
    console.log(`[DRY RUN] ${changed} would be updated, ${unchanged} unchanged, ${errors} errors.`);
  } else {
    console.log(`Done: ${changed} updated, ${unchanged} unchanged, ${errors} errors.`);
  }
}

main().catch(console.error);
