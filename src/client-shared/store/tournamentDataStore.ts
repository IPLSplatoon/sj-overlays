import { TournamentData } from 'schemas';
import { DASHBOARD_BUNDLE_NAME } from 'client-shared/constants';
import { defineStore } from 'pinia';

const tournamentData = nodecg.Replicant<TournamentData>('tournamentData', DASHBOARD_BUNDLE_NAME);

export const tournamentDataReps = [tournamentData];

interface TournamentDataStore {
    tournamentData: TournamentData
}

export const useTournamentDataStore = defineStore('tournamentData', {
    state: (): TournamentDataStore => ({
        tournamentData: null
    })
});
