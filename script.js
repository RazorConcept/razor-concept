// Mobile menu toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    const scrollPosition = window.pageYOffset;
    heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-item, .social-button');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize animations on page load
window.addEventListener('load', () => {
    animateOnScroll();
});

// Add a subtle hover effect to buttons
const buttons = document.querySelectorAll('.cta-button, .button');
buttons.forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
    });
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});

// Add a typing effect to the hero headline
const heroHeadline = document.querySelector('.hero-content h1');
const text = heroHeadline.textContent;
heroHeadline.textContent = '';
let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        heroHeadline.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
};
typeWriter();

// Ensure video autoplay
document.addEventListener('DOMContentLoaded', function() {
    var video = document.getElementById('hero-video');
    
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
});