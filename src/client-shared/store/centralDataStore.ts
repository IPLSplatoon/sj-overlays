import { CentralCredentials, CentralTeamMapping } from 'types/schemas';
import { defineStore } from 'pinia';

const centralCredentials = nodecg.Replicant<CentralCredentials>('centralCredentials');
const centralTeamMapping = nodecg.Replicant<CentralTeamMapping>('centralTeamMapping');

export const centralDataReps = [centralCredentials, centralTeamMapping];

interface CentralDataStore {
    centralCredentials: CentralCredentials
    centralTeamMapping: CentralTeamMapping
}

export const useCentralDataStore = defineStore('central', {
    state: () => ({
        centralCredentials: null,
        centralTeamMapping: null
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
