import './styles/spacing.css';
import './styles/theme.css';
import css from './styles/main.css';

import Icon from './components/icon/index.js';
import Input from './components/input/index.js';
import Button from './components/button/index.js';
import Card from './components/card/index.js';

const style = new CSSStyleSheet();
style.replaceSync(css);
document.adoptedStyleSheets = [...document.adoptedStyleSheets, style];

customElements.define('mgn-icon', Icon);
customElements.define('mgn-input', Input);
customElements.define('mgn-button', Button);
customElements.define('mgn-card', Card);
