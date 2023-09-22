import { NowPlaying, MusicShown } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from 'client-shared/constants';

const nowPlaying = nodecg.Replicant<NowPlaying>('nowPlaying', DASHBOARD_BUNDLE_NAME);
const musicShown = nodecg.Replicant<MusicShown>('musicShown', DASHBOARD_BUNDLE_NAME);

export const musicReps = [nowPlaying, musicShown];

interface MusicStore {
    nowPlaying: NowPlaying
    musicShown: MusicShown
}

export const useMusicStore = defineStore('music', {
    state: () => ({
        nowPlaying: {},
        musicShown: null
    } as MusicStore)
});
