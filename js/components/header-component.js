// js/components/header-component.js
class HeaderComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <a href="/">
                    <picture>
                        <source srcset="/elearning-solutions/images/logo.webp" type="image/webp"
                            sizes="(max-width: 600px) 80vw, 280px" width="800" height="220">
                        <img src="/elearning-solutions/images/logo.png"
                            alt="eLearning Solutions by Steven Simon"
                            title="eLearning Solutions by Steven Simon"
                            class="logo"
                            style="width: 100%; height: auto;"
                            width="800" height="220">
                    </picture>
                </a>
                <div class="inside-wrapper">
                    <p>Custom eLearning courses, tools, and games — built for the way people actually learn.<br>
                    <button onclick="document.dispatchEvent(new CustomEvent('openQuoteModal')); playSound('pop');" class="hero-button">Get a Quote</button></p>
                </div>
                <icon-nav-component></icon-nav-component>
            </header>
        `;
    }
}

customElements.define('header-component', HeaderComponent);
