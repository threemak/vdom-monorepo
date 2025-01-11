/******/ var __webpack_modules__ = ({

/***/ "./src/jsx-runtime/index.ts":
/*!**********************************!*\
  !*** ./src/jsx-runtime/index.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Fragment: () => (/* binding */ Fragment),
/* harmony export */   jsx: () => (/* binding */ jsx),
/* harmony export */   jsxs: () => (/* binding */ jsxs)
/* harmony export */ });
var _excluded = ["children"];
function _objectWithoutProperties(e, t) { if (null == e)
    return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++)
        o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
} return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r)
    return {}; var t = {}; for (var n in r)
    if ({}.hasOwnProperty.call(r, n)) {
        if (e.includes(n))
            continue;
        t[n] = r[n];
    } return t; }
var createElement = (type, props) => {
    var { children } = props, restProps = _objectWithoutProperties(props, _excluded);
    // Normalizing children to always be an array
    var normalizedChildren = children ? Array.isArray(children) ? children : [children] : [];
    return {
        type,
        props: restProps || {},
        children: normalizedChildren
    };
};
var jsx = createElement;
var jsxs = jsx;
var Fragment = "Fragment";


/***/ }),

/***/ "./src/lib/diffing.ts":
/*!****************************!*\
  !*** ./src/lib/diffing.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   diff: () => (/* binding */ diff),
/* harmony export */   isFunctionComponent: () => (/* binding */ isFunctionComponent),
/* harmony export */   isVNode: () => (/* binding */ isVNode)
/* harmony export */ });
function diff(oldVNode, newVNode) {
    if (oldVNode === newVNode)
        return null;
    var result = {};
    // Handle primitive values
    if (typeof oldVNode !== typeof newVNode) {
        return {
            typeChanged: true
        };
    }
    if (typeof oldVNode === "string" || typeof oldVNode === "number" || typeof oldVNode === "boolean") {
        if (oldVNode !== newVNode) {
            return {
                typeChanged: true
            };
        }
        return null;
    }
    // Handle arrays
    if (Array.isArray(oldVNode) && Array.isArray(newVNode)) {
        var childrenChanged = [];
        var maxLength = Math.max(oldVNode.length, newVNode.length);
        for (var i = 0; i < maxLength; i++) {
            var childDiff = diff(oldVNode[i], newVNode[i]);
            if (childDiff) {
                childrenChanged.push(newVNode[i]);
            }
        }
        if (childrenChanged.length > 0) {
            result.childrenChanged = childrenChanged;
        }
        return Object.keys(result).length > 0 ? result : null;
    }
    // Handle VNodes
    if (isVNode(oldVNode) && isVNode(newVNode)) {
        // Compare types
        if (oldVNode.type !== newVNode.type) {
            result.typeChanged = true;
        }
        // Compare props
        var propsChanged = {};
        var oldProps = oldVNode.props || {};
        var newProps = newVNode.props || {};
        var allProps = new Set([...Object.keys(oldProps), ...Object.keys(newProps)]);
        allProps.forEach(key => {
            if (oldProps[key] !== newProps[key]) {
                propsChanged[key] = newProps[key];
            }
        });
        if (Object.keys(propsChanged).length > 0) {
            result.propsChanged = propsChanged;
        }
        // Compare children
        var _childrenChanged = [];
        var _maxLength = Math.max(oldVNode.children.length, newVNode.children.length);
        for (var _i = 0; _i < _maxLength; _i++) {
            var _childDiff = diff(oldVNode.children[_i], newVNode.children[_i]);
            if (_childDiff) {
                _childrenChanged.push(newVNode.children[_i]);
            }
        }
        if (_childrenChanged.length > 0) {
            result.childrenChanged = _childrenChanged;
        }
        return Object.keys(result).length > 0 ? result : null;
    }
    return {
        typeChanged: true
    };
}
// Function to check if a node is a VNode
function isVNode(node) {
    return node !== null && typeof node === "object" && "type" in node && "props" in node && "children" in node;
}
// Function to check if a value is a function component
function isFunctionComponent(value) {
    var _value$prototype;
    return typeof value === "function" && (!("prototype" in value) || !((_value$prototype = value.prototype) !== null && _value$prototype !== void 0 && _value$prototype.render));
}


/***/ }),

/***/ "./src/lib/render.ts":
/*!***************************!*\
  !*** ./src/lib/render.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isFunctionComponent: () => (/* binding */ isFunctionComponent),
/* harmony export */   isVNode: () => (/* binding */ isVNode),
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var _diffing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./diffing */ "./src/lib/diffing.ts");

