document.addEventListener('DOMContentLoaded', function() {
    // Remove preloader when page loads
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        gsap.to(preloader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => preloader.remove()
        });
    });

    // Animated tech logos
    const logos = ['react', 'node', 'nextjs', 'typescript', 'graphql', 'aws'];
    const container = document.getElementById('animated-logos');
    
    logos.forEach(logo => {
        for (let i = 0; i < 3; i++) {
            const img = document.createElement('img');
            img.src = `icons/${logo}.svg`;
            img.className = 'tech-logo';
            img.style.width = `${Math.random() * 80 + 40}px`;
            img.style.left = `${Math.random() * 100}%`;
            img.style.animationDuration = `${Math.random() * 20 + 10}s`;
            img.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(img);
        }
    });

    // GSAP animations
    gsap.utils.toArray('.fade-in').forEach((el, i) => {
        gsap.from(el, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power2.out"
        });
    });

    // Initialize particles
    particlesJS('particles-js', particlesConfig);
});