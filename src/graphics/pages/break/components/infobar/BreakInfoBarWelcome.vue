<template>
    <div class="info-row layout c-horiz c-vert">
        <div v-html="strings.break.infobar.welcome" />
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import { useLocaleInfoStore } from '../../../../store/localeInfoStore';

export default defineComponent({
    name: 'BreakInfoBarWelcome',

    setup() {
        const localeInfoStore = useLocaleInfoStore();
        const { strings } = toRefs(localeInfoStore);

        return {
            strings
        };
    }
});
</script>
