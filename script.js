// Theme Toggle Functionality
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const themeIconMoon = themeToggleBtn?.querySelector('.fa-moon');
const themeIconSun = themeToggleBtn?.querySelector('.fa-sun');

// Check for saved theme preference or use preferred color scheme
const currentTheme = localStorage.getItem('theme') || 
(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);

if (currentTheme === 'light' && themeIconMoon && themeIconSun) {
  themeIconMoon.style.display = 'none';
  themeIconSun.style.display = 'inline-block';
}

themeToggleBtn?.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  if (themeIconMoon && themeIconSun) {
    if (newTheme === 'light') {
      themeIconMoon.style.display = 'none';
      themeIconSun.style.display = 'inline-block';
    } else {
      themeIconMoon.style.display = 'inline-block';
      themeIconSun.style.display = 'none';
    }
  }
});

// Contact form submission with success/error messages
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        
        try {
          // Show loading state
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';
          
          const formData = new FormData(this);
          const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
              'Accept': 'application/json'
            }
          });
          
          if (response.ok) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.textContent = 'Thank you! Your message has been sent.';
            successMessage.style.color = '#4ade80';
            successMessage.style.marginTop = '1rem';
            successMessage.style.textAlign = 'center';
            this.appendChild(successMessage);
            
            // Reset form
            this.reset();
            
            // Remove message after 5 seconds
            setTimeout(() => {
              successMessage.remove();
            }, 5000);
          } else {
            throw new Error('Form submission failed');
          }
        } catch (error) {
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.textContent = 'Oops! There was a problem sending your message. Please try again.';
            errorMessage.style.color = '#f87171';
            errorMessage.style.marginTop = '1rem';
            errorMessage.style.textAlign = 'center';
            
            // Remove any existing messages
            const existingMessages = this.querySelectorAll('div');
            existingMessages.forEach(msg => msg.remove());
            
            this.appendChild(errorMessage);
        } finally {
            // Reset button state
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    });
}

// Enhanced Smooth Scrolling (replaces the duplicate simple version)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      const targetPosition = targetElement.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // Update URL without jumping
      history.pushState(null, null, targetId);
    }
  });
});

// Page Loader
window.addEventListener('load', () => {
  const pageLoader = document.querySelector('.page-loader');
  if (pageLoader) {
    setTimeout(() => {
      pageLoader.classList.add('hidden');
      
      // Remove from DOM after animation completes
      setTimeout(() => {
        pageLoader.remove();
      }, 500);
    }, 1000); // Adjust time as needed
  }
});

// Animate skill bars when they come into view
const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.bar');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute('data-level');
        entry.target.style.width = `${level}%`;
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });
  
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
};

window.addEventListener('DOMContentLoaded', animateSkillBars);

// Updates copyright year automatically
document.getElementById('year').textContent = new Date().getFullYear();

// Back to top button visibility
window.addEventListener("scroll", function () {
  const btn = document.getElementById("back-to-top");
  if (btn) {
    btn.style.display = window.scrollY > 200 ? "block" : "none";
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn?.addEventListener('click', () => {
  const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
  mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
  navLinks.classList.toggle('active');
  document.body.classList.toggle('no-scroll');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('active');
    mobileMenuBtn?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  });
});

// Preload all images after initial load
window.addEventListener('load', function() {
  const images = [
    'assets/images/oluchukwu.jpg',
    'assets/images/weather-app.PNG',
    'assets/images/calculator.PNG',
    'assets/images/bemore.PNG',
    'assets/images/vector.PNG',
    'assets/images/dorry.PNG',
    'assets/images/empowa.PNG',
    'assets/images/kura.PNG',
    'assets/images/logo.png',
    'assets/images/favicon.ico.png',
  ];
  
  images.forEach(img => {
    new Image().src = img;
  });
});

// Make experience items collapsible on mobile
document.querySelectorAll('.experience-header').forEach(header => {
  header.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      const item = header.parentElement;
      const description = item.querySelector('.experience-description');
      description.style.display = description.style.display === 'none' ? 'block' : 'none';
    }
  });
});