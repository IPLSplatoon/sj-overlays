import type { Configschema } from 'types/schemas';

export const DASHBOARD_BUNDLE_NAME = 'ipl-overlay-controls';
export const CENTRAL_ENABLED = (nodecg.bundleConfig as Configschema).central != null && (nodecg.bundleConfig as Configschema).central.enabled;
