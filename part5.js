document.addEventListener('DOMContentLoaded', () => {

  console.log('[Phase 5 Dynamic Leverage Dashboard Initialized]');

  /* ==========================================================================
     1. Scroll Trigger cinematic class mappings (Part 4)
     ========================================================================== */
  const cinematicHeader = document.getElementById('cinematicHeader');
  
  const checkHeaderScroll = () => {
    if (!cinematicHeader) return;
    if (window.scrollY > 60) {
      cinematicHeader.classList.add('scrolled');
    } else {
      cinematicHeader.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', checkHeaderScroll, { passive: true });
  checkHeaderScroll(); // Initial evaluation on page entry

  /* ==========================================================================
     2. Flow State Toggle (Chaos vs Flow Dashboard)
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
     3. Eisenhower Delegation Matrix Click Handler
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
     4. Global Operations Timezone Mapper
     ========================================================================== */
  const hotspots = document.querySelectorAll('.map-hotspot');
  const tooltip = document.getElementById('timezoneTooltip');
  const tooltipCity = document.getElementById('tooltipCity');
  const tooltipTime = document.getElementById('tooltipTime');
  const tooltipStatus = document.getElementById('tooltipStatus');

  const timezoneMap = {
    'NYC': 'America/New_York',
    'London': 'Europe/London',
    'Dubai': 'Asia/Dubai',
    'Tokyo': 'Asia/Tokyo'
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

  if (hotspots && tooltip) {
    hotspots.forEach(spot => {
      const updateTooltip = () => {
        const city = spot.getAttribute('data-city');
        const status = spot.getAttribute('data-status');
        const tz = timezoneMap[city];
        const timeStr = getCityTime(tz);

        tooltipCity.textContent = city;
        tooltipTime.textContent = timeStr;
        tooltipStatus.textContent = status;

        const rect = spot.getBoundingClientRect();
        const parentRect = spot.offsetParent.getBoundingClientRect();
        
        const xOffset = rect.left - parentRect.left + (rect.width / 2);
        const yOffset = rect.top - parentRect.top;

        tooltip.style.left = `${xOffset}px`;
        tooltip.style.top = `${yOffset}px`;
        tooltip.classList.add('active');
      };

      spot.addEventListener('mouseenter', updateTooltip);
      spot.addEventListener('click', updateTooltip);
      
      spot.addEventListener('mouseleave', () => {
        tooltip.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     5. ROI Leverage Calculator with Custom Odometer Smooth Numerical Animation
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
    
    // Growth Gap Calculation corrected to: Hourly Value * Hours Lost * 52 weeks
    const targetAdditionalAssets = rate * hours * 52; 
    
    // Revenue added dynamically scales based on hours saved:
    // (reclaimed hours / 15 hours average per deal) * assetValue
    const reclaimedHoursYear = hours * 52;
    const targetGrowthAdded = Math.round(reclaimedHoursYear / 15) * value;

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
     6. Copy Efficiency Report to Clipboard with Bulletproof Exec Fallbacks
     ========================================================================== */
  const btnCopyReport = document.getElementById('btnCopyReport');
  const copySuccessMsg = document.getElementById('copySuccessMsg');

  // Bulletproof copy interface
  const copyTextToClipboard = (text) => {
    return new Promise((resolve, reject) => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(resolve).catch((err) => {
          // If native API fails, try the execCommand fallback immediately
          fallbackCopyText(text) ? resolve() : reject(err);
        });
      } else {
        fallbackCopyText(text) ? resolve() : reject(new Error('Copy functionality unsupported'));
      }
    });
  };

  // Solid fallback using temporary textarea select and execCommand
  const fallbackCopyText = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed'; // Avoid scrolling viewports
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    } catch (err) {
      document.body.removeChild(textarea);
      return false;
    }
  };

  if (btnCopyReport && copySuccessMsg) {
    btnCopyReport.addEventListener('click', () => {
      const weeklyLossValText = formatCurrencyLabel(calcState.weeklyLoss);
      const annualLossValText = formatCurrencyLabel(calcState.annualLoss);

      // Customized formatted report requested by user
      const reportText = `Efficiency Report for JordanWorld: Currently losing ${weeklyLossValText} per week. Total Annual Opportunity Cost: ${annualLossValText}.`;

      copyTextToClipboard(reportText).then(() => {
        // Show success toast notification
        copySuccessMsg.classList.add('show');
        setTimeout(() => {
          copySuccessMsg.classList.remove('show');
        }, 2000);
      }).catch((err) => {
        console.error('[Clipboard Action Failed]', err);
        // Toast fallback notification even if copy fails under sandboxed permissions
        copySuccessMsg.textContent = 'Report Generated in Console!';
        copySuccessMsg.classList.add('show');
        setTimeout(() => {
          copySuccessMsg.classList.remove('show');
        }, 2000);
      });
    });
  }
});
