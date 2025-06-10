// ADAS Safe - Main JavaScript

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(20px)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'var(--glass)';
        nav.style.boxShadow = 'none';
    }
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

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Handle home page
        if ((currentPage === 'index.html' || currentPage === '') && 
            (href === 'index.html' || href === '/' || href.includes('#home'))) {
            link.classList.add('active');
        }
        // Handle other pages
        else if (href.includes(currentPage)) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Initialize animations on page load
function initializeAnimations() {
    // Observe all feature, service cards, and FAQ items
    document.querySelectorAll('.feature-card, .service-card, .faq-item, .content-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// Parallax effect for hero section (only on homepage)
function initializeParallax() {
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            
            if (scrolled < window.innerHeight) {
                hero.style.transform = `translateY(${scrolled * 0.5}px)`;
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
                    heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
                }
            }
        });
    }
}

// FAQ Accordion functionality
function initializeFAQ() {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const wasActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!wasActive) {
                faqItem.classList.add('active');
            }
        });
    });
}

// Career Stage Accordion functionality
function initializeCareerStages() {
    document.querySelectorAll('.career-stage-header').forEach(header => {
        header.addEventListener('click', () => {
            const careerStage = header.parentElement;
            const wasActive = careerStage.classList.contains('active');
            
            // Close all career stages
            document.querySelectorAll('.career-stage').forEach(stage => {
                stage.classList.remove('active');
            });
            
            // Open clicked stage if it wasn't active
            if (!wasActive) {
                careerStage.classList.add('active');
            }
        });
    });
}

// Form handling - Now handled by forms.js
function initializeForms() {
    // Form handlers moved to forms.js for better organization
    // This function is kept for compatibility
}

// Mobile menu toggle (for future mobile menu implementation)
function initializeMobileMenu() {
    // This can be expanded when adding a mobile hamburger menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('mobile-open');
        });
    }
}

// Smooth scroll to next section from hero
function scrollToNextSection() {
    // Check if we're on careers page
    const careersHero = document.querySelector('.careers-hero');
    if (careersHero) {
        const nextSection = document.querySelector('.join-us-section');
        if (nextSection) {
            const targetPosition = nextSection.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    } else {
        // We're on homepage, scroll to about section with padding
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - 120;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Enhanced scroll effects for both pages
function initializeScrollEffects() {
    // Careers page specific effects
    const careersHero = document.querySelector('.careers-hero');
    const heroVideo = document.querySelector('.hero-video');
    const heroOverlay = document.querySelector('.hero-video-overlay');
    
    // Homepage specific effects
    const homepageHero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Careers page effects
        if (careersHero && heroVideo && heroOverlay) {
            const heroHeight = careersHero.offsetHeight;
            const scrollProgress = Math.min(scrolled / heroHeight, 1);
            
            // Parallax effect on video
            heroVideo.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrollProgress * 0.1})`;
            
            // Fade out overlay content
            heroOverlay.style.opacity = 1 - (scrollProgress * 0.8);
            
            // Subtle hero container transform
            careersHero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        // Homepage effects
        if (homepageHero && heroContent) {
            const heroHeight = homepageHero.offsetHeight;
            const scrollProgress = Math.min(scrolled / heroHeight, 1);
            
            // Parallax effect on hero content
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrollProgress * 0.6);
            
            // Parallax effect on floating cards
            floatingCards.forEach((card, index) => {
                const speed = 0.1 + (index * 0.05);
                card.style.transform = `translateY(${scrolled * speed}px)`;
                card.style.opacity = 1 - (scrollProgress * 0.7);
            });
            
            // Grid background parallax
            const gridBg = document.querySelector('.grid-bg');
            if (gridBg) {
                gridBg.style.transform = `translate(${scrolled * 0.05}px, ${scrolled * 0.05}px)`;
            }
        }
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setActiveNavLink();
    initializeAnimations();
    initializeParallax();
    initializeFAQ();
    initializeCareerStages();
    initializeForms();
    initializeMobileMenu();
    initializeScrollEffects();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        setActiveNavLink();
    }
});