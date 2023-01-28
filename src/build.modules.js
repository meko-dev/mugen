export * as Icon from './components/icon.js';
export * as Input from './components/input.js';
export * as Button from './components/button.js';

export const defineComponent = (tagName, component) => {
  window.customElements.define(tagName, component);
};
