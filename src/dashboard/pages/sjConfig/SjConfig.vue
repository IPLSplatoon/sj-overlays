<template>
    <template v-if="hasCentralConfig">
        <central-login />
        <central-mapping-display class="top-margin" />
        <central-matchups-display class="top-margin" />
        <central-display-settings class="top-margin" />
    </template>
    <ipl-message
        v-else
        type="warning"
    >
        Central bundle configuration is missing.
    </ipl-message>
</template>

<script setup lang="ts">
import { IplMessage } from '@iplsplatoon/vue-components';
import CentralLogin from './CentralLogin.vue';
import { Configschema } from 'types/schemas';
import CentralMappingDisplay from './CentralMappingDisplay.vue';
import CentralMatchupsDisplay from './CentralMatchupsDisplay.vue';
import CentralDisplaySettings from './CentralDisplaySettings.vue';

const hasCentralConfig = (nodecg.bundleConfig as Configschema).central != null;
</script>

<style scoped lang="scss">

</style>
