var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// src/components/icon/style.css
var style_default = ':host{align-items:center;display:inline-flex;justify-content:center;min-height:24px;min-width:24px;font-size:var(--font-size, 16px)}:host(:where([size="small"])){min-height:16px;min-width:16px}svg{vertical-align:top}\n';

// src/components/icon/index.js
var style = new CSSStyleSheet();
style.replaceSync(style_default);
var _shadowRoot, _markup, _src, _size, _color, _loadSVG, loadSVG_fn, _createLoadingPromise, createLoadingPromise_fn;
var Component = class extends HTMLElement {
  constructor() {
    super();
    __privateAdd(this, _loadSVG);
    __privateAdd(this, _createLoadingPromise);
    __privateAdd(this, _shadowRoot, null);
    __privateAdd(this, _markup, null);
    __privateAdd(this, _src, null);
    __privateAdd(this, _size, null);
    __privateAdd(this, _color, "currentColor");
    __privateSet(this, _shadowRoot, this.attachShadow({ mode: "closed" }));
    __privateGet(this, _shadowRoot).adoptedStyleSheets = [style];
  }
  static get observedAttributes() {
    return ["src", "color", "size"];
  }
  async attributeChangedCallback(name, oldValue, value) {
    if (oldValue === value) {
      return;
    }
    if (name === "src") {
      __privateSet(this, _src, value);
      await __privateMethod(this, _loadSVG, loadSVG_fn).call(this);
    } else if (name === "color") {
      __privateSet(this, _color, value);
    } else if (name === "size") {
      __privateSet(this, _size, value);
    }
    this.render();
  }
  async connectedCallback() {
    this.render();
  }
  render() {
    if (!__privateGet(this, _markup)) {
      return;
    }
    __privateGet(this, _shadowRoot).innerHTML = __privateGet(this, _markup);
    const element = __privateGet(this, _shadowRoot).querySelector("svg");
    element.style.color = __privateGet(this, _color);
    if (__privateGet(this, _size) === "small") {
      element.setAttribute("width", "16");
      element.setAttribute("height", "16");
    }
  }
};
_shadowRoot = new WeakMap();
_markup = new WeakMap();
_src = new WeakMap();
_size = new WeakMap();
_color = new WeakMap();
_loadSVG = new WeakSet();
loadSVG_fn = async function() {
  if (!__privateGet(this, _src)) {
    return;
  }
  const icon = this.constructor.loadedIcons[__privateGet(this, _src)];
  if (typeof icon === "string") {
    return __privateSet(this, _markup, icon);
  }
  if (!icon) {
    const request = fetch(__privateGet(this, _src));
    this.constructor.loadedIcons[__privateGet(this, _src)] = __privateMethod(this, _createLoadingPromise, createLoadingPromise_fn).call(this, request);
  }
  try {
    __privateSet(this, _markup, await this.constructor.loadedIcons[__privateGet(this, _src)]);
  } catch (e) {
    console.error(e, this);
  }
};
_createLoadingPromise = new WeakSet();
createLoadingPromise_fn = function(request) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await request;
      if (!response.ok) {
        __privateSet(this, _markup, "");
        return reject(`tiim-icon > Invalid URL '${__privateGet(this, _src)}'`);
      }
      __privateSet(this, _markup, await response.text());
      resolve(__privateGet(this, _markup));
    } catch (e) {
      __privateSet(this, _markup, "");
      reject(`tiim-icon > Error loading '${__privateGet(this, _src)}'`);
    }
  });
};
__publicField(Component, "loadedIcons", {});
export {
  Component as default
};
