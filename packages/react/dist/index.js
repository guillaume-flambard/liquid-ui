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
  LiquidButton: () => LiquidButton2,
  LiquidButtonGhost: () => LiquidButtonGhost,
  LiquidButtonIcon: () => LiquidButtonIcon,
  LiquidButtonPrimary: () => LiquidButtonPrimary,
  LiquidCard: () => LiquidCard2,
  LiquidCardCompact: () => LiquidCardCompact,
  LiquidCardHero: () => LiquidCardHero,
  LiquidCardInteractive: () => LiquidCardInteractive,
  LiquidContent: () => LiquidContent,
  LiquidIcon: () => LiquidIcon,
  LiquidInput: () => LiquidInput2,
  LiquidInputEmail: () => LiquidInputEmail,
  LiquidInputPassword: () => LiquidInputPassword,
  LiquidInputSearch: () => LiquidInputSearch,
  LiquidInteractive: () => LiquidInteractive,
  LiquidModal: () => LiquidModal2,
  LiquidModalAlert: () => LiquidModalAlert,
  LiquidModalConfirm: () => LiquidModalConfirm,
  LiquidModalFullscreen: () => LiquidModalFullscreen,
  LiquidOverlay: () => LiquidOverlay,
  LiquidPortal: () => LiquidPortal,
  LiquidSpinner: () => LiquidSpinner,
  LiquidSurface: () => LiquidSurface,
  LiquidText: () => LiquidText,
  useAdaptiveGlass: () => useAdaptiveGlass,
  useInteractiveGlass: () => useInteractiveGlass,
  useLiquidGlass: () => useLiquidGlass
});
module.exports = __toCommonJS(index_exports);

// src/components/primitives/LiquidSurface.tsx
var import_react2 = require("react");

// src/hooks/useLiquidGlass.ts
var import_react = require("react");
var import_core = require("@liquid-ui/core");
function useLiquidGlass(config) {
  const isTestEnv = typeof process !== "undefined" && process.env.NODE_ENV === "test";
  const [isClient, setIsClient] = (0, import_react.useState)(isTestEnv);
  const engine = (0, import_react.useMemo)(() => import_core.LiquidGlassEngine.getInstance(), []);
  (0, import_react.useEffect)(() => {
    if (!isTestEnv) {
      setIsClient(true);
    }
  }, [isTestEnv]);
  const glassStyles = (0, import_react.useMemo)(() => {
    const serverSafeConfig = isClient ? config : { ...config, interactive: false };
    return engine.generateGlassCSS(serverSafeConfig);
  }, [engine, config, isClient]);
  const glassClasses = (0, import_react.useMemo)(() => {
    const classes = {
      base: "backdrop-filter",
      blur: "",
      background: "",
      border: "border border-white/10"
    };
    switch (config.intensity) {
      case "light":
        classes.blur = "backdrop-blur-sm";
        break;
      case "regular":
        classes.blur = "backdrop-blur-md";
        break;
      case "strong":
        classes.blur = "backdrop-blur-lg";
        break;
    }
    switch (config.variant) {
      case "frosted":
        classes.background = "bg-white/25";
        break;
      case "clear":
        classes.background = "bg-white/10";
        break;
      case "tinted":
        classes.background = "bg-blue-500/20";
        break;
    }
    return classes;
  }, [config]);
  return { glassStyles, glassClasses };
}

// src/utils/cn.ts
var import_clsx = require("clsx");
function cn(...inputs) {
  return (0, import_clsx.clsx)(inputs);
}

// src/components/primitives/LiquidSurface.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var LiquidSurface = (0, import_react2.forwardRef)(
  ({
    children,
    className,
    variant = "frosted",
    intensity = "regular",
    opacity = "regular",
    interactive = false,
    adaptiveOpacity = false,
    environmentBlending = false,
    as: Component = "div",
    style,
    ...props
  }, ref) => {
    const { glassStyles, glassClasses } = useLiquidGlass({
      variant,
      intensity,
      opacity,
      interactive,
      adaptiveOpacity,
      environmentBlending
    });
    const Element = Component;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      Element,
      {
        ref,
        className: cn(
          "liquid-surface",
          "relative",
          "overflow-hidden",
          glassClasses.base,
          glassClasses.blur,
          glassClasses.background,
          interactive && [
            "cursor-pointer",
            "transition-all",
            "duration-300",
            "ease-out",
            "hover:scale-[1.02]",
            "active:scale-[0.98]"
          ],
          className
        ),
        style: {
          ...glassStyles,
          ...style
        },
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "div",
            {
              className: "absolute inset-0 overflow-hidden pointer-events-none",
              "aria-hidden": "true",
              children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn(
                "absolute inset-0",
                "bg-gradient-to-br",
                "from-white/10",
                "to-transparent"
              ) })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative z-10", children })
        ]
      }
    );
  }
);
LiquidSurface.displayName = "LiquidSurface";

// src/components/primitives/LiquidOverlay.tsx
var import_react4 = require("react");

// src/components/primitives/LiquidPortal.tsx
var import_react3 = require("react");
var import_react_dom = require("react-dom");
var LiquidPortal = ({
  children,
  target
}) => {
  const containerRef = (0, import_react3.useRef)(null);
  (0, import_react3.useEffect)(() => {
    if (typeof target === "string") {
      containerRef.current = document.querySelector(target);
    } else if (target instanceof HTMLElement) {
      containerRef.current = target;
    } else {
      containerRef.current = document.body;
    }
  }, [target]);
  if (!containerRef.current) {
    containerRef.current = document.body;
  }
  return (0, import_react_dom.createPortal)(children, containerRef.current);
};

// src/components/primitives/LiquidOverlay.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var LiquidOverlay = ({
  isOpen,
  onClose,
  closeOnBackdrop = true,
  closeOnEscape = true,
  variant = "frosted",
  intensity = "strong",
  children,
  className,
  ...props
}) => {
  const { glassClasses } = useLiquidGlass({
    variant,
    intensity,
    opacity: "strong"
  });
  (0, import_react4.useEffect)(() => {
    if (!isOpen || !closeOnEscape || !onClose) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape, onClose]);
  (0, import_react4.useEffect)(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);
  const handleBackdropClick = (0, import_react4.useCallback)((e) => {
    if (closeOnBackdrop && onClose && e.target === e.currentTarget) {
      onClose();
    }
  }, [closeOnBackdrop, onClose]);
  if (!isOpen) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LiquidPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      className: cn(
        "liquid-overlay",
        "fixed inset-0 z-50",
        "flex items-center justify-center",
        "animate-in fade-in duration-200",
        glassClasses.base,
        glassClasses.blur,
        "bg-black/40",
        className
      ),
      onClick: handleBackdropClick,
      ...props,
      children
    }
  ) });
};

// src/components/primitives/LiquidContent.tsx
var import_react5 = require("react");
var import_jsx_runtime3 = require("react/jsx-runtime");
var LiquidContent = (0, import_react5.forwardRef)(
  ({
    children,
    className,
    padding = "md",
    centered = false,
    maxWidth = "full",
    ...props
  }, ref) => {
    const paddingClasses = {
      none: "",
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
      xl: "p-12"
    };
    const maxWidthClasses = {
      sm: "max-w-sm",
      md: "max-w-md",
      lg: "max-w-lg",
      xl: "max-w-xl",
      full: "max-w-full"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        ref,
        className: cn(
          "liquid-content",
          paddingClasses[padding],
          maxWidthClasses[maxWidth],
          centered && [
            "mx-auto",
            "text-center",
            "flex",
            "flex-col",
            "items-center",
            "justify-center"
          ],
          className
        ),
        ...props,
        children
      }
    );
  }
);
LiquidContent.displayName = "LiquidContent";

// src/components/primitives/LiquidInteractive.tsx
var import_react6 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var LiquidInteractive = (0, import_react6.forwardRef)(
  ({
    children,
    className,
    onPress,
    onPressStart,
    onPressEnd,
    onHover,
    disabled = false,
    loading = false,
    tabIndex = 0,
    ...props
  }, ref) => {
    const [isPressed, setIsPressed] = (0, import_react6.useState)(false);
    const [isHovered, setIsHovered] = (0, import_react6.useState)(false);
    const handleMouseDown = (0, import_react6.useCallback)(() => {
      if (disabled || loading) return;
      setIsPressed(true);
      onPressStart?.();
    }, [disabled, loading, onPressStart]);
    const handleMouseUp = (0, import_react6.useCallback)(() => {
      if (disabled || loading) return;
      setIsPressed(false);
      onPressEnd?.();
    }, [disabled, loading, onPressEnd]);
    const handleClick = (0, import_react6.useCallback)(() => {
      if (disabled || loading) return;
      onPress?.();
    }, [disabled, loading, onPress]);
    const handleMouseEnter = (0, import_react6.useCallback)(() => {
      if (disabled || loading) return;
      setIsHovered(true);
      onHover?.(true);
    }, [disabled, loading, onHover]);
    const handleMouseLeave = (0, import_react6.useCallback)(() => {
      setIsHovered(false);
      setIsPressed(false);
      onHover?.(false);
    }, [onHover]);
    const handleKeyDown = (0, import_react6.useCallback)((e) => {
      if (disabled || loading) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsPressed(true);
        onPressStart?.();
      }
    }, [disabled, loading, onPressStart]);
    const handleKeyUp = (0, import_react6.useCallback)((e) => {
      if (disabled || loading) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsPressed(false);
        onPressEnd?.();
        onPress?.();
      }
    }, [disabled, loading, onPressEnd, onPress]);
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "div",
      {
        ref,
        className: cn(
          "liquid-interactive",
          "relative",
          "select-none",
          "outline-none",
          !disabled && !loading && [
            "cursor-pointer",
            "transition-transform",
            "duration-150",
            "ease-out",
            isPressed && "scale-95",
            isHovered && !isPressed && "scale-[1.02]"
          ],
          disabled && [
            "cursor-not-allowed",
            "opacity-60"
          ],
          loading && [
            "cursor-wait",
            "pointer-events-none"
          ],
          "focus:outline-none",
          "focus:ring-2",
          "focus:ring-blue-500/50",
          "focus:ring-offset-2",
          "focus:ring-offset-transparent",
          className
        ),
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        onKeyUp: handleKeyUp,
        tabIndex: disabled || loading ? -1 : tabIndex,
        role: "button",
        "aria-disabled": disabled,
        "aria-busy": loading,
        ...props,
        children
      }
    );
  }
);
LiquidInteractive.displayName = "LiquidInteractive";

