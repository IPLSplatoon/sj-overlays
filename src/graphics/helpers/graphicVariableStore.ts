import { defineStore } from 'pinia';

export const useGraphicVariableStore = defineStore('graphicVariables', {
    state: () => ({
        sceneChangeStartDelay: 0.8
    })
});
