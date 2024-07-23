// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const headerOffset = 60;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        const scrollPosition = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    }
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-item, .social-button, .approach-step, .contact-method');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('fade-in-up');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add a subtle touch effect to buttons for mobile
const buttons = document.querySelectorAll('.cta-button, .button, .social-button');
buttons.forEach(button => {
    button.addEventListener('touchstart', () => {
        button.style.transform = 'scale(0.95)';
    });
    button.addEventListener('touchend', () => {
        button.style.transform = 'scale(1)';
    });
});

// Typing effect for hero text
const heroText = "Simple Steps,<br>Smart Solutions";
const typingSpeed = 50; // Adjust this value to change typing speed (lower is faster)
let i = 0;

function typeWriter() {
    const typingElement = document.getElementById('typing-text');
    if (typingElement && i < heroText.length) {
        if (heroText.substring(i, i + 4) === '<br>') { // Check for the <br> tag
            typingElement.innerHTML += '<br>';
            i += 4; // Skip over the <br> tag
        } else {
            typingElement.innerHTML += heroText.charAt(i);
            i++;
        }
        setTimeout(typeWriter, typingSpeed);
    }
}

// Ensure video autoplay and implement typing effect
document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('hero-video');
    if (video) {
        function playVideo() {
            video.play().catch(function(error) {
                console.log("Auto-play was prevented");
                showPlayButton();
            });
        }

        playVideo();

        video.addEventListener('loadedmetadata', function() {
            if (video.paused) {
                playVideo();
            }
        });

        function showPlayButton() {
            var playButton = document.createElement('button');
            playButton.textContent = 'Play Video';
            playButton.className = 'play-button';
            playButton.onclick = function() {
                video.play();
                this.style.display = 'none';
            };
            video.parentNode.insertBefore(playButton, video.nextSibling);
        }
    }

    // Start typing effect
    typeWriter();
});

// Make logo navigate to index.html or scroll to top if already on index
const logo = document.querySelector('.logo-container a');
if (logo) {
    logo.addEventListener('click', function(e) {
        e.preventDefault();
        const currentPath = window.location.pathname;
        if (currentPath.endsWith('index.html') || currentPath === '/' || currentPath === '') {
            // On the index page, scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else if (currentPath.includes('/pages/')) {
            // In a subdirectory, go up one level
            window.location.href = '../index.html';
        } else {
            // Not in a subdirectory, just go to index.html
            window.location.href = 'index.html';
        }
    });
}

// Add pulsing effect to CTA buttons
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.classList.add('pulse');
});

// Interactive form validation for contact page
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        const inputs = this.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('invalid');
            } else {
                input.classList.remove('invalid');
            }
        });
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Add touch-based interactivity for mobile devices
document.addEventListener('touchstart', function() {}, true);

// Lazy loading for images
const images = document.querySelectorAll('img[data-src]');
const config = {
    rootMargin: '50px 0px',
    threshold: 0.01
};

let imageObserver = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            preloadImage(entry.target);
            self.unobserve(entry.target);
        }
    });
}, config);

images.forEach(image => {
    imageObserver.observe(image);
});

function preloadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) { return; }
    img.src = src;
}

// Add more interactivity to service items
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('expanded');
    });
});