<template>
    <ipl-space style="max-width: 250px; margin: 0 auto 8px auto">
        <div class="title">Analyst screen video</div>
        <ipl-toggle
            v-model="analystScreenVideoVisible"
            class="top-margin"
        />
        <ipl-input
            v-model="analystScreenVideoUrl"
            label="Video URL"
            name="analystScreenVideoUrl"
            class="top-margin"
        />
        <ipl-button
            class="top-margin"
            label="Update"
            @click="updateAnalystVideoUrl"
        />
    </ipl-space>
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
import { IplButton, IplInput, IplMessage, IplSpace, IplToggle } from '@iplsplatoon/vue-components';
import CentralLogin from './CentralLogin.vue';
import type { Configschema } from 'types/schemas';
import CentralMappingDisplay from './CentralMappingDisplay.vue';
import CentralMatchupsDisplay from './CentralMatchupsDisplay.vue';
import CentralDisplaySettings from './CentralDisplaySettings.vue';
import { computed, ref, watch } from 'vue';
import { useCasterStore } from 'client-shared/store/casterStore';

const hasCentralConfig = (nodecg.bundleConfig as Configschema).central != null;

const casterStore = useCasterStore();
const analystScreenVideoUrl = ref('');
watch(() => casterStore.analystScreenVideoUrl, newValue => analystScreenVideoUrl.value = newValue, { immediate: true });
const analystScreenVideoVisible = computed({
    get() {
        return casterStore.analystScreenVideoVisible;
    },
    set(newValue: boolean) {
        casterStore.setAnalystScreenVideoVisible(newValue);
    }
});

function updateAnalystVideoUrl() {
    casterStore.setAnalystScreenVideoUrl(analystScreenVideoUrl.value);
}
</script>
