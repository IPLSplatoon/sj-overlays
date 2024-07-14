<template>
    <div
        class="team layout vertical c-horiz"
        :class="`team-${team.toLowerCase()}`"
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
                    transition-key="team-name"
                    transition-selector=".inner-team-name"
                    class="inner-team-name"
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
import { computed, defineComponent, PropType, provide } from 'vue';
import FittedContent from '../../../../components/FittedContent.vue';
import Badge from '../../../../components/Badge.vue';
import SplitTextTransition from '../../../../components/SplitTextTransition.vue';
import gsap from 'gsap';
import { useActiveRoundStore } from 'client-shared/store/activeRoundStore';
import {
    provideTransitions,
    TransitionFunctionMap,
    transitionFunctionsInjectionKey
} from '../../../../helpers/transition';

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
        const transitions: TransitionFunctionMap = {};
        provide(transitionFunctionsInjectionKey, transitions);

        function beforePlayersEnter(elem: HTMLElement) {
            gsap.set(elem.querySelectorAll('.player'), { opacity: 0, x: -350 });
        }
        function playersEnter(elem: HTMLElement, done?: gsap.Callback) {
            return gsap.to(elem.querySelectorAll('.player'), { duration: 0.35, opacity: 1, x: 0, ease: 'power2.out', stagger: 0.1, onComplete: done });
        }
        function playersLeave(elem: HTMLElement, done?: gsap.Callback) {
            return gsap.to(elem.querySelectorAll('.player'), { duration: 0.35, opacity: 0, x: -350, stagger: 0.1, ease: 'power2.in', onComplete: done });
        }

        provideTransitions(`team-${props.team.toLowerCase()}`, (elem) => elem.classList.contains('team') ? null : `.team.team-${props.team.toLowerCase()}`, {
            beforeEnter(elem: HTMLElement) {
                transitions['team-name'].beforeEnter(elem);
                beforePlayersEnter(elem);
                gsap.set(
                    elem.querySelectorAll('.line.top, .line.mid'),
                    { opacity: 0, width: 0 });
                gsap.set(
                    elem.querySelector('.content'),
                    { height: 0, opacity: 0 });
            },
            enter(elem: HTMLElement, done: gsap.Callback) {
                const tl = gsap.timeline({ onComplete: done });

                tl
                    .addLabel('teamsLineIn', '+=0.35')
                    .addLabel('teamsTextIn', '+=0.45');

                tl
                    .to(
                        elem.querySelector('.content'),
                        { duration: 0.1, opacity: 1 },
                        'teamsIn')
                    .to(
                        elem.querySelector('.content'),
                        { duration: 0.55, height: 'calc(100% - 55px)', ease: 'power2.out' },
                        'teamsIn')
                    .to(
                        elem.querySelector('.line.top'),
                        { duration: 0.55, width: 375, opacity: 1, ease: 'power2.out' },
                        'teamsLineIn')
                    .to(
                        elem.querySelector('.line.mid'),
                        { duration: 0.55, width: 600, opacity: 1, ease: 'power2.out' },
                        'teamsLineIn')
                    .add(transitions['team-name'].enter(elem), 'teamsTextIn')
                    .add(playersEnter(elem), 'teamsTextIn');

                return tl;
            },
            leave(elem: HTMLElement, done: gsap.Callback) {
                const tl = gsap.timeline({ onComplete: done });

                tl
                    .addLabel('teamsTextOut')
                    .addLabel('teamsLineOut', '+=0.4')
                    .addLabel('teamsOut', '+=0.6');

                tl
                    .add(playersLeave(elem), 'teamsTextOut')
                    .add(transitions['team-name'].leave(elem), 'teamsTextOut')
                    .to(
                        elem.querySelectorAll('.line.top, .line.mid'),
                        { duration: 0.55, width: 0, opacity: 0, ease: 'power2.in' },
                        'teamsLineOut')
                    .to(
                        elem.querySelector('.content'),
                        { duration: 0.55, height: 0, ease: 'power2.in' },
                        'teamsOut')
                    .to(
                        elem.querySelector('.content'),
                        { duration: 0.1, opacity: 0, delay: 0.5 },
                        'teamsOut');

                return tl;
            }
        });

        return {
            teamData,
            players: computed(() => teamData.value?.players.slice(0, 5)),
            beforePlayersEnter,
            playersEnter,
            playersLeave
        };
    }
});
</script>

<style lang="scss">
@use '../../../../styles/glow';
@use '../../../../styles/constants';
@use '../../../../styles/background';

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
        @include background.background();

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

    &.team-a {
        .line {
            @include glow.line-glow(constants.$red);
        }
    }
    &.team-b {
        .line {
            @include glow.line-glow(constants.$green);
        }
    }
}
</style>