// Render function to render VNode to a container
function render(vnode, container) {
    // Function to apply props to an element
    var applyProps = (element, props) => {
        Object.entries(props).forEach(_ref => {
            var [key, value] = _ref;
            // Handle ref
            if (key === "ref" && typeof value === "function") {
                value(element);
                return;
            }
            // Handle event listeners
            if (key.startsWith("on") && typeof value === "function") {
                var eventType = key.slice(2).toLowerCase();
                element.addEventListener(eventType, value);
                return;
            }
            // Handle style object
            if (key === "style" && value && typeof value === "object") {
                Object.assign(element.style, value);
                return;
            }
            // Handle className
            if (key === "className" && typeof value === "string") {
                element.className = value;
                return;
            }
            // Handle regular attributes
            if (typeof value !== "function" && typeof value !== "object" && key !== "key") {
                element.setAttribute(key, String(value));
            }
        });
    };
    // Recursive function to render a vnode
    var renderVNode = (vnode, container, oldVNode) => {
        if (vnode == null)
            return;
        // Handle primitive values
        if (typeof vnode === "string" || typeof vnode === "number" || typeof vnode === "boolean") {
            container.appendChild(document.createTextNode(String(vnode)));
            return;
        }
        // Handle arrays
        if (Array.isArray(vnode)) {
            vnode.forEach(child => renderVNode(child, container));
            return;
        }
        // Handle VNode
        if (!isVNode(vnode))
            return;
        // Handle function components
        if (typeof vnode.type === "function") {
            var Component = vnode.type;
            var result = Component(vnode.props, {
                emit: () => { }
            });
            if (result)
                renderVNode(result, container, oldVNode);
            return;
        }
        // Handle Fragment
        if (vnode.type === "Fragment") {
            vnode.children.forEach(child => renderVNode(child, container));
            return;
        }
        // Create or update element
        var element;
        if (oldVNode && isVNode(oldVNode) && oldVNode.type === vnode.type) {
            element = container.querySelector("[data-key=\"".concat(oldVNode.props.key, "\"]"));
            if (element) {
                // Update props
                applyProps(element, vnode.props);
                // Update children
                var childrenDiff = (0,_diffing__WEBPACK_IMPORTED_MODULE_0__.diff)(oldVNode.children, vnode.children);
                if (childrenDiff && childrenDiff.childrenChanged) {
                    element.innerHTML = "";
                    vnode.children.forEach(child => renderVNode(child, element));
                }
            }
            else {
                element = document.createElement(vnode.type);
                applyProps(element, vnode.props);
                vnode.children.forEach(child => renderVNode(child, element));
                container.appendChild(element);
            }
        }
        else {
            element = document.createElement(vnode.type);
            applyProps(element, vnode.props);
            vnode.children.forEach(child => renderVNode(child, element));
            container.appendChild(element);
        }
    };
    renderVNode(vnode, container);
}
function isVNode(node) {
    return node !== null && typeof node === "object" && "type" in node && "props" in node && "children" in node;
}
function isFunctionComponent(value) {
    var _value$prototype;
    return typeof value === "function" && (!("prototype" in value) || !((_value$prototype = value.prototype) !== null && _value$prototype !== void 0 && _value$prototype.render));
}
//export function render(vnode: VNodeChild, container: HTMLElement): void {
//    if (vnode == null) return;
//
//    // Handle primitive values
//    if (
//        typeof vnode === "string" ||
//        typeof vnode === "number" ||
//        typeof vnode === "boolean"
//    ) {
//        container.appendChild(document.createTextNode(String(vnode)));
//        return;
//    }
//
//    // Handle arrays
//    if (Array.isArray(vnode)) {
//        vnode.forEach((child) => render(child, container));
//        return;
//    }
//
//    // Handle VNode
//    if (!isVNode(vnode)) return;
//
//    // Handle function components
//    if (typeof vnode.type === "function") {
//        const Component = vnode.type as FunctionComponent;
//        const result = Component(vnode.props, { emit() {} });
//        if (result) render(result, container);
//        return;
//    }
//
//    // Handle Fragment
//    if (vnode.type === "Fragment") {
//        vnode.children.forEach((child) => render(child, container));
//        return;
//    }
//
//    // Create element (only for string types now)
//    if (typeof vnode.type === "string") {
//        const element = document.createElement(vnode.type);
//
//        // Apply props
//        if (vnode.props) {
//            Object.entries(vnode.props).forEach(([key, value]) => {
//                // Handle ref
//                if (key === "ref" && typeof value === "function") {
//                    value(element);
//                    return;
//                }
//
//                // Handle event listeners
//                if (key.startsWith("on") && typeof value === "function") {
//                    const eventType = key
//                        .slice(2)
//                        .toLowerCase() as keyof HTMLElementEventMap;
//                    element.addEventListener(eventType, value as EventListener);
//                    return;
//                }
//
//                // Handle style object
//                if (key === "style" && value && typeof value === "object") {
//                    Object.assign(element.style, value);
//                    return;
//                }
//
//                // Handle className
//                if (key === "className" && typeof value === "string") {
//                    element.className = value;
//                    return;
//                }
//
//                // Handle regular attributes
//                if (
//                    typeof value !== "function" &&
//                    typeof value !== "object" &&
//                    key !== "key"
//                ) {
//                    element.setAttribute(key, String(value));
//                }
//            });
//        }
//
//        // Render children
//        vnode.children.forEach((child) => render(child, element));
//        container.appendChild(element);
//    }
//}


/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/render */ "./src/lib/render.ts");
/* harmony import */ var jsx_runtime_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsx-runtime/jsx-runtime */ "./src/jsx-runtime/index.ts");


