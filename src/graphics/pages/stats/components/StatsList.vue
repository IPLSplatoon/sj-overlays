<template>
    <div class="stats-list-wrapper">
        <div
            v-for="(item, index) in cell.values"
            :key="`cell-list-item_${index}`"
            class="line-item"
        >
            <span>{{ item.label }}</span>
            <span>{{ formatValue(item.value) }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { DataCell } from 'relay-nodecg-connector';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'StatsList',

    props: {
        cell: {
            type: Object as PropType<DataCell>,
            required: true
        }
    },

    setup() {
        return {
            formatValue(value: unknown) {
                if (typeof value === 'number') {
                    return value.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
                } else {
                    return value;
                }
            }
        };
    }
});
</script>

<style lang="scss">
.stats-list-wrapper {
    margin: 8px 16px 0;
    width: calc(100% - 32px);

    > .line-item {
        font-size: 35px;
        line-height: 42px;
        margin-top: 2px;
        height: 47px;

        > span:last-child {
            float: right;
            font-weight: bold;
            font-size: 40px;
        }
    }
}
</style>
