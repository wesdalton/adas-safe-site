// ADAS Safe - Main JavaScript

// ========================================
// UTILITY FUNCTIONS
// ========================================

// Helper function to create accordion functionality
function createAccordion(triggerSelector, containerSelector) {
    document.querySelectorAll(triggerSelector).forEach(trigger => {
        trigger.addEventListener('click', () => {
            const container = trigger.closest(containerSelector);
            const wasActive = container.classList.contains('active');
            
            // Close all accordion items
            document.querySelectorAll(containerSelector).forEach(item => {
                item.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!wasActive) {
                container.classList.add('active');
            }
        });
    });
}

// Helper function to toggle mobile menu
function toggleMobileMenu(hamburger, mobileNav, isOpen) {
    hamburger.classList.toggle('active', isOpen);
    mobileNav.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

// ========================================
// NAVIGATION
// ========================================

// Set active navigation link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash;
    const allNavLinks = document.querySelectorAll('.nav-links a, .mobile-nav a:not(.cta-button)');
    
    allNavLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Define matching conditions
        const conditions = {
            locations: href === 'mobile.html#locations' && currentPage === 'mobile.html' && currentHash === '#locations',
            mobile: href === 'mobile.html' && currentPage === 'mobile.html' && (!currentHash || currentHash === ''),
            home: (href === 'index.html' || href === '/' || href === '#about' || href === 'index.html#about') && 
                  (currentPage === 'index.html' || currentPage === ''),
            careers: href === 'careers.html' && currentPage === 'careers.html',
            contact: href === 'contact.html' && currentPage === 'contact.html'
        };
        
        if (Object.values(conditions).some(condition => condition)) {
            link.classList.add('active');
        }
    });
}

// ========================================
// SCROLL EFFECTS
// ========================================

// Navbar scroll effect
function initializeNavbarScroll() {
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            nav.style.background = 'var(--glass)';
            nav.style.boxShadow = 'none';
        }
    });
}

// Enhanced scroll effects for hero sections
function initializeScrollEffects() {
    const careersHero = document.querySelector('.careers-hero');
    const heroVideo = document.querySelector('.hero-video');
    const heroOverlay = document.querySelector('.hero-video-overlay');
    const homepageHero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Careers page effects
        if (careersHero && heroVideo && heroOverlay) {
            const heroHeight = careersHero.offsetHeight;
            const scrollProgress = Math.min(scrolled / heroHeight, 1);
            
            heroVideo.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrollProgress * 0.1})`;
            heroOverlay.style.opacity = 1 - (scrollProgress * 0.8);
            careersHero.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
        
        // Homepage effects
        if (homepageHero && heroContent) {
            const heroHeight = homepageHero.offsetHeight;
            const scrollProgress = Math.min(scrolled / heroHeight, 1);
            
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrollProgress * 0.6);
            
            floatingCards.forEach((card, index) => {
                const speed = 0.1 + (index * 0.05);
                card.style.transform = `translateY(${scrolled * speed}px)`;
                card.style.opacity = 1 - (scrollProgress * 0.7);
            });
            
            const gridBg = document.querySelector('.grid-bg');
            if (gridBg) {
                gridBg.style.transform = `translate(${scrolled * 0.05}px, ${scrolled * 0.05}px)`;
            }
        }
    });
}


// Smooth scroll for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('nav')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle locations link specifically (from other pages)
    document.querySelectorAll('a[href="mobile.html#locations"]').forEach(link => {
        link.addEventListener('click', function(e) {
            // If we're already on mobile.html, handle the scroll
            if (window.location.pathname.includes('mobile.html')) {
                e.preventDefault();
                const target = document.querySelector('#locations');
                if (target) {
                    const navHeight = document.querySelector('nav')?.offsetHeight || 80;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL hash
                    history.pushState(null, null, '#locations');
                    setActiveNavLink();
                }
            }
            // If we're on a different page, let the browser navigate normally
        });
    });
}

// Smooth scroll to next section from hero
function scrollToNextSection() {
    const careersHero = document.querySelector('.careers-hero');
    
    if (careersHero) {
        const nextSection = document.querySelector('.join-us-section');
        if (nextSection) {
            const targetPosition = nextSection.getBoundingClientRect().top + window.pageYOffset - 100;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    } else {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const targetPosition = aboutSection.getBoundingClientRect().top + window.pageYOffset - 120;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    }
}

// ========================================
// ANIMATIONS
// ========================================

// Intersection Observer for fade-in animations
function initializeAnimations() {
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
    
    document.querySelectorAll('.feature-card, .service-card, .faq-item, .content-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// ========================================
// INTERACTIVE COMPONENTS
// ========================================

// FAQ and Career Stage Accordions
function initializeFAQ() {
    createAccordion('.faq-question', '.faq-item');
}

function initializeCareerStages() {
    createAccordion('.career-stage-header', '.career-stage');
}

// Mobile menu functionality
function initializeMobileMenu() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (!hamburgerMenu || !mobileNav) return;
    
    // Toggle menu on hamburger click
    hamburgerMenu.addEventListener('click', () => {
        const isOpen = !mobileNav.classList.contains('active');
        toggleMobileMenu(hamburgerMenu, mobileNav, isOpen);
    });
    
    // Close menu when clicking on links
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu(hamburgerMenu, mobileNav, false);
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburgerMenu.contains(e.target) && !mobileNav.contains(e.target)) {
            toggleMobileMenu(hamburgerMenu, mobileNav, false);
        }
    });
}

// Form handling (placeholder for forms.js compatibility)
function initializeForms() {
    // Form handlers moved to forms.js for better organization
    // This function is kept for compatibility
}

// ========================================
// INITIALIZATION
// ========================================

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setActiveNavLink();
    initializeNavbarScroll();
    initializeSmoothScroll();
    initializeAnimations();
    initializeScrollEffects();
    initializeFAQ();
    initializeCareerStages();
    initializeForms();
    initializeMobileMenu();
    
    // Handle initial hash navigation (e.g., direct links to #locations)
    if (window.location.hash) {
        setTimeout(() => {
            const target = document.querySelector(window.location.hash);
            if (target) {
                const navHeight = document.querySelector('nav')?.offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100); // Small delay to ensure page is fully loaded
    }
});

// Handle navigation updates
['visibilitychange', 'hashchange'].forEach(event => {
    document.addEventListener(event === 'visibilitychange' ? event : 'hashchange', () => {
        if (event === 'visibilitychange' && document.hidden) return;
        setActiveNavLink();
    });
});

// Make scrollToNextSection globally available for HTML onclick handlers
window.scrollToNextSection = scrollToNextSection;