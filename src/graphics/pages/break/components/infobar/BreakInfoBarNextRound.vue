<template>
    <opacity-swap-transition>
        <div
            :key="`${nextRoundStore.nextRound.teamA.name}_${nextRoundStore.nextRound.teamB.name}`"
            class="info-row layout c-horiz c-vert"
        >
            <div class="title">{{ localeInfoStore.strings.break.infobar.nextUp }}</div>
            &nbsp;
            <fitted-content
                :max-width="localeInfoStore.runtimeConfig.locale === 'DE' ? 750 : 850"
                class="team-name"
                align="right"
            >
                <span>{{ addDots(nextRoundStore.nextRound.teamA.name) }} vs {{ addDots(nextRoundStore.nextRound.teamB.name) }}</span>
            </fitted-content>
        </div>
    </opacity-swap-transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FittedContent from '../../../../components/FittedContent.vue';
import OpacitySwapTransition from '../../../../components/OpacitySwapTransition.vue';
import { useNextRoundStore } from 'client-shared/store/nextRoundStore';
import { useLocaleInfoStore } from 'client-shared/store/localeInfoStore';
import { addDots } from '../../../../helpers/string';

export default defineComponent({
    name: 'BreakInfoBarNextRound',

    components: { FittedContent, OpacitySwapTransition },

    setup() {
        const nextRoundStore = useNextRoundStore();
        const localeInfoStore = useLocaleInfoStore();

        return {
            nextRoundStore,
            localeInfoStore,
            addDots
        };
    }
});
</script>

<style lang="scss" scoped>
@use '../../../../styles/constants';

.title {
    font-style: normal;
    font-weight: 700;
    filter: drop-shadow(0 0 2px constants.$orange);
}
</style>