// src/components/primitives/LiquidText.tsx
var import_react7 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var LiquidText = (0, import_react7.forwardRef)(
  ({
    children,
    className,
    variant = "body",
    weight = "regular",
    align = "left",
    color = "primary",
    as,
    ...props
  }, ref) => {
    const defaultElements = {
      display: "h1",
      title: "h2",
      body: "p",
      caption: "span",
      label: "label"
    };
    const Component = as || defaultElements[variant];
    const variantClasses = {
      display: "text-4xl md:text-5xl lg:text-6xl",
      title: "text-2xl md:text-3xl lg:text-4xl",
      body: "text-base",
      caption: "text-sm",
      label: "text-sm uppercase tracking-wider"
    };
    const weightClasses = {
      light: "font-light",
      regular: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold"
    };
    const alignClasses = {
      left: "text-left",
      center: "text-center",
      right: "text-right"
    };
    const colorClasses = {
      primary: "text-gray-900 dark:text-white",
      secondary: "text-gray-600 dark:text-gray-300",
      muted: "text-gray-400 dark:text-gray-500",
      error: "text-red-600 dark:text-red-400",
      success: "text-green-600 dark:text-green-400"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      Component,
      {
        ref,
        className: cn(
          "liquid-text",
          variantClasses[variant],
          weightClasses[weight],
          alignClasses[align],
          colorClasses[color],
          className
        ),
        ...props,
        children
      }
    );
  }
);
LiquidText.displayName = "LiquidText";

// src/components/primitives/LiquidIcon.tsx
var import_react8 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var LiquidIcon = (0, import_react8.forwardRef)(
  ({
    children,
    className,
    size = "md",
    color,
    spin = false,
    style,
    ...props
  }, ref) => {
    const sizeClasses = {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-8 h-8"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "span",
      {
        ref,
        className: cn(
          "liquid-icon",
          "inline-flex",
          "items-center",
          "justify-center",
          sizeClasses[size],
          spin && "animate-spin",
          className
        ),
        style: {
          color,
          ...style
        },
        "aria-hidden": "true",
        ...props,
        children
      }
    );
  }
);
LiquidIcon.displayName = "LiquidIcon";

// src/components/primitives/LiquidSpinner.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var LiquidSpinner = ({
  className,
  size = "md",
  color = "currentColor"
}) => {
  const sizeClasses = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "svg",
    {
      className: cn(
        "liquid-spinner",
        "animate-spin",
        sizeClasses[size],
        className
      ),
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      "aria-label": "Loading",
      role: "status",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "circle",
          {
            className: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: color,
            strokeWidth: "4"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "path",
          {
            className: "opacity-75",
            fill: color,
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          }
        )
      ]
    }
  );
};

// src/components/composed/LiquidButton.tsx
var import_react9 = require("react");
var import_jsx_runtime8 = require("react/jsx-runtime");
var LiquidButton = (0, import_react9.forwardRef)(
  ({
    children,
    className,
    variant = "frosted",
    size = "md",
    intensity = "regular",
    disabled = false,
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    onClick,
    type = "button",
    ...props
  }, ref) => {
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
      "button",
      {
        ref,
        type,
        disabled: disabled || loading,
        onClick,
        className: cn(
          "liquid-button",
          "relative",
          "rounded-lg",
          "border border-white/10",
          "shadow-lg",
          "backdrop-blur-md",
          "bg-white/10",
          sizeClasses[size],
          fullWidth && "w-full",
          disabled && "opacity-60 cursor-not-allowed",
          loading && "cursor-wait",
          !disabled && !loading && [
            "hover:scale-105",
            "active:scale-95",
            "transition-transform",
            "duration-200"
          ],
          className
        ),
        ...props,
        children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          LiquidInteractive,
          {
            disabled,
            loading,
            className: "w-full h-full -m-2 p-2",
            children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
              LiquidContent,
              {
                padding: "none",
                className: "flex items-center justify-center gap-2",
                children: loading ? /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(LiquidSpinner, { size: "sm" }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(LiquidText, { variant: "body", weight: "medium", children: "Loading..." })
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(import_jsx_runtime8.Fragment, { children: [
                  leftIcon && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "liquid-button-icon", children: leftIcon }),
                  /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "liquid-button-content", children }),
                  rightIcon && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "liquid-button-icon", children: rightIcon })
                ] })
              }
            )
          }
        )
      }
    );
  }
);
LiquidButton.displayName = "LiquidButton";
var LiquidButtonPrimary = (0, import_react9.forwardRef)(
  (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    LiquidButton,
    {
      ref,
      variant: "tinted",
      intensity: "strong",
      ...props
    }
  )
);
var LiquidButtonGhost = (0, import_react9.forwardRef)(
  (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    LiquidButton,
    {
      ref,
      variant: "clear",
      intensity: "light",
      className: "border-0 shadow-none",
      ...props
    }
  )
);
var LiquidButtonIcon = (0, import_react9.forwardRef)(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
    LiquidButton,
    {
      ref,
      className: cn("p-2 aspect-square", className),
      ...props
    }
  )
);

// src/components/composed/LiquidCard.tsx
var import_react10 = require("react");
var import_jsx_runtime9 = require("react/jsx-runtime");
var LiquidCard = (0, import_react10.forwardRef)(
  ({
    children,
    className,
    variant = "frosted",
    intensity = "regular",
    opacity = "regular",
    interactive = false,
    adaptiveOpacity = false,
    environmentBlending = false,
    padding = "md",
    onClick,
    ...props
  }, ref) => {
    return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
      LiquidSurface,
      {
        ref,
        variant,
        intensity,
        opacity,
        interactive,
        adaptiveOpacity,
        environmentBlending,
        className: cn(
          "liquid-card",
          "rounded-xl",
          "border border-white/10",
          "shadow-lg",
          interactive && "hover:shadow-xl",
          className
        ),
        onClick,
        ...props,
        children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(LiquidContent, { padding, children })
      }
    );
  }
);
LiquidCard.displayName = "LiquidCard";
var LiquidCardHero = (0, import_react10.forwardRef)(
  (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    LiquidCard,
    {
      ref,
      variant: "frosted",
      intensity: "strong",
      padding: "xl",
      className: "min-h-[400px]",
      ...props
    }
  )
);
var LiquidCardCompact = (0, import_react10.forwardRef)(
  (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    LiquidCard,
    {
      ref,
      variant: "clear",
      intensity: "light",
      padding: "sm",
      ...props
    }
  )
);
var LiquidCardInteractive = (0, import_react10.forwardRef)(
  (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
    LiquidCard,
    {
      ref,
      interactive: true,
      className: "hover:scale-105 transition-transform duration-300",
      ...props
    }
  )
);

// src/components/composed/LiquidModal.tsx
var import_react11 = require("react");
var import_jsx_runtime10 = require("react/jsx-runtime");
var LiquidModal = (0, import_react11.forwardRef)(
  ({
    children,
    className,
    isOpen,
    onClose,
    variant = "frosted",
    intensity = "strong",
    size = "md",
    closeOnEscape = true,
    closeOnBackdrop = true,
    showCloseButton = true,
    ...props
  }, ref) => {
    const modalRef = (0, import_react11.useRef)(null);
    (0, import_react11.useEffect)(() => {
      if (isOpen && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    }, [isOpen]);
    const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
      full: "max-w-none w-[95vw]"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      LiquidOverlay,
      {
        isOpen: isOpen || false,
        onClose,
        closeOnBackdrop,
        closeOnEscape,
        variant,
        intensity,
        children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
          LiquidSurface,
          {
            ref: modalRef,
            variant,
            intensity,
            className: cn(
              "liquid-modal",
              "relative",
              "rounded-2xl",
              "border border-white/20",
              "shadow-2xl",
              "animate-in",
              "zoom-in-95",
              "duration-200",
              sizeClasses[size],
              "max-h-[90vh]",
              "overflow-auto",
              className
            ),
            role: "dialog",
            "aria-modal": "true",
            onClick: (e) => e.stopPropagation(),
            ...props,
            children: [
              showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                LiquidInteractive,
                {
                  onPress: onClose,
                  className: "absolute top-4 right-4 z-10",
                  "aria-label": "Close modal",
                  children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                    "button",
                    {
                      type: "button",
                      className: "p-2 rounded-lg hover:bg-black/10 transition-colors",
                      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                        "svg",
                        {
                          className: "w-5 h-5",
                          fill: "none",
                          stroke: "currentColor",
                          viewBox: "0 0 24 24",
                          children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                            "path",
                            {
                              strokeLinecap: "round",
                              strokeLinejoin: "round",
                              strokeWidth: 2,
                              d: "M6 18L18 6M6 6l12 12"
                            }
                          )
                        }
                      )
                    }
                  )
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(LiquidContent, { padding: "lg", children })
            ]
          }
        )
      }
    );
  }
);
LiquidModal.displayName = "LiquidModal";
var LiquidModalAlert = (0, import_react11.forwardRef)(
  (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    LiquidModal,
    {
      ref,
      size: "sm",
      closeOnBackdrop: false,
      closeOnEscape: false,
      ...props
    }
  )
);
var LiquidModalConfirm = (0, import_react11.forwardRef)(
  (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    LiquidModal,
    {
      ref,
      size: "sm",
      closeOnBackdrop: false,
      ...props
    }
  )
);
var LiquidModalFullscreen = (0, import_react11.forwardRef)(
  (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    LiquidModal,
    {
      ref,
      size: "full",
      className: "h-[95vh]",
      ...props
    }
  )
);

