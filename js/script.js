// Load navbar from components folder
fetch('components/navbar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar-container').innerHTML = html;
    attachNavEvents(); // Attach events after navbar loads
  })
  .catch(() => {
    // fail silently; nav may be static in some environments
  });

// Utility functions for your routing system
const PortfolioUtils = {
    // Smooth page transitions
    transitionToPage: function(callback) {
        const content = document.getElementById('app-content');
        if (!content) return callback();
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            callback();
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
            
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
        if (!element) return;
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
        if (!element) return;
        element.innerHTML = `
            <div class="alert alert-danger text-center" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                ${message}
            </div>
        `;
    }
};

// Simple router
function loadPage(page) {
  const target = document.getElementById('app-content');
  if (!target) return;
  PortfolioUtils.transitionToPage(() => {
    PortfolioUtils.showLoading(target);
    fetch(`pages/${page}.html`)
      .then(res => {
        if (!res.ok) throw new Error('Page not found');
        return res.text();
      })
      .then(html => {
        target.innerHTML = html;

        // Initialize tooltips/popovers for newly loaded content
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
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.innerHTML = dark
      ? '<i class="fas fa-sun"></i>'
      : '<i class="fas fa-moon"></i>';
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  }
}

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
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-page') === page);
  });
});

// Enhancement functions
function addButtonEnhancements() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (button._rippleBound) return; // avoid duplicate listeners
        button._rippleBound = true;
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
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

function enhanceFormValidation() {
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        if (form._validationBound) return;
        form._validationBound = true;
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

function addCardAnimations() {
    const cards = document.querySelectorAll('.card');
    if (!cards.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    cards.forEach(card => {
        card.style.transform = 'translateY(30px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

function enhanceNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    });
}

function addTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
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

function enhanceContactForm() {
    const contactForm = document.querySelector('#contactForm');
    if (!contactForm || contactForm._contactBound) return;
    contactForm._contactBound = true;
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const submitBtn = this.querySelector('button[type="submit"]');
        if (!submitBtn) return;
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
        submitBtn.disabled = true;
        setTimeout(() => {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'alert alert-success alert-dismissible fade show mt-3';
            alertDiv.innerHTML = `
                <i class="fas fa-check-circle me-2"></i>
                Message sent successfully! I'll get back to you soon.
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            this.appendChild(alertDiv);
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

function addParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    });
}

function addAvatarFallback() {
    document.querySelectorAll('.testimonial-avatar').forEach(img => {
        img.addEventListener('error', () => {
            img.style.display = 'none';
            const fallback = img.nextElementSibling;
            if (fallback && fallback.classList.contains('avatar-fallback')) {
                fallback.style.display = 'flex';
            }
        });
    });
}

// Inject CSS for ripple and small helpers once
(function injectStyles() {
    if (document.getElementById('portfolio-enhancements-styles')) return;
    const style = document.createElement('style');
    style.id = 'portfolio-enhancements-styles';
    style.textContent = `
        .btn { position: relative; overflow: hidden; }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple-animation { to { transform: scale(4); opacity: 0; } }
        .navbar { transition: transform 0.3s ease; }
        .typing-animation::after { content: '|'; animation: blink 1s infinite; }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
    `;
    document.head.appendChild(style);
})();

// Single DOMContentLoaded initializer
window.addEventListener('DOMContentLoaded', () => {
    // Set theme from localStorage or system preference
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(saved === 'dark' || (!saved && prefersDark));

    // Initialize any tooltips/popovers present on initial load
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].forEach(el => new bootstrap.Tooltip(el));
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    [...popoverTriggerList].forEach(el => new bootstrap.Popover(el));

    // Initialize UI enhancements
    addButtonEnhancements();
    enhanceFormValidation();
    addCardAnimations();
    enhanceNavbar();
    addTypingAnimation();
    enhanceContactForm();
    addParallaxEffect();
    addAvatarFallback();

    // Load initial page based on hash
    const page = window.location.hash.replace('#', '') || 'home';
    loadPage(page);
});

// Export for use in other scripts (Node / bundlers)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioUtils;
} else {
    window.PortfolioUtils = PortfolioUtils;
}