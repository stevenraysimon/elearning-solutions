// js/components/icon-nav-component.js
class IconNavComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <nav>
                <a href="tel:3462910862" title="Call Steven Simon" target="_top">
                    <i class="fa fa-phone"></i>
                </a>

                <a href="mailto:stevenraysimon@gmail.com" title="Email Steven Simon" target="_top">
                    <i class="fa fa-envelope"></i>
                </a>

                <a href="https://www.linkedin.com/in/steven-ray-simon" title="LinkedIn" target="_blank">
                    <i class="fa fa-linkedin"></i>
                </a>

                <a href="https://srs815.github.io/portfolio/" title="Portfolio" target="_blank">
                    <i class="fa fa-briefcase"></i>
                </a>

                <a href="https://stevensimon.art" title="Caricatures by Steven Simon" target="_blank">
                    <i class="fa fa-smile-o"></i>
                </a>
            </nav>
        `;
    }
}

customElements.define('icon-nav-component', IconNavComponent);