// src/components/composed/LiquidInput.tsx
var import_react12 = require("react");
var import_jsx_runtime11 = require("react/jsx-runtime");
var LiquidInput = (0, import_react12.forwardRef)(
  ({
    className,
    variant = "frosted",
    intensity = "light",
    size = "md",
    error,
    leftIcon,
    rightIcon,
    required,
    disabled,
    type = "text",
    ...props
  }, ref) => {
    const sizeClasses = {
      sm: "text-sm px-3 py-2",
      md: "text-base px-4 py-2.5",
      lg: "text-lg px-6 py-3"
    };
    const iconSizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6"
    };
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "liquid-input-wrapper space-y-1", children: [
      required && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: "text-red-500 text-sm ml-1", children: "*" }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        LiquidSurface,
        {
          variant,
          intensity,
          className: cn(
            "liquid-input-container",
            "relative",
            "rounded-lg",
            "border",
            error ? "border-red-500/50 ring-2 ring-red-500/20" : "border-white/10",
            "shadow-sm",
            "focus-within:ring-2",
            "focus-within:ring-blue-500/30",
            "transition-all duration-200",
            disabled && "opacity-60 cursor-not-allowed"
          ),
          children: /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "relative flex items-center", children: [
            leftIcon && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: cn(
              "absolute left-3 pointer-events-none",
              iconSizeClasses[size],
              "text-gray-500"
            ), children: leftIcon }),
            /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
              "input",
              {
                ref,
                type,
                className: cn(
                  "w-full",
                  "bg-transparent",
                  "outline-none",
                  "placeholder:text-gray-500",
                  sizeClasses[size],
                  leftIcon && "pl-10",
                  rightIcon && "pr-10",
                  disabled && "cursor-not-allowed",
                  className
                ),
                disabled,
                "aria-invalid": !!error,
                "aria-describedby": error ? "error-message" : void 0,
                ...props
              }
            ),
            rightIcon && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("span", { className: cn(
              "absolute right-3 pointer-events-none",
              iconSizeClasses[size],
              "text-gray-500"
            ), children: rightIcon })
          ] })
        }
      ),
      error && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        LiquidText,
        {
          id: "error-message",
          variant: "caption",
          color: "error",
          className: "ml-1",
          children: error
        }
      )
    ] });
  }
);
LiquidInput.displayName = "LiquidInput";
var LiquidInputSearch = (0, import_react12.forwardRef)(
  (props, ref) => {
    const SearchIcon = () => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("svg", { className: "w-full h-full", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      }
    ) });
    return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
      LiquidInput,
      {
        ref,
        type: "search",
        leftIcon: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(SearchIcon, {}),
        placeholder: "Search...",
        ...props
      }
    );
  }
);
var LiquidInputEmail = (0, import_react12.forwardRef)(
  (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    LiquidInput,
    {
      ref,
      type: "email",
      placeholder: "email@example.com",
      ...props
    }
  )
);
var LiquidInputPassword = (0, import_react12.forwardRef)(
  (props, ref) => /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    LiquidInput,
    {
      ref,
      type: "password",
      placeholder: "Enter password",
      ...props
    }
  )
);

// src/components/LiquidCard.tsx
var import_react14 = require("react");
var import_clsx2 = require("clsx");

// src/hooks/useInteractiveGlass.ts
var import_react13 = require("react");
var import_core2 = require("@liquid-ui/core");
function useInteractiveGlass({
  elementRef,
  enabled = true,
  onHover,
  throttleMs = 16
  // ~60fps
}) {
  const engine = (0, import_react13.useRef)(import_core2.LiquidGlassEngine.getInstance());
  const isHoveredRef = (0, import_react13.useRef)(false);
  const throttledMouseMove = (0, import_react13.useCallback)(
    (0, import_core2.throttle)((mousePosition) => {
      if (!enabled || !elementRef.current) return;
      const element = elementRef.current;
      const bounds = element.getBoundingClientRect();
      const refraction = engine.current.calculateRefraction(
        mousePosition,
        {
          x: bounds.left,
          y: bounds.top,
          width: bounds.width,
          height: bounds.height
        }
      );
      const transformX = (mousePosition.x - bounds.left - bounds.width / 2) / bounds.width * 10;
      const transformY = (mousePosition.y - bounds.top - bounds.height / 2) / bounds.height * 10;
      element.style.transform = `perspective(1000px) rotateX(${-transformY * refraction}deg) rotateY(${transformX * refraction}deg) translateZ(${refraction * 5}px)`;
    }, throttleMs),
    [enabled, elementRef, throttleMs]
  );
  const handleMouseEnter = (0, import_react13.useCallback)(() => {
    if (!enabled) return;
    isHoveredRef.current = true;
    onHover?.(true);
    if (elementRef.current) {
      elementRef.current.style.transition = "transform 0.2s cubic-bezier(0.23, 1, 0.32, 1)";
    }
  }, [enabled, onHover, elementRef]);
  const handleMouseLeave = (0, import_react13.useCallback)(() => {
    if (!enabled) return;
    isHoveredRef.current = false;
    onHover?.(false);
    if (elementRef.current) {
      elementRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
      setTimeout(() => {
        if (elementRef.current && !isHoveredRef.current) {
          elementRef.current.style.transition = "";
        }
      }, 200);
    }
  }, [enabled, onHover, elementRef]);
  const handleMouseMove = (0, import_react13.useCallback)((e) => {
    if (!enabled) return;
    const mousePosition = {
      x: e.clientX,
      y: e.clientY
    };
    throttledMouseMove(mousePosition);
  }, [enabled, throttledMouseMove]);
  return {
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove
  };
}

