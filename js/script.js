document.addEventListener('DOMContentLoaded', function() {
  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const primaryNav = document.querySelector('#primary-navigation');
  
  mobileNavToggle.addEventListener('click', () => {
    const visibility = primaryNav.getAttribute('data-visible');
    
    if (visibility === "false") {
      primaryNav.setAttribute('data-visible', 'true');
      mobileNavToggle.setAttribute('aria-expanded', 'true');
      mobileNavToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      primaryNav.setAttribute('data-visible', 'false');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
  
  // Close mobile menu when clicking on a link
  const navLinks = document.querySelectorAll('#primary-navigation a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      primaryNav.setAttribute('data-visible', 'false');
      mobileNavToggle.setAttribute('aria-expanded', 'false');
      mobileNavToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
  
  // Carousel functionality
  const carousel = document.querySelector('.carousel');
  const carouselInner = document.querySelector('.carousel-inner');
  const items = document.querySelectorAll('.carousel-item');
  const prevBtn = document.querySelector('.carousel-control.prev');
  const nextBtn = document.querySelector('.carousel-control.next');
  let currentIndex = 0;
  let interval;
  
  // Set first item as active
  items[currentIndex].classList.add('active');
  
  // Function to show slide
  function showSlide(index) {
    items.forEach(item => item.classList.remove('active'));
    items[index].classList.add('active');
    currentIndex = index;
  }
  
  // Next slide
  function nextSlide() {
    let newIndex = (currentIndex + 1) % items.length;
    showSlide(newIndex);
  }
  
  // Previous slide
  function prevSlide() {
    let newIndex = (currentIndex - 1 + items.length) % items.length;
    showSlide(newIndex);
  }
  
  // Auto slide
  function startAutoSlide() {
    interval = setInterval(nextSlide, 5000);
  }
  
  // Stop auto slide when user interacts
  function stopAutoSlide() {
    clearInterval(interval);
  }
  
  // Event listeners
  nextBtn.addEventListener('click', () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide();
  });
  
  prevBtn.addEventListener('click', () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide();
  });
  
  // Start auto slide
  startAutoSlide();
  
  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);
  
  // Header scroll effect
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Scroll reveal animation
  const scrollReveal = function() {
    const elements = document.querySelectorAll('.property-card, .service-card');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const elementVisible = 100;
      
      if (elementPosition < windowHeight - elementVisible) {
        element.classList.add('visible');
      }
    });
  };
  
  // Initial check
  scrollReveal();
  
  // Check on scroll
  window.addEventListener('scroll', scrollReveal);
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Form submission
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);
      
      // Here you would typically send the data to a server
      console.log('Form submitted:', data);
      
      // Show success message
      alert('Thank you for your message! We will contact you soon.');
      
      // Reset form
      this.reset();
    });
  }
});