document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Header Navigation Scroll Effect
     ========================================================================== */
  const header = document.querySelector('.header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check

  /* ==========================================================================
     2. Custom Rolls-Royce Style Animated Follower Cursor
     ========================================================================== */
  const cursor = document.getElementById('customCursor');
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorRing = document.querySelector('.cursor-ring');

  if (cursor && cursorDot && cursorRing) {
    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let dotX = -100;
    let dotY = -100;

    // Track mouse coordinates
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // High-performance animated rendering loop (Fluid Spring Lerp)
    const animateCursor = () => {
      // Linear interpolation (lerp)
      // Dot follows coordinates very quickly for maximum responsiveness
      dotX += (mouseX - dotX) * 0.45;
      dotY += (mouseY - dotY) * 0.45;

      // Ring follows with a premium, organic fluid lag (spring damping coefficient)
      ringX += (mouseX - ringX) * 0.14;
      ringY += (mouseY - ringY) * 0.14;

      cursorDot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;

      requestAnimationFrame(animateCursor);
    };
    
    // Start animation loop
    animateCursor();

    // Hide custom cursor when mouse leaves the document window area
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
    });

    // Highly performant event delegation for tactile interactive hover states
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, input, select, textarea, [role="button"], input[type="range"]')) {
        cursor.classList.add('hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest('a, button, input, select, textarea, [role="button"], input[type="range"]')) {
        cursor.classList.remove('hovering');
      }
    });
  }

  /* ==========================================================================
     3. Dynamic ROI Opportunity Cost Calculator
     ========================================================================== */
  const hourlyRateInput = document.getElementById('hourlyRate');
  const hoursWastedInput = document.getElementById('hoursWasted');
  const hourlyRateVal = document.getElementById('hourlyRateVal');
  const hoursWastedVal = document.getElementById('hoursWastedVal');
  const weeklyLossVal = document.getElementById('weeklyLoss');
  const annualLossVal = document.getElementById('annualLoss');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const updateCalculator = () => {
    const rate = parseInt(hourlyRateInput.value, 10);
    const hours = parseInt(hoursWastedInput.value, 10);

    // Update Slider UI Labels
    hourlyRateVal.textContent = `$${rate}/hr`;
    hoursWastedVal.textContent = `${hours} hrs`;

    // Perform calculations
    const weeklyLoss = rate * hours;
    const annualLoss = weeklyLoss * 52;

    // Display Results with modern transitions
    weeklyLossVal.textContent = formatCurrency(weeklyLoss);
    annualLossVal.textContent = formatCurrency(annualLoss);
  };

  if (hourlyRateInput && hoursWastedInput) {
    hourlyRateInput.addEventListener('input', updateCalculator);
    hoursWastedInput.addEventListener('input', updateCalculator);
    // Initialize calculator results
    updateCalculator();
  }

  /* ==========================================================================
     4. Mobile Navigation Menu Toggle
     ========================================================================== */
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });

    // Close mobile nav when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }

  /* ==========================================================================
     5. Interactive Form Submission
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (contactForm && formSuccess) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Mock submitting state (tactile feedback)
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const submitText = submitBtn.querySelector('span');
      
      submitText.textContent = 'Securing Connection...';
      submitBtn.style.opacity = '0.8';
      submitBtn.style.pointerEvents = 'none';

      // Capture inputs for a premium visual feedback console log
      const payload = {
        name: document.getElementById('clientName').value,
        email: document.getElementById('clientEmail').value,
        role: document.getElementById('clientRole').value || 'Unspecified',
        bottleneck: document.getElementById('clientBottleneck').value,
        message: document.getElementById('clientMsg').value
      };

      console.log('[Operational Lead Received]', payload);

      // Simulate network request and transition
      setTimeout(() => {
        // Fade out form
        contactForm.style.opacity = '0';
        setTimeout(() => {
          contactForm.style.display = 'none';
          
          // Show success state
          formSuccess.classList.add('show');
          formSuccess.style.position = 'relative';
          formSuccess.style.top = 'auto';
          formSuccess.style.left = 'auto';
          formSuccess.style.transform = 'none';
        }, 300);
      }, 1500);
    });
  }

  /* ==========================================================================
     6. Dynamic Scroll Reveal Effects (Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.service-card, .testimonial-card, .calculator-card, .about-text-column');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
      // Set initial transparent style and transition
      el.style.opacity = '0';
      el.style.transform = 'translateY(25px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      
      revealObserver.observe(el);
    });

    // Add dynamic CSS class rule via JS
    const style = document.createElement('style');
    style.innerHTML = `
      .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /* ==========================================================================
     7. Rolls-Royce Dot-Highlight Scroll Navigation & ScrollSpy
     ========================================================================== */
  const scrollDots = document.querySelectorAll('.scroll-dot');
  const sections = document.querySelectorAll('section[id]');

  const updateScrollSpy = () => {
    let currentSectionId = 'hero';
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    scrollDots.forEach(dot => {
      if (dot.getAttribute('data-section') === currentSectionId) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  };

  // Smooth scroll click handler for dots
  scrollDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = dot.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy(); // Initial check
});
