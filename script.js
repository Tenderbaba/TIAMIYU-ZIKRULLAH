document.addEventListener('DOMContentLoaded', function() {
    // ===== Background Elements Creation =====
    createFloatingTechElements();
    createBinaryCodeElements();
    
    // ===== Mobile Navigation =====
    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Active Navigation Link on Scroll =====
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('.main-header').offsetHeight;
            
            if (pageYOffset >= (sectionTop - headerHeight - 100)) {
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
    
    // ===== Portfolio Filtering =====
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
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ===== Review Form Submission =====
    const reviewForm = document.getElementById('review-form');
    if (reviewForm) {
        // Initialize star rating
        const stars = reviewForm.querySelectorAll('.stars i');
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                
                stars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('active', 'fas');
                        s.classList.remove('far');
                    } else {
                        s.classList.remove('active', 'fas');
                        s.classList.add('far');
                    }
                });
            });
        });
        
        // Handle form submission
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const reviewer = reviewForm.querySelector('input[name="name"]').value.trim();
            const review = reviewForm.querySelector('textarea[name="review"]').value.trim();
            const rating = reviewForm.querySelectorAll('.stars i.active').length;
            
            if (reviewer && review && rating > 0) {
                // Create new review element immediately
                const newReview = document.createElement('div');
                newReview.className = 'testimonial-card new-review';
                newReview.innerHTML = `
                    <div class="testimonial-content">
                        <div class="rating">
                            ${'<i class="fas fa-star"></i>'.repeat(rating)}
                            ${'<i class="far fa-star"></i>'.repeat(5 - rating)}
                        </div>
                        <p class="testimonial-text">"${review}"</p>
                        <div class="client-info">
                            <h4>${reviewer}</h4>
                            <span>Client</span>
                        </div>
                    </div>
                `;
                
                // Insert at the top of testimonials
                const testimonialsContainer = document.querySelector('.user-testimonials');
                testimonialsContainer.insertBefore(newReview, testimonialsContainer.firstChild);
                
                // Save to localStorage
                const reviews = JSON.parse(localStorage.getItem('userTestimonials') || '[]');
                reviews.unshift({
                    reviewer,
                    review,
                    rating,
                    date: new Date().toISOString()
                });
                localStorage.setItem('userTestimonials', JSON.stringify(reviews));
                
                // Reset form
                reviewForm.reset();
                
                // Reset stars
                stars.forEach(star => {
                    star.classList.remove('active', 'fas');
                    star.classList.add('far');
                });
                
                // Show success message
                showAlert('Thank you for your review!', 'success');
                
                // Scroll to show new review
                setTimeout(() => {
                    newReview.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            } else {
                showAlert('Please fill all fields and provide a rating', 'error');
            }
        });
    }
    
    // ===== Load User Testimonials from LocalStorage =====
    const userTestimonialsContainer = document.querySelector('.user-testimonials');
    if (userTestimonialsContainer) {
        const reviews = JSON.parse(localStorage.getItem('userTestimonials') || '[]');
        
        reviews.forEach(review => {
            const testimonialCard = document.createElement('div');
            testimonialCard.className = 'testimonial-card';
            
            testimonialCard.innerHTML = `
                <div class="testimonial-content">
                    <div class="rating">
                        ${'<i class="fas fa-star"></i>'.repeat(review.rating || 5)}
                        ${'<i class="far fa-star"></i>'.repeat(5 - (review.rating || 5))}
                    </div>
                    <p class="testimonial-text">"${review.review}"</p>
                    <div class="client-info">
                        <h4>${review.reviewer}</h4>
                        <span>Client</span>
                    </div>
                </div>
            `;
            
            userTestimonialsContainer.appendChild(testimonialCard);
        });
    }
    
    // ===== Contact Form Submission =====
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
                    showAlert('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    // Show error message
                    showAlert('Oops! There was a problem sending your message. Please try again.', 'error');
                }
            } catch (error) {
                showAlert('Error: Unable to send message. Please check your connection and try again.', 'error');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
            }
        });
    }
    
    // ===== Set Current Year in Footer =====
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // ===== Helper Functions =====
    function showAlert(message, type) {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            alertDiv.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(alertDiv);
            }, 300);
        }, 3000);
    }
    
    // ===== Animation on Scroll =====
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
    
    // ===== Background Animation Functions =====
    function createFloatingTechElements() {
        const techEmojis = ['💻', '🖥️', '📱', '⌨️', '🔌', '📊', '💾', '🖱️', '🔋', '🖨️'];
        const colors = ['#3b82f6', '#2563eb', '#1d4ed8', '#1e40af'];
        
        for (let i = 0; i < 15; i++) {
            const emoji = document.createElement('div');
            emoji.className = 'tech-emoji';
            emoji.textContent = techEmojis[Math.floor(Math.random() * techEmojis.length)];
            
            // Random properties
            const size = Math.random() * 1.5 + 1;
            const duration = Math.random() * 30 + 20;
            const delay = Math.random() * 15;
            const opacity = Math.random() * 0.1 + 0.05;
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            // Apply styles
            emoji.style.fontSize = `${size}rem`;
            emoji.style.animationDuration = `${duration}s`;
            emoji.style.animationDelay = `${delay}s`;
            emoji.style.opacity = opacity;
            emoji.style.color = color;
            
            // Random position
            emoji.style.left = `${Math.random() * 100}vw`;
            emoji.style.top = `${Math.random() * 100}vh`;
            
            document.body.appendChild(emoji);
        }
    }
    
    function createBinaryCodeElements() {
        const binaryChars = '01';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const binaryElement = document.createElement('div');
            binaryElement.className = 'binary-code';
            
            // Create random binary string
            let binaryString = '';
            for (let i = 0; i < 150; i++) {
                binaryString += binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
            }
            
            binaryElement.textContent = binaryString.repeat(5);
            
            // Random properties
            const left = Math.random() * 80 + 10;
            const duration = Math.random() * 30 + 40;
            const delay = Math.random() * 20;
            const fontSize = Math.random() * 0.8 + 0.6;
            
            // Apply styles
            binaryElement.style.left = `${left}%`;
            binaryElement.style.animationDuration = `${duration}s`;
            binaryElement.style.animationDelay = `${delay}s`;
            binaryElement.style.fontSize = `${fontSize}rem`;
            
            section.appendChild(binaryElement);
        });
    }
});

// ===== Service Worker Registration (PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(
            function(registration) {
                console.log('ServiceWorker registration successful');
            }, 
            function(err) {
                console.log('ServiceWorker registration failed: ', err);
            }
        );
    });
                    }
