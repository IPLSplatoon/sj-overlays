<template>
    <opacity-swap-transition>
        <div
            :key="nowPlaying"
            class="info-row layout c-horiz c-vert"
        >
            <font-awesome-icon
                icon="music"
                class="icon"
            />
            <fitted-content
                :max-width="950"
            >
                <span>{{ nowPlaying }}</span>
            </fitted-content>
        </div>
    </opacity-swap-transition>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import FittedContent from '../../../../components/FittedContent.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import OpacitySwapTransition from '../../../../components/OpacitySwapTransition.vue';
import { useReplicant } from 'nodecg-vue-composable';
import { DASHBOARD_BUNDLE_NAME } from '../../../../helpers/constants';
import { NowPlaying } from 'schemas';
import { getSongNameAsString } from '../../../../helpers/string';

export default defineComponent({
    name: 'BreakInfoBarMusic',

    components: { FittedContent, OpacitySwapTransition, FontAwesomeIcon },

    setup() {
        const nowPlaying = useReplicant<NowPlaying>('nowPlaying', DASHBOARD_BUNDLE_NAME);

        return {
            nowPlaying: computed(() => getSongNameAsString(nowPlaying.data)),
        };
    }
});
</script>
