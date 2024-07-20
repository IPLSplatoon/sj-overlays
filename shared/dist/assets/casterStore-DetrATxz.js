import{F as b,g as i}from"./DrawSVGPlugin-49hUBmER.js";import{d,r as h,_ as m,l as v,a as l,h as p,g as f,i as C,t as S,T as _,D as c,m as g,b as $,G as L}from"./_plugin-vue_export-helper-DsXqNseE.js";const x=d({name:"ScoreCounter",components:{FittedContent:b},props:{value:{type:Number,required:!0},maxWidth:{type:Number,default:40}},setup(t){const e=h(null);return{scoreCounterEnter:(n,a)=>{i.to(n,{duration:.35,y:0,ease:"power2.out",onComplete:a})},beforeScoreCounterEnter:n=>{i.set(n,{y:t.value>e.value?-50:50}),e.value=t.value},scoreCounterLeave:(n,a)=>{i.to(n,{duration:.35,y:t.value>e.value?50:-50,ease:"power2.in",onComplete:a})}}}});function w(t,e,n,a,s,o){const r=v("fitted-content");return l(),p(_,{mode:"out-in",onEnter:t.scoreCounterEnter,onLeave:t.scoreCounterLeave,onBeforeEnter:t.beforeScoreCounterEnter},{default:f(()=>[(l(),p(r,{key:t.value,"max-width":t.maxWidth,align:"center"},{default:f(()=>[C(S(t.value),1)]),_:1},8,["max-width"]))]),_:1},8,["onEnter","onLeave","onBeforeEnter"])}const I=m(x,[["render",w]]),B=nodecg.Replicant("localeInfo",c),E=nodecg.Replicant("runtimeConfig",c),M=[B,E],T=g("localeInfo",{state:()=>({localeInfo:null,runtimeConfig:null}),getters:{strings:t=>{switch(t.runtimeConfig.locale){case"DE":return{main:{castersTitle:"Kommentatoren"},break:{main:{general:{steamResumes:e=>e>1?`Weiter geht es in <span class="bold">~${e}</span> Minuten...`:e===1?`Weiter geht es in <span class="bold">~${e}</span> Minute...`:"Das Spiel beginnt in kürze!"},nextup:{title:"Nächstes Match",matchCount:(e,n)=>n==="PLAY_ALL"?`Play all ${e}`:`Best of ${e}`},support:{title:"Unterstütze uns!",items:[{icon:"icon-iplabs",text:"iplabs.ink",isCustomIcon:!0},{icon:["fab","discord"],text:"discord.gg/pd46EXE"},{icon:["fab","twitter"],text:"@DSplatoonLiga"},{icon:["fab","twitch"],text:"deutschesplbundesliga"},{icon:["fab","youtube"],text:"Splatoon Bundesliga"}]}},infobar:{welcome:'Willkommen in <span class="logo-font">SuperJump!</span>',nextUp:"Nächstes Match:"}}};case"EU_FR":return{main:{castersTitle:"Commentateurs"},break:{main:{general:{steamResumes:e=>e>1?`De retour dans <span class="bold">~${e}</span> minutes...`:e===1?`De retour dans <span class="bold">~${e}</span> minute...`:"On arrive très vite !"},nextup:{title:"A suivre",matchCount:(e,n)=>n==="PLAY_ALL"?`Play all ${e}`:`Best of ${e}`},support:{title:"Soutenez-nous",items:[{icon:"icon-iplabs",text:"iplabs.ink",isCustomIcon:!0},{icon:["fab","twitter"],text:"@eSportBrosTV"},{icon:["fab","discord"],text:"discord.gg/ebtv-splatoon"},{icon:"globe",text:"esportbros.tv"}]}},infobar:{welcome:'Bienvenue au <span class="logo-font">SuperJump !</span>',nextUp:"A suivre :"}}};default:return{main:{castersTitle:"Commentators"},break:{main:{general:{steamResumes:e=>e>1?`Resuming in <span class="bold">~${e}</span> minutes...`:e===1?`Resuming in <span class="bold">~${e}</span> minute...`:"The stream will resume soon!"},nextup:{title:"Up next",matchCount:(e,n)=>n==="PLAY_ALL"?`Play all ${e}`:`Best of ${e}`},support:{title:"Support us!",items:[{icon:["fab","twitter"],text:"@IPLSplatoon"},{icon:["fab","discord"],text:"iplabs.ink/discord"},{icon:"globe",text:"iplabs.ink"},{icon:"dollar-sign",text:"iplabs.ink/donate"},{icon:["fab","patreon"],text:"patreon.com/IPLSplatoon"}]}},infobar:{welcome:'Welcome to <span class="logo-font">SuperJump!</span>',nextUp:"Next:"}}}}}}}),k=d({name:"Badge"}),y={class:"badge"};function D(t,e,n,a,s,o){return l(),$("span",y,[L(t.$slots,"default")])}const U=m(k,[["render",D]]);var R={};(function(t){Object.defineProperty(t,"__esModule",{value:!0});var e="fas",n="microphone",a=384,s=512,o=[],r="f130",u="M192 352c53.03 0 96-42.97 96-96v-160c0-53.03-42.97-96-96-96s-96 42.97-96 96v160C96 309 138.1 352 192 352zM344 192C330.7 192 320 202.7 320 215.1V256c0 73.33-61.97 132.4-136.3 127.7c-66.08-4.169-119.7-66.59-119.7-132.8L64 215.1C64 202.7 53.25 192 40 192S16 202.7 16 215.1v32.15c0 89.66 63.97 169.6 152 181.7V464H128c-18.19 0-32.84 15.18-31.96 33.57C96.43 505.8 103.8 512 112 512h160c8.222 0 15.57-6.216 15.96-14.43C288.8 479.2 274.2 464 256 464h-40v-33.77C301.7 418.5 368 344.9 368 256V215.1C368 202.7 357.3 192 344 192z";t.definition={prefix:e,iconName:n,icon:[a,s,o,r,u]},t.faMicrophone=t.definition,t.prefix=e,t.iconName=n,t.width=a,t.height=s,t.ligatures=o,t.unicode=r,t.svgPathData=u,t.aliases=o})(R);const A=nodecg.Replicant("casters",c),W=[A],V=g("casters",{state:()=>({casters:{}})});export{U as B,I as S,V as a,W as c,R as f,M as l,T as u};