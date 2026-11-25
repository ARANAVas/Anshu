(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduceMotion = motionQuery.matches;
  const saveData = Boolean(navigator.connection && navigator.connection.saveData);

  const header = $('#siteHeader');
  const menuButton = $('#menuBtn');
  const navLinks = $('#navLinks');
  const navAnchors = navLinks ? $$('a[href^="#"]', navLinks) : [];
  const progress = $('#progress');

  /* Header, navigation and scroll progress */
  const closeMenu = () => {
    if (!menuButton || !navLinks) return;
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    menuButton.textContent = 'Menu';
  };

  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
      navLinks.classList.toggle('open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      menuButton.textContent = isOpen ? 'Close' : 'Menu';
    });
    navAnchors.forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', event => {
      if (!navLinks.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
    const desktopQuery = window.matchMedia('(min-width: 841px)');
    const handleDesktopChange = event => {
      if (event.matches) closeMenu();
    };
    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', handleDesktopChange);
    } else if (typeof desktopQuery.addListener === 'function') {
      /* Compatibility fallback for older iOS Safari versions. */
      desktopQuery.addListener(handleDesktopChange);
    }
  }

  let rafPending = false;
  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) {
      const ratio = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
      progress.style.width = `${ratio * 100}%`;
    }
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 18);
    rafPending = false;
  };
  const requestScrollUI = () => {
    if (rafPending) return;
    rafPending = true;
    window.requestAnimationFrame(updateScrollUI);
  };
  window.addEventListener('scroll', requestScrollUI, { passive: true });
  window.addEventListener('resize', requestScrollUI, { passive: true });
  updateScrollUI();

  /* Scroll reveals: if observers are unavailable, all content remains visible. */
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const revealItems = $$('.reveal');
    if (revealItems.length) {
      document.documentElement.classList.add('motion-ready');
      const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' });
      revealItems.forEach(item => revealObserver.observe(item));
    }
  }

  /* Active section state for desktop and mobile navigation. */
  if ('IntersectionObserver' in window && navAnchors.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navAnchors.forEach(link => link.removeAttribute('aria-current'));
        const active = navAnchors.find(link => link.getAttribute('href') === `#${entry.target.id}`);
        if (active) active.setAttribute('aria-current', 'location');
      });
    }, { rootMargin: '-32% 0px -58% 0px', threshold: 0 });
    $$('main > section[id]').forEach(section => sectionObserver.observe(section));
  }

  /* Cinematic videos: defer, pause off-screen, honour Data Saver and reduced motion. */
  const videosAllowed = !reduceMotion && !saveData;
  const videoElements = $$('.hero-video, .about-video');
  const playSafely = video => {
    if (!video || document.hidden || !videosAllowed) return;
    video.muted = true;
    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
  };
  videoElements.forEach(video => {
    video.addEventListener('playing', () => video.parentElement?.classList.add('video-is-playing'));
    video.addEventListener('pause', () => {
      /* Keep the video frame in place once playback has started; its poster remains the fallback. */
    });
    video.addEventListener('error', () => video.parentElement?.classList.remove('video-is-playing'));
  });
  const observeVideo = (video, rootMargin) => {
    if (!video) return;
    if (!('IntersectionObserver' in window)) {
      video.load();
      playSafely(video);
      return;
    }
    let loaded = false;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!loaded) {
            video.load();
            loaded = true;
          }
          playSafely(video);
        } else {
          video.pause();
        }
      });
    }, { rootMargin, threshold: 0.04 });
    observer.observe(video);
  };
  if (videosAllowed) {
    observeVideo($('.hero-video'), '80px 0px');
    observeVideo($('.about-video'), '260px 0px');
  } else {
    videoElements.forEach(video => video.pause());
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      videoElements.forEach(video => video.pause());
      return;
    }
    if (!videosAllowed) return;
    videoElements.forEach(video => {
      const bounds = video.getBoundingClientRect();
      if (bounds.bottom > -120 && bounds.top < window.innerHeight + 120) playSafely(video);
    });
  });

  /* Visitor message handoff. The static portfolio does not claim to store or send data. */
  const messageForm = $('#messageForm');
  if (messageForm) {
    const status = $('#formStatus');
    const bodyField = $('#messageBody');
    const counter = $('#messageCount');
    const requiredFields = $$('input[required], textarea[required]', messageForm);

    const updateCounter = () => {
      if (counter && bodyField) counter.textContent = `${bodyField.value.length} / ${bodyField.maxLength}`;
    };
    bodyField?.addEventListener('input', updateCounter);
    updateCounter();

    requiredFields.forEach(field => {
      field.addEventListener('input', () => {
        if (field.checkValidity()) field.removeAttribute('aria-invalid');
      });
      field.addEventListener('blur', () => {
        if (!field.checkValidity()) field.setAttribute('aria-invalid', 'true');
      });
    });

    messageForm.addEventListener('submit', event => {
      event.preventDefault();
      const invalidField = requiredFields.find(field => !field.checkValidity());
      if (invalidField) {
        invalidField.setAttribute('aria-invalid', 'true');
        invalidField.focus();
        invalidField.reportValidity();
        if (status) status.textContent = 'Please check the highlighted fields and enter a valid email address.';
        return;
      }

      const formData = new FormData(messageForm);
      const senderName = String(formData.get('name') || '').trim();
      const senderEmail = String(formData.get('email') || '').trim();
      const subject = String(formData.get('subject') || '').trim();
      const message = String(formData.get('message') || '').trim();
      const emailBody = `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${message}`;
      const mailto = `mailto:ak99552534@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      if (status) status.textContent = 'Your email app is opening with your message prepared. Review the draft and press Send to complete your enquiry.';

      const mailLink = document.createElement('a');
      mailLink.href = mailto;
      mailLink.hidden = true;
      mailLink.setAttribute('aria-hidden', 'true');
      document.body.appendChild(mailLink);
      mailLink.click();
      mailLink.remove();
    });
  }
})();
