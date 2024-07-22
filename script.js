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
    if (heroContent) {
        const scrollPosition = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
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
if (heroHeadline) {
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
}

// Ensure video autoplay
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
});

// Login form handling
const loginForm = document.getElementById('login');
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard.html'; // Redirect to dashboard
            } else {
                const errorText = await response.text();
                alert(`Login failed: ${errorText}`);
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred during login. Please try again.');
        }
    });
}

// Signup form handling
const signupForm = document.getElementById('signup');
if (signupForm) {
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard.html'; // Redirect to dashboard
            } else {
                const errorText = await response.text();
                alert(`Signup failed: ${errorText}`);
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('An error occurred during signup. Please try again.');
        }
    });
}