// src/components/LiquidCard.tsx
var import_jsx_runtime12 = require("react/jsx-runtime");
var LiquidCardBase = (0, import_react14.forwardRef)(
  ({
    variant = "frosted",
    intensity = "regular",
    opacity = "regular",
    interactive = false,
    adaptiveOpacity = false,
    environmentBlending = false,
    hover = true,
    shadow = true,
    border = true,
    padding = "md",
    className,
    children,
    onHover,
    onLiquidDragStart,
    onLiquidDrag,
    onLiquidDragEnd,
    draggable = false,
    magneticEdges = false,
    magneticStrength = 0.3,
    style,
    ...rest
  }, ref) => {
    const [isHovered, setIsHovered] = (0, import_react14.useState)(false);
    const [dragState, setDragState] = (0, import_react14.useState)({
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0
    });
    const [magneticEffect, setMagneticEffect] = (0, import_react14.useState)({ x: 0, y: 0, intensity: 0 });
    const [shadowDepth, setShadowDepth] = (0, import_react14.useState)(0);
    const cardRef = (0, import_react14.useRef)(null);
    const containerRef = (0, import_react14.useRef)(null);
    const { glassStyles, glassClasses } = useLiquidGlass({
      variant,
      intensity,
      opacity,
      interactive,
      adaptiveOpacity,
      environmentBlending
    });
    const { handleMouseEnter, handleMouseLeave, handleMouseMove } = useInteractiveGlass({
      elementRef: cardRef,
      enabled: interactive && hover && !dragState.isDragging,
      onHover: (hovered) => {
        setIsHovered(hovered);
        onHover?.(hovered);
        if (hovered) {
          setShadowDepth(1);
        } else {
          setShadowDepth(0);
        }
      }
    });
    (0, import_react14.useEffect)(() => {
      if (!magneticEdges || !isHovered || dragState.isDragging) return;
      const handleMagneticMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = Math.max(rect.width, rect.height) / 2;
        if (distance < maxDistance) {
          const intensity2 = (1 - distance / maxDistance) * magneticStrength;
          setMagneticEffect({
            x: deltaX * intensity2 * 0.1,
            y: deltaY * intensity2 * 0.1,
            intensity: intensity2
          });
        } else {
          setMagneticEffect({ x: 0, y: 0, intensity: 0 });
        }
      };
      document.addEventListener("mousemove", handleMagneticMove);
      return () => document.removeEventListener("mousemove", handleMagneticMove);
    }, [magneticEdges, isHovered, dragState.isDragging, magneticStrength]);
    const isDraggableEnabled = draggable || !!(onLiquidDragStart || onLiquidDrag || onLiquidDragEnd);
    const handleDragStart = (0, import_react14.useCallback)((e) => {
      if (!isDraggableEnabled) return;
      e.preventDefault();
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      setDragState({
        isDragging: true,
        startX: clientX,
        startY: clientY,
        currentX: 0,
        currentY: 0
      });
      setShadowDepth(2);
      onLiquidDragStart?.(e);
    }, [isDraggableEnabled, onLiquidDragStart]);
    const handleDragMove = (0, import_react14.useCallback)((e) => {
      if (!dragState.isDragging) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - dragState.startX;
      const deltaY = clientY - dragState.startY;
      setDragState((prev) => ({
        ...prev,
        currentX: deltaX,
        currentY: deltaY
      }));
      onLiquidDrag?.(e, { x: deltaX, y: deltaY });
    }, [dragState.isDragging, dragState.startX, dragState.startY, onLiquidDrag]);
    const handleDragEnd = (0, import_react14.useCallback)((e) => {
      if (!dragState.isDragging) return;
      setDragState({
        isDragging: false,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0
      });
      setShadowDepth(0);
      setMagneticEffect({ x: 0, y: 0, intensity: 0 });
      onLiquidDragEnd?.(e);
    }, [dragState.isDragging, onLiquidDragEnd]);
    (0, import_react14.useEffect)(() => {
      if (dragState.isDragging) {
        document.addEventListener("mousemove", handleDragMove);
        document.addEventListener("mouseup", handleDragEnd);
        document.addEventListener("touchmove", handleDragMove);
        document.addEventListener("touchend", handleDragEnd);
        return () => {
          document.removeEventListener("mousemove", handleDragMove);
          document.removeEventListener("mouseup", handleDragEnd);
          document.removeEventListener("touchmove", handleDragMove);
          document.removeEventListener("touchend", handleDragEnd);
        };
      }
    }, [dragState.isDragging, handleDragMove, handleDragEnd]);
    const onMouseEnter = (0, import_react14.useCallback)((e) => {
      if (!dragState.isDragging) {
        handleMouseEnter();
      }
      rest.onMouseEnter?.(e);
    }, [handleMouseEnter, rest.onMouseEnter, dragState.isDragging]);
    const onMouseLeave = (0, import_react14.useCallback)((e) => {
      if (!dragState.isDragging) {
        handleMouseLeave();
        setMagneticEffect({ x: 0, y: 0, intensity: 0 });
      }
      rest.onMouseLeave?.(e);
    }, [handleMouseLeave, rest.onMouseLeave, dragState.isDragging]);
    const onMouseMove = (0, import_react14.useCallback)((e) => {
      if (!dragState.isDragging) {
        handleMouseMove(e);
      }
      rest.onMouseMove?.(e);
    }, [handleMouseMove, rest.onMouseMove, dragState.isDragging]);
    const onMouseDown = (0, import_react14.useCallback)((e) => {
      handleDragStart(e);
      rest.onMouseDown?.(e);
    }, [handleDragStart, rest.onMouseDown]);
    const onTouchStart = (0, import_react14.useCallback)((e) => {
      handleDragStart(e);
      rest.onTouchStart?.(e);
    }, [handleDragStart, rest.onTouchStart]);
    const onKeyDown = (0, import_react14.useCallback)((e) => {
      if ((e.key === "Enter" || e.key === " ") && interactive && rest.onClick) {
        e.preventDefault();
        rest.onClick?.(e);
      }
      if (isDraggableEnabled && (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")) {
        e.preventDefault();
        if (!dragState.isDragging) {
          const rect = cardRef.current?.getBoundingClientRect();
          if (rect) {
            setDragState({
              isDragging: true,
              startX: rect.left + rect.width / 2,
              startY: rect.top + rect.height / 2,
              currentX: 0,
              currentY: 0
            });
            onLiquidDragStart?.(e);
          }
        } else {
          const moveDistance = e.shiftKey ? 10 : 2;
          let deltaX = 0;
          let deltaY = 0;
          switch (e.key) {
            case "ArrowLeft":
              deltaX = -moveDistance;
              break;
            case "ArrowRight":
              deltaX = moveDistance;
              break;
            case "ArrowUp":
              deltaY = -moveDistance;
              break;
            case "ArrowDown":
              deltaY = moveDistance;
              break;
          }
          setDragState((prev) => ({
            ...prev,
            currentX: prev.currentX + deltaX,
            currentY: prev.currentY + deltaY
          }));
          onLiquidDrag?.(e, { x: dragState.currentX + deltaX, y: dragState.currentY + deltaY });
        }
      }
      if (e.key === "Escape" && dragState.isDragging) {
        e.preventDefault();
        setDragState({
          isDragging: false,
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0
        });
        setShadowDepth(0);
        setMagneticEffect({ x: 0, y: 0, intensity: 0 });
        onLiquidDragEnd?.(e);
      }
      rest.onKeyDown?.(e);
    }, [interactive, isDraggableEnabled, dragState, rest.onClick, rest.onKeyDown, onLiquidDragStart, onLiquidDrag, onLiquidDragEnd]);
    const paddingClasses = {
      sm: "p-3",
      md: "p-6",
      lg: "p-8",
      xl: "p-12"
    };
    const classes = (0, import_clsx2.clsx)(
      // Base glass card styles
      "liquid-card",
      "relative",
      "overflow-hidden",
      "transition-all",
      "duration-200",
      "ease-out",
      "rounded-xl",
      // Glass effect classes
      glassClasses.base,
      glassClasses.blur,
      glassClasses.background,
      // Padding styles
      paddingClasses[padding],
      // Border styles
      border && (glassClasses.border || "border border-white/10"),
      // Dynamic shadow styles based on depth
      shadow && [
        shadowDepth === 0 && "shadow-lg",
        shadowDepth === 1 && "shadow-xl",
        shadowDepth === 2 && "shadow-2xl",
        dragState.isDragging && "shadow-2xl shadow-blue-500/25"
      ],
      // Interactive styles - only apply hover effects when interactive=true AND hover=true
      interactive && hover && !dragState.isDragging && "hover:scale-105",
      interactive && [
        !dragState.isDragging && "cursor-pointer",
        "transform-gpu",
        !dragState.isDragging && "transition-all",
        !dragState.isDragging && "duration-300",
        !dragState.isDragging && "ease-out"
      ],
      // Focus styles for interactive cards
      interactive && [
        "focus:outline-none",
        "focus:ring-2",
        "focus:ring-blue-500/50",
        "focus:ring-offset-2",
        "focus:ring-offset-transparent"
      ],
      // Draggable styles
      isDraggableEnabled && [
        "select-none",
        dragState.isDragging && [
          "cursor-grabbing",
          "z-50"
        ],
        !dragState.isDragging && isDraggableEnabled && "cursor-grab"
      ],
      // Custom className
      className
    );
    const transformStyles = {
      transform: dragState.isDragging ? `translate3d(${dragState.currentX + magneticEffect.x}px, ${dragState.currentY + magneticEffect.y}px, 0px)` : magneticEffect.intensity > 0 ? `translate3d(${magneticEffect.x}px, ${magneticEffect.y}px, 0px) ${isHovered ? "scale(1.02)" : ""}` : isHovered && !dragState.isDragging ? "scale(1.02)" : "none",
      filter: [
        glassStyles.filter || "",
        dragState.isDragging ? "brightness(1.1)" : "",
        magneticEffect.intensity > 0 ? `hue-rotate(${magneticEffect.intensity * 10}deg)` : ""
      ].filter(Boolean).join(" "),
      transition: dragState.isDragging ? "none" : "transform 0.3s cubic-bezier(0.2, 0, 0.2, 1), filter 0.2s ease",
      willChange: dragState.isDragging ? "transform" : "auto"
    };
    const combinedStyles = {
      ...glassStyles,
      ...transformStyles,
      ...style
    };
    return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
      "div",
      {
        ref: (node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          if (cardRef.current !== node) {
            cardRef.current = node;
          }
        },
        className: classes,
        style: combinedStyles,
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
        onMouseDown,
        onTouchStart,
        onKeyDown,
        draggable: false,
        tabIndex: interactive ? 0 : void 0,
        ...rest,
        children: [
          magneticEdges && magneticEffect.intensity > 0 && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "div",
            {
              className: "absolute inset-0 rounded-inherit pointer-events-none",
              style: {
                background: `radial-gradient(circle at center, 
                rgba(59, 130, 246, ${magneticEffect.intensity * 0.1}) 0%, 
                transparent 70%
              )`,
                opacity: magneticEffect.intensity
              }
            }
          ),
          isDraggableEnabled && isHovered && !dragState.isDragging && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "absolute top-2 right-2 opacity-50 pointer-events-none", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("svg", { className: "w-4 h-4 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" }) }) }),
          children
        ]
      }
    );
  }
);
LiquidCardBase.displayName = "LiquidCard";
var LiquidCard2 = LiquidCardBase;
LiquidCard2.Frosted = (0, import_react14.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  LiquidCardBase,
  {
    ref,
    variant: "frosted",
    intensity: "regular",
    interactive: true,
    hover: true,
    shadow: true,
    ...props
  }
));
LiquidCard2.Frosted.displayName = "LiquidCard.Frosted";
LiquidCard2.Clear = (0, import_react14.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  LiquidCardBase,
  {
    ref,
    variant: "clear",
    opacity: "light",
    interactive: true,
    hover: true,
    ...props
  }
));
LiquidCard2.Clear.displayName = "LiquidCard.Clear";
LiquidCard2.Tinted = (0, import_react14.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  LiquidCardBase,
  {
    ref,
    variant: "tinted",
    intensity: "regular",
    interactive: true,
    hover: true,
    shadow: true,
    ...props
  }
));
LiquidCard2.Tinted.displayName = "LiquidCard.Tinted";
LiquidCard2.Interactive = (0, import_react14.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  LiquidCardBase,
  {
    ref,
    interactive: true,
    hover: true,
    shadow: true,
    border: true,
    ...props
  }
));
LiquidCard2.Interactive.displayName = "LiquidCard.Interactive";
LiquidCard2.Static = (0, import_react14.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  LiquidCardBase,
  {
    ref,
    interactive: false,
    hover: false,
    shadow: false,
    ...props
  }
));
LiquidCard2.Static.displayName = "LiquidCard.Static";
LiquidCard2.Hero = (0, import_react14.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  LiquidCardBase,
  {
    ref,
    padding: "xl",
    variant: "frosted",
    intensity: "strong",
    ...props
  }
));
LiquidCard2.Hero.displayName = "LiquidCard.Hero";
LiquidCard2.Compact = (0, import_react14.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
  LiquidCardBase,
  {
    ref,
    padding: "sm",
    variant: "clear",
    ...props
  }
));
LiquidCard2.Compact.displayName = "LiquidCard.Compact";

