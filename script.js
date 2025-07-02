// Navigation and Page Management
class PortfolioApp {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupTimeline();
        this.setupScrollAnimations();
        this.setupContactForm();
        this.setupMobileMenu();
        this.setupGifControl();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const glassPanels = document.querySelectorAll('.glass-panel');
        const glassBtns = document.querySelectorAll('.glass-btn');

        // Navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.navigateToPage(target);
            });
        });

        // Glass panel hover/focus/slide logic
        function setAllDimmed() {
            glassPanels.forEach(p => p.classList.add('dimmed'));
        }
        function clearAllDimmed() {
            glassPanels.forEach(p => p.classList.remove('dimmed'));
        }
        function clearShifts() {
            glassPanels.forEach(p => {
                p.classList.remove('shift-left');
                p.classList.remove('shift-right');
            });
        }
        setAllDimmed(); // Both dimmed by default
        glassPanels.forEach((panel, idx) => {
            panel.addEventListener('mouseenter', () => {
                clearAllDimmed();
                clearShifts();
                panel.classList.remove('dimmed');
                if (glassPanels.length === 2) {
                    if (idx === 0) glassPanels[1].classList.add('shift-right');
                    if (idx === 1) glassPanels[0].classList.add('shift-left');
                } else {
                    glassPanels.forEach((p, i) => {
                        if (i < idx) p.classList.add('shift-left');
                        if (i > idx) p.classList.add('shift-right');
                    });
                }
            });
            panel.addEventListener('mouseleave', () => {
                setAllDimmed();
                clearShifts();
            });
            panel.addEventListener('focusin', () => {
                clearAllDimmed();
                clearShifts();
                panel.classList.remove('dimmed');
                if (glassPanels.length === 2) {
                    if (idx === 0) glassPanels[1].classList.add('shift-right');
                    if (idx === 1) glassPanels[0].classList.add('shift-left');
                } else {
                    glassPanels.forEach((p, i) => {
                        if (i < idx) p.classList.add('shift-left');
                        if (i > idx) p.classList.add('shift-right');
                    });
                }
            });
            panel.addEventListener('focusout', () => {
                setAllDimmed();
                clearShifts();
            });
            // Make glass-panel links trigger SPA navigation
            panel.addEventListener('click', (e) => {
                e.preventDefault();
                if (panel.classList.contains('glass-career')) {
                    this.smoothTransitionToPage('career');
                } else if (panel.classList.contains('glass-cooking')) {
                    this.smoothTransitionToPage('cooking');
                }
            });
        });

        // Glass button navigation
        glassBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                if (btn.classList.contains('glass-btn-career')) {
                    this.smoothTransitionToPage('career');
                } else if (btn.classList.contains('glass-btn-cooking')) {
                    this.smoothTransitionToPage('cooking');
                }
            });
        });

        // Home links
        const homeLinks = document.querySelectorAll('.home-link');
        homeLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothTransitionFromPageToPersonality();
            });
        });

        // Hero progress button click to personality split
        const heroProgressBtn = document.getElementById('hero-progress-btn');
        if (heroProgressBtn) {
            heroProgressBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToPage('personality');
            });
        }

        // Scroll arrow button triggers smooth scroll/transition to personality split
        const scrollArrowBtn = document.getElementById('scroll-arrow-btn');
        if (scrollArrowBtn) {
            // Add both event listener and onclick for testing
            scrollArrowBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothTransitionToPersonality();
            });
            
            // Also add onclick as backup
            scrollArrowBtn.onclick = (e) => {
                e.preventDefault();
                this.smoothTransitionToPersonality();
            };
        }

        // Home button in personality split
        const personalityHomeBtn = document.getElementById('personality-home-btn');
        if (personalityHomeBtn) {
            personalityHomeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothTransitionToHome();
            });
        }

        // Home nav tile hover image swap logic (background-image version)
        const heroNavTiles = document.querySelectorAll('.hero-nav-tile');
        const heroDynamicImgBg = document.querySelector('.hero-dynamic-img-bg');
        let navTileHovering = false;
        heroNavTiles.forEach(tile => {
            tile.addEventListener('mouseenter', () => {
                navTileHovering = true;
                if (heroDynamicImgBg && tile.dataset.img) {
                    heroDynamicImgBg.classList.add('crossfade');
                    setTimeout(() => {
                        heroDynamicImgBg.style.backgroundImage = `url('${tile.dataset.img}')`;
                        heroDynamicImgBg.classList.remove('crossfade');
                    }, 200);
                }
            });
            tile.addEventListener('focus', () => {
                navTileHovering = true;
                if (heroDynamicImgBg && tile.dataset.img) {
                    heroDynamicImgBg.classList.add('crossfade');
                    setTimeout(() => {
                        heroDynamicImgBg.style.backgroundImage = `url('${tile.dataset.img}')`;
                        heroDynamicImgBg.classList.remove('crossfade');
                    }, 200);
                }
            });
            tile.addEventListener('mouseleave', () => {
                navTileHovering = false;
                setTimeout(() => {
                    if (!navTileHovering && heroDynamicImgBg) {
                        heroDynamicImgBg.classList.add('crossfade');
                        setTimeout(() => {
                            heroDynamicImgBg.style.backgroundImage = `url('images/olie.jpg')`;
                            heroDynamicImgBg.classList.remove('crossfade');
                        }, 200);
                    }
                }, 50);
            });
            tile.addEventListener('blur', () => {
                navTileHovering = false;
                setTimeout(() => {
                    if (!navTileHovering && heroDynamicImgBg) {
                        heroDynamicImgBg.classList.add('crossfade');
                        setTimeout(() => {
                            heroDynamicImgBg.style.backgroundImage = `url('images/olie.jpg')`;
                            heroDynamicImgBg.classList.remove('crossfade');
                        }, 200);
                    }
                }, 50);
            });
        });
    }

    navigateToPage(target) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(page => page.classList.remove('active'));

        // Special handling for home page scroll lock
        if (target === 'home') {
            document.body.classList.add('home-active');
        } else {
            document.body.classList.remove('home-active');
        }

        // Animate hero section out if leaving home
        if (this.currentPage === 'home' && target !== 'home') {
            const heroLeft = document.querySelector('.hero-left');
            const heroRight = document.querySelector('.hero-right');
            if (heroLeft) heroLeft.classList.add('hero-leave');
            if (heroRight) heroRight.classList.add('hero-leave');
            setTimeout(() => {
                if (heroLeft) heroLeft.classList.remove('hero-leave');
                if (heroRight) heroRight.classList.remove('hero-leave');
                const nextPage = document.getElementById(target);
                if (nextPage) nextPage.classList.add('active');
            }, 500);
        } else {
            const nextPage = document.getElementById(target);
            if (nextPage) nextPage.classList.add('active');
        }
        this.currentPage = target;
    }

    updateNavigation(activePage) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activePage}`) {
                link.classList.add('active');
            }
        });
    }

    triggerPageAnimations(pageName) {
        if (pageName === 'career') {
            this.animateTimelineItems();
        }
    }

    setupTimeline() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Add scroll animations for timeline items
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.3
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });

        // Setup scroll-based dot illumination
        this.setupTimelineDotIllumination();
    }

    setupTimelineDotIllumination() {
        const timelineContents = document.querySelectorAll('.timeline-content');
        const timelineDates = document.querySelectorAll('.timeline-date-opposite');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add in-view class when timeline content is fully visible
                    entry.target.classList.add('in-view');
                } else {
                    // Remove in-view class when timeline content is not visible
                    entry.target.classList.remove('in-view');
                }
            });
        }, {
            threshold: 0.6, // Reduced from 0.8 to 0.6 for smoother transitions
            rootMargin: '0px 0px -20% 0px' // Increased margin for earlier triggering
        });

        timelineContents.forEach(content => {
            observer.observe(content);
        });

        // Also observe date elements for fade in/out
        timelineDates.forEach(date => {
            observer.observe(date);
        });
    }

    animateTimelineItems() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.3, // Reduced from 0.85 to 0.3 for smoother triggering
            rootMargin: '0px 0px -10% 0px'
        });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px' // Reduced margin for better performance
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.project-card, .cooking-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease'; // Reduced from 0.6s to 0.4s
            observer.observe(el);
        });
    }

    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                var name = contactForm.querySelector('input[name="name"]');
                var email = contactForm.querySelector('input[name="email"]');
                var message = contactForm.querySelector('textarea[name="message"]');
                var valid = true;
                
                // Remove previous error styles and messages
                [name, email, message].forEach(function(input) {
                    input.style.border = '';
                });
                
                // Remove existing error message
                var existingError = contactForm.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                // Check if name is filled
                if (!name.value.trim()) {
                    name.style.border = '2px solid #ff4444';
                    valid = false;
                }
                
                // Check if email is filled and valid
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!email.value.trim()) {
                    email.style.border = '2px solid #ff4444';
                    valid = false;
                } else if (!emailRegex.test(email.value.trim())) {
                    email.style.border = '2px solid #ff4444';
                    valid = false;
                }
                
                if (!valid) {
                    e.preventDefault();
                    var errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.style.cssText = 'color: #ff4444; font-size: 0.9rem; margin-top: 0.5rem; text-align: center;';
                    
                    if (!name.value.trim() && !email.value.trim()) {
                        errorMsg.textContent = 'Please fill in both name and email fields.';
                    } else if (!name.value.trim()) {
                        errorMsg.textContent = 'Please enter your name.';
                    } else if (!email.value.trim()) {
                        errorMsg.textContent = 'Please enter your email address.';
                    } else if (!emailRegex.test(email.value.trim())) {
                        errorMsg.textContent = 'Please enter a valid email address.';
                    }
                    
                    contactForm.appendChild(errorMsg);
                } else {
                    // Always send the message to Google Sheets
                    const data = {
                        name: name.value,
                        email: email.value,
                        message: message.value
                    };
                    fetch('https://script.google.com/macros/s/AKfycbwhg24HBlv__Ix6CBBo1VRNP_za-OFyX1-8ziIfebBcpBizh5PGLpelNAYTyBLCUvfK/exec', {
                        method: 'POST',
                        mode: 'no-cors',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    // Special Roxanne/babe/pookie case
                    if (isRoxanneCase(name.value, email.value)) {
                        e.preventDefault();
                        // Show small notification
                        showNotification('Your message has been sent!', 'success');
                        // Fade out form, fade in question
                        const left = contactForm.closest('.hero-left');
                        fadeOutIn(left, () => {
                            showRoxanneQuestion(left);
                        });
                        return;
                    }
                    // Special Andrew/Andjew case
                    if (isAndrewCase(name.value, email.value)) {
                        e.preventDefault();
                        // Show small notification
                        showNotification('Your message has been sent!', 'success');
                        // Fade out form, fade in question
                        const left = contactForm.closest('.hero-left');
                        fadeOutIn(left, () => {
                            showAndrewQuestion(left);
                        });
                        return;
                    }
                    // Form is valid - show success animation and reset
                    e.preventDefault();
                    
                    // Create sleek success animation
                    var successOverlay = document.createElement('div');
                    successOverlay.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.92);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        z-index: 10000;
                        opacity: 0;
                        transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    `;
                    
                    var successContent = document.createElement('div');
                    successContent.style.cssText = `
                        text-align: center;
                        color: white;
                        transform: translateY(20px);
                        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                    `;
                    
                    successContent.innerHTML = `
                        <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0; transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s; color: #ffffff;">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div style="font-size: 1.5rem; font-weight: 500; margin-bottom: 0.5rem; opacity: 0; transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s; color: #ffffff;">
                            Message Sent
                        </div>
                        <div style="font-size: 1rem; opacity: 0.8; opacity: 0; transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.6s; color: #cccccc;">
                            Thank you for reaching out!
                        </div>
                    `;
                    
                    successOverlay.appendChild(successContent);
                    document.body.appendChild(successOverlay);
                    
                    // Animate in
                    setTimeout(() => {
                        successOverlay.style.opacity = '1';
                        successContent.style.transform = 'translateY(0)';
                        
                        // Animate in the icon and text elements
                        setTimeout(() => {
                            successContent.querySelectorAll('div').forEach((el, index) => {
                                setTimeout(() => {
                                    el.style.opacity = '1';
                                }, index * 200);
                            });
                        }, 300);
                    }, 50);
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Animate out after 2.5 seconds
                    setTimeout(() => {
                        successOverlay.style.opacity = '0';
                        successContent.style.transform = 'translateY(-20px)';
                        setTimeout(() => {
                            document.body.removeChild(successOverlay);
                        }, 600);
                    }, 2500);
                }
            });
        }
    }

    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close menu when clicking on a link
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#64ffda' : '#ff6b6b'};
            color: #0a0a0a;
            border-radius: 6px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    smoothTransitionToPersonality() {
        const homeSection = document.getElementById('home');
        const personalitySection = document.getElementById('personality');
        
        if (homeSection && personalitySection) {
            // Fade out home section with smooth animation
            homeSection.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            homeSection.style.opacity = '0';
            homeSection.style.transform = 'translateY(-30px) scale(0.98)';
            
            // After home fades out, fade in personality section
            setTimeout(() => {
                homeSection.classList.remove('active');
                homeSection.style.opacity = '';
                homeSection.style.transform = '';
                
                // Prepare personality section for fade in
                personalitySection.style.opacity = '0';
                personalitySection.style.transform = 'translateY(30px) scale(0.98)';
                personalitySection.classList.add('active');
                
                // Fade in personality section
                setTimeout(() => {
                    personalitySection.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    personalitySection.style.opacity = '1';
                    personalitySection.style.transform = 'translateY(0) scale(1)';
                    
                    // Clean up styles after animation
                    setTimeout(() => {
                        personalitySection.style.transition = '';
                        personalitySection.style.opacity = '';
                        personalitySection.style.transform = '';
                    }, 800);
                }, 50);
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 800);
        }
    }

    smoothTransitionToHome() {
        document.body.classList.add('home-active');
        
        const personalitySection = document.getElementById('personality');
        const homeSection = document.getElementById('home');
        
        if (personalitySection && homeSection) {
            // Fade out personality section
            personalitySection.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            personalitySection.style.opacity = '0';
            personalitySection.style.transform = 'translateY(30px) scale(0.98)';
            
            setTimeout(() => {
                personalitySection.classList.remove('active');
                personalitySection.style.opacity = '';
                personalitySection.style.transform = '';
                
                // Prepare home section for fade in
                homeSection.style.opacity = '0';
                homeSection.style.transform = 'translateY(-30px) scale(0.98)';
                homeSection.classList.add('active');
                
                // Fade in home section
                setTimeout(() => {
                    homeSection.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    homeSection.style.opacity = '1';
                    homeSection.style.transform = 'translateY(0) scale(1)';
                    
                    // Clean up styles after animation
                    setTimeout(() => {
                        homeSection.style.transition = '';
                        homeSection.style.opacity = '';
                        homeSection.style.transform = '';
                    }, 800);
                }, 50);
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 800);
        }
    }

    smoothTransitionToPage(target) {
        const personalitySection = document.getElementById('personality');
        const targetSection = document.getElementById(target);
        
        if (personalitySection && targetSection) {
            // Fade out personality section
            personalitySection.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            personalitySection.style.opacity = '0';
            personalitySection.style.transform = 'translateY(30px) scale(0.98)';
            
            setTimeout(() => {
                personalitySection.classList.remove('active');
                personalitySection.style.opacity = '';
                personalitySection.style.transform = '';
                
                // Prepare target section for fade in
                targetSection.style.opacity = '0';
                targetSection.style.transform = 'translateY(-30px) scale(0.98)';
                targetSection.classList.add('active');
                
                // Fade in target section
                setTimeout(() => {
                    targetSection.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    targetSection.style.opacity = '1';
                    targetSection.style.transform = 'translateY(0) scale(1)';

                    // Fade in career bio+image if entering career page
                    if (targetSection.id === 'career') {
                        const introContent = targetSection.querySelector('.career-intro-content');
                        if (introContent) {
                            introContent.style.opacity = '0';
                            setTimeout(() => {
                                introContent.style.opacity = '1';
                                introContent.classList.add('hero-title-fade-in');
                                setTimeout(() => introContent.classList.remove('hero-title-fade-in'), 800);
                            }, 200);
                        }
                    }

                    // Clean up styles after animation
                    setTimeout(() => {
                        targetSection.style.transition = '';
                        targetSection.style.opacity = '';
                        targetSection.style.transform = '';
                    }, 800);
                }, 50);
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 800);
        }
    }

    smoothTransitionFromPageToPersonality() {
        const currentPage = document.querySelector('.page.active');
        const personalitySection = document.getElementById('personality');
        
        if (currentPage && personalitySection && currentPage.id !== 'personality') {
            // Fade out current page
            currentPage.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            currentPage.style.opacity = '0';
            currentPage.style.transform = 'translateY(-30px) scale(0.98)';
            
            setTimeout(() => {
                currentPage.classList.remove('active');
                currentPage.style.opacity = '';
                currentPage.style.transform = '';
                
                // Prepare personality section for fade in
                personalitySection.style.opacity = '0';
                personalitySection.style.transform = 'translateY(30px) scale(0.98)';
                personalitySection.classList.add('active');
                
                // Fade in personality section
                setTimeout(() => {
                    personalitySection.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                    personalitySection.style.opacity = '1';
                    personalitySection.style.transform = 'translateY(0) scale(1)';
                    
                    // Clean up styles after animation
                    setTimeout(() => {
                        personalitySection.style.transition = '';
                        personalitySection.style.opacity = '';
                        personalitySection.style.transform = '';
                    }, 800);
                }, 50);
                
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 800);
        }
    }

    setupGifControl() {
        const careerHalf = document.querySelector('.personality-career');
        const cookingHalf = document.querySelector('.personality-cooking');
        const personalitySection = document.querySelector('#personality');
        
        if (!careerHalf || !cookingHalf) return;
        
        // Store references to the pseudo-elements (we'll control them via CSS classes)
        let careerGifPaused = false;
        let cookingGifPaused = false;
        let isHoveringCareer = false;
        let isHoveringCooking = false;
        
        // Allow GIFs to play for 0.5 seconds when page loads
        setTimeout(() => {
            // Enable hover pause functionality after initial play
            this.enableGifHoverPause();
        }, 500);
        
        // Method to enable hover pause functionality
        this.enableGifHoverPause = () => {
            // Career half hover events
            careerHalf.addEventListener('mouseenter', () => {
                isHoveringCareer = true;
                if (!cookingGifPaused) {
                    cookingHalf.classList.add('gif-paused');
                    cookingGifPaused = true;
                }
            });
            
            careerHalf.addEventListener('mouseleave', () => {
                isHoveringCareer = false;
                if (cookingGifPaused && !isHoveringCooking) {
                    cookingHalf.classList.remove('gif-paused');
                    cookingGifPaused = false;
                }
            });
            
            // Cooking half hover events
            cookingHalf.addEventListener('mouseenter', () => {
                isHoveringCooking = true;
                if (!careerGifPaused) {
                    careerHalf.classList.add('gif-paused');
                    careerGifPaused = true;
                }
            });
            
            cookingHalf.addEventListener('mouseleave', () => {
                isHoveringCooking = false;
                if (careerGifPaused && !isHoveringCareer) {
                    careerHalf.classList.remove('gif-paused');
                    careerGifPaused = false;
                }
            });
            
            // Handle when cursor leaves the entire personality section
            personalitySection.addEventListener('mouseleave', () => {
                // Reset both GIFs to normal state
                isHoveringCareer = false;
                isHoveringCooking = false;
                if (careerGifPaused) {
                    careerHalf.classList.remove('gif-paused');
                    careerGifPaused = false;
                }
                if (cookingGifPaused) {
                    cookingHalf.classList.remove('gif-paused');
                    cookingGifPaused = false;
                }
            });
        };
    }
}

// Particle Animation for Hero Section
class ParticleAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.init();
    }

    init() {
        // Removed particle animation from hero-right section
        // const heroRight = document.querySelector('.hero-right');
        // if (heroRight) {
        //     this.canvas.style.position = 'absolute';
        //     this.canvas.style.top = '0';
        //     this.canvas.style.left = '0';
        //     this.canvas.style.width = '100%';
        //     this.canvas.style.height = '100%';
        //     this.canvas.style.zIndex = '1';
        //     
        //     heroRight.appendChild(this.canvas);
        //     this.resize();
        //     this.createParticles();
        //     this.animate();
        //     
        //     window.addEventListener('resize', () => this.resize());
        // }
        
        // Also add particles to personality page
        const personalitySection = document.getElementById('personality');
        if (personalitySection) {
            this.createPersonalityParticles();
        }
    }

    resize() {
        const heroRight = document.querySelector('.hero-right');
        if (heroRight) {
            this.canvas.width = heroRight.offsetWidth;
            this.canvas.height = heroRight.offsetHeight;
        }
    }

    createParticles() {
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }

    createPersonalityParticles() {
        const personalitySection = document.getElementById('personality');
        if (!personalitySection) return;
        
        // Create canvas for personality particles
        const personalityCanvas = document.createElement('canvas');
        const personalityCtx = personalityCanvas.getContext('2d');
        const personalityParticles = [];
        
        personalityCanvas.style.position = 'absolute';
        personalityCanvas.style.top = '0';
        personalityCanvas.style.left = '0';
        personalityCanvas.style.width = '100%';
        personalityCanvas.style.height = '100%';
        personalityCanvas.style.zIndex = '1';
        personalityCanvas.style.pointerEvents = 'none';
        
        personalitySection.appendChild(personalityCanvas);
        
        // Set canvas size
        const resizePersonalityCanvas = () => {
            personalityCanvas.width = personalitySection.offsetWidth;
            personalityCanvas.height = personalitySection.offsetHeight;
        };
        
        resizePersonalityCanvas();
        window.addEventListener('resize', resizePersonalityCanvas);
        
        // Create particles
        for (let i = 0; i < 30; i++) {
            personalityParticles.push({
                x: Math.random() * personalityCanvas.width,
                y: Math.random() * personalityCanvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
        
        // Animate personality particles
        const animatePersonalityParticles = () => {
            personalityCtx.clearRect(0, 0, personalityCanvas.width, personalityCanvas.height);
            
            personalityParticles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                if (particle.x < 0 || particle.x > personalityCanvas.width) particle.vx *= -1;
                if (particle.y < 0 || particle.y > personalityCanvas.height) particle.vy *= -1;
                
                personalityCtx.beginPath();
                personalityCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                personalityCtx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
                personalityCtx.fill();
            });
            
            requestAnimationFrame(animatePersonalityParticles);
        };
        
        animatePersonalityParticles();
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        // Add smooth scrolling to all internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Hover Effects
class HoverEffects {
    constructor() {
        this.init();
    }

    init() {
        // Add hover effects to cards
        const cards = document.querySelectorAll('.project-card, .cooking-card, .timeline-content');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.addHoverEffect(e.target);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.removeHoverEffect(e.target);
            });
        });
    }

    addHoverEffect(element) {
        element.style.transform = 'translateY(-5px) scale(1.02)';
        element.style.boxShadow = '0 15px 35px rgba(184, 41, 255, 0.15)';
    }

    removeHoverEffect(element) {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.boxShadow = 'none';
    }
}

