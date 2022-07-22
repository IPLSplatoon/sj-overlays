<template>
    <div class="stats-header glow-border glow-blue layout vertical c-vert c-horiz">
        <fitted-content
            class="team-names"
            :max-width="1150"
        >
            {{ teamNames }}
        </fitted-content>
        <div class="stage-and-mode">{{ stageAndMode }}</div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRelayDataStore } from '../../../store/relayDataStore';
import { useActiveRoundStore } from '../../../store/activeRoundStore';
import FittedContent from '../../../components/FittedContent.vue';

export default defineComponent({
    name: 'StatsHeader',
    components: { FittedContent },
    setup() {
        const relayDataStore = useRelayDataStore();
        const activeRoundStore = useActiveRoundStore();

        return {
            teamNames: computed(() =>
                `${activeRoundStore.activeRound.teamA.name} vs ${activeRoundStore.activeRound.teamB.name}`),
            stageAndMode: computed(() =>
                `${relayDataStore.activeRelayEvent.event.rule} on ${relayDataStore.activeRelayEvent.event.stage}`)
        };
    }
});
</script>

<style lang="scss">
@import '../../../styles/background';

.stats-header {
    @include background();
    width: 1200px;
    height: 100%;

    .stage-and-mode {
        font-size: 30px;
        font-style: italic;
    }

    .team-names {
        font-size: 40px;
        font-weight: bold;
        line-height: 40px;
        margin-top: 8px;
    }
}
</style>
