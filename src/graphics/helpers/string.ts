import { NowPlaying } from 'schemas';

export function addDots(value: string, maxLength = 48): string {
    const rolloff = '...';

    if (!value) return value;
    if (value.length > maxLength) {
        return value.substring(0, maxLength - rolloff.length) + rolloff;
    }

    return value;
}

export function isBlank(value?: string | null): boolean {
    return value === null || value === undefined || value.trim() === '';
}

export function getSongNameAsString(nowPlaying: NowPlaying): string {
    return [ nowPlaying?.artist, nowPlaying?.song ]
        .filter(value => !isBlank(value))
        .join(' - ');
}
