import{a as N}from"./axios-Mf404ijl.js";import{D as j,m as V,d as w,c as _,r as $,o as W,y as H,a as c,h as S,g as v,E as t,i as g,q as U,f as u,b as p,t as l,e as f,_ as B,F as h,j as L,k as P}from"./_plugin-vue_export-helper-Dg3X6I8a.js";import{s as M}from"./storeHelper-Dip-Ut0B.js";import{i as F}from"./bracketDataStore-D-BlndkY.js";import{u as R,P as O,K as k,a as D,R as q,U as z,c as G}from"./index-D6amFYoy.js";import{D as K,u as J,b as Q}from"./breakScreenStore-gMjrs9Ei.js";import{u as A,a as X}from"./activeRoundStore-NyoUqykV.js";import{a as T}from"./string-BeBbVoVE.js";import"./index.es-DRRw5Fw1.js";const Y=nodecg.Replicant("tournamentData",j),Z=[Y],ee=V("tournamentData",{state:()=>({tournamentData:null})});new TextEncoder;const I=new TextDecoder,te=n=>{const e=atob(n),a=new Uint8Array(e.length);for(let s=0;s<e.length;s++)a[s]=e.charCodeAt(s);return a},ae=n=>{let e=n;e instanceof Uint8Array&&(e=I.decode(e)),e=e.replace(/-/g,"+").replace(/_/g,"/").replace(/\s/g,"");try{return te(e)}catch{throw new TypeError("The input to be decoded is not correctly encoded.")}};class ne extends Error{static get code(){return"ERR_JOSE_GENERIC"}constructor(e){var a;super(e),this.code="ERR_JOSE_GENERIC",this.name=this.constructor.name,(a=Error.captureStackTrace)==null||a.call(Error,this,this.constructor)}}class y extends ne{constructor(){super(...arguments),this.code="ERR_JWT_INVALID"}static get code(){return"ERR_JWT_INVALID"}}function se(n){return typeof n=="object"&&n!==null}function oe(n){if(!se(n)||Object.prototype.toString.call(n)!=="[object Object]")return!1;if(Object.getPrototypeOf(n)===null)return!0;let e=n;for(;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(n)===e}const re=ae;function le(n){if(typeof n!="string")throw new y("JWTs must use Compact JWS serialization, JWT must be a string");const{1:e,length:a}=n.split(".");if(a===5)throw new y("Only JWTs using Compact JWS serialization can be decoded");if(a!==3)throw new y("Invalid JWT");if(!e)throw new y("JWTs must contain a payload");let s;try{s=re(e)}catch{throw new y("Failed to base64url decode the payload")}let o;try{o=JSON.parse(I.decode(s))}catch{throw new y("Failed to parse the decoded payload as JSON")}if(!oe(o))throw new y("Invalid JWT Claims Set");return o}const ce={key:1,class:"top-margin"},ie={key:2,class:"top-margin"},ue=w({__name:"CentralLogin",setup(n){var b;const e=(b=nodecg.bundleConfig.central)==null?void 0:b.basePath,a=R(),s=_(()=>a.centralCredentials.expires==null?null:K.fromSeconds(a.centralCredentials.expires)),o=$(!1);let r;function i(){o.value=s.value!=null&&s.value.diffNow(["hours"]).hours<=0}W(()=>{i(),r=window.setInterval(i,60*1e3*5)}),H(()=>{window.clearInterval(r)});async function x(){if(e==null)return;const m=await N.get(`${e}/sso/link`,{params:{url:`${window.location.origin}/${nodecg.bundleName}/central-sso`}});window.open(m.data.url,"_blank")}const d=_(()=>{if(a.centralCredentials.token==null)return null;try{const m=le(a.centralCredentials.token);return{username:m.central.username,exp:m.exp}}catch(m){return console.error("Failed to decode session token",m),null}});return(m,C)=>(c(),S(t(D),null,{default:v(()=>[o.value?(c(),S(t(O),{key:0,type:"warning",class:"bottom-margin"},{default:v(()=>[g(" The Central access token is expiring soon! ")]),_:1})):U("",!0),u(t(k),{label:"Log in with Central",async:"",disabled:t(e)==null,onClick:x},null,8,["disabled"]),d.value!=null?(c(),p("div",ce," Logged in as "+l(d.value.username),1)):(c(),p("div",ie," Not logged in to Central "))]),_:1}))}}),de={class:"mapping-display-layout"},me=w({__name:"CentralMappingDisplay",setup(n){const e=R(),a=A();function s(){nodecg.getDialog("centralTeamSearchDialog").open()}return(o,r)=>(c(),S(t(D),null,{default:v(()=>[f("div",de,[f("div",null,[f("div",null,l(t(T)(t(a).activeRound.teamA.name))+" has "+l(t(e).centralTeamMapping.teamA.length)+" team ID(s) in Central",1),u(t(k),{label:"Reset","requires-confirmation":"",color:"red",onClick:r[0]||(r[0]=i=>t(e).resetTeamMapping("a"))})]),f("div",null,[f("div",null,l(t(T)(t(a).activeRound.teamB.name))+" has "+l(t(e).centralTeamMapping.teamB.length)+" team ID(s) in Central",1),u(t(k),{label:"Reset","requires-confirmation":"",color:"red",onClick:r[1]||(r[1]=i=>t(e).resetTeamMapping("b"))})])]),u(t(k),{class:"top-margin",label:"Search teams",onClick:s})]),_:1}))}}),pe=B(me,[["__scopeId","data-v-fcd88caa"]]),ge={class:"text-center"},he=w({__name:"CentralMatchupsDisplay",setup(n){const e=R(),a=A();function s(d){if(d==null)return{tournaments:0,stages:0,matches:0};let b=0,m=0;for(let C=0;C<d.tournaments.length;C++){b+=d.tournaments[C].stages.length;for(let E=0;E<d.tournaments[C].stages.length;E++)m+=d.tournaments[C].stages[E].matches.length}return{tournaments:d.tournaments.length,stages:b,matches:m}}const o=_(()=>s(e.centralTeamMatchups.headToHead)),r=_(()=>s(e.centralTeamMatchups.teamA)),i=_(()=>s(e.centralTeamMatchups.teamB));async function x(){return nodecg.sendMessage("loadCentralMatchups")}return(d,b)=>(c(),S(t(D),{class:"matchup-display-layout"},{default:v(()=>[f("div",ge,[o.value.tournaments===0?(c(),p(h,{key:0},[g(" Head-to-head data is missing. ")],64)):(c(),p(h,{key:1},[g(" Head-to-head matches: "+l(o.value.tournaments)+" tournament(s), "+l(o.value.stages)+" stage(s), "+l(o.value.matches)+" match(es) ",1)],64))]),f("div",null,[r.value.tournaments===0?(c(),p(h,{key:0},[g(" Recent match data for "+l(t(T)(t(a).activeRound.teamA.name))+" is missing. ",1)],64)):(c(),p(h,{key:1},[g(" Matches for "+l(t(T)(t(a).activeRound.teamA.name))+": "+l(r.value.tournaments)+" tournament(s), "+l(r.value.stages)+" stage(s), "+l(r.value.matches)+" match(es) ",1)],64))]),f("div",null,[i.value.tournaments===0?(c(),p(h,{key:0},[g(" Recent match data for "+l(t(T)(t(a).activeRound.teamB.name))+" is missing. ",1)],64)):(c(),p(h,{key:1},[g(" Matches for "+l(t(T)(t(a).activeRound.teamB.name))+": "+l(i.value.tournaments)+" tournament(s), "+l(i.value.stages)+" stage(s), "+l(i.value.matches)+" match(es) ",1)],64))]),u(t(k),{label:"Reload matchups",async:"",onClick:x})]),_:1}))}}),fe=B(he,[["__scopeId","data-v-5c54023a"]]),_e=w({__name:"CentralDisplaySettings",setup(n){const e=R(),a=_({get(){return e.centralDisplaySettings.displayMode},set(o){e.setDisplayMode(o)}}),s=_(()=>[{name:"Teams",value:"teams"},{name:"Head-to-Head",value:"headToHead",disabled:e.centralTeamMatchups.headToHead==null||e.centralTeamMatchups.headToHead.tournaments.length===0},{name:"Team A Results",value:"teamAResults",disabled:e.centralTeamMatchups.teamA==null||e.centralTeamMatchups.teamA.tournaments.length===0},{name:"Team B Results",value:"teamBResults",disabled:e.centralTeamMatchups.teamB==null||e.centralTeamMatchups.teamB.tournaments.length===0}]);return(o,r)=>(c(),S(t(D),null,{default:v(()=>[u(t(q),{modelValue:a.value,"onUpdate:modelValue":r[0]||(r[0]=i=>a.value=i),options:s.value,label:"Display mode",name:"displayMode"},null,8,["modelValue","options"])]),_:1}))}}),ye=w({__name:"SjConfig",setup(n){const e=nodecg.bundleConfig.central!=null,a=J(),s=_({get(){return a.breakUseCastersScene},set(o){a.setBreakCastersScene(o)}});return(o,r)=>(c(),p(h,null,[u(t(D),{class:"bottom-margin"},{default:v(()=>[u(t(z),{modelValue:s.value,"onUpdate:modelValue":r[0]||(r[0]=i=>s.value=i),label:"Casters on break graphic"},null,8,["modelValue"])]),_:1}),e?(c(),p(h,{key:0},[u(ue),u(pe,{class:"top-margin"}),u(fe,{class:"top-margin"}),u(_e,{class:"top-margin"})],64)):(c(),S(t(O),{key:1,type:"warning"},{default:v(()=>[g(" Central bundle configuration is missing. ")]),_:1}))],64))}});(async()=>{const n=L(ye);n.use(P()),await M(Q,J()),await M(Z,ee()),await M(G,R()),await M(X,A()),await F(),n.mount("#app")})();