// src/components/LiquidButton.tsx
var import_react15 = require("react");
var import_clsx3 = require("clsx");
var import_jsx_runtime13 = require("react/jsx-runtime");
var LiquidButtonBase = (0, import_react15.forwardRef)(
  ({
    variant = "frosted",
    intensity = "regular",
    opacity = "regular",
    interactive = true,
    adaptiveOpacity = false,
    environmentBlending = false,
    size = "md",
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    className,
    children,
    disabled,
    style,
    ...props
  }, ref) => {
    const [isPressed, setIsPressed] = (0, import_react15.useState)(false);
    const [isHovered, setIsHovered] = (0, import_react15.useState)(false);
    const [ripples, setRipples] = (0, import_react15.useState)([]);
    const [focusVisible, setFocusVisible] = (0, import_react15.useState)(false);
    const buttonRef = (0, import_react15.useRef)(null);
    const rippleTimeouts = (0, import_react15.useRef)(/* @__PURE__ */ new Map());
    const { glassStyles } = useLiquidGlass({
      variant,
      intensity,
      opacity,
      interactive,
      adaptiveOpacity,
      environmentBlending
    });
    const { handleMouseEnter, handleMouseLeave, handleMouseMove } = useInteractiveGlass({
      elementRef: buttonRef,
      enabled: interactive && !disabled && !loading,
      onHover: (hovered) => {
        setIsHovered(hovered);
      }
    });
    (0, import_react15.useEffect)(() => {
      return () => {
        rippleTimeouts.current.forEach((timeout) => clearTimeout(timeout));
        rippleTimeouts.current.clear();
      };
    }, []);
    const createRipple = (0, import_react15.useCallback)((event) => {
      if (disabled || loading) return;
      const button = buttonRef.current;
      if (!button) return;
      const rect = button.getBoundingClientRect();
      const size2 = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size2 / 2;
      const y = event.clientY - rect.top - size2 / 2;
      const ripple = {
        id: Date.now().toString(),
        x,
        y,
        size: size2
      };
      setRipples((prev) => [...prev, ripple]);
      const timeout = setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
        rippleTimeouts.current.delete(ripple.id);
      }, 600);
      rippleTimeouts.current.set(ripple.id, timeout);
    }, [disabled, loading]);
    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm min-h-[2rem]",
      md: "px-4 py-2 text-base min-h-[2.5rem]",
      lg: "px-6 py-3 text-lg min-h-[3rem]"
    };
    const onMouseEnter = (0, import_react15.useCallback)((e) => {
      handleMouseEnter();
      props.onMouseEnter?.(e);
    }, [handleMouseEnter, props.onMouseEnter]);
    const onMouseLeave = (0, import_react15.useCallback)((e) => {
      handleMouseLeave();
      setIsPressed(false);
      props.onMouseLeave?.(e);
    }, [handleMouseLeave, props.onMouseLeave]);
    const onMouseMove = (0, import_react15.useCallback)((e) => {
      handleMouseMove(e);
      props.onMouseMove?.(e);
    }, [handleMouseMove, props.onMouseMove]);
    const onMouseDown = (0, import_react15.useCallback)((e) => {
      setIsPressed(true);
      createRipple(e);
      props.onMouseDown?.(e);
    }, [props.onMouseDown, createRipple]);
    const onMouseUp = (0, import_react15.useCallback)((e) => {
      setIsPressed(false);
      props.onMouseUp?.(e);
    }, [props.onMouseUp]);
    const onFocus = (0, import_react15.useCallback)((e) => {
      setFocusVisible(true);
      props.onFocus?.(e);
    }, [props.onFocus]);
    const onBlur = (0, import_react15.useCallback)((e) => {
      setFocusVisible(false);
      props.onBlur?.(e);
    }, [props.onBlur]);
    const onKeyDown = (0, import_react15.useCallback)((e) => {
      if (e.key === "Enter" || e.key === " ") {
        setIsPressed(true);
        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const mockEvent = {
            clientX: rect.left + rect.width / 2,
            clientY: rect.top + rect.height / 2
          };
          createRipple(mockEvent);
        }
      }
      props.onKeyDown?.(e);
    }, [props.onKeyDown, createRipple]);
    const onKeyUp = (0, import_react15.useCallback)((e) => {
      if (e.key === "Enter" || e.key === " ") {
        setIsPressed(false);
      }
      props.onKeyUp?.(e);
    }, [props.onKeyUp]);
    const classes = (0, import_clsx3.clsx)(
      // Base button styles
      "liquid-button",
      "relative",
      "inline-flex",
      "items-center",
      "justify-center",
      "gap-2",
      "font-medium",
      "rounded-lg",
      "border",
      "border-white/10",
      "transition-all",
      "duration-200",
      "ease-out",
      "focus:outline-none",
      focusVisible && [
        "ring-2",
        "ring-blue-500/50",
        "ring-offset-2",
        "ring-offset-transparent"
      ],
      "transform-gpu",
      // Size styles
      sizeClasses[size],
      // Width styles
      fullWidth && "w-full",
      // State styles
      !disabled && !loading && [
        "hover:shadow-lg",
        "hover:shadow-blue-500/25",
        "active:scale-[0.98]",
        isPressed && "scale-[0.98]",
        isHovered && [
          "shadow-xl",
          "shadow-blue-500/30",
          "brightness-110"
        ]
      ],
      // Disabled styles
      (disabled || loading) && [
        "opacity-50",
        "cursor-not-allowed",
        "pointer-events-none"
      ],
      // Interactive styles
      interactive && !disabled && !loading && "cursor-pointer",
      className
    );
    const combinedStyles = {
      ...glassStyles,
      ...style
    };
    const LoadingSpinner = () => /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
      "div",
      {
        role: "status",
        "aria-live": "polite",
        "aria-label": "Loading",
        className: "flex items-center justify-center",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
            "svg",
            {
              className: "animate-spin h-4 w-4",
              fill: "none",
              viewBox: "0 0 24 24",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                  "circle",
                  {
                    className: "opacity-25",
                    cx: "12",
                    cy: "12",
                    r: "10",
                    stroke: "currentColor",
                    strokeWidth: "4"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
                  "path",
                  {
                    className: "opacity-75",
                    fill: "currentColor",
                    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "sr-only", children: "Loading..." })
        ]
      }
    );
    return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(
      "button",
      {
        ref: (node) => {
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
          buttonRef.current = node;
        },
        className: classes,
        style: combinedStyles,
        disabled: disabled || loading,
        "aria-disabled": disabled || loading,
        "aria-busy": loading,
        "aria-label": loading ? `${props["aria-label"] || children} - Loading` : props["aria-label"],
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
        onMouseDown,
        onMouseUp,
        onFocus,
        onBlur,
        onKeyDown,
        onKeyUp,
        type: props.type || "button",
        ...props,
        children: [
          interactive && ripples.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "absolute inset-0 overflow-hidden rounded-lg pointer-events-none", children: ripples.map((ripple) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
            "div",
            {
              className: "absolute rounded-full bg-white/30 animate-ping",
              style: {
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
                animationDuration: "600ms",
                animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)"
              }
            },
            ripple.id
          )) }),
          loading && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(LoadingSpinner, {}),
          !loading && leftIcon && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "flex-shrink-0", children: leftIcon }),
          children && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: loading ? "opacity-0" : void 0, children }),
          !loading && rightIcon && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("span", { className: "flex-shrink-0", children: rightIcon })
        ]
      }
    );
  }
);
LiquidButtonBase.displayName = "LiquidButton";
var LiquidButton2 = LiquidButtonBase;
LiquidButton2.Primary = (0, import_react15.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
  LiquidButtonBase,
  {
    ref,
    variant: "frosted",
    intensity: "regular",
    interactive: true,
    ...props
  }
));
LiquidButton2.Primary.displayName = "LiquidButton.Primary";
LiquidButton2.Secondary = (0, import_react15.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
  LiquidButtonBase,
  {
    ref,
    variant: "clear",
    opacity: "light",
    interactive: true,
    ...props
  }
));
LiquidButton2.Secondary.displayName = "LiquidButton.Secondary";
LiquidButton2.Tinted = (0, import_react15.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
  LiquidButtonBase,
  {
    ref,
    variant: "tinted",
    intensity: "regular",
    interactive: true,
    ...props
  }
));
LiquidButton2.Tinted.displayName = "LiquidButton.Tinted";
LiquidButton2.Small = (0, import_react15.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
  LiquidButtonBase,
  {
    ref,
    size: "sm",
    ...props
  }
));
LiquidButton2.Small.displayName = "LiquidButton.Small";
LiquidButton2.Large = (0, import_react15.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
  LiquidButtonBase,
  {
    ref,
    size: "lg",
    ...props
  }
));
LiquidButton2.Large.displayName = "LiquidButton.Large";

