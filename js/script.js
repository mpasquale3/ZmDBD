// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Hero Slider
class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.querySelector('.slider-arrow.prev');
        this.nextBtn = document.querySelector('.slider-arrow.next');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        if (this.slides.length > 0) {
            this.init();
        }
    }
    
    init() {
        // Create dots
        this.createDots();
        
        // Add event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Start auto-play
        this.startAutoPlay();
        
        // Pause on hover
        const sliderContainer = document.querySelector('.hero-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => this.stopAutoPlay());
            sliderContainer.addEventListener('mouseleave', () => this.startAutoPlay());
        }
    }
    
    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
        this.dots = document.querySelectorAll('.dot');
    }
    
    updateSlide() {
        // Remove active class from all slides and dots
        this.slides.forEach(slide => slide.classList.remove('active'));
        if (this.dots) {
            this.dots.forEach(dot => dot.classList.remove('active'));
        }
        
        // Add active class to current slide and dot
        this.slides[this.currentSlide].classList.add('active');
        if (this.dots && this.dots[this.currentSlide]) {
            this.dots[this.currentSlide].classList.add('active');
        }
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlide();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlide();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlide();
    }
    
    startAutoPlay() {
        this.slideInterval = setInterval(() => this.nextSlide(), 5000);
    }
    
    stopAutoPlay() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HeroSlider();
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add active class to nav links based on current page
const currentLocation = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    if (link.getAttribute('href') === currentLocation.split('/').pop() || 
        (currentLocation === '/' && link.getAttribute('href') === 'index.html')) {
        link.classList.add('active');
    }
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just log it and show a success message
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Thank you for your message! We\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .review-card, .difference-card, .portfolio-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});