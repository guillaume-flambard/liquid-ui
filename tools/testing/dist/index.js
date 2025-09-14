"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  a11y: () => a11y,
  glass: () => glass,
  performanceUtils: () => performanceUtils,
  renderWithProviders: () => renderWithProviders,
  userEvent: () => import_user_event.default
});
module.exports = __toCommonJS(index_exports);
var import_react = require("@testing-library/react");
__reExport(index_exports, require("@testing-library/react"), module.exports);
var import_user_event = __toESM(require("@testing-library/user-event"));
if (typeof CSS === "undefined" || !CSS.supports) {
  global.CSS = {
    supports: (property, value) => {
      if (property === "backdrop-filter") return true;
      return false;
    }
  };
}
if (!global.ResizeObserver) {
  global.ResizeObserver = class ResizeObserver {
    observe() {
    }
    unobserve() {
    }
    disconnect() {
    }
  };
}
if (!global.MutationObserver) {
  global.MutationObserver = class MutationObserver {
    constructor(callback) {
    }
    observe() {
    }
    disconnect() {
    }
    takeRecords() {
      return [];
    }
  };
}
function renderWithProviders(ui, options) {
  return (0, import_react.render)(ui, {
    ...options
  });
}
var performanceUtils = {
  /**
   * Measure rendering time of a component
   */
  measureRender: async (renderFn) => {
    const start = globalThis.performance.now();
    renderFn();
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const end = globalThis.performance.now();
    return end - start;
  },
  /**
   * Test that animations maintain 60fps
   */
  testFrameRate: async (animationFn, duration = 1e3) => {
    let frameCount = 0;
    const start = globalThis.performance.now();
    const animate = () => {
      frameCount++;
      animationFn();
      if (globalThis.performance.now() - start < duration) {
        requestAnimationFrame(animate);
      }
    };
    return new Promise((resolve) => {
      requestAnimationFrame(animate);
      setTimeout(() => {
        const actualFPS = frameCount / (duration / 1e3);
        resolve(actualFPS >= 58);
      }, duration + 100);
    });
  }
};
var a11y = {
  /**
   * Check if element has proper ARIA attributes
   */
  hasProperAria: (element) => {
    const role = element.getAttribute("role");
    const ariaLabel = element.getAttribute("aria-label") || element.getAttribute("aria-labelledby");
    return Boolean(role && ariaLabel);
  },
  /**
   * Check if element is keyboard accessible
   */
  isKeyboardAccessible: (element) => {
    const tabIndex = element.tabIndex;
    const isInteractive = ["button", "link", "input", "select", "textarea"].includes(
      element.tagName.toLowerCase()
    );
    return tabIndex >= 0 || isInteractive;
  }
};
var glass = {
  /**
   * Check if element has backdrop-filter applied
   */
  hasBackdropFilter: (element) => {
    const style = window.getComputedStyle(element);
    return style.backdropFilter !== "none" && style.backdropFilter !== "";
  },
  /**
   * Check if element has proper glass opacity
   */
  hasGlassOpacity: (element) => {
    const style = window.getComputedStyle(element);
    const background = style.background || style.backgroundColor;
    const rgbaMatch = background.match(/rgba?\([^)]+,\s*([0-9.]+)\)/);
    if (rgbaMatch) {
      const alpha = parseFloat(rgbaMatch[1]);
      return alpha > 0 && alpha < 1;
    }
    return false;
  },
  /**
   * Test physics calculations
   */
  testPhysics: (mousePos, elementBounds) => {
    const centerX = elementBounds.x + elementBounds.width / 2;
    const centerY = elementBounds.y + elementBounds.height / 2;
    const deltaX = mousePos.x - centerX;
    const deltaY = mousePos.y - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const maxDistance = Math.sqrt(
      (elementBounds.width / 2) ** 2 + (elementBounds.height / 2) ** 2
    );
    const normalizedDistance = Math.min(distance / maxDistance, 1);
    return 1 - Math.pow(normalizedDistance, 2);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  a11y,
  glass,
  performanceUtils,
  renderWithProviders,
  userEvent,
  ...require("@testing-library/react")
});
