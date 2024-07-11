<template>
    <ipl-space class="bottom-margin">
        <ipl-small-toggle
            v-model="breakCastersShown"
            label="Casters on break graphic"
        />
    </ipl-space>
    <central-login v-if="hasCentralConfig" />
    <ipl-message
        v-else
        type="warning"
    >
        Central bundle configuration is missing.
    </ipl-message>
</template>

<script setup lang="ts">
import { IplMessage, IplSmallToggle, IplSpace } from '@iplsplatoon/vue-components';
import { useBreakScreenStore } from 'client-shared/store/breakScreenStore';
import { computed } from 'vue';
import CentralLogin from './CentralLogin.vue';
import { Configschema } from 'types/schemas';

const hasCentralConfig = (nodecg.bundleConfig as Configschema).central != null;

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
