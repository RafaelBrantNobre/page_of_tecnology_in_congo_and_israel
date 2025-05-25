// Main JavaScript file for Seminário II website

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navLinks && navLinks.classList.contains('active') && 
        !event.target.closest('.nav-links') && 
        !event.target.closest('.mobile-menu-btn')) {
      navLinks.classList.remove('active');
    }
  });

  // Country selection functionality
  const countryButtons = document.querySelectorAll('.country-btn');
  const timelineEvents = document.querySelectorAll('.timeline-event');
  const timelineHeaders = document.querySelectorAll('.timeline-country');

  // Only initialize timeline functionality if elements exist
  if (countryButtons.length > 0) {
    // Show Israel content by default
    showCountryContent('israel');

    countryButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        countryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show content for selected country
        const country = this.getAttribute('data-country');
        showCountryContent(country);
      });
    });
  }

  function showCountryContent(country) {
    // Only proceed if timeline elements exist
    if (timelineEvents.length > 0) {
      // Hide all timeline events
      timelineEvents.forEach(event => event.classList.remove('visible'));

      // Show events for selected country
      document.querySelectorAll(`.timeline-event.${country}`).forEach(event => {
        event.classList.add('visible');
      });

      // Only try to show/hide headers if they exist
      const countryHeader = document.querySelector(`.timeline-country.${country}`);
      if (countryHeader) {
        // Hide all headers first
        timelineHeaders.forEach(header => {
          if (header) {
            header.style.display = 'none';
          }
        });
        // Show the selected country's header
        countryHeader.style.display = 'block';
      }
    }
  }
  
  // Animation on scroll
  const animatedElements = document.querySelectorAll('.card, .preview-card, .article-card, .country-card, .analysis-card, .timeline-event');
  
  function checkIfInView() {
    const windowHeight = window.innerHeight;
    const windowTopPosition = window.scrollY;
    const windowBottomPosition = windowTopPosition + windowHeight;
    
    animatedElements.forEach(element => {
      const elementHeight = element.offsetHeight;
      const elementTopPosition = element.offsetTop;
      const elementBottomPosition = elementTopPosition + elementHeight;
      
      // Check if element is in viewport
      if (
        (elementBottomPosition >= windowTopPosition) &&
        (elementTopPosition <= windowBottomPosition)
      ) {
        element.classList.add('animated');
      }
    });
  }
  
  // Run on initial load
  checkIfInView();
  
  // Run on scroll
  window.addEventListener('scroll', checkIfInView);
});