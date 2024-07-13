<template>
    <div class="stats-header glow-border glow-blue layout vertical c-vert c-horiz">
        <fitted-content
            class="team-names"
            :max-width="1150"
        >
            <span
                class="color-display"
                :class="colorsSwapped ? 'bravo' : 'alpha'"
            />
            <span class="team-name">{{ activeRound.teamA.name }}</span>
            vs
            <span
                class="color-display"
                :class="colorsSwapped ? 'alpha' : 'bravo'"
            />
            <span class="team-name">{{ activeRound.teamB.name }}</span>
        </fitted-content>
        <div class="stage-and-mode">{{ stageAndMode }}</div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRelayDataStore } from 'client-shared/store/relayDataStore';
import { useActiveRoundStore } from 'client-shared/store/activeRoundStore';
import FittedContent from '../../../components/FittedContent.vue';

export default defineComponent({
    name: 'StatsHeader',
    components: { FittedContent },
    setup() {
        const relayDataStore = useRelayDataStore();
        const activeRoundStore = useActiveRoundStore();

        return {
            activeRound: computed(() => activeRoundStore.activeRound),
            stageAndMode: computed(() =>
                relayDataStore.activeRelayEvent.event == null
                    ? 'Unknown'
                    : `${relayDataStore.activeRelayEvent.event.rule} on ${relayDataStore.activeRelayEvent.event.stage}`),
            colorsSwapped: computed(() => activeRoundStore.swapColorsInternally)
        };
    }
});
</script>

<style lang="scss">
@use '../../../styles/background';
@use '../../../styles/constants';

.stats-header {
    @include background.background();
    width: 1200px;
    height: 100%;

    .stage-and-mode {
        font-size: 30px;
        font-style: italic;
    }

    .team-names {
        font-size: 40px;
        line-height: 40px;
        margin-top: 8px;

        .team-name {
            font-weight: bold;
        }
    }

    .color-display {
        display: inline-block;
        border-radius: 8px;
        width: 30px;
        height: 30px;
        margin-right: 4px;
        transition: background-color 500ms;

        &.alpha {
            background-color: constants.$red;
        }

        &.bravo {
            background-color: constants.$green;
        }
    }
}
</style>
