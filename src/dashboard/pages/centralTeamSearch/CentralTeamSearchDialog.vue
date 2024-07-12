<template>
    <ipl-space class="search-box">
        <ipl-input
            v-model="searchQuery"
            :loading="searchLoading"
            placeholder="Search for a team..."
            name="search-box"
            theme="large"
            type="search"
        />
    </ipl-space>
    <div
        v-if="searchResults.length === 0"
        style="text-align: center; margin-top: 8px"
    >
        No results found...
    </div>
    <template v-else>
        <div class="search-results-layout">
            <ipl-space v-for="result in searchResults">
                <div>
                    <div>{{ addDots(result.name) }}</div>
                    <a :href="`${centralFrontendPath}/teams/${result.id}`" target="_blank">Open in Central</a>
                </div>
                <ipl-checkbox
                    :model-value="selectedTeams.has(result.id)"
                    label=""
                    @update:model-value="onTeamSelect($event, result.id)"
                />
            </ipl-space>
        </div>
        <ipl-button
            v-if="currentPage < totalPages"
            label="Load more"
            async
            style="max-width: 250px; margin: 0 auto;"
            @click="doSearch(true)"
        />
        <ipl-space class="top-margin">
            <div class="bottom-margin text-center">Assign selected teams to...</div>
            <div class="assignment-button-layout">
                <ipl-button
                    :label="addDots(activeRoundStore.activeRound.teamA.name)"
                    :disabled="selectedTeams.size === 0"
                    @click="onAssignment('a')"
                />
                <ipl-button
                    :label="addDots(activeRoundStore.activeRound.teamB.name)"
                    :disabled="selectedTeams.size === 0"
                    @click="onAssignment('b')"
                />
            </div>
        </ipl-space>
    </template>
</template>

<script setup lang="ts">
import { IplSpace, IplInput, isBlank, IplButton, IplCheckbox } from '@iplsplatoon/vue-components';
import { ref, watch } from 'vue';
import { useCentralDataStore } from 'client-shared/store/centralDataStore';
import debounce from 'lodash/debounce';
import { Configschema } from 'types/schemas';
import axios from 'axios';
import { CentralSearchItem, CentralSearchResponse } from 'types/central';
import { addDots } from '../../../graphics/helpers/string';
import { useActiveRoundStore } from 'client-shared/store/activeRoundStore';

const centralPath = (nodecg.bundleConfig as Configschema).central?.basePath;
const centralFrontendPath = (nodecg.bundleConfig as Configschema).central?.frontendPath;
const centralDataStore = useCentralDataStore();
const activeRoundStore = useActiveRoundStore();

const selectedTeams = ref<Set<string>>(new Set());
const searchQuery = ref('');
const searchLoading = ref(false);
const searchResults = ref<CentralSearchItem[]>([]);
const totalPages = ref(0);
const currentPage = ref(0);
let paginationId: string | null = null;

function onAssignment(team: 'a' | 'b') {
    centralDataStore.addToTeamMapping(team, Array.from(selectedTeams.value.values()));
    selectedTeams.value = new Set();
}

function onTeamSelect(selected: boolean, teamId: string) {
    if (!selected) {
        selectedTeams.value.delete(teamId);
    } else {
        selectedTeams.value.add(teamId);
    }
}

async function doSearch(loadMore = false) {
    if (searchLoading.value || centralPath == null || centralDataStore.centralCredentials.token == null) return;

    if (isBlank(searchQuery.value)) {
        searchResults.value = [];
        searchLoading.value = false;
        return;
    }

    searchLoading.value = true;
    let searchUrl = `${centralPath}/search/teams?query=${encodeURIComponent(searchQuery.value)}`;
    if (loadMore) {
        searchUrl += `&page=${currentPage.value + 1}&pagination_id=${paginationId}`;
    }

    try {
        const queryResult = await axios.get<CentralSearchResponse>(
            searchUrl,
            {
                headers: {
                    Authorization: `JWT ${centralDataStore.centralCredentials.token}`
                }
            }
        );

        paginationId = queryResult.data.pagination_id;
        if (loadMore) {
            searchResults.value.push(...queryResult.data.results);
            currentPage.value++;
        } else {
            selectedTeams.value.forEach(teamId => {
                if (!queryResult.data.results.some(result => result.id === teamId)) {
                    selectedTeams.value.delete(teamId);
                }
            });
            searchResults.value = queryResult.data.results;
            currentPage.value = 1;
        }
        totalPages.value = queryResult.data.pages;
    } finally {
        searchLoading.value = false;
    }
}

const debouncedDoSearch = debounce(doSearch, 500);
watch(searchQuery, () => debouncedDoSearch());
</script>

<style scoped lang="scss">
.search-results-layout {
    margin: 8px 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;

    > * {
        display: flex;

        > div {
            flex-grow: 1;
        }
    }
}

.assignment-button-layout {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
}
</style>
