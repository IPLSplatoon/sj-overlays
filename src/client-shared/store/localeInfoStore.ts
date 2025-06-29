import { LocaleInfo, RuntimeConfig } from 'schemas';
import { defineStore } from 'pinia';
import { DASHBOARD_BUNDLE_NAME } from 'client-shared/constants';

const localeInfo = nodecg.Replicant<LocaleInfo>('localeInfo', DASHBOARD_BUNDLE_NAME);
const runtimeConfig = nodecg.Replicant<RuntimeConfig>('runtimeConfig', DASHBOARD_BUNDLE_NAME);

export const localeInfoReps = [localeInfo, runtimeConfig];

interface LocaleInfoStore {
    localeInfo: LocaleInfo
    runtimeConfig: RuntimeConfig
}

interface TranslatableText {
    main: {
        castersTitle: string
    }
    break: {
        main: {
            general: {
                steamResumes: (minutes: number) => string
            }
            nextup: {
                title: string
                matchCount: (count: number, playType: 'PLAY_ALL' | 'BEST_OF') => string
            },
            support: {
                title: string
                items: Array<{ icon: string | string[], text: string, isCustomIcon?: boolean }>
            }
        },
        infobar: {
            welcome: string,
            nextUp: string
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
                case 'DE':
                    return {
                        main: {
                            castersTitle: 'Kommentatoren'
                        },
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
                                    matchCount: (count, playType) => {
                                        if (playType === 'PLAY_ALL') {
                                            return `Play all ${count}`;
                                        }

                                        return `Best of ${count}`;
                                    }
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
                                welcome: 'Willkommen in <span class="logo-font">SuperJump!</span>',
                                nextUp: 'Nächstes Match:'
                            }
                        }
                    };
                case 'EU_FR':
                    return {
                        main: {
                            castersTitle: 'Commentateurs'
                        },
                        break: {
                            main: {
                                general: {
                                    steamResumes: minutes => {
                                        if (minutes > 1) {
                                            return `De retour dans <span class="bold">~${minutes}</span> minutes...`;
                                        } else if (minutes === 1) {
                                            return `De retour dans <span class="bold">~${minutes}</span> minute...`;
                                        } else {
                                            return 'On arrive très vite !';
                                        }
                                    }
                                },
                                nextup: {
                                    title: 'A suivre',
                                    matchCount: (count, playType) => {
                                        if (playType === 'PLAY_ALL') {
                                            return `Play all ${count}`;
                                        }

                                        return `Best of ${count}`;
                                    }
                                },
                                support: {
                                    title: 'Soutenez-nous',
                                    items: [
                                        { icon: 'icon-iplabs', text: 'iplabs.ink', isCustomIcon: true },
                                        { icon: ['fab', 'twitter'], text: '@eSportBrosTV' },
                                        { icon: ['fab', 'discord'], text: 'discord.gg/ebtv-splatoon' },
                                        { icon: 'globe', text: 'esportbros.tv' }
                                    ]
                                }
                            },
                            infobar: {
                                welcome: 'Bienvenue au <span class="logo-font">SuperJump !</span>',
                                nextUp: 'A suivre :'
                            }
                        }
                    };
                default:
                    return {
                        main: {
                            castersTitle: 'Commentators'
                        },
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
                                    matchCount: (count, playType) => {
                                        if (playType === 'PLAY_ALL') {
                                            return `Play all ${count}`;
                                        }

                                        return `Best of ${count}`;
                                    }
                                },
                                support: {
                                    title: 'Support us!',
                                    items: [
                                        { icon: ['fab', 'bluesky'], text: '@iplabs.ink' },
                                        { icon: ['fab', 'discord'], text: 'iplabs.ink/discord' },
                                        { icon: 'globe', text: 'iplabs.ink' },
                                        { icon: 'dollar-sign', text: 'iplabs.ink/donate' },
                                        { icon: ['fab', 'patreon'], text: 'patreon.com/IPLSplatoon' }
                                    ]
                                }
                            },
                            infobar: {
                                welcome: 'Welcome to <span class="logo-font">SuperJump!</span>',
                                nextUp: 'Next:'
                            }
                        }
                    };
            }
        }
    }
});
