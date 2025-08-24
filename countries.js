// Enhanced Countries List Functionality
(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        initializeCountriesList();
        initializeCountryMapSync();
    });

    function initializeCountriesList() {
        const countryItems = document.querySelectorAll('.country-item');
        
        // Advanced intersection observer for smooth animations
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

        countryItems.forEach((item, index) => {
            // Initial state for animation
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            
            observer.observe(item);

            // Enhanced click interaction
            item.addEventListener('click', function() {
                const countryName = this.getAttribute('data-country');
                console.log(`🌍 Selected: ${countryName}`);
                
                // Highlight corresponding country on map
                highlightMapCountry(countryName);
                
                // Premium feedback animation
                this.style.transform = 'translateY(-3px) scale(0.95)';
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                
                // Add ripple effect
                createRippleEffect(this);
            });

            // Keyboard navigation
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });

            // Enhanced hover tracking
            item.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
                const countryName = this.getAttribute('data-country');
                previewMapCountry(countryName);
            });

            item.addEventListener('mouseleave', function() {
                this.style.zIndex = '1';
                clearMapPreview();
            });
        });

        // Dynamic CSS animation injection
        if (!document.getElementById('countries-animations')) {
            const style = document.createElement('style');
            style.id = 'countries-animations';
            style.textContent = `
                @keyframes ripple-click {
                    to {
                        transform: scale(40);
                        opacity: 0;
                    }
                }
                
                @keyframes country-highlight {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    function createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: var(--primary-teal);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple-click 0.6s ease-out;
            pointer-events: none;
            left: 50%;
            top: 50%;
            margin: -2px 0 0 -2px;
            z-index: 100;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 600);
    }

    // Sync with existing map functionality
    function initializeCountryMapSync() {
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

        // Enhance existing map countries to sync with list
        Object.entries(countryMappings).forEach(([countryName, mapId]) => {
            const mapElement = document.getElementById(mapId);
            if (mapElement) {
                mapElement.addEventListener('click', () => {
                    highlightListCountry(countryName);
                });
            }
        });
    }

    function highlightMapCountry(countryName) {
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
                // Add temporary highlight animation
                mapElement.style.animation = 'country-highlight 1s ease-in-out';
                setTimeout(() => {
                    mapElement.style.animation = '';
                }, 1000);
                
                // Trigger existing map tooltip
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

    function highlightListCountry(countryName) {
        const listItem = document.querySelector(`[data-country="${countryName}"]`);
        if (listItem) {
            listItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
            listItem.style.animation = 'country-highlight 1s ease-in-out';
            setTimeout(() => {
                listItem.style.animation = '';
            }, 1000);
        }
    }

    function previewMapCountry(countryName) {
        // Add subtle preview effect on map when hovering list item
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
                mapElement.style.filter = 'brightness(1.1) saturate(1.2)';
                mapElement.style.transform = 'scale(1.02)';
            }
        }
    }

    function clearMapPreview() {
        // Clear all preview effects
        const countryIds = ['gKAZ', 'gUZB', 'gAZE', 'gMDA', 'gBLR', 'gUKR', 'gGEO', 'gTJK', 'gKGZ'];
        countryIds.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.style.filter = '';
                element.style.transform = '';
            }
        });
    }

})();