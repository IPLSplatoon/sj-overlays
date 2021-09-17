import { gsap } from 'gsap';

export function textOpacitySwap(newText: string, elem: FittedText, extraElems?: HTMLElement[]): gsap.core.Tween[] {
    return [
        gsap.to([elem, ...extraElems], {
            opacity: 0, duration: 0.35, onComplete: () => {
                elem.text = newText;
            }
        }),
        gsap.to([elem, ...extraElems], { opacity: 1, duration: 0.35, delay: 0.35 })
    ];
}
