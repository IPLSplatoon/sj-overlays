import { ScoreboardData } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from '../helpers/constants';

const scoreboardData = nodecg.Replicant<ScoreboardData>('scoreboardData', DASHBOARD_BUNDLE_NAME);

export const scoreboardReps = [scoreboardData];

interface ScoreboardStore {
    scoreboardData: ScoreboardData
}

export const useScoreboardStore = defineStore('scoreboard', {
    state: () => ({
        scoreboardData: null
    } as ScoreboardStore)
});
