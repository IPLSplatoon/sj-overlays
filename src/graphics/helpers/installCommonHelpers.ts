import { addDots, isBlank } from './string';
import { formatDuration } from './timer';
import { App } from 'vue';

export function installCommonHelpers(app: App): void {
    app.config.globalProperties.$helpers = {
        addDots,
        isBlank,
        formatDuration
    };
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $helpers: {
            addDots: typeof addDots,
            isBlank: typeof isBlank,
            formatDuration: typeof formatDuration
        }
    }
}
