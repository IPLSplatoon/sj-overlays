import{g as m,D as v}from"./DrawSVGPlugin-B4QUZqwI.js";import{d as y,r as g,c as w,o as f,a as d,b as u,e as s,p as S,B as P,C as T,_ as B,j as x,k as I}from"./_plugin-vue_export-helper-Dg3X6I8a.js";import{i as b}from"./installCommonHelpers-Du_RM34V.js";import{j as k}from"./obs-C6HihO26.js";import{p as G}from"./path-BIbZRaIn.js";import"./string-BeBbVoVE.js";import"./breakScreenStore-gMjrs9Ei.js";const _=t=>(P("data-v-9c3710a5"),t=t(),T(),t),M=["width","viewBox"],$=["d"],C=["d"],R=_(()=>s("div",{class:"background"},null,-1)),V=_(()=>s("div",{class:"content"},[s("div",{class:"text"},"Replay")],-1)),o=325,r=125,h=10,a=10,q=y({__name:"ReplayBugGraphic",setup(t){const i=g(null),l=w(()=>{const e=G();return e.moveTo(0,0),e.lineTo(o-a,0),e.arc(o-a,a,a,Math.PI*1.5,0),e.lineTo(o,r-a-25),e.arc(o-a,r-25,a,0,Math.PI*.5),e.lineTo(35,r+a-25),e.arc(35,r-5,a,Math.PI*1.5,Math.PI,!0),e.lineTo(25,r+10),e.toString()});return f(()=>{var n,c,p;const e=m.timeline();e.fromTo((n=i.value)==null?void 0:n.querySelectorAll(".line-color, .line-white"),{drawSVG:"0%"},{drawSVG:"100%",duration:1,ease:"power1.inOut"},"reveal").fromTo((c=i.value)==null?void 0:c.querySelector(".background"),{opacity:0},{opacity:1,duration:.55,ease:"none"},"reveal+=0.5").fromTo((p=i.value)==null?void 0:p.querySelector(".text"),{y:65,opacity:0},{y:0,opacity:1,duration:.65,ease:"power2.out"},"reveal+=0.75"),k(e)}),(e,n)=>(d(),u("div",{ref_key:"wrapper",ref:i,class:"replay-bug-wrapper"},[s("div",{class:"replay-bug",style:S({width:`${o}px`,height:`${r}px`})},[(d(),u("svg",{class:"replay-bug-line",width:o+h*2,height:"1000",viewBox:`0 -${h} ${o} 1000`},[s("path",{fill:"transparent",class:"line-color",d:l.value},null,8,$),s("path",{fill:"transparent",class:"line-white",d:l.value},null,8,C)],8,M)),R,V],4)],512))}}),j=B(q,[["__scopeId","data-v-9c3710a5"]]);m.registerPlugin(v);(async()=>{const t=x(j);t.use(I()),b(t),t.mount("#app")})();