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
    return ['type', 'variant', 'disabled', 'fluid', 'size'];
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
    } else if (name === 'size') {
      this.#state.size = value;
    }

    this.render();
  }
  
  render() {
    const classes = classNames('mgn-button',
      { 'mgn-button--accent': this.#state.variant === 'accent' },
      { 'mgn-button--muted': this.#state.variant === 'muted' },
      { 'mgn-button--ghost': this.#state.variant === 'ghost' },
      { 'mgn-button--disabled': this.#state.disabled },
      { 'mgn-button--fluid': this.#state.fluid },
      { 'mgn-button--small': this.#state.size === 'small' }
    );

    render(this.#shadowRoot, html`
      <button part="input" type="${this.#state.type || 'button'}" ?disabled="${this.#state.disabled}" class="${classes}" onclick="${this.#onClick.bind(this)}"><slot></slot></button>
    `);
  }

  #onClick(event) {
    if (this.#state.type !== 'submit') { return; }

    const form = this.closest('form');
    if (!form) { return; }

    event.preventDefault();
    form.submit();
  }
}
