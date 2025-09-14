#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_commander = require("commander");
var import_chalk4 = __toESM(require("chalk"));

// src/commands/init.ts
var import_chalk = __toESM(require("chalk"));
var import_fs3 = require("fs");
var import_inquirer = __toESM(require("inquirer"));
var import_ora = __toESM(require("ora"));
var import_path4 = __toESM(require("path"));
var import_zod2 = require("zod");

// src/utils/config.ts
var import_zod = require("zod");
var import_cosmiconfig = require("cosmiconfig");
var import_path = __toESM(require("path"));
var import_fs_extra = __toESM(require("fs-extra"));
var configSchema = import_zod.z.object({
  style: import_zod.z.enum(["default", "new-york"]).default("default"),
  rsc: import_zod.z.boolean().default(false),
  tsx: import_zod.z.boolean().default(true),
  tailwind: import_zod.z.object({
    config: import_zod.z.string(),
    css: import_zod.z.string(),
    baseColor: import_zod.z.enum(["slate", "gray", "zinc", "neutral", "stone"]).default("slate"),
    cssVariables: import_zod.z.boolean().default(true)
  }),
  aliases: import_zod.z.object({
    components: import_zod.z.string().default("~/components"),
    utils: import_zod.z.string().default("~/lib/utils"),
    ui: import_zod.z.string().default("~/components/ui"),
    lib: import_zod.z.string().default("~/lib"),
    hooks: import_zod.z.string().default("~/hooks")
  })
});
var explorer = (0, import_cosmiconfig.cosmiconfig)("components", {
  searchPlaces: ["components.json"]
});
async function getConfig(cwd) {
  const searchPath = cwd || process.cwd();
  try {
    const result = await explorer.search(searchPath);
    if (!result) {
      return null;
    }
    return configSchema.parse(result.config);
  } catch (error) {
    throw new Error(`Invalid configuration found at ${searchPath}/components.json`);
  }
}
async function resolveConfigPaths(cwd, config) {
  return {
    cwd,
    tailwindConfig: import_path.default.resolve(cwd, config.tailwind.config),
    tailwindCss: import_path.default.resolve(cwd, config.tailwind.css),
    utils: import_path.default.resolve(cwd, config.aliases.utils.replace(/^~\//, "")),
    components: import_path.default.resolve(cwd, config.aliases.components.replace(/^~\//, "")),
    ui: import_path.default.resolve(cwd, config.aliases.ui.replace(/^~\//, "")),
    lib: import_path.default.resolve(cwd, config.aliases.lib.replace(/^~\//, "")),
    hooks: import_path.default.resolve(cwd, config.aliases.hooks.replace(/^~\//, ""))
  };
}
async function writeConfig(cwd, config) {
  const configPath = import_path.default.resolve(cwd, "components.json");
  await import_fs_extra.default.writeJSON(configPath, config, { spaces: 2 });
  return configPath;
}
var DEFAULT_CONFIG = {
  style: "default",
  rsc: false,
  tsx: true,
  tailwind: {
    config: "tailwind.config.js",
    css: "app/globals.css",
    baseColor: "slate",
    cssVariables: true
  },
  aliases: {
    components: "~/components",
    utils: "~/lib/utils",
    ui: "~/components/ui",
    lib: "~/lib",
    hooks: "~/hooks"
  }
};

// src/utils/package-manager.ts
var import_fs = require("fs");
var import_child_process = require("child_process");
var import_path2 = __toESM(require("path"));
async function getPackageManager(cwd) {
  if ((0, import_fs.existsSync)(import_path2.default.resolve(cwd, "pnpm-lock.yaml"))) {
    return "pnpm";
  }
  if ((0, import_fs.existsSync)(import_path2.default.resolve(cwd, "yarn.lock"))) {
    return "yarn";
  }
  if ((0, import_fs.existsSync)(import_path2.default.resolve(cwd, "bun.lockb"))) {
    return "bun";
  }
  if ((0, import_fs.existsSync)(import_path2.default.resolve(cwd, "package-lock.json"))) {
    return "npm";
  }
  const userAgent = process.env.npm_config_user_agent;
  if (userAgent) {
    if (userAgent.startsWith("pnpm"))
      return "pnpm";
    if (userAgent.startsWith("yarn"))
      return "yarn";
    if (userAgent.startsWith("bun"))
      return "bun";
  }
  return "npm";
}
async function installPackages(packageManager, packages, cwd, dev = false) {
  const devFlag = dev ? packageManager === "npm" ? "--save-dev" : "-D" : "";
  const commands = {
    npm: `npm install ${devFlag} ${packages.join(" ")}`,
    pnpm: `pnpm add ${devFlag} ${packages.join(" ")}`,
    yarn: `yarn add ${devFlag} ${packages.join(" ")}`,
    bun: `bun add ${devFlag} ${packages.join(" ")}`
  };
  const command = commands[packageManager];
  (0, import_child_process.execSync)(command, {
    cwd,
    stdio: "inherit"
  });
}

// src/utils/detect.ts
var import_fs2 = require("fs");
var import_fs_extra2 = __toESM(require("fs-extra"));
var import_path3 = __toESM(require("path"));
async function detectFramework(cwd) {
  if ((0, import_fs2.existsSync)(import_path3.default.resolve(cwd, "next.config.js")) || (0, import_fs2.existsSync)(import_path3.default.resolve(cwd, "next.config.ts")) || (0, import_fs2.existsSync)(import_path3.default.resolve(cwd, "next.config.mjs"))) {
    return "next";
  }
  if ((0, import_fs2.existsSync)(import_path3.default.resolve(cwd, "vite.config.js")) || (0, import_fs2.existsSync)(import_path3.default.resolve(cwd, "vite.config.ts"))) {
    return "vite";
  }
  try {
    const packageJsonPath = import_path3.default.resolve(cwd, "package.json");
    if ((0, import_fs2.existsSync)(packageJsonPath)) {
      const packageJson = await import_fs_extra2.default.readJSON(packageJsonPath);
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      if (deps["next"])
        return "next";
      if (deps["vite"])
        return "vite";
      if (deps["@remix-run/dev"])
        return "remix";
      if (deps["gatsby"])
        return "gatsby";
      if (deps["@angular/core"])
        return "angular";
      if (deps["vue"])
        return "vue";
      if (deps["svelte"])
        return "svelte";
    }
  } catch (error) {
  }
  return null;
}
async function detectTailwind(cwd) {
  const configFiles = [
    "tailwind.config.js",
    "tailwind.config.ts",
    "tailwind.config.mjs",
    "tailwind.config.cjs"
  ];
  for (const file of configFiles) {
    if ((0, import_fs2.existsSync)(import_path3.default.resolve(cwd, file))) {
      return true;
    }
  }
  try {
    const packageJsonPath = import_path3.default.resolve(cwd, "package.json");
    if ((0, import_fs2.existsSync)(packageJsonPath)) {
      const packageJson = await import_fs_extra2.default.readJSON(packageJsonPath);
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      if (deps["tailwindcss"])
        return true;
    }
  } catch (error) {
  }
  return false;
}

// src/commands/init.ts
var initOptionsSchema = import_zod2.z.object({
  cwd: import_zod2.z.string().optional(),
  yes: import_zod2.z.boolean().optional()
});
async function initCommand(opts) {
  try {
    const options = initOptionsSchema.parse(opts);
    const cwd = import_path4.default.resolve(options.cwd || process.cwd());
    console.log(import_chalk.default.cyan("Welcome to Liquid UI! \u{1F30A}"));
    console.log("");
    if ((0, import_fs3.existsSync)(import_path4.default.resolve(cwd, "components.json"))) {
      console.log(import_chalk.default.yellow("This project has already been initialized."));
      process.exit(1);
    }
    const packageManager = await getPackageManager(cwd);
    const framework = await detectFramework(cwd);
    const hasTailwind = await detectTailwind(cwd);
    console.log(import_chalk.default.dim("Detected configuration:"));
    console.log(import_chalk.default.dim(`  Framework: ${framework || "Unknown"}`));
    console.log(import_chalk.default.dim(`  Package Manager: ${packageManager}`));
    console.log(import_chalk.default.dim(`  Tailwind CSS: ${hasTailwind ? "Yes" : "No"}`));
    console.log("");
    if (!hasTailwind) {
      console.log(import_chalk.default.red("Tailwind CSS is required for Liquid UI components."));
      console.log(import_chalk.default.dim("Please install Tailwind CSS first: https://tailwindcss.com/docs/installation"));
      process.exit(1);
    }
    let config = { ...DEFAULT_CONFIG };
    if (!options.yes) {
      const answers = await import_inquirer.default.prompt([
        {
          type: "list",
          name: "style",
          message: "Which style would you like to use?",
          choices: [
            { name: "Default", value: "default" },
            { name: "New York", value: "new-york" }
          ],
          default: "default"
        },
        {
          type: "list",
          name: "baseColor",
          message: "Which color would you like to use as base color?",
          choices: [
            { name: "Slate", value: "slate" },
            { name: "Gray", value: "gray" },
            { name: "Zinc", value: "zinc" },
            { name: "Neutral", value: "neutral" },
            { name: "Stone", value: "stone" }
          ],
          default: "slate"
        },
        {
          type: "input",
          name: "globalCss",
          message: "Where is your global CSS file?",
          default: framework === "next" ? "app/globals.css" : "src/index.css",
          validate: (input) => input.length > 0
        },
        {
          type: "confirm",
          name: "rsc",
          message: "Would you like to use React Server Components?",
          default: false,
          when: () => framework === "next"
        },
        {
          type: "input",
          name: "importAlias",
          message: "Configure the import alias for components?",
          default: "~/components",
          validate: (input) => input.length > 0
        },
        {
          type: "input",
          name: "utilsAlias",
          message: "Configure the import alias for utils?",
          default: "~/lib/utils",
          validate: (input) => input.length > 0
        }
      ]);
      config = {
        ...config,
        style: answers.style,
        rsc: answers.rsc || false,
        tailwind: {
          ...config.tailwind,
          css: answers.globalCss,
          baseColor: answers.baseColor
        },
        aliases: {
          ...config.aliases,
          components: answers.importAlias,
          utils: answers.utilsAlias
        }
      };
    }
    const spinner = (0, import_ora.default)("Initializing project...").start();
    try {
      await writeConfig(cwd, config);
      spinner.text = "Configuration created";
      spinner.text = "Installing dependencies...";
      const dependencies = [
        "clsx",
        "tailwind-merge",
        "@liquid-ui/core"
      ];
      await installPackages(packageManager, dependencies, cwd);
      const paths = {
        components: import_path4.default.resolve(cwd, config.aliases.components.replace(/^~\//, "")),
        ui: import_path4.default.resolve(cwd, config.aliases.ui.replace(/^~\//, "")),
        lib: import_path4.default.resolve(cwd, config.aliases.lib.replace(/^~\//, "")),
        hooks: import_path4.default.resolve(cwd, config.aliases.hooks.replace(/^~\//, ""))
      };
      await import_fs3.promises.mkdir(paths.components, { recursive: true });
      await import_fs3.promises.mkdir(paths.ui, { recursive: true });
      await import_fs3.promises.mkdir(paths.lib, { recursive: true });
      await import_fs3.promises.mkdir(paths.hooks, { recursive: true });
      const utilsContent = `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
`;
      await import_fs3.promises.writeFile(import_path4.default.resolve(paths.lib, "utils.ts"), utilsContent);
      spinner.succeed("Project initialized successfully!");
      console.log("");
      console.log(import_chalk.default.green("\u2728 Project initialized! \u2728"));
      console.log("");
      console.log("Now you can add components:");
      console.log("");
      console.log(import_chalk.default.cyan("  npx liquid-ui add button"));
      console.log(import_chalk.default.cyan("  npx liquid-ui add card"));
      console.log(import_chalk.default.cyan("  npx liquid-ui add input"));
      console.log("");
      console.log("Or add all components:");
      console.log("");
      console.log(import_chalk.default.cyan("  npx liquid-ui add --all"));
      console.log("");
    } catch (error) {
      spinner.fail("Failed to initialize project");
      console.error(error);
      process.exit(1);
    }
  } catch (error) {
    console.error(import_chalk.default.red("Failed to initialize project:"), error);
    process.exit(1);
  }
}

// src/commands/add.ts
var import_chalk2 = __toESM(require("chalk"));
var import_fs4 = require("fs");
var import_fs_extra4 = __toESM(require("fs-extra"));
var import_inquirer2 = __toESM(require("inquirer"));
var import_ora2 = __toESM(require("ora"));
var import_path6 = __toESM(require("path"));
var import_zod3 = require("zod");

// src/utils/registry.ts
var COMPONENTS_REGISTRY = {
  "liquid-button": {
    name: "liquid-button",
    description: "Interactive glass button with Apple-style liquid effects",
    dependencies: ["clsx", "@liquid-ui/core"],
    files: [
      {
        name: "components/ui/liquid-button.tsx",
        type: "component",
        content: ""
        // Will be populated from actual component files
      }
    ],
    registryDependencies: ["use-liquid-glass", "use-interactive-glass"]
  },
  "liquid-card": {
    name: "liquid-card",
    description: "Signature glass card with perfect physics and smooth animations",
    dependencies: ["clsx", "@liquid-ui/core"],
    files: [
      {
        name: "components/ui/liquid-card.tsx",
        type: "component",
        content: ""
      }
    ],
    registryDependencies: ["use-liquid-glass", "use-interactive-glass"]
  },
  "liquid-input": {
    name: "liquid-input",
    description: "Glass input field with validation and focus effects",
    dependencies: ["clsx", "@liquid-ui/core"],
    files: [
      {
        name: "components/ui/liquid-input.tsx",
        type: "component",
        content: ""
      }
    ],
    registryDependencies: ["use-liquid-glass"]
  },
  "liquid-modal": {
    name: "liquid-modal",
    description: "Glass modal with backdrop blur and smooth animations",
    dependencies: ["clsx", "@liquid-ui/core", "@radix-ui/react-dialog"],
    files: [
      {
        name: "components/ui/liquid-modal.tsx",
        type: "component",
        content: ""
      }
    ],
    registryDependencies: ["use-liquid-glass", "liquid-portal"]
  },
  "use-liquid-glass": {
    name: "use-liquid-glass",
    description: "Core hook for generating Apple-style glass effects",
    dependencies: ["@liquid-ui/core"],
    files: [
      {
        name: "hooks/use-liquid-glass.ts",
        type: "hook",
        content: ""
      }
    ]
  },
  "use-interactive-glass": {
    name: "use-interactive-glass",
    description: "Hook for interactive glass physics and hover effects",
    dependencies: ["@liquid-ui/core"],
    files: [
      {
        name: "hooks/use-interactive-glass.ts",
        type: "hook",
        content: ""
      }
    ]
  },
  "liquid-portal": {
    name: "liquid-portal",
    description: "Portal component for modals and overlays",
    dependencies: ["@radix-ui/react-portal"],
    files: [
      {
        name: "components/ui/liquid-portal.tsx",
        type: "component",
        content: ""
      }
    ]
  },
  "cn": {
    name: "cn",
    description: "Utility for merging CSS classes",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        name: "lib/utils.ts",
        type: "util",
        content: `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`
      }
    ]
  }
};

// src/utils/fetch.ts
var import_fs_extra3 = __toESM(require("fs-extra"));
var import_path5 = __toESM(require("path"));
var COMPONENT_SOURCE_MAP = {
  "liquid-button": "../../react/src/components/LiquidButton.tsx",
  "liquid-card": "../../react/src/components/LiquidCard.tsx",
  "liquid-input": "../../react/src/components/LiquidInput.tsx",
  "liquid-modal": "../../react/src/components/LiquidModal.tsx",
  "use-liquid-glass": "../../react/src/hooks/useLiquidGlass.ts",
  "use-interactive-glass": "../../react/src/hooks/useInteractiveGlass.ts"
};
async function fetchComponentContent(componentName, fileName) {
  const sourcePath = COMPONENT_SOURCE_MAP[componentName];
  if (!sourcePath) {
    throw new Error(`No source mapping found for component: ${componentName}`);
  }
  try {
    const absolutePath = import_path5.default.resolve(__dirname, sourcePath);
    if (await import_fs_extra3.default.pathExists(absolutePath)) {
      const content = await import_fs_extra3.default.readFile(absolutePath, "utf8");
      return transformComponentForCLI(content, componentName);
    } else {
      throw new Error(`Source file not found: ${absolutePath}`);
    }
  } catch (error) {
    console.error(`Error reading source file for ${componentName}:`, error);
    return getTemplateContent(componentName, fileName);
  }
}
function transformComponentForCLI(content, componentName) {
  let transformedContent = content;
  transformedContent = transformedContent.replace(
    /from ['"]@liquid-ui\/core['"]/g,
    "from '@liquid-ui/core'"
  );
  transformedContent = transformedContent.replace(
    /from ['"]\.\.\//g,
    "from '~/lib/"
  );
  transformedContent = transformedContent.replace(
    /from ['"]\.\.\/hooks\/([^'"]+)['"]/g,
    "from '~/hooks/$1'"
  );
  transformedContent = transformedContent.replace(
    /from ['"]\.\.\/utils\/([^'"]+)['"]/g,
    "from '~/lib/$1'"
  );
  if (transformedContent.includes("clsx")) {
    transformedContent = transformedContent.replace(
      /import { clsx } from ['"]clsx['"]/g,
      "import { cn } from '~/lib/utils'"
    );
    transformedContent = transformedContent.replace(/clsx\(/g, "cn(");
  }
  return transformedContent;
}
function getTemplateContent(componentName, fileName) {
  const templates = {
    "liquid-button": `"use client"

import React, { forwardRef } from 'react'
import { cn } from '~/lib/utils'
import { useLiquidGlass } from '~/hooks/use-liquid-glass'

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'frosted' | 'clear' | 'tinted'
  intensity?: 'subtle' | 'regular' | 'strong'
  children: React.ReactNode
}

const LiquidButton = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ className, variant = 'frosted', intensity = 'regular', children, ...props }, ref) => {
    const { glassStyles } = useLiquidGlass({ variant, intensity })

    return (
      <button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg border border-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50",
          className
        )}
        style={glassStyles}
        {...props}
      >
        {children}
      </button>
    )
  }
)

LiquidButton.displayName = "LiquidButton"

export { LiquidButton }`,
    "use-liquid-glass": `import { useMemo } from 'react'
import type { GlassConfig } from '@liquid-ui/core'
import { LiquidGlassEngine } from '@liquid-ui/core'

interface UseLiquidGlassProps {
  variant?: 'frosted' | 'clear' | 'tinted'
  intensity?: 'subtle' | 'regular' | 'strong'
  opacity?: 'light' | 'regular' | 'strong'
}

export function useLiquidGlass({
  variant = 'frosted',
  intensity = 'regular', 
  opacity = 'regular'
}: UseLiquidGlassProps = {}) {
  const glassStyles = useMemo(() => {
    const engine = new LiquidGlassEngine()
    
    return engine.generateGlassCSS({
      variant,
      intensity,
      opacity
    })
  }, [variant, intensity, opacity])

  return {
    glassStyles,
    glassClasses: \`backdrop-blur-\${intensity} bg-white/\${opacity === 'light' ? '15' : opacity === 'regular' ? '25' : '85'}\`
  }
}`,
    "cn": `import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`
  };
  return templates[componentName] || `// Component template for ${componentName}
export {}`;
}

// src/utils/transform.ts
function transformImports(content, config) {
  let transformedContent = content;
  const aliasMap = {
    "~/components": config.aliases.components,
    "~/lib": config.aliases.lib,
    "~/hooks": config.aliases.hooks,
    "~/utils": config.aliases.utils,
    "~/components/ui": config.aliases.ui
  };
  Object.entries(aliasMap).forEach(([alias, configPath]) => {
    const regex = new RegExp(`from ['"]${alias.replace("~/", "")}([^'"]*?)['"]`, "g");
    transformedContent = transformedContent.replace(regex, `from "${configPath}$1"`);
  });
  if (!config.tsx) {
    transformedContent = transformedContent.replace(/\.tsx?(?=['"])/g, config.rsc ? ".js" : ".jsx");
  }
  if (config.rsc && !transformedContent.includes('"use client"') && (transformedContent.includes("useState") || transformedContent.includes("useEffect") || transformedContent.includes("onClick") || transformedContent.includes("onMouseEnter"))) {
    transformedContent = `"use client"

${transformedContent}`;
  }
  return transformedContent;
}

// src/commands/add.ts
var addOptionsSchema = import_zod3.z.object({
  components: import_zod3.z.array(import_zod3.z.string()).optional().default([]),
  yes: import_zod3.z.boolean().optional().default(false),
  overwrite: import_zod3.z.boolean().optional().default(false),
  cwd: import_zod3.z.string().optional(),
  all: import_zod3.z.boolean().optional().default(false)
});
async function addCommand(components, opts) {
  try {
    const options = addOptionsSchema.parse({
      components,
      ...opts
    });
    const cwd = import_path6.default.resolve(options.cwd || process.cwd());
    const config = await getConfig(cwd);
    if (!config) {
      console.log(import_chalk2.default.red("Project not initialized. Run `liquid-ui init` first."));
      process.exit(1);
    }
    const paths = await resolveConfigPaths(cwd, config);
    let selectedComponents = [];
    if (options.all) {
      selectedComponents = Object.keys(COMPONENTS_REGISTRY);
    } else if (options.components.length === 0) {
      const choices = Object.entries(COMPONENTS_REGISTRY).map(([key, info]) => ({
        name: `${key} - ${info.description}`,
        value: key,
        short: key
      }));
      const answers = await import_inquirer2.default.prompt([
        {
          type: "checkbox",
          name: "components",
          message: "Which components would you like to add?",
          choices,
          validate: (input) => input.length > 0 || "Please select at least one component"
        }
      ]);
      selectedComponents = answers.components;
    } else {
      selectedComponents = options.components;
    }
    const invalidComponents = selectedComponents.filter(
      (name) => !COMPONENTS_REGISTRY[name]
    );
    if (invalidComponents.length > 0) {
      console.log(import_chalk2.default.red(`Invalid component(s): ${invalidComponents.join(", ")}`));
      console.log(import_chalk2.default.dim("Run `liquid-ui list` to see all available components."));
      process.exit(1);
    }
    const componentsWithDeps = resolveDependencies(selectedComponents);
    if (!options.yes && componentsWithDeps.length !== selectedComponents.length) {
      const additionalComponents = componentsWithDeps.filter(
        (name) => !selectedComponents.includes(name)
      );
      const { proceed } = await import_inquirer2.default.prompt([
        {
          type: "confirm",
          name: "proceed",
          message: `This will also install dependencies: ${additionalComponents.join(", ")}. Continue?`,
          default: true
        }
      ]);
      if (!proceed) {
        process.exit(0);
      }
    }
    const spinner = (0, import_ora2.default)("Adding components...").start();
    try {
      const allDependencies = /* @__PURE__ */ new Set();
      const allDevDependencies = /* @__PURE__ */ new Set();
      for (const componentName of componentsWithDeps) {
        const component = COMPONENTS_REGISTRY[componentName];
        component.dependencies?.forEach((dep) => allDependencies.add(dep));
        component.devDependencies?.forEach((dep) => allDevDependencies.add(dep));
      }
      const packageManager = await getPackageManager(cwd);
      if (allDependencies.size > 0) {
        spinner.text = "Installing dependencies...";
        await installPackages(packageManager, Array.from(allDependencies), cwd);
      }
      if (allDevDependencies.size > 0) {
        spinner.text = "Installing dev dependencies...";
        await installPackages(packageManager, Array.from(allDevDependencies), cwd, true);
      }
      for (const componentName of componentsWithDeps) {
        spinner.text = `Adding ${componentName}...`;
        const component = COMPONENTS_REGISTRY[componentName];
        for (const file of component.files) {
          const filePath = import_path6.default.resolve(cwd, file.name);
          if ((0, import_fs4.existsSync)(filePath) && !options.overwrite) {
            if (!options.yes) {
              const { overwrite } = await import_inquirer2.default.prompt([
                {
                  type: "confirm",
                  name: "overwrite",
                  message: `${file.name} already exists. Overwrite?`,
                  default: false
                }
              ]);
              if (!overwrite) {
                continue;
              }
            } else {
              continue;
            }
          }
          await import_fs_extra4.default.ensureDir(import_path6.default.dirname(filePath));
          const content = await getComponentContent(componentName, file.name, config);
          const transformedContent = transformImports(content, config);
          await import_fs_extra4.default.writeFile(filePath, transformedContent, "utf8");
        }
      }
      spinner.succeed("Components added successfully!");
      console.log("");
      console.log(import_chalk2.default.green("\u2728 Components added! \u2728"));
      console.log("");
      console.log("Added components:");
      componentsWithDeps.forEach((name) => {
        console.log(import_chalk2.default.cyan(`  ${name}`));
      });
      console.log("");
      console.log("You can now import them in your project:");
      console.log("");
      componentsWithDeps.filter((name) => COMPONENTS_REGISTRY[name].files.some((f) => f.type === "component")).forEach((name) => {
        const componentName = name.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
        console.log(import_chalk2.default.dim(`  import { ${componentName} } from '${config.aliases.ui}/${name}'`));
      });
    } catch (error) {
      spinner.fail("Failed to add components");
      console.error(error);
      process.exit(1);
    }
  } catch (error) {
    console.error(import_chalk2.default.red("Error:"), error);
    process.exit(1);
  }
}
function resolveDependencies(components) {
  const resolved = /* @__PURE__ */ new Set();
  const stack = [...components];
  while (stack.length > 0) {
    const current = stack.pop();
    if (resolved.has(current)) {
      continue;
    }
    resolved.add(current);
    const component = COMPONENTS_REGISTRY[current];
    if (component?.registryDependencies) {
      stack.push(...component.registryDependencies);
    }
  }
  return Array.from(resolved);
}
async function getComponentContent(componentName, fileName, config) {
  const component = COMPONENTS_REGISTRY[componentName];
  const file = component.files.find((f) => f.name === fileName);
  if (file?.content) {
    return file.content;
  }
  try {
    return await fetchComponentContent(componentName, fileName);
  } catch (error) {
    throw new Error(`Failed to get content for ${componentName}/${fileName}`);
  }
}

// src/commands/list.ts
var import_chalk3 = __toESM(require("chalk"));
async function listCommand() {
  console.log(import_chalk3.default.cyan("Available Liquid UI Components:"));
  console.log("");
  const components = Object.entries(COMPONENTS_REGISTRY).filter(([, info]) => info.files.some((f) => f.type === "component")).sort(([a], [b]) => a.localeCompare(b));
  const hooks = Object.entries(COMPONENTS_REGISTRY).filter(([, info]) => info.files.some((f) => f.type === "hook")).sort(([a], [b]) => a.localeCompare(b));
  const utils = Object.entries(COMPONENTS_REGISTRY).filter(([, info]) => info.files.some((f) => f.type === "util")).sort(([a], [b]) => a.localeCompare(b));
  if (components.length > 0) {
    console.log(import_chalk3.default.yellow("Components:"));
    components.forEach(([name, info]) => {
      console.log(`  ${import_chalk3.default.green(name.padEnd(20))} ${import_chalk3.default.dim(info.description)}`);
    });
    console.log("");
  }
  if (hooks.length > 0) {
    console.log(import_chalk3.default.yellow("Hooks:"));
    hooks.forEach(([name, info]) => {
      console.log(`  ${import_chalk3.default.green(name.padEnd(20))} ${import_chalk3.default.dim(info.description)}`);
    });
    console.log("");
  }
  if (utils.length > 0) {
    console.log(import_chalk3.default.yellow("Utilities:"));
    utils.forEach(([name, info]) => {
      console.log(`  ${import_chalk3.default.green(name.padEnd(20))} ${import_chalk3.default.dim(info.description)}`);
    });
    console.log("");
  }
  console.log(import_chalk3.default.dim("Usage:"));
  console.log(import_chalk3.default.dim("  liquid-ui add <component>    Add a specific component"));
  console.log(import_chalk3.default.dim("  liquid-ui add --all         Add all components"));
  console.log("");
  console.log(import_chalk3.default.dim("Examples:"));
  console.log(import_chalk3.default.cyan("  liquid-ui add liquid-button"));
  console.log(import_chalk3.default.cyan("  liquid-ui add liquid-card liquid-input"));
  console.log(import_chalk3.default.cyan("  liquid-ui add --all"));
}

// src/index.ts
var program = new import_commander.Command();
program.name("liquid-ui").description("Add Apple-style liquid glass components to your project").version("1.0.0");
program.command("init").description("Initialize your project and install dependencies").option("-y, --yes", "skip confirmation prompts").option("-c, --cwd <cwd>", "the working directory").action(initCommand);
program.command("add").description("Add components to your project").argument("[components...]", "the components to add").option("-y, --yes", "skip confirmation prompts").option("-o, --overwrite", "overwrite existing files").option("-c, --cwd <cwd>", "the working directory").option("-a, --all", "add all available components").action(addCommand);
program.command("list").description("List all available components").action(listCommand);
program.command("diff").description("Check for updates to installed components").argument("[component]", "the component to check").action(() => {
  console.log(import_chalk4.default.yellow("Coming soon: Check for component updates"));
});
program.parse();
