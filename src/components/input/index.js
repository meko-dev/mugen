import { html, render } from 'uhtml'; 
import classNames from '../../class-names.js';
import css from './style.css';

const style = new CSSStyleSheet();
style.replaceSync(css);

export default class Component extends HTMLElement {
  static formAssociated = true;
  #shadowRoot = null;
  #state = {};
  #internals = null;

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: 'closed' });
    this.#shadowRoot.adoptedStyleSheets = [style];
    this.#internals = this.attachInternals();
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['value', 'placeholder', 'type', 'disabled', 'readonly'];
  }

  async attributeChangedCallback(name, oldValue, value) {
    if (oldValue === value) { return; }

    if (name === 'value') {
      this.#state.value = value;
      this.#internals.setFormValue(value);
    } else if (name === 'placeholder') {
      this.#state.placeholder = value;
    } else if (name === 'type') {
      this.#state.type = value;
    } else if (name === 'disabled') {
      this.#state.disabled = (value === '' || value !== 'false') && value !== null;
    } else if (name === 'readonly') {
      this.#state.readonly = (value === '' || value !== 'false') && value !== null;
    }

    this.render();
  }
  
  render() {
    const classes = classNames('mgn-input',
      { 'mgn-input--disabled': this.#state.disabled },
      { 'mgn-input--readonly': this.#state.readonly },
      { 'mgn-input--error': this.#state.type === 'error' },
      { 'mgn-input--success': this.#state.type === 'success' },
      { 'mgn-input--warning': this.#state.type === 'warning' }
    );

    const labelClasses = classNames('mgn-input__label',
      { 'mgn-input__label--visible': this.#state.labelVisible },
      { 'mgn-input__label--error': this.#state.type === 'error' }
    );

    const detailsClasses = classNames('mgn-input__details',
      { 'mgn-input__details--visible': this.#state.detailsVisible },
      { 'mgn-input__details--error': this.#state.type === 'error' }
    );

    render(this.#shadowRoot, html`
      <div class="${labelClasses}">
        <slot name="label" onslotchange=${this.#onLabelSlotChange.bind(this)}></slot>
      </div>

      <input type="text" part="input" value="${this.#state.value}" placeholder="${this.#state.placeholder}" ?disabled="${this.#state.disabled}" ?readonly="${this.#state.readonly}" class="${classes}">
    
      <div class="${detailsClasses}">
        <slot name="details" onslotchange=${this.#onDetailsSlotChange.bind(this)}></slot>
      </div>
    `);
  }

  #onLabelSlotChange(event) {
    this.#state.labelVisible = !!event.target.assignedNodes().length;
    this.render();
  }

  #onDetailsSlotChange(event) {
    this.#state.detailsVisible = !!event.target.assignedNodes().length;
    this.render();
  }
}
