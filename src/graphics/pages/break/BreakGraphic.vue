<template>
    <transition
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
        mode="out-in"
        :css="false"
        @enter="infoBarEnter"
        @leave="infoBarLeave"
        @before-enter="beforeInfoBarEnter"
    >
        <break-info-bar v-if="activeBreakScene === 'teams' || activeBreakScene === 'stages'" />
    </transition>
    <icon-background />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import IconBackground from '../../components/IconBackground.vue';
import BreakStages from './components/stages/BreakStages.vue';
import BreakTeams from './components/teams/BreakTeams.vue';
import BreakMain from './components/main/BreakMain.vue';
import gsap from 'gsap';
import BreakInfoBar from './components/infobar/BreakInfoBar.vue';
import { useBreakScreenStore } from '../../store/breakScreenStore';

interface AnimatedSceneComponent extends HTMLElement {
    __vueParentComponent: InternalAnimatedSceneComponentInstance
}

interface InternalAnimatedSceneComponentInstance {
    ctx: {
        beforeEnter: (elem: HTMLElement) => void
        enter: (elem: HTMLElement, done: gsap.Callback) => void
        leave: (elem: HTMLElement, done: gsap.Callback) => void
    }
}

export default defineComponent({
    name: 'BreakGraphic',

    components: { BreakInfoBar, BreakMain, BreakTeams, BreakStages, IconBackground },

    setup() {
        const breakScreenStore = useBreakScreenStore();

        const beforeInfoBarEnter = (elem: HTMLElement) => {
            gsap.set(elem.querySelector('.info-bar'), { width: 0, opacity: 0 });
        };

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
            // Accesses the internal Vue instance of the components and runs the appropriate animation methods.
            // This means that child components in this transition MUST contain 'beforeEnter', 'enter', and 'leave' methods.
            // There's likely a better way to do this, but it works...
            beforeEnter: (elem: AnimatedSceneComponent) => {
                (elem.__vueParentComponent as InternalAnimatedSceneComponentInstance).ctx.beforeEnter(elem);
            },
            enter: (elem: AnimatedSceneComponent, done: gsap.Callback) => {
                (elem.__vueParentComponent as InternalAnimatedSceneComponentInstance).ctx.enter(elem, done);
            },
            leave: (elem: AnimatedSceneComponent, done: gsap.Callback) => {
                (elem.__vueParentComponent as InternalAnimatedSceneComponentInstance).ctx.leave(elem, done);
            },

            beforeInfoBarEnter,
            infoBarEnter,
            infoBarLeave
        };
    }
});
</script>
