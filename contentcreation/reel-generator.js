/**
 * Jordanworld.co - Instagram Marketing Suite (Reels & Carousels)
 * Combined Video & Multi-Slide Image Render Engines
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================================================
  // 1. Data Presets
  // ==========================================================================
  const presets = {
    'leakage': {
      slide1Text1: "Every hour you spend on admin...",
      slide1Text2: "is brand leverage lost.",
      slide2Text1: "Jordan handles inbox, deals & travel.",
      slide2Text2: "Unlock $117,000 Opportunity Cost.",
      slide3Text1: "Book a 15-min Discovery Call",
      slide3Text2: "jordanworld.co"
    },
    'zero-inbox': {
      slide1Text1: "400+ unread pitches",
      slide1Text2: "cluttering your schedule?",
      slide2Text1: "Zero Inbox. Fully automated logs.",
      slide2Text2: "Clean workflow, zero friction.",
      slide3Text1: "Reclaim Operational Mastery",
      slide3Text2: "jordanworld.co"
    },
    'reclaim-time': {
      slide1Text1: "Visionaries shouldn't coordinate",
      slide1Text2: "messy calendars & travel.",
      slide2Text1: "Buy back 15+ hours every week",
      slide2Text2: "to build and print money.",
      slide3Text1: "Book Your Elite Partner",
      slide3Text2: "jordanworld.co"
    },
    'proof': {
      slide1Text1: "\"An absolute operational",
      slide1Text2: "game-changer for my brand.\"",
      slide2Text1: "- Aria Laurent",
      slide2Text2: "YouTube Creator (3.2M Subs)",
      slide3Text1: "Scale Your Brand Bandwidth",
      slide3Text2: "jordanworld.co"
    },
    'audit': {
      slide1Text1: "Feeling completely stretched too thin",
      slide1Text2: "managing all the background noise?",
      slide2Text1: "Let's locate your leakage points",
      slide2Text2: "and optimize your business flow.",
      slide3Text1: "Book a Free 15-Min Audit",
      slide3Text2: "jordanworld.co"
    }
  };

  const carouselPresets = {
    'c-leakage': {
      carCoverTitle: "Are you leaking $117k every single year?",
      carCoverSub: "The opportunity cost of doing admin yourself.",
      carPain1: "Messy Calendar & Meeting Clashes",
      carPain2: "400+ Unread Sponsorship Pitches",
      carPain3: "Logistical Travel Scheduling Friction",
      carSolTitle: "Delegation unlocks absolute focus.",
      carSolSub: "Jordan runs your logistics so you focus 100% on money-making vision work.",
      carCtaTitle: "Book a Free 15-Min Operational Leak Audit",
      carCtaSub: "jordanworld.co • Only 2 slots open"
    },
    'c-scaling': {
      carCoverTitle: "Visionaries shouldn't coordinate admin.",
      carCoverSub: "Reclaim your creative focus to scale your brand.",
      carPain1: "Losing 15+ hours to calendar email back-and-forth",
      carPain2: "Messy files, checklists and missed sponsorship deadlines",
      carPain3: "Burnout managing details instead of money work",
      carSolTitle: "High-agency operational partner.",
      carSolSub: "No hand-holding needed. Send a voice note, and it is handled.",
      carCtaTitle: "Secure 1 of 2 Open Spots for Q3",
      carCtaSub: "Book a discovery consultation at jordanworld.co"
    },
    'c-system': {
      carCoverTitle: "How to turn 400+ unread pitches to 0.",
      carCoverSub: "A case study in elite inbox management.",
      carPain1: "Missed partnership brand deal pipeline value",
      carPain2: "Inbox overflow clogging creative work time",
      carPain3: "Sponsor deliverable deadline tracking chaos",
      carSolTitle: "Zero inbox. Fully organized pipelines.",
      carSolSub: "Jordan filters distractions and secures timely sponsor follow-ups.",
      carCtaTitle: "Gain Operational Leverage Today",
      carCtaSub: "Read the case study or book your call at jordanworld.co"
    }
  };

  // ==========================================================================
  // 2. DOM Elements & Tab State Controls
  // ==========================================================================
  let activeTab = 'reel'; // 'reel' or 'carousel'
  let carouselSlideIndex = 0; // 0, 1, 2, 3

  const canvas = document.getElementById('videoCanvas');
  const ctx = canvas.getContext('2d');
  
  // Tab Elements
  const tabBtnReel = document.getElementById('tabBtnReel');
  const tabBtnCarousel = document.getElementById('tabBtnCarousel');
  const reelControlsContainer = document.getElementById('reelControlsContainer');
  const carouselControlsContainer = document.getElementById('carouselControlsContainer');
  const reelsCatalog = document.getElementById('reelsCatalog');
  const carouselsCatalog = document.getElementById('carouselsCatalog');
  const instructReel = document.getElementById('instructReel');
  const instructCarousel = document.getElementById('instructCarousel');
  
  // Preview structural widgets
  const previewHeader = document.getElementById('previewHeader');
  const viewportFrame = document.getElementById('viewportFrame');
  const phoneNotch = document.getElementById('phoneNotch');
  const timeIndicator = document.getElementById('timeIndicator');
  const pageIndicator = document.getElementById('pageIndicator');
  const playOverlay = document.getElementById('playOverlay');
  const playBtnLarge = document.getElementById('playBtnLarge');
  
  const reelToolbar = document.getElementById('reelToolbar');
  const carouselToolbar = document.getElementById('carouselToolbar');
  
  // REELS inputs
  const templateSelect = document.getElementById('templateSelect');
  const bgStyleSelect = document.getElementById('bgStyleSelect');
  const accentColorPicker = document.getElementById('accentColor');
  const particleSpeedSelect = document.getElementById('particleSpeed');
  const musicSelect = document.getElementById('musicSelect');
  
  const slide1Text1Input = document.getElementById('slide1Text1');
  const slide1Text2Input = document.getElementById('slide1Text2');
  const slide2Text1Input = document.getElementById('slide2Text1');
  const slide2Text2Input = document.getElementById('slide2Text2');
  const slide3Text1Input = document.getElementById('slide3Text1');
  const slide3Text2Input = document.getElementById('slide3Text2');

  // CAROUSEL inputs
  const carouselTemplateSelect = document.getElementById('carouselTemplateSelect');
  const carCoverTitleInput = document.getElementById('carCoverTitle');
  const carCoverSubInput = document.getElementById('carCoverSub');
  const carPain1Input = document.getElementById('carPain1');
  const carPain2Input = document.getElementById('carPain2');
  const carPain3Input = document.getElementById('carPain3');
  const carSolTitleInput = document.getElementById('carSolTitle');
  const carSolSubInput = document.getElementById('carSolSub');
  const carCtaTitleInput = document.getElementById('carCtaTitle');
  const carCtaSubInput = document.getElementById('carCtaSub');
  
  const carAccentColorPicker = document.getElementById('carAccentColor');
  const carBgStyleSelect = document.getElementById('carBgStyleSelect');
  
  // Action Buttons
  const previewPlayBtn = document.getElementById('previewPlayBtn');
  const renderBtn = document.getElementById('renderBtn');
  const renderOverlay = document.getElementById('renderOverlay');
  const progressBar = document.getElementById('progressBar');
  const progressPercent = document.getElementById('progressPercent');
  
  const carPrevBtn = document.getElementById('carPrevBtn');
  const carNextBtn = document.getElementById('carNextBtn');
  const carRenderBtn = document.getElementById('carRenderBtn');
  const carSuccessOverlay = document.getElementById('carSuccessOverlay');
  const closeCarSuccessBtn = document.getElementById('closeCarSuccessBtn');
  
  const blueprintCards = document.querySelectorAll('.blueprint-card');

  // Custom Cursor
  const customCursor = document.getElementById('customCursor');
  const cursorDot = customCursor.querySelector('.cursor-dot');
  const cursorRing = customCursor.querySelector('.cursor-ring');

  // Global Animation State
  let isPlaying = false;
  let isRecording = false;
  let animationTime = 0;
  let lastFrameTimestamp = 0;
  let animationFrameId = null;
  const videoDuration = 10;
  
  // Custom Cursor Tracker
  document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    cursorRing.animate({
      left: `${e.clientX}px`,
      top: `${e.clientY}px`
    }, { duration: 150, fill: 'forwards' });
  });

  const attachCursorHover = () => {
    document.querySelectorAll('a, button, select, input, textarea, .blueprint-card').forEach(elem => {
      elem.addEventListener('mouseenter', () => customCursor.classList.add('hovering'));
      elem.addEventListener('mouseleave', () => customCursor.classList.remove('hovering'));
    });
  };
  attachCursorHover();

  // Tab switching mechanism
  const switchTab = (tab) => {
    if (activeTab === tab) return;
    
    // Pause any active preview playing
    pausePreview();
    
    activeTab = tab;
    
    if (tab === 'reel') {
      tabBtnReel.classList.add('active');
      tabBtnCarousel.classList.remove('active');
      
      reelControlsContainer.classList.add('active');
      carouselControlsContainer.classList.remove('active');
      reelsCatalog.classList.add('active');
      carouselsCatalog.classList.remove('active');
      instructReel.style.display = 'flex';
      instructCarousel.style.display = 'none';
      
      // Set aspect ratio frame rules
      previewHeader.textContent = "Real-Time 9:16 Video Canvas";
      viewportFrame.classList.remove('carousel-mode');
      phoneNotch.style.display = 'block';
      timeIndicator.style.display = 'block';
      pageIndicator.style.display = 'none';
      playOverlay.style.display = 'flex';
      
      reelToolbar.style.display = 'flex';
      carouselToolbar.style.display = 'none';
      
      // Adjust HD canvas resolution
      canvas.width = 1080;
      canvas.height = 1920;
      animationTime = 0;
    } 
    else {
      tabBtnReel.classList.remove('active');
      tabBtnCarousel.classList.add('active');
      
      reelControlsContainer.classList.remove('active');
      carouselControlsContainer.classList.add('active');
      reelsCatalog.classList.remove('active');
      carouselsCatalog.classList.add('active');
      instructReel.style.display = 'none';
      instructCarousel.style.display = 'flex';
      
      // Set aspect ratio frame rules (4:5 Standard Carousel post)
      previewHeader.textContent = "Real-Time 4:5 Post Card Canvas";
      viewportFrame.classList.add('carousel-mode');
      phoneNotch.style.display = 'none';
      timeIndicator.style.display = 'none';
      pageIndicator.style.display = 'block';
      playOverlay.style.display = 'none';
      
      reelToolbar.style.display = 'none';
      carouselToolbar.style.display = 'flex';
      
      // Adjust HD canvas resolution
      canvas.width = 1080;
      canvas.height = 1350;
      carouselSlideIndex = 0;
      updatePageIndicator();
    }
    
    attachCursorHover();
    drawCanvas();
  };

  tabBtnReel.addEventListener('click', () => switchTab('reel'));
  tabBtnCarousel.addEventListener('click', () => switchTab('carousel'));

  // ==========================================================================
  // 3. Web Audio Soundtrack Synthesizer (Reels only)
  // ==========================================================================
  let audioCtx = null;
  let audioDest = null;
  let scheduledAudioNodes = [];
  let masterGain = null;

  const initAudio = () => {
    if (audioCtx) return;
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    audioDest = audioCtx.createMediaStreamDestination();
    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    masterGain.connect(audioCtx.destination);
  };

  const playKick = (time, outputs) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    outputs.forEach(out => gain.connect(out));
    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.18);
    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
    osc.start(time);
    osc.stop(time + 0.2);
    scheduledAudioNodes.push(osc);
  };

  const playHat = (time, outputs) => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(8000, time);
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);
    osc.connect(filter);
    filter.connect(gain);
    outputs.forEach(out => gain.connect(out));
    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
    osc.start(time);
    osc.stop(time + 0.1);
    scheduledAudioNodes.push(osc);
  };

  const playChord = (notes, time, duration, outputs) => {
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(250, time);
    filter.frequency.exponentialRampToValueAtTime(450, time + duration * 0.4);
    filter.frequency.exponentialRampToValueAtTime(250, time + duration);
    filter.Q.setValueAtTime(0.5, time);
    
    const gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.001, time);
    gainNode.gain.linearRampToValueAtTime(0.12, time + 0.6);
    gainNode.gain.setValueAtTime(0.12, time + duration - 0.5);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + duration);
    
    filter.connect(gainNode);
    outputs.forEach(out => gainNode.connect(out));
    
    notes.forEach(freq => {
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(freq, time);
      osc2.frequency.setValueAtTime(freq * 1.006, time);
      osc1.connect(filter);
      osc2.connect(filter);
      osc1.start(time);
      osc2.start(time);
      osc1.stop(time + duration);
      osc2.stop(time + duration);
      scheduledAudioNodes.push(osc1, osc2);
    });
  };

  const scheduleSoundtrack = (startTime) => {
    clearScheduledNodes();
    if (musicSelect.value === 'off') return;
    const outputs = [masterGain, audioDest];
    const tempo = 120;
    const beatDuration = 60 / tempo;
    
    for (let i = 0; i < 20; i++) {
      const beatTime = startTime + i * beatDuration;
      if (i % 2 === 0) playKick(beatTime, outputs);
      if (i % 2 === 1) playHat(beatTime, outputs);
    }
    
    playChord([110.00, 130.81, 164.81, 196.00], startTime, 3.0, outputs);
    playChord([82.41, 98.00, 123.47, 146.83], startTime + 3.0, 3.0, outputs);
    playChord([87.31, 110.00, 130.81, 164.81], startTime + 6.0, 4.0, outputs);
  };

  const clearScheduledNodes = () => {
    scheduledAudioNodes.forEach(node => {
      try {
        node.stop();
      } catch(e) {}
    });
    scheduledAudioNodes = [];
  };

  // ==========================================================================
  // 4. Render Engine Functions
  // ==========================================================================
  const particles = [];
  const initParticles = () => {
    particles.length = 0;
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * 1080,
        y: Math.random() * 1920,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 1.5,
        speedY: -(Math.random() * 2 + 1),
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  };
  initParticles();

  let glows = [
    { x: 300, y: 300, vx: 0.8, vy: 0.5, r: 400, color: 'rgba(134, 134, 134, 0.08)' },
    { x: 700, y: 1000, vx: -0.6, vy: -0.8, r: 500, color: 'rgba(197, 168, 128, 0.06)' }
  ];

  let rotAngle = 0;

  const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
  
  const wrapText = (text, x, y, maxWidth, lineHeight) => {
    const words = text.split(' ');
    let line = '';
    const lines = [];
    
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      let metrics = ctx.measureText(testLine);
      let testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line);
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line);
    lines.forEach((l, idx) => {
      ctx.fillText(l.trim(), x, y + (idx * lineHeight));
    });
    return lines.length;
  };

  // Main global drawing dispatcher
  const drawCanvas = () => {
    if (activeTab === 'reel') {
      drawReelCanvas();
    } else {
      drawCarouselCanvas(carouselSlideIndex);
    }
  };

  // REEL RENDER PIPELINE
  const drawReelCanvas = () => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const accentColor = accentColorPicker.value;
    const bgStyle = bgStyleSelect.value;
    const speedMultiplier = particleSpeedSelect.value === 'slow' ? 0.4 : (particleSpeedSelect.value === 'fast' ? 2.2 : 1.0);
    
    if (bgStyle === 'glow') {
      glows.forEach(g => {
        if (isPlaying) {
          g.x += g.vx * speedMultiplier;
          g.y += g.vy * speedMultiplier;
          if (g.x < 0 || g.x > canvas.width) g.vx *= -1;
          if (g.y < 0 || g.y > canvas.height) g.vy *= -1;
        }
        const gradient = ctx.createRadialGradient(g.x, g.y, 10, g.x, g.y, g.r);
        gradient.addColorStop(0, g.color);
        gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.02)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
    } 
    else if (bgStyle === 'grid') {
      ctx.strokeStyle = 'rgba(134, 134, 134, 0.08)';
      ctx.lineWidth = 2;
      const gridSize = 80;
      const gridOffset = isPlaying ? (animationTime * 40 * speedMultiplier) % gridSize : 0;
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + gridOffset);
        ctx.lineTo(canvas.width, y + gridOffset);
        ctx.stroke();
      }
      
      particles.forEach(p => {
        if (isPlaying) {
          p.y += p.speedY * speedMultiplier;
          p.x += p.speedX * speedMultiplier;
          if (p.y < 0) {
            p.y = canvas.height;
            p.x = Math.random() * canvas.width;
          }
          if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(239, 239, 239, ${p.alpha})`;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
    }
    else if (bgStyle === 'aberration') {
      if (isPlaying) rotAngle += 0.005 * speedMultiplier;
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotAngle);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.15)';
      ctx.beginPath();
      ctx.arc(-5, -5, 300, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
      ctx.beginPath();
      ctx.arc(5, 5, 300, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(239, 239, 239, 0.1)';
      ctx.beginPath();
      ctx.arc(0, 0, 300, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // No branding overlay on video (silent clean visual backdrop)

    if (animationTime >= 0 && animationTime < 3.0) {
      drawSlide1(animationTime / 3.0, accentColor);
    }
    else if (animationTime >= 3.0 && animationTime < 6.0) {
      drawSlide2((animationTime - 3.0) / 3.0, accentColor);
    }
    else if (animationTime >= 6.0 && animationTime <= 10.0) {
      drawSlide3((animationTime - 6.0) / 4.0, accentColor);
    }

    const overallProgress = animationTime / videoDuration;
    ctx.fillStyle = 'rgba(134, 134, 134, 0.2)';
    ctx.fillRect(40, canvas.height - 80, canvas.width - 80, 8);
    ctx.fillStyle = accentColor;
    ctx.fillRect(40, canvas.height - 80, (canvas.width - 80) * overallProgress, 8);
  };

  const drawSlide1 = (progress, accent) => {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const entrance = easeOutCubic(Math.min(progress * 2.0, 1.0));
    const exit = progress > 0.85 ? easeOutCubic((1.0 - progress) / 0.15) : 1.0;
    ctx.globalAlpha = entrance * exit;
    const scale = 0.95 + (0.08 * progress);
    ctx.translate(canvas.width / 2, canvas.height / 2 - 50);
    ctx.scale(scale, scale);
    ctx.font = '900 68px Montserrat';
    ctx.fillStyle = '#ffffff';
    wrapText(slide1Text1Input.value, 0, 0, 900, 90);
    ctx.font = '700 48px Montserrat';
    ctx.fillStyle = accent;
    ctx.fillText(slide1Text2Input.value, 0, 200);
    ctx.restore();
  };

  const drawSlide2 = (progress, accent) => {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const entrance = easeOutCubic(Math.min(progress * 2.0, 1.0));
    const exit = progress > 0.85 ? easeOutCubic((1.0 - progress) / 0.15) : 1.0;
    ctx.globalAlpha = entrance * exit;
    const yOffset = (1.0 - entrance) * 150;
    ctx.translate(canvas.width / 2, canvas.height / 2 - 50 + yOffset);
    ctx.fillStyle = 'rgba(12, 12, 12, 0.7)';
    ctx.strokeStyle = 'rgba(134, 134, 134, 0.15)';
    ctx.lineWidth = 3;
    const r = 24;
    const w = 920;
    const h = 500;
    const x = -w / 2;
    const y = -h / 2;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.strokeStyle = accent;
    ctx.arc(0, -150, 48, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = accent;
    ctx.font = '300 48px Montserrat';
    ctx.fillText('✓', 0, -152);
    ctx.font = '700 52px Montserrat';
    ctx.fillStyle = '#ffffff';
    wrapText(slide2Text1Input.value, 0, -20, 840, 70);
    ctx.font = '500 36px Montserrat';
    ctx.fillStyle = '#a0a0a0';
    wrapText(slide2Text2Input.value, 0, 120, 840, 50);
    ctx.restore();
  };

  const drawSlide3 = (progress, accent) => {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const entrance = easeOutCubic(Math.min(progress * 2.0, 1.0));
    ctx.globalAlpha = entrance;
    ctx.translate(canvas.width / 2, canvas.height / 2 - 30);
    const bounce = Math.sin(progress * Math.PI * 4) * 10;
    ctx.translate(0, bounce);
    const glowGradient = ctx.createRadialGradient(0, 100, 10, 0, 100, 250);
    glowGradient.addColorStop(0, 'rgba(197, 168, 128, 0.15)');
    glowGradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(0, 100, 250, 0, Math.PI * 2);
    ctx.fill();
    ctx.font = '900 68px Montserrat';
    ctx.fillStyle = '#ffffff';
    wrapText(slide3Text1Input.value, 0, -150, 920, 85);
    
    const btnW = 720;
    const btnH = 110;
    const btnX = -btnW / 2;
    const btnY = 30;
    ctx.fillStyle = 'rgba(134, 134, 134, 0.4)';
    ctx.beginPath();
    ctx.roundRect(btnX, btnY + 8, btnW, btnH, 12);
    ctx.fill();
    ctx.fillStyle = '#efefef';
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, 12);
    ctx.fill();
    ctx.font = 'bold 36px Montserrat';
    ctx.fillStyle = '#000000';
    ctx.fillText('BOOK DISCOVERY CALL', 0, btnY + btnH / 2);
    ctx.font = '700 32px Montserrat';
    ctx.fillStyle = '#a0a0a0';
    ctx.fillText(slide3Text2Input.value, 0, 210);
    ctx.restore();
  };

  // ==========================================================================
  // CAROUSEL RENDER ENGINE (4:5 Portrait Card Layout, 1080x1350)
  // ==========================================================================
  const drawCarouselCanvas = (slideIdx) => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    const accent = carAccentColorPicker.value;
    const bgStyle = carBgStyleSelect.value;
    
    // Draw Backdrop glows
    if (bgStyle === 'glow') {
      const gradient = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 10, canvas.width / 2, canvas.height / 2, 700);
      gradient.addColorStop(0, 'rgba(197, 168, 128, 0.08)');
      gradient.addColorStop(0.6, 'rgba(134, 134, 134, 0.03)');
      gradient.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    } 
    else if (bgStyle === 'grid') {
      ctx.strokeStyle = 'rgba(134, 134, 134, 0.06)';
      ctx.lineWidth = 2;
      const gridSize = 90;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    }

    // 1. Draw elegant golden/accent borders (Luxury Card Framing)
    ctx.strokeStyle = accent;
    ctx.lineWidth = 8;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // 2. Branding Header
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 28px Montserrat';
    ctx.fillStyle = '#efefef';
    ctx.letterSpacing = '0.25em';
    ctx.fillText('JORDANWORLD.CO', canvas.width / 2, 90);
    ctx.restore();

    // 3. Render specific slide contents
    if (slideIdx === 0) {
      drawCarCover(accent);
    } 
    else if (slideIdx === 1) {
      drawCarPain(accent);
    } 
    else if (slideIdx === 2) {
      drawCarSolution(accent);
    } 
    else if (slideIdx === 3) {
      drawCarCta(accent);
    }

    // 4. Swipe Page indicator dots at the bottom
    ctx.save();
    const dotSpacing = 30;
    const startX = (canvas.width - (dotSpacing * 3)) / 2;
    const dotY = canvas.height - 90;
    
    for (let d = 0; d < 4; d++) {
      ctx.beginPath();
      ctx.arc(startX + d * dotSpacing, dotY, d === slideIdx ? 8 : 4, 0, Math.PI * 2);
      ctx.fillStyle = d === slideIdx ? accent : 'rgba(134, 134, 134, 0.4)';
      ctx.fill();
    }
    ctx.restore();
  };

  const drawCarCover = (accent) => {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Glowing Backlight circle
    const glow = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 20, canvas.width/2, canvas.height/2, 350);
    glow.addColorStop(0, 'rgba(197, 168, 128, 0.08)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Giant Premium Title Hook
    ctx.font = '900 64px Montserrat';
    ctx.fillStyle = '#ffffff';
    wrapText(carCoverTitleInput.value, canvas.width / 2, canvas.height / 2 - 120, 920, 90);
    
    // Subtitle
    ctx.font = '500 32px Montserrat';
    ctx.fillStyle = '#a0a0a0';
    wrapText(carCoverSubInput.value, canvas.width / 2, canvas.height / 2 + 100, 880, 50);

    // Swipe indicator box
    const pillW = 260;
    const pillH = 64;
    const pillX = (canvas.width - pillW) / 2;
    const pillY = canvas.height - 230;
    ctx.fillStyle = 'rgba(12, 12, 12, 0.7)';
    ctx.strokeStyle = accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(pillX, pillY, pillW, pillH, 30);
    ctx.fill();
    ctx.stroke();
    
    ctx.font = 'bold 20px Montserrat';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('SWIPE LEFT ➔', canvas.width / 2, pillY + pillH / 2);

    ctx.restore();
  };

  const drawCarPain = (accent) => {
    ctx.save();
    
    // Heading
    ctx.textAlign = 'center';
    ctx.font = '800 48px Montserrat';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('THE OPERATIONAL LEAKS', canvas.width / 2, 220);
    
    // Bullet Pain Points list
    const startY = 380;
    const spacingY = 200;
    const textX = 240;
    
    const pains = [carPain1Input.value, carPain2Input.value, carPain3Input.value];
    
    pains.forEach((p, index) => {
      const y = startY + index * spacingY;
      
      // Draw glowing bullet counter circle (e.g. "01")
      ctx.beginPath();
      ctx.strokeStyle = accent;
      ctx.lineWidth = 3;
      ctx.fillStyle = 'rgba(12,12,12,0.8)';
      ctx.arc(140, y + 20, 40, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '900 28px Montserrat';
      ctx.fillStyle = '#ffffff';
      ctx.fillText(`0${index + 1}`, 140, y + 20);
      
      // Pain Text Details
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.font = '700 36px Montserrat';
      ctx.fillStyle = '#efefef';
      wrapText(p, textX, y - 10, 720, 50);
    });
    
    ctx.restore();
  };

  const drawCarSolution = (accent) => {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Double lines border solutions box
    ctx.strokeStyle = 'rgba(134, 134, 134, 0.12)';
    ctx.lineWidth = 4;
    ctx.strokeRect(90, 200, canvas.width - 180, canvas.height - 420);
    
    ctx.strokeStyle = accent;
    ctx.lineWidth = 1;
    ctx.strokeRect(100, 210, canvas.width - 200, canvas.height - 440);

    // Giant Title
    ctx.font = '900 52px Montserrat';
    ctx.fillStyle = '#ffffff';
    wrapText(carSolTitleInput.value, canvas.width / 2, canvas.height / 2 - 120, 800, 75);
    
    // Icon badge
    ctx.beginPath();
    ctx.strokeStyle = accent;
    ctx.lineWidth = 3;
    ctx.arc(canvas.width / 2, canvas.height / 2 + 30, 48, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.font = '300 48px Montserrat';
    ctx.fillStyle = accent;
    ctx.fillText('✓', canvas.width / 2, canvas.height / 2 + 28);
    
    // Description text block
    ctx.font = '500 32px Montserrat';
    ctx.fillStyle = '#a0a0a0';
    wrapText(carSolSubInput.value, canvas.width / 2, canvas.height / 2 + 180, 760, 50);

    ctx.restore();
  };

  const drawCarCta = (accent) => {
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Glowing backing glows
    const glow = ctx.createRadialGradient(canvas.width/2, canvas.height/2 + 50, 10, canvas.width/2, canvas.height/2 + 50, 300);
    glow.addColorStop(0, 'rgba(197, 168, 128, 0.12)');
    glow.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Call to action hook headline
    ctx.font = '900 56px Montserrat';
    ctx.fillStyle = '#ffffff';
    wrapText(carCtaTitleInput.value, canvas.width / 2, canvas.height / 2 - 140, 880, 80);
    
    // Giant 3D CTA Button
    const btnW = 680;
    const btnH = 110;
    const btnX = (canvas.width - btnW) / 2;
    const btnY = canvas.height / 2 + 50;
    
    // Shadow depth
    ctx.fillStyle = 'rgba(134,134,134,0.3)';
    ctx.beginPath();
    ctx.roundRect(btnX, btnY + 8, btnW, btnH, 12);
    ctx.fill();
    
    // Face
    ctx.fillStyle = '#efefef';
    ctx.beginPath();
    ctx.roundRect(btnX, btnY, btnW, btnH, 12);
    ctx.fill();
    
    ctx.font = 'bold 32px Montserrat';
    ctx.fillStyle = '#000000';
    ctx.fillText('BOOK AUDIT CALL', canvas.width / 2, btnY + btnH / 2);
    
    // Tagline details
    ctx.font = '700 28px Montserrat';
    ctx.fillStyle = '#868686';
    ctx.fillText(carCtaSubInput.value, canvas.width / 2, btnY + 200);

    ctx.restore();
  };

  // ==========================================================================
  // 5. Playback & Sequencing Logic (Reels / Video)
  // ==========================================================================
  const startPreview = () => {
    if (isPlaying) return;
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    isPlaying = true;
    playOverlay.style.display = 'none';
    
    document.querySelector('.btn-icon-play').style.display = 'none';
    document.querySelector('.btn-icon-pause').style.display = 'inline';
    
    lastFrameTimestamp = performance.now();
    scheduleSoundtrack(audioCtx.currentTime);

    const runLoop = (now) => {
      const delta = (now - lastFrameTimestamp) / 1000;
      lastFrameTimestamp = now;
      
      animationTime += delta;
      if (animationTime >= videoDuration) {
        if (isRecording) {
          animationTime = videoDuration;
          drawCanvas();
          stopRecording();
          return;
        } else {
          animationTime = 0;
          scheduleSoundtrack(audioCtx.currentTime);
        }
      }
      
      timeIndicator.textContent = `${animationTime.toFixed(1)}s / ${videoDuration.toFixed(1)}s`;
      drawCanvas();
      animationFrameId = requestAnimationFrame(runLoop);
    };
    
    animationFrameId = requestAnimationFrame(runLoop);
  };

  const pausePreview = () => {
    if (!isPlaying) return;
    isPlaying = false;
    cancelAnimationFrame(animationFrameId);
    clearScheduledNodes();
    document.querySelector('.btn-icon-play').style.display = 'inline';
    document.querySelector('.btn-icon-pause').style.display = 'none';
    playOverlay.style.display = 'flex';
  };

  // Two-way databinding triggers redraw
  const bindRedrawInput = (elem) => {
    elem.addEventListener('input', () => drawCanvas());
  };
  [
    slide1Text1Input, slide1Text2Input, slide2Text1Input, slide2Text2Input, slide3Text1Input, slide3Text2Input,
    carCoverTitleInput, carCoverSubInput, carPain1Input, carPain2Input, carPain3Input, carSolTitleInput, carSolSubInput, carCtaTitleInput, carCtaSubInput
  ].forEach(input => bindRedrawInput(input));

  bgStyleSelect.addEventListener('change', () => drawCanvas());
  particleSpeedSelect.addEventListener('change', () => drawCanvas());
  musicSelect.addEventListener('change', () => {
    if (isPlaying) {
      pausePreview();
      startPreview();
    }
  });

  accentColorPicker.addEventListener('input', (e) => {
    document.querySelector('.color-hex').textContent = e.target.value.toUpperCase();
    drawCanvas();
  });

  carBgStyleSelect.addEventListener('change', () => drawCanvas());
  carAccentColorPicker.addEventListener('input', (e) => {
    document.querySelector('.car-color-hex').textContent = e.target.value.toUpperCase();
    drawCanvas();
  });

  // Preset Blueprint Loaders
  const loadPreset = (presetName) => {
    const data = presets[presetName];
    if (!data) return;
    slide1Text1Input.value = data.slide1Text1;
    slide1Text2Input.value = data.slide1Text2;
    slide2Text1Input.value = data.slide2Text1;
    slide2Text2Input.value = data.slide2Text2;
    slide3Text1Input.value = data.slide3Text1;
    slide3Text2Input.value = data.slide3Text2;
    
    animationTime = 0;
    drawCanvas();
    if (isPlaying) {
      pausePreview();
      startPreview();
    }
  };

  const loadCarouselPreset = (presetName) => {
    const data = carouselPresets[presetName];
    if (!data) return;
    carCoverTitleInput.value = data.carCoverTitle;
    carCoverSubInput.value = data.carCoverSub;
    carPain1Input.value = data.carPain1;
    carPain2Input.value = data.carPain2;
    carPain3Input.value = data.carPain3;
    carSolTitleInput.value = data.carSolTitle;
    carSolSubInput.value = data.carSolSub;
    carCtaTitleInput.value = data.carCtaTitle;
    carCtaSubInput.value = data.carCtaSub;
    
    carouselSlideIndex = 0;
    updatePageIndicator();
    drawCanvas();
  };

  // Card Selector hooks
  blueprintCards.forEach(card => {
    card.addEventListener('click', () => {
      const catalogId = card.parentElement.id;
      const blueprintList = document.querySelectorAll(`#${catalogId} .blueprint-card`);
      blueprintList.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      const presetName = card.getAttribute('data-preset');
      if (activeTab === 'reel') {
        templateSelect.value = presetName;
        loadPreset(presetName);
      } else {
        carouselTemplateSelect.value = presetName;
        loadCarouselPreset(presetName);
      }
    });
  });

  templateSelect.addEventListener('change', (e) => {
    const name = e.target.value;
    document.querySelectorAll('#reelsCatalog .blueprint-card').forEach(c => {
      if (c.getAttribute('data-preset') === name) c.classList.add('active');
      else c.classList.remove('active');
    });
    loadPreset(name);
  });

  carouselTemplateSelect.addEventListener('change', (e) => {
    const name = e.target.value;
    document.querySelectorAll('#carouselsCatalog .blueprint-card').forEach(c => {
      if (c.getAttribute('data-preset') === name) c.classList.add('active');
      else c.classList.remove('active');
    });
    loadCarouselPreset(name);
  });

  // Play controls hooks
  previewPlayBtn.addEventListener('click', () => {
    if (isPlaying) pausePreview();
    else startPreview();
  });
  playBtnLarge.addEventListener('click', startPreview);

  // ==========================================================================
  // CAROUSEL SWIPER NAVIGATION & PAGE LABELS
  // ==========================================================================
  const updatePageIndicator = () => {
    pageIndicator.textContent = `Slide ${carouselSlideIndex + 1} / 4`;
  };

  carPrevBtn.addEventListener('click', () => {
    if (carouselSlideIndex > 0) {
      carouselSlideIndex--;
      updatePageIndicator();
      drawCanvas();
    }
  });

  carNextBtn.addEventListener('click', () => {
    if (carouselSlideIndex < 3) {
      carouselSlideIndex++;
      updatePageIndicator();
      drawCanvas();
    }
  });

  // ==========================================================================
  // 6. Reels Video Recording Manager
  // ==========================================================================
  let mediaRecorder = null;
  let recordedChunks = [];
  let recordTimerId = null;

  const startRecordingReel = () => {
    if (isRecording) return;
    initAudio();
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    
    pausePreview();
    animationTime = 0;
    recordedChunks = [];
    isRecording = true;
    
    renderOverlay.style.display = 'flex';
    progressBar.style.width = '0%';
    progressPercent.textContent = '0%';
    
    const canvasStream = canvas.captureStream(30);
    scheduleSoundtrack(audioCtx.currentTime);
    
    let outputStream = canvasStream;
    const synthAudioTrack = audioDest.stream.getAudioTracks()[0];
    
    if (synthAudioTrack && musicSelect.value !== 'off') {
      outputStream = new MediaStream([
        canvasStream.getVideoTracks()[0],
        synthAudioTrack
      ]);
    }
    
    let options = { mimeType: 'video/webm;codecs=vp9,opus' };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      options = { mimeType: 'video/webm;codecs=vp8,opus' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/webm' };
      }
    }
    
    try {
      mediaRecorder = new MediaRecorder(outputStream, options);
    } catch (e) {
      mediaRecorder = new MediaRecorder(outputStream);
    }
    
    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) recordedChunks.push(event.data);
    };
    
    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const slug = templateSelect.value;
      a.download = `Jordan_IG_Reel_${slug}_${new Date().toISOString().slice(0,10)}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      isRecording = false;
      renderOverlay.style.display = 'none';
      animationTime = 0;
      drawCanvas();
      playOverlay.style.display = 'flex';
    };

    mediaRecorder.start();
    isPlaying = true;
    lastFrameTimestamp = performance.now();
    
    const recordLoop = (now) => {
      const delta = (now - lastFrameTimestamp) / 1000;
      lastFrameTimestamp = now;
      animationTime += delta;
      
      const percent = Math.min((animationTime / videoDuration) * 100, 100);
      progressBar.style.width = `${percent}%`;
      progressPercent.textContent = `${Math.floor(percent)}%`;
      
      if (animationTime >= videoDuration) {
        animationTime = videoDuration;
        drawCanvas();
        stopRecording();
        return;
      }
      
      drawCanvas();
      recordTimerId = requestAnimationFrame(recordLoop);
    };
    
    recordTimerId = requestAnimationFrame(recordLoop);
  };

  const stopRecording = () => {
    if (!isRecording) return;
    cancelAnimationFrame(recordTimerId);
    isPlaying = false;
    clearScheduledNodes();
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
  };

  renderBtn.addEventListener('click', startRecordingReel);

  // ==========================================================================
  // 7. Carousel High-Res PNG Download Manager
  // ==========================================================================
  const exportCarouselPost = () => {
    // Show success dialog
    carSuccessOverlay.style.display = 'flex';
    
    const slug = carouselTemplateSelect.value;
    
    // Loop through each of the 4 slides and trigger sequential downloads with slight delays
    for (let index = 0; index < 4; index++) {
      setTimeout(() => {
        // Redraw canvas to target index frame
        drawCarouselCanvas(index);
        
        // Grab High-res PNG data string
        const dataUrl = canvas.toDataURL('image/png');
        
        // Trigger automated browser download click
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `Jordan_IG_Carousel_${slug}_Slide${index + 1}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Return view to initial preview slide when loops terminate
        if (index === 3) {
          drawCarouselCanvas(carouselSlideIndex);
        }
      }, index * 250); // 250ms spacing is the sweet spot to bypass Chrome's block on multiple concurrent downloads
    }
  };

  carRenderBtn.addEventListener('click', exportCarouselPost);
  closeCarSuccessBtn.addEventListener('click', () => {
    carSuccessOverlay.style.display = 'none';
  });

  // Initial draw setup
  drawCanvas();
});
