import { ComputedRef, onUnmounted, Ref, ref, watch } from 'vue';
import { getNextIndex } from './array';

interface Slide {
    component: string
    enabled?: ComputedRef<boolean> | undefined
    duration?: number | undefined
}

function isSlideEnabled(slide: Slide): boolean {
    return slide.enabled == null || slide.enabled.value;
}

export function useSlides(slides: Slide[]): { activeComponent: Ref<string | null>, forceSetSlide: (component: string) => void } {
    const activeIndex = ref<number | null>(null);
    const activeComponent = ref<string | null>(null);

    const findNextVisibleSlide = () => {
        // If all slides are disabled, show the first one
        if (slides.every(slide => !isSlideEnabled(slide))) {
            activeIndex.value = 0;
            activeComponent.value = slides[activeIndex.value].component;
        } else {
            // On first run, always show the first component if possible
            activeIndex.value = activeIndex.value == null ? 0 : getNextIndex(slides, activeIndex.value);
            let newActiveSlide: Slide = slides[activeIndex.value];
            while (!isSlideEnabled(newActiveSlide)) {
                activeIndex.value = getNextIndex(slides, activeIndex.value);
                newActiveSlide = slides[activeIndex.value];
            }
            activeComponent.value = newActiveSlide.component;
        }
    };

    let slideChangeTimeout: number | undefined;
    const setSlideChangeTimeout = () => {
        if (activeIndex.value != null) {
            const activeSlide = slides[activeIndex.value];
            slideChangeTimeout = window.setTimeout(() => {
                findNextVisibleSlide();
                setSlideChangeTimeout();
            }, (activeSlide.duration ?? 30) * 1000);
        }
    };

    let forceAllowSlide = false;
    const forceSetSlide = (component: string): void => {
        const newSlideIndex = slides.findIndex(slide => slide.component === component);
        if (newSlideIndex === -1) {
            console.warn(`Could not find slide ${component}`);
            return;
        }
        const newSlide = slides[newSlideIndex];
        clearTimeout(slideChangeTimeout);
        forceAllowSlide = true;
        activeIndex.value = newSlideIndex;
        activeComponent.value = newSlide.component;
        setSlideChangeTimeout();
    };

    findNextVisibleSlide();
    setSlideChangeTimeout();

    onUnmounted(() => {
        clearTimeout(slideChangeTimeout);
    });

    watch(() => activeIndex.value == null ? true : slides[activeIndex.value].enabled?.value, newValue => {
        // if a slide is disabled while it is visible, hide it immediately
        if (newValue === false && !forceAllowSlide) {
            clearTimeout(slideChangeTimeout);
            findNextVisibleSlide();
            setSlideChangeTimeout();
        } else {
            forceAllowSlide = false;
        }
    });

    return {
        activeComponent,
        forceSetSlide
    };
}
