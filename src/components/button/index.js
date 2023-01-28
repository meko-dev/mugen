import { html, render } from 'uhtml'; 
import classNames from '../../class-names.js';
import css from './style.css';

const style = new CSSStyleSheet();
style.replaceSync(css);

export default class Component extends HTMLElement {
  #shadowRoot = null;
  #state = {};

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: 'closed' });
    this.#shadowRoot.adoptedStyleSheets = [style];
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ['type', 'variant', 'disabled', 'fluid'];
  }

  async attributeChangedCallback(name, oldValue, value) {
    if (oldValue === value) { return; }

    if (name === 'type') {
      this.#state.type = value;
    } else if (name === 'variant') {
      this.#state.variant = value;
    } else if (name === 'disabled') {
      this.#state.disabled = (value === '' || value !== 'false') && value !== null;
    } else if (name === 'fluid') {
      this.#state.fluid = (value === '' || value !== 'false') && value !== null;
    }

    this.render();
  }
  
  render() {
    const classes = classNames('mgn-button',
      { 'mgn-button--muted': this.#state.variant === 'muted' },
      { 'mgn-button--ghost': this.#state.variant === 'ghost' },
      { 'mgn-button--disabled': this.#state.disabled },
      { 'mgn-button--fluid': this.#state.fluid }
    );

    render(this.#shadowRoot, html`
      <button part="input" type="${this.#state.type}" ?disabled="${this.#state.disabled}" class="${classes}" onclick="${this.#onClick.bind(this)}"><slot></slot></button>
    `);
  }

  #onClick(event) {
    this.dispatchEvent(new MouseEvent('click'));
    
    if (this.#state.type === 'submit') {
      const form = this.closest('form');

      if (form) {
        event.preventDefault();
        form.submit();
      }
    }
  }
}
