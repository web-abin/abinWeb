import{R as g,S as K,j as h,D as A,T as k,K as S,U as j,V as $,u as v}from"./entry.c9afbec6.js";let w;function C(){return w}function i(t,r){const a=[],e=r.resolveKeyData||(c=>c.key),n=r.resolveValueData||(c=>c.value);for(const[c,u]of Object.entries(t))a.push(...(Array.isArray(u)?u:[u]).map(s=>{const f={key:c,value:s},o=n(f);return typeof o=="object"?i(o,r):Array.isArray(o)?o:{[typeof r.key=="function"?r.key(f):r.key]:e(f),[typeof r.value=="function"?r.value(f):r.value]:o}}).flat());return a}function b(t,r){return Object.entries(t).map(([a,e])=>{if(typeof e=="object"&&(e=b(e,r)),r.resolve){const n=r.resolve({key:a,value:e});if(n)return n}return typeof e=="number"&&(e=e.toString()),typeof e=="string"&&r.wrapValue&&(e=e.replace(new RegExp(r.wrapValue,"g"),`\\${r.wrapValue}`),e=`${r.wrapValue}${e}${r.wrapValue}`),`${a}${r.keyValueSeparator||""}${e}`}).join(r.entrySeparator||"")}const p={robots:{unpack:{keyValueSeparator:":"}},contentSecurityPolicy:{unpack:{keyValueSeparator:" ",entrySeparator:"; "},metaKey:"http-equiv"},fbAppId:{keyValue:"fb:app_id",metaKey:"property"},ogSiteName:{keyValue:"og:site_name"},msapplicationTileImage:{keyValue:"msapplication-TileImage"},msapplicationTileColor:{keyValue:"msapplication-TileColor"},msapplicationConfig:{keyValue:"msapplication-Config"},charset:{metaKey:"charset"},contentType:{metaKey:"http-equiv"},defaultStyle:{metaKey:"http-equiv"},xUaCompatible:{metaKey:"http-equiv"},refresh:{metaKey:"http-equiv"}},T=["Image","Video","Audio"],D=/^(og|twitter|fb)/,I=/^(og|fb)/;function x(t){var r;return I.test(t)?"property":((r=p[t])==null?void 0:r.metaKey)||"name"}function H(t){var r;return((r=p[t])==null?void 0:r.keyValue)||m(t)}function m(t){return t=t.replace(/([A-Z])/g,"-$1").toLowerCase(),D.test(t)&&(t=t.replace("secure-url","secure_url").replace(/-/g,":")),t}function l(t){if(Array.isArray(t))return t.map(a=>l(a));if(typeof t!="object"||Array.isArray(t))return t;const r={};for(const[a,e]of Object.entries(t))r[m(a)]=l(e);return r}function B(t){const r=[];T.forEach(e=>{const n=`og:${e.toLowerCase()}`,c=`og${e}`,u=t[c];typeof u=="object"&&((Array.isArray(u)?u:[u]).forEach(s=>{if(!s)return;const f=i(s,{key:"property",value:"content",resolveKeyData({key:o}){return m(`${n}${o!=="url"?`:${o}`:""}`)},resolveValueData({value:o}){return typeof o=="number"?o.toString():o}});r.push(...f.sort((o,V)=>o.property===n?-1:V.property===n?1:0))}),delete t[c])});const a=i(t,{key({key:e}){return x(e)},value({key:e}){return e==="charset"?"charset":"content"},resolveKeyData({key:e}){return H(e)},resolveValueData({value:e,key:n}){return e===null?"_null":typeof e=="object"?O(e,n):typeof e=="number"?e.toString():e}});return[...r,...a].filter(e=>typeof e.content>"u"||e.content!=="_null")}function O(t,r){const a=p[r];return r==="refresh"?`${t.seconds};url=${t.url}`:b(l(t),{entrySeparator:", ",keyValueSeparator:"=",resolve({value:e,key:n}){if(e===null)return"";if(typeof e=="boolean")return`${n}`},...a==null?void 0:a.unpack})}function P(t){return typeof t=="function"?t():v(t)}function y(t,r=""){if(t instanceof Promise)return t;const a=P(t);return!t||!a?a:Array.isArray(a)?a.map(e=>y(e,r)):typeof a=="object"?Object.fromEntries(Object.entries(a).map(([e,n])=>e==="titleTemplate"||e.startsWith("on")?[e,v(n)]:[e,y(n,e)])):a}const U=typeof window<"u",E="usehead";function d(){return g()&&K(E)||C()}function q(t,r={}){const a=d(),e=h(!1),n=h({});A(()=>{n.value=e.value?{}:y(t)});const c=a.push(n.value,r);return k(n,s=>{c.patch(s)}),g()&&(S(()=>{c.dispose()}),j(()=>{e.value=!0}),$(()=>{e.value=!1})),c}function M(t,r={}){return d().push(t,r)}function F(t,r={}){var e;const a=d();if(a){const n=U||!!((e=a.resolvedOptions)!=null&&e.document);return r.mode==="server"&&n||r.mode==="client"&&!n?void 0:n?q(t,r):M(t,r)}}export{B as a,y as r,F as u};
