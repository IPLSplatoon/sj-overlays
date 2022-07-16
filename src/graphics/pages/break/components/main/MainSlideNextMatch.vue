<template>
    <div class="slide next-round layout vertical c-vert">
        <div class="title">Up next</div>
        <div class="separator" />
        <div>
            <slide-transition>
                <fitted-content
                    :key="`${teamA?.name}-${teamB?.name}`"
                    :max-width="900"
                    class="next-team-names"
                >
                    <span class="team-name">{{ teamA?.name }}</span> vs <span class="team-name">{{ teamB?.name }}</span>
                </fitted-content>
            </slide-transition>
        </div>
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
                        :style="{ backgroundImage: `url('${getStageImagePath(game.stage)}')` }"
                    />
                    <div class="match-text layout vertical">
                        <fitted-content
                            :max-width="250"
                            class="mode-name"
                        >
                            {{ game.mode }}
                        </fitted-content>
                        <div class="stage-name">{{ game.stage }}</div>
                    </div>
                </div>
            </div>
        </div>
        <span id="round-size">{{ numberOfGames }} games total</span>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMusic } from '@fortawesome/free-solid-svg-icons/faMusic';
import { faHourglassEnd } from '@fortawesome/free-solid-svg-icons/faHourglassEnd';
import { getStageImagePath } from '../../../../helpers/constants';
import FittedContent from '../../../../components/FittedContent.vue';
import SlideTransition from '../../../../components/SlideTransition.vue';
import { useNextRoundStore } from '../../../../store/nextRoundStore';

library.add(faMusic, faHourglassEnd);

export default defineComponent({
    name: 'MainSlideNextMatch',

    components: { SlideTransition, FittedContent },

    setup() {
        const nextRoundStore = useNextRoundStore();

        return {
            teamA: computed(() => nextRoundStore.nextRound.teamA),
            teamB: computed(() => nextRoundStore.nextRound.teamB),
            nextGames: computed(() => nextRoundStore.nextRound.games.slice(0, 3)),
            numberOfGames: computed(() => nextRoundStore.nextRound.games.length),
            roundType: computed(() => {
                const gameCount = nextRoundStore.nextRound.games.length;
                return nextRoundStore.nextRound.round.type === 'PLAY_ALL' ? `Play all ${gameCount}` : `Best of ${gameCount}`;
            }),
            getStageImagePath
        };
    }
});
</script>

<style lang="scss">
@import '../../../../styles/constants';

.slide.next-round {
    .next-team-names {
        font-weight: 300;
        font-size: 48px;
        margin-bottom: 15px;

        .team-name {
            font-weight: 600;
        }
    }

    #round-size {
        font-weight: 300;
        font-size: 32px;
        margin-top: 15px;
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
            background-color: $background-a-60;
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
