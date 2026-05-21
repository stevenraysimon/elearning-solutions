// js/main.js

// ── Global sound function (matches caricature site) ────────────
function playSound(id) {
    const audio = document.getElementById(id);
    if (audio) {
        audio.currentTime = 0;
        audio.play();
    }
}

// ── Menu bar color — white in hero, blue (#0057AD) when scrolled past ──
window.addEventListener('load', () => {
    const hero = document.getElementById('hero');

    const initMenuObserver = () => {
        const bars = document.querySelectorAll('.menu-icon .bar');
        if (!bars.length || !hero) return;

        const observer = new IntersectionObserver(([entry]) => {
            const color = entry.isIntersecting ? 'white' : '#0057AD';
            bars.forEach(bar => bar.style.backgroundColor = color);
        }, { threshold: 0 });

        observer.observe(hero);
    };

    initMenuObserver();
    setTimeout(initMenuObserver, 200);

    // ── Sound on all link clicks ───────────────────────────────
    const pop = document.getElementById('pop');
    if (pop) {
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                pop.currentTime = 0;
                pop.play();
            });
        });
    }
});

// ── FAQ Accordion with slide animation ─────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const makeTime = 175;
    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('.fa');

        // Initialize all answers as hidden
        answer.style.display = 'none';
        answer.style.overflow = 'hidden';
        if (icon) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }

        question.addEventListener('click', function () {
            const isOpen = answer.style.display !== 'none';

            // Close all other open answers first
            document.querySelectorAll('.answer').forEach(a => {
                if (a !== answer && a.style.display !== 'none') {
                    const h = a.scrollHeight;
                    a.style.height = `${h}px`;
                    setTimeout(() => { a.style.height = '0px'; }, 0);
                    setTimeout(() => {
                        a.style.display = 'none';
                        a.style.height = '';
                    }, makeTime);
                }
            });
            document.querySelectorAll('.question .fa').forEach(i => {
                if (i !== icon) {
                    i.classList.remove('fa-chevron-up');
                    i.classList.add('fa-chevron-down');
                }
            });

            if (!isOpen) {
                // Slide down
                answer.style.display = 'block';
                answer.style.height = '0px';
                const fullHeight = answer.scrollHeight;
                answer.style.height = `${fullHeight}px`;
                if (icon) {
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                }
                setTimeout(() => { answer.style.height = ''; }, makeTime);
            } else {
                // Slide up
                const currentHeight = answer.scrollHeight;
                answer.style.height = `${currentHeight}px`;
                setTimeout(() => { answer.style.height = '0px'; }, 0);
                setTimeout(() => {
                    answer.style.display = 'none';
                    answer.style.height = '';
                    if (icon) {
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                    }
                }, makeTime);
            }
        });
    });
});

// ── Smooth scroll for anchor links ─────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});