/* ============ MENU HAMBURGER ============ */
(function () {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();

/* ============ HEADER SHADOW AU SCROLL ============ */
(function () {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
})();

/* ============ ANIMATIONS AU SCROLL ============ */
(function () {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function (el) { observer.observe(el); });
  } else {
    elements.forEach(function (el) { el.classList.add('revealed'); });
  }
})();

/* ============ ANNÉE DYNAMIQUE FOOTER ============ */
(function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();

/* ============ FORMULAIRE CONTACT ============ */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const feedback = document.getElementById('formFeedback');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nom = form.nom.value.trim();
    const email = form.email.value.trim();
    const sujet = form.sujet.value;
    const message = form.message.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nom || !email || !sujet || !message) {
      showFeedback('Veuillez remplir tous les champs obligatoires (*).', 'err');
      return;
    }
    if (!emailRegex.test(email)) {
      showFeedback('Veuillez saisir une adresse email valide.', 'err');
      return;
    }

    showFeedback('Merci ' + nom + ' ! Votre message a bien été envoyé. Nous vous répondrons rapidement.', 'ok');
    form.reset();

    setTimeout(function () { feedback.textContent = ''; feedback.className = 'form-feedback'; }, 8000);
  });

  function showFeedback(text, type) {
    if (!feedback) return;
    feedback.textContent = text;
    feedback.className = 'form-feedback ' + type;
  }
})();