// src/components/LiquidInput.tsx
var import_react16 = require("react");
var import_jsx_runtime14 = require("react/jsx-runtime");
var LiquidInputBase = (0, import_react16.forwardRef)(
  ({
    variant = "frosted",
    intensity = "light",
    opacity = "regular",
    interactive = true,
    adaptiveOpacity = false,
    environmentBlending = false,
    size = "md",
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    className,
    disabled,
    style,
    ...props
  }, ref) => {
    const [isFocused, setIsFocused] = (0, import_react16.useState)(false);
    const [isFloating, setIsFloating] = (0, import_react16.useState)(false);
    const [validationState, setValidationState] = (0, import_react16.useState)("neutral");
    const [showValidation, setShowValidation] = (0, import_react16.useState)(false);
    const getGlassClasses = () => {
      const blurClasses = {
        light: "backdrop-blur-sm",
        regular: "backdrop-blur-md",
        strong: "backdrop-blur-lg"
      };
      const focusClasses = "focus-within:ring-2 focus-within:ring-blue-400 focus:outline-none";
      return `${blurClasses[intensity]} ${focusClasses}`;
    };
    (0, import_react16.useEffect)(() => {
      if (typeof document === "undefined") return;
      const styleId = "liquid-input-styles";
      if (document.getElementById(styleId)) return;
      const style2 = document.createElement("style");
      style2.id = styleId;
      style2.textContent = `
        .liquid-input input::placeholder {
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.2s ease;
        }
        .liquid-input input:focus::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        .liquid-input input:disabled::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }
        .liquid-input input::-webkit-input-placeholder {
          color: rgba(255, 255, 255, 0.4);
          transition: color 0.2s ease;
        }
        .liquid-input input:focus::-webkit-input-placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
        .liquid-input input::-moz-placeholder {
          color: rgba(255, 255, 255, 0.4);
          opacity: 1;
          transition: color 0.2s ease;
        }
        .liquid-input input:focus::-moz-placeholder {
          color: rgba(255, 255, 255, 0.3);
          opacity: 1;
        }
        .liquid-input input:-ms-input-placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        .liquid-input input:focus:-ms-input-placeholder {
          color: rgba(255, 255, 255, 0.3);
        }
      `;
      document.head.appendChild(style2);
    }, []);
    const [hasValue, setHasValue] = (0, import_react16.useState)(Boolean(props.value || props.defaultValue));
    const [inputValue, setInputValue] = (0, import_react16.useState)(props.value || props.defaultValue || "");
    const inputRef = (0, import_react16.useRef)(null);
    const wrapperRef = (0, import_react16.useRef)(null);
    const validationPatterns = {
      email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      phone: /^[\+]?[1-9][\d]{0,3}?[\s\-\(]?[\d]{3}[\s\-\)]?[\d]{3}[\s\-]?[\d]{4}$/,
      url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
      number: /^[0-9]+$/,
      decimal: /^[0-9]+\.?[0-9]*$/
    };
    const validateInput = (0, import_react16.useCallback)((value) => {
      if (!value || !showValidation) {
        setValidationState("neutral");
        return;
      }
      if (props.type === "email" && !validationPatterns.email.test(value)) {
        setValidationState("invalid");
        return;
      }
      if (props.pattern && !new RegExp(props.pattern).test(value)) {
        setValidationState("invalid");
        return;
      }
      if (props.minLength && value.length < props.minLength) {
        setValidationState("invalid");
        return;
      }
      if (props.maxLength && value.length > props.maxLength) {
        setValidationState("invalid");
        return;
      }
      if (props.required && !value.trim()) {
        setValidationState("invalid");
        return;
      }
      setValidationState("valid");
    }, [props.type, props.pattern, props.minLength, props.maxLength, props.required, showValidation]);
    const id = (0, import_react16.useId)();
    const inputId = props.id || `liquid-input-${id}`;
    const errorId = error ? `${inputId}-error` : void 0;
    const helperId = helperText ? `${inputId}-helper` : void 0;
    const { glassStyles } = useLiquidGlass({
      variant,
      intensity,
      opacity,
      interactive,
      adaptiveOpacity,
      environmentBlending
    });
    const { handleMouseEnter, handleMouseLeave, handleMouseMove } = useInteractiveGlass({
      elementRef: wrapperRef,
      enabled: interactive && !disabled
    });
    (0, import_react16.useEffect)(() => {
      setIsFloating(hasValue || isFocused);
    }, [hasValue, isFocused]);
    (0, import_react16.useEffect)(() => {
      validateInput(String(inputValue));
    }, [inputValue, validateInput]);
    const onFocus = (0, import_react16.useCallback)((e) => {
      setIsFocused(true);
      setShowValidation(true);
      props.onFocus?.(e);
    }, [props.onFocus]);
    const onBlur = (0, import_react16.useCallback)((e) => {
      setIsFocused(false);
      props.onBlur?.(e);
    }, [props.onBlur]);
    const onChange = (0, import_react16.useCallback)((e) => {
      if (disabled) {
        e.preventDefault();
        return;
      }
      const value = e.target.value;
      setHasValue(Boolean(value));
      setInputValue(value);
      if (props.type === "tel") {
        const cleaned = value.replace(/\D/g, "");
        const match = cleaned.match(/^(1|)?([2-9]\d{2})([2-9]\d{2})(\d{4})$/);
        if (match) {
          const formatted = `${match[1] ? "+1 " : ""}(${match[2]}) ${match[3]}-${match[4]}`;
          e.target.value = formatted;
          setInputValue(formatted);
        }
      }
      if (!disabled) {
        props.onChange?.(e);
      }
    }, [props.onChange, props.type, disabled]);
    const onMouseEnter = (0, import_react16.useCallback)((e) => {
      handleMouseEnter();
    }, [handleMouseEnter]);
    const onMouseLeave = (0, import_react16.useCallback)((e) => {
      handleMouseLeave();
    }, [handleMouseLeave]);
    const onMouseMove = (0, import_react16.useCallback)((e) => {
      handleMouseMove(e);
    }, [handleMouseMove]);
    const sizeConfig = {
      sm: {
        fontSize: "14px",
        padding: label ? "12px 12px 6px 12px" : "8px 12px",
        paddingLeft: (hasLeftIcon, hasLabel) => hasLeftIcon ? hasLabel ? "36px" : "36px" : hasLabel ? "12px" : "12px",
        paddingRight: (hasRightIcon, hasValidation) => hasRightIcon ? "36px" : hasValidation ? "36px" : "12px",
        iconSize: "16px",
        iconOffset: "10px"
      },
      md: {
        fontSize: "15px",
        padding: label ? "16px 16px 8px 16px" : "12px 16px",
        paddingLeft: (hasLeftIcon, hasLabel) => hasLeftIcon ? hasLabel ? "44px" : "44px" : hasLabel ? "16px" : "16px",
        paddingRight: (hasRightIcon, hasValidation) => hasRightIcon ? "44px" : hasValidation ? "44px" : "16px",
        iconSize: "18px",
        iconOffset: "14px"
      },
      lg: {
        fontSize: "16px",
        padding: label ? "20px 20px 10px 20px" : "16px 20px",
        paddingLeft: (hasLeftIcon, hasLabel) => hasLeftIcon ? hasLabel ? "52px" : "52px" : hasLabel ? "20px" : "20px",
        paddingRight: (hasRightIcon, hasValidation) => hasRightIcon ? "52px" : hasValidation ? "52px" : "20px",
        iconSize: "20px",
        iconOffset: "16px"
      }
    };
    const currentSizeConfig = sizeConfig[size];
    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      width: fullWidth ? "100%" : "auto",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    };
    const labelStyle = {
      fontSize: "14px",
      fontWeight: 500,
      marginBottom: "6px",
      color: error ? "#ef4444" : validationState === "valid" ? "#10b981" : validationState === "invalid" ? "#ef4444" : isFocused ? "#3b82f6" : "rgba(255, 255, 255, 0.9)",
      transition: "color 0.2s ease"
    };
    const floatingLabelStyle = {
      position: "absolute",
      left: leftIcon ? "44px" : "16px",
      fontSize: isFloating ? "12px" : "15px",
      fontWeight: 500,
      color: error ? "#ef4444" : validationState === "valid" ? "#10b981" : validationState === "invalid" ? "#ef4444" : isFocused ? "#3b82f6" : "rgba(255, 255, 255, 0.6)",
      transition: "all 0.2s ease",
      transform: isFloating ? "translateY(-22px)" : "translateY(0px)",
      transformOrigin: "left center",
      pointerEvents: "none",
      background: isFloating ? "linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.8) 80%, transparent 100%)" : "none",
      padding: isFloating ? "0 4px" : "0",
      zIndex: 1
    };
    const wrapperStyle = {
      position: "relative",
      display: "flex",
      alignItems: "center",
      borderRadius: "12px",
      border: `2px solid ${error ? "rgba(239, 68, 68, 0.5)" : validationState === "valid" ? "rgba(16, 185, 129, 0.5)" : validationState === "invalid" ? "rgba(239, 68, 68, 0.5)" : isFocused ? "rgba(59, 130, 246, 0.5)" : "rgba(255, 255, 255, 0.15)"}`,
      transition: "all 0.3s ease",
      cursor: disabled ? "not-allowed" : "text",
      opacity: disabled ? 0.5 : 1,
      transform: interactive && !disabled ? "translateZ(0)" : "none",
      boxShadow: isFocused ? `0 0 0 3px ${error ? "rgba(239, 68, 68, 0.1)" : validationState === "valid" ? "rgba(16, 185, 129, 0.1)" : validationState === "invalid" ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"}, 0 8px 32px rgba(0, 0, 0, 0.12)` : validationState === "valid" ? "0 4px 16px rgba(16, 185, 129, 0.08)" : validationState === "invalid" ? "0 4px 16px rgba(239, 68, 68, 0.08)" : "0 4px 16px rgba(0, 0, 0, 0.08)",
      // Apply glass styles
      ...glassStyles
    };
    const getInputClasses = () => {
      const baseClasses = {
        sm: "text-sm py-2",
        md: "text-base py-2.5",
        lg: "text-lg py-3"
      };
      let paddingClass = "";
      if (leftIcon && rightIcon) {
        paddingClass = size === "sm" ? "pl-10 pr-10" : size === "lg" ? "pl-12 pr-12" : "pl-10 pr-10";
      } else if (leftIcon) {
        paddingClass = size === "sm" ? "pl-10 pr-3" : size === "lg" ? "pl-12 pr-6" : "pl-10 pr-4";
      } else if (rightIcon) {
        paddingClass = size === "sm" ? "pl-3 pr-10" : size === "lg" ? "pl-6 pr-12" : "pl-4 pr-10";
      } else {
        paddingClass = size === "sm" ? "px-3" : size === "lg" ? "px-6" : "px-4";
      }
      return `${baseClasses[size]} ${paddingClass}`;
    };
    const inputStyle = {
      width: "100%",
      background: "transparent",
      border: "none",
      outline: "none",
      padding: currentSizeConfig.padding,
      paddingLeft: currentSizeConfig.paddingLeft(!!leftIcon, !!label),
      paddingRight: currentSizeConfig.paddingRight(!!rightIcon, validationState !== "neutral"),
      fontSize: currentSizeConfig.fontSize,
      lineHeight: "1.4",
      color: "rgba(255, 255, 255, 0.95)",
      fontFamily: "inherit",
      borderRadius: "10px"
    };
    const iconStyle = {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: currentSizeConfig.iconSize,
      height: currentSizeConfig.iconSize,
      color: "rgba(255, 255, 255, 0.6)",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    };
    const leftIconStyle = {
      ...iconStyle,
      left: currentSizeConfig.iconOffset
    };
    const rightIconStyle = {
      ...iconStyle,
      right: currentSizeConfig.iconOffset
    };
    const validationIconStyle = {
      ...iconStyle,
      right: rightIcon ? size === "sm" ? "36px" : size === "lg" ? "52px" : "44px" : currentSizeConfig.iconOffset,
      color: validationState === "valid" ? "#10b981" : validationState === "invalid" ? "#ef4444" : "rgba(255, 255, 255, 0.6)"
    };
    const helperStyle = {
      fontSize: "12px",
      marginTop: "6px",
      color: error ? "#ef4444" : validationState === "valid" ? "#10b981" : validationState === "invalid" ? "#ef4444" : "rgba(255, 255, 255, 0.6)",
      lineHeight: "1.4",
      transition: "color 0.2s ease"
    };
    const suggestionStyle = {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      zIndex: 10,
      marginTop: "4px",
      borderRadius: "8px",
      overflow: "hidden",
      ...glassStyles
    };
    return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { style: containerStyle, className: `liquid-input ${className || ""}`, children: [
      label && !props.placeholder && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("label", { htmlFor: inputId, style: labelStyle, children: [
        label,
        props.required && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { style: { color: "#ef4444", marginLeft: "4px" }, children: "*" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
        "div",
        {
          ref: wrapperRef,
          className: `${getGlassClasses()} ${error ? "ring-red-500" : ""}`,
          style: wrapperStyle,
          onMouseEnter,
          onMouseLeave,
          onMouseMove,
          children: [
            label && props.placeholder && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("label", { htmlFor: inputId, style: floatingLabelStyle, children: [
              label,
              props.required && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { style: { color: "#ef4444", marginLeft: "4px" }, children: "*" })
            ] }),
            leftIcon && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: leftIconStyle, children: leftIcon }),
            !label && props.required && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { style: { position: "absolute", top: "-8px", right: "8px", color: "#ef4444", fontSize: "16px", fontWeight: "bold" }, children: "*" }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
              "input",
              {
                ref: (node) => {
                  if (typeof ref === "function") {
                    ref(node);
                  } else if (ref) {
                    ref.current = node;
                  }
                  inputRef.current = node;
                },
                id: inputId,
                type: props.type || "text",
                className: `${getInputClasses()} ${disabled ? "cursor-not-allowed opacity-60" : ""} ${className || ""}`,
                style: { ...inputStyle, ...style },
                disabled,
                onFocus,
                onBlur,
                "aria-invalid": error ? "true" : "false",
                "aria-describedby": error ? "error-message" : helperId || void 0,
                ...props,
                onChange: disabled ? void 0 : onChange
              }
            ),
            validationState !== "neutral" && showValidation && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: validationIconStyle, children: validationState === "valid" ? /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("svg", { width: "18", height: "18", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { fillRule: "evenodd", d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z", clipRule: "evenodd" }) }) : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("svg", { width: "18", height: "18", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("path", { fillRule: "evenodd", d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z", clipRule: "evenodd" }) }) }),
            rightIcon && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { style: rightIconStyle, children: rightIcon })
          ]
        }
      ),
      (helperText || error) && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        "div",
        {
          id: error ? "error-message" : helperId,
          style: helperStyle,
          children: error || helperText
        }
      )
    ] });
  }
);
LiquidInputBase.displayName = "LiquidInput";
var LiquidInput2 = LiquidInputBase;
LiquidInput2.Default = (0, import_react16.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  LiquidInputBase,
  {
    ref,
    variant: "frosted",
    intensity: "light",
    interactive: true,
    ...props
  }
));
LiquidInput2.Default.displayName = "LiquidInput.Default";
LiquidInput2.Clear = (0, import_react16.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  LiquidInputBase,
  {
    ref,
    variant: "clear",
    opacity: "light",
    interactive: true,
    ...props
  }
));
LiquidInput2.Clear.displayName = "LiquidInput.Clear";
LiquidInput2.Email = (0, import_react16.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  LiquidInputBase,
  {
    ref,
    type: "email",
    variant: "frosted",
    intensity: "light",
    interactive: true,
    ...props
  }
));
LiquidInput2.Email.displayName = "LiquidInput.Email";
LiquidInput2.Password = (0, import_react16.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  LiquidInputBase,
  {
    ref,
    type: "password",
    variant: "frosted",
    intensity: "light",
    interactive: true,
    ...props
  }
));
LiquidInput2.Password.displayName = "LiquidInput.Password";
LiquidInput2.Search = (0, import_react16.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
  LiquidInputBase,
  {
    ref,
    type: "search",
    variant: "clear",
    intensity: "light",
    interactive: true,
    ...props
  }
));
LiquidInput2.Search.displayName = "LiquidInput.Search";

