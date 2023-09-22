<template>
    <ipl-space class="bottom-margin">
        <ipl-small-toggle
            v-model="breakCastersShown"
            label="Casters on break"
        />
    </ipl-space>
    <bracket-config />
</template>

<script setup lang="ts">
import { IplSmallToggle, IplSpace } from '@iplsplatoon/vue-components';
import { useBreakScreenStore } from 'client-shared/store/breakScreenStore';
import { computed } from 'vue';
import BracketConfig from './BracketConfig.vue';

const breakScreenStore = useBreakScreenStore();
const breakCastersShown = computed({
    get() {
        return breakScreenStore.breakUseCastersScene;
    },
    set(newValue: boolean) {
        breakScreenStore.setBreakCastersScene(newValue);
    }
});
</script>

<style scoped lang="scss">

</style>
