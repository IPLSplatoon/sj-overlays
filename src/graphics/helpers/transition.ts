import gsap from 'gsap';
import { inject, InjectionKey } from 'vue';

interface RawTransitionFunctions {
    beforeEnter?: (elem: HTMLElement) => void
    enter?: (elem: HTMLElement, done: gsap.Callback, ...args: unknown[]) => gsap.core.Timeline
    leave?: (elem: HTMLElement, done: gsap.Callback, ...args: unknown[]) => gsap.core.Timeline
}

interface TransitionFunctions {
    beforeEnter?: (elem: HTMLElement) => void
    enter?: (elem: HTMLElement, ...args: unknown[]) => gsap.core.Timeline
    leave?: (elem: HTMLElement, ...args: unknown[]) => gsap.core.Timeline
}

export type TransitionFunctionMap = Record<string, TransitionFunctions>;

export const transitionFunctionsInjectionKey = Symbol() as InjectionKey<TransitionFunctionMap>;

export function provideTransitions(key: string, rootQuerySelector: string | null, transitions: RawTransitionFunctions): void {
    const injection = inject(transitionFunctionsInjectionKey);
    if (injection == null) return;

    injection[key] = {
        beforeEnter: (elem: HTMLElement) => {
            if (rootQuerySelector != null) {
                elem = elem.querySelector(rootQuerySelector);
            }

            transitions.beforeEnter(elem);
        },
        enter: (elem: HTMLElement, ...args: unknown[]) => {
            if (rootQuerySelector != null) {
                elem = elem.querySelector(rootQuerySelector);
            }

            return transitions.enter(elem, null, ...args);
        },
        leave: (elem: HTMLElement, ...args: unknown[]) => {
            if (rootQuerySelector != null) {
                elem = elem.querySelector(rootQuerySelector);
            }

            return transitions.leave(elem, null, ...args);
        }
    };
}
