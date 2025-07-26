// Load navbar from components folder
fetch('components/navbar.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('navbar-container').innerHTML = html;
    attachNavEvents(); // Attach events after navbar loads
  });

// Simple router
function loadPage(page) {
  fetch(`pages/${page}.html`)
    .then(res => {
      if (!res.ok) throw new Error('Page not found');
      return res.text();
    })
    .then(html => document.getElementById('app-content').innerHTML = html)
    .catch(() => document.getElementById('app-content').innerHTML = '<div class="p-4 text-danger">Page not found.</div>');
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