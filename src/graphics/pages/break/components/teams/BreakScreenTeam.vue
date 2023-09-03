<template>
    <div
        class="team layout vertical c-horiz"
        :class="{ 'alpha': team === 'A', 'bravo': team === 'B' }"
    >
        <div class="line top" />
        <div class="line mid" />
        <div
            class="content glow-border"
            :class="{ 'glow-red': team === 'A', 'glow-green': team === 'B' }"
        >
            <div class="team-name layout c-horiz c-vert">
                <split-text-transition
                    :max-width="450"
                    :value="$helpers.addDots(teamData?.name)"
                    :transition-key="`team-${team.toLowerCase()}-name`"
                    :transition-selector="`.team-${team.toLowerCase()}-name`"
                    :class="`team-${team.toLowerCase()}-name`"
                />
            </div>
            <transition
                mode="out-in"
                :css="false"
                @enter="playersEnter"
                @leave="playersLeave"
                @before-enter="beforePlayersEnter"
            >
                <div
                    :key="teamData?.id"
                    class="players"
                >
                    <fitted-content
                        v-for="(player, index) in teamData?.players"
                        :key="`player_${index}`"
                        :max-width="450"
                        class="player"
                        :class="`team-${team.toLowerCase()}-player`"
                    >
                        {{ $helpers.addDots(player.name) }} <badge v-if="!$helpers.isBlank(player.pronouns)">{{ $helpers.addDots(player.pronouns) }}</badge>
                    </fitted-content>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import FittedContent from '../../../../components/FittedContent.vue';
import Badge from '../../../../components/Badge.vue';
import SplitTextTransition from '../../../../components/SplitTextTransition.vue';
import gsap from 'gsap';
import { useActiveRoundStore } from 'client-shared/store/activeRoundStore';

export default defineComponent({
    name: 'BreakScreenTeam',

    components: { SplitTextTransition, Badge, FittedContent },

    props: {
        team: {
            type: String as PropType<'A' | 'B'>,
            required: true
        }
    },

    setup(props) {
        const activeRoundStore = useActiveRoundStore();
        const teamData = computed(() => props.team === 'A' ? activeRoundStore.activeRound.teamA : activeRoundStore.activeRound.teamB);

        return {
            teamData,
            players: computed(() => teamData.value?.players.slice(0, 5)),
            beforePlayersEnter: (elem: HTMLElement) => {
                gsap.set(elem.querySelectorAll('.player'), { opacity: 0, x: -350 });
            },
            playersEnter: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem.querySelectorAll('.player'), { duration: 0.35, opacity: 1, x: 0, ease: 'power2.out', stagger: 0.1, onComplete: done });
            },
            playersLeave: (elem: HTMLElement, done: gsap.Callback) => {
                gsap.to(elem.querySelectorAll('.player'), { duration: 0.35, opacity: 0, ease: 'power2.in', onComplete: done });
            }
        };
    }
});
</script>

<style lang="scss">
@import '../../../../styles/constants';
@import '../../../../styles/background';
@import '../../../../styles/glow';

.team {
    position: relative;
    height: 100%;

    .content {
        position: absolute;
        bottom: 5px;
        height: 583px;
        width: 500px;
        overflow: hidden;
        z-index: 2;
        @include background();

        .team-name {
            width: 100%;
            height: 112px;
            overflow: hidden;

            .fitted-content-wrapper {
                height: 100%;
                align-items: center;
                font-size: 50px;
                font-weight: 700;
                font-style: italic;
            }
        }

        .players {
            position: absolute;
            width: 460px;
            height: calc(100% - 140px);
            margin: 12px 20px 15px;
            bottom: 0;
            left: 0;

            .fitted-content-wrapper {
                font-size: 40px;
                font-weight: 300;
                margin-bottom: 2px;
            }
        }
    }

    .line {
        position: absolute;
        height: 2px;

        &.top {
            top: 0;
            width: 375px;
            margin-bottom: 45px;
            z-index: 3;
        }

        &.mid {
            top: 160px;
            width: 600px;
            z-index: 3;
        }
    }

    &.alpha {
        .line {
            @include line-glow($red);
        }
    }
    &.bravo {
        .line {
            @include line-glow($green);
        }
    }
}
</style>