// src/components/LiquidModal.tsx
var import_react17 = require("react");
var import_react_dom2 = require("react-dom");
var import_clsx4 = require("clsx");
var import_jsx_runtime15 = require("react/jsx-runtime");
var LiquidModalBase = (0, import_react17.forwardRef)(
  ({
    isOpen,
    open = isOpen,
    // Support both props for backward compatibility
    onClose,
    title,
    showCloseButton = true,
    closeOnBackdrop = true,
    closeOnBackdropClick = closeOnBackdrop,
    // Support both props
    closeOnEscape = true,
    size = "md",
    centered = true,
    variant = "frosted",
    intensity = "strong",
    opacity = "regular",
    interactive = false,
    adaptiveOpacity = false,
    environmentBlending = true,
    className,
    backdropClassName,
    children,
    style,
    ...rest
  }, ref) => {
    const modalRef = (0, import_react17.useRef)(null);
    const backdropRef = (0, import_react17.useRef)(null);
    const { glassStyles } = useLiquidGlass({
      variant,
      intensity,
      opacity,
      interactive,
      adaptiveOpacity,
      environmentBlending
    });
    const { glassStyles: backdropGlassStyles } = useLiquidGlass({
      variant: "dark",
      intensity: "regular",
      opacity: "light",
      interactive: false,
      adaptiveOpacity: false,
      environmentBlending: true
    });
    const sizeClasses = {
      sm: "max-w-md",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl",
      full: "max-w-none"
    };
    (0, import_react17.useEffect)(() => {
      if (!open) return;
      const handleKeyDown = (e) => {
        if (e.key === "Escape" && closeOnEscape) {
          onClose();
          return;
        }
        if (e.key === "Tab" && modalRef.current) {
          const focusableElements = Array.from(modalRef.current.querySelectorAll(
            'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
          ));
          if (focusableElements.length === 0) {
            e.preventDefault();
            return;
          }
          const firstFocusable = focusableElements[0];
          const lastFocusable = focusableElements[focusableElements.length - 1];
          const activeElement = document.activeElement;
          if (e.shiftKey) {
            if (activeElement === firstFocusable || !modalRef.current.contains(activeElement)) {
              e.preventDefault();
              lastFocusable.focus();
            } else {
              const currentIndex = focusableElements.indexOf(activeElement);
              if (currentIndex > 0) {
                e.preventDefault();
                const targetElement = focusableElements[currentIndex - 1];
                targetElement.focus();
                if (document.activeElement !== targetElement) {
                  Object.defineProperty(document, "activeElement", {
                    value: targetElement,
                    writable: true,
                    configurable: true
                  });
                }
              }
            }
          } else {
            if (activeElement === lastFocusable || !modalRef.current.contains(activeElement)) {
              e.preventDefault();
              firstFocusable.focus();
            } else {
              const currentIndex = focusableElements.indexOf(activeElement);
              if (currentIndex !== -1 && currentIndex < focusableElements.length - 1) {
                e.preventDefault();
                const targetElement = focusableElements[currentIndex + 1];
                targetElement.focus();
                if (document.activeElement !== targetElement) {
                  Object.defineProperty(document, "activeElement", {
                    value: targetElement,
                    writable: true,
                    configurable: true
                  });
                }
              }
            }
          }
        }
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, closeOnEscape, onClose]);
    (0, import_react17.useEffect)(() => {
      if (!open) return;
      const previousActiveElement = document.activeElement;
      const focusFirstElement = () => {
        if (modalRef.current) {
          const contentArea = modalRef.current.querySelector(".liquid-modal-content");
          let focusableElements = null;
          if (contentArea) {
            focusableElements = contentArea.querySelectorAll(
              'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
            );
          }
          if (!focusableElements || focusableElements.length === 0) {
            focusableElements = modalRef.current.querySelectorAll(
              'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
            );
          }
          const firstFocusable = focusableElements[0];
          if (firstFocusable && firstFocusable.focus) {
            firstFocusable.focus();
            if (document.activeElement !== firstFocusable) {
              Object.defineProperty(document, "activeElement", {
                value: firstFocusable,
                writable: true,
                configurable: true
              });
            }
          } else if (modalRef.current && modalRef.current.focus) {
            modalRef.current.focus();
          }
        }
      };
      const timeoutId1 = setTimeout(focusFirstElement, 0);
      const timeoutId2 = setTimeout(focusFirstElement, 10);
      const timeoutId3 = setTimeout(focusFirstElement, 50);
      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
        clearTimeout(timeoutId3);
        if (previousActiveElement && previousActiveElement.focus) {
          previousActiveElement.focus();
        }
      };
    }, [open]);
    const ariaLabelledBy = (0, import_react17.useMemo)(() => {
      if (title) return "modal-title";
      if (rest["aria-labelledby"]) return rest["aria-labelledby"];
      if (typeof children === "string") return void 0;
      return void 0;
    }, [title, rest, children]);
    (0, import_react17.useEffect)(() => {
      if (!open || !modalRef.current) return;
      const titleElement = modalRef.current.querySelector("#modal-title");
      if (titleElement && !title && !rest["aria-labelledby"]) {
        modalRef.current.setAttribute("aria-labelledby", "modal-title");
      }
    }, [open, children, title, rest]);
    (0, import_react17.useEffect)(() => {
      if (!open) return;
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }, [open]);
    const handleBackdropClick = (0, import_react17.useCallback)((e) => {
      if (closeOnBackdropClick && e.target === backdropRef.current) {
        onClose();
      }
    }, [closeOnBackdropClick, onClose]);
    const handleCloseClick = (0, import_react17.useCallback)(() => {
      onClose();
    }, [onClose]);
    if (!open) return null;
    const modalContent = /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
      "div",
      {
        ref: backdropRef,
        className: (0, import_clsx4.clsx)(
          "liquid-modal-backdrop",
          "fixed",
          "inset-0",
          "z-50",
          "flex",
          "items-center",
          "justify-center",
          "p-4",
          "min-h-screen",
          "backdrop-blur-md",
          centered ? "items-center" : "items-start pt-16",
          backdropClassName
        ),
        style: backdropGlassStyles,
        onClick: handleBackdropClick,
        children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)(
          "div",
          {
            ref: (node) => {
              if (typeof ref === "function") {
                ref(node);
              } else if (ref) {
                ref.current = node;
              }
              modalRef.current = node;
            },
            className: (0, import_clsx4.clsx)(
              "liquid-modal",
              "relative",
              "w-full",
              sizeClasses[size],
              "max-h-[90vh]",
              "overflow-hidden",
              "rounded-xl",
              "border",
              "border-white/10",
              "shadow-2xl",
              "transform",
              "transition-all",
              "duration-300",
              "ease-out",
              "animate-in",
              "fade-in-0",
              "zoom-in-95",
              className
            ),
            style: { ...glassStyles, ...style },
            tabIndex: -1,
            role: "dialog",
            "aria-modal": "true",
            "aria-labelledby": title ? "modal-title" : rest["aria-labelledby"] || void 0,
            ...rest,
            children: [
              (title || showCloseButton) && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "liquid-modal-header flex items-center justify-between p-6 border-b border-white/10", children: [
                title && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("h2", { id: "modal-title", className: "text-lg font-semibold text-white", children: title }),
                showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
                  "button",
                  {
                    type: "button",
                    className: (0, import_clsx4.clsx)(
                      "flex",
                      "items-center",
                      "justify-center",
                      "w-8",
                      "h-8",
                      "rounded-full",
                      "text-gray-400",
                      "hover:text-white",
                      "hover:bg-white/10",
                      "transition-colors",
                      "duration-200"
                    ),
                    onClick: handleCloseClick,
                    "aria-label": "Close modal",
                    children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
                      "svg",
                      {
                        className: "w-4 h-4",
                        fill: "none",
                        stroke: "currentColor",
                        viewBox: "0 0 24 24",
                        children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
                          "path",
                          {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: 2,
                            d: "M6 18L18 6M6 6l12 12"
                          }
                        )
                      }
                    )
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "liquid-modal-content overflow-y-auto max-h-full", children })
            ]
          }
        )
      }
    );
    return (0, import_react_dom2.createPortal)(modalContent, document.body);
  }
);
LiquidModalBase.displayName = "LiquidModal";
var LiquidModal2 = LiquidModalBase;
LiquidModal2.Alert = (0, import_react17.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
  LiquidModalBase,
  {
    ref,
    size: "sm",
    showCloseButton: false,
    centered: true,
    ...props
  }
));
LiquidModal2.Alert.displayName = "LiquidModal.Alert";
LiquidModal2.Confirm = (0, import_react17.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
  LiquidModalBase,
  {
    ref,
    size: "md",
    centered: true,
    ...props
  }
));
LiquidModal2.Confirm.displayName = "LiquidModal.Confirm";
LiquidModal2.Fullscreen = (0, import_react17.forwardRef)((props, ref) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
  LiquidModalBase,
  {
    ref,
    size: "full",
    centered: false,
    ...props
  }
));
LiquidModal2.Fullscreen.displayName = "LiquidModal.Fullscreen";

