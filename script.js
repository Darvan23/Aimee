// Aimee's Website Interactive Features

// Password Protection System
class PasswordProtection {
    constructor() {
        this.password = "Aimee26052005";
        this.attempts = 0;
        this.maxAttempts = 3;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Lock button click
        const lockButton = document.querySelector('.lock-button');
        if (lockButton) {
            lockButton.addEventListener('click', () => this.showPasswordModal());
        }

        // Password form submission
        const passwordForm = document.querySelector('.password-form');
        if (passwordForm) {
            passwordForm.addEventListener('submit', (e) => this.handlePasswordSubmit(e));
        }

        // Close modal when clicking outside
        const modal = document.querySelector('.password-modal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.hidePasswordModal();
                }
            });
        }
    }

    showPasswordModal() {
        const modal = document.querySelector('.password-modal');
        if (modal) {
            modal.classList.add('active');
            const input = modal.querySelector('.password-input');
            if (input) {
                input.focus();
            }
        }
    }

    hidePasswordModal() {
        const modal = document.querySelector('.password-modal');
        if (modal) {
            modal.classList.remove('active');
            const input = modal.querySelector('.password-input');
            if (input) {
                input.value = '';
            }
        }
    }

    handlePasswordSubmit(e) {
        e.preventDefault();
        const input = e.target.querySelector('.password-input');
        const userPassword = input.value.trim();

        if (userPassword === this.password) {
            this.showSuccess();
        } else {
            this.attempts++;
            this.showError();
            
            if (this.attempts >= this.maxAttempts) {
                this.showMaxAttempts();
            }
        }
    }

    showSuccess() {
        this.hidePasswordModal();
        this.showMessage("🎉 Access Granted! Welcome!", "success");
        
        // Show the appropriate reveal section
        const swipeReveal = document.querySelector('.swipe-reveal-container');
        const personalInfo = document.querySelector('.personal-info-container');
        
        if (swipeReveal) {
            swipeReveal.classList.add('show');
            this.initSwipeFunctionality();
        }
        
        if (personalInfo) {
            personalInfo.classList.add('show');
        }
    }

    showSwipeReveal() {
        const swipeContainer = document.querySelector('.swipe-reveal-container');
        if (swipeContainer) {
            swipeContainer.classList.add('show');
            this.initSwipeFunctionality();
        }
    }

    initSwipeFunctionality() {
        const swipeCard = document.querySelector('.swipe-card');
        const swipeHandle = document.querySelector('.swipe-handle');
        const swipeContent = document.querySelector('.swipe-content');
        let isSwipeRevealed = false;

        if (swipeHandle && swipeContent) {
            let startY = 0;
            let currentY = 0;
            let isDragging = false;

            const handleStart = (clientY) => {
                startY = clientY;
                isDragging = true;
            };

            const handleMove = (clientY) => {
                if (!isDragging) return;
                
                currentY = clientY;
                const diffY = startY - currentY;
                
                if (diffY > 0 && !isSwipeRevealed) {
                    // Swipe up to reveal
                    const revealAmount = Math.min(diffY * 0.5, 150);
                    swipeContent.style.transform = `translateY(-${revealAmount}px)`;
                    
                    if (revealAmount >= 100) {
                        isSwipeRevealed = true;
                        swipeContent.style.transform = 'translateY(-150px)';
                        this.showSecretMessage();
                    }
                }
            };

            const handleEnd = () => {
                isDragging = false;
                if (!isSwipeRevealed) {
                    swipeContent.style.transform = 'translateY(0px)';
                }
            };

            // Mouse events
            swipeHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                handleStart(e.clientY);
            });

            document.addEventListener('mousemove', (e) => {
                handleMove(e.clientY);
            });

            document.addEventListener('mouseup', handleEnd);

            // Touch events for mobile
            swipeHandle.addEventListener('touchstart', (e) => {
                e.preventDefault();
                handleStart(e.touches[0].clientY);
            });

            document.addEventListener('touchmove', (e) => {
                handleMove(e.touches[0].clientY);
            });

            document.addEventListener('touchend', handleEnd);

            // Click to reveal as fallback
            swipeHandle.addEventListener('click', () => {
                if (!isSwipeRevealed) {
                    isSwipeRevealed = true;
                    swipeContent.style.transform = 'translateY(-150px)';
                    this.showSecretMessage();
                }
            });
        }
    }

    showSecretMessage() {
        const messageText = document.querySelector('.message-text');
        if (messageText) {
            messageText.style.animation = 'fadeInScale 1s ease-out forwards';
        }
        
        // Add celebration effects
        this.createCelebration();
    }

    createCelebration() {
        // Create floating hearts effect
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.innerHTML = '💖';
                heart.style.cssText = `
                    position: fixed;
                    top: -50px;
                    left: ${Math.random() * 100}%;
                    font-size: ${Math.random() * 20 + 15}px;
                    animation: fallDown 3s ease-out forwards;
                    pointer-events: none;
                    z-index: 3000;
                `;
                document.body.appendChild(heart);
                
                setTimeout(() => heart.remove(), 3000);
            }, i * 200);
        }
    }

    showError() {
        this.showMessage("❌ Wrong password! Please try again.", "error");
    }

    showMaxAttempts() {
        this.showMessage("🔒 Maximum attempts reached! Please try again later.", "error");
        setTimeout(() => {
            this.hidePasswordModal();
            this.reset();
        }, 3000);
    }

    showMessage(message, type) {
        // Create and show message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
            color: ${type === 'success' ? '#155724' : '#721c24'};
            border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
            padding: 15px 20px;
            border-radius: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.remove();
        }, 4000);
    }

    reset() {
        this.attempts = 0;
    }
}