// Typewriter Animation
class TypewriterAnimation {
    constructor() {
        this.words = ['VLSI', 'Digital Design', 'Computer Architecture', 'ASIC Verification', 'Physical Design', 'Hardware Acceleration'];
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseTime = 2000;
        this.init();
    }

    init() {
        const typewriterElement = document.getElementById('typewriter-text');
        if (typewriterElement) {
            this.element = typewriterElement;
            this.type();
        }
    }

    type() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = currentWord.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
        } else {
            // Typing characters
            this.element.textContent = currentWord.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

        if (!this.isDeleting && this.currentCharIndex === currentWord.length) {
            // Word is complete, pause then start deleting
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentCharIndex === 0) {
            // Word is deleted, move to next word
            this.isDeleting = false;
            this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
            typeSpeed = 500; // Pause before starting next word
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Removed loading overlay logic
    window.portfolioAppInstance = new PortfolioApp();
    new ParticleAnimation();
    new SmoothScroll();
    new HoverEffects();
    new TypewriterAnimation();
    // Always fade in career bio+image on load
    const introContent = document.querySelector('#career .career-intro-content');
    if (introContent) {
        introContent.style.opacity = '0';
        setTimeout(() => {
            introContent.classList.add('hero-title-fade-in');
            introContent.style.opacity = '1';
            setTimeout(() => introContent.classList.remove('hero-title-fade-in'), 800);
        }, 200);
    }
    if (document.querySelector('.contact-page')) {
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.remove('fade-in');
            void el.offsetWidth; // trigger reflow
            el.classList.add('fade-in');
        });
    }
});

