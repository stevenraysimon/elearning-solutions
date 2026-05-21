// js/components/carousel-component.js
class CarouselComponent extends HTMLElement {
    constructor() {
        super();
        this.currentIndex = 0;
        this.images = [];
        this.autoplayTimer = null;
        this.tallestHeight = 0;
        this.intervalMs = 4000; // each slide shows for 4 seconds
    }

    connectedCallback() {
        this.images = Array.from(this.querySelectorAll('img'));
        if (this.images.length === 0) return;

        this.render();
        this.measureAndLock();
        this.scheduleAutoplay();
    }

    disconnectedCallback() {
        clearInterval(this.autoplayTimer);
    }

    render() {
        const slides = this.images.map((img, i) => `
            <div class="carousel-slide${i === 0 ? ' active' : ''}" data-index="${i}">
                <img src="${img.src}" alt="${img.alt || ''}" loading="${i === 0 ? 'eager' : 'lazy'}">
            </div>
        `).join('');

        const dots = this.images.map((_, i) => `
            <button class="carousel-dot${i === 0 ? ' active' : ''}" data-dot="${i}" aria-label="Go to slide ${i + 1}"></button>
        `).join('');

        this.innerHTML = `
            <div class="carousel-wrapper">
                <div class="carousel" role="region" aria-label="Image slideshow">
                    <div class="carousel-track">
                        ${slides}
                    </div>
                </div>
                <div class="carousel-controls">
                    <button class="carousel-btn prev-btn" aria-label="Previous slide">
                        <i class="fa fa-chevron-left"></i>
                    </button>
                    <div class="carousel-dots">${dots}</div>
                    <button class="carousel-btn next-btn" aria-label="Next slide">
                        <i class="fa fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;

        this.querySelector('.prev-btn').addEventListener('click', () => {
            this.prev();
            this.restartTimer();
        });
        this.querySelector('.next-btn').addEventListener('click', () => {
            this.next();
            this.restartTimer();
        });

        this.querySelectorAll('.carousel-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                this.goTo(parseInt(dot.dataset.dot));
                this.restartTimer();
            });
        });
    }

    measureAndLock() {
        const carousel = this.querySelector('.carousel');
        const allImgs = this.querySelectorAll('.carousel-slide img');
        let loaded = 0;

        const checkDone = () => {
            loaded++;
            if (loaded === allImgs.length) this.setHeight();
        };

        allImgs.forEach(img => {
            if (img.complete) checkDone();
            else {
                img.addEventListener('load', checkDone);
                img.addEventListener('error', checkDone);
            }
        });

        window.addEventListener('resize', () => this.setHeight(), { passive: true });
    }

    setHeight() {
        const carousel = this.querySelector('.carousel');
        if (!carousel) return;

        const slides = this.querySelectorAll('.carousel-slide');
        let maxHeight = 0;

        slides.forEach(slide => {
            const img = slide.querySelector('img');
            if (!img) return;
            const ratio = img.naturalHeight / img.naturalWidth;
            const renderedHeight = carousel.offsetWidth * ratio;
            if (renderedHeight > maxHeight) maxHeight = renderedHeight;
        });

        if (maxHeight > 0) {
            carousel.style.height = maxHeight + 'px';
            this.tallestHeight = maxHeight;
        }
    }

    goTo(index) {
        const slides = this.querySelectorAll('.carousel-slide');
        const dots = this.querySelectorAll('.carousel-dot');

        slides[this.currentIndex].classList.remove('active');
        dots[this.currentIndex].classList.remove('active');

        this.currentIndex = (index + slides.length) % slides.length;

        slides[this.currentIndex].classList.add('active');
        dots[this.currentIndex].classList.add('active');
    }

    next() { this.goTo(this.currentIndex + 1); }
    prev() { this.goTo(this.currentIndex - 1); }

    scheduleAutoplay() {
        // Find this carousel's index among all carousels on the page
        const allCarousels = Array.from(document.querySelectorAll('carousel-component'));
        const myIndex = allCarousels.indexOf(this);
        const staggerDelay = myIndex * 3000; // 3s stagger per carousel

        setTimeout(() => {
            this.startTimer();
        }, staggerDelay);
    }

    startTimer() {
        this.autoplayTimer = setInterval(() => {
            this.next();
        }, this.intervalMs);
    }

    restartTimer() {
        clearInterval(this.autoplayTimer);
        this.startTimer();
    }
}

customElements.define('carousel-component', CarouselComponent);