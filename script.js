// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector(link.getAttribute('href'));
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Handle contact form submission with AJAX
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const messageDiv = document.getElementById('form-message');
        const submitButton = contactForm.querySelector('button[type="submit"]');

        // Basic email validation
        const email = formData.get('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            messageDiv.style.display = 'block';
            messageDiv.classList.add('show');
            messageDiv.classList.remove('success');
            messageDiv.classList.add('error');
            messageDiv.textContent = 'Please enter a valid email address.';
            return;
        }

        // Show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        messageDiv.style.display = 'none';

        try {
            const response = await fetch('https://formspree.io/f/xvgkdwla', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success
                messageDiv.style.display = 'block';
                messageDiv.classList.add('show', 'success');
                messageDiv.classList.remove('error');
                messageDiv.textContent = 'Thank you! Your message has been sent successfully.';
                contactForm.reset();
            } else {
                // Error from Formspree
                messageDiv.style.display = 'block';
                messageDiv.classList.add('show', 'error');
                messageDiv.classList.remove('success');
                messageDiv.textContent = 'Oops! Something went wrong. Please try again.';
            }
        } catch (error) {
            // Network or other errors
            messageDiv.style.display = 'block';
            messageDiv.classList.add('show', 'error');
            messageDiv.classList.remove('success');
            messageDiv.textContent = 'Error: Unable to send message. Please try again later.';
            console.error('Form submission error:', error);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}