// Add CSS for mobile menu
const mobileMenuCSS = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 100%;
            left: 0;
            width: 100%;
            background: rgba(10, 10, 10, 0.95);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 2rem;
            transform: translateY(-100%);
            transition: transform 0.3s ease;
        }
        
        .nav-menu.active {
            transform: translateY(0);
        }
        
        .nav-toggle.active .hamburger {
            transform: rotate(90deg);
        }
    }
`;

// Inject mobile menu CSS
const style = document.createElement('style');
style.textContent = mobileMenuCSS;
document.head.appendChild(style);

function splitHeroTransition(fromSection, toSection, options = {}) {
  // Only fade the .hero-left in/out, keep .hero-right static
  const fromHeroLeft = fromSection.querySelector('.hero-left');
  const toHeroLeft = toSection.querySelector('.hero-left');
  const fromHeroContent = fromHeroLeft ? fromHeroLeft.querySelector('.hero-content') : null;
  const fromHeroRight = fromSection.querySelector('.hero-right');
  const toHeroRight = toSection.querySelector('.hero-right');
  const toHeroImg = toHeroRight ? toHeroRight.querySelector('.hero-dynamic-img-bg') : null;
  const toHeroButtons = toSection.querySelectorAll('.hero-nav-row, .hero-nav-tile');

  // Prepare career/cooking intro content for fade-in
  if (toSection.classList.contains('career-page')) {
    const introContent = toHeroLeft.querySelector('.career-intro-content');
    if (introContent) {
      introContent.style.opacity = '0';
    }
  }
  if (toSection.classList.contains('cooking-page')) {
    const cookingBio = toHeroLeft.querySelector('.career-bio');
    if (cookingBio) {
      cookingBio.style.opacity = '0';
    }
  }
  if (fromHeroContent) {
    fromHeroContent.classList.add('hero-content-fade-out');
  }
  setTimeout(() => {
    if (fromHeroContent) fromHeroContent.classList.remove('hero-content-fade-out');
    fromHeroLeft.classList.add('hero-left-fade-out');
    setTimeout(() => {
      fromSection.classList.remove('active');
      fromHeroLeft.classList.remove('hero-left-fade-out');
      toSection.classList.add('active');
      toHeroLeft.classList.add('hero-left-fade-in');
      // --- Animate right image and buttons ---
      if (toHeroImg) {
        toHeroImg.style.opacity = '0';
        toHeroImg.style.transform = 'translateY(20px)';
        setTimeout(() => {
          toHeroImg.style.transition = 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)';
          toHeroImg.style.opacity = '1';
          toHeroImg.style.transform = 'translateY(0)';
          setTimeout(() => {
            toHeroImg.style.transition = '';
          }, 800);
        }, 100);
      }
      if (toHeroButtons) {
        toHeroButtons.forEach(btn => {
          btn.style.opacity = '0';
          btn.style.transform = 'translateY(20px)';
          setTimeout(() => {
            btn.style.transition = 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)';
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0)';
            setTimeout(() => {
              btn.style.transition = '';
            }, 800);
          }, 200);
        });
      }
      setTimeout(() => {
        toHeroLeft.classList.remove('hero-left-fade-in');
        const heroTitle = toHeroLeft.querySelector('.hero-title');
        const heroContent = toHeroLeft.querySelector('.hero-content');
        if (heroTitle) {
          heroTitle.classList.add('hero-title-fade-in');
          setTimeout(() => heroTitle.classList.remove('hero-title-fade-in'), 800);
        }
        if (heroContent) {
          heroContent.classList.add('hero-content-fade-in');
          setTimeout(() => heroContent.classList.remove('hero-content-fade-in'), 800);
        }
        // For career page, fade in the title, then fade in the bio+image with a delay
        if (toSection.classList.contains('career-page')) {
          const heroTitle = toHeroLeft.querySelector('.hero-title');
          const introContent = toHeroLeft.querySelector('.career-intro-content');
          if (heroTitle) {
            heroTitle.classList.add('hero-title-fade-in');
            setTimeout(() => heroTitle.classList.remove('hero-title-fade-in'), 800);
          }
          if (introContent) {
            introContent.style.opacity = '0';
            setTimeout(() => {
              introContent.style.opacity = '1';
              introContent.classList.add('hero-title-fade-in');
              setTimeout(() => introContent.classList.remove('hero-title-fade-in'), 800);
            }, 200);
          }
        }
        // For cooking page, fade in the entire .hero-content (title+bio+picture)
        if (toSection.classList.contains('cooking-page')) {
          const heroContent = toHeroLeft.querySelector('.hero-content');
          if (heroContent) {
            heroContent.classList.add('hero-title-fade-in');
            setTimeout(() => heroContent.classList.remove('hero-title-fade-in'), 800);
          }
        }
      }, 700);
    }, 700);
  }, fromHeroContent ? 400 : 0);
}

// Animate hero-dynamic-img-bg to olie.jpg on back
function animateHeroImgToOlie(section) {
  const heroRight = section.querySelector('.hero-right .hero-dynamic-img-bg');
  if (heroRight) {
    heroRight.style.transition = 'background-image 0.6s cubic-bezier(0.4,0,0.2,1), opacity 0.6s';
    heroRight.style.opacity = '0.5';
    setTimeout(() => {
      heroRight.style.backgroundImage = "url('images/olie.jpg')";
      heroRight.style.opacity = '1';
      setTimeout(() => {
        heroRight.style.transition = '';
      }, 600);
    }, 300);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Home nav tile click (split transition for career/cooking)
  document.querySelectorAll('.hero-nav-tile').forEach(tile => {
    tile.addEventListener('click', function(e) {
      e.preventDefault();
      const href = tile.getAttribute('href');
      if (!href) return;
      const targetPage = href.replace('.html','');
      const homeSection = document.getElementById('home');
      const targetSection = document.querySelector(`.${targetPage}-page`);
      if ((targetPage === 'career' || targetPage === 'cooking') && homeSection && targetSection) {
        splitHeroTransition(homeSection, targetSection);
      } else {
        // fallback: just go to the page
        window.location.href = href;
      }
    });
  });
  // Back button click (split transition for career/cooking)
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (btn.getAttribute('href') && btn.getAttribute('href').includes('index.html')) {
        const currentSection = document.querySelector('.page.active');
        const homeSection = document.getElementById('home');
        if (currentSection && homeSection && (currentSection.classList.contains('career-page') || currentSection.classList.contains('cooking-page'))) {
          e.preventDefault();
          animateHeroImgToOlie(currentSection);
          splitHeroTransition(currentSection, homeSection);
        }
      }
    });
  });
});

// Fade in the bio section on career page load or navigation
function fadeInCareerBio() {
  const bioSection = document.querySelector('.career-intro-content');
  if (bioSection) {
    // Remove in case of repeated navigation
    bioSection.classList.remove('fade-in');
    // Trigger reflow for restart
    void bioSection.offsetWidth;
    setTimeout(() => bioSection.classList.add('fade-in'), 50);
  }
}

// If using SPA navigation, hook into page change event
if (window.location.pathname.includes('career.html') || document.querySelector('.career-page.active')) {
  window.addEventListener('DOMContentLoaded', fadeInCareerBio);
  // If you have custom SPA navigation, call fadeInCareerBio() after showing the career page
}

// Special case for Roxanne/babe/pookie
function isRoxanneCase(name, email) {
  const names = ["babe", "pookie", "roxanne", "roxanne chou"];
  const emails = ["roxannechou07@gmail.com"];
  name = name.trim().toLowerCase();
  email = email.trim().toLowerCase();
  return names.includes(name) || emails.includes(email);
}

function isAndrewCase(name, email) {
  const names = ["andrew", "andjew", "andrew lin"];
  const emails = ["linandrew6@gmail.com"];
  name = name.trim().toLowerCase();
  email = email.trim().toLowerCase();
  return names.includes(name) || emails.includes(email);
}

function fadeOutIn(element, callback, duration = 900) {
  element.style.transition = `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1)`;
  element.style.opacity = '0';
  setTimeout(() => {
    if (callback) callback();
    element.style.opacity = '1';
  }, duration);
}

function showRoxanneQuestion(container) {
  container.innerHTML = '';
  // Build verification UI
  const verifyWrap = document.createElement('div');
  verifyWrap.className = 'roxanne-verify fade-in';
  verifyWrap.style.cssText = `display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 340px; max-width: 520px; width: 100%; background: none; color: #f3f3f3; font-family: 'Inter', 'Segoe UI', Arial, sans-serif;`;
  const verifyText = document.createElement('h2');
  verifyText.textContent = 'are you really roxanne 🤨🤨';
  verifyText.style.cssText = 'color: #f3f3f3; font-size: 1.25rem; font-weight: 600; text-align: center; margin-bottom: 1.2rem; letter-spacing: 0.06em; opacity: 0; transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1);';
  verifyWrap.appendChild(verifyText);
  container.appendChild(verifyWrap);
  setTimeout(() => {
    verifyText.style.opacity = '1';
    setTimeout(() => {
      fadeOutIn(verifyWrap, () => {
        container.innerHTML = '';
        // --- Multiple Choice Question ---
        const qWrap = document.createElement('div');
        qWrap.className = 'roxanne-question fade-in';
        qWrap.style.cssText = `display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 340px; max-width: 520px; width: 100%; background: none; color: #f3f3f3; font-family: 'Inter', 'Segoe UI', Arial, sans-serif;`;
        const q = document.createElement('h2');
        q.textContent = 'What is your favorite color?';
        q.style.cssText = 'color: #f3f3f3; font-size: 1.25rem; font-weight: 600; text-align: center; margin-bottom: 1.2rem; letter-spacing: 0.06em;';
        qWrap.appendChild(q);
        // Generate 3 random color names (not black)
        const colorList = ['red','blue','green','yellow','purple','orange','pink','teal','cyan','magenta','lime','brown','beige','maroon','navy','olive','gold','silver','violet','indigo','coral'];
        function getRandomColors(n) {
          const arr = [];
          while (arr.length < n) {
            const c = colorList[Math.floor(Math.random()*colorList.length)];
            if (!arr.includes(c)) arr.push(c);
          }
          return arr;
        }
        const [colorA, colorB, colorC] = getRandomColors(3);
        const choices = [
          { label: `(a) ${colorA}`, value: colorA },
          { label: `(b) ${colorB}`, value: colorB },
          { label: `(c) ${colorC}`, value: colorC },
          { label: `(d) black`, value: 'black' },
          { label: `(e) (a) and (b)`, value: 'ab' }
        ];
        const choiceList = document.createElement('div');
        choiceList.style.cssText = 'display: flex; flex-direction: column; gap: 0.7rem; width: 100%; max-width: 340px;';
        choices.forEach((choice, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = choice.label;
          btn.style.cssText = `
            width: 100%;
            background: #23272a;
            color: #f3f3f3;
            border: 1.5px solid #444;
            border-radius: 7px;
            padding: 0.85rem 0;
            font-size: 1.05rem;
            font-family: inherit;
            font-weight: 500;
            letter-spacing: 0.04em;
            cursor: pointer;
            transition: background 0.2s, color 0.2s, border 0.2s;
            margin: 0;
            outline: none;
          `;
          btn.addEventListener('mouseenter', () => {
            btn.style.background = '#3b4252';
            btn.style.borderColor = '#2563eb';
            btn.style.color = '#fff';
          });
          btn.addEventListener('mouseleave', () => {
            btn.style.background = '#23272a';
            btn.style.borderColor = '#444';
            btn.style.color = '#f3f3f3';
          });
          btn.addEventListener('click', () => {
            if (choice.value === 'black') {
              // Correct: show short answer question
              fadeOutIn(qWrap, () => {
                showRoxanneSecondQuestion(container);
              }, 900);
            } else {
              // Wrong answer: show 'who are you.' then fade back to contact form
              if (!qWrap.querySelector('.whoareyou-message')) {
                const err = document.createElement('div');
                err.className = 'whoareyou-message';
                err.textContent = 'who are you.';
                err.style.cssText = 'color: #d32f2f; font-size: 1.15rem; margin-top: 1.3rem; text-align: center; font-weight: 600; opacity: 0; transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1);';
                qWrap.appendChild(err);
                setTimeout(() => { err.style.opacity = '1'; }, 100);
                setTimeout(() => {
                  fadeOutIn(qWrap, () => {
                    window.location.reload();
                  }, 900);
                }, 2000);
              }
            }
          });
          choiceList.appendChild(btn);
        });
        qWrap.appendChild(choiceList);
        container.appendChild(qWrap);
      }, 900);
    }, 1400);
  }, 200);
}

