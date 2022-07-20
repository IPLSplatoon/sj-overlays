import { ObsEvent } from '../types/obs';
import { onUnmounted } from 'vue';
import { useGraphicVariableStore } from './graphicVariableStore';

export function bindEntranceToTimeline(timeline: gsap.core.Timeline): void {
    bindEntranceToFunction(
        (e: ObsEvent) => {
            if (e.detail.active) {
                timeline.delay(useGraphicVariableStore().sceneChangeStartDelay).restart(true);
            } else {
                timeline.pause(0);
            }
        },
        (e: ObsEvent) => {
            if (e.detail.visible) {
                timeline.delay(useGraphicVariableStore().sceneChangeStartDelay).restart(false);
            }
        },
        () => {
            timeline.delay(1).restart(true);
        }
    );
}

export function bindEntranceToTimelineGenerator(generator: () => gsap.core.Timeline): void {
    bindEntranceToFunction(
        (e: ObsEvent) => {
            const timeline = generator();
            if (e.detail.active) {
                timeline.delay(useGraphicVariableStore().sceneChangeStartDelay).restart(true);
            } else {
                timeline.pause(0);
                timeline.kill();
            }
        },
        (e: ObsEvent) => {
            if (e.detail.visible) {
                generator().delay(useGraphicVariableStore().sceneChangeStartDelay).restart(false);
            }
        },
        () => {
            generator().delay(1).restart(true);
        }
    );
}

type ChangeHandler = (e: ObsEvent) => void;
export function bindEntranceToFunction(activeChangeHandler: ChangeHandler, visibleChangeHandler?: ChangeHandler, doubleClickHandler?: () => void): void {
    if (window.obsstudio != null) {
        window.addEventListener('obsSourceActiveChanged', activeChangeHandler);
        window.addEventListener('obsSourceVisibleChanged', visibleChangeHandler ?? activeChangeHandler);

        onUnmounted(() => {
            window.removeEventListener('obsSourceActiveChanged', activeChangeHandler);
            window.removeEventListener('obsSourceVisibleChanged', visibleChangeHandler ?? activeChangeHandler);
        });
    } else {
        // use the defined double click handler or call the active change handler, saying that the source is active
        // (even when there is no obs source)
        window.addEventListener(
            'dblclick',
            doubleClickHandler ?? (e => activeChangeHandler(Object.assign({ ...e }, { detail: { active: true } }))));
        onUnmounted(() => {
            window.removeEventListener('dblclick', doubleClickHandler ?? activeChangeHandler);
        });
    }
}
