// Map JavaScript for Country Highlighting - Fixed Version
(function () {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    initializeCountryHighlighting();
    createTooltip();
  });

  function initializeCountryHighlighting() {
    const countries = {
        'gKAZ': 'Kazakhstan',
        'gUZB': 'Uzbekistan', 
        'gAZE': 'Azerbaijan',
        'gMDA': 'Moldova',
        'gBLR': 'Belarus',
        'gUKR': 'Ukraine',
        'gGEO': 'Georgia',
        'gTJK': 'Tajikistan',
        'gKGZ': 'Kyrgyzstan'
    };
    
    let foundCount = 0;
    
    Object.keys(countries).forEach(countryId => {
        const element = document.getElementById(countryId);
        if (element) {
            foundCount++;
            console.log(`✅ Found country: ${countries[countryId]}`);
            
            // DON'T apply styles directly - let CSS handle it
            // applyCountryStyles(element); // REMOVED THIS LINE
            
            // Add click listener
            element.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log(`📍 Clicked on ${countries[countryId]}`);
                showModernTooltip(e, countries[countryId]);
            });
            
            // Add keyboard support
            element.setAttribute('tabindex', '0');
            element.setAttribute('role', 'button');
            element.setAttribute('aria-label', `Location: ${countries[countryId]}`);
            
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });

            // REMOVED hover event listeners - let CSS handle hover effects
            // The CSS :hover rules will work properly now
            
        } else {
            console.warn(`⚠️ Country ${countryId} (${countries[countryId]}) not found in SVG`);
        }
    });
    
    console.log(`🗺️ Country highlighting initialized - Found ${foundCount}/${Object.keys(countries).length} countries`);
  }

  // REMOVED applyCountryStyles function - CSS will handle all styling

  function createTooltip() {
    // Create modern tooltip element
    const tooltip = document.createElement('div');
    tooltip.id = 'country-tooltip';
    tooltip.style.cssText = `
      position: fixed;
      background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      font-size: 14px;
      font-weight: 600;
      font-family: 'Inter', sans-serif;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25), 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      pointer-events: auto;
      opacity: 0;
      transform: translateY(10px);
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      min-width: 200px;
      text-align: center;
    `;
    
    // Add close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      position: absolute;
      top: 8px;
      right: 12px;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      font-size: 18px;
      cursor: pointer;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      transition: all 0.2s ease;
    `;
    
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      hideTooltip();
    });
    closeBtn.addEventListener('mouseenter', () => {
      closeBtn.style.background = 'rgba(255, 255, 255, 0.1)';
      closeBtn.style.color = 'white';
    });
    closeBtn.addEventListener('mouseleave', () => {
      closeBtn.style.background = 'none';
      closeBtn.style.color = 'rgba(255, 255, 255, 0.6)';
    });
    
    tooltip.appendChild(closeBtn);
    document.body.appendChild(tooltip);
  }

  function showModernTooltip(event, countryName) {
    const tooltip = document.getElementById('country-tooltip');
    if (!tooltip) return;
    
    // Content for the tooltip
    const content = `
      <div style="margin-bottom: 8px;">
        <div style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">${countryName}</div>
        <div style="font-size: 12px; opacity: 0.8; margin-bottom: 12px;">Healthcare Solutions Available</div>
      </div>
      <div style="font-size: 13px; line-height: 1.4; opacity: 0.9;">
        Sirius Medical serves healthcare providers in this region with trusted medical solutions and support.
      </div>
    `;
    
    // Store the close button
    const existingCloseBtn = tooltip.querySelector('button');
    
    // Update content
    tooltip.innerHTML = content;
    
    // Re-add the close button
    if (existingCloseBtn) {
      tooltip.appendChild(existingCloseBtn);
    }
    
    // Position tooltip near the mouse cursor
    let left = event.clientX - 100; // Center around cursor
    let top = event.clientY - 120;  // Above cursor
    
    // Keep tooltip within viewport
    if (left < 10) left = 10;
    if (left + 200 > window.innerWidth - 10) {
      left = window.innerWidth - 210;
    }
    if (top < 10) {
      top = event.clientY + 20; // Below cursor if no space above
    }
    
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.style.pointerEvents = 'auto';
    
    // Show tooltip
    requestAnimationFrame(() => {
      tooltip.style.opacity = '1';
      tooltip.style.transform = 'translateY(0)';
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => hideTooltip(), 5000);
  }

  function hideTooltip() {
    const tooltip = document.getElementById('country-tooltip');
    if (tooltip) {
      tooltip.style.opacity = '0';
      tooltip.style.transform = 'translateY(10px)';
      tooltip.style.pointerEvents = 'none';
    }
  }

  // Hide tooltip when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#country-tooltip') && !e.target.closest('g[id^="g"]')) {
      hideTooltip();
    }
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      hideTooltip(); // Hide tooltip on resize
      console.log('🔄 Map resized');
    }, 250);
  });

})();