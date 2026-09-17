// js/script.js — Tactical SPA Router, Theme Control & Dynamic Rendering (v2.2)

// Load navbar from components folder
fetch('components/navbar.html')
    .then(res => res.text())
    .then(html => {
        const navContainer = document.getElementById('navbar-container');
        if (navContainer) {
            navContainer.innerHTML = html;
            attachNavEvents();
            
            // Sync active theme state with newly rendered navbar button
            const isDark = !document.body.classList.contains('light-mode');
            updateThemeButtonUI(isDark);
            
            // Set active navigation tab based on current hash
            const currentHash = window.location.hash.replace('#', '') || 'home';
            updateActiveNavLink(currentHash);
        }
    })
    .catch(err => {
        console.error('Navbar load error:', err);
    });

// Utility functions for routing and animations
const PortfolioUtils = {
    transitionToPage: function (callback) {
        const content = document.getElementById('app-content');
        if (!content) return callback();
        content.style.opacity = '0';
        content.style.transform = 'translateY(12px)';

        setTimeout(() => {
            callback();
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 150);
    },

    updatePageMeta: function (title, description) {
        document.title = title;
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription && description) {
            metaDescription.setAttribute('content', description);
        }
    },

    showLoading: function (element) {
        if (!element) return;
        element.innerHTML = `
            <div class="d-flex justify-content-center align-items-center py-5" style="min-height: 250px;">
                <div class="hud-telemetry-badge">
                    <span class="beacon-dot"></span>
                    <span>RETRIEVING_SECTOR_DATA...</span>
                </div>
            </div>
        `;
    },

    showError: function (element, message = 'SECTOR_NOT_FOUND // ERR_404') {
        if (!element) return;
        element.innerHTML = `
            <div class="container py-5 text-center">
                <div class="window-card mx-auto" style="max-width: 500px;">
                    <div class="window-header">
                        <div class="window-action-dots">
                            <span class="action-dot action-dot-close"></span>
                            <span class="action-dot action-dot-min"></span>
                            <span class="action-dot action-dot-max"></span>
                        </div>
                        <span class="window-title">SYSTEM_ALERT.LOG</span>
                    </div>
                    <div class="window-body text-center p-4">
                        <i class="fas fa-exclamation-triangle text-magenta fs-1 mb-3"></i>
                        <h4 class="font-display h5 text-paper">${message}</h4>
                        <p class="font-mono text-muted-tactical small mb-4">
                            The requested module could not be loaded into the current runtime environment.
                        </p>
                        <a href="#home" class="btn-tactical btn-tactical-primary">
                            <i class="fas fa-home me-2"></i>RETURN_TO_ROOT
                        </a>
                    </div>
                </div>
            </div>
        `;
    }
};

