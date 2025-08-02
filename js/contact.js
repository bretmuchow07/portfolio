// Contact Form Functionality for Bret's Corner Portfolio

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        initializeContactForm();
    }
});

function initializeContactForm() {
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    // Form submission handler
    form.addEventListener('submit', handleFormSubmission);
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearValidation);
    });
    
    // Character counter for message field
    const messageField = document.getElementById('message');
    if (messageField) {
        addCharacterCounter(messageField);
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Validate form
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        showAlert('Please fill in all required fields correctly.', 'danger');
        return;
    }
    
    // Show loading state
    setLoadingState(submitBtn, true);
    
    // Simulate form submission (replace with your actual submission logic)
    simulateFormSubmission(formData)
        .then(response => {
            handleSubmissionSuccess(form, submitBtn);
        })
        .catch(error => {
            handleSubmissionError(submitBtn, error);
        });
}

function simulateFormSubmission(formData) {
    // This simulates a real form submission
    // Replace this with your actual form submission logic (e.g., EmailJS, Netlify Forms, etc.)
    
    return new Promise((resolve, reject) => {
        // Log form data for development
        console.log('Form submission data:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // Simulate network delay
        setTimeout(() => {
            // Simulate random success/failure for demo
            const success = Math.random() > 0.1; // 90% success rate
            
            if (success) {
                resolve({ status: 'success', message: 'Message sent successfully!' });
            } else {
                reject(new Error('Network error occurred'));
            }
        }, 2000);
    });
}

function handleSubmissionSuccess(form, submitBtn) {
    // Reset loading state
    setLoadingState(submitBtn, false);
    
    // Show success message
    showAlert(
        'Thanks for reaching out! I\'ll get back to you within 24 hours.',
        'success',
        'fa-check-circle'
    );
    
    // Reset form
    form.reset();
    form.classList.remove('was-validated');
    
    // Optional: Scroll to success message
    const alert = document.querySelector('.alert-success');
    if (alert) {
        alert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Track form submission (replace with your analytics)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            event_category: 'Contact',
            event_label: 'Contact Form'
        });
    }
}

function handleSubmissionError(submitBtn, error) {
    // Reset loading state
    setLoadingState(submitBtn, false);
    
    // Show error message
    showAlert(
        'Oops! Something went wrong. Please try again or email me directly.',
        'danger',
        'fa-exclamation-triangle'
    );
    
    console.error('Form submission error:', error);
}

function setLoadingState(button, isLoading) {
    if (isLoading) {
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = `
            <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Sending...
        `;
        button.disabled = true;
        button.classList.add('btn-loading');
    } else {
        button.innerHTML = button.dataset.originalText;
        button.disabled = false;
        button.classList.remove('btn-loading');
    }
}

function validateField(e) {
    const field = e.target;
    const isValid = field.checkValidity();
    
    if (!isValid) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
    } else {
        field.classList.add('is-valid');
        field.classList.remove('is-invalid');
    }
}

function clearValidation(e) {
    const field = e.target;
    field.classList.remove('is-invalid', 'is-valid');
}

function showAlert(message, type = 'info', icon = 'fa-info-circle') {
    // Remove existing alerts
    const existingAlerts = document.querySelectorAll('.contact-alert');
    existingAlerts.forEach(alert => alert.remove());
    
    // Create new alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show contact-alert mt-3`;
    alertDiv.innerHTML = `
        <i class="fas ${icon} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Insert alert after form
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form.nextSibling);
    
    // Auto-hide success alerts after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

function addCharacterCounter(textArea) {
    const maxLength = 1000;
    const counter = document.createElement('div');
    counter.className = 'character-counter text-muted text-end mt-1';
    counter.innerHTML = `<small>0 / ${maxLength} characters</small>`;
    
    textArea.parentNode.appendChild(counter);
    textArea.setAttribute('maxlength', maxLength);
    
    textArea.addEventListener('input', function() {
        const currentLength = this.value.length;
        counter.innerHTML = `<small>${currentLength} / ${maxLength} characters</small>`;
        
        if (currentLength > maxLength * 0.9) {
            counter.classList.add('text-warning');
        } else {
            counter.classList.remove('text-warning');
        }
    });
}

// Email validation enhancement
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility function to format form data for different submission services
function formatFormDataForService(formData, service = 'emailjs') {
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    switch (service) {
        case 'emailjs':
            return {
                from_name: `${data.firstName} ${data.lastName}`,
                from_email: data.email,
                subject: data.subject,
                message: data.message,
                budget: data.budget || 'Not specified',
                timeline: data.timeline || 'Not specified'
            };
        
        case 'netlify':
            return data;
        
        case 'formspree':
            return {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                subject: data.subject,
                message: `${data.message}\n\nBudget: ${data.budget || 'Not specified'}\nTimeline: ${data.timeline || 'Not specified'}`
            };
        
        default:
            return data;
    }
}

// Example integration with EmailJS (uncomment and configure to use)
/*
function submitWithEmailJS(formData) {
    const templateParams = formatFormDataForService(formData, 'emailjs');
    
    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(response => {
            console.log('EmailJS SUCCESS:', response.status, response.text);
            return response;
        })
        .catch(error => {
            console.error('EmailJS ERROR:', error);
            throw error;
        });
}
*/

// Example integration with Netlify Forms (uncomment to use)
/*
function submitWithNetlify(formData) {
    return fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response;
    });
}
*/

// Export functions for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeContactForm,
        formatFormDataForService,
        showAlert
    };
} else {
    window.ContactForm = {
        initializeContactForm,
        formatFormDataForService,
        showAlert
    };
}