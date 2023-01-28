import css from './style.css';

const style = new CSSStyleSheet();
style.replaceSync(css);

export default class Component extends HTMLElement {
  static loadedIcons = {};

  #shadowRoot = null;
  #markup = null;
  #src = null;
  #size = null;
  #color = 'currentColor';

  constructor() {
    super();

    this.#shadowRoot = this.attachShadow({ mode: 'closed' });
    this.#shadowRoot.adoptedStyleSheets = [style];
  }

  static get observedAttributes() {
    return ['src', 'color', 'size'];
  }

  async attributeChangedCallback(name, oldValue, value) {
    if (oldValue === value) { return; }

    if (name === 'src') {
      this.#src = value;
      await this.#loadSVG();
    } else if (name === 'color') {
      this.#color = value;
    } else if (name === 'size') {
      this.#size = value;
    }

    this.render();
  }
  
  async connectedCallback() {
    this.render();
  }

  render() {
    if (!this.#markup) { return; }

    this.#shadowRoot.innerHTML = this.#markup;
    const element = this.#shadowRoot.querySelector('svg');

    element.style.color = this.#color;
    
    if (this.#size === 'small') {
      element.setAttribute('width', '16');
      element.setAttribute('height', '16');
    }
  }

  async #loadSVG() {
    if (!this.#src) { return; }

    const icon = this.constructor.loadedIcons[this.#src];

    if (typeof icon === 'string') {
      return this.#markup = icon;
    }

    if (!icon) {
      const request = fetch(this.#src);
      this.constructor.loadedIcons[this.#src] = this.#createLoadingPromise(request);
    }

    try {
      this.#markup = await this.constructor.loadedIcons[this.#src];
    } catch (e) {
      console.error(e, this);
    }
  }

  #createLoadingPromise(request) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await request;

        if (!response.ok) {
          this.#markup = '';
          return reject(`tiim-icon > Invalid URL '${this.#src}'`);
        }

        this.#markup = await response.text();

        resolve(this.#markup);
      } catch(e) {
        this.#markup = '';
        reject(`tiim-icon > Error loading '${this.#src}'`);
      }
    });
  }
}
