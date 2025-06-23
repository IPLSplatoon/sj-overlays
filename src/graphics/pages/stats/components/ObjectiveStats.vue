<template>
    <div class="objective-stats-wrapper glow-border glow-blue layout vertical c-vert c-horiz">
        <div class="title">{{ stats.title }}</div>
        <div class="percentage-bar-wrapper">
            <div class="graphic-wrapper layout">
                <div
                    class="percentage-display team-alpha"
                    :style="{ width: `${stats.alpha.percentage}%` }"
                >
                    {{ formatValueDisplay(stats.alpha) }}
                </div>
                <div
                    class="percentage-display team-bravo"
                    :style="{ width: `${stats.bravo.percentage}%` }"
                >
                    {{ formatValueDisplay(stats.bravo) }}
                </div>
                <div
                    v-show="stats.neutral != null"
                    class="percentage-display team-neutral"
                    :style="{ width: `${stats.neutral?.percentage}%` }"
                >
                    {{ formatValueDisplay(stats.neutral) }}
                </div>
            </div>
        </div>
        <div
            v-show="totalDuration != null"
            class="total-duration-display"
        >
            <span>{{ $helpers.formatDuration(0) }}</span>
            <span>{{ $helpers.formatDuration(totalDuration) }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRelayDataStore } from 'client-shared/store/relayDataStore';
import type { ObjectiveSection } from 'relay-nodecg-connector';
import { formatDuration } from '../../../helpers/timer';

export default defineComponent({
    name: 'ObjectiveStats',

    setup() {
        const relayDataStore = useRelayDataStore();
        const stats = computed(() => relayDataStore.displayData.objectiveStats);

        return {
            stats,
            formatValueDisplay(value?: ObjectiveSection) {
                if (value == null || value.percentage == null || value.percentage <= 3) {
                    return '';
                }

                if (stats.value.displayType === 'PERCENTAGE') {
                    return `${value.percentage.toFixed(0)}%`;
                } else if (stats.value.displayType === 'DURATION') {
                    return formatDuration(value.duration);
                }
            },
            totalDuration: computed(() => {
                if (stats.value.displayType !== 'DURATION' || stats.value.alpha.duration == null || stats.value.bravo.duration == null) {
                    return null;
                }

                return stats.value.alpha.duration + stats.value.bravo.duration + (stats.value.neutral?.duration ?? 0);
            })
        };
    }
});
</script>

<style lang="scss">
@use '../../../styles/background';
@use '../../../styles/constants';

.objective-stats-wrapper {
    @include background.background();
    width: 1500px;
    height: 100%;

    .title {
        font-weight: bold;
    }

    .percentage-bar-wrapper {
        height: 35px;
        width: 1450px;
        position: relative;

        > .graphic-wrapper {
            width: 100%;
            height: 100%;
            position: absolute;
            border-radius: 8px;
            overflow: hidden;
            font-size: 22px;
            line-height: 38px;
            text-align: right;

            > .percentage-display {
                height: 100%;
                padding-right: 4px;

                &.team-alpha {
                    background-color: constants.$red;
                }

                &.team-bravo {
                    background-color: constants.$green;
                    color: #222;
                }

                &.team-neutral {
                    background-color: rgba(44, 19, 55, 0.8);
                }
            }
        }
    }

    .total-duration-display {
        width: 1450px;
        font-size: 25px;

        > span:last-child {
            float: right;
        }
    }
}
</style>
