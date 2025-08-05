// Tab functionality for Partners & Doctors page
document.addEventListener('DOMContentLoaded', () => {
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
