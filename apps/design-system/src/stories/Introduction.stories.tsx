import type { Meta } from "@storybook/react";

const meta: Meta = {
  title: "Introduction",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const Documentation = () => (
  <div className="max-w-4xl mx-auto p-8 prose prose-slate dark:prose-invert">
    <h1>Shadcn Design System</h1>

    <p>
      A modern, comprehensive React component library that extends{" "}
      <a
        href="https://ui.shadcn.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Shadcn UI
      </a>{" "}
      with powerful features and enhancements.
    </p>

    <div className="flex gap-2 my-4">
      <a href="https://www.npmjs.com/package/@sth87/shadcn-design-system">
        <img
          src="https://img.shields.io/npm/v/@sth87/shadcn-design-system"
          alt="npm version"
        />
      </a>
      <a href="https://opensource.org/licenses/MIT">
        <img
          src="https://img.shields.io/badge/License-MIT-blue.svg"
          alt="License: MIT"
        />
      </a>
    </div>

    <h2>📚 Documentation</h2>
    <ul>
      <li>
        📖{" "}
        <a
          href="https://design-system-sth-kappa.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Storybook</strong>
        </a>{" "}
        - Interactive component documentation
      </li>
      <li>
        📦{" "}
        <a
          href="https://www.npmjs.com/package/@sth87/shadcn-design-system"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>NPM Package</strong>
        </a>{" "}
        - Latest package on npm
      </li>
    </ul>

    <h2>🚀 Installation</h2>

    <h3>Using npm</h3>
    <pre>
      <code className="language-bash">
        npm install @sth87/shadcn-design-system
      </code>
    </pre>

    <h3>Using pnpm</h3>
    <pre>
      <code className="language-bash">
        pnpm add @sth87/shadcn-design-system
      </code>
    </pre>

    <h3>Using yarn</h3>
    <pre>
      <code className="language-bash">
        yarn add @sth87/shadcn-design-system
      </code>
    </pre>

    <h2>⚙️ Setup</h2>

    <h3>1. Install Peer Dependencies</h3>
    <p>Make sure you have the following peer dependencies installed:</p>
    <pre>
      <code className="language-bash">
        npm install react react-dom tailwindcss
      </code>
    </pre>

    <h3>2. Import Styles</h3>
    <p>
      Import the CSS in your main application file (e.g., <code>main.tsx</code>{" "}
      or <code>App.tsx</code>):
    </p>
    <pre>
      <code className="language-tsx">{`import "@sth87/shadcn-design-system/index.css";`}</code>
    </pre>

    <pre>
      <code className="language-tsx">{`// animation
import "@sth87/shadcn-design-system/animation.css";`}</code>
    </pre>

    <h2>💻 Usage</h2>

    <h3>Basic Example</h3>
    <pre>
      <code className="language-tsx">{`import { Button, Input } from "@sth87/shadcn-design-system";

function App() {
  return (
    <div className="p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Welcome</h1>
      <Input placeholder="Enter your email" className="mb-4" />
      <Button variant="default" className="w-full">
        Get Started
      </Button>
    </div>
  );
}`}</code>
    </pre>

    <h3>Using Hooks</h3>
    <pre>
      <code className="language-tsx">{`import { useDebounce } from "@sth87/shadcn-design-system";
import { useState, useEffect } from "react";

function SearchComponent() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    // API call with debounced value
    if (debouncedSearch) {
      console.log("Searching for:", debouncedSearch);
    }
  }, [debouncedSearch]);

  return <Input value={search} onChange={(e) => setSearch(e.target.value)} />;
}`}</code>
    </pre>

    <h2>🙏 Acknowledgments</h2>
    <p>This project is built on top of:</p>
    <ul>
      <li>
        <a
          href="https://ui.shadcn.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shadcn UI
        </a>{" "}
        - Original component library
      </li>
      <li>
        <a
          href="https://www.radix-ui.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Radix UI
        </a>{" "}
        - Headless UI components
      </li>
      <li>
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Tailwind CSS
        </a>{" "}
        - Utility-first CSS framework
      </li>
      <li>
        <a href="https://react.dev/" target="_blank" rel="noopener noreferrer">
          React
        </a>{" "}
        - UI library
      </li>
    </ul>

    <hr className="my-8" />
    <p className="text-center">
      Made by{" "}
      <a
        href="https://github.com/sonth87"
        target="_blank"
        rel="noopener noreferrer"
      >
        Sonth87
      </a>
    </p>
  </div>
);
