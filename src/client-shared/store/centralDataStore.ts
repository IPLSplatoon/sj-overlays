import { CentralCredentials, CentralTeamMapping, CentralTeamMatchups } from 'types/schemas';
import { defineStore } from 'pinia';

const centralCredentials = nodecg.Replicant<CentralCredentials>('centralCredentials');
const centralTeamMapping = nodecg.Replicant<CentralTeamMapping>('centralTeamMapping');
const centralTeamMatchups = nodecg.Replicant<CentralTeamMatchups>('centralTeamMatchups');

export const centralDataReps = [centralCredentials, centralTeamMapping, centralTeamMatchups];

interface CentralDataStore {
    centralCredentials: CentralCredentials
    centralTeamMapping: CentralTeamMapping
    centralTeamMatchups: CentralTeamMatchups
}

export const useCentralDataStore = defineStore('central', {
    state: () => ({
        centralCredentials: null,
        centralTeamMapping: null,
        centralTeamMatchups: null
    } as CentralDataStore),
    actions: {
        addToTeamMapping(team: 'a' | 'b', teamIds: string[]) {
            if (team === 'a') {
                centralTeamMapping.value.teamA.push(...teamIds);
            } else {
                centralTeamMapping.value.teamB.push(...teamIds);
            }
        },
        resetTeamMapping(team: 'a' | 'b') {
            if (team === 'a') {
                centralTeamMapping.value.teamA = [];
            } else {
                centralTeamMapping.value.teamB = [];
            }
        }
    }
});
