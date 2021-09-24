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
    return modeToGlowIcon[mode] ?? 'assets/SJ_Eyes.png';
}

const modeToGlowIcon: {[key: string]: string} = {
    'Splat Zones': 'assets/SJ_SZ-Glow.png',
    Rainmaker: 'assets/SJ_RM-Glow.png',
    'Clam Blitz': 'assets/SJ_CB-Glow.png',
    'Tower Control': 'assets/SJ_TC-Glow.png'
};

export function getIconFromMode(mode: string): string {
    return modeToIcon[mode] ?? '';
}

const modeToIcon: {[key: string]: string} = {
    'Splat Zones': 'assets/SJ_SZ.png',
    Rainmaker: 'assets/SJ_RM.png',
    'Clam Blitz': 'assets/SJ_CB.png',
    'Tower Control': 'assets/SJ_TC.png'
};

export const mapNameToImagePath: Record<string, string> = {
    'Ancho-V Games': 'S2_Stage_Ancho-V_Games.png',
    'Arowana Mall': 'S2_Stage_Arowana_Mall.png',
    'Blackbelly Skatepark': 'S2_Stage_Blackbelly_Skatepark.png',
    'Camp Triggerfish': 'S2_Stage_Camp_Triggerfish.png',
    'Goby Arena': 'S2_Stage_Goby_Arena.png',
    'Humpback Pump Track': 'S2_Stage_Humpback_Pump_Track.png',
    'Inkblot Art Academy': 'S2_Stage_Inkblot_Art_Academy.png',
    'Kelp Dome': 'S2_Stage_Kelp_Dome.png',
    MakoMart: 'S2_Stage_MakoMart.png',
    'Manta Maria': 'S2_Stage_Manta_Maria.png',
    'Moray Towers': 'S2_Stage_Moray_Towers.png',
    'Musselforge Fitness': 'S2_Stage_Musselforge_Fitness.png',
    'New Albacore Hotel': 'S2_Stage_New_Albacore_Hotel.png',
    'Piranha Pit': 'S2_Stage_Piranha_Pit.png',
    'Port Mackerel': 'S2_Stage_Port_Mackerel.png',
    'Shellendorf Institute': 'S2_Stage_Shellendorf_Institute.png',
    'Shifty Station': 'S2_Stage_Shifty_Station.png',
    'Snapper Canal': 'S2_Stage_Snapper_Canal.png',
    'Starfish Mainstage': 'S2_Stage_Starfish_Mainstage.png',
    'Sturgeon Shipyard': 'S2_Stage_Sturgeon_Shipyard.png',
    'The Reef': 'S2_Stage_The_Reef.png',
    'Wahoo World': 'S2_Stage_Wahoo_World.png',
    'Walleye Warehouse': 'S2_Stage_Walleye_Warehouse.png',
    'Skipper Pavilion': 'S2_Stage_Skipper_Pavilion.png',
    'Unknown Stage': 'low-ink-unknown-map.png'
};
