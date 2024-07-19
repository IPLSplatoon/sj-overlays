import './styles/panel.scss';
import './styles/dialog.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { setUpReplicants } from 'client-shared/store/storeHelper';
import { centralDataReps, useCentralDataStore } from 'client-shared/store/centralDataStore';
import { activeRoundReps, useActiveRoundStore } from 'client-shared/store/activeRoundStore';
import CentralTeamSearchDialog from './pages/centralTeamSearch/CentralTeamSearchDialog.vue';

(async () => {
    const app = createApp(CentralTeamSearchDialog);
    app.use(createPinia());
    await setUpReplicants(centralDataReps, useCentralDataStore());
    await setUpReplicants(activeRoundReps, useActiveRoundStore());
    app.mount('#app');
})();
