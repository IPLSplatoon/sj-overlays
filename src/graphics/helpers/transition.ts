import gsap from 'gsap';
import { inject, InjectionKey } from 'vue';

interface RawTransitionFunctions {
    beforeEnter?: (elem: HTMLElement) => void
    enter?: (elem: HTMLElement, done: gsap.Callback | undefined, ...args: unknown[]) => gsap.core.Timeline
    leave?: (elem: HTMLElement, done: gsap.Callback | undefined, ...args: unknown[]) => gsap.core.Timeline
}

interface TransitionFunctions {
    beforeEnter?: (elem: HTMLElement) => void
    enter?: (elem: HTMLElement, ...args: unknown[]) => gsap.core.Timeline
    leave?: (elem: HTMLElement, ...args: unknown[]) => gsap.core.Timeline
}

export type TransitionFunctionMap = Record<string, TransitionFunctions>;

export const transitionFunctionsInjectionKey = Symbol() as InjectionKey<TransitionFunctionMap>;

export function provideTransitions(key: string, rootQuerySelector: string | null | ((elem: HTMLElement) => string | null), transitions: RawTransitionFunctions): void {
    const injection = inject(transitionFunctionsInjectionKey);
    if (injection == null) return;

    injection[key] = {
        beforeEnter: (elem: HTMLElement) => {
            const selector = typeof rootQuerySelector === 'function' ? rootQuerySelector(elem) : rootQuerySelector;
            if (selector != null) {
                elem = elem.querySelector(selector);
            }

            transitions.beforeEnter(elem);
        },
        enter: (elem: HTMLElement, ...args: unknown[]) => {
            const selector = typeof rootQuerySelector === 'function' ? rootQuerySelector(elem) : rootQuerySelector;
            if (selector != null) {
                elem = elem.querySelector(selector);
            }

            return transitions.enter(elem, undefined, ...args);
        },
        leave: (elem: HTMLElement, ...args: unknown[]) => {
            const selector = typeof rootQuerySelector === 'function' ? rootQuerySelector(elem) : rootQuerySelector;
            if (selector != null) {
                elem = elem.querySelector(selector);
            }

            return transitions.leave(elem, undefined, ...args);
        }
    };
}
