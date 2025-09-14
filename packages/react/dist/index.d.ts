import React$1, { HTMLAttributes, ReactNode, CSSProperties, ForwardRefExoticComponent, RefAttributes, ButtonHTMLAttributes, InputHTMLAttributes, RefObject } from 'react';
import * as _liquid_ui_core from '@liquid-ui/core';
import { GlassVariant, BlurIntensity, OpacityLevel, GlassConfig } from '@liquid-ui/core';
export { BlurIntensity, GlassConfig, GlassVariant, LiquidGlassStyles, OpacityLevel, Point, Rect } from '@liquid-ui/core';

interface LiquidBaseProps extends HTMLAttributes<HTMLElement> {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}
interface LiquidSurfaceProps extends LiquidBaseProps {
    variant?: GlassVariant;
    intensity?: BlurIntensity;
    opacity?: OpacityLevel;
    interactive?: boolean;
    adaptiveOpacity?: boolean;
    environmentBlending?: boolean;
    as?: keyof JSX.IntrinsicElements;
}
interface LiquidOverlayProps extends LiquidBaseProps {
    isOpen: boolean;
    onClose?: () => void;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    variant?: GlassVariant;
    intensity?: BlurIntensity;
}
interface LiquidContentProps extends LiquidBaseProps {
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    centered?: boolean;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
interface LiquidInteractiveProps extends LiquidBaseProps {
    onPress?: () => void;
    onPressStart?: () => void;
    onPressEnd?: () => void;
    onHover?: (isHovered: boolean) => void;
    disabled?: boolean;
    loading?: boolean;
    tabIndex?: number;
}
interface LiquidTextProps extends LiquidBaseProps {
    variant?: 'display' | 'title' | 'body' | 'caption' | 'label';
    weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
    align?: 'left' | 'center' | 'right';
    color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success';
    as?: keyof JSX.IntrinsicElements;
}
interface LiquidIconProps extends LiquidBaseProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
    spin?: boolean;
}
interface LiquidSpinnerProps extends LiquidBaseProps {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
}
interface LiquidPortalProps {
    children: ReactNode;
    target?: HTMLElement | string;
}

/**
 * LiquidSurface - Base primitive for all glass surfaces
 * Provides the fundamental glass effect layer that other components build upon
 */
declare const LiquidSurface: React$1.ForwardRefExoticComponent<LiquidSurfaceProps & React$1.RefAttributes<HTMLElement>>;

/**
 * LiquidOverlay - Primitive for modal backdrops and overlays
 * Provides glass-effect overlays with interaction handling
 */
declare const LiquidOverlay: React$1.FC<LiquidOverlayProps>;

/**
 * LiquidContent - Primitive for content containers
 * Provides consistent padding, alignment, and max-width constraints
 */
declare const LiquidContent: React$1.ForwardRefExoticComponent<LiquidContentProps & React$1.RefAttributes<HTMLDivElement>>;

/**
 * LiquidInteractive - Primitive for interactive elements
 * Handles press, hover, and focus states with consistent behavior
 */
declare const LiquidInteractive: React$1.ForwardRefExoticComponent<LiquidInteractiveProps & React$1.RefAttributes<HTMLDivElement>>;

/**
 * LiquidText - Primitive for typography
 * Provides consistent text styling across the design system
 */
declare const LiquidText: React$1.ForwardRefExoticComponent<LiquidTextProps & React$1.RefAttributes<HTMLElement>>;

/**
 * LiquidIcon - Primitive for icon rendering
 * Provides consistent icon sizing and styling
 */
declare const LiquidIcon: React$1.ForwardRefExoticComponent<LiquidIconProps & React$1.RefAttributes<HTMLSpanElement>>;

/**
 * LiquidSpinner - Primitive for loading indicators
 * Provides consistent loading spinners with glass effect
 */
declare const LiquidSpinner: React$1.FC<LiquidSpinnerProps>;

/**
 * LiquidPortal - Primitive for rendering content in a portal
 * Used by overlays and modals to render outside the component tree
 */
declare const LiquidPortal: React.FC<LiquidPortalProps>;

