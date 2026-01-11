// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const backToTopBtn = document.querySelector('.back-to-top');
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const fireParticles = document.getElementById('fireParticles');
const statNumbers = document.querySelectorAll('.stat-number');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createFireParticles();
    initAnimations();
    setupEventListeners();
    startStatCounters();
});

// Create fire particles
function createFireParticles() {
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'fire-particle';
        
        // Random position
        particle.style.left = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 5 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 15}s`;
        
        // Random fire color
        const fireColors = ['#FF6B35', '#FFD700', '#FF3A20', '#FF8C00'];
        const color = fireColors[Math.floor(Math.random() * fireColors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
        
        fireParticles.appendChild(particle);
    }
}

// Initialize animations
function initAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.devise-card, .programme-card, .event-card').forEach(el => {
        observer.observe(el);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close mobile menu when clicking links
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Back to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Registration form submission
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add hover effect to navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effect to buttons
    document.querySelectorAll('.btn-fire, .btn-outline, .btn-submit, .btn-event, .btn-whatsapp').forEach(btn => {
        btn.addEventListener('mousedown', () => {
            btn.style.transform = 'scale(0.95)';
        });
        
        btn.addEventListener('mouseup', () => {
            btn.style.transform = '';
        });
        
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
    
    // WhatsApp link tracking
    document.querySelectorAll('a[href*="whatsapp"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('WhatsApp link clicked:', link.href);
        });
    });
    
    // Phone number click tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', () => {
            console.log('Phone number clicked:', link.href);
        });
    });
    
    // Add pulsating effect to WhatsApp button
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    if (whatsappBtn) {
        setInterval(() => {
            whatsappBtn.style.boxShadow = 
                whatsappBtn.style.boxShadow.includes('30px') 
                    ? '0 5px 20px rgba(37, 211, 102, 0.3)' 
                    : '0 5px 30px rgba(37, 211, 102, 0.5)';
        }, 1500);
    }
    
    // Add animation to phone link
    const phoneLink = document.querySelector('.phone-link');
    if (phoneLink) {
        phoneLink.addEventListener('click', (e) => {
            const card = e.target.closest('.spiritual-father-card');
            if (card) {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'pulse 0.5s';
                }, 10);
            }
        });
    }
}

// Handle form submission
function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        age: document.getElementById('age').value,
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Log to console (in real app, send to server)
    console.log('New member registration:', formData);
    
    // Show success message
    successMessage.style.display = 'block';
    registrationForm.style.display = 'none';
    
    // Add celebration effect
    celebrateRegistration();
    
    // Reset form after delay
    setTimeout(() => {
        registrationForm.reset();
        registrationForm.style.display = 'block';
        successMessage.style.display = 'none';
    }, 5000);
}

// Celebration effect for registration
function celebrateRegistration() {
    // Add extra fire particles
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createCelebrationParticle();
        }, i * 50);
    }
    
    // Animate devise cards
    const cards = document.querySelectorAll('.devise-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(-20px)';
            card.style.boxShadow = '0 20px 40px rgba(255, 107, 53, 0.3)';
            
            setTimeout(() => {
                card.style.transform = '';
                card.style.boxShadow = '';
            }, 500);
        }, index * 200);
    });
}

// Create celebration particles
function createCelebrationParticle() {
    const particle = document.createElement('div');
    particle.className = 'fire-particle';
    particle.style.position = 'fixed';
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.animation = 'rise 2s ease-out forwards';
    
    const colors = ['#FF6B35', '#FFD700', '#00F3FF', '#9D4EDD'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 20px ${color}`;
    
    fireParticles.appendChild(particle);
    
    // Remove after animation
    setTimeout(() => {
        particle.remove();
    }, 2000);
}

// Animated number counters
function startStatCounters() {
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current);
        }, 16);
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to flame overlay
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const flameOverlay = document.querySelector('.flame-overlay');
    if (flameOverlay) {
        flameOverlay.style.transform = `translateY(${rate}px)`;
    }
});

// Dynamic header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 15, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Add loading animation for better UX
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Function to share WhatsApp group
function shareWhatsAppGroup() {
    const text = encodeURIComponent(
        "🌟 Rejoins la communauté EOH - Ambassadeurs du Ciel sur la Terre ! 🌟\n\n" +
        "🔥 Une communauté jeune et en feu pour Christ\n" +
        "🦅 Ambassadeurs du Ciel sur la Terre\n" +
        "👑 Le Saint-Esprit notre guide\n" +
        "🙏 Présenter Christ au monde\n\n" +
        "Rejoins-nous sur WhatsApp : https://chat.whatsapp.com/IBvRWDXCBNJGg90q9lNvoh"
    );
    
    const url = `https://wa.me/?text=${text}`;
    window.open(url, '_blank', 'width=600,height=400');
}

// Make function globally accessible
window.shareWhatsAppGroup = shareWhatsAppGroup;