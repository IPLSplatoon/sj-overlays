import './styles/panel.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setUpReplicants } from 'client-shared/store/storeHelper';
import { tournamentDataReps, useTournamentDataStore } from 'client-shared/store/tournamentDataStore';
import { initBracketDataStore } from 'client-shared/store/bracketDataStore';
import SjConfig from './pages/sjConfig/SjConfig.vue';
import { breakScreenReps, useBreakScreenStore } from 'client-shared/store/breakScreenStore';
import { centralDataReps, useCentralDataStore } from 'client-shared/store/centralDataStore';
import { activeRoundReps, useActiveRoundStore } from 'client-shared/store/activeRoundStore';
import { casterReps, useCasterStore } from 'client-shared/store/casterStore';

(async () => {
    const app = createApp(SjConfig);
    app.use(createPinia());
    await setUpReplicants(breakScreenReps, useBreakScreenStore());
    await setUpReplicants(tournamentDataReps, useTournamentDataStore());
    await setUpReplicants(centralDataReps, useCentralDataStore());
    await setUpReplicants(activeRoundReps, useActiveRoundStore());
    await setUpReplicants(casterReps, useCasterStore());
    await initBracketDataStore();
    app.mount('#app');
})();
