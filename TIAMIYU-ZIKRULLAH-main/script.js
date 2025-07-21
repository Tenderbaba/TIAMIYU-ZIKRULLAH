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