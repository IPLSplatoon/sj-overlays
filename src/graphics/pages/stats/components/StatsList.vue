<template>
    <opacity-swap-transition>
        <div
            :key="cell.displayType"
            class="stats-list-wrapper"
        >
            <stats-list-item
                v-for="(item, index) in cell.values"
                :key="`cell-list-item_${item.label}_${index}`"
                class="line-item"
                :value="item"
                :use-decimals="useDecimals"
                :tween-value="cell.displayType !== 'MULTI_STAT_LIST'"
            />
        </div>
    </opacity-swap-transition>
</template>

<script lang="ts">
import { DataCell } from 'relay-nodecg-connector';
import { computed, defineComponent, PropType } from 'vue';
import StatsListItem from './StatsListItem.vue';
import OpacitySwapTransition from '../../../components/OpacitySwapTransition.vue';

export default defineComponent({
    name: 'StatsList',

    components: { OpacitySwapTransition, StatsListItem },

    props: {
        cell: {
            type: Object as PropType<DataCell>,
            required: true
        }
    },

    setup(props) {
        return {
            useDecimals: computed(() => props.cell.values.some(value => typeof value.value === 'number' && value.value % 1 !== 0))
        };
    }
});
</script>

<style lang="scss">
.stats-list-wrapper {
    margin: 8px 16px 0;
    width: calc(100% - 32px);
}
</style>
