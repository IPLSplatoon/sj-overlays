export const APP_WIDTH = 1920;
export const APP_HEIGHT = 1080;
export const DASHBOARD_BUNDLE_NAME = 'ipl-overlay-controls';

export const colors = {
    red: '#E03E81',
    red_a_20: 'rgba(224, 62, 129, 0.2)',
    green: '#72E98A',
    green_a_40: 'rgba(114, 233, 138, 0.4)'
};

export function getIconFromMode(mode: string): string {
    return modeToIcon[mode] ?? 'assets/SJ_Eyes.png';
}

const modeToIcon: {[key: string]: string} = {
    'Splat Zones': 'assets/SJ_SZ-Glow.png',
    Rainmaker: 'assets/SJ_RM-Glow.png',
    'Clam Blitz': 'assets/SJ_CB-Glow.png',
    'Tower Control': 'assets/SJ_TC-Glow.png'
};
