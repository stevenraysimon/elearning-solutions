// js/components/quote-button-component.js
class QuoteButtonComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <button class="book-now-button" id="quoteBtn"
                onclick="document.dispatchEvent(new CustomEvent('openQuoteModal')); playSound('pop');"
                aria-label="Get a Quote">
                Get a Quote
            </button>
        `;

        const btn = this.querySelector('#quoteBtn');
        const mobileQuery = window.matchMedia('(max-width: 700px)');
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            if (!mobileQuery.matches) return;

            const hero = document.getElementById('hero');
            if (!hero) return;

            const currentScrollY = window.scrollY;
            const heroBottom = hero.getBoundingClientRect().bottom;
            const scrollingUp = currentScrollY < lastScrollY;

            if (heroBottom < 0 && scrollingUp) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        mobileQuery.addEventListener('change', handleScroll);
    }
}

customElements.define('quote-button-component', QuoteButtonComponent);