function showRoxanneSecondQuestion(container) {
  container.innerHTML = '';
  const qWrap = document.createElement('div');
  qWrap.className = 'roxanne-question fade-in';
  qWrap.style.cssText = `display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 340px; max-width: 520px; width: 100%; background: none; color: #f3f3f3; font-family: 'Inter', 'Segoe UI', Arial, sans-serif;`;
  const q = document.createElement('h2');
  q.textContent = 'How many dates have we been on before we became official?';
  q.style.cssText = 'color: #f3f3f3; font-size: 1.25rem; font-weight: 600; text-align: center; margin-bottom: 1.2rem; letter-spacing: 0.06em;';
  qWrap.appendChild(q);
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter your answer...';
  input.style.cssText = 'width: 100%; background: #23272a; color: #f3f3f3; border: 1.5px solid #444; border-radius: 7px; padding: 0.85rem 1.1rem; font-size: 1.05rem; font-family: inherit; font-weight: 400; margin-bottom: 1.1rem; outline: none;';
  qWrap.appendChild(input);
  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.textContent = 'Submit';
  submitBtn.style.cssText = 'background: linear-gradient(90deg, #2563eb 0%, #1e293b 100%); color: #fff; border: 1.5px solid #2563eb; border-radius: 7px; padding: 0.95rem 0; font-size: 1.12rem; font-family: inherit; font-weight: 600; letter-spacing: 0.05em; cursor: pointer; box-shadow: 0 2px 16px 0 rgba(37,99,235,0.10); transition: background 0.2s, color 0.2s, border 0.2s, box-shadow 0.2s; width: 100%;';
  submitBtn.addEventListener('mouseenter', () => {
    submitBtn.style.background = 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)';
    submitBtn.style.borderColor = '#3b82f6';
  });
  submitBtn.addEventListener('mouseleave', () => {
    submitBtn.style.background = 'linear-gradient(90deg, #2563eb 0%, #1e293b 100%)';
    submitBtn.style.borderColor = '#2563eb';
  });
  qWrap.appendChild(submitBtn);
  submitBtn.addEventListener('click', () => {
    const val = input.value.trim().toLowerCase();
    if (val === '8' || val === 'eight') {
      // Correct! Show celebration
      fadeOutIn(qWrap, () => {
        showRoxanneCelebration(container);
      }, 900);
    } else {
      // Wrong answer: show 'who are you.' then fade back to contact form
      if (!qWrap.querySelector('.whoareyou-message')) {
        const err = document.createElement('div');
        err.className = 'whoareyou-message';
        err.textContent = 'who are you.';
        err.style.cssText = 'color: #d32f2f; font-size: 1.15rem; margin-top: 1.3rem; text-align: center; font-weight: 600; opacity: 0; transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1);';
        qWrap.appendChild(err);
        setTimeout(() => { err.style.opacity = '1'; }, 100);
        setTimeout(() => {
          fadeOutIn(qWrap, () => {
            window.location.reload();
          }, 900);
        }, 2000);
      }
    }
  });
  container.appendChild(qWrap);
}

