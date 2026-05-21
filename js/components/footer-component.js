// js/components/footer-component.js
class FooterComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <footer>
                <div class="wrapper footer">
                    <p>eLearning Solutions by Steven Simon &nbsp;&bull;&nbsp; Designed and developed by Steven Simon <span id="el-footer-year"></span></p>
                </div>
            </footer>
        `;

        const yearEl = this.querySelector('#el-footer-year');
        if (yearEl) {
            yearEl.textContent = new Date().getFullYear();
        }
    }
}

customElements.define('footer-component', FooterComponent);
