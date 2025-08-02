// Load navbar from components folder
fetch('components/navbar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar-container').innerHTML = html;
    attachNavEvents(); // Attach events after navbar loads
  });

// Simple router
function loadPage(page) {
  const target = document.getElementById('app-content');
  PortfolioUtils.transitionToPage(() => {
    fetch(`pages/${page}.html`)
      .then(res => {
        if (!res.ok) throw new Error('Page not found');
        return res.text();
      })
      .then(html => {
        target.innerHTML = html;

        // Initialize tooltips/popovers again
        const newTooltips = target.querySelectorAll('[data-bs-toggle="tooltip"]');
        newTooltips.forEach(t => new bootstrap.Tooltip(t));
        const newPopovers = target.querySelectorAll('[data-bs-toggle="popover"]');
        newPopovers.forEach(p => new bootstrap.Popover(p));
        
        if (typeof AOS !== 'undefined') AOS.refresh();
      })
      .catch(() => {
        PortfolioUtils.showError(target, 'Page not found.');
      });
  });
}


// Theme toggle logic
function setTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  localStorage.setItem('theme', dark ? 'dark' : 'light');
  // Update icon
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.innerHTML = dark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

// Attach theme toggle event after navbar loads
function attachThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', () => {
      const isDark = !document.body.classList.contains('dark-mode');
      setTheme(isDark);
    });
  }
}

// Attach navigation events (called after navbar loads)
function attachNavEvents() {
  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      if (page) {
        loadPage(page);
        // Update active class
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        // Optionally update URL hash
        window.location.hash = page;
      }
    });
  });
  attachThemeToggle();
}

// Handle browser navigation (back/forward)
window.addEventListener('hashchange', () => {
  const page = window.location.hash.replace('#', '') || 'home';
  loadPage(page);
  // Update active class if navbar is loaded
  document.querySelectorAll('.nav-link').forEach(link => {
    if (link.getAttribute('data-page') === page) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

// On load, set theme from localStorage or system preference
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(saved === 'dark' || (!saved && prefersDark));
  const page = window.location.hash.replace('#', '') || 'home';
  loadPage(page);
});

// Enhanced script.js for Bret's Portfolio
// This file works with your existing routing system while adding Bootstrap enhancements

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Initialize Bootstrap popovers
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl));

    // Enhanced page loading with transitions
    function loadPageWithTransition(url, targetElement) {
        // Add loading state
        targetElement.style.opacity = '0.5';
        
        // Your existing page loading logic here
        // This is a placeholder - integrate with your current routing system
        
        // After content is loaded, fade it in
        setTimeout(() => {
            targetElement.style.opacity = '1';
            
            // Reinitialize AOS for new content
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
            
            // Reinitialize tooltips and popovers for new content
            const newTooltips = targetElement.querySelectorAll('[data-bs-toggle="tooltip"]');
            newTooltips.forEach(tooltip => new bootstrap.Tooltip(tooltip));
            
            const newPopovers = targetElement.querySelectorAll('[data-bs-toggle="popover"]');
            newPopovers.forEach(popover => new bootstrap.Popover(popover));
            
        }, 300);
    }

    // Enhanced button interactions
    function addButtonEnhancements() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Add ripple effect on click
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Enhanced form validation
    function enhanceFormValidation() {
        const forms = document.querySelectorAll('.needs-validation');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }

    // Smooth reveal animations for cards
    function addCardAnimations() {
        const cards = document.querySelectorAll('.card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        cards.forEach(card => {
            card.style.transform = 'translateY(30px)';
            card.style.opacity = '0';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    }

    // Enhanced navbar behavior
    function enhanceNavbar() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Hide/show navbar on scroll
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Typing animation for hero text
    function addTypingAnimation() {
        const typingElement = document.querySelector('.typing-animation');
        if (typingElement) {
            const text = typingElement.textContent;
            typingElement.textContent = '';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    typingElement.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 100);
        }
    }

    // Enhanced contact form handling
    function enhanceContactForm() {
        const contactForm = document.querySelector('#contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Add loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with your actual form handling)
                setTimeout(() => {
                    // Show success message
                    const alertDiv = document.createElement('div');
                    alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
                    alertDiv.innerHTML = `
                        <i class="fas fa-check-circle me-2"></i>
                        Message sent successfully! I'll get back to you soon.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    `;
                    
                    this.appendChild(alertDiv);
                    this.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        }
    }

    // Parallax effect for hero section
    function addParallaxEffect() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                heroSection.style.transform = `translateY(${rate}px)`;
            });
        }
    }

    // Initialize all enhancements
    addButtonEnhancements();
    enhanceFormValidation();
    addCardAnimations();
    enhanceNavbar();
    addTypingAnimation();
    enhanceContactForm();
    addParallaxEffect();

    // CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .navbar {
            transition: transform 0.3s ease;
        }
        
        .typing-animation::after {
            content: '|';
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

// Utility functions for your existing routing system
const PortfolioUtils = {
    // Smooth page transitions
    transitionToPage: function(callback) {
        const content = document.getElementById('app-content');
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            callback();
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            
            // Refresh AOS animations
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, 200);
    },
    
    // Update page title and meta
    updatePageMeta: function(title, description) {
        document.title = title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }
    },
    
    // Show loading state
    showLoading: function(element) {
        element.innerHTML = `
            <div class="d-flex justify-content-center align-items-center" style="min-height: 200px;">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        `;
    },
    
    // Show error state
    showError: function(element, message = 'Something went wrong. Please try again.') {
        element.innerHTML = `
            <div class="alert alert-danger text-center" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                ${message}
            </div>
        `;
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioUtils;
} else {
    window.PortfolioUtils = PortfolioUtils;
}