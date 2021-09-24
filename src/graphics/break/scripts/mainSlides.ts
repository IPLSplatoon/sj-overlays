import { gsap } from 'gsap';
import { mainFlavorText, nextRound } from '../../helpers/replicants';
import { textSlideSwap } from '../../helpers/anim';
import { elementById } from '../../helpers/elem';

export let currentSlide = 'main';
const mainTextSwapTl = gsap.timeline();
let slideTl = gsap.timeline();
const slides = ['main', 'support', 'next-round'];

export function forceSetSlide(index: number): void {
    if (slideTl) {
        slideTl.kill();
        slideTl = gsap.timeline();
        gsap.to('.main-slides > .slide > *', { duration: 0.5, opacity: 0 });
    }

    setTimeout(() => {
        setSlide(index);
    }, 600);
}

function setSlide(index: number): void {
    const slide = slides[index];
    const pause = index === 1 ? 15 : 45;
    const selector = `.slide.${slide} > *`;
    slideTl.add(gsap.fromTo(selector, { y: -50 }, { duration: 0.5, y: 0, opacity: 1, stagger: -0.05, ease: 'power2.out' }))
        .add(gsap.to({}, { duration: pause, onComplete: () => {
            currentSlide = slides[index + 1 === slides.length ? 0 : index + 1];
        } }))
        .add(gsap.to(selector, {
            duration: 0.35,
            opacity: 0,
            y: 50,
            stagger: -0.05,
            ease: 'power2.in',
            onComplete: function() {
                const nextIndex = index + 1;
                if (nextIndex === slides.length || (nextIndex === 2 && !nextRound.value.showOnStream)) {
                    setSlide(0);
                } else {
                    setSlide(index + 1);
                }
            }
        }));
}

mainFlavorText.on('change', newValue => {
    const textElem = elementById<FittedText>('main-flavor-text');
    if (currentSlide === 'main') {
        mainTextSwapTl.add(textSlideSwap(newValue, textElem));
    } else {
        textElem.text = newValue;
    }
});

export function toggleMainRow(selector: string, isVisible: boolean, slide: string, height = 54): void {
    const elemHeight = isVisible ? height : 0;
    const elemOpacity = (isVisible && currentSlide === slide) ? 1 : 0;
    const elemMargin = isVisible ? '8px 0' : '0 0';
    const timerElem = document.querySelector(selector) as HTMLElement;
    if (isVisible) {
        setAttrs();
    }
    gsap.to(timerElem, {
        duration: 0.5,
        height: elemHeight,
        opacity: elemOpacity,
        margin: elemMargin,
        ease: 'power2.inOut',
        onComplete: () => { if (!isVisible) setAttrs(); }
    });

    function setAttrs() {
        gsap.set(timerElem, { y: 0, opacity: 0 });
        timerElem.style.visibility = isVisible ? 'unset' : 'hidden';
    }
}
