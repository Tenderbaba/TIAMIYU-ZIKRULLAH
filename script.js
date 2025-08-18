document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  mobileMenuBtn.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-times');
    this.querySelector('i').classList.toggle('fa-bars');
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        }
      }
    });
  });

  // Active navigation link based on scroll position
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Portfolio filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Update active button
      filterBtns.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Filter items
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Star rating system
  const stars = document.querySelectorAll('.stars i');
  const ratingInput = document.getElementById('rating-value');
  
  stars.forEach(star => {
    star.addEventListener('click', function() {
      const rating = this.getAttribute('data-rating');
      ratingInput.value = rating;
      
      stars.forEach((s, index) => {
        if (index < rating) {
          s.classList.add('fas', 'active');
          s.classList.remove('far');
        } else {
          s.classList.add('far');
          s.classList.remove('fas', 'active');
        }
      });
    });
    
    star.addEventListener('mouseover', function() {
      const hoverRating = this.getAttribute('data-rating');
      
      stars.forEach((s, index) => {
        if (index < hoverRating) {
          s.classList.add('fas');
          s.classList.remove('far');
        } else {
          s.classList.add('far');
          s.classList.remove('fas');
        }
      });
    });
    
    star.addEventListener('mouseout', function() {
      const currentRating = ratingInput.value;
      
      stars.forEach((s, index) => {
        if (index < currentRating) {
          s.classList.add('fas', 'active');
          s.classList.remove('far');
        } else {
          s.classList.add('far');
          s.classList.remove('fas', 'active');
        }
      });
    });
  });

  // Form submission handling
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple form validation
      let isValid = true;
      const inputs = this.querySelectorAll('input[required], textarea[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.style.borderColor = 'red';
          isValid = false;
        } else {
          input.style.borderColor = '';
        }
      });
      
      if (isValid) {
        // Here you would typically send the form data to a server
        alert('Form submitted successfully!');
        this.reset();
        
        // Reset stars if it's the review form
        if (this.classList.contains('review-form')) {
          stars.forEach(star => {
            star.classList.add('far');
            star.classList.remove('fas', 'active');
          });
          ratingInput.value = '0';
        }
      } else {
        alert('Please fill in all required fields.');
      }
    });
  });

  // Generate random tech emojis in background
  const techEmojis = ['👨‍💻', '💻', '🚀', '📱', '🔌', '🖥️', '⌨️', '🖱️', '📊', '🔋', '💾', '📲'];
  const backgroundContainer = document.getElementById('background-container');
  
  for (let i = 0; i < 15; i++) {
    const emoji = document.createElement('div');
    emoji.className = 'tech-emoji';
    emoji.textContent = techEmojis[Math.floor(Math.random() * techEmojis.length)];
    emoji.style.left = `${Math.random() * 100}%`;
    emoji.style.top = `${Math.random() * 100}%`;
    emoji.style.animationDuration = `${15 + Math.random() * 20}s`;
    emoji.style.animationDelay = `${Math.random() * 5}s`;
    backgroundContainer.appendChild(emoji);
  }
  
  // Generate binary code elements
  for (let i = 0; i < 5; i++) {
    const binary = document.createElement('div');
    binary.className = 'binary-code';
    binary.textContent = generateBinaryString(50);
    binary.style.left = `${Math.random() * 100}%`;
    binary.style.animationDuration = `${40 + Math.random() * 30}s`;
    binary.style.animationDelay = `${Math.random() * 10}s`;
    backgroundContainer.appendChild(binary);
  }
  
  function generateBinaryString(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.random() > 0.5 ? '1' : '0';
      if (i % 8 === 7 && i !== length - 1) result += ' ';
    }
    return result;
  }
});
