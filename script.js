// script.js

// =======================
// Navbar scroll effect
// =======================
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // =======================
  // Mobile menu toggle
  // =======================
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
  
  // =======================
  // Smooth scrolling for anchor links
  // =======================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
  
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // =======================
  // Load handler (optional body fade-in, etc.)
  // =======================
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
  
  // =======================
  // DOMContentLoaded: init scroll animations + countries UI
  // =======================
  document.addEventListener('DOMContentLoaded', () => {
    // 1) Register elements that should animate on scroll
    const animateSelectors = [
      '.mission-card',
      '.testimonial-card',
      '.location-card',
      '.overview-text',
      '.overview-image'
    ];
  
    const toAnimate = [];
    animateSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        if (!el.classList.contains('scroll-animate')) {
          el.classList.add('scroll-animate');
        }
        toAnimate.push(el);
      });
    });
  
    // 2) IntersectionObserver to reveal on scroll (prevents "appear then disappear")
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate');
              // Stop observing once animated (one-time reveal)
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
  
      toAnimate.forEach(el => observer.observe(el));
    } else {
      // Fallback: if IO not supported, just show them
      toAnimate.forEach(el => el.classList.add('animate'));
    }
  
    // 3) Initialize glassmorphism countries (only if component exists)
    if (document.querySelector('.country-card-glass')) {
      initializeGlassmorphismCountries();
    }
  });
  
  // =======================
  // Glassmorphism Countries List
  // =======================
  function initializeGlassmorphismCountries() {
    const countryCards = document.querySelectorAll('.country-card-glass');
    if (!countryCards.length) return;
  
    countryCards.forEach((card) => {
      // Click interaction with ripple effect
      card.addEventListener('click', function (e) {
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
  
        // Debug
        // console.log(`Selected country: ${countryName}`);
      });
  
      // Keyboard support
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.click();
        }
      });
  
      // Enhanced hover effects
      card.addEventListener('mouseenter', function () {
        const flag = this.querySelector('.country-flag-img');
        if (flag) {
          flag.style.transform = 'scale(1.1) rotate(2deg)';
        }
      });
  
      card.addEventListener('mouseleave', function () {
        const flag = this.querySelector('.country-flag-img');
        if (flag) {
          flag.style.transform = 'scale(1) rotate(0deg)';
        }
      });
  
      // Error handling for flag images
      const flagImg = card.querySelector('.country-flag-img');
      if (flagImg) {
        flagImg.addEventListener('error', function () {
          // Fallback to emoji if image fails to load
          const match = this.src && this.src.match(/\/([a-z]{2})\.png/i);
          if (match) {
            const code = match[1].toLowerCase();
            const flagEmojis = {
              'kz': '🇰🇿', 'uz': '🇺🇿', 'az': '🇦🇿', 'md': '🇲🇩',
              'by': '🇧🇾', 'ua': '🇺🇦', 'ge': '🇬🇪', 'tj': '🇹🇯', 'kg': '🇰🇬'
            };
  
            const flagContainer = this.parentElement;
            if (flagContainer) {
              flagContainer.innerHTML = `
                <div style="
                  font-size: 1.8rem; 
                  display: flex; 
                  align-items: center; 
                  justify-content: center; 
                  height: 100%;
                ">${flagEmojis[code] || '🏳️'}</div>`;
            }
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
      if (ripple.parentNode) ripple.remove();
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
    if (!mapId) return;
  
    const mapElement = document.getElementById(mapId);
    if (!mapElement) return;
  
    // Add highlight animation
    mapElement.style.animation = 'country-highlight 1s ease-in-out';
    setTimeout(() => {
      mapElement.style.animation = '';
    }, 1000);
  
    // Trigger existing tooltip if available
    if (typeof window.showModernTooltip === 'function') {
      const rect = mapElement.getBoundingClientRect();
      const fakeEvent = {
        clientX: rect.left + rect.width / 2,
        clientY: rect.top + rect.height / 2
      };
      window.showModernTooltip(fakeEvent, countryName);
    }
  }
  
  // =======================
  // Dynamic CSS keyframes
  // =======================
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
  