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
    isDark: boolean
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
      v.cssVar === cssVar ? { ...v, value: newColor } : v
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
      v.cssVar === cssVar ? { ...v, value: newValue } : v
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
    <div className="ds:p-8 ds:bg-background ds:min-h-screen">
      <div className="ds:max-w-7xl ds:mx-auto ds:space-y-8">
        {/* Header */}
        <div className="ds:space-y-4">
          <div className="ds:flex ds:items-center ds:justify-between">
            <div>
              <h1 className="ds:text-4xl ds:font-bold ds:text-foreground">
                Theme Configuration
              </h1>
              <p className="ds:text-lg ds:text-muted-foreground">
                Chỉnh sửa các biến CSS để thay đổi theme
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="ds:px-4 ds:py-2 ds:bg-primary ds:text-primary-foreground ds:rounded-lg ds:hover:opacity-90 ds:transition-all ds:flex ds:items-center ds:gap-2 ds:shadow-md ds:hover:shadow-lg"
              title={
                isDarkMode ? "Chuyển sang Light Mode" : "Chuyển sang Dark Mode"
              }
            >
              <span className="ds:text-xl">{isDarkMode ? "☀️" : "🌙"}</span>
              <span className="ds:font-medium">
                {isDarkMode ? "Light" : "Dark"}
              </span>
            </button>
          </div>
        </div>

        <div className="ds:grid ds:grid-cols-1 ds:md:grid-cols-2 ds:gap-8">
          {/* Variables List */}
          <section className="ds:space-y-4">
            <div className="ds:space-y-2">
              <h2 className="ds:text-2xl ds:font-semibold ds:text-foreground">
                Danh sách biến Theme
              </h2>
              <p className="ds:text-sm ds:text-muted-foreground">
                {themeVariables.length} biến CSS được phân nhóm
              </p>
            </div>

            {/* Group by category */}
            {["base", "brand", "surface", "state", "chart", "sidebar"].map(
              (groupName) => {
                const groupVariables = themeVariables.filter(
                  (v) => v.group === groupName
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
                  <div key={groupName} className="ds:space-y-2">
                    <h3 className="ds:text-sm ds:font-semibold ds:text-foreground ds:uppercase ds:tracking-wide ds:opacity-60">
                      {groupLabels[groupName]}
                    </h3>
                    <div className="ds:grid ds:grid-cols-1 ds:lg:grid-cols-2 ds:gap-1">
                      {groupVariables.map((variable) => (
                        <div
                          key={variable.cssVar}
                          className="ds:flex ds:items-center ds:gap-3 ds:p-3 ds:rounded-md ds:border ds:border-border ds:bg-card ds:hover:bg-accent ds:transition-colors ds:group"
                        >
                          {variable.category === "color" ? (
                            <label
                              className="ds:w-10 ds:h-10 ds:rounded ds:border ds:border-border ds:shadow-sm ds:flex-shrink-0 ds:cursor-pointer ds:hover:scale-110 ds:transition-transform ds:relative ds:overflow-hidden"
                              style={{ backgroundColor: variable.value }}
                              title="Click để chọn màu"
                            >
                              <input
                                type="color"
                                value={variable.value}
                                onChange={(e) =>
                                  handleColorChange(
                                    variable.cssVar,
                                    e.target.value
                                  )
                                }
                                className="ds:absolute ds:inset-0 ds:w-full ds:h-full ds:opacity-0 ds:cursor-pointer"
                              />
                            </label>
                          ) : variable.category === "size" ? (
                            <div className="ds:w-10 ds:h-10 ds:rounded ds:border ds:border-border ds:bg-muted ds:flex-shrink-0 ds:flex ds:items-center ds:justify-center ds:group/radius ds:relative">
                              <span className="ds:text-xs ds:font-mono ds:text-muted-foreground ds:cursor-pointer">
                                📏
                              </span>
                              <div className="ds:absolute ds:left-0 ds:ml-0 ds:hidden ds:group-hover/radius:block ds:z-10 ds:bg-popover ds:border ds:border-border ds:rounded-lg ds:py-3 ds:px-6 ds:shadow-lg ds:w-56">
                                <div className="ds:space-y-2">
                                  <label className="ds:text-xs ds:font-medium ds:text-foreground ds:block">
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
                                        `${e.target.value}rem`
                                      )
                                    }
                                    className="ds:w-full ds:h-2 ds:bg-muted ds:rounded-lg ds:appearance-none ds:cursor-pointer ds:accent-primary"
                                  />
                                  <div className="ds:flex ds:justify-between ds:text-xs ds:text-muted-foreground">
                                    <span>0rem</span>
                                    <span>1rem</span>
                                    <span>2rem</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="ds:w-10 ds:h-10 ds:rounded ds:border ds:border-border ds:bg-muted ds:flex-shrink-0 ds:flex ds:items-center ds:justify-center">
                              <span className="ds:text-xs ds:font-mono ds:text-muted-foreground">
                                📏
                              </span>
                            </div>
                          )}
                          <div className="ds:flex-1 ds:min-w-0">
                            <div className="ds:flex ds:items-baseline ds:gap-2">
                              <span className="ds:font-medium ds:text-foreground ds:text-sm">
                                {variable.name}
                              </span>
                            </div>
                            <div className="ds:flex ds:items-baseline ds:gap-2">
                              <span className="ds:text-xs ds:text-muted-foreground ds:truncate">
                                {variable.description}
                              </span>
                            </div>
                            <div className="ds:text-xs ds:font-mono ds:text-muted-foreground ds:mt-0.5">
                              {variable.cssVar}:{" "}
                              <span className="ds:text-foreground">
                                {variable.value}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }
            )}
          </section>

          {/* Theme Editor */}
          <section className="ds:space-y-4 ds:lg:sticky ds:lg:top-8 ds:lg:self-start">
            <div className="ds:space-y-2">
              <h2 className="ds:text-2xl ds:font-semibold ds:text-foreground">
                Theme Editor
              </h2>
              <p className="ds:text-sm ds:text-muted-foreground">
                Copy CSS này vào file theme.css của bạn để áp dụng theme
              </p>
            </div>
            <div className="ds:space-y-4">
              <div className="ds:relative">
                <textarea
                  value={textareaValue}
                  onChange={handleTextareaChange}
                  className="ds:w-full ds:h-[600px] ds:p-4 ds:rounded-lg ds:border ds:border-border ds:bg-card ds:text-foreground ds:font-mono ds:text-sm ds:resize-none ds:focus:outline-none ds:focus:ring-2 ds:focus:ring-ring"
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
                  className="ds:absolute ds:top-4 ds:right-4 ds:px-3 ds:py-1.5 ds:bg-primary ds:text-primary-foreground ds:rounded-md ds:hover:opacity-90 ds:transition-opacity ds:text-xs ds:font-medium ds:shadow-md"
                  title="Copy to clipboard"
                >
                  {isCopied ? (
                    <>
                      <span className="ds:inline-block ds:animate-scale">✓</span>{" "}
                      Copied!
                    </>
                  ) : (
                    <>📋 Copy CSS</>
                  )}
                </button>
              </div>
              <div className="ds:bg-muted ds:p-4 ds:rounded-lg ds:space-y-2">
                <h3 className="ds:text-sm ds:font-semibold ds:text-foreground">
                  💡 Hướng dẫn sử dụng:
                </h3>
                <ul className="ds:text-xs ds:text-muted-foreground ds:space-y-1 ds:list-disc ds:list-inside">
                  <li>
                    <strong>Light mode:</strong> Copy CSS từ{" "}
                    <code className="ds:bg-background ds:px-1 ds:rounded">:root</code> và
                    paste vào file CSS của bạn
                  </li>
                  <li>
                    <strong>Dark mode:</strong> Copy CSS từ{" "}
                    <code className="ds:bg-background ds:px-1 ds:rounded">.dark</code> và
                    paste vào file CSS của bạn
                  </li>
                  <li>
                    Format màu:{" "}
                    <code className="ds:bg-background ds:px-1 ds:rounded">#ffffff</code>{" "}
                    hoặc{" "}
                    <code className="ds:bg-background ds:px-1 ds:rounded">
                      rgb(255, 255, 255)
                    </code>
                    hoặc{" "}
                    <code className="ds:bg-background ds:px-1 ds:rounded">
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
            <div className="ds:space-y-4 ds:pt-4">
              <h3 className="ds:text-lg ds:font-semibold ds:text-foreground">
                Preview Components
              </h3>
              <div className="ds:space-y-3">
                <div className="ds:bg-card ds:text-card-foreground ds:rounded-lg ds:border ds:border-border ds:p-4">
                  <h4 className="ds:font-semibold ds:mb-2">Card Component</h4>
                  <p className="ds:text-sm ds:text-muted-foreground ds:mb-3">
                    This is a card with current theme colors.
                  </p>
                  <div className="ds:flex ds:gap-2 ds:flex-wrap">
                    <button className="ds:px-4 ds:py-2 ds:bg-primary ds:text-primary-foreground ds:rounded-md ds:hover:opacity-90 ds:transition-opacity ds:text-sm">
                      Primary
                    </button>
                    <button className="ds:px-4 ds:py-2 ds:bg-secondary ds:text-secondary-foreground ds:rounded-md ds:hover:opacity-90 ds:transition-opacity ds:text-sm">
                      Secondary
                    </button>
                    <button className="ds:px-4 ds:py-2 ds:bg-destructive ds:text-destructive-foreground ds:rounded-md ds:hover:opacity-90 ds:transition-opacity ds:text-sm">
                      Destructive
                    </button>
                  </div>
                </div>

                <div className="ds:bg-card ds:text-card-foreground ds:rounded-lg ds:border ds:border-border ds:p-4">
                  <h4 className="ds:font-semibold ds:mb-2">State color</h4>
                  <p className="ds:text-sm ds:text-muted-foreground ds:mb-3">
                    This is a card with current theme state colors.
                  </p>
                  <div className="ds:flex ds:gap-2 ds:flex-wrap">
                    <button className="ds:px-4 ds:py-2 ds:bg-success ds:text-success-foreground ds:rounded-md ds:hover:opacity-90 ds:transition-opacity ds:text-sm">
                      Success
                    </button>
                    <button className="ds:px-4 ds:py-2 ds:bg-error ds:text-error-foreground ds:rounded-md ds:hover:opacity-90 ds:transition-opacity ds:text-sm">
                      Error
                    </button>
                    <button className="ds:px-4 ds:py-2 ds:bg-warning ds:text-warning-foreground ds:rounded-md ds:hover:opacity-90 ds:transition-opacity ds:text-sm">
                      Warning
                    </button>
                  </div>
                </div>

                <div className="ds:bg-muted ds:text-muted-foreground ds:rounded-lg ds:p-4">
                  <h4 className="ds:font-semibold ds:mb-2">Muted Section</h4>
                  <p className="ds:text-sm">This section uses muted background.</p>
                </div>

                <div className="ds:bg-accent ds:text-accent-foreground ds:rounded-lg ds:p-4">
                  <h4 className="ds:font-semibold ds:mb-2">Accent Section</h4>
                  <p className="ds:text-sm">This section uses accent colors.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
