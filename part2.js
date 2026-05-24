document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Flow State Toggle (Chaos vs Flow Dashboard)
     ========================================================================== */
  const btnChaos = document.getElementById('btnChaos');
  const btnFlow = document.getElementById('btnFlow');
  const dashboardInteractive = document.getElementById('dashboardInteractive');
  const calendarStatus = document.getElementById('calendarStatus');
  const inboxBadge = document.getElementById('inboxBadge');
  const calendarGrid = document.getElementById('calendarGrid');
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
            <span class="sender" style="color: #00ff66;">Jordan (Assistant)</span>
            <span class="subject">Daily brief ready & inbox categorized. Zero actions needed.</span>
          </div>
        `;
      }
    };

    btnChaos.addEventListener('click', () => setDashboardState('chaos'));
    btnFlow.addEventListener('click', () => setDashboardState('flow'));
  }

  /* ==========================================================================
     2. Eisenhower Delegation Matrix click handler
     ========================================================================== */
  const matrixTasks = document.querySelectorAll('.matrix-task-btn');
  const matrixFeedbackPanel = document.getElementById('matrixFeedbackPanel');
  const feedbackPlaceholder = document.getElementById('feedbackPlaceholder');
  const feedbackContent = document.getElementById('feedbackContent');
  const feedbackTaskTitle = document.getElementById('feedbackTaskTitle');
  const feedbackText = document.getElementById('feedbackText');

  const matrixFeedbacks = {
    'visionary-strategy': "High Value / High Joy: This is your core genius. You must retain absolute focus here. Jordan protects this block by shielding your schedule from meeting coordination and distractions.",
    'visionary-content': "High Value / High Joy: This is what prints money and builds authority. You create; Jordan handles location sourcing, logistics, gear coordination, and translation details in the background.",
    'visionary-deals': "High Value / High Joy: You make final calls. Jordan handles deal filtering, monitors pipeline stages, compiles briefing notes, and ensures deliverables are executed.",
    'system-inbox': "High Value / Low Joy: Essential operations, but drains your focus. Jordan installs a Zero Inbox architecture, audits inbound pitches, and guarantees you only see top-priority items.",
    'system-sponsors': "High Value / Low Joy: Maintaining active partnership relations. Jordan builds CRM pipelines, coordinates deadlines, and ensures deliverables are shipped without micro-management.",
    'system-analytics': "High Value / Low Joy: Sifting metrics. Jordan aggregates analytical data from contracts and platforms, providing visual digests to guide decisions without the dashboard clutter.",
    'delegate-reels': "Low Value / High Joy: Splicing content is satisfying, but drags you away from building. Jordan handles editor communication, transfers project assets, and tracks version approvals.",
    'delegate-community': "Low Value / High Joy: Engaging is fun, but consumes hours. Jordan filters comments, flags high-priority partnership leads, and organizes key feedback reports.",
    'delegate-travel': "Low Value / High Joy: Travel is inspiring, but booking is admin. Jordan builds precise travel itineraries, handles flight tickets, and secures executive lodging.",
    'leakage-calendar': "Low Value / Low Joy: Administrative bottleneck. Jordan takes over completely, scheduling appointments, resolving timezone conflicts, and guarding your time.",
    'leakage-receipts': "Low Value / Low Joy: Bookkeeping friction. Jordan files receipts, tracks expense allocations, and compiles reports for your CPA.",
    'leakage-invoicing': "Low Value / Low Joy: Cash flow admin. Jordan drafts invoices, monitors sponsor pipeline stages, and follows up on payments so you get paid faster."
  };

  if (matrixTasks && matrixFeedbackPanel) {
    matrixTasks.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle selected state styling
        matrixTasks.forEach(t => t.classList.remove('selected'));
        btn.classList.add('selected');

        const tooltipKey = btn.getAttribute('data-tooltip');
        const taskTitle = btn.getAttribute('data-title');
        const feedback = matrixFeedbacks[tooltipKey] || "Prescription not loaded.";

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

        // Position tooltip relative to map-hotspot
        const rect = spot.getBoundingClientRect();
        const parentRect = spot.offsetParent.getBoundingClientRect();
        
        // Calculate offset position
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
     4. ROI Growth Gap Tab Interface & Calculator Extension
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

  // Tabs switching
  if (tabOpportunity && tabGrowth && contentOpportunity && contentGrowth) {
    tabOpportunity.addEventListener('click', () => {
      tabOpportunity.classList.add('active');
      tabGrowth.classList.remove('active');
      contentOpportunity.classList.add('active');
      contentGrowth.classList.remove('active');
      calcCtaText.textContent = "Delegating this to an elite assistant unlocks 100% of this leakage.";
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
      
      calcCtaText.textContent = `By delegating, you aren't just saving ${formatVal}; you're scaling capacity.`;
      
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

    // Dynamic scale formula
    // Reclaimed hours per year = hoursSavedWeekly * 52
    // If we assume focused visionary work takes 15 hours to produce 1 high-value asset/deal
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
     5. Copy Efficiency Report to Clipboard
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
Additional Published Output Capacity: +${extraAssets} assets/yr
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