function showRoxanneCelebration(container) {
  // Change right side image to fade in pookie.png
  const right = document.querySelector('.contact-page .hero-right');
  if (right) {
    right.innerHTML = '';
    const img = document.createElement('img');
    img.src = 'images/pookie.png';
    img.alt = 'Pookie';
    img.style.cssText = `
      max-width: 320px;
      border-radius: 18px;
      box-shadow: 0 4px 32px 0 rgba(0,0,0,0.18);
      margin: 0 auto;
      display: block;
      opacity: 0;
      transform: translateX(80px);
      transition: opacity 1.1s cubic-bezier(0.4,0,0.2,1), transform 1.1s cubic-bezier(0.4,0,0.2,1);
    `;
    right.appendChild(img);
    right.style.background = '#181818';
    right.style.display = 'flex';
    right.style.alignItems = 'center';
    right.style.justifyContent = 'center';
    // Trigger fade-in
    setTimeout(() => {
      img.style.opacity = '1';
      img.style.transform = 'translateX(0)';
    }, 80);
  }
  // Add confetti/heart rain
  addCornyConfetti();
  // Show HELLO with 5 wave emojis
  container.innerHTML = '';
  const hello = document.createElement('h2');
  hello.innerHTML = 'HELLO ' + '👋'.repeat(5);
  hello.style.cssText = 'color: #f3f3f3; font-size: 2.2rem; font-weight: 700; text-align: center; margin-top: 2.5rem; letter-spacing: 0.08em;';
  container.appendChild(hello);
}

