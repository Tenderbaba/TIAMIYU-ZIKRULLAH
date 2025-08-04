document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
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
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
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
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Star rating for reviews
    const stars = document.querySelectorAll('.stars i');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            
            stars.forEach(s => {
                if (s.getAttribute('data-rating') <= rating) {
                    s.classList.add('active');
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('active');
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
            
            // You can store the rating value in a hidden input field if needed
            // document.querySelector('input[name="rating"]').value = rating;
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            // Change button text and disable it
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                // Replace with your actual form submission endpoint
                const response = await fetch('https://formspree.io/f/xvgkdwla', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    alert('Thank you! Your message has been sent successfully.');
                    contactForm.reset();
                } else {
                    // Show error message
                    alert('Oops! There was a problem sending your message. Please try again.');
                }
            } catch (error) {
                alert('Error: Unable to send message. Please check your connection and try again.');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }
    
    // Review form submission
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const reviewer = reviewForm.querySelector('input[name="name"]').value.trim();
            const review = reviewForm.querySelector('textarea[name="review"]').value.trim();
            
            if (reviewer && review) {
                // Get existing reviews from localStorage or initialize empty array
                const reviews = JSON.parse(localStorage.getItem('userTestimonials') || [];
                
                // Add new review to beginning of array
                reviews.unshift({
                    reviewer,
                    review,
                    date: new Date().toISOString()
                });
                
                // Save back to localStorage
                localStorage.setItem('userTestimonials', JSON.stringify(reviews));
                
                // Show success message
                alert('Thank you for your review! It will appear on the testimonials page.');
                
                // Reset form
                reviewForm.reset();
                
                // Reset stars
                stars.forEach(star => {
                    star.classList.remove('active');
                    star.classList.remove('fas');
                    star.classList.add('far');
                });
            } else {
                alert('Please fill in all fields before submitting.');
            }
        });
    }
    
    // Load user testimonials from localStorage
    const userTestimonialsContainer = document.querySelector('.user-testimonials');
    if (userTestimonialsContainer) {
        const reviews = JSON.parse(localStorage.getItem('userTestimonials') || '[]');
        
        reviews.forEach(review => {
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            
            testimonialCard.innerHTML = `
                <div class="testimonial-content">
                    <div class="rating">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                    <p>"${review.review}"</p>
                    <div class="client-info">
                        <div>
                            <h4>${review.reviewer}</h4>
                            <span>Client</span>
                        </div>
                    </div>
                </div>
            `;
            
            userTestimonialsContainer.appendChild(testimonialCard);
        });
    }
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.reveal');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
});