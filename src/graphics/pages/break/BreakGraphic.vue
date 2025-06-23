<template>
    <!-- Casters are a weird special case because the camera feeds need to be loaded at all times -->
    <!-- Try to keep the camera feed iframes loaded in a different element and they'll be reloaded when you move them in the DOM. -->
    <div v-show="contentVisible">
        <transition
            appear
            :css="false"
            @enter="castersEnter"
            @leave="castersLeave"
            @before-enter="beforeCastersEnter"
        >
            <break-casters v-show="contentVisible && activeBreakScene === 'casters'" />
        </transition>
    </div>
    <template v-if="contentVisible">
        <transition
            appear
            mode="out-in"
            :css="false"
            @enter="enter"
            @leave="leave"
            @before-enter="beforeEnter"
        >
            <break-stages v-if="activeBreakScene === 'stages'" />
            <break-teams v-else-if="activeBreakScene === 'teams'" />
            <break-main v-else-if="activeBreakScene === 'main'" />
        </transition>
        <transition
            appear
            mode="out-in"
            :css="false"
            @enter="infoBarEnter"
            @leave="infoBarLeave"
            @before-enter="beforeInfoBarEnter"
        >
            <break-info-bar v-if="activeBreakScene === 'teams' || activeBreakScene === 'stages' || activeBreakScene === 'casters'" />
        </transition>
    </template>
    <icon-background />
</template>

<script lang="ts">
import { computed, defineComponent, provide, ref } from 'vue';
import IconBackground from '../../components/IconBackground.vue';
import BreakStages from './components/stages/BreakStages.vue';
import BreakTeams from './components/teams/BreakTeams.vue';
import BreakMain from './components/main/BreakMain.vue';
import gsap from 'gsap';
import BreakInfoBar from './components/infobar/BreakInfoBar.vue';
import { useBreakScreenStore } from 'client-shared/store/breakScreenStore';
import { bindEntranceToFunction } from '../../helpers/obs';
import { TransitionFunctionMap, transitionFunctionsInjectionKey } from '../../helpers/transition';
import BreakCasters from './components/casters/BreakCasters.vue';

export default defineComponent({
    name: 'BreakGraphic',

    components: { BreakCasters, BreakInfoBar, BreakMain, BreakTeams, BreakStages, IconBackground },

    setup() {
        const breakScreenStore = useBreakScreenStore();
        const contentVisible = ref(true);

        bindEntranceToFunction(e => {
            if (e.detail.active || e.detail.visible) {
                contentVisible.value = false;

                setTimeout(() => {
                    contentVisible.value = true;
                }, 2500);
            }
        });

        const transitions: TransitionFunctionMap = {};
        provide(transitionFunctionsInjectionKey, transitions);

        const beforeInfoBarEnter = (elem: HTMLElement) => {
            gsap.set(elem.querySelector('.info-bar'), { width: 0, opacity: 0 });
        };

        const breakTransitionTimeline = gsap.timeline();

        const infoBarEnter = (elem: HTMLElement, done: gsap.Callback) => {
            const tl = gsap.timeline({
                onComplete: done,
                onStart: () => { gsap.set(elem.querySelector('.info-bar'), { opacity: 1 }); },
                delay: 0.6
            });

            tl.to(elem.querySelector('.info-bar'), { duration: 0.65, width: 1300, ease: 'power2.out' });

            return tl;
        };

        const infoBarLeave = (elem: HTMLElement, done: gsap.Callback) => {
            const tl = gsap.timeline({ onComplete: done });

            tl.to(elem.querySelector('.info-bar'), { duration: 0.65, width: 0, ease: 'power2.in' });

            return tl;
        };

        return {
            activeBreakScene: computed(() => breakScreenStore.activeBreakScene),
            beforeEnter: (elem: HTMLElement) => {
                transitions.break.beforeEnter(elem);
            },
            enter: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({ onComplete: done });

                tl.add(transitions.break.enter(elem));

                breakTransitionTimeline.add(tl);
            },
            leave: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({ onComplete: done });

                tl.add(transitions.break.leave(elem));

                breakTransitionTimeline.add(tl);
            },

            beforeCastersEnter: (elem: HTMLElement) => {
                transitions['break-casters'].beforeEnter(elem);
            },
            castersEnter: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({ onComplete: done });

                tl.add(transitions['break-casters'].enter(elem));

                breakTransitionTimeline.add(tl);
            },
            castersLeave: (elem: HTMLElement, done: gsap.Callback) => {
                const tl = gsap.timeline({ onComplete: done });

                tl.add(transitions['break-casters'].leave(elem));

                breakTransitionTimeline.add(tl);
            },

            beforeInfoBarEnter,
            infoBarEnter,
            infoBarLeave,

            contentVisible
        };
    }
});
</script>