interface BaseLiquidProps {
    variant?: GlassVariant;
    intensity?: BlurIntensity;
    opacity?: OpacityLevel;
    interactive?: boolean;
    adaptiveOpacity?: boolean;
    environmentBlending?: boolean;
    className?: string;
    children?: ReactNode;
}
interface LiquidCardProps extends BaseLiquidProps, Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
    hover?: boolean;
    shadow?: boolean;
    border?: boolean;
    padding?: 'sm' | 'md' | 'lg' | 'xl';
    onHover?: (isHovered: boolean) => void;
    draggable?: boolean;
    magneticEdges?: boolean;
    magneticStrength?: number;
    onLiquidDragStart?: (e: React.MouseEvent | React.TouchEvent) => void;
    onLiquidDrag?: (e: MouseEvent | TouchEvent, position: {
        x: number;
        y: number;
    }) => void;
    onLiquidDragEnd?: (e: MouseEvent | TouchEvent) => void;
}
interface LiquidButtonProps extends BaseLiquidProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
    loading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
}
interface LiquidInputProps extends BaseLiquidProps, Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    fullWidth?: boolean;
    size?: 'sm' | 'md' | 'lg';
}
interface LiquidModalProps extends BaseLiquidProps, Omit<HTMLAttributes<HTMLDivElement>, 'className'> {
    isOpen?: boolean;
    open?: boolean;
    onClose: () => void;
    title?: string;
    showCloseButton?: boolean;
    closeOnBackdrop?: boolean;
    closeOnBackdropClick?: boolean;
    closeOnEscape?: boolean;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    centered?: boolean;
    backdropClassName?: string;
}
type LiquidCardComponent = ForwardRefExoticComponent<LiquidCardProps & RefAttributes<HTMLDivElement>> & {
    Frosted: ForwardRefExoticComponent<Omit<LiquidCardProps, 'variant' | 'intensity' | 'interactive' | 'hover' | 'shadow'> & RefAttributes<HTMLDivElement>>;
    Clear: ForwardRefExoticComponent<Omit<LiquidCardProps, 'variant' | 'opacity' | 'interactive' | 'hover'> & RefAttributes<HTMLDivElement>>;
    Tinted: ForwardRefExoticComponent<Omit<LiquidCardProps, 'variant' | 'intensity' | 'interactive' | 'hover' | 'shadow'> & RefAttributes<HTMLDivElement>>;
    Interactive: ForwardRefExoticComponent<Omit<LiquidCardProps, 'interactive' | 'hover' | 'shadow' | 'border'> & RefAttributes<HTMLDivElement>>;
    Static: ForwardRefExoticComponent<Omit<LiquidCardProps, 'interactive' | 'hover' | 'shadow'> & RefAttributes<HTMLDivElement>>;
    Hero: ForwardRefExoticComponent<Omit<LiquidCardProps, 'padding' | 'variant' | 'intensity'> & RefAttributes<HTMLDivElement>>;
    Compact: ForwardRefExoticComponent<Omit<LiquidCardProps, 'padding' | 'variant'> & RefAttributes<HTMLDivElement>>;
};
type LiquidButtonComponent = ForwardRefExoticComponent<LiquidButtonProps & RefAttributes<HTMLButtonElement>> & {
    Primary: ForwardRefExoticComponent<Omit<LiquidButtonProps, 'variant' | 'intensity' | 'interactive'> & RefAttributes<HTMLButtonElement>>;
    Secondary: ForwardRefExoticComponent<Omit<LiquidButtonProps, 'variant' | 'opacity' | 'interactive'> & RefAttributes<HTMLButtonElement>>;
    Tinted: ForwardRefExoticComponent<Omit<LiquidButtonProps, 'variant' | 'intensity' | 'interactive'> & RefAttributes<HTMLButtonElement>>;
    Small: ForwardRefExoticComponent<Omit<LiquidButtonProps, 'size'> & RefAttributes<HTMLButtonElement>>;
    Large: ForwardRefExoticComponent<Omit<LiquidButtonProps, 'size'> & RefAttributes<HTMLButtonElement>>;
};
type LiquidInputComponent = ForwardRefExoticComponent<LiquidInputProps & RefAttributes<HTMLInputElement>> & {
    Default: ForwardRefExoticComponent<Omit<LiquidInputProps, 'variant' | 'intensity' | 'interactive'> & RefAttributes<HTMLInputElement>>;
    Clear: ForwardRefExoticComponent<Omit<LiquidInputProps, 'variant' | 'opacity' | 'interactive'> & RefAttributes<HTMLInputElement>>;
    Email: ForwardRefExoticComponent<Omit<LiquidInputProps, 'type' | 'variant' | 'intensity' | 'interactive'> & RefAttributes<HTMLInputElement>>;
    Password: ForwardRefExoticComponent<Omit<LiquidInputProps, 'type' | 'variant' | 'intensity' | 'interactive'> & RefAttributes<HTMLInputElement>>;
    Search: ForwardRefExoticComponent<Omit<LiquidInputProps, 'type' | 'variant' | 'intensity' | 'interactive'> & RefAttributes<HTMLInputElement>>;
};
type LiquidModalComponent = ForwardRefExoticComponent<LiquidModalProps & RefAttributes<HTMLDivElement>> & {
    Alert: ForwardRefExoticComponent<Omit<LiquidModalProps, 'size' | 'showCloseButton' | 'centered'> & RefAttributes<HTMLDivElement>>;
    Confirm: ForwardRefExoticComponent<Omit<LiquidModalProps, 'size' | 'centered'> & RefAttributes<HTMLDivElement>>;
    Fullscreen: ForwardRefExoticComponent<Omit<LiquidModalProps, 'size' | 'centered'> & RefAttributes<HTMLDivElement>>;
};

