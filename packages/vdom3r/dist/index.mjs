var s=Symbol("Fragment");function l(e){return e.reduce((o,t)=>(t==null||t===!1||(Array.isArray(t)?o.push(...l(t)):typeof t=="number"||typeof t=="boolean"?o.push(String(t)):o.push(t)),o),[])}function f(e,o){let t=o||{},{key:n=null,ref:r=null,children:p,...d}=t,y=l(p?Array.isArray(p)?p:[p]:[]);return{type:e,props:{...d,ref:r||void 0},children:y,key:n,el:null}}function u(e){return e!==null&&typeof e=="object"&&"type"in e&&"props"in e&&"children"in e}function V(e){return typeof e=="function"&&(!("prototype"in e)||!e.prototype?.render)}function i(e,o){if(e!=null){if(typeof e=="string"||typeof e=="number"||typeof e=="boolean"){o.appendChild(document.createTextNode(String(e)));return}if(Array.isArray(e)){e.forEach(t=>i(t,o));return}if(u(e)){if(typeof e.type=="function"){let t=e.type,n=t(e.props,{emit(){}});n&&i(n,o);return}if(e.type===s){e.children.forEach(t=>i(t,o));return}if(typeof e.type=="string"){let t=document.createElement(e.type);e.props&&Object.entries(e.props).forEach(([n,r])=>{if(n==="ref"&&typeof r=="function"){r(t);return}if(n.startsWith("on")&&typeof r=="function"){let p=n.slice(2).toLowerCase();t.addEventListener(p,r);return}if(n==="style"&&r&&typeof r=="object"){Object.assign(t.style,r);return}if(n==="className"&&typeof r=="string"){t.className=r;return}typeof r!="function"&&typeof r!="object"&&n!=="key"&&t.setAttribute(n,String(r))}),e.children.forEach(n=>i(n,t)),o.appendChild(t)}}}}var a=f,M=a,P=a;export{s as Fragment,f as createElement,V as isFunctionComponent,a as jsx,P as jsxDev,M as jsxs,i as render};
if (typeof exports === 'object' && typeof module !== 'undefined') { module.exports = dom4t; }
//# sourceMappingURL=index.mjs.map