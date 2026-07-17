document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // NAVIGATION HEADER & MOBILE MENU
  // ==========================================================================
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu-bar');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars-staggered';
      }
    });

    // Close menu when link clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        icon.className = 'fa-solid fa-bars-staggered';
      });
    });
  }

  // ==========================================================================
  // LIGHT/DARK THEME SWITCHER
  // ==========================================================================
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('portfolio-theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    updateThemeIcon(true);
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    updateThemeIcon(false);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = body.classList.contains('light-theme');
      if (isLight) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('portfolio-theme', 'dark');
        updateThemeIcon(false);
      } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('portfolio-theme', 'light');
        updateThemeIcon(true);
      }
    });
  }

  function updateThemeIcon(isLight) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (isLight) {
      icon.className = 'fa-solid fa-sun';
    } else {
      icon.className = 'fa-solid fa-moon';
    }
  }

  // ==========================================================================
  // TYPEWRITER EFFECT
  // ==========================================================================
  const typewriterElement = document.getElementById('typewriter');
  const roles = ["intelligent models.", "AI solutions.", "cloud systems.", "web applications."];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    if (!typewriterElement) return;

    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
      typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50; // Faster deleting speed
    } else {
      typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 120; // Natural typing speed
    }

    if (!isDeleting && charIndex === currentRole.length) {
      // Pause at full word
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
  }

  if (typewriterElement) {
    typeEffect();
  }

  // ==========================================================================
  // ACTIVE LINK OBSERVER
  // ==========================================================================
  const sections = document.querySelectorAll('section');
  
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // Adjust active area triggers
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  // ==========================================================================
  // PROJECTS CATEGORY FILTER
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('fade-out');
        } else {
          card.classList.add('fade-out');
        }
      });
    });
  });

  // ==========================================================================
  // MOCK CONTACT FORM SUBMISSION
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('btn-submit');

  if (contactForm && formStatus && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Disable inputs & update button content
      const inputs = contactForm.querySelectorAll('.form-control');
      inputs.forEach(input => input.disabled = true);
      
      const originalBtnContent = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
      
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      // Simulate API delivery
      setTimeout(() => {
        // Mock success
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        formStatus.classList.add('success');
        
        // Re-enable and reset form
        inputs.forEach(input => {
          input.disabled = false;
          input.value = '';
        });
        
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnContent;
        
        // Remove status message after 5 seconds
        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'form-status';
        }, 5000);

      }, 1500);
    });
  }
});
