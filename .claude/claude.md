# ADAS Safe Website Project Documentation

## Project Overview

This is a professional multi-page landing site for **ADAS Safe**, a company specializing in Advanced Driver Assistance System (ADAS) calibration services. The project was restructured from a single-page design into a clean, modern multi-page website with proper separation of concerns.

## Company Background

- **Business**: ADAS calibration, programming, and diagnostic services
- **Target Market**: Auto body shops, dealerships, fleet operators, insurance companies
- **Key Services**: Mobile and facility-based ADAS calibration
- **Special Recognition**: Developed with support from Louisiana Economic Development's Office of Entertainment Industry Development

## Project Structure

```
adas-safe-landing/
├── index.html              # Homepage with hero, about, services, FAQ
├── mobile.html             # Mobile/on-site services page
├── careers.html            # Job opportunities and company culture
├── contact.html            # Contact form and business information
├── css/
│   ├── style.css          # Main layout and typography styles
│   └── components.css     # Reusable UI components and sections
├── js/
│   └── main.js           # JavaScript functionality and interactions
├── assets/
│   ├── logo-svg/
│   │   └── secondary.svg  # Main logo file used in navigation
│   ├── alldata.png       # Partner logo (left footer)
│   └── louisiana_entertainment.png # Partner logo (right footer)
└── .claude/
    ├── notepad.md        # Project notes and requirements
    └── claude.md         # This documentation file
```

## Design System & Color Palette

### CSS Variables (defined in :root)
```css
--primary: #D22B2B           # Main brand red
--primary-dark: #B01E1E      # Darker red for hover states
--steel: #71797E             # Secondary gray
--ghost-grey: #D3D3D3        # Light gray for borders
--black: #000000             # Primary text color
--white: #FFFFFF             # Background and button text
--glass: rgba(255, 255, 255, 0.7)  # Translucent nav background
--glass-border: rgba(113, 121, 126, 0.15)  # Subtle borders
--text-primary: #000000      # Primary text
--text-secondary: #71797E    # Secondary text
--bg-light: #FAFAFA         # Light background sections
```

### Typography
- **Font Stack**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Large Headings**: clamp() for responsive sizing
- **Body Text**: 1.1rem with 1.6-1.8 line height
- **Section Titles**: 3rem, 900 weight with gradient text effect

## Page Breakdown

### 1. Homepage (index.html)
**Purpose**: Main landing page with comprehensive company overview

**Sections**:
- **Hero**: Full-screen with floating animation cards, call-to-action buttons
- **About**: 2-column layout (left: "About Us" title + description, right: 3 feature cards)
- **Services**: 3×3 grid of 9 service cards with detailed descriptions
- **FAQ**: Expandable accordion-style questions and answers
- **CTA**: Call-to-action section with gradient background
- **Footer**: 3-column layout with partner logos and attribution

**Key Features**:
- Smooth scroll navigation to sections
- Parallax effects on hero section
- Animated floating cards
- Gradient text effects on headings

### 2. Mobile Services (mobile.html)
**Purpose**: Dedicated page for on-site calibration services

**Content Focus**:
- Mobile unit capabilities
- Site requirements (space, power, environment)
- Service coverage areas
- Booking process
- Target customers (auto shops, dealerships, fleets)

### 3. Careers (careers.html)
**Purpose**: Job opportunities and company culture

**Content**:
- Current job openings with apply buttons
- Company benefits and perks
- What the company looks for in candidates
- Application process steps
- Encouragement for general inquiries

### 4. Contact (contact.html)
**Purpose**: Contact information and service request form

**Features**:
- Comprehensive contact form with vehicle information
- Business hours and contact methods
- Service area information
- Emergency services information
- Career inquiry section

## Key Components & Styling

### Navigation Bar
- **Fixed position** with backdrop blur effect
- **Logo**: SVG image (65px height) with hover scale effect
- **Links**: Underline animation on hover, active state indication
- **CTA Button**: "Schedule Appointment" with slide animation
- **Responsive**: Navigation links hidden on mobile (< 768px)

### Services Grid
- **Desktop**: 3 columns × 3 rows (9 total cards)
- **Tablet**: 2 columns for medium screens
- **Mobile**: Single column stacking
- **Cards**: Hover effects with translateY and color transitions

### About Section Layout
- **2-column grid** on desktop (text left, cards right)
- **Responsive**: Stacks to single column on mobile
- **Feature Cards**: 3 cards with icons, hover animations
- **Typography**: Large "About Us" title with proper hierarchy

### Footer Structure
- **3-column layout**: Partner logos on sides, company info center
- **Left**: AllData partner logo
- **Center**: Company name, tagline, navigation links, copyright
- **Right**: Louisiana Entertainment logo + attribution text
- **Responsive**: Stacks vertically on mobile

### Form Elements
- **Consistent styling** across all form inputs
- **Focus states** with primary color border and shadow
- **Validation**: Basic required field checking
- **Responsive design** with proper mobile spacing

## JavaScript Functionality (main.js)

