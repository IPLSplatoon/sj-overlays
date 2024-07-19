import type { BracketAnimationOpts, SwissAnimator } from '@tourneyview/renderer';
import gsap from 'gsap';
import { SwissRenderer } from '@tourneyview/renderer';

export class SJSwissAnimator implements SwissAnimator {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    beforeHide(): void { }

    beforeReveal(element: HTMLElement): void {
        gsap.set(element, { opacity: 1 });
        gsap.set(element.querySelectorAll('.match-row-wrapper'), { width: 0, opacity: 0 });
    }

    async hide(element: HTMLElement, opts: BracketAnimationOpts<SwissRenderer>): Promise<unknown> {
        return gsap.to(element, { duration: 0.35, opacity: 0, delay: opts.delay });
    }

    async reveal(element: HTMLElement, opts: BracketAnimationOpts<SwissRenderer>): Promise<unknown> {
        const rowWrappers = element.querySelectorAll('.match-row-wrapper');
        return Promise.all([
            gsap.to(rowWrappers, {
                width: 1000,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power2.out',
                delay: opts.delay
            }),
            gsap.to(rowWrappers, {
                opacity: 1,
                duration: 0.1,
                stagger: 0.05,
                delay: opts.delay
            })
        ]);
    }
}
