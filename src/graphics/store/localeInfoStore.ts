import { NodeCGBrowser } from 'nodecg/browser';
import { LocaleInfo } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from '../helpers/constants';

const localeInfo = nodecg.Replicant<LocaleInfo>('localeInfo', DASHBOARD_BUNDLE_NAME);

export const localeInfoReps = [localeInfo];

interface LocaleInfoStore {
    localeInfo: LocaleInfo
}

export const useLocaleInfoStore = defineStore('localeInfo', {
    state: () => ({
        localeInfo: {},
    } as LocaleInfoStore)
});