var App = () => {
    return (0,jsx_runtime_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        children: [(0,jsx_runtime_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h1", {
                children: "Hello Custom JSX!"
            }), (0,jsx_runtime_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("button", {
                onclick: () => alert("Clicked!"),
                children: "Click me"
            })]
    });
};
var root = document.getElementById("root");
if (root) {
    (0,_lib_render__WEBPACK_IMPORTED_MODULE_0__.render)((0,jsx_runtime_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(App, {}), root);
}

})();


//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBO1NBQ0E7U0FDQTtTQUNBOztTQUVBO1NBQ0E7O1NBRUE7U0FDQTtTQUNBOzs7OztVQ3RCQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7OztBQ05xQztBQUFDO0FBRXRDLElBQU04QixHQUFHLEdBQUdBLEdBQUE7SUFDUixPQUNJRCw2REFBQTtRQUFBbkUsUUFBQSxHQUNJa0UsNERBQUE7Z0JBQUFsRSxRQUFBLEVBQUk7YUFBcUIsQ0FBQyxFQUMxQmtFLDREQUFBO2dCQUFRRyxPQUFPLEVBQUVBLEdBQUEsR0FBTUMsS0FBSyxDQUFDLFVBQVUsQ0FBRTtnQkFBQXRFLFFBQUEsRUFBQzthQUFnQixDQUFDO0tBQzFELENBQUM7QUFFZCxDQUFDO0FBRUQsSUFBTXVFLElBQUksR0FBR2QsUUFBUSxDQUFDZSxjQUFjLENBQUMsTUFBTSxDQUFDO0FBQzVDLElBQUlELElBQUksRUFBRTtJQUNOakMsbURBQU0sQ0FBQzRCLDREQUFBLENBQUNFLEdBQUcsSUFBRSxDQUFDLEVBQUVHLElBQUksQ0FBQztBQUN6QiIsInNvdXJjZXMiOlsid2VicGFjazovL3ZpcnR1YWxkb20vLi9zcmMvanN4LXJ1bnRpbWUvaW5kZXgudHM/NTg2NiIsIndlYnBhY2s6Ly92aXJ0dWFsZG9tLy4vc3JjL2pzeC1ydW50aW1lL2luZGV4LnRzIiwid2VicGFjazovL3ZpcnR1YWxkb20vLi9zcmMvbGliL2RpZmZpbmcudHMiLCJ3ZWJwYWNrOi8vdmlydHVhbGRvbS8uL3NyYy9saWIvcmVuZGVyLnRzIiwid2VicGFjazovL3ZpcnR1YWxkb20vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdmlydHVhbGRvbS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdmlydHVhbGRvbS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3ZpcnR1YWxkb20vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly92aXJ0dWFsZG9tLy4vc3JjL2luZGV4LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgX2V4Y2x1ZGVkID0gW1wiY2hpbGRyZW5cIl07XG5mdW5jdGlvbiBfb2JqZWN0V2l0aG91dFByb3BlcnRpZXMoZSwgdCkgeyBpZiAobnVsbCA9PSBlKSByZXR1cm4ge307IHZhciBvLCByLCBpID0gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UoZSwgdCk7IGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7IHZhciBzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhlKTsgZm9yIChyID0gMDsgciA8IHMubGVuZ3RoOyByKyspIG8gPSBzW3JdLCB0LmluY2x1ZGVzKG8pIHx8IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwoZSwgbykgJiYgKGlbb10gPSBlW29dKTsgfSByZXR1cm4gaTsgfVxuZnVuY3Rpb24gX29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzTG9vc2UociwgZSkgeyBpZiAobnVsbCA9PSByKSByZXR1cm4ge307IHZhciB0ID0ge307IGZvciAodmFyIG4gaW4gcikgaWYgKHt9Lmhhc093blByb3BlcnR5LmNhbGwociwgbikpIHsgaWYgKGUuaW5jbHVkZXMobikpIGNvbnRpbnVlOyB0W25dID0gcltuXTsgfSByZXR1cm4gdDsgfVxudmFyIGNyZWF0ZUVsZW1lbnQgPSAodHlwZSwgcHJvcHMpID0+IHtcbiAgdmFyIHtcbiAgICAgIGNoaWxkcmVuXG4gICAgfSA9IHByb3BzLFxuICAgIHJlc3RQcm9wcyA9IF9vYmplY3RXaXRob3V0UHJvcGVydGllcyhwcm9wcywgX2V4Y2x1ZGVkKTtcbiAgLy8gTm9ybWFsaXppbmcgY2hpbGRyZW4gdG8gYWx3YXlzIGJlIGFuIGFycmF5XG4gIHZhciBub3JtYWxpemVkQ2hpbGRyZW4gPSBjaGlsZHJlbiA/IEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pID8gY2hpbGRyZW4gOiBbY2hpbGRyZW5dIDogW107XG4gIHJldHVybiB7XG4gICAgdHlwZSxcbiAgICBwcm9wczogcmVzdFByb3BzIHx8IHt9LFxuICAgIGNoaWxkcmVuOiBub3JtYWxpemVkQ2hpbGRyZW5cbiAgfTtcbn07XG5leHBvcnQgdmFyIGpzeCA9IGNyZWF0ZUVsZW1lbnQ7XG5leHBvcnQgdmFyIGpzeHMgPSBqc3g7XG5leHBvcnQgdmFyIEZyYWdtZW50ID0gXCJGcmFnbWVudFwiOyIsImNvbnN0IGNyZWF0ZUVsZW1lbnQgPSAodHlwZTogVk5vZGVUeXBlcywgcHJvcHM6IFZOb2RlUHJvcHMpOiBWTm9kZSA9PiB7XG4gICAgY29uc3QgeyBjaGlsZHJlbiwgLi4ucmVzdFByb3BzIH0gPSBwcm9wcztcbiAgICAvLyBOb3JtYWxpemluZyBjaGlsZHJlbiB0byBhbHdheXMgYmUgYW4gYXJyYXlcbiAgICBjb25zdCBub3JtYWxpemVkQ2hpbGRyZW4gPSBjaGlsZHJlblxuICAgICAgICA/IEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pXG4gICAgICAgICAgICA/IGNoaWxkcmVuXG4gICAgICAgICAgICA6IFtjaGlsZHJlbl1cbiAgICAgICAgOiBbXTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlLFxuICAgICAgICBwcm9wczogcmVzdFByb3BzIHx8IHt9LFxuICAgICAgICBjaGlsZHJlbjogbm9ybWFsaXplZENoaWxkcmVuLFxuICAgIH07XG59O1xuXG5leHBvcnQgY29uc3QganN4ID0gY3JlYXRlRWxlbWVudDtcbmV4cG9ydCBjb25zdCBqc3hzID0ganN4O1xuZXhwb3J0IGNvbnN0IEZyYWdtZW50ID0gXCJGcmFnbWVudFwiO1xuIiwidHlwZSBEaWZmUmVzdWx0ID0ge1xuICAgIHR5cGVDaGFuZ2VkPzogYm9vbGVhbjtcbiAgICBwcm9wc0NoYW5nZWQ/OiBSZWNvcmQ8c3RyaW5nLCBhbnk+O1xuICAgIGNoaWxkcmVuQ2hhbmdlZD86IFZOb2RlQ2hpbGRbXTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkaWZmKFxuICAgIG9sZFZOb2RlOiBWTm9kZUNoaWxkLFxuICAgIG5ld1ZOb2RlOiBWTm9kZUNoaWxkLFxuKTogRGlmZlJlc3VsdCB8IG51bGwge1xuICAgIGlmIChvbGRWTm9kZSA9PT0gbmV3Vk5vZGUpIHJldHVybiBudWxsO1xuXG4gICAgY29uc3QgcmVzdWx0OiBEaWZmUmVzdWx0ID0ge307XG5cbiAgICAvLyBIYW5kbGUgcHJpbWl0aXZlIHZhbHVlc1xuICAgIGlmICh0eXBlb2Ygb2xkVk5vZGUgIT09IHR5cGVvZiBuZXdWTm9kZSkge1xuICAgICAgICByZXR1cm4geyB0eXBlQ2hhbmdlZDogdHJ1ZSB9O1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgdHlwZW9mIG9sZFZOb2RlID09PSBcInN0cmluZ1wiIHx8XG4gICAgICAgIHR5cGVvZiBvbGRWTm9kZSA9PT0gXCJudW1iZXJcIiB8fFxuICAgICAgICB0eXBlb2Ygb2xkVk5vZGUgPT09IFwiYm9vbGVhblwiXG4gICAgKSB7XG4gICAgICAgIGlmIChvbGRWTm9kZSAhPT0gbmV3Vk5vZGUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IHR5cGVDaGFuZ2VkOiB0cnVlIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIGFycmF5c1xuICAgIGlmIChBcnJheS5pc0FycmF5KG9sZFZOb2RlKSAmJiBBcnJheS5pc0FycmF5KG5ld1ZOb2RlKSkge1xuICAgICAgICBjb25zdCBjaGlsZHJlbkNoYW5nZWQ6IFZOb2RlQ2hpbGRbXSA9IFtdO1xuICAgICAgICBjb25zdCBtYXhMZW5ndGggPSBNYXRoLm1heChvbGRWTm9kZS5sZW5ndGgsIG5ld1ZOb2RlLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRGlmZiA9IGRpZmYob2xkVk5vZGVbaV0sIG5ld1ZOb2RlW2ldKTtcbiAgICAgICAgICAgIGlmIChjaGlsZERpZmYpIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbkNoYW5nZWQucHVzaChuZXdWTm9kZVtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoaWxkcmVuQ2hhbmdlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQuY2hpbGRyZW5DaGFuZ2VkID0gY2hpbGRyZW5DaGFuZ2VkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhyZXN1bHQpLmxlbmd0aCA+IDAgPyByZXN1bHQgOiBudWxsO1xuICAgIH1cblxuICAgIC8vIEhhbmRsZSBWTm9kZXNcbiAgICBpZiAoaXNWTm9kZShvbGRWTm9kZSkgJiYgaXNWTm9kZShuZXdWTm9kZSkpIHtcbiAgICAgICAgLy8gQ29tcGFyZSB0eXBlc1xuICAgICAgICBpZiAob2xkVk5vZGUudHlwZSAhPT0gbmV3Vk5vZGUudHlwZSkge1xuICAgICAgICAgICAgcmVzdWx0LnR5cGVDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbXBhcmUgcHJvcHNcbiAgICAgICAgY29uc3QgcHJvcHNDaGFuZ2VkOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge307XG4gICAgICAgIGNvbnN0IG9sZFByb3BzID0gb2xkVk5vZGUucHJvcHMgfHwge307XG4gICAgICAgIGNvbnN0IG5ld1Byb3BzID0gbmV3Vk5vZGUucHJvcHMgfHwge307XG4gICAgICAgIGNvbnN0IGFsbFByb3BzID0gbmV3IFNldChbXG4gICAgICAgICAgICAuLi5PYmplY3Qua2V5cyhvbGRQcm9wcyksXG4gICAgICAgICAgICAuLi5PYmplY3Qua2V5cyhuZXdQcm9wcyksXG4gICAgICAgIF0pO1xuICAgICAgICBhbGxQcm9wcy5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChvbGRQcm9wc1trZXldICE9PSBuZXdQcm9wc1trZXldKSB7XG4gICAgICAgICAgICAgICAgcHJvcHNDaGFuZ2VkW2tleV0gPSBuZXdQcm9wc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHByb3BzQ2hhbmdlZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmVzdWx0LnByb3BzQ2hhbmdlZCA9IHByb3BzQ2hhbmdlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbXBhcmUgY2hpbGRyZW5cbiAgICAgICAgY29uc3QgY2hpbGRyZW5DaGFuZ2VkOiBWTm9kZUNoaWxkW10gPSBbXTtcbiAgICAgICAgY29uc3QgbWF4TGVuZ3RoID0gTWF0aC5tYXgoXG4gICAgICAgICAgICBvbGRWTm9kZS5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgICAgICBuZXdWTm9kZS5jaGlsZHJlbi5sZW5ndGgsXG4gICAgICAgICk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4TGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRGlmZiA9IGRpZmYob2xkVk5vZGUuY2hpbGRyZW5baV0sIG5ld1ZOb2RlLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgIGlmIChjaGlsZERpZmYpIHtcbiAgICAgICAgICAgICAgICBjaGlsZHJlbkNoYW5nZWQucHVzaChuZXdWTm9kZS5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoaWxkcmVuQ2hhbmdlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByZXN1bHQuY2hpbGRyZW5DaGFuZ2VkID0gY2hpbGRyZW5DaGFuZ2VkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHJlc3VsdCkubGVuZ3RoID4gMCA/IHJlc3VsdCA6IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgdHlwZUNoYW5nZWQ6IHRydWUgfTtcbn1cblxuLy8gRnVuY3Rpb24gdG8gY2hlY2sgaWYgYSBub2RlIGlzIGEgVk5vZGVcbmV4cG9ydCBmdW5jdGlvbiBpc1ZOb2RlKG5vZGU6IHVua25vd24pOiBub2RlIGlzIFZOb2RlIHtcbiAgICByZXR1cm4gKFxuICAgICAgICBub2RlICE9PSBudWxsICYmXG4gICAgICAgIHR5cGVvZiBub2RlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgIFwidHlwZVwiIGluIG5vZGUgJiZcbiAgICAgICAgXCJwcm9wc1wiIGluIG5vZGUgJiZcbiAgICAgICAgXCJjaGlsZHJlblwiIGluIG5vZGVcbiAgICApO1xufVxuXG4vLyBGdW5jdGlvbiB0byBjaGVjayBpZiBhIHZhbHVlIGlzIGEgZnVuY3Rpb24gY29tcG9uZW50XG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbkNvbXBvbmVudChcbiAgICB2YWx1ZTogdW5rbm93bixcbik6IHZhbHVlIGlzIEZ1bmN0aW9uQ29tcG9uZW50IHtcbiAgICByZXR1cm4gKFxuICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAoIShcInByb3RvdHlwZVwiIGluIHZhbHVlKSB8fCAhdmFsdWUucHJvdG90eXBlPy5yZW5kZXIpXG4gICAgKTtcbn1cbiIsImltcG9ydCB7IGRpZmYgfSBmcm9tIFwiLi9kaWZmaW5nXCI7XG5cbi8vIFJlbmRlciBmdW5jdGlvbiB0byByZW5kZXIgVk5vZGUgdG8gYSBjb250YWluZXJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIodm5vZGU6IFZOb2RlQ2hpbGQsIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAvLyBGdW5jdGlvbiB0byBhcHBseSBwcm9wcyB0byBhbiBlbGVtZW50XG4gICAgY29uc3QgYXBwbHlQcm9wcyA9IChlbGVtZW50OiBIVE1MRWxlbWVudCwgcHJvcHM6IFZOb2RlUHJvcHMpID0+IHtcbiAgICAgICAgT2JqZWN0LmVudHJpZXMocHJvcHMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHJlZlxuICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJyZWZcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHZhbHVlKGVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gSGFuZGxlIGV2ZW50IGxpc3RlbmVyc1xuICAgICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKFwib25cIikgJiYgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBldmVudFR5cGUgPSBrZXlcbiAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDIpXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpIGFzIGtleW9mIEhUTUxFbGVtZW50RXZlbnRNYXA7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50VHlwZSwgdmFsdWUgYXMgRXZlbnRMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBIYW5kbGUgc3R5bGUgb2JqZWN0XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBcInN0eWxlXCIgJiYgdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihlbGVtZW50LnN0eWxlLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBIYW5kbGUgY2xhc3NOYW1lXG4gICAgICAgICAgICBpZiAoa2V5ID09PSBcImNsYXNzTmFtZVwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBIYW5kbGUgcmVndWxhciBhdHRyaWJ1dGVzXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgdHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgICAgICBrZXkgIT09IFwia2V5XCJcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKGtleSwgU3RyaW5nKHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvLyBSZWN1cnNpdmUgZnVuY3Rpb24gdG8gcmVuZGVyIGEgdm5vZGVcbiAgICBjb25zdCByZW5kZXJWTm9kZSA9IChcbiAgICAgICAgdm5vZGU6IFZOb2RlQ2hpbGQsXG4gICAgICAgIGNvbnRhaW5lcjogSFRNTEVsZW1lbnQsXG4gICAgICAgIG9sZFZOb2RlPzogVk5vZGVDaGlsZCxcbiAgICApID0+IHtcbiAgICAgICAgaWYgKHZub2RlID09IG51bGwpIHJldHVybjtcblxuICAgICAgICAvLyBIYW5kbGUgcHJpbWl0aXZlIHZhbHVlc1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2Ygdm5vZGUgPT09IFwic3RyaW5nXCIgfHxcbiAgICAgICAgICAgIHR5cGVvZiB2bm9kZSA9PT0gXCJudW1iZXJcIiB8fFxuICAgICAgICAgICAgdHlwZW9mIHZub2RlID09PSBcImJvb2xlYW5cIlxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcodm5vZGUpKSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBIYW5kbGUgYXJyYXlzXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZub2RlKSkge1xuICAgICAgICAgICAgdm5vZGUuZm9yRWFjaCgoY2hpbGQpID0+IHJlbmRlclZOb2RlKGNoaWxkLCBjb250YWluZXIpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhhbmRsZSBWTm9kZVxuICAgICAgICBpZiAoIWlzVk5vZGUodm5vZGUpKSByZXR1cm47XG5cbiAgICAgICAgLy8gSGFuZGxlIGZ1bmN0aW9uIGNvbXBvbmVudHNcbiAgICAgICAgaWYgKHR5cGVvZiB2bm9kZS50eXBlID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IENvbXBvbmVudCA9IHZub2RlLnR5cGUgYXMgRnVuY3Rpb25Db21wb25lbnQ7XG4gICAgICAgICAgICBjb25zdCByZXN1bHQgPSBDb21wb25lbnQodm5vZGUucHJvcHMsIHtcbiAgICAgICAgICAgICAgICBlbWl0OiAoKSA9PiB7fSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCkgcmVuZGVyVk5vZGUocmVzdWx0LCBjb250YWluZXIsIG9sZFZOb2RlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEhhbmRsZSBGcmFnbWVudFxuICAgICAgICBpZiAodm5vZGUudHlwZSA9PT0gXCJGcmFnbWVudFwiKSB7XG4gICAgICAgICAgICB2bm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gcmVuZGVyVk5vZGUoY2hpbGQsIGNvbnRhaW5lcikpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIG9yIHVwZGF0ZSBlbGVtZW50XG4gICAgICAgIGxldCBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICAgICAgaWYgKG9sZFZOb2RlICYmIGlzVk5vZGUob2xkVk5vZGUpICYmIG9sZFZOb2RlLnR5cGUgPT09IHZub2RlLnR5cGUpIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBjb250YWluZXIucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICBgW2RhdGEta2V5PVwiJHtvbGRWTm9kZS5wcm9wcy5rZXl9XCJdYCxcbiAgICAgICAgICAgICkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBwcm9wc1xuICAgICAgICAgICAgICAgIGFwcGx5UHJvcHMoZWxlbWVudCwgdm5vZGUucHJvcHMpO1xuXG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIGNoaWxkcmVuXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRyZW5EaWZmID0gZGlmZihvbGRWTm9kZS5jaGlsZHJlbiwgdm5vZGUuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIGlmIChjaGlsZHJlbkRpZmYgJiYgY2hpbGRyZW5EaWZmLmNoaWxkcmVuQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgIHZub2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVuZGVyVk5vZGUoY2hpbGQsIGVsZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodm5vZGUudHlwZSBhcyBzdHJpbmcpO1xuICAgICAgICAgICAgICAgIGFwcGx5UHJvcHMoZWxlbWVudCwgdm5vZGUucHJvcHMpO1xuICAgICAgICAgICAgICAgIHZub2RlLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkKSA9PiByZW5kZXJWTm9kZShjaGlsZCwgZWxlbWVudCkpO1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHZub2RlLnR5cGUgYXMgc3RyaW5nKTtcbiAgICAgICAgICAgIGFwcGx5UHJvcHMoZWxlbWVudCwgdm5vZGUucHJvcHMpO1xuICAgICAgICAgICAgdm5vZGUuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHJlbmRlclZOb2RlKGNoaWxkLCBlbGVtZW50KSk7XG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcmVuZGVyVk5vZGUodm5vZGUsIGNvbnRhaW5lcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1ZOb2RlKG5vZGU6IHVua25vd24pOiBub2RlIGlzIFZOb2RlIHtcbiAgICByZXR1cm4gKFxuICAgICAgICBub2RlICE9PSBudWxsICYmXG4gICAgICAgIHR5cGVvZiBub2RlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgIFwidHlwZVwiIGluIG5vZGUgJiZcbiAgICAgICAgXCJwcm9wc1wiIGluIG5vZGUgJiZcbiAgICAgICAgXCJjaGlsZHJlblwiIGluIG5vZGVcbiAgICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNGdW5jdGlvbkNvbXBvbmVudChcbiAgICB2YWx1ZTogdW5rbm93bixcbik6IHZhbHVlIGlzIEZ1bmN0aW9uQ29tcG9uZW50IHtcbiAgICByZXR1cm4gKFxuICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgICAgICAoIShcInByb3RvdHlwZVwiIGluIHZhbHVlKSB8fCAhdmFsdWUucHJvdG90eXBlPy5yZW5kZXIpXG4gICAgKTtcbn1cblxuLy9leHBvcnQgZnVuY3Rpb24gcmVuZGVyKHZub2RlOiBWTm9kZUNoaWxkLCBjb250YWluZXI6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4vLyAgICBpZiAodm5vZGUgPT0gbnVsbCkgcmV0dXJuO1xuLy9cbi8vICAgIC8vIEhhbmRsZSBwcmltaXRpdmUgdmFsdWVzXG4vLyAgICBpZiAoXG4vLyAgICAgICAgdHlwZW9mIHZub2RlID09PSBcInN0cmluZ1wiIHx8XG4vLyAgICAgICAgdHlwZW9mIHZub2RlID09PSBcIm51bWJlclwiIHx8XG4vLyAgICAgICAgdHlwZW9mIHZub2RlID09PSBcImJvb2xlYW5cIlxuLy8gICAgKSB7XG4vLyAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKFN0cmluZyh2bm9kZSkpKTtcbi8vICAgICAgICByZXR1cm47XG4vLyAgICB9XG4vL1xuLy8gICAgLy8gSGFuZGxlIGFycmF5c1xuLy8gICAgaWYgKEFycmF5LmlzQXJyYXkodm5vZGUpKSB7XG4vLyAgICAgICAgdm5vZGUuZm9yRWFjaCgoY2hpbGQpID0+IHJlbmRlcihjaGlsZCwgY29udGFpbmVyKSk7XG4vLyAgICAgICAgcmV0dXJuO1xuLy8gICAgfVxuLy9cbi8vICAgIC8vIEhhbmRsZSBWTm9kZVxuLy8gICAgaWYgKCFpc1ZOb2RlKHZub2RlKSkgcmV0dXJuO1xuLy9cbi8vICAgIC8vIEhhbmRsZSBmdW5jdGlvbiBjb21wb25lbnRzXG4vLyAgICBpZiAodHlwZW9mIHZub2RlLnR5cGUgPT09IFwiZnVuY3Rpb25cIikge1xuLy8gICAgICAgIGNvbnN0IENvbXBvbmVudCA9IHZub2RlLnR5cGUgYXMgRnVuY3Rpb25Db21wb25lbnQ7XG4vLyAgICAgICAgY29uc3QgcmVzdWx0ID0gQ29tcG9uZW50KHZub2RlLnByb3BzLCB7IGVtaXQoKSB7fSB9KTtcbi8vICAgICAgICBpZiAocmVzdWx0KSByZW5kZXIocmVzdWx0LCBjb250YWluZXIpO1xuLy8gICAgICAgIHJldHVybjtcbi8vICAgIH1cbi8vXG4vLyAgICAvLyBIYW5kbGUgRnJhZ21lbnRcbi8vICAgIGlmICh2bm9kZS50eXBlID09PSBcIkZyYWdtZW50XCIpIHtcbi8vICAgICAgICB2bm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gcmVuZGVyKGNoaWxkLCBjb250YWluZXIpKTtcbi8vICAgICAgICByZXR1cm47XG4vLyAgICB9XG4vL1xuLy8gICAgLy8gQ3JlYXRlIGVsZW1lbnQgKG9ubHkgZm9yIHN0cmluZyB0eXBlcyBub3cpXG4vLyAgICBpZiAodHlwZW9mIHZub2RlLnR5cGUgPT09IFwic3RyaW5nXCIpIHtcbi8vICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh2bm9kZS50eXBlKTtcbi8vXG4vLyAgICAgICAgLy8gQXBwbHkgcHJvcHNcbi8vICAgICAgICBpZiAodm5vZGUucHJvcHMpIHtcbi8vICAgICAgICAgICAgT2JqZWN0LmVudHJpZXModm5vZGUucHJvcHMpLmZvckVhY2goKFtrZXksIHZhbHVlXSkgPT4ge1xuLy8gICAgICAgICAgICAgICAgLy8gSGFuZGxlIHJlZlxuLy8gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJyZWZcIiAmJiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuLy8gICAgICAgICAgICAgICAgICAgIHZhbHVlKGVsZW1lbnQpO1xuLy8gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICAgICAvLyBIYW5kbGUgZXZlbnQgbGlzdGVuZXJzXG4vLyAgICAgICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoXCJvblwiKSAmJiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIikge1xuLy8gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50VHlwZSA9IGtleVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMilcbi8vICAgICAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgYXMga2V5b2YgSFRNTEVsZW1lbnRFdmVudE1hcDtcbi8vICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRUeXBlLCB2YWx1ZSBhcyBFdmVudExpc3RlbmVyKTtcbi8vICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4vLyAgICAgICAgICAgICAgICB9XG4vL1xuLy8gICAgICAgICAgICAgICAgLy8gSGFuZGxlIHN0eWxlIG9iamVjdFxuLy8gICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gXCJzdHlsZVwiICYmIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuLy8gICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24oZWxlbWVudC5zdHlsZSwgdmFsdWUpO1xuLy8gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbi8vICAgICAgICAgICAgICAgIH1cbi8vXG4vLyAgICAgICAgICAgICAgICAvLyBIYW5kbGUgY2xhc3NOYW1lXG4vLyAgICAgICAgICAgICAgICBpZiAoa2V5ID09PSBcImNsYXNzTmFtZVwiICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuLy8gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gdmFsdWU7XG4vLyAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuLy8gICAgICAgICAgICAgICAgfVxuLy9cbi8vICAgICAgICAgICAgICAgIC8vIEhhbmRsZSByZWd1bGFyIGF0dHJpYnV0ZXNcbi8vICAgICAgICAgICAgICAgIGlmIChcbi8vICAgICAgICAgICAgICAgICAgICB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIiAmJlxuLy8gICAgICAgICAgICAgICAgICAgIHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIiAmJlxuLy8gICAgICAgICAgICAgICAgICAgIGtleSAhPT0gXCJrZXlcIlxuLy8gICAgICAgICAgICAgICAgKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LCBTdHJpbmcodmFsdWUpKTtcbi8vICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgfSk7XG4vLyAgICAgICAgfVxuLy9cbi8vICAgICAgICAvLyBSZW5kZXIgY2hpbGRyZW5cbi8vICAgICAgICB2bm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gcmVuZGVyKGNoaWxkLCBlbGVtZW50KSk7XG4vLyAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuLy8gICAgfVxuLy99XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHJlbmRlciB9IGZyb20gXCIuL2xpYi9yZW5kZXJcIjtcblxuY29uc3QgQXBwID0gKCkgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8aDE+SGVsbG8gQ3VzdG9tIEpTWCE8L2gxPlxuICAgICAgICAgICAgPGJ1dHRvbiBvbmNsaWNrPXsoKSA9PiBhbGVydChcIkNsaWNrZWQhXCIpfT5DbGljayBtZTwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufTtcblxuY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm9vdFwiKTtcbmlmIChyb290KSB7XG4gICAgcmVuZGVyKDxBcHAgLz4sIHJvb3QpO1xufVxuIl0sIm5hbWVzIjpbImNyZWF0ZUVsZW1lbnQiLCJ0eXBlIiwicHJvcHMiLCJjaGlsZHJlbiIsInJlc3RQcm9wcyIsIl9vYmplY3RXaXRob3V0UHJvcGVydGllcyIsIl9leGNsdWRlZCIsIm5vcm1hbGl6ZWRDaGlsZHJlbiIsIkFycmF5IiwiaXNBcnJheSIsImpzeCIsImpzeHMiLCJGcmFnbWVudCIsImRpZmYiLCJvbGRWTm9kZSIsIm5ld1ZOb2RlIiwicmVzdWx0IiwidHlwZUNoYW5nZWQiLCJjaGlsZHJlbkNoYW5nZWQiLCJtYXhMZW5ndGgiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwiaSIsImNoaWxkRGlmZiIsInB1c2giLCJPYmplY3QiLCJrZXlzIiwiaXNWTm9kZSIsInByb3BzQ2hhbmdlZCIsIm9sZFByb3BzIiwibmV3UHJvcHMiLCJhbGxQcm9wcyIsIlNldCIsImZvckVhY2giLCJrZXkiLCJub2RlIiwiaXNGdW5jdGlvbkNvbXBvbmVudCIsInZhbHVlIiwiX3ZhbHVlJHByb3RvdHlwZSIsInByb3RvdHlwZSIsInJlbmRlciIsInZub2RlIiwiY29udGFpbmVyIiwiYXBwbHlQcm9wcyIsImVsZW1lbnQiLCJlbnRyaWVzIiwiX3JlZiIsInN0YXJ0c1dpdGgiLCJldmVudFR5cGUiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFzc2lnbiIsInN0eWxlIiwiY2xhc3NOYW1lIiwic2V0QXR0cmlidXRlIiwiU3RyaW5nIiwicmVuZGVyVk5vZGUiLCJhcHBlbmRDaGlsZCIsImRvY3VtZW50IiwiY3JlYXRlVGV4dE5vZGUiLCJjaGlsZCIsIkNvbXBvbmVudCIsImVtaXQiLCJxdWVyeVNlbGVjdG9yIiwiY29uY2F0IiwiY2hpbGRyZW5EaWZmIiwiaW5uZXJIVE1MIiwiX2pzeCIsIl9qc3hzIiwiQXBwIiwib25jbGljayIsImFsZXJ0Iiwicm9vdCIsImdldEVsZW1lbnRCeUlkIl0sInNvdXJjZVJvb3QiOiIifQ==