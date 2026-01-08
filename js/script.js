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
    transitionToPage: function (callback) {
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
    updatePageMeta: function (title, description) {
        document.title = title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }
    },

    // Show loading state
    showLoading: function (element) {
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
    showError: function (element, message = 'Something went wrong. Please try again.') {
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

    // Check if this is a project detail page
    if (page.startsWith('project-')) {
        loadProjectPage(page, target);
        return;
    }

    PortfolioUtils.transitionToPage(() => {
        PortfolioUtils.showLoading(target);
        fetch(`pages/${page}.html`)
            .then(res => {
                // If page not found, try home or show error
                if (!res.ok) {
                    // Check if it might be a project page that wasn't caught (unlikely with logic above)
                    throw new Error('Page not found');
                }
                return res.text();
            })
            .then(html => {
                target.innerHTML = html;
                initializePageEnhancements(target, page);
                if (typeof AOS !== 'undefined') AOS.refresh();
            })
            .catch(() => {
                PortfolioUtils.showError(target, 'Page not found.');
            });
    });
}

function loadProjectPage(projectId, target) {
    // Check if data exists
    if (typeof projectsData === 'undefined' || !projectsData[projectId]) {
        PortfolioUtils.showError(target, 'Project not found.');
        return;
    }

    const data = projectsData[projectId];

    PortfolioUtils.transitionToPage(() => {
        PortfolioUtils.showLoading(target);

        // Fetch the generic template
        fetch('pages/project-template.html')
            .then(res => res.text())
            .then(html => {
                target.innerHTML = html;
                populateProjectTemplate(target, data);
                initializePageEnhancements(target, projectId);
                if (typeof AOS !== 'undefined') AOS.refresh();
            })
            .catch(err => {
                console.error(err);
                PortfolioUtils.showError(target, 'Failed to load project template.');
            });
    });
}

function populateProjectTemplate(container, data) {
    // 1. Header
    container.querySelector('#project-title').textContent = data.title;
    container.querySelector('#project-description').textContent = data.description;

    // Badges
    const badgeContainer = container.querySelector('#project-badges');
    data.badges.forEach(badge => {
        const span = document.createElement('span');
        span.className = `badge rounded-pill px-3 py-2 ${badge.class}`;
        span.textContent = badge.text;
        badgeContainer.appendChild(span);
    });

    // Links
    const linksContainer = container.querySelector('#project-links');
    data.links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.className = `btn ${link.class}`;
        if (link.url.startsWith('http')) a.target = "_blank";
        a.innerHTML = `<i class="${link.icon} me-2"></i>${link.text}`;
        linksContainer.appendChild(a);
    });

    // Hero Image/Icon
    const heroContainer = container.querySelector('#project-hero-container');
    if (data.heroImage) {
        heroContainer.innerHTML = `<img src="${data.heroImage}" alt="${data.title}" class="img-fluid w-100 h-100 object-fit-cover">`;
    } else if (data.heroIcon) {
        heroContainer.innerHTML = `
            <div class="text-center p-5">
                <i class="${data.heroIcon.icon} fa-5x ${data.heroIcon.color} mb-3"></i>
                <p class="text-muted">${data.heroIcon.text}</p>
            </div>
        `;
    }

    // 2. Overview
    container.querySelector('#project-overview-title').textContent = data.overview.title;
    container.querySelector('#project-overview-content').innerHTML = data.overview.content;

    // 3. Dynamic Sections
    const sectionsContainer = container.querySelector('#project-dynamic-sections');

    data.sections.forEach(section => {
        let sectionHtml = '';

        if (section.type === 'highlight-box') {
            sectionHtml = `
                <div class="row mb-5">
                    <div class="col-lg-12">
                        <div class="bg-light p-4 rounded-4 border-start border-4 border-primary">
                            <h4 class="fw-bold mb-3"><i class="${section.icon} me-2"></i>${section.title}</h4>
                            <p class="mb-0 fst-italic">${section.content}</p>
                        </div>
                    </div>
                </div>
            `;
        } else if (section.type === 'features-grid') {
            sectionHtml = `<h3 class="fw-bold mb-4">${section.title}</h3><div class="row g-4 mb-5">`;
            section.items.forEach(item => {
                sectionHtml += `
                    <div class="col-md-6 col-lg-3"> <!-- Using col-lg-3 as default base, but col-lg-4 might be better for 3 items -->
                         <div class="card h-100 border-0 shadow-hover glass-effect">
                            <div class="card-body p-4 text-center">
                                <div class="feature-icon mb-3 fs-2">
                                     <i class="${item.icon}"></i>
                                </div>
                                <h5 class="fw-bold mb-2">${item.title}</h5>
                                <p class="text-muted small">${item.desc}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
            sectionHtml += `</div>`;
            // Quick fix: user col-lg-4 if 3 items, col-lg-3 if 4 items? 
            // We can just leave it as col-lg-3 (4 per row) or col-lg-4 (3 per row). 
            // The data shows 4 items for Dementia Care (lg-3 matches) and 3 for Shona (lg-4 matches).
            // Let's make it responsive: col-md-6 is safe.
        } else if (section.type === 'split-card') {
            // Generate Left Content (List)
            let leftContent = `<ul class="list-group list-group-flush">`;
            section.left.content.forEach(item => {
                leftContent += `
                    <li class="list-group-item bg-transparent px-0 d-flex align-items-center">
                        <i class="${item.icon} me-3 fa-lg"></i>
                        <div>
                            <strong>${item.title}</strong>
                            <div class="small text-muted">${item.desc}</div>
                        </div>
                    </li>
                 `;
            });
            leftContent += `</ul>`;
            if (section.left.footer) leftContent += section.left.footer;

            if (section.right) {
                // Two column layout
                sectionHtml = `
                    <div class="row g-4 mb-5">
                        <div class="col-md-6">
                            <div class="card h-100 border-0 shadow-sm rounded-4">
                                <div class="card-body p-4">
                                    <h4 class="fw-bold mb-4">${section.left.title}</h4>
                                    ${leftContent}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                             <div class="card h-100 border-0 shadow-sm rounded-4 ${section.right.bgClass || ''} position-relative overflow-hidden">
                                <div class="position-absolute top-0 end-0 p-3 opacity-25">
                                    <i class="fas fa-code fa-5x"></i>
                                </div>
                                <div class="card-body p-4 position-relative z-1">
                                    <h4 class="fw-bold mb-3 ${section.right.bgClass ? 'text-white' : ''}">${section.right.title}</h4>
                                    ${section.right.content}
                                </div>
                            </div>
                        </div>
                    </div>
                 `;
            } else {
                // Single column centered layout
                sectionHtml = `
                    <div class="row mb-5 justify-content-center">
                        <div class="col-lg-8">
                            <div class="card h-100 border-0 shadow-sm rounded-4">
                                <div class="card-body p-4">
                                    <h4 class="fw-bold mb-4">${section.left.title}</h4>
                                    ${leftContent}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
        } else if (section.type === 'split-list-code') {
            // Similar to split card but right side is code-like
            let leftContent = `<ul class="list-unstyled mb-0">`;
            section.left.items.forEach(item => {
                leftContent += `
                    <li class="mb-3 d-flex align-items-start">
                        <i class="${item.icon} mt-1 me-3"></i>
                        <div><strong>${item.title}:</strong> ${item.desc}</div>
                    </li>
                 `;
            });
            leftContent += `</ul>`;

            let rightContent = ``;
            section.right.code.forEach(line => {
                rightContent += `<div class="mb-2"><span class="${line.class}">${line.label}</span> ${line.content}</div>`;
            });

            sectionHtml = `
                <div class="row mb-5">
                    <div class="col-lg-6 mb-4 mb-lg-0">
                        <h3 class="fw-bold mb-4">${section.left.title}</h3>
                        <div class="bg-light p-4 rounded-4 border">
                            ${leftContent}
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <h3 class="fw-bold mb-4">${section.right.title}</h3>
                        <div class="bg-dark text-light p-4 rounded-4" style="font-family: monospace; font-size: 0.9em;">
                            ${rightContent}
                        </div>
                    </div>
                </div>
             `;
        } else if (section.type === 'grid-cards') {
            sectionHtml = `<div class="row mb-5"><div class="col-lg-12"><h3 class="fw-bold mb-4">${section.title}</h3><div class="row g-3">`;
            section.items.forEach(item => {
                sectionHtml += `
                    <div class="col-md-4">
                        <div class="p-3 border rounded shadow-sm text-center bg-white h-100">
                            <h5 class="fw-bold ${item.class}">${item.title}</h5>
                            <p class="small text-muted mb-0">${item.subtitle}</p>
                        </div>
                    </div>
                 `;
            });
            sectionHtml += `</div></div></div>`;
        } else if (section.type === 'features-list-cols') {
            sectionHtml = `
                <div class="${section.bgClass} mb-5">
                    <h3 class="fw-bold mb-3">${section.title}</h3>
                    <div class="row">
             `;
            section.cols.forEach(colItems => {
                sectionHtml += `<div class="col-md-6"><ul class="mb-0">`;
                colItems.forEach(li => sectionHtml += `<li class="mb-2">${li}</li>`);
                sectionHtml += `</ul></div>`;
            });
            sectionHtml += `</div></div>`;
        }

        sectionsContainer.insertAdjacentHTML('beforeend', sectionHtml);
    });
}

function initializePageEnhancements(target, page) {
    // Initialize tooltips/popovers for newly loaded content
    const newTooltips = target.querySelectorAll('[data-bs-toggle="tooltip"]');
    newTooltips.forEach(t => new bootstrap.Tooltip(t));
    const newPopovers = target.querySelectorAll('[data-bs-toggle="popover"]');
    newPopovers.forEach(p => new bootstrap.Popover(p));

    // Re-initialize UI enhancements for new content
    if (typeof addButtonEnhancements === 'function') addButtonEnhancements();
    if (typeof enhanceFormValidation === 'function') enhanceFormValidation();
    if (typeof addCardAnimations === 'function') addCardAnimations();
    if (typeof addAvatarFallback === 'function') addAvatarFallback();

    // Initializes Contact Form if on contact page
    if (page === 'contact' && typeof initializeContactForm === 'function') {
        initializeContactForm();
    }

    // Initialize Testimonials if on home page
    if (page === 'home' && typeof loadTestimonials === 'function') {
        loadTestimonials();
    }
}

function loadTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container || typeof testimonialsData === 'undefined') return;

    // Create a group of testimonials
    const createGroup = () => {
        const group = document.createElement('div');
        group.className = 'testimonials-marquee-group';

        testimonialsData.forEach(t => {
            let cardHtml = '';
            if (t.link && t.link !== '#') {
                cardHtml = `
                    <a class="testimonial-card" href="${t.link}" target="_blank">
                        <div class="d-flex align-items-center gap-3 mb-3">
                            <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar">
                            <div>
                                <h3 class="testimonial-author-name">${t.name}</h3>
                                <p class="testimonial-author-handle">${t.handle}</p>
                            </div>
                        </div>
                        <p class="testimonial-text">${t.content}</p>
                    </a>
                `;
            } else {
                cardHtml = `
                    <div class="testimonial-card">
                        <div class="d-flex align-items-center gap-3 mb-3">
                            <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar">
                            <div>
                                <h3 class="testimonial-author-name">${t.name}</h3>
                                <p class="testimonial-author-handle">${t.handle}</p>
                            </div>
                        </div>
                        <p class="testimonial-text">${t.content}</p>
                    </div>
                `;
            }
            group.insertAdjacentHTML('beforeend', cardHtml);
        });
        return group;
    };

    // Clear and append duplicate groups for marquee effect
    container.innerHTML = '';
    container.appendChild(createGroup());
    container.appendChild(createGroup()); // Duplicate for seamless loop
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
        link.addEventListener('click', function (e) {
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
        button.addEventListener('click', function (e) {
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
        form.addEventListener('submit', function (event) {
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
    window.addEventListener('scroll', function () {
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
    contactForm.addEventListener('submit', function (e) {
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