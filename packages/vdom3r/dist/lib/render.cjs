"use strict";var s=Object.defineProperty;var y=Object.getOwnPropertyDescriptor;var u=Object.getOwnPropertyNames;var m=Object.prototype.hasOwnProperty;var c=(e,n)=>{for(var t in n)s(e,t,{get:n[t],enumerable:!0})},N=(e,n,t,o)=>{if(n&&typeof n=="object"||typeof n=="function")for(let r of u(n))!m.call(e,r)&&r!==t&&s(e,r,{get:()=>n[r],enumerable:!(o=y(n,r))||o.enumerable});return e};var C=e=>N(s({},"__esModule",{value:!0}),e);var x={};c(x,{createElement:()=>g,isFunctionComponent:()=>V,render:()=>i});module.exports=C(x);var l=Symbol("Fragment");function a(e){return e.reduce((n,t)=>(t==null||t===!1||(Array.isArray(t)?n.push(...a(t)):typeof t=="number"||typeof t=="boolean"?n.push(String(t)):n.push(t)),n),[])}function g(e,n){let t=n||{},{key:o=null,ref:r=null,children:p,...f}=t,d=a(p?Array.isArray(p)?p:[p]:[]);return{type:e,props:{...f,ref:r||void 0},children:d,key:o,el:null}}function E(e){return e!==null&&typeof e=="object"&&"type"in e&&"props"in e&&"children"in e}function V(e){return typeof e=="function"&&(!("prototype"in e)||!e.prototype?.render)}function i(e,n){if(e!=null){if(typeof e=="string"||typeof e=="number"||typeof e=="boolean"){n.appendChild(document.createTextNode(String(e)));return}if(Array.isArray(e)){e.forEach(t=>i(t,n));return}if(E(e)){if(typeof e.type=="function"){let t=e.type,o=t(e.props,{emit(){}});o&&i(o,n);return}if(e.type===l){e.children.forEach(t=>i(t,n));return}if(typeof e.type=="string"){let t=document.createElement(e.type);e.props&&Object.entries(e.props).forEach(([o,r])=>{if(o==="ref"&&typeof r=="function"){r(t);return}if(o.startsWith("on")&&typeof r=="function"){let p=o.slice(2).toLowerCase();t.addEventListener(p,r);return}if(o==="style"&&r&&typeof r=="object"){Object.assign(t.style,r);return}if(o==="className"&&typeof r=="string"){t.className=r;return}typeof r!="function"&&typeof r!="object"&&o!=="key"&&t.setAttribute(o,String(r))}),e.children.forEach(o=>i(o,t)),n.appendChild(t)}}}}
if (typeof exports === 'object' && typeof module !== 'undefined') { module.exports = dom4t; }
//# sourceMappingURL=render.cjs.map