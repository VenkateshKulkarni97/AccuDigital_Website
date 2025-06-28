// DOM Elements
const navbar = document.getElementById('navbar');
const navMenu = document.getElementById('nav-menu');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelectorAll('.nav-link');
const heroCtaBtn = document.getElementById('hero-cta');
const heroDemoBtn = document.getElementById('hero-demo');
const serviceCards = document.querySelectorAll('.service-card');
const sliderBtns = document.querySelectorAll('.slider-btn');
const caseStudies = document.querySelectorAll('.case-study');
const statNumbers = document.querySelectorAll('.stat-number');
const contactForm = document.getElementById('contact-form');

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeHeroInteractions();
    initializeServiceCards();
    initializeCaseStudySlider();
    initializeScrollEffects();
    initializeStatsAnimation();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeFloatingShapes();
});

// Navigation Functions
function initializeNavigation() {
    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active nav link highlighting
    updateActiveNavLink();
    window.addEventListener('scroll', updateActiveNavLink);
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
}

// Hero Section Interactions
function initializeHeroInteractions() {
    // CTA Button click
    heroCtaBtn.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
        
        // Add ripple effect
        createRippleEffect(heroCtaBtn, event);
    });

    // Demo button click
    heroDemoBtn.addEventListener('click', () => {
        // Simulate demo modal or redirect
        showNotification('Demo feature coming soon!', 'info');
    });

    // Animate hero elements on load
    animateHeroElements();
}

function animateHeroElements() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroButtons = document.querySelector('.hero-buttons');
    const dashboardMockup = document.querySelector('.dashboard-mockup');

    // Stagger animations
    setTimeout(() => heroTitle.style.animation = 'fadeInUp 1s ease-out forwards', 100);
    setTimeout(() => heroSubtitle.style.animation = 'fadeInUp 1s ease-out forwards', 300);
    setTimeout(() => heroButtons.style.animation = 'fadeInUp 1s ease-out forwards', 500);
    setTimeout(() => dashboardMockup.style.animation = 'fadeInRight 1s ease-out forwards', 700);
}

// Service Cards Interactions
function initializeServiceCards() {
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            
            // Add glow effect
            const iconCircle = card.querySelector('.icon-circle');
            if (iconCircle) {
                iconCircle.style.boxShadow = '0 0 30px rgba(33, 150, 243, 0.5)';
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            
            const iconCircle = card.querySelector('.icon-circle');
            if (iconCircle) {
                iconCircle.style.boxShadow = 'none';
            }
        });

        card.addEventListener('click', () => {
            const service = card.getAttribute('data-service');
            showServiceDetails(service);
        });
    });
}

function showServiceDetails(service) {
    const serviceDetails = {
        strategy: {
            title: 'Marketing Strategy',
            description: 'Comprehensive analysis and strategic planning for your business growth.',
            features: ['Market Research', 'Competitor Analysis', 'Growth Roadmap', 'KPI Setup']
        },
        digital: {
            title: 'Digital Marketing',
            description: 'Multi-channel digital campaigns that drive results.',
            features: ['PPC Management', 'Social Media Marketing', 'Email Campaigns', 'SEO Optimization']
        },
        content: {
            title: 'Content Creation',
            description: 'Engaging content that builds brand authority and drives conversions.',
            features: ['Blog Writing', 'Video Production', 'Graphic Design', 'Copywriting']
        },
        analytics: {
            title: 'Analytics & Reporting',
            description: 'Detailed insights and performance tracking for data-driven decisions.',
            features: ['Performance Dashboards', 'ROI Analysis', 'Custom Reports', 'Data Visualization']
        }
    };

    const details = serviceDetails[service];
    showNotification(`${details.title}: ${details.description}`, 'info');
}

// Case Study Slider
function initializeCaseStudySlider() {
    let currentSlide = 0;
    const totalSlides = caseStudies.length;

    // Auto-advance slider
    setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000);

    // Manual slider controls
    sliderBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
}

function showSlide(index) {
    // Hide all slides
    caseStudies.forEach(slide => slide.classList.remove('active'));
    sliderBtns.forEach(btn => btn.classList.remove('active'));

    // Show current slide
    caseStudies[index].classList.add('active');
    sliderBtns[index].classList.add('active');

    // Animate metrics
    const activeSlide = caseStudies[index];
    const metricValues = activeSlide.querySelectorAll('.metric-value');
    
    metricValues.forEach(metric => {
        animateCounter(metric);
    });
}

// Scroll Effects and Animations
function initializeScrollEffects() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for stats section
                if (entry.target.classList.contains('stats-container')) {
                    animateStats();
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.service-card, .case-study, .feature-item, .contact-method, .stats-container');
    animatedElements.forEach(el => observer.observe(el));
}

// Stats Animation
function initializeStatsAnimation() {
    // This will be triggered by scroll observer
}

function animateStats() {
    statNumbers.forEach(stat => {
        animateCounter(stat);
    });
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const start = performance.now();
    const startValue = 0;

    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(startValue + (target - startValue) * easeOutQuart);
        
        // Format large numbers
        if (target >= 1000000) {
            element.textContent = (current / 1000000).toFixed(1) + 'M';
        } else if (target >= 1000) {
            element.textContent = (current / 1000).toFixed(0) + 'K';
        } else {
            element.textContent = current + (target > 100 ? '%' : '');
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Contact Form
function initializeContactForm() {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission
            await simulateFormSubmission(data);
            
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            
        } catch (error) {
            showNotification('Error sending message. Please try again.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Form field animations
    const formInputs = contactForm.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });
}

async function simulateFormSubmission(data) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Form submitted:', data);
            resolve();
        }, 2000);
    });
}

// Smooth Scrolling
function initializeSmoothScrolling() {
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
}

// Floating Shapes Animation
function initializeFloatingShapes() {
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            shape.style.transform = `translateX(${randomX}px) translateY(${randomY}px) rotate(${Math.random() * 360}deg)`;
        }, 3000 + index * 1000);
    });
}

// Utility Functions
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #F44336, #d32f2f)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #2196F3, #1976d2)';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.8s ease-out forwards;
    }
    
    .form-group.focused input,
    .form-group.focused select,
    .form-group.focused textarea {
        border-color: var(--primary-teal);
        box-shadow: 0 0 0 3px rgba(0, 188, 212, 0.1);
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;

document.head.appendChild(style);

// Initialize everything
console.log('AccuDigital website initialized successfully!');
