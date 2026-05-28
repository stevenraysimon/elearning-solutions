// js/components/diploma-modal-component.js
class DiplomaModalComponent extends HTMLElement {
    constructor() {
        super();
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }

    connectedCallback() {
        this.innerHTML = `
        <div class="blackOverlay modal-overlay"></div>
            <div class="diploma-modal">
                <div class="diploma-modal-inner">
                    <button class="diploma-modal-close" aria-label="Close">&times;</button>
                    <picture>
                        <source srcset="images/diploma.webp" type="image/webp">
                        <img src="images/diploma.jpeg" alt="NYU Interactive Telecommunications Program Diploma">
                    </picture>
                </div>
            </div>
        `;

        const overlay = this.querySelector('.modal-overlay');
        const closeBtn = this.querySelector('.diploma-modal-close');

        overlay.addEventListener('click', this.closeModal);
        closeBtn.addEventListener('click', this.closeModal);

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && this.querySelector('.diploma-modal').style.display === 'block') {
                this.closeModal();
            }
        });

        document.addEventListener('openDiplomaModal', () => {
            this.openModal();
        });
    }

    openModal() {
        const modal = this.querySelector('.diploma-modal');
        const overlay = this.querySelector('.modal-overlay');

        overlay.style.display = 'block';
        modal.style.display = 'flex';

        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            modal.style.opacity = '1';
        });
    }

    closeModal() {
        const modal = this.querySelector('.diploma-modal');
        const overlay = this.querySelector('.modal-overlay');

        modal.style.display = 'none';
        overlay.style.display = 'none';
        overlay.style.opacity = '0';
        modal.style.opacity = '0';
    }
}

customElements.define('diploma-modal', DiplomaModalComponent);