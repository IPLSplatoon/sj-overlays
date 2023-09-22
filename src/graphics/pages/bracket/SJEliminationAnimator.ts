import { HierarchyPointLink, HierarchyPointNode } from 'd3';
import { Match } from '@tourneyview/common';
import type { EliminationAnimator, EliminationRenderer } from '@tourneyview/renderer';
import gsap from 'gsap';

export class SJEliminationAnimator implements EliminationAnimator {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    beforeHide() {

    }

    async hide(element: HTMLElement): Promise<unknown> {
        return gsap.to(element, { opacity: 0, duration: 0.35 });
    }

    beforeReveal(element: HTMLElement): void {
        gsap.set(element, { opacity: 1 });
        gsap.set(element.querySelectorAll('.match-cell-accent-color, .match-cell-accent-white'), { drawSVG: '50% 50%' });
        gsap.set(element.querySelectorAll('.bracket-link'), { strokeDashoffset: '-1' });
        gsap.set(element.querySelectorAll('.match-cell'), { opacity: 0 });
        gsap.set(element.querySelectorAll('.round-label, .elimination-renderer__bracket-title'), { opacity: 0 });
    }

    async reveal(element: HTMLElement, renderer: EliminationRenderer): Promise<unknown> {
        const depth = renderer.getBracketDepth();
        const tl = gsap.timeline();

        tl
            .to(
                element.querySelectorAll('.round-label, .elimination-renderer__bracket-title'),
                {
                    duration: 0.35,
                    opacity: 1,
                    stagger: function(index, target) {
                        return (target.__data__ as number ?? 0) * 0.5;
                    }
                },
                'matches-in'
            )
            .to(
                element.querySelectorAll('.bracket-link'),
                {
                    duration: 0.75,
                    ease: 'power3.inOut',
                    strokeDashoffset: '0',
                    autoRound: false,
                    delay: depth * 0.5,
                    stagger: function(index, target) {
                        return (depth - (target.__data__ as HierarchyPointLink<Match>).source.depth) * 0.35;
                    }
                },
                'matches-in'
            )
            .to(
                element.querySelectorAll('.match-cell-accent-color, .match-cell-accent-white'),
                {
                    duration: 1,
                    ease: 'power2.inOut',
                    drawSVG: true,
                    stagger: function(index, target) {
                        return (depth - (target.__data__ as HierarchyPointNode<Match>).depth) * 0.5;
                    }
                },
                'matches-in'
            )
            .to(
                element.querySelectorAll('.match-cell'),
                {
                    duration: 0.15,
                    ease: 'none',
                    opacity: 1,
                    delay: 0.75,
                    stagger: function(index, target) {
                        return (depth - (target.__data__ as HierarchyPointNode<Match>).depth) * 0.5 + 0.1;
                    }
                },
                'matches-in'
            );

        return tl;
    }
}
