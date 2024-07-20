"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const constants_1 = require("./constants");
const axios_1 = __importDefault(require("axios"));
const jose_1 = require("jose");
const luxon_1 = require("luxon");
module.exports = (nodecg) => {
    var _a;
    const activeBreakScene = nodecg.Replicant('activeBreakScene', constants_1.DASHBOARD_BUNDLE_NAME);
    const breakUseCastersScene = nodecg.Replicant('breakUseCastersScene', { defaultValue: false });
    activeBreakScene.on('change', () => {
        breakUseCastersScene.value = false;
    });
    const router = nodecg.Router();
    const centralPath = (_a = nodecg.bundleConfig.central) === null || _a === void 0 ? void 0 : _a.basePath;
    const centralCredentials = nodecg.Replicant('centralCredentials');
    router.get('/central-sso', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        if (centralPath == null) {
            return res.status(500).send('Central URL is not configured.');
        }
        if (req.query.code == null) {
            return res.status(400).send('No code provided.');
        }
        try {
            const loginResponse = yield axios_1.default.post(`${centralPath}/sso/login`, {
                code: req.query.code
            });
            const decoded = (0, jose_1.decodeJwt)(loginResponse.data.session);
            centralCredentials.value = {
                expires: decoded.exp,
                token: loginResponse.data.session
            };
        }
        catch (e) {
            return res.status(500).send(`Failed to login: ${e}`);
        }
        res.status(200).send('<script>window.close();</script>');
    }));
    function checkAccessToken() {
        var _a;
        if (((_a = centralCredentials.value) === null || _a === void 0 ? void 0 : _a.expires) == null)
            return;
        if (luxon_1.DateTime.fromSeconds(centralCredentials.value.expires).diffNow().milliseconds <= 0) {
            centralCredentials.value = {
                token: null,
                expires: null
            };
        }
    }
    checkAccessToken();
    setInterval(checkAccessToken, 60 * 1000);
    nodecg.mount(`/${nodecg.bundleName}`, router);
    const activeRound = nodecg.Replicant('activeRound', constants_1.DASHBOARD_BUNDLE_NAME);
    const centralTeamMapping = nodecg.Replicant('centralTeamMapping');
    const centralTeamMatchups = nodecg.Replicant('centralTeamMatchups');
    activeRound.on('change', (newValue, oldValue) => {
        if (oldValue == null)
            return;
        let resetMatchupData = false;
        if (newValue.teamA.id !== oldValue.teamA.id) {
            centralTeamMapping.value.teamA = [];
            resetMatchupData = true;
        }
        if (newValue.teamB.id !== oldValue.teamB.id) {
            centralTeamMapping.value.teamB = [];
            resetMatchupData = true;
        }
        if (resetMatchupData) {
            centralTeamMatchups.value = {
                headToHead: undefined,
                teamA: undefined,
                teamB: undefined
            };
        }
    });
    function buildMatchupSearchUrl(teamIds, endpoint) {
        if (centralPath == null) {
            throw new Error('Central URL is not configured.');
        }
        const url = new URL(`${centralPath}/match/${endpoint}`);
        teamIds.forEach(id => {
            url.searchParams.append('team_id', id);
        });
        return url.toString();
    }
    function getMatchups(teamIds, type) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (((_a = centralCredentials.value) === null || _a === void 0 ? void 0 : _a.token) == null) {
                throw new Error('Not logged in to Central');
            }
            if (teamIds.length === 0) {
                return {
                    tournaments: []
                };
            }
            const headers = { Authorization: `JWT ${centralCredentials.value.token}` };
            try {
                const response = yield axios_1.default.get(buildMatchupSearchUrl(teamIds, type === 'headToHead' ? 'matchups' : 'team-matches'), { headers });
                return response.data;
            }
            catch (e) {
                if (axios_1.default.isAxiosError(e) && ((_b = e.response) === null || _b === void 0 ? void 0 : _b.status) === 404) {
                    return {
                        tournaments: []
                    };
                }
                throw e;
            }
        });
    }
    nodecg.listenFor('loadCentralMatchups', (data, ack) => __awaiter(void 0, void 0, void 0, function* () {
        if (ack == null || ack.handled)
            return;
        try {
            const headToHeadData = yield getMatchups([...centralTeamMapping.value.teamA, ...centralTeamMapping.value.teamB], 'headToHead');
            const teamAData = yield getMatchups(centralTeamMapping.value.teamA, 'team');
            const teamBData = yield getMatchups(centralTeamMapping.value.teamB, 'team');
            centralTeamMatchups.value = {
                headToHead: headToHeadData,
                teamA: teamAData,
                teamB: teamBData
            };
        }
        catch (e) {
            return ack(e);
        }
        ack(null);
    }));
};
