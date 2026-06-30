/**
 * Jordanworld.co - Secure Client OS Dashboard Engine
 * Implements client-side PIN access, LocalStorage sync database,
 * interactive modals, state updates, and file uploading logs.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. Password Verification Gateway Gateway
  // ==========================================================================
  const gatewayOverlay = document.getElementById('gatewayOverlay');
  const clientDashboard = document.getElementById('clientDashboard');
  const gatewayForm = document.getElementById('gatewayForm');
  const accessPin = document.getElementById('accessPin');
  const pinError = document.getElementById('pinError');
  const logoutBtn = document.getElementById('logoutBtn');

  const CORRECT_ACCESS_CODE = 'JORDAN2026';

  const checkAuth = () => {
    if (sessionStorage.getItem('client_os_auth') === 'true') {
      gatewayOverlay.style.display = 'none';
      clientDashboard.style.display = 'flex';
      initWorkspace();
    } else {
      gatewayOverlay.style.display = 'flex';
      clientDashboard.style.display = 'none';
    }
  };

  gatewayForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (accessPin.value === CORRECT_ACCESS_CODE) {
      sessionStorage.setItem('client_os_auth', 'true');
      pinError.style.display = 'none';
      checkAuth();
    } else {
      pinError.style.display = 'block';
      accessPin.value = '';
      accessPin.focus();
    }
  });

  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('client_os_auth');
    checkAuth();
  });

  // ==========================================================================
  // 2. Custom Cursor (Slightly responsive ring lag)
  // ==========================================================================
  const customCursor = document.getElementById('customCursor');
  const cursorDot = customCursor.querySelector('.cursor-dot');
  const cursorRing = customCursor.querySelector('.cursor-ring');

  document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    cursorRing.animate({
      left: `${e.clientX}px`,
      top: `${e.clientY}px`
    }, { duration: 150, fill: 'forwards' });
  });

  const bindHoverEffects = () => {
    document.querySelectorAll('a, button, select, input, label, .task-item, .resource-card').forEach(elem => {
      elem.addEventListener('mouseenter', () => customCursor.classList.add('hovering'));
      elem.addEventListener('mouseleave', () => customCursor.classList.remove('hovering'));
    });
  };

  // ==========================================================================
  // 3. Clock Synchronizer (UTC Live ticker)
  // ==========================================================================
  const clockEl = document.getElementById('osLiveClock');
  const runLiveClock = () => {
    const now = new Date();
    clockEl.textContent = now.toUTCString().replace('GMT', 'UTC');
  };
  setInterval(runLiveClock, 1000);

  // ==========================================================================
  // 4. Client OS Data Engine (LocalStorage Persistent State)
  // ==========================================================================
  
  // Default values loaded only on first launch
  const defaultTimeline = [
    { date: '2026-05-27', time: '09:00 AM', title: 'Inbox Audit & Pitch Filter', desc: 'Cleared 40 pitches, flagged 2 sponsorships.', status: 'past' },
    { date: '2026-05-27', time: '12:30 PM', title: 'CRM Partnership Update', desc: 'Logging brand values and scheduling follow-up logs.', status: 'active' },
    { date: '2026-05-27', time: '03:00 PM', title: 'Q3 Travel Coordination', desc: 'Itinerary assembly and accommodation holds.', status: 'upcoming' },
    { date: '2026-05-27', time: '05:30 PM', title: 'EOD Status Report Sync', desc: 'Summary report compile and delivery.', status: 'upcoming' }
  ];

  const defaultTasks = [
    { id: 1, name: 'Sponsor deliverable asset checks', state: 'done' },
    { id: 2, name: 'Zero Inbox architecture setup', state: 'done' },
    { id: 3, name: 'Q3 Flight & hotel routing logs', state: 'pending' },
    { id: 4, name: 'Client database curation update', state: 'backlog' },
    { id: 5, name: 'Software integrations setup audit', state: 'backlog' }
  ];

  const getLocalDB = (key, fallback) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  };

  const saveLocalDB = (key, val) => {
    localStorage.setItem(key, JSON.stringify(val));
  };

  let timelineDb = [];
  let tasksDb = [];

  // Edit Operation State Trackers
  let editingTimelineIdx = null;
  let editingTaskId = null;

  // Calendar State Configuration
  let currentCalDate = new Date(2026, 4, 1); // Start at May 2026
  let selectedDateStr = '2026-05-27'; // Default selected date (mock today)
  
  const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Initialize workspace modules
  const initWorkspace = () => {
    timelineDb = getLocalDB('jordan_os_timeline', defaultTimeline);
    tasksDb = getLocalDB('jordan_os_tasks', defaultTasks);

    // Self-healing check: Ensure all loaded timeline items have a date
    let updated = false;
    timelineDb.forEach(item => {
      if (!item.date) {
        item.date = '2026-05-27';
        updated = true;
      }
    });
    if (updated) {
      saveLocalDB('jordan_os_timeline', timelineDb);
    }

    renderAll();
    runLiveClock();
  };

  const renderAll = () => {
    renderTimeline();
    renderTasks();
    renderCalendar();
    bindHoverEffects();
  };

  // ==========================================================================
  // 5. Columns Rendering Systems
  // ==========================================================================
  
  // Timeline Renderer
  const renderTimeline = () => {
    const container = document.getElementById('timelineContainer');
    container.innerHTML = '';

    timelineDb.forEach((item, idx) => {
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('timeline-item', item.status);
      
      const glowClass = item.status === 'active' ? 'glow' : '';
      
      itemDiv.innerHTML = `
        <div class="timeline-marker ${glowClass}"></div>
        <div class="timeline-content">
          <div class="header-title-row">
            <span class="time-label">${item.date || '2026-05-27'} • ${item.time}</span>
            <div style="display:flex; gap:6px;">
              <button class="btn-edit" data-idx="${idx}" title="Edit Event">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-sm">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
              <button class="btn-delete" data-idx="${idx}" title="Remove Event">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-sm">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
      `;
      container.appendChild(itemDiv);
    });

    // Edit Event listener
    container.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        editingTimelineIdx = idx;
        const item = timelineDb[idx];

        openModal(timelineModal);
        document.getElementById('eventDate').value = item.date || '2026-05-27';
        document.getElementById('eventTime').value = item.time;
        document.getElementById('eventTitle').value = item.title;
        document.getElementById('eventDesc').value = item.desc;
        document.getElementById('eventStatus').value = item.status;

        document.getElementById('timelineModalHeading').textContent = 'EDIT TIMELINE EVENT';
      });
    });

    // Delete Event listener
    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = btn.getAttribute('data-idx');
        timelineDb.splice(idx, 1);
        saveLocalDB('jordan_os_timeline', timelineDb);
        renderTimeline();
        renderCalendar();
        bindHoverEffects();
      });
    });
  };

  // Task Matrix Renderer
  const renderTasks = () => {
    const container = document.getElementById('matrixContainer');
    container.innerHTML = '';

    const states = [
      { key: 'done', label: 'COMPLETED', colorClass: 'label-done' },
      { key: 'pending', label: 'IN PROGRESS', colorClass: 'label-pending' },
      { key: 'backlog', label: 'BACKLOG (NEXT SPRINT)', colorClass: 'label-backlog' }
    ];

    states.forEach(state => {
      const sectionDiv = document.createElement('div');
      sectionDiv.classList.add('matrix-section');
      
      const filtered = tasksDb.filter(t => t.state === state.key);
      
      let listItemsHtml = '';
      if (filtered.length === 0) {
        listItemsHtml = `<li class="task-item" style="color: var(--text-muted); font-size:0.7rem; justify-content:center;">No tasks in this section.</li>`;
      } else {
        filtered.forEach(task => {
          let indicatorHtml = '';
          if (state.key === 'done') {
            indicatorHtml = `<span class="check-icon">✓</span>`;
          } else if (state.key === 'pending') {
            indicatorHtml = `<span class="pulse-indicator"></span>`;
          } else {
            indicatorHtml = `<span class="backlog-dot"></span>`;
          }

          listItemsHtml += `
            <li class="task-item ${state.key}">
              <div class="task-item-content">
                ${indicatorHtml}
                <span class="task-text">${task.name}</span>
              </div>
              <div style="display:flex; gap:6px;">
                <button class="btn-cycle" data-id="${task.id}" title="Toggle Task Status">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-sm">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                </button>
                <button class="btn-edit" data-id="${task.id}" title="Edit Task">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-sm">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
                <button class="btn-delete" data-id="${task.id}" title="Remove Task">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="icon-sm">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </li>
          `;
        });
      }

      sectionDiv.innerHTML = `
        <span class="matrix-section-label ${state.colorClass}">${state.label}</span>
        <ul class="matrix-list">
          ${listItemsHtml}
        </ul>
      `;
      container.appendChild(sectionDiv);
    });

    // Cycle task state listener (done -> pending -> backlog -> done)
    container.querySelectorAll('.btn-cycle').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        const task = tasksDb.find(t => t.id === id);
        if (task) {
          if (task.state === 'done') task.state = 'pending';
          else if (task.state === 'pending') task.state = 'backlog';
          else task.state = 'done';
          
          saveLocalDB('jordan_os_tasks', tasksDb);
          renderTasks();
          bindHoverEffects();
        }
      });
    });

    // Edit task listener
    container.querySelectorAll('.btn-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        editingTaskId = id;
        const task = tasksDb.find(t => t.id === id);
        if (task) {
          openModal(taskModal);
          document.getElementById('taskName').value = task.name;
          document.getElementById('taskState').value = task.state;
          document.getElementById('taskModalHeading').textContent = 'EDIT SPRINT TASK';
        }
      });
    });

    // Delete task listener
    container.querySelectorAll('.btn-delete').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.getAttribute('data-id'), 10);
        tasksDb = tasksDb.filter(t => t.id !== id);
        saveLocalDB('jordan_os_tasks', tasksDb);
        renderTasks();
        bindHoverEffects();
      });
    });
  };

  // ==========================================================================
  // 6. Master Calendar Grid & Details Rendering System
  // ==========================================================================
  const calPrevMonth = document.getElementById('calPrevMonth');
  const calNextMonth = document.getElementById('calNextMonth');
  const calMonthYear = document.getElementById('calMonthYear');
  const calendarDaysGrid = document.getElementById('calendarDaysGrid');
  const calSelectedDetails = document.getElementById('calSelectedDetails');
  const calSelectedEventsList = document.getElementById('calSelectedEventsList');

  const renderCalendar = () => {
    const year = currentCalDate.getFullYear();
    const month = currentCalDate.getMonth(); // 0-indexed

    // Update month and year display
    calMonthYear.textContent = `${MONTH_NAMES[month]} ${year}`;

    // Clear days grid
    calendarDaysGrid.innerHTML = '';

    // Calculate weekday offsets starting with Monday
    const firstDayOfMonth = new Date(year, month, 1);
    const dayOfWeek = firstDayOfMonth.getDay(); // 0: Sunday, 1: Monday, ...
    const startOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

    // Get total days in the month
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Get total days in the previous month
    const prevMonthDaysCount = new Date(year, month, 0).getDate();

    const mockTodayStr = '2026-05-27';

    // 1. Draw previous month fill days
    for (let i = startOffset - 1; i >= 0; i--) {
      const dayNum = prevMonthDaysCount - i;
      const dayCell = document.createElement('div');
      dayCell.classList.add('calendar-day', 'prev-month');
      dayCell.textContent = dayNum;
      calendarDaysGrid.appendChild(dayCell);
    }

    // 2. Draw current month days
    for (let day = 1; day <= totalDays; day++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('calendar-day');
      dayCell.textContent = day;

      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

      // Today highlight
      if (dateStr === mockTodayStr) {
        dayCell.classList.add('today');
      }

      // Selection highlight
      if (dateStr === selectedDateStr) {
        dayCell.classList.add('selected');
      }

      // Check for milestones
      const hasMilestone = timelineDb.some(item => item.date === dateStr);
      if (hasMilestone) {
        dayCell.classList.add('has-milestone');
      }

      // Day click event
      dayCell.addEventListener('click', () => {
        selectedDateStr = dateStr;
        
        // Update selection styling in grid
        document.querySelectorAll('.calendar-day').forEach(cell => cell.classList.remove('selected'));
        dayCell.classList.add('selected');

        renderSelectedDateDetails();
      });

      calendarDaysGrid.appendChild(dayCell);
    }

    // 3. Draw next month fill days to make a clean 6-row grid (42 cells total)
    const totalCells = 42;
    const currentCellsCount = startOffset + totalDays;
    const nextMonthDaysCount = totalCells - currentCellsCount;

    for (let day = 1; day <= nextMonthDaysCount; day++) {
      const dayCell = document.createElement('div');
      dayCell.classList.add('calendar-day', 'next-month');
      dayCell.textContent = day;
      calendarDaysGrid.appendChild(dayCell);
    }

    // Refresh selected details panel
    renderSelectedDateDetails();
  };

  const renderSelectedDateDetails = () => {
    calSelectedEventsList.innerHTML = '';

    const dateParts = selectedDateStr.split('-');
    const year = dateParts[0];
    const monthIndex = parseInt(dateParts[1], 10) - 1;
    const day = dateParts[2];
    
    const formattedDate = `${MONTH_NAMES[monthIndex]} ${parseInt(day, 10)}, ${year}`;
    const matchingEvents = timelineDb.filter(item => item.date === selectedDateStr);

    let listHtml = '';
    if (matchingEvents.length === 0) {
      listHtml = `
        <div style="color: var(--text-muted); font-size: 0.65rem; padding: 4px 0; font-family: var(--font-body);">
          No milestones scheduled for this date.
        </div>
      `;
    } else {
      matchingEvents.forEach(item => {
        const markerColor = item.status === 'past' ? 'var(--text-muted)' : (item.status === 'active' ? '#55ff77' : 'var(--border-color)');
        listHtml += `
          <div class="cal-event-card">
            <div class="cal-event-meta">
              <span>${item.time}</span>
              <span class="status-indicator-dot ${item.status === 'active' ? 'pulsing' : ''}" style="width: 6px; height: 6px; background-color: ${markerColor};"></span>
            </div>
            <h5>${item.title}</h5>
            <p>${item.desc}</p>
          </div>
        `;
      });
    }

    calSelectedEventsList.innerHTML = `
      <div style="font-weight: 700; margin-bottom: 6px; font-size: 0.65rem; text-transform: uppercase; color: var(--accent-grey); font-family: var(--font-body);">${formattedDate}</div>
      <div style="display:flex; flex-direction:column; gap:6px; max-height:120px; overflow-y:auto; padding-right:4px;">
        ${listHtml}
      </div>
      <button class="btn-cal-add" id="calAddEventBtn">+ Add Milestone</button>
    `;

    // Click handler for milestone creation within panel
    document.getElementById('calAddEventBtn').addEventListener('click', () => {
      openModal(timelineModal);
      
      // Pre-fill target date from selection
      document.getElementById('eventDate').value = selectedDateStr;
      document.getElementById('eventTime').value = '09:00 AM';
      document.getElementById('eventTitle').value = '';
      document.getElementById('eventDesc').value = '';
      document.getElementById('eventStatus').value = 'upcoming';

      document.getElementById('timelineModalHeading').textContent = 'ADD TIMELINE EVENT';
      editingTimelineIdx = null;
    });

    bindHoverEffects();
  };

  // Bind Month Navigation click elements
  calPrevMonth.addEventListener('click', () => {
    currentCalDate.setMonth(currentCalDate.getMonth() - 1);
    renderCalendar();
  });

  calNextMonth.addEventListener('click', () => {
    currentCalDate.setMonth(currentCalDate.getMonth() + 1);
    renderCalendar();
  });

  // ==========================================================================
  // 7. Modals CRUD Controls Operations
  // ==========================================================================
  const addTimelineBtn = document.getElementById('addTimelineBtn');
  const timelineModal = document.getElementById('timelineModal');
  const timelineForm = document.getElementById('timelineForm');

  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskModal = document.getElementById('taskModal');
  const taskForm = document.getElementById('taskForm');

  const openModal = (modal) => {
    modal.classList.add('open');
  };

  const closeModal = (modal) => {
    modal.classList.remove('open');
  };

  const closeAndResetTimelineModal = () => {
    closeModal(timelineModal);
    timelineForm.reset();
    document.getElementById('timelineModalHeading').textContent = 'ADD TIMELINE EVENT';
    editingTimelineIdx = null;
  };

  const closeAndResetTaskModal = () => {
    closeModal(taskModal);
    taskForm.reset();
    document.getElementById('taskModalHeading').textContent = 'ADD SPRINT TASK';
    editingTaskId = null;
  };

  // Bind close buttons inside modal cards
  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal === timelineModal) {
        closeAndResetTimelineModal();
      } else if (modal === taskModal) {
        closeAndResetTaskModal();
      } else {
        closeModal(modal);
      }
    });
  });

  // Add Event triggers
  addTimelineBtn.addEventListener('click', () => {
    openModal(timelineModal);
    document.getElementById('eventDate').value = selectedDateStr; // Pre-fill with current calendar selection
    document.getElementById('timelineModalHeading').textContent = 'ADD TIMELINE EVENT';
    editingTimelineIdx = null;
  });

  addTaskBtn.addEventListener('click', () => {
    openModal(taskModal);
    document.getElementById('taskModalHeading').textContent = 'ADD SPRINT TASK';
    editingTaskId = null;
  });

  // Save Modals Form Submissions
  timelineForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const date = document.getElementById('eventDate').value;
    const time = document.getElementById('eventTime').value;
    const title = document.getElementById('eventTitle').value;
    const desc = document.getElementById('eventDesc').value;
    const status = document.getElementById('eventStatus').value;

    if (editingTimelineIdx !== null) {
      timelineDb[editingTimelineIdx] = { date, time, title, desc, status };
    } else {
      timelineDb.push({ date, time, title, desc, status });
    }
    
    // Sort timeline items chronologically
    timelineDb.sort((a, b) => a.date.localeCompare(b.date));

    saveLocalDB('jordan_os_timeline', timelineDb);
    renderTimeline();
    renderCalendar();
    bindHoverEffects();
    closeAndResetTimelineModal();
  });

  taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('taskName').value;
    const state = document.getElementById('taskState').value;

    if (editingTaskId !== null) {
      const task = tasksDb.find(t => t.id === editingTaskId);
      if (task) {
        task.name = name;
        task.state = state;
      }
    } else {
      const id = Date.now();
      tasksDb.push({ id, name, state });
    }

    saveLocalDB('jordan_os_tasks', tasksDb);
    renderTasks();
    bindHoverEffects();
    closeAndResetTaskModal();
  });

  // Run Auth check on initial load
  checkAuth();
});
