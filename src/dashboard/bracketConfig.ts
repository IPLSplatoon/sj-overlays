import './styles/panel.scss';
import { createApp } from 'vue';
import BracketConfig from './pages/BracketConfig.vue';
import { createPinia } from 'pinia';
import { setUpReplicants } from 'client-shared/store/storeHelper';
import { tournamentDataReps, useTournamentDataStore } from 'client-shared/store/tournamentDataStore';

(async () => {
    const app = createApp(BracketConfig);
    app.use(createPinia());
    await setUpReplicants(tournamentDataReps, useTournamentDataStore());
    app.mount('#app');
})();
