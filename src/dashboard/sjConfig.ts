import './styles/panel.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setUpReplicants } from 'client-shared/store/storeHelper';
import { tournamentDataReps, useTournamentDataStore } from 'client-shared/store/tournamentDataStore';
import { initBracketDataStore } from 'client-shared/store/bracketDataStore';
import SjConfig from './pages/sjConfig/SjConfig.vue';
import { breakScreenReps, useBreakScreenStore } from 'client-shared/store/breakScreenStore';

(async () => {
    const app = createApp(SjConfig);
    app.use(createPinia());
    await setUpReplicants(breakScreenReps, useBreakScreenStore());
    await setUpReplicants(tournamentDataReps, useTournamentDataStore());
    await initBracketDataStore();
    app.mount('#app');
})();
