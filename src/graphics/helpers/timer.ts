import { DateTime } from 'luxon';
import { computed, onUnmounted, ref, Ref, watch } from 'vue';
import { useBreakScreenStore } from '../store/breakScreenStore';

export function useNextStageTimer(): Ref<number> {
    const breakScreenStore = useBreakScreenStore();
    const startTime = computed(() => DateTime.fromISO(breakScreenStore.nextRoundStartTime.startTime));
    const diff = ref<number>(null);

    function checkDiff() {
        const diffNow = Math.ceil(startTime.value.diffNow(['minutes']).toObject().minutes);
        if (diff.value !== diffNow) {
            diff.value = diffNow;
        }
    }

    checkDiff();
    watch(startTime, checkDiff);
    const nextStageDiffInterval = window.setInterval(checkDiff, 1000);

    onUnmounted(() => {
        window.clearInterval(nextStageDiffInterval);
    });

    return diff;
}