// Tactical Single Page Router
function loadPage(page) {
    const target = document.getElementById('app-content');
    if (!target) return;

    if (page.startsWith('project-')) {
        loadProjectPage(page, target);
        updateActiveNavLink('projects');
        return;
    }

    PortfolioUtils.transitionToPage(() => {
        PortfolioUtils.showLoading(target);
        fetch(`pages/${page}.html`)
            .then(res => {
                if (!res.ok) throw new Error('Module unreachable');
                return res.text();
            })
            .then(html => {
                target.innerHTML = html;
                initializePageEnhancements(target, page);
                updateActiveNavLink(page);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(() => {
                PortfolioUtils.showError(target, `MODULE_${page.toUpperCase()} // NOT_FOUND`);
            });
    });
}

function loadProjectPage(projectId, target) {
    if (typeof projectsData === 'undefined' || !projectsData[projectId]) {
        PortfolioUtils.showError(target, 'PROJECT_SPEC_RECORD_NOT_FOUND');
        return;
    }

    const data = projectsData[projectId];

    PortfolioUtils.transitionToPage(() => {
        PortfolioUtils.showLoading(target);

        fetch('pages/project-template.html')
            .then(res => res.text())
            .then(html => {
                target.innerHTML = html;
                populateProjectTemplate(target, data);
                initializePageEnhancements(target, projectId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            })
            .catch(err => {
                console.error(err);
                PortfolioUtils.showError(target, 'FAILED_TO_LOAD_PROJECT_TEMPLATE');
            });
    });
}

function populateProjectTemplate(container, data) {
    // 1. Header
    const titleEl = container.querySelector('#project-title');
    const descEl = container.querySelector('#project-description');
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.description;

    // Badges: transform into tactical sticker badges
    const badgeContainer = container.querySelector('#project-badges');
    if (badgeContainer && data.badges) {
        data.badges.forEach(badge => {
            const span = document.createElement('span');
            span.className = `sticker-badge badge-cyan`;
            span.textContent = badge.text;
            badgeContainer.appendChild(span);
        });
    }

    // Links: transform into tactile buttons
    const linksContainer = container.querySelector('#project-links');
    if (linksContainer && data.links) {
        data.links.forEach(link => {
            const a = document.createElement('a');
            a.href = link.url;
            a.className = `btn-tactical btn-tactical-primary`;
            if (link.url.startsWith('http')) a.target = "_blank";
            a.innerHTML = `<i class="${link.icon} me-2"></i>${link.text}`;
            linksContainer.appendChild(a);
        });
    }

    // Hero Image/Icon
    const heroContainer = container.querySelector('#project-hero-container');
    if (heroContainer) {
        if (data.heroImage) {
            heroContainer.innerHTML = `<img src="${data.heroImage}" alt="${data.title}" class="img-fluid w-100 h-100" style="object-fit: cover;">`;
        } else if (data.heroIcon) {
            heroContainer.innerHTML = `
                <div class="text-center p-5">
                    <i class="${data.heroIcon.icon} fa-4x text-magenta mb-3"></i>
                    <div class="font-pixel text-cyan small">${data.heroIcon.text || 'TACTICAL_DEMO'}</div>
                </div>
            `;
        }
    }

    // 2. Overview
    const overviewTitle = container.querySelector('#project-overview-title');
    const overviewContent = container.querySelector('#project-overview-content');
    if (overviewTitle && data.overview) overviewTitle.textContent = data.overview.title;
    if (overviewContent && data.overview) overviewContent.innerHTML = data.overview.content;

    // 3. Dynamic Sections
    const sectionsContainer = container.querySelector('#project-dynamic-sections');
    if (sectionsContainer && data.sections) {
        data.sections.forEach(section => {
            let sectionHtml = '';

            if (section.type === 'highlight-box') {
                sectionHtml = `
                    <div class="row mb-5">
                        <div class="col-lg-12">
                            <div class="window-card">
                                <div class="window-header">
                                    <div class="window-action-dots">
                                        <span class="action-dot action-dot-close"></span>
                                        <span class="action-dot action-dot-min"></span>
                                        <span class="action-dot action-dot-max"></span>
                                    </div>
                                    <span class="window-title">SYSTEM_NOTE // ${section.title}</span>
                                </div>
                                <div class="window-body p-4 font-mono">
                                    <h4 class="font-display h5 text-cyan mb-2"><i class="${section.icon} me-2"></i>${section.title}</h4>
                                    <p class="mb-0 text-muted-tactical">${section.content}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (section.type === 'features-grid') {
                sectionHtml = `
                    <div class="mb-5">
                        <h3 class="font-display h4 text-magenta mb-4">${section.title}</h3>
                        <div class="row g-4">
                `;
                section.items.forEach(item => {
                    sectionHtml += `
                        <div class="col-md-6 col-lg-3">
                            <div class="window-card h-100">
                                <div class="window-header">
                                    <div class="window-action-dots">
                                        <span class="action-dot action-dot-close"></span>
                                        <span class="action-dot action-dot-min"></span>
                                        <span class="action-dot action-dot-max"></span>
                                    </div>
                                    <span class="window-title">FEATURE</span>
                                </div>
                                <div class="window-body p-3 text-center">
                                    <div class="mb-2 fs-2 text-cyan">
                                        <i class="${item.icon}"></i>
                                    </div>
                                    <h5 class="font-display h6 mb-2">${item.title}</h5>
                                    <p class="font-mono text-muted-tactical small mb-0">${item.desc}</p>
                                </div>
                            </div>
                        </div>
                    `;
                });
                sectionHtml += `</div></div>`;
            } else if (section.type === 'split-card') {
                let leftContent = `<ul class="list-unstyled font-mono small d-flex flex-column gap-2 mb-0">`;
                section.left.content.forEach(item => {
                    leftContent += `
                        <li class="p-2 border border-secondary d-flex align-items-center gap-2" style="background: var(--panel-black);">
                            <i class="${item.icon} text-cyan"></i>
                            <div>
                                <strong class="text-paper">${item.title}:</strong>
                                <span class="text-muted-tactical ms-1">${item.desc}</span>
                            </div>
                        </li>
                    `;
                });
                leftContent += `</ul>`;

                sectionHtml = `
                    <div class="row g-4 mb-5">
                        <div class="col-md-6">
                            <div class="window-card h-100">
                                <div class="window-header">
                                    <span class="window-title">${section.left.title}</span>
                                </div>
                                <div class="window-body p-4">
                                    ${leftContent}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="window-card h-100">
                                <div class="window-header">
                                    <span class="window-title">${section.right ? section.right.title : 'TECHNICAL_METRICS'}</span>
                                </div>
                                <div class="window-body p-4 font-mono small">
                                    ${section.right ? section.right.content : ''}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }
            sectionsContainer.insertAdjacentHTML('beforeend', sectionHtml);
        });
    }
}

function initializePageEnhancements(container, page) {
    if (page === 'contact' && typeof initializeContactForm === 'function') {
        initializeContactForm();
    }

    if (page === 'home' && typeof loadTestimonials === 'function') {
        loadTestimonials();
    }
}

function loadTestimonials() {
    const wrapper = document.getElementById('testimonials-wrapper');
    const section = document.getElementById('testimonials-section');
    if (!wrapper && !section) return;

    const target = wrapper || section;
    const hasTestimonials = typeof testimonialsData !== 'undefined' && 
                            Array.isArray(testimonialsData) && 
                            testimonialsData.length > 0;

    if (!hasTestimonials) {
        target.innerHTML = `
            <div class="container" data-aos="fade-up">
                <div class="tactical-collab-panel">
                    <div class="row align-items-center g-4">
                        <div class="col-lg-8">
                            <div class="collab-status-badge mb-3">
                                <span class="beacon-dot"></span>
                                <span class="font-pixel" style="font-size: 0.72rem; color: var(--acid-yellow);">LIVE_SIGNAL: OPEN FOR CONTRACTS & COLLABORATION</span>
                            </div>
                            <h3 class="font-display h3 mb-3 text-magenta">RECOMMENDATIONS & DISPATCH</h3>
                            <p class="font-mono text-muted-tactical lead-tactical mb-4" style="font-size: 1rem;">
                                Have we collaborated on an engineering sprint, system deployment, hackathon, or client project? I am always actively welcoming peer endorsements, code reviews, and partner recommendations to broadcast on this terminal.
                            </p>
                            <div class="d-flex flex-wrap gap-2 mb-4">
                                <span class="pillar-chip-tactical"><i class="fas fa-terminal text-cyan"></i> CLEAN & SCALABLE CODE</span>
                                <span class="pillar-chip-tactical"><i class="fas fa-users-cog text-magenta"></i> TEAM-ORIENTED MINDSET</span>
                                <span class="pillar-chip-tactical"><i class="fas fa-stopwatch text-warning"></i> RAPID, RELIABLE DELIVERY</span>
                            </div>
                        </div>
                        <div class="col-lg-4 text-lg-end">
                            <div class="d-flex flex-column gap-3">
                                <a href="mailto:bmuchow07@gmail.com?subject=Recommendation%20for%20Bret%20Muchoni&body=Hey%20Bret%2C%0A%0AHere%20is%20my%20recommendation%20%2F%20feedback%3A%0A%0A"
                                    class="btn-tactical btn-tactical-primary py-3">
                                    <i class="fas fa-pen-nib me-2"></i>LEAVE_FEEDBACK
                                </a>
                                <a href="https://www.linkedin.com/in/bret-muchoni-a16b40222/" target="_blank" rel="noopener"
                                    class="btn-tactical btn-tactical-outline py-3">
                                    <i class="fab fa-linkedin me-2"></i>LINKEDIN_CONNECT
                                </a>
                                <a href="#contact" class="btn-tactical py-2">
                                    <i class="fas fa-envelope me-2"></i>DIRECT_DISPATCH
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        if (typeof AOS !== 'undefined') AOS.refresh();
        return;
    }

    target.innerHTML = `
        <div class="container-fluid" data-aos="fade-up">
            <div class="d-flex justify-content-between align-items-center mb-4 px-4 flex-wrap gap-2">
                <div>
                    <div class="telemetry-header mb-1">
                        <span class="code-index">[TESTIMONIALS]</span>
                        <span>TRANSMITTED_REVIEWS</span>
                    </div>
                    <h2 class="section-title mb-0">COLLABORATOR DISPATCHES</h2>
                </div>
                <a href="mailto:bmuchow07@gmail.com?subject=Testimonial%20for%20Bret%20Muchoni"
                    class="btn-tactical btn-tactical-primary py-2 px-3 small">
                    <i class="fas fa-pen-nib me-2"></i>TRANSMIT_REVIEW
                </a>
            </div>

            <div class="testimonials-marquee-container">
                <div class="testimonials-marquee" id="testimonials-container">
                </div>
            </div>
        </div>
    `;

    const container = document.getElementById('testimonials-container');
    if (!container) return;

    const createGroup = () => {
        const group = document.createElement('div');
        group.className = 'testimonials-marquee-group';

        testimonialsData.forEach(t => {
            const avatarUrl = t.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0d0d12&color=00e5ff`;
            const cardHtml = `
                <div class="testimonial-card">
                    <div class="d-flex align-items-center gap-3 mb-2">
                        <img src="${avatarUrl}" alt="${t.name}" class="testimonial-avatar" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=0d0d12&color=00e5ff'">
                        <div>
                            <div class="testimonial-author-name">${t.name}</div>
                            <div class="testimonial-author-handle font-mono">${t.handle || ''}</div>
                        </div>
                    </div>
                    <p class="testimonial-text font-mono">${t.content}</p>
                </div>
            `;
            group.insertAdjacentHTML('beforeend', cardHtml);
        });
        return group;
    };

    container.appendChild(createGroup());
    container.appendChild(createGroup());
}

// Tactical Theme Logic (Dark Mode is Default)
function setTheme(dark) {
    if (dark) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
    try {
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    } catch (e) {
        // Safe fallback if browser storage is blocked
    }
    updateThemeButtonUI(dark);
}

function updateThemeButtonUI(dark) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const icon = btn.querySelector('#theme-icon');
    const text = btn.querySelector('#theme-text');
    if (icon) {
        icon.className = dark ? 'fas fa-sun text-warning' : 'fas fa-moon text-info';
    }
    if (text) {
        text.textContent = dark ? 'LIGHT' : 'DARK';
    }
    btn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
}

function attachThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (btn && !btn._themeBound) {
        btn._themeBound = true;
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const isDark = !document.body.classList.contains('light-mode');
            setTheme(!isDark);
        });
    }
}

function updateActiveNavLink(page) {
    document.querySelectorAll('.hud-nav-link').forEach(link => {
        const linkPage = link.getAttribute('data-page');
        link.classList.toggle('active', linkPage === page);
    });
}

function attachNavEvents() {
    document.querySelectorAll('.hud-nav-link[data-page]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            if (page) {
                loadPage(page);
                window.location.hash = page;

                // Close mobile menu if open
                const collapse = document.getElementById('navbarNav');
                if (collapse && collapse.classList.contains('show')) {
                    const bsCollapse = bootstrap.Collapse.getInstance(collapse);
                    if (bsCollapse) bsCollapse.hide();
                }
            }
        });
    });
    attachThemeToggle();
}

// Handle browser navigation (back/forward)
window.addEventListener('hashchange', () => {
    const page = window.location.hash.replace('#', '') || 'home';
    loadPage(page);
});

// Single DOMContentLoaded initializer
window.addEventListener('DOMContentLoaded', () => {
    // Determine theme (Light Mode by default for new visitors)
    let isDark = false;
    try {
        const saved = localStorage.getItem('theme');
        isDark = (saved === 'dark');
    } catch (e) {
        isDark = false;
    }
    setTheme(isDark);

    // Initial page load
    const page = window.location.hash.replace('#', '') || 'home';
    loadPage(page);
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioUtils;
} else {
    window.PortfolioUtils = PortfolioUtils;
}