function showAndrewQuestion(container) {
  container.innerHTML = '';
  // Build verification UI
  const verifyWrap = document.createElement('div');
  verifyWrap.className = 'andrew-verify fade-in';
  verifyWrap.style.cssText = `display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 340px; max-width: 520px; width: 100%; background: none; color: #f3f3f3; font-family: 'Inter', 'Segoe UI', Arial, sans-serif;`;
  const verifyText = document.createElement('h2');
  verifyText.textContent = 'are you really andrew...';
  verifyText.style.cssText = 'color: #f3f3f3; font-size: 1.25rem; font-weight: 600; text-align: center; margin-bottom: 1.2rem; letter-spacing: 0.06em; opacity: 0; transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1);';
  verifyWrap.appendChild(verifyText);
  container.appendChild(verifyWrap);
  setTimeout(() => {
    verifyText.style.opacity = '1';
    setTimeout(() => {
      fadeOutIn(verifyWrap, () => {
        container.innerHTML = '';
        // --- Multiple Choice Question ---
        const qWrap = document.createElement('div');
        qWrap.className = 'andrew-question fade-in';
        qWrap.style.cssText = `display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 340px; max-width: 520px; width: 100%; background: none; color: #f3f3f3; font-family: 'Inter', 'Segoe UI', Arial, sans-serif;`;
        const q = document.createElement('h2');
        q.textContent = 'what breed is olie';
        q.style.cssText = 'color: #f3f3f3; font-size: 1.25rem; font-weight: 600; text-align: center; margin-bottom: 1.2rem; letter-spacing: 0.06em;';
        qWrap.appendChild(q);
        // Dog breed choices from dognames.txt
        const dogBreeds = [
          "chihuahua","japanese spaniel","pekinese, pekingese, peke","shih-tzu","blenheim spaniel","papillon","toy terrier","rhodesian ridgeback","afghan hound, afghan","basset, basset hound","beagle","bloodhound, sleuthhound","bluetick","black-and-tan coonhound","walker hound, walker foxhound","english foxhound","redbone","borzoi, russian wolfhound","irish wolfhound","italian greyhound","whippet","ibizan hound, ibizan podenco","norwegian elkhound, elkhound","otterhound, otter hound","saluki, gazelle hound","scottish deerhound, deerhound","weimaraner","staffordshire bullterrier, staffordshire bull terrier","american staffordshire terrier, staffordshire terrier, american pit bull terrier, pit bull terrier","bedlington terrier","border terrier","kerry blue terrier","irish terrier","norfolk terrier","norwich terrier","yorkshire terrier","wire-haired fox terrier","lakeland terrier","sealyham terrier, sealyham","airedale, airedale terrier","cairn, cairn terrier","australian terrier","dandie dinmont, dandie dinmont terrier","boston bull, boston terrier","miniature schnauzer","giant schnauzer","standard schnauzer, schnauzer","scotch terrier, scottish terrier, scottie","tibetan terrier, chrysanthemum dog","silky terrier, sydney silky","soft-coated wheaten terrier","west highland white terrier","lhasa, lhasa apso","flat-coated retriever","curly-coated retriever","golden retriever","labrador retriever","chesapeake bay retriever","german shorthaired pointer","vizsla, hungarian pointer","english setter","irish setter, red setter","gordon setter","brittany spaniel","clumber, clumber spaniel","english springer, english springer spaniel","welsh springer spaniel","cocker spaniel, english cocker spaniel, cocker","sussex spaniel","irish water spaniel","kuvasz","schipperke","groenendael","malinois","briard","kelpie","komondor","old english sheepdog, bobtail","shetland sheepdog, shetland sheep dog, shetland","collie","border collie","bouvier des flandres, bouviers des flandres","rottweiler","german shepherd, german shepherd dog, german police dog, alsatian","doberman, doberman pinscher","miniature pinscher","greater swiss mountain dog","bernese mountain dog","appenzeller","entlebucher","boxer","bull mastiff","tibetan mastiff","french bulldog","great dane","saint bernard, st bernard","eskimo dog, husky","malamute, malemute, alaskan malamute","siberian husky","dalmatian, coach dog, carriage dog","affenpinscher, monkey pinscher, monkey dog","basenji","pug, pug-dog","leonberg","newfoundland, newfoundland dog","great pyrenees","samoyed, samoyede","pomeranian","chow, chow chow","keeshond","brabancon griffon","pembroke, pembroke welsh corgi, corgi","cardigan, cardigan welsh corgi, corgi","toy poodle","miniature poodle","standard poodle, poodle","mexican hairless","affenpinscher","afghan hound","airedale terrier","akita","alaskan malamute","american eskimo dog","american foxhound","american staffordshire terrier","american water spaniel","anatolian shepherd dog","australian cattle dog","australian shepherd","basset hound","bearded collie","beauceron","belgian malinois","belgian sheepdog","belgian tervuren","bichon frise","black and tan coonhound","black russian terrier","bloodhound","bluetick coonhound","borzoi","boston terrier","bouvier des flandres","boykin spaniel","brittany","brussels griffon","bull terrier","bulldog","bullmastiff","cairn terrier","canaan dog","cane corso","cardigan welsh corgi","cavalier king charles spaniel","chinese crested","chinese shar-pei","chow chow","clumber spaniel","cocker spaniel","corgi","dachshund","dalmatian","dandie dinmont terrier","deerhound","doberman pinscher","dogue de bordeaux","english cocker spaniel","english springer spaniel","english toy spaniel","entlebucher mountain dog","field spaniel","finnish spitz","german pinscher","german shepherd dog","german wirehaired pointer","glen of imaal terrier","greyhound","havanese","ibizan hound","icelandic sheepdog","irish red and white setter","irish setter","japanese chin","leonberger","lhasa apso","lowchen","maltese","manchester terrier","mastiff","neapolitan mastiff","newfoundland","norwegian buhund","norwegian elkhound","norwegian lundehund","nova scotia duck tolling retriever","old english sheepdog","otterhound","parson russell terrier","pekingese","pembroke welsh corgi","petit basset griffon vendeen","pharaoh hound","plott","pointer","poodle","portuguese water dog","pug","saint bernard","saluki","samoyed","schnauzer","scottish terrier","sealyham terrier","shetland sheepdog","silky terrier","smooth fox terrier","staffordshire bull terrier","tibetan terrier","vizsla","walker hound","wirehaired pointing griffon","xoloitzcuintli","dog"
        ];
        const correctAnswer = 'maltese'; // The correct answer for olie
        const choiceList = document.createElement('div');
        choiceList.style.cssText = 'display: flex; flex-direction: column; gap: 0.7rem; width: 100%; max-width: 340px; max-height: 350px; overflow-y: auto;';
        dogBreeds.forEach((breed, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.textContent = breed;
          btn.style.cssText = `
            width: 100%;
            background: #23272a;
            color: #f3f3f3;
            border: 1.5px solid #444;
            border-radius: 7px;
            padding: 0.65rem 0;
            font-size: 1.01rem;
            font-family: inherit;
            font-weight: 500;
            letter-spacing: 0.04em;
            cursor: pointer;
            transition: background 0.2s, color 0.2s, border 0.2s;
            margin: 0;
            outline: none;
          `;
          btn.addEventListener('mouseenter', () => {
            btn.style.background = '#3b4252';
            btn.style.borderColor = '#2563eb';
            btn.style.color = '#fff';
          });
          btn.addEventListener('mouseleave', () => {
            btn.style.background = '#23272a';
            btn.style.borderColor = '#444';
            btn.style.color = '#f3f3f3';
          });
          btn.addEventListener('click', () => {
            if (breed.toLowerCase().includes(correctAnswer)) {
              // Correct: go to next screen (placeholder)
              fadeOutIn(qWrap, () => {
                showAndrewNextScreen(container);
              }, 900);
            } else {
              // Wrong answer: show '?????' then fade back to contact form
              if (!qWrap.querySelector('.whoareyou-message')) {
                const err = document.createElement('div');
                err.className = 'whoareyou-message';
                err.textContent = '?????';
                err.style.cssText = 'color: #d32f2f; font-size: 1.15rem; margin-top: 1.3rem; text-align: center; font-weight: 600; opacity: 0; transition: opacity 1.2s cubic-bezier(0.4,0,0.2,1);';
                qWrap.appendChild(err);
                setTimeout(() => { err.style.opacity = '1'; }, 100);
                setTimeout(() => {
                  fadeOutIn(qWrap, () => {
                    window.location.reload();
                  }, 900);
                }, 2000);
              }
            }
          });
          choiceList.appendChild(btn);
        });
        qWrap.appendChild(choiceList);
        container.appendChild(qWrap);
      }, 900);
    }, 1400);
  }, 200);
}

