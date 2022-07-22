<template>
    <div class="stats-cell glow-border glow-blue">
        <div class="header layout vertical c-horiz">
            <fitted-content
                class="title"
                :max-width="540"
                align="center"
            >
                {{ cell.title }}
            </fitted-content>
            <div class="separator" />
            <div
                v-if="cell.subtitle"
                class="subtitle-wrapper layout vertical c-horiz"
            >
                <fitted-content
                    class="subtitle"
                    :max-width="540"
                    align="center"
                >
                    {{ cell.subtitle }}
                </fitted-content>
                <div class="subtitle-separator" />
            </div>
            <stats-list
                v-if="cell.displayType === 'SINGLE_STAT_LIST' || cell.displayType === 'MULTI_STAT_LIST'"
                :cell="cell"
            />
            <stats-bar-chart
                v-else-if="cell.displayType === 'SINGLE_STAT_BAR_CHART'"
                :cell="cell"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { DataCell } from 'relay-nodecg-connector';
import FittedContent from '../../../components/FittedContent.vue';
import StatsList from './StatsList.vue';
import StatsBarChart from './StatsBarChart.vue';

export default defineComponent({
    name: 'StatsCell',

    components: { StatsBarChart, StatsList, FittedContent },

    props: {
        cell: {
            type: Object as PropType<DataCell>,
            required: true
        }
    }
});
</script>

<style lang="scss">
@import '../../../styles/background';
@import '../../../styles/constants';
@import '../../../styles/glow';

.stats-cell {
    @include background();

    $padding: 10px;
    width: calc(100% - $padding * 2);
    height: calc(100% - $padding * 2);
    padding: $padding;
    overflow: hidden;

    .header {
        .title {
            width: 100%;
            margin: 8px 0;
            font-size: 40px;
            font-weight: bold;
            font-style: italic;
        }

        .separator {
            @include line-glow($blue);
            width: 90%;
            height: 2px;
            margin-bottom: 8px;
        }

        .subtitle-wrapper {
            margin-bottom: 8px;

            .subtitle {
                padding: 0 8px;
                text-align: center;
                width: 100%;
                font-size: 35px;
                font-style: italic;
                margin-bottom: 4px;
            }

            .subtitle-separator {
                @include line-glow($orange);
                width: 100%;
                height: 1px;
            }
        }
    }
}
</style>
