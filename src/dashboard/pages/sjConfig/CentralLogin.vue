<template>
    <ipl-space>
        <ipl-message
            v-if="tokenExpiringSoon"
            type="warning"
            class="bottom-margin"
        >
            The Central access token is expiring soon!
        </ipl-message>
        <ipl-button
            label="Log in with Central"
            async
            :disabled="centralPath == null"
            @click="onLogin"
        />
        <div
            v-if="sessionData != null"
            class="top-margin"
        >
            Logged in as {{ sessionData.username }}
        </div>
        <div
            v-else
            class="top-margin"
        >
            Not logged in to Central
        </div>
    </ipl-space>
</template>

<script setup lang="ts">
import { IplButton, IplMessage, IplSpace } from '@iplsplatoon/vue-components';
import { Configschema } from 'types/schemas';
import { CentralJwtPayload, CentralSSOLinkResponse } from 'types/central';
import axios from 'axios';
import { useCentralDataStore } from 'client-shared/store/centralDataStore';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { decodeJwt } from 'jose';
import { DateTime } from 'luxon';

const centralPath = (nodecg.bundleConfig as Configschema).central?.basePath;
const centralDataStore = useCentralDataStore();
const parsedExpiryTime = computed(() =>
    centralDataStore.centralCredentials.expires == null
        ? null
        : DateTime.fromSeconds(centralDataStore.centralCredentials.expires));

const tokenExpiringSoon = ref(false);
let expiryTimeCheckInterval: number;

function checkExpiryTime() {
    tokenExpiringSoon.value = parsedExpiryTime.value != null && parsedExpiryTime.value.diffNow(['hours']).hours <= 0;
}

onMounted(() => {
    checkExpiryTime();
    expiryTimeCheckInterval = window.setInterval(checkExpiryTime, 60 * 1000 * 5);
});

onUnmounted(() => {
    window.clearInterval(expiryTimeCheckInterval);
});

async function onLogin() {
    if (centralPath == null) return;

    const loginLink = await axios.get<CentralSSOLinkResponse>(
        `${centralPath}/sso/link`,
        { params: { url: `${(window.location.origin)}/${nodecg.bundleName}/central-sso` } });

    window.open(loginLink.data.url, '_blank');
}

const sessionData = computed(() => {
    if (centralDataStore.centralCredentials.token == null) {
        return null;
    }

    try {
        const decoded = decodeJwt<CentralJwtPayload>(centralDataStore.centralCredentials.token);

        return {
            username: decoded.central.username,
            exp: decoded.exp
        };
    } catch (e) {
        console.error('Failed to decode session token', e);
        return null;
    }
});
</script>
