// Animated reveal on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Navigation underline animation
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.classList.add('nav-animate');
    });
    link.addEventListener('mouseleave', () => {
        link.classList.remove('nav-animate');
    });
});

// Skills progress bars (About/Services)
function animateSkills() {
    const bars = document.querySelectorAll('.skill-bar-fill');
    bars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
    });
}
document.addEventListener('DOMContentLoaded', animateSkills);

// FAQ toggle (Services page)
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('open');
    });
});

// Contact form AJAX (Contact page)
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const messageDiv = document.getElementById('form-message');
        const submitButton = contactForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        messageDiv.style.display = 'none';
        try {
            const response = await fetch('https://formspree.io/f/xvgkdwla', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                messageDiv.style.display = 'block';
                messageDiv.classList.add('show', 'success');
                messageDiv.textContent = 'Thank you! Your message has been sent.';
                contactForm.reset();
            } else {
                messageDiv.style.display = 'block';
                messageDiv.classList.add('show', 'error');
                messageDiv.textContent = 'Oops! Something went wrong.';
            }
        } catch (error) {
            messageDiv.style.display = 'block';
            messageDiv.classList.add('show', 'error');
            messageDiv.textContent = 'Error: Unable to send message.';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}

// User review submission for portfolio page, display only on testimonials page
const reviewForm = document.getElementById('review-form');
if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const reviewer = reviewForm.reviewer.value.trim();
        const review = reviewForm.review.value.trim();
        if (reviewer && review) {
            // Save to localStorage
            const reviews = JSON.parse(localStorage.getItem('userTestimonials') || '[]');
            reviews.unshift({ reviewer, review });
            localStorage.setItem('userTestimonials', JSON.stringify(reviews));
            reviewForm.reset();
            alert('Thank you! Your review will appear on the Testimonials page.');
        }
    });
}
// Display user reviews on testimonials page
const testimonialsSection = document.querySelector('.user-testimonials');
if (testimonialsSection) {
    const reviews = JSON.parse(localStorage.getItem('userTestimonials') || '[]');
    reviews.forEach(({ reviewer, review }) => {
        const card = document.createElement('div');
        card.className = 'testimonial-card';
        card.innerHTML = `<p>“${review}”</p><span>- ${reviewer}</span>`;
        testimonialsSection.prepend(card);
    });
}
