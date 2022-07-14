import { ComputedRef, ref, Ref, watch } from 'vue';
import gsap from 'gsap';

const tweenedNumberFormat = new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 0 });

export function useTweenedNumber(number: ComputedRef<number> | Ref<number>): Ref<string> {
    const tweenedNumber = ref(number.value);
    const formattedTweenedNumber = ref(tweenedNumberFormat.format(number.value));

    watch(() => number.value, newValue => {
        gsap.to(
            tweenedNumber,
            {
                duration: 0.5,
                value: newValue,
                roundProps: { value: 1 },
                ease: 'power2.inOut',
                onUpdate: () => {
                    formattedTweenedNumber.value = tweenedNumberFormat.format(tweenedNumber.value);
                }
            });
    });

    return formattedTweenedNumber;
}