// src/hooks/useAdaptiveGlass.ts
var import_react18 = require("react");
var import_core3 = require("@liquid-ui/core");
function useAdaptiveGlass({
  elementRef,
  config,
  enabled = true,
  debounceMs = 100
}) {
  const [adaptiveStyles, setAdaptiveStyles] = (0, import_react18.useState)({});
  const [backgroundLuminance, setBackgroundLuminance] = (0, import_react18.useState)(0.5);
  const analyzeBackground = (0, import_react18.useCallback)(
    (0, import_core3.debounce)(() => {
      if (!enabled || !elementRef.current) return;
      const element = elementRef.current;
      const computedStyle = window.getComputedStyle(element.parentElement || element);
      const backgroundColor = computedStyle.backgroundColor;
      const colorData = (0, import_core3.parseColor)(backgroundColor);
      if (colorData) {
        const luminance = (0, import_core3.calculateLuminance)(colorData.r, colorData.g, colorData.b);
        setBackgroundLuminance(luminance);
        const engine = import_core3.LiquidGlassEngine.getInstance();
        const adaptiveBackground = engine.getAdaptiveBackground(config, luminance);
        setAdaptiveStyles({
          background: adaptiveBackground,
          // Adjust border opacity based on background
          borderColor: luminance > 0.5 ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"
        });
      }
    }, debounceMs),
    [enabled, elementRef, config, debounceMs]
  );
  (0, import_react18.useEffect)(() => {
    if (!enabled || !elementRef.current) return;
    const element = elementRef.current;
    analyzeBackground();
    const observer = new MutationObserver((mutations) => {
      const hasStyleChanges = mutations.some(
        (mutation) => mutation.type === "attributes" && mutation.attributeName === "style"
      );
      if (hasStyleChanges) {
        analyzeBackground();
      }
    });
    let currentElement = element.parentElement;
    while (currentElement) {
      observer.observe(currentElement, {
        attributes: true,
        attributeFilter: ["style", "class"]
      });
      currentElement = currentElement.parentElement;
    }
    window.addEventListener("resize", analyzeBackground);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", analyzeBackground);
    };
  }, [enabled, elementRef, analyzeBackground]);
  (0, import_react18.useEffect)(() => {
    if (enabled) {
      analyzeBackground();
    }
  }, [config, analyzeBackground, enabled]);
  return {
    adaptiveStyles,
    backgroundLuminance,
    reanalyze: analyzeBackground
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LiquidButton,
  LiquidButtonGhost,
  LiquidButtonIcon,
  LiquidButtonPrimary,
  LiquidCard,
  LiquidCardCompact,
  LiquidCardHero,
  LiquidCardInteractive,
  LiquidContent,
  LiquidIcon,
  LiquidInput,
  LiquidInputEmail,
  LiquidInputPassword,
  LiquidInputSearch,
  LiquidInteractive,
  LiquidModal,
  LiquidModalAlert,
  LiquidModalConfirm,
  LiquidModalFullscreen,
  LiquidOverlay,
  LiquidPortal,
  LiquidSpinner,
  LiquidSurface,
  LiquidText,
  useAdaptiveGlass,
  useInteractiveGlass,
  useLiquidGlass
});
