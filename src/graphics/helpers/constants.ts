export const APP_WIDTH = 1920;
export const APP_HEIGHT = 1080;
export const DASHBOARD_BUNDLE_NAME = 'ipl-overlay-controls';

export const colors = {
    red: '#E03E81',
    red_a_20: 'rgba(224, 62, 129, 0.2)',
    green: '#72E98A',
    green_a_40: 'rgba(114, 233, 138, 0.4)',
    blue: '#5FBFF9'
};

export function getGlowIconFromMode(mode: string): string {
    return modeToGlowIcon[mode] ?? '/bundles/sj-overlays/assets/SJ_Eyes.png';
}

const modeToGlowIcon: {[key: string]: string} = {
    'Splat Zones': '/bundles/sj-overlays/assets/SJ_SZ-Glow.png',
    Rainmaker: '/bundles/sj-overlays/assets/SJ_RM-Glow.png',
    'Clam Blitz': '/bundles/sj-overlays/assets/SJ_CB-Glow.png',
    'Tower Control': '/bundles/sj-overlays/assets/SJ_TC-Glow.png'
};

export function getIconFromMode(mode: string): string {
    return modeToIcon[mode] ?? '';
}

const modeToIcon: {[key: string]: string} = {
    'Splat Zones': '/bundles/sj-overlays/assets/SJ_SZ.png',
    Rainmaker: '/bundles/sj-overlays/assets/SJ_RM.png',
    'Clam Blitz': '/bundles/sj-overlays/assets/SJ_CB.png',
    'Tower Control': '/bundles/sj-overlays/assets/SJ_TC.png'
};
