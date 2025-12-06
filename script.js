// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);
if (typeof ScrollToPlugin !== 'undefined') {
    gsap.registerPlugin(ScrollToPlugin);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeQuoteRotation();
    initializeEasterEgg();
    initializeSmoothScrolling();
});

// Main animation initialization
function initializeAnimations() {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.hero-title', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.hero-subtitle', {
            duration: 1.2,
            y: 50,
            opacity: 0,
            ease: 'power3.out'
        }, '-=1')
        .from('.cta-button', {
            duration: 1,
            y: 30,
            opacity: 0,
            scale: 0.8,
            ease: 'back.out(1.7)'
        }, '-=0.8');

    // Cast cards - static (no animation)
    // Removed animation to make images visible immediately

    // Timeline items animation
    gsap.from('.timeline-item', {
        duration: 0.8,
        x: -100,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.schedule-timeline',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Film frame reveal animation
    gsap.from('.film-frame', {
        duration: 1.5,
        scale: 0.8,
        opacity: 0,
        rotationY: 45,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.film-container',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Awards - static (no animation)
    // Removed animation to make awards visible immediately

    // Behind the scenes photos animation
    gsap.from('.behind-photo', {
        duration: 1,
        scale: 0,
        opacity: 0,
        stagger: 0.3,
        ease: 'back.out(1.7)',
        scrollTrigger: {
            trigger: '.behind-photos',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Share section - static (no animation)
    // Removed animation to make buttons visible immediately

    // Section titles animation
    gsap.from('.section-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.section-title',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
        }
    });

    // Navbar animation on scroll
    gsap.to('.navbar', {
        backgroundColor: 'rgba(0, 0, 0, 0.98)',
        duration: 0.3,
        scrollTrigger: {
            trigger: 'body',
            start: '100px top',
            end: 'bottom top',
            toggleActions: 'play none none reverse'
        }
    });
}

// Quote rotation functionality - static display, no autoscroll
function initializeQuoteRotation() {
    const quotes = document.querySelectorAll('.quote');

    // Make all quotes visible
    quotes.forEach((quote, index) => {
        quote.style.opacity = '1';
        // Remove active class rotation - all quotes are visible
    });
}

// Easter egg functionality
function initializeEasterEgg() {
    const logo = document.getElementById('festival-logo');
    let clickCount = 0;
    let clickTimeout;

    logo.addEventListener('click', function() {
        clickCount++;
        clearTimeout(clickTimeout);
        
        // Add visual feedback
        gsap.to(logo, {
            scale: 1.1,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: 'power2.inOut'
        });

        if (clickCount >= 5) {
            triggerEasterEgg();
            clickCount = 0;
        }

        // Reset counter after 2 seconds
        clickTimeout = setTimeout(() => {
            clickCount = 0;
        }, 2000);
    });
}

function triggerEasterEgg() {
    // Create a special effect
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
    `;
    document.body.appendChild(confetti);

    // Create confetti particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: #d4af37;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: -10px;
        `;
        confetti.appendChild(particle);

        // Animate particle
        gsap.to(particle, {
            y: window.innerHeight + 100,
            x: (Math.random() - 0.5) * 200,
            rotation: Math.random() * 360,
            duration: 3 + Math.random() * 2,
            ease: 'power2.out',
            onComplete: () => {
                particle.remove();
            }
        });
    }

    // Show special message
    const message = document.createElement('div');
    message.innerHTML = '🎬 Director\'s Cut Unlocked! 🎬<br><small>Same video, but now with 100% more confusion!</small>';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #d4af37;
        padding: 2rem;
        border-radius: 15px;
        border: 2px solid #d4af37;
        text-align: center;
        font-family: 'Playfair Display', serif;
        font-size: 1.5rem;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;
    document.body.appendChild(message);

    // Animate message
    gsap.from(message, {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'back.out(1.7)'
    });

    // Remove elements after animation
    setTimeout(() => {
        gsap.to(message, {
            scale: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                message.remove();
                confetti.remove();
            }
        });
    }, 3000);

    // Play special sound effect (if available)
    playEasterEggSound();
}

function playEasterEggSound() {
    // Create a simple beep sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
        console.log('Audio not available');
    }
}

// Smooth scrolling for navigation
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Try GSAP ScrollTo first, fallback to native smooth scroll
                if (typeof ScrollToPlugin !== 'undefined') {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: {
                            y: targetSection,
                            offsetY: 80
                        },
                        ease: 'power3.inOut'
                    });
                } else {
                    // Fallback to native smooth scrolling
                    const offset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Utility function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Try GSAP ScrollTo first, fallback to native smooth scroll
        if (typeof ScrollToPlugin !== 'undefined') {
            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: section,
                    offsetY: 80
                },
                ease: 'power3.inOut'
            });
        } else {
            // Fallback to native smooth scrolling
            const offset = 80;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Share functionality
function shareMasterpiece() {
    const shareText = "Check out this masterpiece at the Festival of Accidental Genius! 🎬✨";
    const shareUrl = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: 'Festival of Accidental Genius',
            text: shareText,
            url: shareUrl
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
            showShareNotification('Link copied to clipboard!');
        });
    }
}

function shareOnWhatsApp() {
    const text = "Check out this masterpiece at the Festival of Accidental Genius! 🎬✨";
    const url = window.location.href;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
}

function shareOnTelegram() {
    const text = "Check out this masterpiece at the Festival of Accidental Genius! 🎬✨";
    const url = window.location.href;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(telegramUrl, '_blank');
}

function shareOnTwitter() {
    const text = "Check out this masterpiece at the Festival of Accidental Genius! 🎬✨";
    const url = window.location.href;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank');
}

function showShareNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #d4af37;
        color: #000;
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
    `;
    document.body.appendChild(notification);

    gsap.from(notification, {
        x: 300,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.out'
    });

    setTimeout(() => {
        gsap.to(notification, {
            x: 300,
            opacity: 0,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: () => notification.remove()
        });
    }, 3000);
}

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // CTA button hover effect
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    }

    // Cast cards hover effects
    const castCards = document.querySelectorAll('.cast-card');
    castCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });

    // Award items hover effects
    const awardItems = document.querySelectorAll('.award-item');
    awardItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            gsap.to(this, {
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        item.addEventListener('mouseleave', function() {
            gsap.to(this, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
});

// Parallax effect for hero background
gsap.to('.film-reel', {
    rotation: 360,
    duration: 20,
    repeat: -1,
    ease: 'none'
});

// Add loading animation
window.addEventListener('load', function() {
    gsap.from('body', {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
    });
});
