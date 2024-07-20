import{d as Xn,c as W,w as Kn,Q as Vn}from"./_plugin-vue_export-helper-Dg3X6I8a.js";/*!
 * Font Awesome Free 6.1.1 by @fontawesome - https://fontawesome.com
 * License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License)
 * Copyright 2022 Fonticons, Inc.
 */function Bt(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);n&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),e.push.apply(e,a)}return e}function l(t){for(var n=1;n<arguments.length;n++){var e=arguments[n]!=null?arguments[n]:{};n%2?Bt(Object(e),!0).forEach(function(a){Jn(t,a,e[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):Bt(Object(e)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(e,a))})}return t}function rt(t){"@babel/helpers - typeof";return rt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},rt(t)}function qn(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function Qn(t,n){for(var e=0;e<n.length;e++){var a=n[e];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}function Zn(t,n,e){return n&&Qn(t.prototype,n),Object.defineProperty(t,"prototype",{writable:!1}),t}function Jn(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function Tt(t,n){return ne(t)||ae(t,n)||bn(t,n)||ie()}function lt(t){return te(t)||ee(t)||bn(t)||re()}function te(t){if(Array.isArray(t))return ht(t)}function ne(t){if(Array.isArray(t))return t}function ee(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function ae(t,n){var e=t==null?null:typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(e!=null){var a=[],r=!0,o=!1,i,s;try{for(e=e.call(t);!(r=(i=e.next()).done)&&(a.push(i.value),!(n&&a.length===n));r=!0);}catch(f){o=!0,s=f}finally{try{!r&&e.return!=null&&e.return()}finally{if(o)throw s}}return a}}function bn(t,n){if(t){if(typeof t=="string")return ht(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);if(e==="Object"&&t.constructor&&(e=t.constructor.name),e==="Map"||e==="Set")return Array.from(t);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return ht(t,n)}}function ht(t,n){(n==null||n>t.length)&&(n=t.length);for(var e=0,a=new Array(n);e<n;e++)a[e]=t[e];return a}function re(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function ie(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Ht=function(){},_t={},gn={},yn=null,hn={mark:Ht,measure:Ht};try{typeof window<"u"&&(_t=window),typeof document<"u"&&(gn=document),typeof MutationObserver<"u"&&(yn=MutationObserver),typeof performance<"u"&&(hn=performance)}catch{}var oe=_t.navigator||{},Gt=oe.userAgent,Xt=Gt===void 0?"":Gt,j=_t,h=gn,Kt=yn,tt=hn;j.document;var z=!!h.documentElement&&!!h.head&&typeof h.addEventListener=="function"&&typeof h.createElement=="function",kn=~Xt.indexOf("MSIE")||~Xt.indexOf("Trident/"),_="___FONT_AWESOME___",kt=16,wn="fa",xn="svg-inline--fa",Y="data-fa-i2svg",wt="data-fa-pseudo-element",se="data-fa-pseudo-element-pending",Mt="data-prefix",Lt="data-icon",Vt="fontawesome-i2svg",fe="async",le=["HTML","HEAD","STYLE","SCRIPT"],An=function(){try{return!0}catch{return!1}}(),zt={fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands",fak:"kit","fa-kit":"kit",fa:"solid"},it={solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab",kit:"fak"},On={fab:"fa-brands",fad:"fa-duotone",fak:"fa-kit",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},ue={"fa-brands":"fab","fa-duotone":"fad","fa-kit":"fak","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},ce=/fa[srltdbk\-\ ]/,Sn="fa-layers-text",me=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Kit)?.*/i,ve={900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},En=[1,2,3,4,5,6,7,8,9,10],de=En.concat([11,12,13,14,15,16,17,18,19,20]),pe=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],F={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},be=[].concat(lt(Object.keys(it)),["2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",F.GROUP,F.SWAP_OPACITY,F.PRIMARY,F.SECONDARY]).concat(En.map(function(t){return"".concat(t,"x")})).concat(de.map(function(t){return"w-".concat(t)})),Pn=j.FontAwesomeConfig||{};function ge(t){var n=h.querySelector("script["+t+"]");if(n)return n.getAttribute(t)}function ye(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}if(h&&typeof h.querySelector=="function"){var he=[["data-family-prefix","familyPrefix"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]];he.forEach(function(t){var n=Tt(t,2),e=n[0],a=n[1],r=ye(ge(e));r!=null&&(Pn[a]=r)})}var ke={familyPrefix:wn,styleDefault:"solid",replacementClass:xn,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0},q=l(l({},ke),Pn);q.autoReplaceSvg||(q.observeMutations=!1);var d={};Object.keys(q).forEach(function(t){Object.defineProperty(d,t,{enumerable:!0,set:function(e){q[t]=e,nt.forEach(function(a){return a(d)})},get:function(){return q[t]}})});j.FontAwesomeConfig=d;var nt=[];function we(t){return nt.push(t),function(){nt.splice(nt.indexOf(t),1)}}var R=kt,I={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function xe(t){if(!(!t||!z)){var n=h.createElement("style");n.setAttribute("type","text/css"),n.innerHTML=t;for(var e=h.head.childNodes,a=null,r=e.length-1;r>-1;r--){var o=e[r],i=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(a=o)}return h.head.insertBefore(n,a),t}}var Ae="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function Z(){for(var t=12,n="";t-- >0;)n+=Ae[Math.random()*62|0];return n}function X(t){for(var n=[],e=(t||[]).length>>>0;e--;)n[e]=t[e];return n}function Rt(t){return t.classList?X(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(n){return n})}function Cn(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Oe(t){return Object.keys(t||{}).reduce(function(n,e){return n+"".concat(e,'="').concat(Cn(t[e]),'" ')},"").trim()}function ut(t){return Object.keys(t||{}).reduce(function(n,e){return n+"".concat(e,": ").concat(t[e].trim(),";")},"")}function jt(t){return t.size!==I.size||t.x!==I.x||t.y!==I.y||t.rotate!==I.rotate||t.flipX||t.flipY}function Se(t){var n=t.transform,e=t.containerWidth,a=t.iconWidth,r={transform:"translate(".concat(e/2," 256)")},o="translate(".concat(n.x*32,", ").concat(n.y*32,") "),i="scale(".concat(n.size/16*(n.flipX?-1:1),", ").concat(n.size/16*(n.flipY?-1:1),") "),s="rotate(".concat(n.rotate," 0 0)"),f={transform:"".concat(o," ").concat(i," ").concat(s)},v={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:f,path:v}}function Ee(t){var n=t.transform,e=t.width,a=e===void 0?kt:e,r=t.height,o=r===void 0?kt:r,i=t.startCentered,s=i===void 0?!1:i,f="";return s&&kn?f+="translate(".concat(n.x/R-a/2,"em, ").concat(n.y/R-o/2,"em) "):s?f+="translate(calc(-50% + ".concat(n.x/R,"em), calc(-50% + ").concat(n.y/R,"em)) "):f+="translate(".concat(n.x/R,"em, ").concat(n.y/R,"em) "),f+="scale(".concat(n.size/R*(n.flipX?-1:1),", ").concat(n.size/R*(n.flipY?-1:1),") "),f+="rotate(".concat(n.rotate,"deg) "),f}var Pe=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Solid";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Regular";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Light";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Thin";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  -webkit-transform-origin: center center;
          transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-counter-scale, 0.25));
          transform: scale(var(--fa-counter-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom right;
          transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: bottom left;
          transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top right;
          transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  -webkit-transform: scale(var(--fa-layers-scale, 0.25));
          transform: scale(var(--fa-layers-scale, 0.25));
  -webkit-transform-origin: top left;
          transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(var(--fa-li-width, 2em) * -1);
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  -webkit-animation-name: fa-beat;
          animation-name: fa-beat;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  -webkit-animation-name: fa-bounce;
          animation-name: fa-bounce;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  -webkit-animation-name: fa-fade;
          animation-name: fa-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  -webkit-animation-name: fa-beat-fade;
          animation-name: fa-beat-fade;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
          animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  -webkit-animation-name: fa-flip;
          animation-name: fa-flip;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, ease-in-out);
          animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  -webkit-animation-name: fa-shake;
          animation-name: fa-shake;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-delay: var(--fa-animation-delay, 0);
          animation-delay: var(--fa-animation-delay, 0);
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 2s);
          animation-duration: var(--fa-animation-duration, 2s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, linear);
          animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  -webkit-animation-name: fa-spin;
          animation-name: fa-spin;
  -webkit-animation-direction: var(--fa-animation-direction, normal);
          animation-direction: var(--fa-animation-direction, normal);
  -webkit-animation-duration: var(--fa-animation-duration, 1s);
          animation-duration: var(--fa-animation-duration, 1s);
  -webkit-animation-iteration-count: var(--fa-animation-iteration-count, infinite);
          animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  -webkit-animation-timing-function: var(--fa-animation-timing, steps(8));
          animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    -webkit-animation-delay: -1ms;
            animation-delay: -1ms;
    -webkit-animation-duration: 1ms;
            animation-duration: 1ms;
    -webkit-animation-iteration-count: 1;
            animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@-webkit-keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-beat {
  0%, 90% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  45% {
    -webkit-transform: scale(var(--fa-beat-scale, 1.25));
            transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@-webkit-keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-bounce {
  0% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  10% {
    -webkit-transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
            transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    -webkit-transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
            transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    -webkit-transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
            transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    -webkit-transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
            transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
  100% {
    -webkit-transform: scale(1, 1) translateY(0);
            transform: scale(1, 1) translateY(0);
  }
}
@-webkit-keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@-webkit-keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    -webkit-transform: scale(1);
            transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(var(--fa-beat-fade-scale, 1.125));
            transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@-webkit-keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-flip {
  50% {
    -webkit-transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
            transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@-webkit-keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@keyframes fa-shake {
  0% {
    -webkit-transform: rotate(-15deg);
            transform: rotate(-15deg);
  }
  4% {
    -webkit-transform: rotate(15deg);
            transform: rotate(15deg);
  }
  8%, 24% {
    -webkit-transform: rotate(-18deg);
            transform: rotate(-18deg);
  }
  12%, 28% {
    -webkit-transform: rotate(18deg);
            transform: rotate(18deg);
  }
  16% {
    -webkit-transform: rotate(-22deg);
            transform: rotate(-22deg);
  }
  20% {
    -webkit-transform: rotate(22deg);
            transform: rotate(22deg);
  }
  32% {
    -webkit-transform: rotate(-12deg);
            transform: rotate(-12deg);
  }
  36% {
    -webkit-transform: rotate(12deg);
            transform: rotate(12deg);
  }
  40%, 100% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
}
@-webkit-keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
@keyframes fa-spin {
  0% {
    -webkit-transform: rotate(0deg);
            transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  -webkit-transform: rotate(90deg);
          transform: rotate(90deg);
}

.fa-rotate-180 {
  -webkit-transform: rotate(180deg);
          transform: rotate(180deg);
}

.fa-rotate-270 {
  -webkit-transform: rotate(270deg);
          transform: rotate(270deg);
}

.fa-flip-horizontal {
  -webkit-transform: scale(-1, 1);
          transform: scale(-1, 1);
}

.fa-flip-vertical {
  -webkit-transform: scale(1, -1);
          transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  -webkit-transform: scale(-1, -1);
          transform: scale(-1, -1);
}

.fa-rotate-by {
  -webkit-transform: rotate(var(--fa-rotate-angle, none));
          transform: rotate(var(--fa-rotate-angle, none));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function In(){var t=wn,n=xn,e=d.familyPrefix,a=d.replacementClass,r=Pe;if(e!==t||a!==n){var o=new RegExp("\\.".concat(t,"\\-"),"g"),i=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(n),"g");r=r.replace(o,".".concat(e,"-")).replace(i,"--".concat(e,"-")).replace(s,".".concat(a))}return r}var qt=!1;function dt(){d.autoAddCss&&!qt&&(xe(In()),qt=!0)}var Ce={mixout:function(){return{dom:{css:In,insertCss:dt}}},hooks:function(){return{beforeDOMElementCreation:function(){dt()},beforeI2svg:function(){dt()}}}},M=j||{};M[_]||(M[_]={});M[_].styles||(M[_].styles={});M[_].hooks||(M[_].hooks={});M[_].shims||(M[_].shims=[]);var C=M[_],Nn=[],Ie=function t(){h.removeEventListener("DOMContentLoaded",t),ot=1,Nn.map(function(n){return n()})},ot=!1;z&&(ot=(h.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(h.readyState),ot||h.addEventListener("DOMContentLoaded",Ie));function Ne(t){z&&(ot?setTimeout(t,0):Nn.push(t))}function J(t){var n=t.tag,e=t.attributes,a=e===void 0?{}:e,r=t.children,o=r===void 0?[]:r;return typeof t=="string"?Cn(t):"<".concat(n," ").concat(Oe(a),">").concat(o.map(J).join(""),"</").concat(n,">")}function Qt(t,n,e){if(t&&t[n]&&t[n][e])return{prefix:n,iconName:e,icon:t[n][e]}}var pt=function(n,e,a,r){var o=Object.keys(n),i=o.length,s=e,f,v,u;for(a===void 0?(f=1,u=n[o[0]]):(f=0,u=a);f<i;f++)v=o[f],u=s(u,n[v],v,n);return u};function Te(t){for(var n=[],e=0,a=t.length;e<a;){var r=t.charCodeAt(e++);if(r>=55296&&r<=56319&&e<a){var o=t.charCodeAt(e++);(o&64512)==56320?n.push(((r&1023)<<10)+(o&1023)+65536):(n.push(r),e--)}else n.push(r)}return n}function xt(t){var n=Te(t);return n.length===1?n[0].toString(16):null}function _e(t,n){var e=t.length,a=t.charCodeAt(n),r;return a>=55296&&a<=56319&&e>n+1&&(r=t.charCodeAt(n+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function Zt(t){return Object.keys(t).reduce(function(n,e){var a=t[e],r=!!a.icon;return r?n[a.iconName]=a.icon:n[e]=a,n},{})}function At(t,n){var e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{},a=e.skipHooks,r=a===void 0?!1:a,o=Zt(n);typeof C.hooks.addPack=="function"&&!r?C.hooks.addPack(t,Zt(n)):C.styles[t]=l(l({},C.styles[t]||{}),o),t==="fas"&&At("fa",n)}var Q=C.styles,Me=C.shims,Le=Object.values(On),Dt=null,Tn={},_n={},Mn={},Ln={},zn={},ze=Object.keys(zt);function Re(t){return~be.indexOf(t)}function je(t,n){var e=n.split("-"),a=e[0],r=e.slice(1).join("-");return a===t&&r!==""&&!Re(r)?r:null}var Rn=function(){var n=function(o){return pt(Q,function(i,s,f){return i[f]=pt(s,o,{}),i},{})};Tn=n(function(r,o,i){if(o[3]&&(r[o[3]]=i),o[2]){var s=o[2].filter(function(f){return typeof f=="number"});s.forEach(function(f){r[f.toString(16)]=i})}return r}),_n=n(function(r,o,i){if(r[i]=i,o[2]){var s=o[2].filter(function(f){return typeof f=="string"});s.forEach(function(f){r[f]=i})}return r}),zn=n(function(r,o,i){var s=o[2];return r[i]=i,s.forEach(function(f){r[f]=i}),r});var e="far"in Q||d.autoFetchSvg,a=pt(Me,function(r,o){var i=o[0],s=o[1],f=o[2];return s==="far"&&!e&&(s="fas"),typeof i=="string"&&(r.names[i]={prefix:s,iconName:f}),typeof i=="number"&&(r.unicodes[i.toString(16)]={prefix:s,iconName:f}),r},{names:{},unicodes:{}});Mn=a.names,Ln=a.unicodes,Dt=ct(d.styleDefault)};we(function(t){Dt=ct(t.styleDefault)});Rn();function Ft(t,n){return(Tn[t]||{})[n]}function De(t,n){return(_n[t]||{})[n]}function B(t,n){return(zn[t]||{})[n]}function jn(t){return Mn[t]||{prefix:null,iconName:null}}function Fe(t){var n=Ln[t],e=Ft("fas",t);return n||(e?{prefix:"fas",iconName:e}:null)||{prefix:null,iconName:null}}function D(){return Dt}var Yt=function(){return{prefix:null,iconName:null,rest:[]}};function ct(t){var n=zt[t],e=it[t]||it[n],a=t in C.styles?t:null;return e||a||null}function mt(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e=n.skipLookups,a=e===void 0?!1:e,r=null,o=t.reduce(function(i,s){var f=je(d.familyPrefix,s);if(Q[s]?(s=Le.includes(s)?ue[s]:s,r=s,i.prefix=s):ze.indexOf(s)>-1?(r=s,i.prefix=ct(s)):f?i.iconName=f:s!==d.replacementClass&&i.rest.push(s),!a&&i.prefix&&i.iconName){var v=r==="fa"?jn(i.iconName):{},u=B(i.prefix,i.iconName);v.prefix&&(r=null),i.iconName=v.iconName||u||i.iconName,i.prefix=v.prefix||i.prefix,i.prefix==="far"&&!Q.far&&Q.fas&&!d.autoFetchSvg&&(i.prefix="fas")}return i},Yt());return(o.prefix==="fa"||r==="fa")&&(o.prefix=D()||"fas"),o}var Ye=function(){function t(){qn(this,t),this.definitions={}}return Zn(t,[{key:"add",value:function(){for(var e=this,a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];var i=r.reduce(this._pullDefinitions,{});Object.keys(i).forEach(function(s){e.definitions[s]=l(l({},e.definitions[s]||{}),i[s]),At(s,i[s]);var f=On[s];f&&At(f,i[s]),Rn()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(e,a){var r=a.prefix&&a.iconName&&a.icon?{0:a}:a;return Object.keys(r).map(function(o){var i=r[o],s=i.prefix,f=i.iconName,v=i.icon,u=v[2];e[s]||(e[s]={}),u.length>0&&u.forEach(function(m){typeof m=="string"&&(e[s][m]=v)}),e[s][f]=v}),e}}]),t}(),Jt=[],H={},G={},$e=Object.keys(G);function Ue(t,n){var e=n.mixoutsTo;return Jt=t,H={},Object.keys(G).forEach(function(a){$e.indexOf(a)===-1&&delete G[a]}),Jt.forEach(function(a){var r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(function(i){typeof r[i]=="function"&&(e[i]=r[i]),rt(r[i])==="object"&&Object.keys(r[i]).forEach(function(s){e[i]||(e[i]={}),e[i][s]=r[i][s]})}),a.hooks){var o=a.hooks();Object.keys(o).forEach(function(i){H[i]||(H[i]=[]),H[i].push(o[i])})}a.provides&&a.provides(G)}),e}function Ot(t,n){for(var e=arguments.length,a=new Array(e>2?e-2:0),r=2;r<e;r++)a[r-2]=arguments[r];var o=H[t]||[];return o.forEach(function(i){n=i.apply(null,[n].concat(a))}),n}function $(t){for(var n=arguments.length,e=new Array(n>1?n-1:0),a=1;a<n;a++)e[a-1]=arguments[a];var r=H[t]||[];r.forEach(function(o){o.apply(null,e)})}function L(){var t=arguments[0],n=Array.prototype.slice.call(arguments,1);return G[t]?G[t].apply(null,n):void 0}function St(t){t.prefix==="fa"&&(t.prefix="fas");var n=t.iconName,e=t.prefix||D();if(n)return n=B(e,n)||n,Qt(Dn.definitions,e,n)||Qt(C.styles,e,n)}var Dn=new Ye,We=function(){d.autoReplaceSvg=!1,d.observeMutations=!1,$("noAuto")},Be={i2svg:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return z?($("beforeI2svg",n),L("pseudoElements2svg",n),L("i2svg",n)):Promise.reject("Operation requires a DOM of some kind.")},watch:function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=n.autoReplaceSvgRoot;d.autoReplaceSvg===!1&&(d.autoReplaceSvg=!0),d.observeMutations=!0,Ne(function(){Ge({autoReplaceSvgRoot:e}),$("watch",n)})}},He={icon:function(n){if(n===null)return null;if(rt(n)==="object"&&n.prefix&&n.iconName)return{prefix:n.prefix,iconName:B(n.prefix,n.iconName)||n.iconName};if(Array.isArray(n)&&n.length===2){var e=n[1].indexOf("fa-")===0?n[1].slice(3):n[1],a=ct(n[0]);return{prefix:a,iconName:B(a,e)||e}}if(typeof n=="string"&&(n.indexOf("".concat(d.familyPrefix,"-"))>-1||n.match(ce))){var r=mt(n.split(" "),{skipLookups:!0});return{prefix:r.prefix||D(),iconName:B(r.prefix,r.iconName)||r.iconName}}if(typeof n=="string"){var o=D();return{prefix:o,iconName:B(o,n)||n}}}},E={noAuto:We,config:d,dom:Be,parse:He,library:Dn,findIconDefinition:St,toHtml:J},Ge=function(){var n=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=n.autoReplaceSvgRoot,a=e===void 0?h:e;(Object.keys(C.styles).length>0||d.autoFetchSvg)&&z&&d.autoReplaceSvg&&E.dom.i2svg({node:a})};function vt(t,n){return Object.defineProperty(t,"abstract",{get:n}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(function(a){return J(a)})}}),Object.defineProperty(t,"node",{get:function(){if(z){var a=h.createElement("div");return a.innerHTML=t.html,a.children}}}),t}function Xe(t){var n=t.children,e=t.main,a=t.mask,r=t.attributes,o=t.styles,i=t.transform;if(jt(i)&&e.found&&!a.found){var s=e.width,f=e.height,v={x:s/f/2,y:.5};r.style=ut(l(l({},o),{},{"transform-origin":"".concat(v.x+i.x/16,"em ").concat(v.y+i.y/16,"em")}))}return[{tag:"svg",attributes:r,children:n}]}function Ke(t){var n=t.prefix,e=t.iconName,a=t.children,r=t.attributes,o=t.symbol,i=o===!0?"".concat(n,"-").concat(d.familyPrefix,"-").concat(e):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:l(l({},r),{},{id:i}),children:a}]}]}function $t(t){var n=t.icons,e=n.main,a=n.mask,r=t.prefix,o=t.iconName,i=t.transform,s=t.symbol,f=t.title,v=t.maskId,u=t.titleId,m=t.extra,b=t.watchable,y=b===void 0?!1:b,x=a.found?a:e,A=x.width,O=x.height,c=r==="fak",p=[d.replacementClass,o?"".concat(d.familyPrefix,"-").concat(o):""].filter(function(U){return m.classes.indexOf(U)===-1}).filter(function(U){return U!==""||!!U}).concat(m.classes).join(" "),g={children:[],attributes:l(l({},m.attributes),{},{"data-prefix":r,"data-icon":o,class:p,role:m.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(A," ").concat(O)})},w=c&&!~m.classes.indexOf("fa-fw")?{width:"".concat(A/O*16*.0625,"em")}:{};y&&(g.attributes[Y]=""),f&&(g.children.push({tag:"title",attributes:{id:g.attributes["aria-labelledby"]||"title-".concat(u||Z())},children:[f]}),delete g.attributes.title);var k=l(l({},g),{},{prefix:r,iconName:o,main:e,mask:a,maskId:v,transform:i,symbol:s,styles:l(l({},w),m.styles)}),P=a.found&&e.found?L("generateAbstractMask",k)||{children:[],attributes:{}}:L("generateAbstractIcon",k)||{children:[],attributes:{}},N=P.children,K=P.attributes;return k.children=N,k.attributes=K,s?Ke(k):Xe(k)}function tn(t){var n=t.content,e=t.width,a=t.height,r=t.transform,o=t.title,i=t.extra,s=t.watchable,f=s===void 0?!1:s,v=l(l(l({},i.attributes),o?{title:o}:{}),{},{class:i.classes.join(" ")});f&&(v[Y]="");var u=l({},i.styles);jt(r)&&(u.transform=Ee({transform:r,startCentered:!0,width:e,height:a}),u["-webkit-transform"]=u.transform);var m=ut(u);m.length>0&&(v.style=m);var b=[];return b.push({tag:"span",attributes:v,children:[n]}),o&&b.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),b}function Ve(t){var n=t.content,e=t.title,a=t.extra,r=l(l(l({},a.attributes),e?{title:e}:{}),{},{class:a.classes.join(" ")}),o=ut(a.styles);o.length>0&&(r.style=o);var i=[];return i.push({tag:"span",attributes:r,children:[n]}),e&&i.push({tag:"span",attributes:{class:"sr-only"},children:[e]}),i}var bt=C.styles;function Et(t){var n=t[0],e=t[1],a=t.slice(4),r=Tt(a,1),o=r[0],i=null;return Array.isArray(o)?i={tag:"g",attributes:{class:"".concat(d.familyPrefix,"-").concat(F.GROUP)},children:[{tag:"path",attributes:{class:"".concat(d.familyPrefix,"-").concat(F.SECONDARY),fill:"currentColor",d:o[0]}},{tag:"path",attributes:{class:"".concat(d.familyPrefix,"-").concat(F.PRIMARY),fill:"currentColor",d:o[1]}}]}:i={tag:"path",attributes:{fill:"currentColor",d:o}},{found:!0,width:n,height:e,icon:i}}var qe={found:!1,width:512,height:512};function Qe(t,n){!An&&!d.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(n,'" is missing.'))}function Pt(t,n){var e=n;return n==="fa"&&d.styleDefault!==null&&(n=D()),new Promise(function(a,r){if(L("missingIconAbstract"),e==="fa"){var o=jn(t)||{};t=o.iconName||t,n=o.prefix||n}if(t&&n&&bt[n]&&bt[n][t]){var i=bt[n][t];return a(Et(i))}Qe(t,n),a(l(l({},qe),{},{icon:d.showMissingIcons&&t?L("missingIconAbstract")||{}:{}}))})}var nn=function(){},Ct=d.measurePerformance&&tt&&tt.mark&&tt.measure?tt:{mark:nn,measure:nn},V='FA "6.1.1"',Ze=function(n){return Ct.mark("".concat(V," ").concat(n," begins")),function(){return Fn(n)}},Fn=function(n){Ct.mark("".concat(V," ").concat(n," ends")),Ct.measure("".concat(V," ").concat(n),"".concat(V," ").concat(n," begins"),"".concat(V," ").concat(n," ends"))},Ut={begin:Ze,end:Fn},et=function(){};function en(t){var n=t.getAttribute?t.getAttribute(Y):null;return typeof n=="string"}function Je(t){var n=t.getAttribute?t.getAttribute(Mt):null,e=t.getAttribute?t.getAttribute(Lt):null;return n&&e}function ta(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(d.replacementClass)}function na(){if(d.autoReplaceSvg===!0)return at.replace;var t=at[d.autoReplaceSvg];return t||at.replace}function ea(t){return h.createElementNS("http://www.w3.org/2000/svg",t)}function aa(t){return h.createElement(t)}function Yn(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e=n.ceFn,a=e===void 0?t.tag==="svg"?ea:aa:e;if(typeof t=="string")return h.createTextNode(t);var r=a(t.tag);Object.keys(t.attributes||[]).forEach(function(i){r.setAttribute(i,t.attributes[i])});var o=t.children||[];return o.forEach(function(i){r.appendChild(Yn(i,{ceFn:a}))}),r}function ra(t){var n=" ".concat(t.outerHTML," ");return n="".concat(n,"Font Awesome fontawesome.com "),n}var at={replace:function(n){var e=n[0];if(e.parentNode)if(n[1].forEach(function(r){e.parentNode.insertBefore(Yn(r),e)}),e.getAttribute(Y)===null&&d.keepOriginalSource){var a=h.createComment(ra(e));e.parentNode.replaceChild(a,e)}else e.remove()},nest:function(n){var e=n[0],a=n[1];if(~Rt(e).indexOf(d.replacementClass))return at.replace(n);var r=new RegExp("".concat(d.familyPrefix,"-.*"));if(delete a[0].attributes.id,a[0].attributes.class){var o=a[0].attributes.class.split(" ").reduce(function(s,f){return f===d.replacementClass||f.match(r)?s.toSvg.push(f):s.toNode.push(f),s},{toNode:[],toSvg:[]});a[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",o.toNode.join(" "))}var i=a.map(function(s){return J(s)}).join(`
`);e.setAttribute(Y,""),e.innerHTML=i}};function an(t){t()}function $n(t,n){var e=typeof n=="function"?n:et;if(t.length===0)e();else{var a=an;d.mutateApproach===fe&&(a=j.requestAnimationFrame||an),a(function(){var r=na(),o=Ut.begin("mutate");t.map(r),o(),e()})}}var Wt=!1;function Un(){Wt=!0}function It(){Wt=!1}var st=null;function rn(t){if(Kt&&d.observeMutations){var n=t.treeCallback,e=n===void 0?et:n,a=t.nodeCallback,r=a===void 0?et:a,o=t.pseudoElementsCallback,i=o===void 0?et:o,s=t.observeMutationsRoot,f=s===void 0?h:s;st=new Kt(function(v){if(!Wt){var u=D();X(v).forEach(function(m){if(m.type==="childList"&&m.addedNodes.length>0&&!en(m.addedNodes[0])&&(d.searchPseudoElements&&i(m.target),e(m.target)),m.type==="attributes"&&m.target.parentNode&&d.searchPseudoElements&&i(m.target.parentNode),m.type==="attributes"&&en(m.target)&&~pe.indexOf(m.attributeName))if(m.attributeName==="class"&&Je(m.target)){var b=mt(Rt(m.target)),y=b.prefix,x=b.iconName;m.target.setAttribute(Mt,y||u),x&&m.target.setAttribute(Lt,x)}else ta(m.target)&&r(m.target)})}}),z&&st.observe(f,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function ia(){st&&st.disconnect()}function oa(t){var n=t.getAttribute("style"),e=[];return n&&(e=n.split(";").reduce(function(a,r){var o=r.split(":"),i=o[0],s=o.slice(1);return i&&s.length>0&&(a[i]=s.join(":").trim()),a},{})),e}function sa(t){var n=t.getAttribute("data-prefix"),e=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"",r=mt(Rt(t));return r.prefix||(r.prefix=D()),n&&e&&(r.prefix=n,r.iconName=e),r.iconName&&r.prefix||r.prefix&&a.length>0&&(r.iconName=De(r.prefix,t.innerText)||Ft(r.prefix,xt(t.innerText))),r}function fa(t){var n=X(t.attributes).reduce(function(r,o){return r.name!=="class"&&r.name!=="style"&&(r[o.name]=o.value),r},{}),e=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return d.autoA11y&&(e?n["aria-labelledby"]="".concat(d.replacementClass,"-title-").concat(a||Z()):(n["aria-hidden"]="true",n.focusable="false")),n}function la(){return{iconName:null,title:null,titleId:null,prefix:null,transform:I,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function on(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0},e=sa(t),a=e.iconName,r=e.prefix,o=e.rest,i=fa(t),s=Ot("parseNodeAttributes",{},t),f=n.styleParser?oa(t):[];return l({iconName:a,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:r,transform:I,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:o,styles:f,attributes:i}},s)}var ua=C.styles;function Wn(t){var n=d.autoReplaceSvg==="nest"?on(t,{styleParser:!1}):on(t);return~n.extra.classes.indexOf(Sn)?L("generateLayersText",t,n):L("generateSvgReplacementMutation",t,n)}function sn(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!z)return Promise.resolve();var e=h.documentElement.classList,a=function(m){return e.add("".concat(Vt,"-").concat(m))},r=function(m){return e.remove("".concat(Vt,"-").concat(m))},o=d.autoFetchSvg?Object.keys(zt):Object.keys(ua),i=[".".concat(Sn,":not([").concat(Y,"])")].concat(o.map(function(u){return".".concat(u,":not([").concat(Y,"])")})).join(", ");if(i.length===0)return Promise.resolve();var s=[];try{s=X(t.querySelectorAll(i))}catch{}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();var f=Ut.begin("onTree"),v=s.reduce(function(u,m){try{var b=Wn(m);b&&u.push(b)}catch(y){An||y.name==="MissingIcon"&&console.error(y)}return u},[]);return new Promise(function(u,m){Promise.all(v).then(function(b){$n(b,function(){a("active"),a("complete"),r("pending"),typeof n=="function"&&n(),f(),u()})}).catch(function(b){f(),m(b)})})}function ca(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;Wn(t).then(function(e){e&&$n([e],n)})}function ma(t){return function(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=(n||{}).icon?n:St(n||{}),r=e.mask;return r&&(r=(r||{}).icon?r:St(r||{})),t(a,l(l({},e),{},{mask:r}))}}var va=function(n){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=e.transform,r=a===void 0?I:a,o=e.symbol,i=o===void 0?!1:o,s=e.mask,f=s===void 0?null:s,v=e.maskId,u=v===void 0?null:v,m=e.title,b=m===void 0?null:m,y=e.titleId,x=y===void 0?null:y,A=e.classes,O=A===void 0?[]:A,c=e.attributes,p=c===void 0?{}:c,g=e.styles,w=g===void 0?{}:g;if(n){var k=n.prefix,P=n.iconName,N=n.icon;return vt(l({type:"icon"},n),function(){return $("beforeDOMElementCreation",{iconDefinition:n,params:e}),d.autoA11y&&(b?p["aria-labelledby"]="".concat(d.replacementClass,"-title-").concat(x||Z()):(p["aria-hidden"]="true",p.focusable="false")),$t({icons:{main:Et(N),mask:f?Et(f.icon):{found:!1,width:null,height:null,icon:{}}},prefix:k,iconName:P,transform:l(l({},I),r),symbol:i,title:b,maskId:u,titleId:x,extra:{attributes:p,styles:w,classes:O}})})}},da={mixout:function(){return{icon:ma(va)}},hooks:function(){return{mutationObserverCallbacks:function(e){return e.treeCallback=sn,e.nodeCallback=ca,e}}},provides:function(n){n.i2svg=function(e){var a=e.node,r=a===void 0?h:a,o=e.callback,i=o===void 0?function(){}:o;return sn(r,i)},n.generateSvgReplacementMutation=function(e,a){var r=a.iconName,o=a.title,i=a.titleId,s=a.prefix,f=a.transform,v=a.symbol,u=a.mask,m=a.maskId,b=a.extra;return new Promise(function(y,x){Promise.all([Pt(r,s),u.iconName?Pt(u.iconName,u.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(function(A){var O=Tt(A,2),c=O[0],p=O[1];y([e,$t({icons:{main:c,mask:p},prefix:s,iconName:r,transform:f,symbol:v,maskId:m,title:o,titleId:i,extra:b,watchable:!0})])}).catch(x)})},n.generateAbstractIcon=function(e){var a=e.children,r=e.attributes,o=e.main,i=e.transform,s=e.styles,f=ut(s);f.length>0&&(r.style=f);var v;return jt(i)&&(v=L("generateAbstractTransformGrouping",{main:o,transform:i,containerWidth:o.width,iconWidth:o.width})),a.push(v||o.icon),{children:a,attributes:r}}}},pa={mixout:function(){return{layer:function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.classes,o=r===void 0?[]:r;return vt({type:"layer"},function(){$("beforeDOMElementCreation",{assembler:e,params:a});var i=[];return e(function(s){Array.isArray(s)?s.map(function(f){i=i.concat(f.abstract)}):i=i.concat(s.abstract)}),[{tag:"span",attributes:{class:["".concat(d.familyPrefix,"-layers")].concat(lt(o)).join(" ")},children:i}]})}}}},ba={mixout:function(){return{counter:function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.title,o=r===void 0?null:r,i=a.classes,s=i===void 0?[]:i,f=a.attributes,v=f===void 0?{}:f,u=a.styles,m=u===void 0?{}:u;return vt({type:"counter",content:e},function(){return $("beforeDOMElementCreation",{content:e,params:a}),Ve({content:e.toString(),title:o,extra:{attributes:v,styles:m,classes:["".concat(d.familyPrefix,"-layers-counter")].concat(lt(s))}})})}}}},ga={mixout:function(){return{text:function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=a.transform,o=r===void 0?I:r,i=a.title,s=i===void 0?null:i,f=a.classes,v=f===void 0?[]:f,u=a.attributes,m=u===void 0?{}:u,b=a.styles,y=b===void 0?{}:b;return vt({type:"text",content:e},function(){return $("beforeDOMElementCreation",{content:e,params:a}),tn({content:e,transform:l(l({},I),o),title:s,extra:{attributes:m,styles:y,classes:["".concat(d.familyPrefix,"-layers-text")].concat(lt(v))}})})}}},provides:function(n){n.generateLayersText=function(e,a){var r=a.title,o=a.transform,i=a.extra,s=null,f=null;if(kn){var v=parseInt(getComputedStyle(e).fontSize,10),u=e.getBoundingClientRect();s=u.width/v,f=u.height/v}return d.autoA11y&&!r&&(i.attributes["aria-hidden"]="true"),Promise.resolve([e,tn({content:e.innerHTML,width:s,height:f,transform:o,title:r,extra:i,watchable:!0})])}}},ya=new RegExp('"',"ug"),fn=[1105920,1112319];function ha(t){var n=t.replace(ya,""),e=_e(n,0),a=e>=fn[0]&&e<=fn[1],r=n.length===2?n[0]===n[1]:!1;return{value:xt(r?n[0]:n),isSecondary:a||r}}function ln(t,n){var e="".concat(se).concat(n.replace(":","-"));return new Promise(function(a,r){if(t.getAttribute(e)!==null)return a();var o=X(t.children),i=o.filter(function(P){return P.getAttribute(wt)===n})[0],s=j.getComputedStyle(t,n),f=s.getPropertyValue("font-family").match(me),v=s.getPropertyValue("font-weight"),u=s.getPropertyValue("content");if(i&&!f)return t.removeChild(i),a();if(f&&u!=="none"&&u!==""){var m=s.getPropertyValue("content"),b=~["Solid","Regular","Light","Thin","Duotone","Brands","Kit"].indexOf(f[2])?it[f[2].toLowerCase()]:ve[v],y=ha(m),x=y.value,A=y.isSecondary,O=f[0].startsWith("FontAwesome"),c=Ft(b,x),p=c;if(O){var g=Fe(x);g.iconName&&g.prefix&&(c=g.iconName,b=g.prefix)}if(c&&!A&&(!i||i.getAttribute(Mt)!==b||i.getAttribute(Lt)!==p)){t.setAttribute(e,p),i&&t.removeChild(i);var w=la(),k=w.extra;k.attributes[wt]=n,Pt(c,b).then(function(P){var N=$t(l(l({},w),{},{icons:{main:P,mask:Yt()},prefix:b,iconName:p,extra:k,watchable:!0})),K=h.createElement("svg");n==="::before"?t.insertBefore(K,t.firstChild):t.appendChild(K),K.outerHTML=N.map(function(U){return J(U)}).join(`
`),t.removeAttribute(e),a()}).catch(r)}else a()}else a()})}function ka(t){return Promise.all([ln(t,"::before"),ln(t,"::after")])}function wa(t){return t.parentNode!==document.head&&!~le.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(wt)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function un(t){if(z)return new Promise(function(n,e){var a=X(t.querySelectorAll("*")).filter(wa).map(ka),r=Ut.begin("searchPseudoElements");Un(),Promise.all(a).then(function(){r(),It(),n()}).catch(function(){r(),It(),e()})})}var xa={hooks:function(){return{mutationObserverCallbacks:function(e){return e.pseudoElementsCallback=un,e}}},provides:function(n){n.pseudoElements2svg=function(e){var a=e.node,r=a===void 0?h:a;d.searchPseudoElements&&un(r)}}},cn=!1,Aa={mixout:function(){return{dom:{unwatch:function(){Un(),cn=!0}}}},hooks:function(){return{bootstrap:function(){rn(Ot("mutationObserverCallbacks",{}))},noAuto:function(){ia()},watch:function(e){var a=e.observeMutationsRoot;cn?It():rn(Ot("mutationObserverCallbacks",{observeMutationsRoot:a}))}}}},mn=function(n){var e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return n.toLowerCase().split(" ").reduce(function(a,r){var o=r.toLowerCase().split("-"),i=o[0],s=o.slice(1).join("-");if(i&&s==="h")return a.flipX=!0,a;if(i&&s==="v")return a.flipY=!0,a;if(s=parseFloat(s),isNaN(s))return a;switch(i){case"grow":a.size=a.size+s;break;case"shrink":a.size=a.size-s;break;case"left":a.x=a.x-s;break;case"right":a.x=a.x+s;break;case"up":a.y=a.y-s;break;case"down":a.y=a.y+s;break;case"rotate":a.rotate=a.rotate+s;break}return a},e)},Oa={mixout:function(){return{parse:{transform:function(e){return mn(e)}}}},hooks:function(){return{parseNodeAttributes:function(e,a){var r=a.getAttribute("data-fa-transform");return r&&(e.transform=mn(r)),e}}},provides:function(n){n.generateAbstractTransformGrouping=function(e){var a=e.main,r=e.transform,o=e.containerWidth,i=e.iconWidth,s={transform:"translate(".concat(o/2," 256)")},f="translate(".concat(r.x*32,", ").concat(r.y*32,") "),v="scale(".concat(r.size/16*(r.flipX?-1:1),", ").concat(r.size/16*(r.flipY?-1:1),") "),u="rotate(".concat(r.rotate," 0 0)"),m={transform:"".concat(f," ").concat(v," ").concat(u)},b={transform:"translate(".concat(i/2*-1," -256)")},y={outer:s,inner:m,path:b};return{tag:"g",attributes:l({},y.outer),children:[{tag:"g",attributes:l({},y.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:l(l({},a.icon.attributes),y.path)}]}]}}}},gt={x:0,y:0,width:"100%",height:"100%"};function vn(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||n)&&(t.attributes.fill="black"),t}function Sa(t){return t.tag==="g"?t.children:[t]}var Ea={hooks:function(){return{parseNodeAttributes:function(e,a){var r=a.getAttribute("data-fa-mask"),o=r?mt(r.split(" ").map(function(i){return i.trim()})):Yt();return o.prefix||(o.prefix=D()),e.mask=o,e.maskId=a.getAttribute("data-fa-mask-id"),e}}},provides:function(n){n.generateAbstractMask=function(e){var a=e.children,r=e.attributes,o=e.main,i=e.mask,s=e.maskId,f=e.transform,v=o.width,u=o.icon,m=i.width,b=i.icon,y=Se({transform:f,containerWidth:m,iconWidth:v}),x={tag:"rect",attributes:l(l({},gt),{},{fill:"white"})},A=u.children?{children:u.children.map(vn)}:{},O={tag:"g",attributes:l({},y.inner),children:[vn(l({tag:u.tag,attributes:l(l({},u.attributes),y.path)},A))]},c={tag:"g",attributes:l({},y.outer),children:[O]},p="mask-".concat(s||Z()),g="clip-".concat(s||Z()),w={tag:"mask",attributes:l(l({},gt),{},{id:p,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[x,c]},k={tag:"defs",children:[{tag:"clipPath",attributes:{id:g},children:Sa(b)},w]};return a.push(k,{tag:"rect",attributes:l({fill:"currentColor","clip-path":"url(#".concat(g,")"),mask:"url(#".concat(p,")")},gt)}),{children:a,attributes:r}}}},Pa={provides:function(n){var e=!1;j.matchMedia&&(e=j.matchMedia("(prefers-reduced-motion: reduce)").matches),n.missingIconAbstract=function(){var a=[],r={fill:"currentColor"},o={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};a.push({tag:"path",attributes:l(l({},r),{},{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})});var i=l(l({},o),{},{attributeName:"opacity"}),s={tag:"circle",attributes:l(l({},r),{},{cx:"256",cy:"364",r:"28"}),children:[]};return e||s.children.push({tag:"animate",attributes:l(l({},o),{},{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:l(l({},i),{},{values:"1;0;1;1;0;1;"})}),a.push(s),a.push({tag:"path",attributes:l(l({},r),{},{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:e?[]:[{tag:"animate",attributes:l(l({},i),{},{values:"1;0;0;0;0;1;"})}]}),e||a.push({tag:"path",attributes:l(l({},r),{},{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:l(l({},i),{},{values:"0;0;1;1;0;0;"})}]}),{tag:"g",attributes:{class:"missing"},children:a}}}},Ca={hooks:function(){return{parseNodeAttributes:function(e,a){var r=a.getAttribute("data-fa-symbol"),o=r===null?!1:r===""?!0:r;return e.symbol=o,e}}}},Ia=[Ce,da,pa,ba,ga,xa,Aa,Oa,Ea,Pa,Ca];Ue(Ia,{mixoutsTo:E});E.noAuto;E.config;var Wa=E.library;E.dom;var Nt=E.parse;E.findIconDefinition;E.toHtml;var Na=E.icon;E.layer;E.text;E.counter;function dn(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);n&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),e.push.apply(e,a)}return e}function T(t){for(var n=1;n<arguments.length;n++){var e=arguments[n]!=null?arguments[n]:{};n%2?dn(Object(e),!0).forEach(function(a){S(t,a,e[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):dn(Object(e)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(e,a))})}return t}function Ta(t,n){if(typeof t!="object"||!t)return t;var e=t[Symbol.toPrimitive];if(e!==void 0){var a=e.call(t,n||"default");if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(t)}function _a(t){var n=Ta(t,"string");return typeof n=="symbol"?n:n+""}function ft(t){"@babel/helpers - typeof";return ft=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},ft(t)}function S(t,n,e){return n=_a(n),n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function Ma(t,n){if(t==null)return{};var e={};for(var a in t)if(Object.prototype.hasOwnProperty.call(t,a)){if(n.indexOf(a)>=0)continue;e[a]=t[a]}return e}function La(t,n){if(t==null)return{};var e=Ma(t,n),a,r;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)a=o[r],!(n.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(t,a)&&(e[a]=t[a])}return e}var za=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},Bn={exports:{}};(function(t){(function(n){var e=function(c,p,g){if(!v(p)||m(p)||b(p)||y(p)||f(p))return p;var w,k=0,P=0;if(u(p))for(w=[],P=p.length;k<P;k++)w.push(e(c,p[k],g));else{w={};for(var N in p)Object.prototype.hasOwnProperty.call(p,N)&&(w[c(N,g)]=e(c,p[N],g))}return w},a=function(c,p){p=p||{};var g=p.separator||"_",w=p.split||/(?=[A-Z])/;return c.split(w).join(g)},r=function(c){return x(c)?c:(c=c.replace(/[\-_\s]+(.)?/g,function(p,g){return g?g.toUpperCase():""}),c.substr(0,1).toLowerCase()+c.substr(1))},o=function(c){var p=r(c);return p.substr(0,1).toUpperCase()+p.substr(1)},i=function(c,p){return a(c,p).toLowerCase()},s=Object.prototype.toString,f=function(c){return typeof c=="function"},v=function(c){return c===Object(c)},u=function(c){return s.call(c)=="[object Array]"},m=function(c){return s.call(c)=="[object Date]"},b=function(c){return s.call(c)=="[object RegExp]"},y=function(c){return s.call(c)=="[object Boolean]"},x=function(c){return c=c-0,c===c},A=function(c,p){var g=p&&"process"in p?p.process:p;return typeof g!="function"?c:function(w,k){return g(w,c,k)}},O={camelize:r,decamelize:i,pascalize:o,depascalize:i,camelizeKeys:function(c,p){return e(A(r,p),c)},decamelizeKeys:function(c,p){return e(A(i,p),c,p)},pascalizeKeys:function(c,p){return e(A(o,p),c)},depascalizeKeys:function(){return this.decamelizeKeys.apply(this,arguments)}};t.exports?t.exports=O:n.humps=O})(za)})(Bn);var Ra=Bn.exports,ja=["class","style"];function Da(t){return t.split(";").map(function(n){return n.trim()}).filter(function(n){return n}).reduce(function(n,e){var a=e.indexOf(":"),r=Ra.camelize(e.slice(0,a)),o=e.slice(a+1).trim();return n[r]=o,n},{})}function Fa(t){return t.split(/\s+/).reduce(function(n,e){return n[e]=!0,n},{})}function Hn(t){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},e=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof t=="string")return t;var a=(t.children||[]).map(function(f){return Hn(f)}),r=Object.keys(t.attributes||{}).reduce(function(f,v){var u=t.attributes[v];switch(v){case"class":f.class=Fa(u);break;case"style":f.style=Da(u);break;default:f.attrs[v]=u}return f},{attrs:{},class:{},style:{}});e.class;var o=e.style,i=o===void 0?{}:o,s=La(e,ja);return Vn(t.tag,T(T(T({},n),{},{class:r.class,style:T(T({},r.style),i)},r.attrs),s),a)}var Gn=!1;try{Gn=!0}catch{}function Ya(){if(!Gn&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function yt(t,n){return Array.isArray(n)&&n.length>0||!Array.isArray(n)&&n?S({},t,n):{}}function $a(t){var n,e=(n={"fa-spin":t.spin,"fa-pulse":t.pulse,"fa-fw":t.fixedWidth,"fa-border":t.border,"fa-li":t.listItem,"fa-inverse":t.inverse,"fa-flip":t.flip===!0,"fa-flip-horizontal":t.flip==="horizontal"||t.flip==="both","fa-flip-vertical":t.flip==="vertical"||t.flip==="both"},S(S(S(S(S(S(S(S(S(S(n,"fa-".concat(t.size),t.size!==null),"fa-rotate-".concat(t.rotation),t.rotation!==null),"fa-pull-".concat(t.pull),t.pull!==null),"fa-swap-opacity",t.swapOpacity),"fa-bounce",t.bounce),"fa-shake",t.shake),"fa-beat",t.beat),"fa-fade",t.fade),"fa-beat-fade",t.beatFade),"fa-flash",t.flash),S(S(n,"fa-spin-pulse",t.spinPulse),"fa-spin-reverse",t.spinReverse));return Object.keys(e).map(function(a){return e[a]?a:null}).filter(function(a){return a})}function pn(t){if(t&&ft(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(Nt.icon)return Nt.icon(t);if(t===null)return null;if(ft(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}var Ba=Xn({name:"FontAwesomeIcon",props:{border:{type:Boolean,default:!1},fixedWidth:{type:Boolean,default:!1},flip:{type:[Boolean,String],default:!1,validator:function(n){return[!0,!1,"horizontal","vertical","both"].indexOf(n)>-1}},icon:{type:[Object,Array,String],required:!0},mask:{type:[Object,Array,String],default:null},maskId:{type:String,default:null},listItem:{type:Boolean,default:!1},pull:{type:String,default:null,validator:function(n){return["right","left"].indexOf(n)>-1}},pulse:{type:Boolean,default:!1},rotation:{type:[String,Number],default:null,validator:function(n){return[90,180,270].indexOf(Number.parseInt(n,10))>-1}},swapOpacity:{type:Boolean,default:!1},size:{type:String,default:null,validator:function(n){return["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"].indexOf(n)>-1}},spin:{type:Boolean,default:!1},transform:{type:[String,Object],default:null},symbol:{type:[Boolean,String],default:!1},title:{type:String,default:null},titleId:{type:String,default:null},inverse:{type:Boolean,default:!1},bounce:{type:Boolean,default:!1},shake:{type:Boolean,default:!1},beat:{type:Boolean,default:!1},fade:{type:Boolean,default:!1},beatFade:{type:Boolean,default:!1},flash:{type:Boolean,default:!1},spinPulse:{type:Boolean,default:!1},spinReverse:{type:Boolean,default:!1}},setup:function(n,e){var a=e.attrs,r=W(function(){return pn(n.icon)}),o=W(function(){return yt("classes",$a(n))}),i=W(function(){return yt("transform",typeof n.transform=="string"?Nt.transform(n.transform):n.transform)}),s=W(function(){return yt("mask",pn(n.mask))}),f=W(function(){return Na(r.value,T(T(T(T({},o.value),i.value),s.value),{},{symbol:n.symbol,title:n.title,titleId:n.titleId,maskId:n.maskId}))});Kn(f,function(u){if(!u)return Ya("Could not find one or more icon(s)",r.value,s.value)},{immediate:!0});var v=W(function(){return f.value?Hn(f.value.abstract[0],{},a):null});return function(){return v.value}}});export{Ba as F,Wa as l};
