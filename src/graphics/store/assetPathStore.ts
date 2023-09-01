import { AssetPaths } from "schemas";
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from '../helpers/constants';

const assetPaths = nodecg.Replicant<AssetPaths>('assetPaths', DASHBOARD_BUNDLE_NAME);

export const assetPathReps = [assetPaths];

interface AssetPathStore {
    assetPaths: AssetPaths;
}

export const useAssetPathStore = defineStore('assetPaths', {
    state: (): AssetPathStore => ({
        assetPaths: null
    }),
    getters: {
        getStageImagePath: state =>
            (stageName: string) => state.assetPaths.stageImages[stageName] ?? '/bundles/sj-overlays/assets/SJ_Unknown-Map-4.png'
    }
});
