import React, { useState, useEffect } from "react";
import { LIGHT_THEME, DARK_THEME, getThemeWithValues } from "@/constants/theme";
import type { ThemeVariable } from "@/types/theme";

export const ThemeShowcase: React.FC = () => {
  const [themeVariables, setThemeVariables] = useState<
    Array<ThemeVariable & { value: string }>
  >(getThemeWithValues(LIGHT_THEME));
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [textareaValue, setTextareaValue] = useState("");

  // Format CSS variables with selector
  const formatCSSWithSelector = (
    variables: Array<ThemeVariable & { value: string }>,
    isDark: boolean,
  ) => {
    const selector = isDark ? ".dark" : ":root";
    const cssVars = variables
      .map((v) => `  ${v.cssVar}: ${v.value};`)
      .join("\n");
    return `${selector} {\n${cssVars}\n}`;
  };

  // Initialize textarea with current values
  useEffect(() => {
    const cssText = formatCSSWithSelector(themeVariables, false);
    setTextareaValue(cssText);

    // Check if dark mode is already applied (from Storybook)
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");
    if (isDark && !isDarkMode) {
      setIsDarkMode(true);
      const darkVariables = getThemeWithValues(DARK_THEME);
      setThemeVariables(darkVariables);
      const darkCssText = formatCSSWithSelector(darkVariables, true);
      setTextareaValue(darkCssText);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply theme changes to document root
  const applyTheme = (variables: Array<ThemeVariable & { value: string }>) => {
    const root = document.documentElement;
    variables.forEach((v) => {
      root.style.setProperty(v.cssVar, v.value);
    });
  };

  // Handle color change from color picker
  const handleColorChange = (cssVar: string, newColor: string) => {
    const updatedVariables = themeVariables.map((v) =>
      v.cssVar === cssVar ? { ...v, value: newColor } : v,
    );
    setThemeVariables(updatedVariables);
    applyTheme(updatedVariables);

    // Update textarea
    const cssText = formatCSSWithSelector(updatedVariables, isDarkMode);
    setTextareaValue(cssText);
  };

  // Handle radius change from slider
  const handleRadiusChange = (cssVar: string, newValue: string) => {
    const updatedVariables = themeVariables.map((v) =>
      v.cssVar === cssVar ? { ...v, value: newValue } : v,
    );
    setThemeVariables(updatedVariables);
    applyTheme(updatedVariables);

    // Update textarea
    const cssText = formatCSSWithSelector(updatedVariables, isDarkMode);
    setTextareaValue(cssText);
  };

  // Handle textarea change
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setTextareaValue(value);

    // Parse the textarea content - extract content between { and }
    const match = value.match(/\{([^}]+)\}/);
    if (!match) return;

    const cssContent = match[1];
    const lines = cssContent.split("\n");
    const updatedVariables = [...themeVariables];

    lines.forEach((line) => {
      const varMatch = line.match(/(--[\w-]+):\s*([^;]+);?/);
      if (varMatch) {
        const [, cssVar, newValue] = varMatch;
        const index = updatedVariables.findIndex((v) => v.cssVar === cssVar);
        if (index !== -1) {
          updatedVariables[index] = {
            ...updatedVariables[index],
            value: newValue.trim(),
          };
        }
      }
    });

    setThemeVariables(updatedVariables);
    applyTheme(updatedVariables);
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDarkMode) {
      // Switch to light mode
      root.classList.remove("dark");
      setIsDarkMode(false);
      const lightVariables = getThemeWithValues(LIGHT_THEME);
      setThemeVariables(lightVariables);
      applyTheme(lightVariables);

      // Update textarea
      const cssText = formatCSSWithSelector(lightVariables, false);
      setTextareaValue(cssText);
    } else {
      // Switch to dark mode
      root.classList.add("dark");
      setIsDarkMode(true);
      const darkVariables = getThemeWithValues(DARK_THEME);
      setThemeVariables(darkVariables);
      applyTheme(darkVariables);

      // Update textarea
      const cssText = formatCSSWithSelector(darkVariables, true);
      setTextareaValue(cssText);
    }
  };

  return (
    <div className="p-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                Theme Configuration
              </h1>
              <p className="text-lg text-muted-foreground">
                Chỉnh sửa các biến CSS để thay đổi theme
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all flex items-center gap-2 shadow-md hover:shadow-lg"
              title={
                isDarkMode ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode"
              }
            >
              <span className="text-xl">{isDarkMode ? "☀️" : "🌙"}</span>
              <span className="font-medium">
                {isDarkMode ? "Light" : "Dark"}
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Variables List */}
          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Danh sách biến Theme
              </h2>
              <p className="text-sm text-muted-foreground">
                {themeVariables.length} biến CSS được phân nhóm
              </p>
            </div>

            {/* Group by category */}
            {["base", "brand", "surface", "state", "chart", "sidebar"].map(
              (groupName) => {
                const groupVariables = themeVariables.filter(
                  (v) => v.group === groupName,
                );
                if (groupVariables.length === 0) return null;

                const groupLabels: Record<string, string> = {
                  base: "Base Colors",
                  brand: "Brand Colors",
                  surface: "Surface Colors",
                  state: "State Colors",
                  chart: "Chart Colors",
                  sidebar: "Sidebar Colors",
                };

                return (
                  <div key={groupName} className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide opacity-60">
                      {groupLabels[groupName]}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
                      {groupVariables.map((variable) => (
                        <div
                          key={variable.cssVar}
                          className="flex items-center gap-3 p-3 rounded-md border border-border bg-card hover:bg-accent transition-colors group"
                        >
                          {variable.category === "color" ? (
                            <label
                              className="w-10 h-10 rounded border border-border shadow-sm flex-shrink-0 cursor-pointer hover:scale-110 transition-transform relative overflow-hidden"
                              style={{ backgroundColor: variable.value }}
                              title="Click để chọn màu"
                            >
                              <input
                                type="color"
                                value={variable.value}
                                onChange={(e) =>
                                  handleColorChange(
                                    variable.cssVar,
                                    e.target.value,
                                  )
                                }
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              />
                            </label>
                          ) : variable.category === "size" ? (
                            <div className="w-10 h-10 rounded border border-border bg-muted flex-shrink-0 flex items-center justify-center group/radius relative">
                              <span className="text-xs font-mono text-muted-foreground cursor-pointer">
                                📏
                              </span>
                              <div className="absolute left-0 ml-0 hidden group-hover/radius:block z-10 bg-popover border border-border rounded-lg py-3 px-6 shadow-lg w-56">
                                <div className="space-y-2">
                                  <label className="text-xs font-medium text-foreground block">
                                    Border Radius: {variable.value}
                                  </label>
                                  <input
                                    type="range"
                                    min="0"
                                    max="2"
                                    step="0.125"
                                    value={parseFloat(variable.value)}
                                    onChange={(e) =>
                                      handleRadiusChange(
                                        variable.cssVar,
                                        `${e.target.value}rem`,
                                      )
                                    }
                                    className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                                  />
                                  <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>0rem</span>
                                    <span>1rem</span>
                                    <span>2rem</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-10 h-10 rounded border border-border bg-muted flex-shrink-0 flex items-center justify-center">
                              <span className="text-xs font-mono text-muted-foreground">
                                📏
                              </span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-baseline gap-2">
                              <span className="font-medium text-foreground text-sm">
                                {variable.name}
                              </span>
                            </div>
                            <div className="flex items-baseline gap-2">
                              <span className="text-xs text-muted-foreground truncate">
                                {variable.description}
                              </span>
                            </div>
                            <div className="text-xs font-mono text-muted-foreground mt-0.5">
                              {variable.cssVar}:{" "}
                              <span className="text-foreground">
                                {variable.value}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              },
            )}
          </section>

          {/* Theme Editor */}
          <section className="space-y-4 lg:sticky lg:top-8 lg:self-start">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Theme Editor
              </h2>
              <p className="text-sm text-muted-foreground">
                Copy CSS này vào file theme.css của bạn để áp dụng theme
              </p>
            </div>
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  value={textareaValue}
                  onChange={handleTextareaChange}
                  className="w-full h-[600px] p-4 rounded-lg border border-border bg-card text-foreground font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  spellCheck={false}
                  placeholder=":root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  ...
}"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(textareaValue);
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                  }}
                  className="absolute top-4 right-4 px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-xs font-medium shadow-md"
                  title="Copy to clipboard"
                >
                  {isCopied ? (
                    <>
                      <span className="inline-block animate-scale">✓</span>{" "}
                      Copied!
                    </>
                  ) : (
                    <>📋 Copy CSS</>
                  )}
                </button>
              </div>
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <h3 className="text-sm font-semibold text-foreground">
                  💡 Hướng dẫn sử dụng:
                </h3>
                <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
                  <li>
                    <strong>Light mode:</strong> Copy CSS từ{" "}
                    <code className="bg-background px-1 rounded">:root</code> và
                    paste vào file CSS của bạn
                  </li>
                  <li>
                    <strong>Dark mode:</strong> Copy CSS từ{" "}
                    <code className="bg-background px-1 rounded">.dark</code> và
                    paste vào file CSS của bạn
                  </li>
                  <li>
                    Format màu:{" "}
                    <code className="bg-background px-1 rounded">#ffffff</code>{" "}
                    hoặc{" "}
                    <code className="bg-background px-1 rounded">
                      rgb(255, 255, 255)
                    </code>
                    hoặc{" "}
                    <code className="bg-background px-1 rounded">
                      oklch(1 0.37 62)
                    </code>
                  </li>
                  <li>Radius: Giá trị CSS (ví dụ: 0.625rem, 8px)</li>
                  <li>Thay đổi sẽ được áp dụng ngay lập tức</li>
                  <li>
                    Click vào màu sắc bên trái để thay đổi, hoặc edit trực tiếp
                    trong textarea
                  </li>
                </ul>
              </div>
            </div>

            {/* Preview Section */}
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-foreground">
                Preview Components
              </h3>
              <div className="space-y-3">
                <div className="bg-card text-card-foreground rounded-lg border border-border p-4">
                  <h4 className="font-semibold mb-2">Card Component</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    This is a card with current theme colors.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity text-sm">
                      Primary
                    </button>
                    <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity text-sm">
                      Secondary
                    </button>
                    <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded-md hover:opacity-90 transition-opacity text-sm">
                      Destructive
                    </button>
                  </div>
                </div>

                <div className="bg-card text-card-foreground rounded-lg border border-border p-4">
                  <h4 className="font-semibold mb-2">State color</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    This is a card with current theme state colors.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <button className="px-4 py-2 bg-success text-success-foreground rounded-md hover:opacity-90 transition-opacity text-sm">
                      Success
                    </button>
                    <button className="px-4 py-2 bg-error text-error-foreground rounded-md hover:opacity-90 transition-opacity text-sm">
                      Error
                    </button>
                    <button className="px-4 py-2 bg-warning text-warning-foreground rounded-md hover:opacity-90 transition-opacity text-sm">
                      Warning
                    </button>
                  </div>
                </div>

                <div className="bg-muted text-muted-foreground rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Muted Section</h4>
                  <p className="text-sm">This section uses muted background.</p>
                </div>

                <div className="bg-accent text-accent-foreground rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Accent Section</h4>
                  <p className="text-sm">This section uses accent colors.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
