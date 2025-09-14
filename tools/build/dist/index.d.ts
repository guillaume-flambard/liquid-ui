import { Options } from 'tsup';

/**
 * Shared build configuration for Liquid UI packages
 */

declare const baseConfig: Options;
declare const packageConfig: (overrides?: Partial<Options>) => Options;
declare const componentConfig: (overrides?: Partial<Options>) => Options;
declare const appConfig: (overrides?: Partial<Options>) => Options;
declare const BUNDLE_SIZE_LIMITS: {
    readonly '@liquid-ui/core': number;
    readonly '@liquid-ui/react': number;
    readonly '@liquid-ui/tokens': number;
    readonly '@liquid-ui/icons': number;
};
declare const PERFORMANCE_TARGETS: {
    readonly renderTime: 16;
    readonly firstPaint: 100;
    readonly memoryOverhead: 10;
};
type PackageName = keyof typeof BUNDLE_SIZE_LIMITS;

export { BUNDLE_SIZE_LIMITS, PERFORMANCE_TARGETS, type PackageName, appConfig, baseConfig, componentConfig, packageConfig };
