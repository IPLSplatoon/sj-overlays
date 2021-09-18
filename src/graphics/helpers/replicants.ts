import { DASHBOARD_BUNDLE_NAME } from './constants';
import { NodeCGBrowser } from 'nodecg/browser';
import { MusicShown, NowPlaying, Casters, ActiveRound } from 'schemas';

export const musicShown = nodecg.Replicant<MusicShown>('musicShown', DASHBOARD_BUNDLE_NAME);
export const nowPlaying = nodecg.Replicant<NowPlaying>('nowPlaying', DASHBOARD_BUNDLE_NAME);
export const casters = nodecg.Replicant<Casters>('casters', DASHBOARD_BUNDLE_NAME);
export const activeRound = nodecg.Replicant<ActiveRound>('activeRound', DASHBOARD_BUNDLE_NAME);
