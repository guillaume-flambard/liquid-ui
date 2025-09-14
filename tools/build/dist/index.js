"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  BUNDLE_SIZE_LIMITS: () => BUNDLE_SIZE_LIMITS,
  PERFORMANCE_TARGETS: () => PERFORMANCE_TARGETS,
  appConfig: () => appConfig,
  baseConfig: () => baseConfig,
  componentConfig: () => componentConfig,
  packageConfig: () => packageConfig
});
module.exports = __toCommonJS(index_exports);
var baseConfig = {
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  treeshake: true,
  splitting: false,
  external: ["react", "react-dom"],
  target: "es2020"
};
var packageConfig = (overrides = {}) => ({
  ...baseConfig,
  ...overrides
});
var componentConfig = (overrides = {}) => ({
  ...baseConfig,
  external: ["react", "react-dom", "@liquid-ui/core"],
  ...overrides
});
var appConfig = (overrides = {}) => ({
  entry: ["src/**/*.ts", "src/**/*.tsx"],
  format: ["esm"],
  dts: false,
  sourcemap: true,
  clean: true,
  minify: false,
  treeshake: false,
  splitting: true,
  target: "es2020",
  ...overrides
});
var BUNDLE_SIZE_LIMITS = {
  "@liquid-ui/core": 20 * 1024,
  // 20kb
  "@liquid-ui/react": 30 * 1024,
  // 30kb  
  "@liquid-ui/tokens": 5 * 1024,
  // 5kb
  "@liquid-ui/icons": 15 * 1024
  // 15kb
};
var PERFORMANCE_TARGETS = {
  renderTime: 16,
  // 16ms per frame (60fps)
  firstPaint: 100,
  // 100ms first paint
  memoryOverhead: 10
  // 10MB max overhead
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BUNDLE_SIZE_LIMITS,
  PERFORMANCE_TARGETS,
  appConfig,
  baseConfig,
  componentConfig,
  packageConfig
});