### Core Features
1. **Navbar scroll effects**: Background opacity changes on scroll
2. **Smooth scrolling**: For anchor link navigation
3. **Active nav highlighting**: Updates based on current page
4. **Intersection Observer**: Fade-in animations for cards and sections
5. **Parallax effects**: Hero section background movement
6. **FAQ accordion**: Expand/collapse functionality
7. **Form handling**: Basic validation and submission feedback

### Animation System
- **Fade-in animations** triggered by scroll position
- **Blur-in keyframes** for hero section elements
- **Floating animations** for hero decorative cards
- **Hover effects** managed via CSS transitions

## Responsive Design Strategy

### Breakpoints
- **Desktop**: 1025px and above (full 3-column layouts)
- **Tablet**: 769px - 1024px (2-column services, modified layouts)
- **Mobile**: 768px and below (single column, simplified navigation)

### Mobile Optimizations
- Navigation links hidden, logo scaled down
- All grids convert to single column
- Reduced padding and margins
- Touch-friendly button sizing
- Optimized typography scaling

## Assets & Media

### Logo Usage
- **Primary logo**: `assets/logo-svg/secondary.svg`
- **Navbar**: 65px height, hover scale effect
- **Footer logos**: 80px height (60px on mobile)

### Partner Attribution
- **AllData**: Left footer position
- **Louisiana Entertainment**: Right footer with required text
- **Attribution text**: "ADAS Safe was developed with support from Louisiana Economic Development's Office of Entertainment Industry Development."

## Content Management

### Service Cards (9 total)
1. **Diagnostic Scanning**: Thorough ADAS assessment
2. **Calibration Services**: OEM-compliant calibration
3. **Clear Codes**: Diagnostic code clearing
4. **Verify Wheel Alignment**: Electronic alignment verification
5. **Module Programming**: Replacement module integration
6. **Documentation**: Cloud-based portal access
7. **Post Calibration Scan**: Module verification
8. **Post-Service Test Drive**: Documented verification
9. **Same Day Service**: Electronic scheduling system

### FAQ Content
- 4 comprehensive Q&A pairs
- Expandable accordion interface
- Covers calibration basics, frequency, documentation, services

## Development Notes

### CSS Architecture
- **Modular approach**: Separate files for layout vs components
- **Custom properties**: Consistent color and spacing system
- **Progressive enhancement**: Works without JavaScript
- **Print-friendly**: Clean styles for printing

### Accessibility Considerations
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Alt text**: All images have descriptive alt attributes
- **Focus management**: Keyboard navigation support
- **Color contrast**: Meets accessibility standards
- **Screen reader friendly**: Proper labeling and structure

### Performance Optimizations
- **SVG logos**: Scalable, small file sizes
- **CSS animations**: Hardware accelerated transforms
- **Minimal JavaScript**: Only essential functionality
- **Efficient selectors**: Optimized CSS performance

## Common Modification Patterns

### Adding New Pages
1. Copy existing page structure
2. Update navigation links in all files
3. Ensure footer consistency
4. Update active nav link logic in main.js

### Modifying Service Cards
1. Update content in index.html services-grid
2. Maintain 3×3 grid structure
3. Keep consistent card markup structure
4. Update icons as needed

### Color Scheme Changes
1. Modify CSS custom properties in :root
2. Test contrast ratios for accessibility
3. Update gradient effects if needed
4. Verify hover states work properly

### Layout Adjustments
1. Modify grid-template-columns in CSS
2. Update responsive breakpoints as needed
3. Test on multiple screen sizes
4. Ensure mobile usability maintained

## Testing Checklist

### Cross-browser Compatibility
- [ ] Chrome/Chromium browsers
- [ ] Firefox
- [ ] Safari (webkit)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Responsive Testing
- [ ] Desktop (1920px, 1440px, 1024px)
- [ ] Tablet (768px, 1024px)
- [ ] Mobile (375px, 414px, 320px)

### Functionality Testing
- [ ] Navigation smooth scrolling
- [ ] Form submission
- [ ] FAQ accordion expand/collapse
- [ ] Hover effects and animations
- [ ] Loading performance

### Accessibility Testing
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast validation
- [ ] Focus indicator visibility

## Deployment Considerations

### File Structure
- Maintain relative paths for portability
- Ensure assets folder is included
- Keep .claude folder for documentation

### SEO Optimization
- Meta descriptions are page-specific
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for all images
- Semantic HTML structure

### Future Enhancement Ideas
- Add mobile hamburger menu
- Implement actual form backend
- Add testimonials/reviews section
- Create photo gallery for services
- Add blog/news section
- Implement contact form email integration

## Troubleshooting Common Issues

### Layout Problems
- Check CSS grid browser support
- Verify responsive breakpoints
- Ensure proper box-sizing: border-box
- Test flexbox fallbacks

### Animation Issues
- Check browser animation preferences
- Test reduced motion accessibility
- Verify transform performance
- Ensure proper z-index stacking

### Form Problems
- Validate HTML form structure
- Check JavaScript form handling
- Test required field validation
- Verify mobile input behavior

---

**Last Updated**: January 2025
**Project Status**: Production Ready
**Maintenance**: Regular content updates and browser compatibility checks recommended