(() => {
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
  var __privateSet = (obj, member, value, setter2) => {
    __accessCheck(obj, member, "write to private field");
    setter2 ? setter2.call(obj, value) : member.set(obj, value);
    return value;
  };
  var __privateMethod = (obj, member, method) => {
    __accessCheck(obj, member, "access private method");
    return method;
  };

  // src/styles/main.css
  var main_default = ".mgn-card{background:#fff;box-shadow:var(--mgn-shadow-level-1-muted);border-radius:8px}:root{--mgn-color-highlight: 105, 108, 255;--mgn-color-muted: 133, 146, 163;--mgn-color-error: 255, 62, 29;--mgn-color-success: 113, 221, 55;--mgn-color-warning: 255, 171, 0;--mgn-color-background-highlight: var(--mgn-color-highlight);--mgn-color-background-highlight-hover: 64, 86, 228;--mgn-color-background-highlight-active: 49, 71, 213;--mgn-color-background-muted: 235, 238, 240;--mgn-color-background-muted-hover: 120, 131, 147;--mgn-color-background-muted-active: 101, 110, 124;--mgn-color-highlight-shadow: rgba(var(--mgn-color-highlight), .4);--mgn-color-muted-shadow: rgba(var(--mgn-color-muted), .4);--mgn-color-error-shadow: rgba(var(--mgn-color-error), .4);--mgn-color-success-shadow: rgba(var(--mgn-color-success), .4);--mgn-color-warning-shadow: rgba(var(--mgn-color-warning), .4);--mgn-shadow-level-1: 0 .125rem .25rem 0;--mgn-shadow-level-1-highlight: var(--mgn-shadow-level-1) var(--mgn-color-highlight-shadow);--mgn-shadow-level-1-muted: var(--mgn-shadow-level-1) var(--mgn-color-muted-shadow);--mgn-shadow-level-1-error: var(--mgn-shadow-level-1) var(--mgn-color-error-shadow);--mgn-shadow-level-1-success: var(--mgn-shadow-level-1) var(--mgn-color-success-shadow);--mgn-shadow-level-1-warning: var(--mgn-shadow-level-1) var(--mgn-color-warning-shadow)}html{background-color:#f5f5f9}\n";

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

  // node_modules/@webreflection/mapset/esm/index.js
  var MapSet = class extends Map {
    set(key, value) {
      super.set(key, value);
      return value;
    }
  };
  var WeakMapSet = class extends WeakMap {
    set(key, value) {
      super.set(key, value);
      return value;
    }
  };

  // node_modules/@webreflection/uparser/esm/index.js
  var empty = /^(?:area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr)$/i;
  var elements = /<([a-z]+[a-z0-9:._-]*)([^>]*?)(\/?)>/g;
  var attributes = /([^\s\\>"'=]+)\s*=\s*(['"]?)\x01/g;
  var holes = /[\x01\x02]/g;
  var esm_default = (template, prefix2, svg2) => {
    let i = 0;
    return template.join("").trim().replace(
      elements,
      (_, name, attrs, selfClosing) => {
        let ml = name + attrs.replace(attributes, "=$2$1").trimEnd();
        if (selfClosing.length)
          ml += svg2 || empty.test(name) ? " /" : "></" + name;
        return "<" + ml + ">";
      }
    ).replace(
      holes,
      (hole) => hole === "" ? "<!--" + prefix2 + i++ + "-->" : prefix2 + i++
    );
  };

  // node_modules/@webreflection/uwire/esm/index.js
  var ELEMENT_NODE = 1;
  var nodeType = 111;
  var remove = ({ firstChild, lastChild }) => {
    const range = document.createRange();
    range.setStartAfter(firstChild);
    range.setEndAfter(lastChild);
    range.deleteContents();
    return firstChild;
  };
  var diffable = (node, operation) => node.nodeType === nodeType ? 1 / operation < 0 ? operation ? remove(node) : node.lastChild : operation ? node.valueOf() : node.firstChild : node;
  var persistent = (fragment) => {
    const { firstChild, lastChild } = fragment;
    if (firstChild === lastChild)
      return lastChild || fragment;
    const { childNodes } = fragment;
    const nodes = [...childNodes];
    return {
      ELEMENT_NODE,
      nodeType,
      firstChild,
      lastChild,
      valueOf() {
        if (childNodes.length !== nodes.length)
          fragment.append(...nodes);
        return fragment;
      }
    };
  };

  // node_modules/uarray/esm/index.js
  var { isArray } = Array;
  var { indexOf, slice } = [];

  // node_modules/uhandlers/esm/index.js
  var useForeign = false;
  var Foreign = class {
    constructor(handler, value) {
      useForeign = true;
      this._ = (...args) => handler(...args, value);
    }
  };
  var aria = (node) => (values) => {
    for (const key in values) {
      const name = key === "role" ? key : `aria-${key}`;
      const value = values[key];
      if (value == null)
        node.removeAttribute(name);
      else
        node.setAttribute(name, value);
    }
  };
  var getValue = (value) => value == null ? value : value.valueOf();
  var attribute = (node, name) => {
    let oldValue, orphan = true;
    const attributeNode = document.createAttributeNS(null, name);
    return (newValue) => {
      const value = useForeign && newValue instanceof Foreign ? newValue._(node, name) : getValue(newValue);
      if (oldValue !== value) {
        if ((oldValue = value) == null) {
          if (!orphan) {
            node.removeAttributeNode(attributeNode);
            orphan = true;
          }
        } else {
          attributeNode.value = value;
          if (orphan) {
            node.setAttributeNodeNS(attributeNode);
            orphan = false;
          }
        }
      }
    };
  };
  var boolean = (node, key, oldValue) => (newValue) => {
    const value = !!getValue(newValue);
    if (oldValue !== value) {
      if (oldValue = value)
        node.setAttribute(key, "");
      else
        node.removeAttribute(key);
    }
  };
  var data = ({ dataset }) => (values) => {
    for (const key in values) {
      const value = values[key];
      if (value == null)
        delete dataset[key];
      else
        dataset[key] = value;
    }
  };
  var event = (node, name) => {
    let oldValue, lower, type = name.slice(2);
    if (!(name in node) && (lower = name.toLowerCase()) in node)
      type = lower.slice(2);
    return (newValue) => {
      const info = isArray(newValue) ? newValue : [newValue, false];
      if (oldValue !== info[0]) {
        if (oldValue)
          node.removeEventListener(type, oldValue, info[1]);
        if (oldValue = info[0])
          node.addEventListener(type, oldValue, info[1]);
      }
    };
  };
  var ref = (node) => {
    let oldValue;
    return (value) => {
      if (oldValue !== value) {
        oldValue = value;
        if (typeof value === "function")
          value(node);
        else
          value.current = node;
      }
    };
  };
  var setter = (node, key) => key === "dataset" ? data(node) : (value) => {
    node[key] = value;
  };
  var text = (node) => {
    let oldValue;
    return (newValue) => {
      const value = getValue(newValue);
      if (oldValue != value) {
        oldValue = value;
        node.textContent = value == null ? "" : value;
      }
    };
  };

  // node_modules/udomdiff/esm/index.js
  var esm_default2 = (parentNode, a, b, get, before) => {
    const bLength = b.length;
    let aEnd = a.length;
    let bEnd = bLength;
    let aStart = 0;
    let bStart = 0;
    let map = null;
    while (aStart < aEnd || bStart < bEnd) {
      if (aEnd === aStart) {
        const node = bEnd < bLength ? bStart ? get(b[bStart - 1], -0).nextSibling : get(b[bEnd - bStart], 0) : before;
        while (bStart < bEnd)
          parentNode.insertBefore(get(b[bStart++], 1), node);
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map || !map.has(a[aStart]))
            parentNode.removeChild(get(a[aStart], -1));
          aStart++;
        }
      } else if (a[aStart] === b[bStart]) {
        aStart++;
        bStart++;
      } else if (a[aEnd - 1] === b[bEnd - 1]) {
        aEnd--;
        bEnd--;
      } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
        const node = get(a[--aEnd], -1).nextSibling;
        parentNode.insertBefore(
          get(b[bStart++], 1),
          get(a[aStart++], -1).nextSibling
        );
        parentNode.insertBefore(get(b[--bEnd], 1), node);
        a[aEnd] = b[bEnd];
      } else {
        if (!map) {
          map = /* @__PURE__ */ new Map();
          let i = bStart;
          while (i < bEnd)
            map.set(b[i], i++);
        }
        if (map.has(a[aStart])) {
          const index = map.get(a[aStart]);
          if (bStart < index && index < bEnd) {
            let i = aStart;
            let sequence = 1;
            while (++i < aEnd && i < bEnd && map.get(a[i]) === index + sequence)
              sequence++;
            if (sequence > index - bStart) {
              const node = get(a[aStart], 0);
              while (bStart < index)
                parentNode.insertBefore(get(b[bStart++], 1), node);
            } else {
              parentNode.replaceChild(
                get(b[bStart++], 1),
                get(a[aStart++], -1)
              );
            }
          } else
            aStart++;
        } else
          parentNode.removeChild(get(a[aStart++], -1));
      }
    }
    return b;
  };

  // node_modules/uhtml/esm/utils.js
  var { isArray: isArray2, prototype } = Array;
  var { indexOf: indexOf2 } = prototype;
  var {
    createDocumentFragment,
    createElement,
    createElementNS,
    createTextNode,
    createTreeWalker,
    importNode
  } = new Proxy(document, {
    get: (target, method) => target[method].bind(target)
  });
  var createHTML = (html2) => {
    const template = createElement("template");
    template.innerHTML = html2;
    return template.content;
  };
  var xml;
  var createSVG = (svg2) => {
    if (!xml)
      xml = createElementNS("http://www.w3.org/2000/svg", "svg");
    xml.innerHTML = svg2;
    const content = createDocumentFragment();
    content.append(...xml.childNodes);
    return content;
  };
  var createContent = (text2, svg2) => svg2 ? createSVG(text2) : createHTML(text2);

  // node_modules/uhtml/esm/handlers.js
  var reducePath = ({ childNodes }, i) => childNodes[i];
  var diff = (comment, oldNodes, newNodes) => esm_default2(
    comment.parentNode,
    // TODO: there is a possible edge case where a node has been
    //       removed manually, or it was a keyed one, attached
    //       to a shared reference between renders.
    //       In this case udomdiff might fail at removing such node
    //       as its parent won't be the expected one.
    //       The best way to avoid this issue is to filter oldNodes
    //       in search of those not live, or not in the current parent
    //       anymore, but this would require both a change to uwire,
    //       exposing a parentNode from the firstChild, as example,
    //       but also a filter per each diff that should exclude nodes
    //       that are not in there, penalizing performance quite a lot.
    //       As this has been also a potential issue with domdiff,
    //       and both lighterhtml and hyperHTML might fail with this
    //       very specific edge case, I might as well document this possible
    //       "diffing shenanigan" and call it a day.
    oldNodes,
    newNodes,
    diffable,
    comment
  );
  var handleAnything = (comment) => {
    let oldValue, text2, nodes = [];
    const anyContent = (newValue) => {
      switch (typeof newValue) {
        case "string":
        case "number":
        case "boolean":
          if (oldValue !== newValue) {
            oldValue = newValue;
            if (!text2)
              text2 = createTextNode("");
            text2.data = newValue;
            nodes = diff(comment, nodes, [text2]);
          }
          break;
        case "object":
        case "undefined":
          if (newValue == null) {
            if (oldValue != newValue) {
              oldValue = newValue;
              nodes = diff(comment, nodes, []);
            }
            break;
          }
          if (isArray2(newValue)) {
            oldValue = newValue;
            if (newValue.length === 0)
              nodes = diff(comment, nodes, []);
            else if (typeof newValue[0] === "object")
              nodes = diff(comment, nodes, newValue);
            else
              anyContent(String(newValue));
            break;
          }
          if (oldValue !== newValue) {
            if ("ELEMENT_NODE" in newValue) {
              oldValue = newValue;
              nodes = diff(
                comment,
                nodes,
                newValue.nodeType === 11 ? [...newValue.childNodes] : [newValue]
              );
            } else {
              const value = newValue.valueOf();
              if (value !== newValue)
                anyContent(value);
            }
          }
          break;
        case "function":
          anyContent(newValue(comment));
          break;
      }
    };
    return anyContent;
  };
  var handleAttribute = (node, name) => {
    switch (name[0]) {
      case "?":
        return boolean(node, name.slice(1), false);
      case ".":
        return setter(node, name.slice(1));
      case "@":
        return event(node, "on" + name.slice(1));
      case "o":
        if (name[1] === "n")
          return event(node, name);
    }
    switch (name) {
      case "ref":
        return ref(node);
      case "aria":
        return aria(node);
    }
    return attribute(
      node,
      name
      /*, svg*/
    );
  };
  function handlers(options) {
    const { type, path } = options;
    const node = path.reduceRight(reducePath, this);
    return type === "node" ? handleAnything(node) : type === "attr" ? handleAttribute(
      node,
      options.name
      /*, options.svg*/
    ) : text(node);
  }

  // node_modules/uhtml/esm/rabbit.js
  var createPath = (node) => {
    const path = [];
    let { parentNode } = node;
    while (parentNode) {
      path.push(indexOf2.call(parentNode.childNodes, node));
      node = parentNode;
      ({ parentNode } = node);
    }
    return path;
  };
  var prefix = "is\xB5";
  var cache = new WeakMapSet();
  var textOnly = /^(?:textarea|script|style|title|plaintext|xmp)$/;
  var createCache = () => ({
    stack: [],
    // each template gets a stack for each interpolation "hole"
    entry: null,
    // each entry contains details, such as:
    //  * the template that is representing
    //  * the type of node it represents (html or svg)
    //  * the content fragment with all nodes
    //  * the list of updates per each node (template holes)
    //  * the "wired" node or fragment that will get updates
    // if the template or type are different from the previous one
    // the entry gets re-created each time
    wire: null
    // each rendered node represent some wired content and
    // this reference to the latest one. If different, the node
    // will be cleaned up and the new "wire" will be appended
  });
  var createEntry = (type, template) => {
    const { content, updates } = mapUpdates(type, template);
    return { type, template, content, updates, wire: null };
  };
  var mapTemplate = (type, template) => {
    const svg2 = type === "svg";
    const text2 = esm_default(template, prefix, svg2);
    const content = createContent(text2, svg2);
    const tw = createTreeWalker(content, 1 | 128);
    const nodes = [];
    const length = template.length - 1;
    let i = 0;
    let search = `${prefix}${i}`;
    while (i < length) {
      const node = tw.nextNode();
      if (!node)
        throw `bad template: ${text2}`;
      if (node.nodeType === 8) {
        if (node.data === search) {
          nodes.push({ type: "node", path: createPath(node) });
          search = `${prefix}${++i}`;
        }
      } else {
        while (node.hasAttribute(search)) {
          nodes.push({
            type: "attr",
            path: createPath(node),
            name: node.getAttribute(search)
          });
          node.removeAttribute(search);
          search = `${prefix}${++i}`;
        }
        if (textOnly.test(node.localName) && node.textContent.trim() === `<!--${search}-->`) {
          node.textContent = "";
          nodes.push({ type: "text", path: createPath(node) });
          search = `${prefix}${++i}`;
        }
      }
    }
    return { content, nodes };
  };
  var mapUpdates = (type, template) => {
    const { content, nodes } = cache.get(template) || cache.set(template, mapTemplate(type, template));
    const fragment = importNode(content, true);
    const updates = nodes.map(handlers, fragment);
    return { content: fragment, updates };
  };
  var unroll = (info, { type, template, values }) => {
    const length = unrollValues(info, values);
    let { entry } = info;
    if (!entry || (entry.template !== template || entry.type !== type))
      info.entry = entry = createEntry(type, template);
    const { content, updates, wire } = entry;
    for (let i = 0; i < length; i++)
      updates[i](values[i]);
    return wire || (entry.wire = persistent(content));
  };
  var unrollValues = ({ stack }, values) => {
    const { length } = values;
    for (let i = 0; i < length; i++) {
      const hole = values[i];
      if (hole instanceof Hole)
        values[i] = unroll(
          stack[i] || (stack[i] = createCache()),
          hole
        );
      else if (isArray2(hole))
        unrollValues(stack[i] || (stack[i] = createCache()), hole);
      else
        stack[i] = null;
    }
    if (length < stack.length)
      stack.splice(length);
    return length;
  };
  var Hole = class {
    constructor(type, template, values) {
      this.type = type;
      this.template = template;
      this.values = values;
    }
  };

  // node_modules/uhtml/esm/index.js
  var tag = (type) => {
    const keyed = new WeakMapSet();
    const fixed = (cache3) => (template, ...values) => unroll(
      cache3,
      { type, template, values }
    );
    return Object.assign(
      // non keyed operations are recognized as instance of Hole
      // during the "unroll", recursively resolved and updated
      (template, ...values) => new Hole(type, template, values),
      {
        // keyed operations need a reference object, usually the parent node
        // which is showing keyed results, and optionally a unique id per each
        // related node, handy with JSON results and mutable list of objects
        // that usually carry a unique identifier
        for(ref2, id) {
          const memo = keyed.get(ref2) || keyed.set(ref2, new MapSet());
          return memo.get(id) || memo.set(id, fixed(createCache()));
        },
        // it is possible to create one-off content out of the box via node tag
        // this might return the single created node, or a fragment with all
        // nodes present at the root level and, of course, their child nodes
        node: (template, ...values) => unroll(createCache(), new Hole(type, template, values)).valueOf()
      }
    );
  };
  var cache2 = new WeakMapSet();
  var render = (where, what) => {
    const hole = typeof what === "function" ? what() : what;
    const info = cache2.get(where) || cache2.set(where, createCache());
    const wire = hole instanceof Hole ? unroll(info, hole) : hole;
    if (wire !== info.wire) {
      info.wire = wire;
      where.replaceChildren(wire.valueOf());
    }
    return where;
  };
  var html = tag("html");
  var svg = tag("svg");

  // src/class-names.js
  var class_names_default = (...args) => {
    var hasOwn = {}.hasOwnProperty;
    var classes = [];
    for (var i = 0; i < args.length; i++) {
      var arg = args[i];
      if (!arg)
        continue;
      var argType = typeof arg;
      if (argType === "string" || argType === "number") {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        if (arg.length) {
          var inner = classNames.apply(null, arg);
          if (inner) {
            classes.push(inner);
          }
        }
      } else if (argType === "object") {
        if (arg.toString !== Object.prototype.toString && !arg.toString.toString().includes("[native code]")) {
          classes.push(arg.toString());
          continue;
        }
        for (var key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
    return classes.join(" ");
  };

  // src/components/input/style.css
  var style_default2 = ":host{--mgn_input-border-radius: 4px;--mgn_input-box-shadow: var(--mgn-shadow-level-1-highlight);--mgn_input-box-shadow-error: var(--mgn-shadow-level-1-error);--mgn_input-color: rgb(--mgn-color-muted-active);--mgn_input-color-border: rgb(var(--mgn-color-muted));--mgn_input-color-border-highlight: rgb(var(--mgn-color-highlight));--mgn_input-color-border-error: rgb(var(--mgn-color-error));--mgn_input-color-border-success: rgb(var(--mgn-color-success));--mgn_input-color-border-warning: rgb(var(--mgn-color-warning));--mgn_input-color-background: rgb(var(--mgn-color-background-muted));--mgn_input-font-size: 14px;--mgn_input-height: 36px;--mgn_input-padding: 0 8px}:host{display:flex;width:100%}.mgn-input{-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:#fff;border:1px solid var(--mgn_input-color-border);border-radius:var(--mgn_input-border-radius);box-sizing:border-box;color:var(--mgn_input-color);display:block;flex:1 1 auto;font-size:var(--mgn_input-font-size);font-weight:400;height:var(--mgn_input-height);line-height:1.53;padding:var(--mgn_input-padding)}.mgn-input:focus{outline:0}.mgn-input:focus:where(:not(.mgn-input--error)){background-color:#fff;border-color:var(--mgn_input-color-border-highlight);box-shadow:var(--mgn_input-box-shadow)}.mgn-input--readonly,.mgn-input--readonly:focus{background-color:var(--mgn_input-color-background)}.mgn-input--disabled,.mgn-input--disabled:focus{background-color:var(--mgn_input-color-background);cursor:not-allowed;opacity:.65}.mgn-input--error{background-color:rgba(var(--mgn-color-error),.1);border-color:var(--mgn_input-color-border-error);color:rgb(var(--mgn-color-error))}.mgn-input--error:focus{background-color:#fff;box-shadow:var(--mgn_input-box-shadow-error)}.mgn-input::-moz-placeholder{color:#b4bdc6;font-style:italic;-moz-transition:transform .1s;transition:transform .1s}.mgn-input::placeholder{color:#b4bdc6;font-style:italic;transition:transform .1s}:where(.mgn-input:focus).mgn-input::-moz-placeholder{transform:translate(4px)}:where(.mgn-input:focus).mgn-input::placeholder{transform:translate(4px)}:where(.mgn-input--error).mgn-input::-moz-placeholder{color:rgba(var(--mgn-color-error),.6)}:where(.mgn-input--error).mgn-input::placeholder{color:rgba(var(--mgn-color-error),.6)}\n";

  // src/components/input/index.js
  var style2 = new CSSStyleSheet();
  style2.replaceSync(style_default2);
  var _shadowRoot2, _state, _internals;
  var Component2 = class extends HTMLElement {
    constructor() {
      super();
      __privateAdd(this, _shadowRoot2, null);
      __privateAdd(this, _state, {});
      __privateAdd(this, _internals, null);
      __privateSet(this, _shadowRoot2, this.attachShadow({ mode: "closed" }));
      __privateGet(this, _shadowRoot2).adoptedStyleSheets = [style2];
      __privateSet(this, _internals, this.attachInternals());
    }
    connectedCallback() {
      this.render();
    }
    static get observedAttributes() {
      return ["value", "placeholder", "type", "disabled", "readonly"];
    }
    async attributeChangedCallback(name, oldValue, value) {
      if (oldValue === value) {
        return;
      }
      if (name === "value") {
        __privateGet(this, _state).value = value;
        __privateGet(this, _internals).setFormValue(value);
      } else if (name === "placeholder") {
        __privateGet(this, _state).placeholder = value;
      } else if (name === "type") {
        __privateGet(this, _state).type = value;
      } else if (name === "disabled") {
        __privateGet(this, _state).disabled = (value === "" || value !== "false") && value !== null;
      } else if (name === "readonly") {
        __privateGet(this, _state).readonly = (value === "" || value !== "false") && value !== null;
      }
      this.render();
    }
    render() {
      const classes = class_names_default(
        "mgn-input",
        { "mgn-input--disabled": __privateGet(this, _state).disabled },
        { "mgn-input--readonly": __privateGet(this, _state).readonly },
        { "mgn-input--error": __privateGet(this, _state).type === "error" },
        { "mgn-input--success": __privateGet(this, _state).type === "success" },
        { "mgn-input--warning": __privateGet(this, _state).type === "warning" }
      );
      render(__privateGet(this, _shadowRoot2), html`
      <input type="text" part="input" value="${__privateGet(this, _state).value}" placeholder="${__privateGet(this, _state).placeholder}" ?disabled="${__privateGet(this, _state).disabled}" ?readonly="${__privateGet(this, _state).readonly}" class="${classes}">
    `);
    }
  };
  _shadowRoot2 = new WeakMap();
  _state = new WeakMap();
  _internals = new WeakMap();
  __publicField(Component2, "formAssociated", true);

  // src/components/button/style.css
  var style_default3 = ":host{--mgn_button-border-radius: 4px;--mgn_button-box-shadow: var(--mgn-shadow-level-1-highlight);--mgn_button-box-shadow-muted: var(--mgn-shadow-level-1-muted);--mgn_button-color-background: rgb(var(--mgn-color-background-highlight));--mgn_button-color-background-hover: rgb(var(--mgn-color-background-highlight-hover));--mgn_button-color-background-active: rgb(var(--mgn-color-background-highlight-active));--mgn_button-color-background-muted: rgb(var(--mgn-color-background-muted));--mgn_button-color-background-muted-hover: rgb(var(--mgn-color-background-muted-hover));--mgn_button-color-background-muted-active: rgb(var(--mgn-color-background-muted-active));--mgn_button-font-size: 14px;--mgn_button-gap: 4px;--mgn_button-height: 36px;--mgn_button-padding: 0 8px}:host{display:inline-flex;vertical-align:top}:host([fluid]){display:flex;width:100%}.mgn-button{align-items:center;-webkit-appearance:none;-moz-appearance:none;appearance:none;background-color:var(--mgn_button-color-background);border:0;border-radius:var(--mgn_button-border-radius);box-sizing:border-box;box-shadow:var(--mgn_button-box-shadow);color:#fff;cursor:pointer;display:inline-flex;font-family:var(--mgn-font-family, sans-serif);font-size:var(--mgn_button-font-size);gap:var(--mgn_button-gap);height:var(--mgn_button-height);justify-content:center;padding:var(--mgn_button-padding);text-align:center;text-decoration:none;transition:transform .1s;-webkit-user-select:none;-moz-user-select:none;user-select:none;white-space:nowrap}.mgn-button:hover:where(:not(.mgn-button--disabled)){background-color:var(--mgn_button-color-background-hover);transform:translateY(-1px)}.mgn-button:active:where(:not(.mgn-button--disabled)){background-color:var(--mgn_button-color-background-active);transform:translateY(0)}.mgn-button--muted{background-color:var(--mgn_button-color-background-muted);box-shadow:none;color:#8592a3}.mgn-button--muted:hover:where(:not(.mgn-button--disabled)){background-color:var(--mgn_button-color-background-muted-hover);color:#fff;box-shadow:var(--mgn_button-box-shadow-muted)}.mgn-button--muted:active:where(:not(.mgn-button--disabled)){background-color:var(--mgn_button-color-background-muted-active);transform:translateY(0)}.mgn-button--ghost{background-color:transparent;box-shadow:none;color:#566a7f}.mgn-button--ghost:hover:where(:not(.mgn-button--disabled)){background-color:#8592a333;transform:translateY(0)}.mgn-button--ghost:active:where(:not(.mgn-button--disabled)){background-color:#8592a344;transform:translateY(0)}.mgn-button--disabled{background-color:#e7e7ff;box-shadow:none;color:rgb(var(--mgn-color-highlight));cursor:not-allowed;opacity:.65}.mgn-button--disabled:where(.mgn-button--muted){background-color:#ebeef0;color:#8592a3}.mgn-button--disabled:where(.mgn-button--ghost){background-color:transparent;color:#566a7f}.mgn-button--fluid{flex:1 1 auto}\n";

  // src/components/button/index.js
  var style3 = new CSSStyleSheet();
  style3.replaceSync(style_default3);
  var Component3 = class extends HTMLElement {
    #shadowRoot = null;
    #state = {};
    constructor() {
      super();
      this.#shadowRoot = this.attachShadow({ mode: "closed" });
      this.#shadowRoot.adoptedStyleSheets = [style3];
    }
    connectedCallback() {
      this.render();
    }
    static get observedAttributes() {
      return ["type", "variant", "disabled", "fluid"];
    }
    async attributeChangedCallback(name, oldValue, value) {
      if (oldValue === value) {
        return;
      }
      if (name === "type") {
        this.#state.type = value;
      } else if (name === "variant") {
        this.#state.variant = value;
      } else if (name === "disabled") {
        this.#state.disabled = (value === "" || value !== "false") && value !== null;
      } else if (name === "fluid") {
        this.#state.fluid = (value === "" || value !== "false") && value !== null;
      }
      this.render();
    }
    render() {
      const classes = class_names_default(
        "mgn-button",
        { "mgn-button--muted": this.#state.variant === "muted" },
        { "mgn-button--ghost": this.#state.variant === "ghost" },
        { "mgn-button--disabled": this.#state.disabled },
        { "mgn-button--fluid": this.#state.fluid }
      );
      render(this.#shadowRoot, html`
      <button part="input" type="${this.#state.type}" ?disabled="${this.#state.disabled}" class="${classes}" onclick="${this.#onClick.bind(this)}"><slot></slot></button>
    `);
    }
    #onClick(event2) {
      this.dispatchEvent(new MouseEvent("click"));
      if (this.#state.type === "submit") {
        const form = this.closest("form");
        if (form) {
          event2.preventDefault();
          form.submit();
        }
      }
    }
  };

  // src/build.browser.js
  var style4 = new CSSStyleSheet();
  style4.replaceSync(main_default);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, style4];
  customElements.define("mgn-icon", Component);
  customElements.define("mgn-input", Component2);
  customElements.define("mgn-button", Component3);
})();
/*! Bundled license information:

@webreflection/uparser/esm/index.js:
  (*! (c) Andrea Giammarchi - ISC *)
*/
