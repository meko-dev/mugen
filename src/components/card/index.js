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
    return ['variant'];
  }

  async attributeChangedCallback(name, oldValue, value) {
    if (oldValue === value) { return; }

    if (name === 'variant') {
      this.#state.variant = value;
    }

    this.render();
  }
  
  render() {
    const classes = classNames('mgn-card',
      { 'mgn-card--highlight': this.#state.variant === 'highlight' }
    );

    render(this.#shadowRoot, html`
      <div class="${classes}">
        <div class="mgn-card__title">
          <slot name="title" onslotchange=${this.#onTitleSlotChange.bind(this)}></slot>
          <div class="mgn-card__actions">
            <slot name="actions"></slot>
          </div>
        </div>
        <slot name="content"></slot>
        <div class="mgn-card__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `);
  }

  #onTitleSlotChange(event) {
    this.#state.titleVisible = !!event.target.assignedNodes().length;
    this.render();
  }
}
