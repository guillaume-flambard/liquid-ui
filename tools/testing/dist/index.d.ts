import * as _testing_library_react from '@testing-library/react';
import { RenderOptions } from '@testing-library/react';
export * from '@testing-library/react';
import * as _testing_library_dom_types_queries from '@testing-library/dom/types/queries';
import { ReactElement } from 'react';
export { default as userEvent } from '@testing-library/user-event';

declare function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): _testing_library_react.RenderResult<typeof _testing_library_dom_types_queries, HTMLElement, HTMLElement>;
declare const performanceUtils: {
    /**
     * Measure rendering time of a component
     */
    measureRender: (renderFn: () => void) => Promise<number>;
    /**
     * Test that animations maintain 60fps
     */
    testFrameRate: (animationFn: () => void, duration?: number) => Promise<boolean>;
};
declare const a11y: {
    /**
     * Check if element has proper ARIA attributes
     */
    hasProperAria: (element: HTMLElement) => boolean;
    /**
     * Check if element is keyboard accessible
     */
    isKeyboardAccessible: (element: HTMLElement) => boolean;
};
declare const glass: {
    /**
     * Check if element has backdrop-filter applied
     */
    hasBackdropFilter: (element: HTMLElement) => boolean;
    /**
     * Check if element has proper glass opacity
     */
    hasGlassOpacity: (element: HTMLElement) => boolean;
    /**
     * Test physics calculations
     */
    testPhysics: (mousePos: {
        x: number;
        y: number;
    }, elementBounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    }) => number;
};

export { a11y, glass, performanceUtils, renderWithProviders };
