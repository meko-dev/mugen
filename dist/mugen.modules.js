import * as Icon from "./components/icon.js";
import * as Input from "./components/input.js";
import * as Button from "./components/button.js";
const defineComponent = (tagName, component) => {
  window.customElements.define(tagName, component);
};
export {
  Button,
  Icon,
  Input,
  defineComponent
};
