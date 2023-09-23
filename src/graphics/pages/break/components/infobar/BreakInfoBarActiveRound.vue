<template>
    <div class="info-row layout c-horiz c-vert">
        <opacity-swap-transition>
            <fitted-content
                :key="activeRoundStore.activeRound.teamA.name"
                :max-width="400"
                class="team-name"
                align="right"
            >
                <span>{{ addDots(activeRoundStore.activeRound.teamA.name) }}</span>
            </fitted-content>
        </opacity-swap-transition>
        <div class="scores layout horiz c-vert">
            <score-counter
                :value="activeRoundStore.activeRound.teamA.score"
                :max-width="50"
            />
            <div />
            <score-counter
                :value="activeRoundStore.activeRound.teamB.score"
                :max-width="50"
            />
        </div>
        <opacity-swap-transition>
            <fitted-content
                :key="activeRoundStore.activeRound.teamB.name"
                :max-width="400"
                class="team-name"
            >
                <span>{{ addDots(activeRoundStore.activeRound.teamB.name) }}</span>
            </fitted-content>
        </opacity-swap-transition>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FittedContent from '../../../../components/FittedContent.vue';
import OpacitySwapTransition from '../../../../components/OpacitySwapTransition.vue';
import { useActiveRoundStore } from 'client-shared/store/activeRoundStore';
import ScoreCounter from '../../../../components/ScoreCounter.vue';
import { addDots } from '../../../../helpers/string';

export default defineComponent({
    name: 'BreakInfoBarActiveRound',

    components: { ScoreCounter, FittedContent, OpacitySwapTransition },

    setup() {
        const activeRoundStore = useActiveRoundStore();

        return {
            activeRoundStore,
            addDots
        };
    }
});
</script>

<style lang="scss" scoped>
@import '../../../../styles/constants';

.team-name {
    width: 400px;
}

.scores {
    background-color: $violet-a-20;
    z-index: 3;
    width: 120px;
    padding: 0 8px;
    margin: 0 12px;
    border-radius: 8px;
    overflow: hidden;

    .fitted-content-wrapper {
        font-weight: 800;
        font-size: 45px;
        width: 50px;
        padding: 0 2px;
        font-family: 'Montserrat', sans-serif;
        text-align: center;
        font-style: normal;
    }

    div {
        flex-grow: 1;
    }
}
</style>
