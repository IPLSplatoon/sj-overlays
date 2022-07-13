<template>
    <div class="slide main layout vertical c-vert">
        <slide-transition>
            <fitted-content
                :key="mainFlavorText"
                class="title"
                :max-width="900"
            >
                {{ mainFlavorText }}
            </fitted-content>
        </slide-transition>
        <div class="separator" />
        <main-slide-row
            icon="music"
            show-second-row
            :is-visible="musicShown"
            :first-row="nowPlaying.artist ?? 'Unknown Artist'"
            :second-row="nowPlaying.song ?? 'Unknown Song'"
        />
        <main-slide-row
            icon="hourglass-end"
            :is-visible="nextRoundTimeVisible"
        >
            <span v-if="nextRoundStartDiffNow > 1">
                Resuming in <span class="bold">~{{ nextRoundStartDiffNow }}</span> minutes...
            </span>
            <span v-else-if="nextRoundStartDiffNow === 1">
                Resuming in <span class="bold">~{{ nextRoundStartDiffNow }}</span> minute...
            </span>
            <span v-else>
                The stream will resume soon!
            </span>
        </main-slide-row>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons/faHourglassEnd';
import { useReplicant } from 'nodecg-vue-composable';
import { MainFlavorText, MusicShown, NextRoundStartTime, NowPlaying } from 'schemas';
import { DASHBOARD_BUNDLE_NAME } from '../../../../helpers/constants';
import { setNextStageTimer } from '../../../../helpers/timer';
import FittedContent from '../../../../components/FittedContent.vue';
import MainSlideRow from './MainSlideRow.vue';
import SlideTransition from '../../../../components/SlideTransition.vue';

library.add(faMusic, faHourglassEnd);

export default defineComponent({
    name: 'MainSlideGeneralInfo',

    components: { SlideTransition, MainSlideRow, FittedContent },

    setup() {
        const mainFlavorText = useReplicant<MainFlavorText>('mainFlavorText', DASHBOARD_BUNDLE_NAME);
        const nowPlaying = useReplicant<NowPlaying>('nowPlaying', DASHBOARD_BUNDLE_NAME);
        const musicShown = useReplicant<MusicShown>('musicShown', DASHBOARD_BUNDLE_NAME);
        const nextRoundStartTime = useReplicant<NextRoundStartTime>('nextRoundStartTime', DASHBOARD_BUNDLE_NAME);
        const nextRoundStartDiffNow = ref(0);

        watch(() => nextRoundStartTime.data?.startTime, startTime => {
            setNextStageTimer(startTime, (newValue) => nextRoundStartDiffNow.value = newValue);
        }, { immediate: true });

        return {
            nowPlaying: computed(() => nowPlaying.data ?? {}),
            musicShown: computed(() => musicShown?.data ?? true),
            nextRoundStartDiffNow,
            nextRoundTimeVisible: computed(() => nextRoundStartTime.data?.isVisible ?? false),
            mainFlavorText: computed(() => mainFlavorText.data ?? '')
        };
    }
});
</script>
