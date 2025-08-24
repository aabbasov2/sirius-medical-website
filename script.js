// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ECG Heartbeat Animation for Hero Background
function createHeartbeatPatterns() {
    const container = document.querySelector('.ecg-container');
    if (!container) return;
    
    // Create multiple heartbeat elements with staggered timing
    for (let i = 1; i <= 3; i++) {
        // Main pattern
        const pattern = document.createElement('div');
        pattern.className = 'heartbeat-pattern';
        pattern.style.animationDelay = `${i * 1}s`;
        pattern.innerHTML = `
            <svg class="heartbeat-svg" viewBox="0 0 300 100">
                <path class="heartbeat-path" d="M0,50 L50,50 L55,30 L60,70 L65,20 L70,80 L75,50 L120,50 L125,35 L130,65 L135,50 L300,50" />
            </svg>
        `;
        container.appendChild(pattern);
        
        // Glow effect
        const glow = document.createElement('div');
        glow.className = 'heartbeat-glow';
        glow.style.animationDelay = `${i * 1}s`;
        glow.innerHTML = `
            <svg class="heartbeat-svg" viewBox="0 0 300 100">
                <path class="heartbeat-path" d="M0,50 L50,50 L55,30 L60,70 L65,20 L70,80 L75,50 L120,50 L125,35 L130,65 L135,50 L300,50" />
            </svg>
        `;
        container.appendChild(glow);
    }
}

// Performance optimization: pause animations when not visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const animations = entry.target.querySelectorAll('.heartbeat-pattern, .heartbeat-glow');
        animations.forEach(el => {
            if (entry.isIntersecting) {
                el.style.animationPlayState = 'running';
            } else {
                el.style.animationPlayState = 'paused';
            }
        });
    });
});

// Scroll animations for other elements
const scrollObserverOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, scrollObserverOptions);

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize ECG heartbeat animation
    createHeartbeatPatterns();
    
    // Observe hero section for performance optimization
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
    
    // Add scroll animations to elements
    const animateElements = document.querySelectorAll('.mission-card, .testimonial-card, .location-card, .overview-text, .overview-image');
    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        scrollObserver.observe(el);
    });
});

// Smooth scrolling for anchor links
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

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Glassmorphism Countries List JavaScript
// Add this to your script.js or create a new glassmorphism-countries.js file

document.addEventListener('DOMContentLoaded', function() {
    initializeGlassmorphismCountries();
});

function initializeGlassmorphismCountries() {
    const countryCards = document.querySelectorAll('.country-card-glass');

    countryCards.forEach((card, index) => {
        // Click interaction with ripple effect
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const countryName = this.getAttribute('data-country');
            
            // Add click ripple effect
            createRippleEffect(this, e);
            
            // Trigger map highlight if map exists
            highlightMapCountry(countryName);
            
            // Custom event for integration
            document.dispatchEvent(new CustomEvent('countrySelected', {
                detail: { country: countryName, element: this }
            }));
            
            console.log(`Selected country: ${countryName}`);
        });

        // Keyboard support
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            const flag = this.querySelector('.country-flag-img');
            if (flag) {
                flag.style.transform = 'scale(1.1) rotate(2deg)';
            }
        });

        card.addEventListener('mouseleave', function() {
            const flag = this.querySelector('.country-flag-img');
            if (flag) {
                flag.style.transform = 'scale(1) rotate(0deg)';
            }
        });

        // Error handling for flag images
        const flagImg = card.querySelector('.country-flag-img');
        if (flagImg) {
            flagImg.addEventListener('error', function() {
                // Fallback to emoji if image fails to load
                const countryCode = this.src.match(/\/([a-z]{2})\.png/);
                if (countryCode) {
                    const flagEmojis = {
                        'kz': '🇰🇿', 'uz': '🇺🇿', 'az': '🇦🇿', 'md': '🇲🇩',
                        'by': '🇧🇾', 'ua': '🇺🇦', 'ge': '🇬🇪', 'tj': '🇹🇯', 'kg': '🇰🇬'
                    };
                    
                    const flagContainer = this.parentElement;
                    flagContainer.innerHTML = `<div style="font-size: 1.8rem; display: flex; align-items: center; justify-content: center; height: 100%;">${flagEmojis[countryCode[1]] || '🏳️'}</div>`;
                }
            });
        }
    });
}

function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
        z-index: 1;
    `;

    element.appendChild(ripple);

    setTimeout(() => {
        if (ripple.parentNode) {
            ripple.remove();
        }
    }, 600);
}

function highlightMapCountry(countryName) {
    // Integration with your existing map functionality
    const countryMappings = {
        'Kazakhstan': 'gKAZ',
        'Uzbekistan': 'gUZB',
        'Azerbaijan': 'gAZE',
        'Moldova': 'gMDA',
        'Belarus': 'gBLR',
        'Ukraine': 'gUKR',
        'Georgia': 'gGEO',
        'Tajikistan': 'gTJK',
        'Kyrgyzstan': 'gKGZ'
    };

    const mapId = countryMappings[countryName];
    if (mapId) {
        const mapElement = document.getElementById(mapId);
        if (mapElement) {
            // Add highlight animation
            mapElement.style.animation = 'country-highlight 1s ease-in-out';
            setTimeout(() => {
                mapElement.style.animation = '';
            }, 1000);
            
            // Trigger existing tooltip if available
            if (window.showModernTooltip) {
                const rect = mapElement.getBoundingClientRect();
                const fakeEvent = {
                    clientX: rect.left + rect.width / 2,
                    clientY: rect.top + rect.height / 2
                };
                window.showModernTooltip(fakeEvent, countryName);
            }
        }
    }
}

// CSS animation keyframes added dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    @keyframes country-highlight {
        0%, 100% { 
            filter: brightness(1); 
            transform: scale(1); 
        }
        50% { 
            filter: brightness(1.2) drop-shadow(0 4px 8px rgba(20, 184, 166, 0.6)); 
            transform: scale(1.05); 
        }
    }
`;
document.head.appendChild(style);