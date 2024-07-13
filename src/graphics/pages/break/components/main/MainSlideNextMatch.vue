<template>
    <div class="slide next-round layout vertical c-vert">
        <div class="title">{{ strings.break.main.nextup.title }}</div>
        <div class="separator" />
        <div>
            <slide-transition>
                <fitted-content
                    :key="`${teamA?.name}-${teamB?.name}`"
                    :max-width="900"
                    class="next-team-names"
                >
                    <span class="team-name">{{ addDots(teamA?.name) }}</span> vs <span class="team-name">{{ addDots(teamB?.name) }}</span>
                </fitted-content>
            </slide-transition>
        </div>
        <span id="round-size">{{ strings.break.main.nextup.matchCount(numberOfGames, roundType) }}</span>
        <div>
            <div class="matches-container layout horiz c-vert">
                <div
                    v-for="(game, index) in nextGames"
                    :key="`${index}_${game.mode}_${game.stage}`"
                    class="match"
                >
                    <div class="cover glow-border glow-blue" />
                    <div
                        class="match-background"
                        :style="{ backgroundImage: `url('${ getStageImagePath(game.stage)}')` }"
                    />
                    <div class="match-text layout vertical">
                        <fitted-content
                            :max-width="250"
                            class="mode-name"
                        >
                            {{ localeInfo.modes[game.mode] }}
                        </fitted-content>
                        <div class="stage-name">{{ localeInfo.stages[game.stage] }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons/faHourglassEnd';
import FittedContent from '../../../../components/FittedContent.vue';
import SlideTransition from '../../../../components/SlideTransition.vue';
import { useNextRoundStore } from 'client-shared/store/nextRoundStore';
import { useLocaleInfoStore } from 'client-shared/store/localeInfoStore';
import { useAssetPathStore } from 'client-shared/store/assetPathStore';
import { addDots } from '../../../../helpers/string';

library.add(faMusic, faHourglassEnd);

export default defineComponent({
    name: 'MainSlideNextMatch',

    components: { SlideTransition, FittedContent },

    setup() {
        const nextRoundStore = useNextRoundStore();
        const localeInfoStore = useLocaleInfoStore();
        const assetPathStore = useAssetPathStore();
        const { strings } = toRefs(localeInfoStore);

        return {
            strings,
            localeInfo: computed(() => localeInfoStore.localeInfo),
            teamA: computed(() => nextRoundStore.nextRound.teamA),
            teamB: computed(() => nextRoundStore.nextRound.teamB),
            nextGames: computed(() => nextRoundStore.nextRound.games.slice(0, 3)),
            numberOfGames: computed(() => nextRoundStore.nextRound.games.length),
            roundType: computed(() => nextRoundStore.nextRound.round.type),
            getStageImagePath: assetPathStore.getStageImagePath,
            addDots
        };
    }
});
</script>

<style lang="scss">
@use '../../../../styles/constants';

.slide.next-round {
    .next-team-names {
        font-weight: 300;
        font-size: 48px;

        .team-name {
            font-weight: 600;
        }
    }

    #round-size {
        font-weight: 300;
        font-size: 32px;
        margin-bottom: 20px;
        margin-top: -8px;
    }

    .match {
        position: relative;
        width: 300px;
        height: 175px;
        margin: 0 15px;

        &:first-child {
            margin-left: 0;
        }

        &:last-child {
            margin-right: 0;
            opacity: 0.75;
        }

        .cover {
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: constants.$background-a-60;
            z-index: 10;
        }

        .match-background {
            position: absolute;
            width: 100%;
            height: 100%;
            border-radius: 15px;
            z-index: 9;
            filter: blur(3px);
            background-position: center center;
            background-size: cover;
        }

        .match-text {
            height: 100%;
            justify-content: flex-end;
            margin: 0 10px;
        }

        .mode-name, .stage-name {
            position: relative;
            z-index: 11;
            filter: drop-shadow(0 0 2px black);
        }

        .mode-name {
            font-weight: 700;
            font-style: italic;
        }

        .stage-name {
            font-weight: 300;
            font-size: 32px;
            line-height: 36px;
            margin-bottom: 5px;
        }
    }
}
</style>
