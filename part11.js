document.addEventListener('DOMContentLoaded', () => {

  console.log('[Phase 11 Elite Leverage Dashboard Initialized]');

  /* ==========================================================================
     1. Flow State Toggle (Chaos vs Flow Dashboard)
     ========================================================================== */
  const btnChaos = document.getElementById('btnChaos');
  const btnFlow = document.getElementById('btnFlow');
  const dashboardInteractive = document.getElementById('dashboardInteractive');
  const calendarStatus = document.getElementById('calendarStatus');
  const inboxBadge = document.getElementById('inboxBadge');
  const inboxList = document.getElementById('inboxList');

  if (btnChaos && btnFlow && dashboardInteractive) {
    const setDashboardState = (state) => {
      if (state === 'chaos') {
        btnChaos.classList.add('active');
        btnFlow.classList.remove('active');
        dashboardInteractive.className = 'mockup-body dashboard-interactive chaos-active';
        calendarStatus.textContent = 'OVERLOADED';
        calendarStatus.className = 'card-status-ui text-red';
        
        inboxBadge.textContent = '412 Unread';
        inboxBadge.className = 'inbox-badge-ui text-red';

        // Toggle calendar items
        document.querySelectorAll('.item-chaos').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('.item-flow').forEach(el => el.classList.add('hidden'));

        // Reset inbox entries to messy
        inboxList.innerHTML = `
          <div class="inbox-item">
            <span class="sender">Marcus (VC Deal)</span>
            <span class="subject">URGENT: Re-send proposal details...</span>
          </div>
          <div class="inbox-item">
            <span class="sender">Distraction Pitcher</span>
            <span class="subject">Collab: Free review copy promotion...</span>
          </div>
        `;
      } else {
        btnChaos.classList.remove('active');
        btnFlow.classList.add('active');
        dashboardInteractive.className = 'mockup-body dashboard-interactive flow-active';
        calendarStatus.textContent = 'FLOW STATE';
        calendarStatus.className = 'card-status-ui text-green';
        
        inboxBadge.textContent = '0 Unread';
        inboxBadge.className = 'inbox-badge-ui text-green';

        // Toggle calendar items
        document.querySelectorAll('.item-chaos').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.item-flow').forEach(el => el.classList.remove('hidden'));

        // Reset inbox entries to clean
        inboxList.innerHTML = `
          <div class="inbox-item" style="border-color: rgba(0, 255, 102, 0.15); background: rgba(0, 255, 102, 0.02);">
            <span class="sender" style="color: #00ff66;">Jordan (Operational Partner)</span>
            <span class="subject">VIP Brief ready. Inbox filtered. 0 tasks require attention.</span>
          </div>
        `;
      }
    };

    btnChaos.addEventListener('click', () => setDashboardState('chaos'));
    btnFlow.addEventListener('click', () => setDashboardState('flow'));
  }

  /* ==========================================================================
     2. Eisenhower Delegation Matrix Click Handler
     ========================================================================== */
  const matrixTasks = document.querySelectorAll('.matrix-task-btn');
  const matrixFeedbackPanel = document.getElementById('matrixFeedbackPanel');
  const feedbackPlaceholder = document.getElementById('feedbackPlaceholder');
  const feedbackContent = document.getElementById('feedbackContent');
  const feedbackTaskTitle = document.getElementById('feedbackTaskTitle');
  const feedbackText = document.getElementById('feedbackText');

  const matrixFeedbacks = {
    'visionary-strategy': "High Value / High Joy: You keep this (Visionary Work). Protecting this core genius is my highest priority. I shield your schedule from administrative interruptions to allow uninhibited planning.",
    'visionary-content': "High Value / High Joy: You keep this (Visionary Work). Your creativity prints the revenue. I orchestrate complex travel itineraries, translators, gear sourcing, and location scouting so you just create.",
    'visionary-deals': "High Value / High Joy: You keep this (Visionary Work). You handshake on high-level relationships. I filter pitches, track sponsor operations, verify deliverables, and monitor pipeline stages.",
    'system-inbox': "High Value / Low Joy: Operational Opportunity. Jordan systematizes this. I architect automated filtering, manage VIP escalations, and audit incoming pitches so your focus is never fragmented.",
    'system-sponsors': "High Value / Low Joy: Operational Opportunity. Jordan manages this pipeline. I tracking deliverables deadlines, maintain client coordination, and organize CRM pipeline metrics.",
    'system-analytics': "High Value / Low Joy: Operational Opportunity. Jordan compiles audits. I gather metrics, compile visual executive briefs, and summarize contracts to guide your high-level strategy.",
    'delegate-reels': "Low Value / High Joy: Delegatable Errand. Jordan handles this operational loop. I manage draft asset transfers, coordinate editor communications, and audit version control.",
    'delegate-community': "Low Value / High Joy: Delegatable Errand. Jordan moderates operations. I compile priority feedback digests, filter inbound business leads, and escalate high-value opportunities.",
    'delegate-travel': "Low Value / High Joy: Delegatable Errand. Jordan manages itinerary execution. I book premium logistics, coordinate event setups, source local gear, and coordinate translators.",
    'leakage-calendar': "Low Value / Low Joy: Operational Leakage. Jordan handles this immediately. I schedule all meetings, resolve cross-border timezone conflicts, and aggressively gatekeep your schedule.",
    'leakage-receipts': "Low Value / Low Joy: Operational Leakage. Jordan audits receipts. I organize weekly business expense documentation and compile clean bookkeeping databases for your CPA.",
    'leakage-invoicing': "Low Value / Low Joy: Operational Leakage. Jordan audits invoicing. I submit invoices, monitor deal payments, and follow up on accounts receivable to accelerate cash flow."
  };

  if (matrixTasks && matrixFeedbackPanel) {
    matrixTasks.forEach(btn => {
      btn.addEventListener('click', () => {
        matrixTasks.forEach(t => t.classList.remove('selected'));
        btn.classList.add('selected');

        const tooltipKey = btn.getAttribute('data-tooltip');
        const taskTitle = btn.getAttribute('data-title');
        const feedback = matrixFeedbacks[tooltipKey] || "Feedback prescription not found.";

        feedbackPlaceholder.style.display = 'none';
        feedbackContent.style.display = 'block';
        feedbackTaskTitle.textContent = taskTitle;
        feedbackText.textContent = feedback;
      });
    });
  }

  /* ==========================================================================
     3. Global Operations Timezone Mapper
     ========================================================================== */
  const hotspots = document.querySelectorAll('.map-hotspot');
  const tooltip = document.getElementById('timezoneTooltip');
  const tooltipCity = document.getElementById('tooltipCity');
  const tooltipTime = document.getElementById('tooltipTime');

  const timezoneMap = {
    'CALIFORNIA': 'America/Los_Angeles',
    'LONDON': 'Europe/London',
    'DUBAI': 'Asia/Dubai',
    'TOKYO': 'Asia/Tokyo'
  };

  const getCityTime = (timezone) => {
    try {
      const now = new Date();
      return now.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (e) {
      return '--:--';
    }
  };

  let activeHotspot = null;

  const updateTooltip = () => {
    if (!activeHotspot) return;
    const city = activeHotspot.getAttribute('data-city');
    const tz = timezoneMap[city];
    const timeStr = getCityTime(tz);

    tooltipCity.textContent = city;
    tooltipTime.textContent = timeStr;

    const rect = activeHotspot.getBoundingClientRect();
    const parentRect = activeHotspot.offsetParent.getBoundingClientRect();
    
    let xOffset = rect.left - parentRect.left + (rect.width / 2);
    const yOffset = rect.top - parentRect.top;

    // Bounding clamp for timezone tooltip to prevent bleeding off screen on mobile
    // Tooltip width is ~160px, so half width is 80px. Add 10px buffer.
    const halfWidth = 80;
    if (parentRect && parentRect.width > 0) {
      xOffset = Math.max(halfWidth + 10, Math.min(parentRect.width - halfWidth - 10, xOffset));
    }

    tooltip.style.left = `${xOffset}px`;
    tooltip.style.top = `${yOffset}px`;
    tooltip.classList.add('active');
  };

  if (hotspots && tooltip) {
    hotspots.forEach(spot => {
      spot.addEventListener('mouseenter', () => {
        activeHotspot = spot;
        updateTooltip();
      });
      
      spot.addEventListener('click', () => {
        activeHotspot = spot;
        updateTooltip();
      });
      
      spot.addEventListener('mouseleave', () => {
        activeHotspot = null;
        tooltip.classList.remove('active');
      });
    });

    // Update time dynamically every 10 seconds while hovering to keep the clock ticking
    setInterval(() => {
      if (activeHotspot) {
        updateTooltip();
      }
    }, 10000);
  }

  /* ==========================================================================
     4. ROI Leverage Calculator with Custom Odometer Smooth Numerical Animation
     ========================================================================== */
  const tabOpportunity = document.getElementById('tabOpportunity');
  const tabGrowth = document.getElementById('tabGrowth');
  const contentOpportunity = document.getElementById('contentOpportunity');
  const contentGrowth = document.getElementById('contentGrowth');

  const hourlyRateInput = document.getElementById('hourlyRate');
  const hoursWastedInput = document.getElementById('hoursWasted');
  const currentOutputInput = document.getElementById('currentOutput');
  const assetValueInput = document.getElementById('assetValue');

  const hourlyRateVal = document.getElementById('hourlyRateVal');
  const hoursWastedVal = document.getElementById('hoursWastedVal');
  const currentOutputVal = document.getElementById('currentOutputVal');
  const assetValueVal = document.getElementById('assetValueVal');

  const weeklyLossElement = document.getElementById('weeklyLoss');
  const annualLossElement = document.getElementById('annualLoss');
  const additionalAssetsElement = document.getElementById('additionalAssets');
  const growthAddedElement = document.getElementById('growthAdded');
  const calcCtaText = document.getElementById('calcCtaText');

  // Keep a running database of previous slider values to initiate smooth mechanical increments (Odometer)
  const calcState = {
    weeklyLoss: 0,
    annualLoss: 0,
    additionalAssets: 0,
    growthAdded: 0
  };

  // Reusable High-End easeOutQuad Odometer Mechanical Value Roller
  const animateOdometer = (element, start, end, duration, prefix = '', suffix = '') => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing Curve: easeOutQuad
      const easedProgress = progress * (2 - progress);
      const current = Math.floor(easedProgress * (end - start) + start);
      
      // Render clean formatted integers
      const formatted = new Intl.NumberFormat('en-US').format(current);
      element.textContent = `${prefix}${formatted}${suffix}`;
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        const finalFormatted = new Intl.NumberFormat('en-US').format(end);
        element.textContent = `${prefix}${finalFormatted}${suffix}`;
      }
    };
    window.requestAnimationFrame(step);
  };

  const formatCurrencyLabel = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const updateCalculators = () => {
    const rate = parseInt(hourlyRateInput.value, 10);
    const hours = parseInt(hoursWastedInput.value, 10);
    const output = parseInt(currentOutputInput.value, 10);
    const value = parseInt(assetValueInput.value, 10);

    // Update Slider UI Labels
    hourlyRateVal.textContent = `$${rate}/hr`;
    hoursWastedVal.textContent = `${hours} hrs`;
    currentOutputVal.textContent = `${output} assets/mo`;
    assetValueVal.textContent = formatCurrencyLabel(value);

    // Target Formulas
    const targetWeeklyLoss = rate * hours;
    const targetAnnualLoss = targetWeeklyLoss * 52;
    
    // Growth Gap Calculation corrected to: Output * 12 (Integer, no '$', no decimals)
    const targetAdditionalAssets = output * 12; 
    
    // Revenue added dynamically scales based on Additional Assets * Asset/Deal Value:
    const targetGrowthAdded = targetAdditionalAssets * value;

    // Run high-end odometer roller increments (300ms transition time)
    animateOdometer(weeklyLossElement, calcState.weeklyLoss, targetWeeklyLoss, 300, '$');
    animateOdometer(annualLossElement, calcState.annualLoss, targetAnnualLoss, 300, '$');
    animateOdometer(additionalAssetsElement, calcState.additionalAssets, targetAdditionalAssets, 300, '', '');
    animateOdometer(growthAddedElement, calcState.growthAdded, targetGrowthAdded, 300, '$');

    // Update global databases
    calcState.weeklyLoss = targetWeeklyLoss;
    calcState.annualLoss = targetAnnualLoss;
    calcState.additionalAssets = targetAdditionalAssets;
    calcState.growthAdded = targetGrowthAdded;

    // Update Footer Text dynamically based on active tab
    if (tabOpportunity.classList.contains('active')) {
      calcCtaText.textContent = "Delegating this to an elite assistant unlocks 100% of this leakage.";
    } else {
      calcCtaText.textContent = `By delegating, you aren't just saving ${formatCurrencyLabel(targetAnnualLoss)}; you're scaling output.`;
    }
  };

  // Switch Tab Actions
  if (tabOpportunity && tabGrowth && contentOpportunity && contentGrowth) {
    tabOpportunity.addEventListener('click', () => {
      tabOpportunity.classList.add('active');
      tabGrowth.classList.remove('active');
      contentOpportunity.classList.add('active');
      contentGrowth.classList.remove('active');
      updateCalculators();
    });

    tabGrowth.addEventListener('click', () => {
      tabOpportunity.classList.remove('active');
      tabGrowth.classList.add('active');
      contentOpportunity.classList.remove('active');
      contentGrowth.classList.add('active');
      updateCalculators();
    });
  }

  // Attach sliders input event triggers
  if (hourlyRateInput && hoursWastedInput && currentOutputInput && assetValueInput) {
    hourlyRateInput.addEventListener('input', updateCalculators);
    hoursWastedInput.addEventListener('input', updateCalculators);
    currentOutputInput.addEventListener('input', updateCalculators);
    assetValueInput.addEventListener('input', updateCalculators);
    
    // Trigger initial calculation rolls
    updateCalculators();
  }

  /* ==========================================================================
     5. Floating Money Animation & Smooth Scroll for Unlock Hidden Revenue
     ========================================================================== */
  const btnUnlockRevenue = document.getElementById('btnUnlockRevenue');

  if (btnUnlockRevenue) {
    btnUnlockRevenue.addEventListener('click', (e) => {
      // Get click position or fallback to center of button
      const clientX = e.clientX || btnUnlockRevenue.getBoundingClientRect().left + btnUnlockRevenue.offsetWidth / 2;
      const clientY = e.clientY || btnUnlockRevenue.getBoundingClientRect().top + btnUnlockRevenue.offsetHeight / 2;

      // Spawn floating bills (reduced count to 8 and staggered for smooth performance)
      const numBills = 8;
      for (let i = 0; i < numBills; i++) {
        setTimeout(() => {
          createFloatingBill(clientX, clientY);
        }, i * 60); // Staggered spawn
      }
    });
  }

  const createFloatingBill = (x, y) => {
    const bill = document.createElement('div');
    bill.className = 'floating-bill';

    // Set position
    bill.style.left = `${x}px`;
    bill.style.top = `${y}px`;

    // Generate natural random wave and drift trajectories
    const driftXStart = Math.random() * 50 - 25; // Initial burst left/right
    const driftXEnd = Math.random() * 160 - 80;   // Float path wave
    const driftYStart = -Math.random() * 20 - 10;  // Initial hop
    const driftYEnd = -Math.random() * 150 - 150;  // Upward drift range
    const rotStart = Math.random() * 40 - 20;
    const rotEnd = Math.random() * 270 - 135;

    // Apply styles to CSS custom variables (driving transform3d keyframes)
    bill.style.setProperty('--drift-x-start', `${driftXStart}px`);
    bill.style.setProperty('--drift-x-end', `${driftXEnd}px`);
    bill.style.setProperty('--drift-y-start', `${driftYStart}px`);
    bill.style.setProperty('--drift-y-end', `${driftYEnd}px`);
    bill.style.setProperty('--rot-start', `${rotStart}deg`);
    bill.style.setProperty('--rot-end', `${rotEnd}deg`);

    document.body.appendChild(bill);

    // Clean up DOM
    setTimeout(() => {
      bill.remove();
    }, 2300);
  };

  /* ==========================================================================
     6. Fluid 3D Tilt & Parallax Mouse Interaction (Mockup Frame)
     ========================================================================== */
  const mockupContainer = document.querySelector('.hero-mockup-container');
  const mockupFrame = document.querySelector('.mockup-frame');
  const parallaxElements = document.querySelectorAll('.brand-badge-3d, .dashboard-card, .mockup-toggle-bar');

  if (mockupContainer && mockupFrame) {
    mockupContainer.addEventListener('mousemove', (e) => {
      const rect = mockupFrame.getBoundingClientRect();
      
      // Calculate coordinates relative to the frame center
      const frameCenterX = rect.left + rect.width / 2;
      const frameCenterY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - frameCenterX;
      const mouseY = e.clientY - frameCenterY;
      
      // Normalized between -1 and 1
      const normX = mouseX / (rect.width / 2);
      const normY = mouseY / (rect.height / 2);
      
      // Max rotation angles (degrees)
      const maxTilt = 12;
      const tiltX = -normY * maxTilt;
      const tiltY = normX * maxTilt;
      
      // Rotate frame
      mockupFrame.style.transform = `perspective(1500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
      
      // Apply offset translations to children for parallax depth
      parallaxElements.forEach((el) => {
        // Badge shifts more dynamically for high floating 3D perspective
        const factor = el.classList.contains('brand-badge-3d') ? 22 : 10;
        const transX = normX * factor;
        const transY = normY * factor;
        
        // Retain Z height
        const zDepth = el.classList.contains('brand-badge-3d') ? 30 : 15;
        el.style.transform = `translate3d(${transX}px, ${transY}px, ${zDepth}px)`;
        el.style.transition = 'transform 0.08s ease-out';
      });
    });

    mockupContainer.addEventListener('mouseleave', () => {
      // Revert mockup frame back to its original tilted baseline state
      mockupFrame.style.transform = `perspective(1500px) rotateY(-8deg) rotateX(4deg) scale3d(1, 1, 1)`;
      mockupFrame.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      
      // Revert inner children
      parallaxElements.forEach((el) => {
        const zDepth = el.classList.contains('brand-badge-3d') ? 30 : 15;
        el.style.transform = `translate3d(0, 0, ${zDepth}px)`;
        el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  }

  /* ==========================================================================
     7. Fluid 3D Tilt & Parallax Mouse Interaction (Hero Content Left Column)
     ========================================================================== */
  const heroContent = document.querySelector('.hero-content');
  const contentParallax = document.querySelectorAll('.hero-content .badge, .hero-content .hero-title, .hero-content .hero-subtitle, .hero-content .hero-cta-wrapper');

  if (heroContent) {
    heroContent.addEventListener('mousemove', (e) => {
      const rect = heroContent.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const normX = mouseX / (rect.width / 2);
      const normY = mouseY / (rect.height / 2);
      
      const maxTilt = 6; // Subtle rotation for text column
      const tiltX = -normY * maxTilt;
      const tiltY = normX * maxTilt;
      
      heroContent.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;
      
      contentParallax.forEach((el, index) => {
        const factor = (index + 1) * 3; // Shift distance factors
        const transX = normX * factor;
        const transY = normY * factor;
        el.style.transform = `translate3d(${transX}px, ${transY}px, 0)`;
        el.style.transition = 'transform 0.08s ease-out';
      });
    });

    heroContent.addEventListener('mouseleave', () => {
      heroContent.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      heroContent.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      
      contentParallax.forEach((el) => {
        el.style.transform = `translate3d(0, 0, 0)`;
        el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      });
    });
  }
});
