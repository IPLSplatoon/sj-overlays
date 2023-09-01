import { LocaleInfo, RuntimeConfig } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from '../helpers/constants';

const localeInfo = nodecg.Replicant<LocaleInfo>('localeInfo', DASHBOARD_BUNDLE_NAME);
const runtimeConfig = nodecg.Replicant<LocaleInfo>('runtimeConfig', DASHBOARD_BUNDLE_NAME);

export const localeInfoReps = [localeInfo, runtimeConfig];

interface LocaleInfoStore {
    localeInfo: LocaleInfo
    runtimeConfig: RuntimeConfig
}

interface TranslatableText {
    break: {
        main: {
            general: {
                steamResumes: (minutes: number) => string
            }
            nextup: {
                title: string
                matchCount: (count: number) => string
            },
            support: {
                title: string
                items: Array<{ icon: string | string[], text: string, isCustomIcon?: boolean }>
            }
        },
        infobar: {
            welcome: string
        }
    }
}

export const useLocaleInfoStore = defineStore('localeInfo', {
    state: (): LocaleInfoStore => ({
        localeInfo: null,
        runtimeConfig: null
    }),
    getters: {
        strings: (state): TranslatableText => {
            switch (state.runtimeConfig.locale) {
                case 'EN':
                    return {
                        break: {
                            main: {
                                general: {
                                    steamResumes: minutes => {
                                        if (minutes > 1) {
                                            return `Resuming in <span class="bold">~${minutes}</span> minutes...`;
                                        } else if (minutes === 1) {
                                            return `Resuming in <span class="bold">~${minutes}</span> minute...`;
                                        } else {
                                            return 'The stream will resume soon!';
                                        }
                                    }
                                },
                                nextup: {
                                    title: 'Up next',
                                    matchCount: count => `${count} games total`
                                },
                                support: {
                                    title: 'Support us!',
                                    items: [
                                        { icon: ['fab', 'twitter'], text: '@IPLSplatoon' },
                                        { icon: ['fab', 'discord'], text: 'iplabs.ink/discord' },
                                        { icon: 'globe', text: 'iplabs.ink' },
                                        { icon: 'dollar-sign', text: 'iplabs.ink/donate' },
                                        { icon: ['fab', 'patreon'], text: 'patreon.com/IPLSplatoon' }
                                    ]
                                }
                            },
                            infobar: {
                                welcome: 'Welcome to <span class="logo-font">SuperJump!</span>'
                            }
                        }
                    };
                case 'DE':
                    return {
                        break: {
                            main: {
                                general: {
                                    steamResumes: minutes => {
                                        if (minutes > 1) {
                                            return `Weiter geht es in <span class="bold">~${minutes}</span> Minuten...`;
                                        } else if (minutes === 1) {
                                            return `Weiter geht es in <span class="bold">~${minutes}</span> Minute...`;
                                        } else {
                                            return 'Das Spiel beginnt in kürze!';
                                        }
                                    }
                                },
                                nextup: {
                                    title: 'Nächstes Match',
                                    matchCount: count => `${count} Spiele`
                                },
                                support: {
                                    title: 'Unterstütze uns!',
                                    items: [
                                        { icon: 'icon-iplabs', text: 'iplabs.ink', isCustomIcon: true },
                                        { icon: ['fab', 'discord'], text: 'discord.gg/pd46EXE' },
                                        { icon: ['fab', 'twitter'], text: '@DSplatoonLiga' },
                                        { icon: ['fab', 'twitch'], text: 'deutschesplbundesliga' },
                                        { icon: ['fab', 'youtube'], text: 'Splatoon Bundesliga' }
                                    ]
                                }
                            },
                            infobar: {
                                welcome: 'Willkommen in <span class="logo-font">SuperJump!</span>'
                            }
                        }
                    };
            }
        }
    }
});
