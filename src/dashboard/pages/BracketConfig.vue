<template>
    <ipl-space>
        <div>hello</div>
        <div>
            {{ tournamentDataStore.tournamentData.meta.id }}
        </div>
    </ipl-space>
</template>

<script setup lang="ts">
import { useTournamentDataStore } from 'client-shared/store/tournamentDataStore';
import { IplSpace } from '@iplsplatoon/vue-components';

const tournamentDataStore = useTournamentDataStore();
</script>
