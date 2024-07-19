import { NowPlaying } from 'schemas';

export function addDots(value: unknown, maxLength = 48): string {
    if (typeof value !== 'string') {
        return '';
    }

    const rolloff = '...';

    if (!value) return value;
    if (value.length > maxLength) {
        return value.substring(0, maxLength - rolloff.length) + rolloff;
    }

    return value;
}

export function isBlank(value: unknown): boolean {
    return value === null || value === undefined || (typeof value === 'string' && value.trim() === '');
}

export function getSongNameAsString(nowPlaying: NowPlaying): string {
    return [ nowPlaying?.artist, nowPlaying?.song ]
        .filter(value => !isBlank(value))
        .join(' - ');
}

export function resolveStaticPath(path: string): string {
    return `/bundles/sj-overlays/assets${path}`;
}