declare const LiquidButtonPrimary: React$1.ForwardRefExoticComponent<LiquidButtonProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const LiquidButtonGhost: React$1.ForwardRefExoticComponent<LiquidButtonProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const LiquidButtonIcon: React$1.ForwardRefExoticComponent<LiquidButtonProps & React$1.RefAttributes<HTMLButtonElement>>;

declare const LiquidCardHero: React$1.ForwardRefExoticComponent<LiquidCardProps & React$1.RefAttributes<HTMLDivElement>>;
declare const LiquidCardCompact: React$1.ForwardRefExoticComponent<LiquidCardProps & React$1.RefAttributes<HTMLDivElement>>;
declare const LiquidCardInteractive: React$1.ForwardRefExoticComponent<LiquidCardProps & React$1.RefAttributes<HTMLDivElement>>;

declare const LiquidModalAlert: React$1.ForwardRefExoticComponent<LiquidModalProps & React$1.RefAttributes<HTMLDivElement>>;
declare const LiquidModalConfirm: React$1.ForwardRefExoticComponent<LiquidModalProps & React$1.RefAttributes<HTMLDivElement>>;
declare const LiquidModalFullscreen: React$1.ForwardRefExoticComponent<LiquidModalProps & React$1.RefAttributes<HTMLDivElement>>;

declare const LiquidInputSearch: React$1.ForwardRefExoticComponent<LiquidInputProps & React$1.RefAttributes<HTMLInputElement>>;
declare const LiquidInputEmail: React$1.ForwardRefExoticComponent<LiquidInputProps & React$1.RefAttributes<HTMLInputElement>>;
declare const LiquidInputPassword: React$1.ForwardRefExoticComponent<LiquidInputProps & React$1.RefAttributes<HTMLInputElement>>;

declare const LiquidCard: LiquidCardComponent;

declare const LiquidButton: LiquidButtonComponent;

declare const LiquidInput: LiquidInputComponent;

declare const LiquidModal: LiquidModalComponent;

/**
 * useLiquidGlass - Hook for generating liquid glass CSS styles and classes
 *
 * This hook provides the core liquid glass styling by leveraging the
 * LiquidGlassEngine to generate optimized CSS properties.
 *
 * Includes hydration safety to prevent SSR/client mismatches.
 */
declare function useLiquidGlass(config: GlassConfig): {
    glassStyles: _liquid_ui_core.LiquidGlassStyles;
    glassClasses: {
        base: string;
        blur: string;
        background: string;
        border: string;
    };
};

interface UseInteractiveGlassProps {
    elementRef: RefObject<HTMLElement>;
    enabled?: boolean;
    onHover?: (isHovered: boolean) => void;
    throttleMs?: number;
}
/**
 * useInteractiveGlass - Hook for interactive glass physics effects
 *
 * This hook handles mouse interactions and applies Apple's liquid glass
 * physics calculations for realistic refraction and hover effects.
 */
declare function useInteractiveGlass({ elementRef, enabled, onHover, throttleMs }: UseInteractiveGlassProps): {
    handleMouseEnter: () => void;
    handleMouseLeave: () => void;
    handleMouseMove: (e: React.MouseEvent) => void;
};

interface UseAdaptiveGlassProps {
    elementRef: RefObject<HTMLElement>;
    config: GlassConfig;
    enabled?: boolean;
    debounceMs?: number;
}
/**
 * useAdaptiveGlass - Hook for adaptive glass effects based on background
 *
 * This hook analyzes the background behind the glass element and adjusts
 * opacity and tint automatically for optimal visual contrast and readability.
 */
declare function useAdaptiveGlass({ elementRef, config, enabled, debounceMs }: UseAdaptiveGlassProps): {
    adaptiveStyles: Record<string, string>;
    backgroundLuminance: number;
    reanalyze: () => void;
};

export { LiquidButton, LiquidButtonGhost, LiquidButtonIcon, LiquidButtonPrimary, type LiquidButtonProps, LiquidCard, LiquidCardCompact, LiquidCardHero, LiquidCardInteractive, type LiquidCardProps, LiquidContent, type LiquidContentProps, LiquidIcon, type LiquidIconProps, LiquidInput, LiquidInputEmail, LiquidInputPassword, type LiquidInputProps, LiquidInputSearch, LiquidInteractive, type LiquidInteractiveProps, LiquidModal, LiquidModalAlert, LiquidModalConfirm, LiquidModalFullscreen, type LiquidModalProps, LiquidOverlay, type LiquidOverlayProps, LiquidPortal, type LiquidPortalProps, LiquidSpinner, type LiquidSpinnerProps, LiquidSurface, type LiquidSurfaceProps, LiquidText, type LiquidTextProps, useAdaptiveGlass, useInteractiveGlass, useLiquidGlass };
