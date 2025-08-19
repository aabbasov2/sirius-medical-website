// Tab functionality for Partners & Doctors page
document.addEventListener('DOMContentLoaded', () => {
    // Initialize auto-scrolling for partner strips
    const initAutoScroll = () => {
        const strips = document.querySelectorAll('.strip-inner');
        
        // Calculate total width of one set of pills for each strip
        strips.forEach(strip => {
            const pills = strip.querySelector('.pills:not([aria-hidden])');
            if (pills) {
                const pillsWidth = Array.from(pills.children).reduce((width, pill) => {
                    return width + pill.offsetWidth + 16; // 16px for gap
                }, 0);
                
                // Set the width of the strip to fit two sets of pills (original + duplicate)
                strip.style.width = `${pillsWidth * 2}px`;
                
                // Adjust animation duration based on content width
                const duration = Math.max(20, Math.min(60, Math.floor(pillsWidth / 30)));
                strip.style.animationDuration = `${duration}s`;
            }
        });

        // Pause animation when tab is not visible
        document.addEventListener('visibilitychange', () => {
            const isVisible = !document.hidden;
            strips.forEach(strip => {
                strip.style.animationPlayState = isVisible ? 'running' : 'paused';
            });
        });
    };

    // Run initialization after a short delay to ensure DOM is fully loaded
    setTimeout(initAutoScroll, 100);
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // Add hover effect for partner pills
    const partnerPills = document.querySelectorAll('.partner-pill');
    partnerPills.forEach(pill => {
        pill.addEventListener('mouseenter', () => {
            pill.style.transform = 'translateY(-2px)';
            pill.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
        });
        
        pill.addEventListener('mouseleave', () => {
            pill.style.transform = '';
            pill.style.boxShadow = '';
        });
        
        // Add focus styles for keyboard navigation
        pill.addEventListener('focus', () => {
            pill.style.outline = '2px solid var(--primary-teal)';
            pill.style.outlineOffset = '2px';
        });
        
        pill.addEventListener('blur', () => {
            pill.style.outline = '';
        });
    });

    // Animate trust markers when they come into view
    const trustNumbers = document.querySelectorAll('.trust-number');
    const trustObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Extract number and suffix
                const match = finalValue.match(/(\d+(?:\.\d+)?)(.*)/);
                if (match) {
                    const number = parseFloat(match[1]);
                    const suffix = match[2];
                    
                    // Animate the number
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        
                        if (suffix === '+') {
                            target.textContent = Math.floor(current) + suffix;
                        } else if (suffix === '%') {
                            target.textContent = current.toFixed(1) + suffix;
                        } else {
                            target.textContent = Math.floor(current) + suffix;
                        }
                    }, 50);
                }
                
                trustObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    trustNumbers.forEach(number => {
        trustObserver.observe(number);
    });
});
