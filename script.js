
// ---- LOADER ----
const loader = document.getElementById('loader-wrapper');
const minimumLoaderTime = 5000;
const pageLoadStartTime = performance.now();

window.addEventListener('load', function () {
    if (!loader) {
        return;
    }

    const elapsedLoadTime = performance.now() - pageLoadStartTime;
    const waitTime = Math.max(minimumLoaderTime - elapsedLoadTime, 0);

    setTimeout(() => {
        loader.classList.add('hidden');
    }, waitTime);
});

// ---- HAMBURGER TOGGLE ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });
}

// ---- HEADER SCROLL EFFECT ----
const header = document.getElementById('header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ---- HERO STATS MARQUEE DUPLICATION AND SLIDE ----
const heroStatsTrack = document.querySelector('.hero-stats-track');
if (heroStatsTrack) {
    const stats = Array.from(heroStatsTrack.children);
    if (stats.length) {
        stats.forEach(stat => {
            const clone = stat.cloneNode(true);
            heroStatsTrack.appendChild(clone);
        });

        const style = window.getComputedStyle(heroStatsTrack);
        const gap = parseFloat(style.gap || '0') || 0;
        const originalWidth = stats.reduce((sum, stat) => {
            return sum + stat.getBoundingClientRect().width;
        }, 0) + gap * Math.max(stats.length - 1, 0);

        let start = 0;
        const speed = 1.2;

        function tick() {
            start += speed;
            if (start >= originalWidth) {
                start = 0;
            }

            heroStatsTrack.style.transform = `translateX(${-start}px)`;
            requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }
}

// ---- CAROUSEL SCROLL EFFECT ----
const carouselTrack = document.querySelector(".services-carousel__track");
const carouselLeft = document.querySelector(".services-carousel__nav--left");
const carouselRight = document.querySelector(".services-carousel__nav--right");

if (carouselTrack && carouselLeft && carouselRight) {
    const getScrollAmount = () => {
        const firstCard = carouselTrack.querySelector(".service-card");
        if (!firstCard) {
            return 280;
        }

        const styles = window.getComputedStyle(carouselTrack);
        const gap = parseFloat(styles.columnGap || styles.gap || "16") || 16;
        return firstCard.getBoundingClientRect().width + gap;
    };

    carouselLeft.addEventListener("click", () => {
        carouselTrack.scrollBy({
            left: -getScrollAmount(),
            behavior: "smooth"
        });
    });

    carouselRight.addEventListener("click", () => {
        carouselTrack.scrollBy({
            left: getScrollAmount(),
            behavior: "smooth"
        });
    });

    let isDragging = false;
    let startX = 0;
    let startLeft = 0;

    carouselTrack.addEventListener("pointerdown", (event) => {
        isDragging = true;
        startX = event.clientX;
        startLeft = carouselTrack.scrollLeft;

        try {
            carouselTrack.setPointerCapture(event.pointerId);
        } catch (error) {
            // If the pointer was already released before capture, ignore it.
        }

        carouselTrack.classList.add("dragging");
    });

    carouselTrack.addEventListener("pointermove", (event) => {
        if (!isDragging) return;

        const dx = event.clientX - startX;
        carouselTrack.scrollLeft = startLeft - dx;
    });

    const stopDragging = (event) => {
        if (!isDragging) return;

        isDragging = false;
        carouselTrack.classList.remove("dragging");

        if (event && event.pointerId !== undefined) {
            try {
                carouselTrack.releasePointerCapture(event.pointerId);
            } catch (error) {
                // Pointer may already be released.
            }
        }
    };

    carouselTrack.addEventListener("pointerup", stopDragging);
    carouselTrack.addEventListener("pointercancel", stopDragging);
}

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.btn');
        if (!btn) return;

        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#2e7d32';
            btn.style.boxShadow = '0 4px 14px rgba(46, 125, 50, 0.4)';

            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.style.boxShadow = '';
                btn.disabled = false;
                contactForm.reset();
            }, 2400);
        }, 1600);
    });
}

// ---- NEWSLETTER FORM ----
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = newsletterForm.querySelector('.btn');
        const input = newsletterForm.querySelector('input');
        if (!btn) return;

        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            btn.style.background = '#2e7d32';
            btn.style.boxShadow = '0 4px 14px rgba(46, 125, 50, 0.4)';

            setTimeout(() => {
                btn.innerHTML = original;
                btn.style.background = '';
                btn.style.boxShadow = '';
                btn.disabled = false;
                if (input) {
                    input.value = '';
                }
            }, 2400);
        }, 1400);
    });
}

// ---- SMOOTH ANCHOR OFFSET ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});
