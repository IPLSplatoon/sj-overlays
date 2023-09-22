<template>
    <ipl-message
        v-if="!isSupportedAndConfigured"
        type="warning"
    >
        Unsupported source ({{ tournamentDataStore.tournamentData.meta.source }}) or missing configuration
    </ipl-message>
    <template v-else>
        <ipl-space
            v-if="bracketDataStore.bracketData != null"
            class="bottom-margin"
        >
            Loaded bracket: {{ bracketDataStore.bracketData.name }}
            <span v-if="bracketDataStore.bracketData.roundNumber != null">
                (Round {{ bracketDataStore.bracketData.roundNumber }})
            </span>
            ({{ bracketDataStore.bracketData.eventName }})
        </ipl-space>
        <ipl-space>
            <ipl-button
                label="Load bracket data"
                async
                @click="getMatchQuery"
            />
            <match-query-param-input
                v-for="param in bracketQuery"
                :key="param.key"
                :param="param"
                :query="queryResult"
                @change="(key, value) => queryResult[key] = value"
                @parameter-add="key => activeParams.add(key)"
                @parameter-remove="key => activeParams.delete(key)"
                @loading="isLoading = $event"
            />
            <ipl-button
                async
                label="Submit"
                class="submit-bracket-query-button"
                :disabled="bracketQuery.length <= 0 || !activeParamsFilled || isLoading"
                @click="submitBracketQuery"
            />
        </ipl-space>
    </template>
</template>

<script setup lang="ts">
import type NodeCG from '@nodecg/types';
import { useTournamentDataStore } from 'client-shared/store/tournamentDataStore';
import { IplButton, IplMessage, IplSpace } from '@iplsplatoon/vue-components';
import { computed, ref, Ref } from 'vue';
import { MatchQueryParameter, BattlefyImporter, StartggImporter, MatchImporter, MatchQueryResult } from '@tourneyview/importer';
import MatchQueryParamInput from './MatchQueryParamInput.vue';
import { useBracketDataStore } from 'client-shared/store/bracketDataStore';
import { Configschema } from 'types/Configschema';

const bracketDataStore = useBracketDataStore();
const tournamentDataStore = useTournamentDataStore();
const isSupportedAndConfigured = computed(() => {
    switch (tournamentDataStore.tournamentData.meta.source) {
        case 'BATTLEFY':
            return true;
        case 'SMASHGG':
            return (nodecg as NodeCG.ClientAPI<Configschema>).bundleConfig?.startgg?.apiKey != null;
        default:
            return false;
    }
});

const activeParams: Ref<Set<string>> = ref(new Set<string>());
const bracketQuery: Ref<MatchQueryParameter[]> = ref([]);
const queryResult: Ref<Record<string, string | number>> = ref({ });
const isLoading = ref<boolean>(false);

function getImporter(): MatchImporter<MatchQueryResult> {
    switch (tournamentDataStore.tournamentData.meta.source) {
        case 'BATTLEFY':
            return new BattlefyImporter();
        case 'SMASHGG':
            return new StartggImporter((nodecg as NodeCG.ClientAPI<Configschema>).bundleConfig?.startgg?.apiKey);
        default:
            throw new Error(`Cannot get importer for source '${tournamentDataStore.tournamentData.meta.source}'`);
    }
}

const activeParamsFilled = computed(() => {
    return Array.from(activeParams.value).every(param => queryResult.value[param] != null);
});

async function getMatchQuery() {
    const importer = getImporter();
    bracketQuery.value = await importer.getMatchQueryOptions(tournamentDataStore.tournamentData.meta.id);
}

async function submitBracketQuery() {
    return nodecg.sendMessage('loadBracketFromQuery', queryResult.value);
}
</script>

<style lang="scss" scoped>
.submit-bracket-query-button {
    margin-top: 8px;
}
</style>