// Image Gallery Enhancement
class ImageGallery {
    constructor() {
        this.init();
    }

    init() {
        this.addImageModal();
        this.addHoverEffects();
    }

    addImageModal() {
        // Create modal for viewing full-size images
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 2000;
            align-items: center;
            justify-content: center;
        `;

        modal.innerHTML = `
            <div class="image-modal-content">
                <img src="" alt="" class="modal-image">
                <button class="modal-close">&times;</button>
            </div>
        `;

        document.body.appendChild(modal);

        // Add click handlers to all images
        const images = document.querySelectorAll('.cat-image, .art-image, .preview-img, .hero-cat');
        images.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => this.showImageModal(img));
        });

        // Close modal handlers
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn.addEventListener('click', () => this.hideImageModal());

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.hideImageModal();
            }
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideImageModal();
            }
        });
    }

    showImageModal(img) {
        const modal = document.querySelector('.image-modal');
        const modalImg = modal.querySelector('.modal-image');
        
        modal.style.display = 'flex';
        modalImg.src = img.src;
        modalImg.alt = img.alt;
    }

    hideImageModal() {
        const modal = document.querySelector('.image-modal');
        modal.style.display = 'none';
    }

    addHoverEffects() {
        // Add sparkle effects on hover
        const cards = document.querySelectorAll('.cat-card, .art-card, .preview-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addSparkleEffect(card);
            });
        });
    }

    addSparkleEffect(element) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 1.5rem;
            animation: sparkle 1s ease-out forwards;
            pointer-events: none;
            z-index: 10;
        `;
        
        element.style.position = 'relative';
        element.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 1000);
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all anchor links
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Floating Hearts Animation
class FloatingHearts {
    constructor() {
        this.init();
    }

    init() {
        this.createHeartContainer();
        this.startHeartAnimation();
    }

    createHeartContainer() {
        const heartContainer = document.createElement('div');
        heartContainer.className = 'heart-container';
        heartContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
        `;
        document.body.appendChild(heartContainer);
    }

    startHeartAnimation() {
        setInterval(() => {
            this.createFloatingHeart();
        }, 3000);
    }

    createFloatingHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '💖';
        heart.style.cssText = `
            position: absolute;
            bottom: -50px;
            left: ${Math.random() * 100}%;
            font-size: ${Math.random() * 20 + 10}px;
            animation: floatUp 4s ease-out forwards;
            opacity: 0.7;
        `;

        document.querySelector('.heart-container').appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    window.passwordProtection = new PasswordProtection();
    new ImageGallery();
    new SmoothScroll();
    new FloatingHearts();

    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkle {
            0% { transform: scale(0) rotate(0deg); opacity: 0; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
            100% { transform: scale(1) rotate(360deg); opacity: 0; }
        }

        @keyframes floatUp {
            0% { transform: translateY(0) rotate(0deg); opacity: 0; }
            10% { opacity: 0.7; }
            90% { opacity: 0.7; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }

        @keyframes slideIn {
            0% { transform: translateX(100%); opacity: 0; }
            100% { transform: translateX(0); opacity: 1; }
        }

        .message {
            font-weight: 600;
            animation: slideIn 0.3s ease;
        }

        .image-modal-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }

        .modal-image {
            max-width: 100%;
            max-height: 100%;
            border-radius: 15px;
        }

        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            font-size: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-close:hover {
            background: #f0f0f0;
        }
    `;
    document.head.appendChild(style);
});
