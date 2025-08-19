# Sirius Medical Services Website

A modern, professional, and responsive website for Sirius Medical Services - a leading provider of high-quality medical products and services.

## 🌟 Features

- **Modern Design**: Sleek, minimalistic design with teal, navy, and white color scheme
- **Responsive Layout**: Mobile-first design that works on all devices
- **Interactive Elements**: Smooth animations, hover effects, and scroll-triggered animations
- **Professional UI**: Clean typography using Inter font from Google Fonts
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Accessibility**: ARIA labels, focus states, and semantic markup

## 📄 Pages

### Homepage (`index.html`)
- Hero section with animated particle background
- Company mission and values
- Service overview
- Customer testimonials
- Office locations (California, USA & Astana, Kazakhstan)
- Contact information and social links

### About Us (`about.html`)
- Company story and background
- Core values with interactive cards
- Vision and mission statements
- Global presence and statistics
- Certifications and compliance information

### For Partners & Doctors (`partners.html`)
- Tabbed interface for Partners and Doctors content
- Partnership benefits and process
- Healthcare professional services
- Product categories
- Trust markers and certifications
- Call-to-action sections

### Contact (`contact.html`)
- Interactive contact form with validation
- Office locations and contact details
- FAQ section with accordion functionality
- Newsletter subscription option
- Real-time form validation and notifications

## 🛠 Technologies Used

- **HTML5**: Semantic markup and modern HTML features
- **CSS3**: Flexbox, Grid, animations, and responsive design
- **JavaScript**: Interactive functionality and form handling
- **Google Fonts**: Inter font family for clean typography
- **SVG**: Vector graphics for logo and icons

## 🚀 Getting Started

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sirius-medical-website
   ```

2. Start a local web server:
   ```bash
   # Using Python
   python -m http.server 3000
   
   # Using Node.js (if you have it installed)
   npx serve .
   ```

3. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
sirius-medical-website/
├── index.html          # Homepage
├── about.html          # About Us page
├── partners.html       # For Partners & Doctors page
├── contact.html        # Contact page
├── styles.css          # Global styles and page-specific CSS
├── script.js           # Homepage JavaScript functionality
├── partners.js         # Partners page JavaScript (tabs, animations)
├── contact.js          # Contact page JavaScript (form, FAQ)
├── logo.svg           # Company logo
├── favicon.svg        # Website favicon
├── README.md          # Project documentation
└── .gitignore         # Git ignore file
```

## ✨ Key Features

### Interactive Elements
- **Sticky Navigation**: Transparent navbar that becomes opaque on scroll
- **Mobile Menu**: Responsive hamburger menu for mobile devices
- **Particle Animation**: Animated background in hero section
- **Scroll Animations**: Fade-in effects triggered by scrolling
- **Tab Navigation**: Switch between Partners and Doctors content
- **FAQ Accordion**: Expandable FAQ sections
- **Form Validation**: Real-time validation with error messages
- **Notifications**: Toast-style success/error messages

### Design Features
- **Color Scheme**: Teal (#14B8A6), Navy (#1E293B), White (#FFFFFF)
- **Typography**: Inter font with proper hierarchy
- **Spacing**: Consistent spacing using CSS custom properties
- **Shadows**: Subtle box shadows for depth
- **Hover Effects**: Interactive hover states on buttons and cards
- **Responsive Grid**: CSS Grid and Flexbox for layouts

## 🎨 Customization

### Colors
The color scheme is defined using CSS custom properties in `styles.css`:
```css
:root {
    --primary-teal: #14B8A6;
    --light-teal: #5EEAD4;
    --primary-navy: #1E293B;
    --secondary-navy: #334155;
    --white: #FFFFFF;
    /* ... more colors */
}
```

### Fonts
The website uses the Inter font family from Google Fonts. You can change it by updating the import in the HTML files and the CSS font-family property.

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

### Form Functionality
The contact form currently simulates submission for testing purposes. To integrate with a real backend:

1. Replace the `simulateFormSubmission` function in `contact.js`
2. Update the form action and method attributes
3. Add proper server-side validation

### Adding New Pages
1. Create a new HTML file following the existing structure
2. Include the navigation bar and footer
3. Add page-specific styles to `styles.css`
4. Create a corresponding JavaScript file if needed

## 📈 Performance

- Optimized images and SVG graphics
- Minimal JavaScript for better loading times
- CSS animations using transform and opacity for smooth performance
- Semantic HTML for better SEO and accessibility

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Contact

For questions about this website or Sirius Medical Services:

**California Office:**
- Address: 123 Medical Plaza, Suite 456, Los Angeles, CA 90210
- Phone: +1 (555) 123-4567
- Email: info@siriusmedicals.com

**Kazakhstan Office:**
- Address: 789 Healthcare Avenue, Astana 010000, Kazakhstan
- Phone: +7 (717) 234-5678
- Email: astana@siriusmedicals.com

## 📄 License

This project is proprietary software owned by Sirius Medical Services. All rights reserved.

---

Built with ❤️ for Sirius Medical Services
