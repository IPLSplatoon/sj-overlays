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
import { getSongNameAsString } from '../../../../helpers/string';
import { useMusicStore } from 'client-shared/store/musicStore';

export default defineComponent({
    name: 'BreakInfoBarMusic',

    components: { FittedContent, OpacitySwapTransition, FontAwesomeIcon },

    setup() {
        const musicStore = useMusicStore();

        return {
            nowPlaying: computed(() => getSongNameAsString(musicStore.nowPlaying)),
        };
    }
});
</script>