function showAndrewNextScreen(container) {
  // Final greeting screen for Andrew
  container.innerHTML = '';
  const next = document.createElement('div');
  next.className = 'andrew-next fade-in';
  next.style.cssText = 'display: flex; flex-direction: column; align-items: center; justify-content: center; min-width: 340px; max-width: 520px; width: 100%; background: none; color: #f3f3f3; font-family: \'Inter\', \'Segoe UI\', Arial, sans-serif;';

  const msg = document.createElement('h2');
  msg.innerHTML = 'wow hello!!! ' + '👋'.repeat(3);
  msg.style.cssText = 'color: #f3f3f3; font-size: 2.2rem; font-weight: 700; text-align: center; margin-bottom: 1.2rem; letter-spacing: 0.08em; margin-top: 2.5rem;';
  next.appendChild(msg);

  // Placeholder image for andjew.jpg
  const img = document.createElement('img');
  img.src = 'images/andjew.jpg'; // To be uploaded
  img.alt = 'andjew';
  img.style.cssText = `
    max-width: 320px;
    border-radius: 18px;
    box-shadow: 0 4px 32px 0 rgba(0,0,0,0.18);
    margin: 0 auto;
    display: block;
    opacity: 0;
    transform: translateX(80px);
    transition: opacity 1.1s cubic-bezier(0.4,0,0.2,1), transform 1.1s cubic-bezier(0.4,0,0.2,1);
  `;
  next.appendChild(img);

  container.appendChild(next);

  // Trigger fade-in for image
  setTimeout(() => {
    img.style.opacity = '1';
    img.style.transform = 'translateX(0)';
  }, 80);
}

