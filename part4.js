document.addEventListener('DOMContentLoaded', () => {

  console.log('[Phase 4 Cinematic Operations Dashboard Initialized]');

  /* ==========================================================================
     1. Scroll Trigger cinematic class mappings
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
     5. ROI Growth Gap Tab Interface & Calculator Extension
     ========================================================================== */
  const tabOpportunity = document.getElementById('tabOpportunity');
  const tabGrowth = document.getElementById('tabGrowth');
  const contentOpportunity = document.getElementById('contentOpportunity');
  const contentGrowth = document.getElementById('contentGrowth');

  const currentOutputInput = document.getElementById('currentOutput');
  const assetValueInput = document.getElementById('assetValue');
  const currentOutputVal = document.getElementById('currentOutputVal');
  const assetValueVal = document.getElementById('assetValueVal');

  const additionalAssetsVal = document.getElementById('additionalAssets');
  const growthAddedVal = document.getElementById('growthAdded');
  
  const hourlyRateInput = document.getElementById('hourlyRate');
  const hoursWastedInput = document.getElementById('hoursWasted');
  const calcCtaText = document.getElementById('calcCtaText');

  if (tabOpportunity && tabGrowth && contentOpportunity && contentGrowth) {
    tabOpportunity.addEventListener('click', () => {
      tabOpportunity.classList.add('active');
      tabGrowth.classList.remove('active');
      contentOpportunity.classList.add('active');
      contentGrowth.classList.remove('active');
      calcCtaText.textContent = "Delegating this to an elite partner unlocks 100% of this leakage.";
    });

    tabGrowth.addEventListener('click', () => {
      tabOpportunity.classList.remove('active');
      tabGrowth.classList.add('active');
      contentOpportunity.classList.remove('active');
      contentGrowth.classList.add('active');
      
      const rate = parseInt(hourlyRateInput.value, 10);
      const hours = parseInt(hoursWastedInput.value, 10);
      const annualOpportunity = rate * hours * 52;
      const formatVal = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(annualOpportunity);
      
      calcCtaText.textContent = `By delegating, you aren't just saving ${formatVal}; you're scaling output.`;
      
      updateGrowthCalculator();
    });
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const updateGrowthCalculator = () => {
    if (!currentOutputInput || !assetValueInput || !hoursWastedInput) return;

    const output = parseInt(currentOutputInput.value, 10);
    const value = parseInt(assetValueInput.value, 10);
    const hoursSavedWeekly = parseInt(hoursWastedInput.value, 10);

    const reclaimedHoursYear = hoursSavedWeekly * 52;
    const additionalAssets = Math.round(reclaimedHoursYear / 15);
    const revenueAdded = additionalAssets * value;

    currentOutputVal.textContent = `${output} assets/mo`;
    assetValueVal.textContent = formatCurrency(value);

    additionalAssetsVal.textContent = `+${additionalAssets} assets/yr`;
    growthAddedVal.textContent = formatCurrency(revenueAdded);
  };

  if (currentOutputInput && assetValueInput) {
    currentOutputInput.addEventListener('input', updateGrowthCalculator);
    assetValueInput.addEventListener('input', updateGrowthCalculator);
  }

  /* ==========================================================================
     6. Copy Efficiency Report to Clipboard
     ========================================================================== */
  const btnCopyReport = document.getElementById('btnCopyReport');
  const copySuccessMsg = document.getElementById('copySuccessMsg');

  if (btnCopyReport && copySuccessMsg) {
    btnCopyReport.addEventListener('click', () => {
      const hourlyRate = hourlyRateInput.value;
      const hoursWasted = hoursWastedInput.value;
      const weeklyLoss = formatCurrency(hourlyRate * hoursWasted);
      const annualLoss = formatCurrency(hourlyRate * hoursWasted * 52);

      const output = currentOutputInput.value;
      const assetVal = formatCurrency(assetValueInput.value);
      const reclaimedHours = hoursWasted * 52;
      const extraAssets = Math.round(reclaimedHours / 15);
      const revAdded = formatCurrency(extraAssets * assetValueInput.value);

      const reportText = `=== LEVERAGE & EFFICIENCY REPORT ===
Hourly Rate Value: $${hourlyRate}/hr
Weekly Hours Lost to Admin: ${hoursWasted} hrs
Annual Opportunity Cost (Loss): ${annualLoss}

Monthly Output: ${output} assets
Average Asset/Deal Value: ${assetVal}
Reclaimed Hours/Year: ${reclaimedHours} hrs
Additional Output Capacity: +${extraAssets} assets/yr
Potential Scale Value Unlocked: ${revAdded}

Prepared for Discovery Consultation at jordanworld.co
====================================`;

      navigator.clipboard.writeText(reportText).then(() => {
        copySuccessMsg.classList.add('show');
        setTimeout(() => {
          copySuccessMsg.classList.remove('show');
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy efficiency report:', err);
      });
    });
  }
});
