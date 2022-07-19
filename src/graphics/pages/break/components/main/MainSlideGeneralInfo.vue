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
            <span v-html="strings.break.main.general.steamResumes(nextRoundStartDiffNow)" />
        </main-slide-row>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons/faHourglassEnd';
import { useNextStageTimer } from '../../../../helpers/timer';
import FittedContent from '../../../../components/FittedContent.vue';
import MainSlideRow from './MainSlideRow.vue';
import SlideTransition from '../../../../components/SlideTransition.vue';
import { useBreakScreenStore } from '../../../../store/breakScreenStore';
import { useMusicStore } from '../../../../store/musicStore';
import { useLocaleInfoStore } from '../../../../store/localeInfoStore';

library.add(faMusic, faHourglassEnd);

export default defineComponent({
    name: 'MainSlideGeneralInfo',

    components: { SlideTransition, MainSlideRow, FittedContent },

    setup() {
        const breakScreenStore = useBreakScreenStore();
        const musicStore = useMusicStore();
        const nextRoundStartDiffNow = useNextStageTimer();
        const localeInfoStore = useLocaleInfoStore();
        const { strings } = toRefs(localeInfoStore);

        return {
            strings,
            nowPlaying: computed(() => musicStore.nowPlaying),
            musicShown: computed(() => musicStore.musicShown),
            nextRoundStartDiffNow,
            nextRoundTimeVisible: computed(() => breakScreenStore.nextRoundStartTime.isVisible),
            mainFlavorText: computed(() => breakScreenStore.mainFlavorText)
        };
    }
});
</script>
