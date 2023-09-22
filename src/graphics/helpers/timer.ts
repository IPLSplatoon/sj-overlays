import { DateTime, Duration } from 'luxon';
import { computed, onUnmounted, ref, Ref, watch } from 'vue';
import { useBreakScreenStore } from 'client-shared/store/breakScreenStore';

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

export function formatDuration(seconds: number): string {
    return Duration.fromObject({ seconds }).toFormat('m:ss');
}
