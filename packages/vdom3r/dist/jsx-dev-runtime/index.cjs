"use strict";var l=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var m=Object.getOwnPropertyNames;var c=Object.prototype.hasOwnProperty;var x=(n,e)=>{for(var t in e)l(n,t,{get:e[t],enumerable:!0})},N=(n,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of m(e))!c.call(n,r)&&r!==t&&l(n,r,{get:()=>e[r],enumerable:!(o=u(e,r))||o.enumerable});return n};var g=n=>N(l({},"__esModule",{value:!0}),n);var C={};x(C,{Fragment:()=>s,jsx:()=>i,jsxDEV:()=>i,jsxs:()=>i});module.exports=g(C);var s=Symbol("Fragment");function a(n){return n.reduce((e,t)=>(t==null||t===!1||(Array.isArray(t)?e.push(...a(t)):typeof t=="number"||typeof t=="boolean"?e.push(String(t)):e.push(t)),e),[])}function f(n,e){let t=e||{},{key:o=null,ref:r=null,children:p,...d}=t,y=a(p?Array.isArray(p)?p:[p]:[]);return{type:n,props:{...d,ref:r||void 0},children:y,key:o,el:null}}var i=f;
if (typeof exports === 'object' && typeof module !== 'undefined') { module.exports = dom4t; }
//# sourceMappingURL=index.cjs.map