// js/components/menu-component.js
class MenuComponent extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="menu-icon" id="menuIcon" role="button" aria-label="Open navigation menu" tabindex="0">
                <div class="bar" id="barOne"></div>
                <div class="bar" id="barTwo"></div>
            </div>

            <div class="blackOverlay nav-overlay" id="navOverlay"></div>

            <nav class="mainnav" id="mainNav" aria-label="Main navigation">
                <ul>
                    <li><a href="#services" onclick="menuComponent.closeMenu()">Services</a></li>
                    <li><a href="#how-it-works" onclick="menuComponent.closeMenu()">How It Works</a></li>
                    <li><a href="#about" onclick="menuComponent.closeMenu()">About</a></li>
                    <li><a href="#faq" onclick="menuComponent.closeMenu()">FAQ</a></li>
                    <li><a href="#" onclick="document.dispatchEvent(new CustomEvent('openQuoteModal')); menuComponent.closeMenu(); return false;">Get a Quote</a></li>
                </ul>
            </nav>
        `;

        const menuIcon = this.querySelector('#menuIcon');
        const navOverlay = this.querySelector('#navOverlay');

        menuIcon.addEventListener('click', () => this.toggleMenu());
        menuIcon.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') this.toggleMenu();
        });
        navOverlay.addEventListener('click', () => this.closeMenu());

        // Make closeMenu available globally for inline onclick
        window.menuComponent = this;
    }

    toggleMenu() {
        this.isOpen ? this.closeMenu() : this.openMenu();
    }

    openMenu() {
        const nav = this.querySelector('#mainNav');
        const overlay = this.querySelector('#navOverlay');
        const barOne = this.querySelector('#barOne');
        const barTwo = this.querySelector('#barTwo');

        this.isOpen = true;
        nav.style.display = 'block';
        overlay.style.display = 'block';

        requestAnimationFrame(() => {
            nav.style.left = '0';
            overlay.style.opacity = '1';
        });

        barOne.style.transform = 'rotate(45deg) translate(5px, 5px)';
        barTwo.style.transform = 'rotate(-45deg) translate(3px, -3px)';
        barTwo.style.marginTop = '9px';
        barOne.style.backgroundColor = 'white';
        barTwo.style.backgroundColor = 'white';

        document.body.classList.add('my-body-noscroll-class');
    }

    closeMenu() {
        const nav = this.querySelector('#mainNav');
        const overlay = this.querySelector('#navOverlay');
        const barOne = this.querySelector('#barOne');
        const barTwo = this.querySelector('#barTwo');

        this.isOpen = false;
        nav.style.left = '-300px';
        overlay.style.opacity = '0';

        barOne.style.transform = '';
        barTwo.style.transform = '';
        barTwo.style.marginTop = '';
        // Let the IntersectionObserver in main.js restore the correct color
        // by re-reading the hero visibility state
        const hero = document.getElementById('hero');
        if (hero) {
            const heroBottom = hero.getBoundingClientRect().bottom;
            const color = heroBottom > 0 ? 'white' : '#0057AD';
            barOne.style.backgroundColor = color;
            barTwo.style.backgroundColor = color;
        }

        setTimeout(() => {
            nav.style.display = 'none';
            overlay.style.display = 'none';
        }, 300);

        document.body.classList.remove('my-body-noscroll-class');
    }
}

customElements.define('menu-component', MenuComponent);