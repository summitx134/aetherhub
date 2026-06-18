import pkg from '../../../package.json';
import { BRANDING_NAME, ORG_NAME } from './branding';

export const CURRENT_VERSION = pkg.version;

export const isDesktop = typeof __ELECTRON__ !== 'undefined' && !!__ELECTRON__;

// AetherHub is always custom branding (not the original LobeHub)
export const isCustomBranding = true;
export const isCustomORG = true;

export { BRANDING_NAME, ORG_NAME };
