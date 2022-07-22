import { computed, ComputedRef, ref, Ref, watch } from 'vue';
import gsap from 'gsap';

export function useTweenedNumber(
    number: ComputedRef<unknown> | Ref<unknown>,
    maximumFractionDigits = computed(() => 0),
    minimumFractionDigits = maximumFractionDigits
): Ref<string> {
    const tweenedNumber = ref<number>(0);
    const formattedTweenedNumber = ref<string>('0');

    watch(() => number.value, newValue => {
        const tweenedNumberFormat = new Intl.NumberFormat('en-US', {
            style: 'decimal',
            maximumFractionDigits: maximumFractionDigits.value,
            minimumFractionDigits: minimumFractionDigits.value
        });

        if (typeof newValue === 'number') {
            gsap.to(
                tweenedNumber,
                {
                    duration: 0.5,
                    value: newValue,

                    ease: 'power2.inOut',
                    onUpdate: () => {
                        formattedTweenedNumber.value = tweenedNumberFormat.format(tweenedNumber.value);
                    }
                });
        } else {
            formattedTweenedNumber.value = String(newValue);
        }
    }, { immediate: true });

    return formattedTweenedNumber;
}
