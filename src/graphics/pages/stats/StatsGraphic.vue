<template>
    <div
        v-if="hasRelayData"
        class="stats-layout"
    >
        <stats-header />
        <objective-stats />
        <div class="cells-layout">
            <stats-cell
                v-for="(cell, index) in dataCells"
                :key="`cell_${index}`"
                :cell="cell"
            />
        </div>
    </div>
    <no-relay-message v-else />
    <icon-background :animate-on-entrance="false" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import IconBackground from '../../components/IconBackground.vue';
import { useRelayDataStore } from 'client-shared/store/relayDataStore';
import NoRelayMessage from './components/NoRelayMessage.vue';
import StatsHeader from './components/StatsHeader.vue';
import ObjectiveStats from './components/ObjectiveStats.vue';
import StatsCell from './components/StatsCell.vue';

export default defineComponent({
    name: 'StatsGraphic',

    components: { StatsCell, ObjectiveStats, StatsHeader, NoRelayMessage, IconBackground },

    setup() {
        const relayDataStore = useRelayDataStore();

        return {
            hasRelayData: computed(() => relayDataStore.activeRelayEvent?.event != null),
            dataCells: computed(() => relayDataStore.displayData.dataCells)
        };
    }
});
</script>

<style lang="scss">
.stats-layout {
    $margin-x: 50px;
    $margin-y: 75px;
    position: absolute;
    width: calc(100% - $margin-x * 2);
    height: calc(100% - $margin-y * 2);
    top: $margin-y;
    left: $margin-x;

    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1.2fr 5fr;
    justify-items: center;
    align-items: center;
    row-gap: 55px;
}

.cells-layout {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    column-gap: 75px;
}
</style>