function showAndrewCelebration(container) {
  // Change right side image to fade in olie.jpg
  const right = document.querySelector('.contact-page .hero-right');
  if (right) {
    right.innerHTML = '';
    const img = document.createElement('img');
    img.src = 'images/olie.jpg';
    img.alt = 'Olie';
    img.style.cssText = `
      max-width: 320px;
      border-radius: 18px;
      box-shadow: 0 4px 32px 0 rgba(0,0,0,0.18);
      margin: 0 auto;
      display: block;
      opacity: 0;
      transform: translateX(80px);
      transition: opacity 1.1s cubic-bezier(0.4,0,0.2,1), transform 1.1s cubic-bezier(0.4,0,0.2,1);
    `;
    right.appendChild(img);
    right.style.background = '#181818';
    right.style.display = 'flex';
    right.style.alignItems = 'center';
    right.style.justifyContent = 'center';
    // Trigger fade-in
    setTimeout(() => {
      img.style.opacity = '1';
      img.style.transform = 'translateX(0)';
    }, 80);
  }
  // Add confetti/heart rain
  addCornyConfetti();
  // Show HELLO with 5 wave emojis
  container.innerHTML = '';
  const hello = document.createElement('h2');
  hello.innerHTML = 'HELLO ' + '👋'.repeat(5);
  hello.style.cssText = 'color: #f3f3f3; font-size: 2.2rem; font-weight: 700; text-align: center; margin-top: 2.5rem; letter-spacing: 0.08em;';
  container.appendChild(hello);
}

function addCornyConfetti() {
  // Add continuous confetti/heart rain using absolutely positioned emojis
  const confettiContainer = document.createElement('div');
  confettiContainer.style.position = 'fixed';
  confettiContainer.style.left = '0';
  confettiContainer.style.top = '0';
  confettiContainer.style.width = '100vw';
  confettiContainer.style.height = '100vh';
  confettiContainer.style.pointerEvents = 'none';
  confettiContainer.style.zIndex = '99999';
  document.body.appendChild(confettiContainer);
  
  const emojis = ['❤️','💖','💗','💓','💞','💘','💝','💟','🎉','✨','🥰'];
  
  function createHeart() {
    const span = document.createElement('span');
    span.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    span.style.position = 'absolute';
    span.style.left = Math.random()*100 + 'vw';
    span.style.top = '-3rem';
    span.style.fontSize = (Math.random()*1.2+1.2) + 'rem';
    span.style.opacity = Math.random()*0.5+0.5;
    span.style.transition = 'transform 2.8s linear, opacity 2.8s linear';
    confettiContainer.appendChild(span);
    
    setTimeout(() => {
      span.style.transform = `translateY(${window.innerHeight+120}px) rotate(${Math.random()*360}deg)`;
      span.style.opacity = 0;
    }, 100);
    
    setTimeout(() => {
      span.remove();
    }, 3000);
  }
  
  // Start continuous heart rain
  createHeart(); // First heart
  const heartInterval = setInterval(() => {
    createHeart();
  }, 200); // New heart every 200ms
  
  // Stop after 10 seconds
  setTimeout(() => {
    clearInterval(heartInterval);
    setTimeout(() => {
      if (confettiContainer.parentNode) {
        confettiContainer.remove();
      }
    }, 3000);
  }, 10000);
} 

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const data = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value
      };
      fetch('https://script.google.com/macros/s/AKfycbwhg24HBlv__Ix6CBBo1VRNP_za-OFyX1-8ziIfebBcpBizh5PGLpelNAYTyBLCUvfK/exec', {
      method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(() => {
        // Show a success message (customize as needed)
        form.reset();
        alert('Thank you for your message!');
      }).catch(() => {
        alert('There was an error sending your message. Please try again later.');
      });
    });
  }
});