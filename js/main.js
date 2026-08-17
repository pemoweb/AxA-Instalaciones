/**
 * INSTALACIONES AXA - TARRAGONA
 * Master Vanilla JavaScript Controller (ES6+)
 * 
 * Features:
 * - Dynamic Header Scroll & Scroll Progress Indicator
 * - Mobile Navigation Menu & Overlay
 * - Smooth Anchor Scrolling with Offset
 * - Specialty Modal Opening & Auto-selection
 * - Portfolio Filtering & Interactive Lightbox Modal
 * - Real-time Form Validation (Contact Form & Quote Modal)
 * - Accessible Modal Dialogs (Focus Trapping, Escape Dismissal)
 * - Direct WhatsApp & Phone Action Integration
 */

(function () {
  'use strict';

  // --- 01. CONFIGURATION & STATE ---
  const CONFIG = {
    whatsappNumber: '+584120845704',
    whatsappClean: '584120845704',
    phoneDisplay: '+58 412 084 5704',
    email: 'contacto@instalaciones-axa.com',
    address: 'Rambla Nova 124, 43001 Tarragona, España',
    instagramUrl: 'https://instagram.com/instalaciones_axa',
  };

  const PORTFOLIO_DATA = [
    {
      id: 'port-1',
      title: 'Sistema de Climatización por Conductos',
      category: 'climatizacion',
      categoryLabel: 'Climatización',
      location: 'Rambla Nova, Tarragona',
      description: 'Instalación completa de bomba de calor de alta eficiencia con zonificación inteligente Airzone en vivienda de 140m².',
      technicalSpecs: ['Inverter A+++', 'Zonificación Airzone', 'R-32 Ecológico'],
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'port-2',
      title: 'Cuadro Eléctrico Principal y Derivaciones',
      category: 'electricidad',
      categoryLabel: 'Electricidad',
      location: 'Eixample, Tarragona',
      description: 'Reforma y saneamiento de cuadro general de mando y protección con protecciones contra sobretensiones permanentes y transitorias.',
      technicalSpecs: ['Baja Tensión', 'Sobretensiones Clase II', 'Normativa REBT'],
      image: 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'port-3',
      title: 'Red de Fontanería Multicapa y Desagües',
      category: 'fontaneria',
      categoryLabel: 'Fontanería',
      location: 'Part Alta, Tarragona',
      description: 'Sustitución completa de red de agua fría y ACS mediante tubería multicapa prensada con colectores independientes por zona.',
      technicalSpecs: ['Multicapa Prensado', 'Colectores Modulares', 'Aislamiento Térmico'],
      image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'port-4',
      title: 'Aerotermia para Suelo Radiante y ACS',
      category: 'climatizacion',
      categoryLabel: 'Climatización',
      location: 'Vilafortuny / Tarragona',
      description: 'Sistema integral de aerotermia para climatización por suelo radiante-refrescante y producción de agua caliente sanitaria.',
      technicalSpecs: ['Aerotermia 12kW', 'Depósito 200L ACS', 'COP 4.8'],
      image: 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'port-5',
      title: 'Iluminación Técnica LED y Fuerza',
      category: 'electricidad',
      categoryLabel: 'Electricidad',
      location: 'Polígono Francolí, Tarragona',
      description: 'Renovación de circuitos de fuerza e iluminación técnica de alta eficiencia con control DALI en nave comercial.',
      technicalSpecs: ['LED Industrial', 'Protocolo DALI', 'Protección IP65'],
      image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 'port-6',
      title: 'Instalación Sanitaria en Reforma Integral',
      category: 'fontaneria',
      categoryLabel: 'Fontanería',
      location: 'Serrallo, Tarragona',
      description: 'Montaje de sistemas de evacuación insonorizados, llaves de corte sectorizadas y griferías empotradas termostáticas.',
      technicalSpecs: ['Evacuación Insonorizada', 'Grifería Termostática', 'Prueba de Presión'],
      image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  // Global variables
  let currentPortfolioFilter = 'todos';
  let currentLightboxIndex = 0;
  let activeModal = null;

  // --- 02. HELPER FUNCTIONS ---
  function buildWhatsAppUrl(message) {
    const text = encodeURIComponent(message || 'Hola Instalaciones AXA, solicito información sobre sus servicios técnicos en Tarragona.');
    return `https://wa.me/${CONFIG.whatsappClean}?text=${text}`;
  }

  function isValidEmail(email) {
    const trimmed = email.trim();
    if (!trimmed) return false;
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    return emailRegex.test(trimmed);
  }

  function isValidPhone(phone) {
    const trimmed = phone.trim();
    if (!trimmed) return false;
    const digitsOnly = trimmed.replace(/\D/g, '');
    return digitsOnly.length >= 9 && digitsOnly.length <= 15;
  }

  // --- 03. NAVBAR & SCROLL PROGRESS ---
  function initNavbarScroll() {
    const navbar = document.getElementById('main-navbar');
    const progressBar = document.getElementById('scroll-progress-bar');

    function onScroll() {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (progressBar && docHeight > 0) {
        const progress = (scrollY / docHeight) * 100;
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      }

      if (navbar) {
        if (scrollY > 40) {
          navbar.classList.add('is-scrolled');
        } else {
          navbar.classList.remove('is-scrolled');
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- 04. MOBILE NAVIGATION DRAWER ---
  function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const closeBtn = document.getElementById('mobile-menu-close');
    const drawer = document.getElementById('mobile-menu-drawer');
    const overlay = document.getElementById('mobile-menu-overlay');
    const links = document.querySelectorAll('.mobile-nav-link');

    function openMenu() {
      if (drawer) drawer.classList.add('is-open');
      if (overlay) overlay.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      if (drawer) drawer.classList.remove('is-open');
      if (overlay) overlay.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openMenu);
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    links.forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- 05. SMOOTH SCROLLING WITH OFFSET ---
  function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach((link) => {
      link.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '') return;

        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          const headerOffset = 80;
          const elementPosition = targetElem.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // --- 06. MODAL MANAGER ---
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    activeModal = modal;

    // Focus on first input or close button
    const firstInput = modal.querySelector('input, button:not(.modal-close-btn)');
    if (firstInput) {
      setTimeout(() => firstInput.focus(), 100);
    }
  }

  function closeModal(modalId) {
    const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId;
    if (!modal) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    activeModal = null;
  }

  function initModals() {
    // Backdrop clicks
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          closeModal(backdrop);
        }
      });
    });

    // Close buttons
    document.querySelectorAll('[data-close-modal]').forEach((btn) => {
      btn.addEventListener('click', function () {
        const modalId = this.getAttribute('data-close-modal');
        if (modalId) {
          closeModal(modalId);
        } else {
          const parentModal = this.closest('.modal-backdrop');
          if (parentModal) closeModal(parentModal);
        }
      });
    });

    // ESC key listener
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && activeModal) {
        closeModal(activeModal);
      }
    });
  }

  // --- 07. QUOTE MODAL CONTROLLER ---
  function initQuoteModal() {
    const quoteModalId = 'quote-modal';
    const form = document.getElementById('quote-modal-form');
    const successBox = document.getElementById('quote-modal-success');
    const radioPills = document.querySelectorAll('.modal-specialty-radio-card');
    const hiddenServiceInput = document.getElementById('quote-modal-service');
    const errorBanner = document.getElementById('quote-modal-error-banner');
    const errorList = document.getElementById('quote-modal-error-list');

    // Trigger buttons that open the quote modal
    document.querySelectorAll('[data-open-quote]').forEach((btn) => {
      btn.addEventListener('click', function () {
        const requestedService = this.getAttribute('data-open-quote') || 'climatizacion';
        selectQuoteService(requestedService);
        resetQuoteForm();
        openModal(quoteModalId);
      });
    });

    function selectQuoteService(serviceId) {
      if (hiddenServiceInput) hiddenServiceInput.value = serviceId;

      radioPills.forEach((pill) => {
        const pillService = pill.getAttribute('data-service');
        if (pillService === serviceId) {
          pill.classList.add('is-selected');
          pill.setAttribute('aria-checked', 'true');
        } else {
          pill.classList.remove('is-selected');
          pill.setAttribute('aria-checked', 'false');
        }
      });
    }

    // Radio click events
    radioPills.forEach((pill) => {
      pill.addEventListener('click', function () {
        const service = this.getAttribute('data-service');
        selectQuoteService(service);
      });
    });

    function resetQuoteForm() {
      if (form) {
        form.reset();
        form.style.display = 'block';
      }
      if (successBox) successBox.style.display = 'none';
      if (errorBanner) errorBanner.classList.remove('is-visible');
      if (errorList) errorList.innerHTML = '';
      
      // Clear visual errors
      const inputs = form ? form.querySelectorAll('.form-input, .form-textarea') : [];
      inputs.forEach(i => i.classList.remove('has-error'));
      document.querySelectorAll('.field-error-msg').forEach(el => el.textContent = '');
    }

    if (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('quote-nombre');
        const phoneInput = document.getElementById('quote-telefono');
        const emailInput = document.getElementById('quote-email');
        const policyInput = document.getElementById('quote-politica');
        const serviceVal = hiddenServiceInput ? hiddenServiceInput.value : 'climatizacion';

        const name = nameInput ? nameInput.value.trim() : '';
        const phone = phoneInput ? phoneInput.value.trim() : '';
        const email = emailInput ? emailInput.value.trim() : '';
        const accepted = policyInput ? policyInput.checked : false;

        const errors = [];

        if (!name || name.length < 2) {
          errors.push('Introduce tu nombre (mínimo 2 caracteres).');
          if (nameInput) nameInput.classList.add('has-error');
        } else {
          if (nameInput) nameInput.classList.remove('has-error');
        }

        const hasPhone = phone.length > 0;
        const hasEmail = email.length > 0;

        if (!hasPhone && !hasEmail) {
          errors.push('Indica al menos un teléfono o correo electrónico de contacto.');
          if (phoneInput) phoneInput.classList.add('has-error');
          if (emailInput) emailInput.classList.add('has-error');
        } else {
          if (hasPhone && !isValidPhone(phone)) {
            errors.push('Introduce un teléfono válido (ej: +34 600 123 456).');
            if (phoneInput) phoneInput.classList.add('has-error');
          } else if (phoneInput) {
            phoneInput.classList.remove('has-error');
          }

          if (hasEmail && !isValidEmail(email)) {
            errors.push('Introduce un correo electrónico con formato válido.');
            if (emailInput) emailInput.classList.add('has-error');
          } else if (emailInput) {
            emailInput.classList.remove('has-error');
          }
        }

        if (!accepted) {
          errors.push('Debes aceptar la política de privacidad para enviar la solicitud.');
        }

        if (errors.length > 0) {
          if (errorBanner && errorList) {
            errorList.innerHTML = errors.map(err => `<li>${err}</li>`).join('');
            errorBanner.classList.add('is-visible');
          }
          return;
        }

        // Valid form -> Simulate Submission
        const submitBtn = document.getElementById('btn-submit-quote');
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Enviando solicitud...';
        }

        setTimeout(() => {
          if (form) form.style.display = 'none';
          if (successBox) {
            successBox.style.display = 'block';
            const clientNameElem = document.getElementById('success-client-name');
            const serviceLabelElem = document.getElementById('success-service-label');
            if (clientNameElem) clientNameElem.textContent = name;
            if (serviceLabelElem) {
              const labels = {
                climatizacion: 'Climatización',
                electricidad: 'Electricidad',
                fontaneria: 'Fontanería'
              };
              serviceLabelElem.textContent = labels[serviceVal] || serviceVal;
            }

            const waBtn = document.getElementById('btn-success-whatsapp');
            if (waBtn) {
              waBtn.href = buildWhatsAppUrl(`Hola Instalaciones AXA, soy ${name}. He enviado una solicitud de presupuesto de ${serviceVal} desde la web.`);
            }
          }
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'SOLICITAR PRESUPUESTO';
          }
        }, 400);
      });
    }

    // Reset button in success screen
    const resetBtn = document.getElementById('btn-quote-success-reset');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        closeModal(quoteModalId);
        resetQuoteForm();
      });
    }
  }

  // --- 08. CONTACT SECTION FORM CONTROLLER ---
  function initContactForm() {
    const form = document.getElementById('contact-section-form');
    const successBanner = document.getElementById('contact-form-success');
    const errorBanner = document.getElementById('contact-form-error');

    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const phoneInput = document.getElementById('contact-phone');
      const emailInput = document.getElementById('contact-email');
      const serviceSelect = document.getElementById('contact-service');
      const msgInput = document.getElementById('contact-message');
      const policyInput = document.getElementById('contact-policy');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const service = serviceSelect ? serviceSelect.value : 'Climatización';
      const msg = msgInput ? msgInput.value.trim() : '';
      const accepted = policyInput ? policyInput.checked : false;

      let hasError = false;

      // Validation
      if (!name || name.length < 2) {
        if (nameInput) nameInput.classList.add('has-error');
        hasError = true;
      } else if (nameInput) {
        nameInput.classList.remove('has-error');
      }

      const hasPhone = phone.length > 0;
      const hasEmail = email.length > 0;

      if (!hasPhone && !hasEmail) {
        if (phoneInput) phoneInput.classList.add('has-error');
        if (emailInput) emailInput.classList.add('has-error');
        hasError = true;
      } else {
        if (hasPhone && !isValidPhone(phone)) {
          if (phoneInput) phoneInput.classList.add('has-error');
          hasError = true;
        } else if (phoneInput) {
          phoneInput.classList.remove('has-error');
        }

        if (hasEmail && !isValidEmail(email)) {
          if (emailInput) emailInput.classList.add('has-error');
          hasError = true;
        } else if (emailInput) {
          emailInput.classList.remove('has-error');
        }
      }

      if (!accepted) {
        hasError = true;
      }

      if (hasError) {
        if (errorBanner) errorBanner.classList.add('is-visible');
        return;
      }

      if (errorBanner) errorBanner.classList.remove('is-visible');

      // Submit
      const submitBtn = document.getElementById('btn-submit-contact');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando mensaje...';
      }

      setTimeout(() => {
        form.style.display = 'none';
        if (successBanner) successBanner.classList.add('is-visible');

        const successName = document.getElementById('contact-success-name');
        if (successName) successName.textContent = name;

        const successWa = document.getElementById('contact-success-whatsapp');
        if (successWa) {
          successWa.href = buildWhatsAppUrl(`Hola Instalaciones AXA, soy ${name}. He enviado una consulta sobre ${service} desde la web.`);
        }
      }, 400);
    });
  }

  // --- 09. PORTFOLIO FILTERING & LIGHTBOX ---
  function initPortfolio() {
    const filterButtons = document.querySelectorAll('[data-portfolio-filter]');
    const portfolioGrid = document.getElementById('portfolio-grid');

    function renderPortfolio(filter) {
      if (!portfolioGrid) return;
      currentPortfolioFilter = filter;

      const items = filter === 'todos' 
        ? PORTFOLIO_DATA 
        : PORTFOLIO_DATA.filter(item => item.category === filter);

      portfolioGrid.innerHTML = items.map((item, index) => {
        const isLarge = index === 0 || index === 3;
        return `
          <div class="portfolio-item-card ${isLarge ? 'is-large' : ''}" data-portfolio-id="${item.id}" tabindex="0" role="button" aria-label="Ver detalles de ${item.title}">
            <div class="portfolio-img-container">
              <img src="${item.image}" alt="${item.title}" class="portfolio-img" loading="lazy" />
              <div class="portfolio-overlay"></div>
              <div class="portfolio-item-top">
                <span class="specialty-card-badge">${item.categoryLabel}</span>
                <div class="portfolio-zoom-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>
                </div>
              </div>
              <div class="portfolio-item-info">
                <div class="portfolio-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  <span>${item.location}</span>
                </div>
                <h3 class="portfolio-title">${item.title}</h3>
                <p class="portfolio-desc">${item.description}</p>
                <div class="portfolio-tags">
                  ${item.technicalSpecs.map(spec => `<span class="portfolio-tag">${spec}</span>`).join('')}
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Attach click events to freshly rendered cards
      portfolioGrid.querySelectorAll('.portfolio-item-card').forEach((card) => {
        card.addEventListener('click', function () {
          const itemId = this.getAttribute('data-portfolio-id');
          openLightbox(itemId);
        });
        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const itemId = this.getAttribute('data-portfolio-id');
            openLightbox(itemId);
          }
        });
      });
    }

    // Filter tab buttons
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        const filter = this.getAttribute('data-portfolio-filter');
        filterButtons.forEach(b => b.classList.remove('is-active'));
        this.classList.add('is-active');
        renderPortfolio(filter);
      });
    });

    // Initial render
    renderPortfolio('todos');
  }

  // --- 10. LIGHTBOX CONTROLLER ---
  function openLightbox(itemId) {
    const activeItems = currentPortfolioFilter === 'todos' 
      ? PORTFOLIO_DATA 
      : PORTFOLIO_DATA.filter(item => item.category === currentPortfolioFilter);

    const index = activeItems.findIndex(item => item.id === itemId);
    if (index === -1) return;

    currentLightboxIndex = index;
    updateLightboxUI();
    openModal('lightbox-modal');
  }

  function updateLightboxUI() {
    const activeItems = currentPortfolioFilter === 'todos' 
      ? PORTFOLIO_DATA 
      : PORTFOLIO_DATA.filter(item => item.category === currentPortfolioFilter);

    const item = activeItems[currentLightboxIndex];
    if (!item) return;

    const img = document.getElementById('lightbox-image');
    const title = document.getElementById('lightbox-title');
    const category = document.getElementById('lightbox-category');
    const location = document.getElementById('lightbox-location');
    const desc = document.getElementById('lightbox-desc');
    const specsContainer = document.getElementById('lightbox-specs');
    const counter = document.getElementById('lightbox-counter');
    const quoteBtn = document.getElementById('lightbox-quote-btn');

    if (img) {
      img.src = item.image;
      img.alt = item.title;
    }
    if (title) title.textContent = item.title;
    if (category) category.textContent = item.categoryLabel;
    if (location) location.textContent = item.location;
    if (desc) desc.textContent = item.description;
    if (counter) counter.textContent = `${currentLightboxIndex + 1} / ${activeItems.length}`;

    if (specsContainer) {
      specsContainer.innerHTML = item.technicalSpecs
        .map(spec => `<span class="portfolio-tag">${spec}</span>`)
        .join('');
    }

    if (quoteBtn) {
      quoteBtn.setAttribute('data-open-quote', item.category);
    }
  }

  function initLightboxNavigation() {
    const prevBtn = document.getElementById('lightbox-prev-btn');
    const nextBtn = document.getElementById('lightbox-next-btn');

    function showPrev() {
      const activeItems = currentPortfolioFilter === 'todos' 
        ? PORTFOLIO_DATA 
        : PORTFOLIO_DATA.filter(item => item.category === currentPortfolioFilter);
      currentLightboxIndex = (currentLightboxIndex - 1 + activeItems.length) % activeItems.length;
      updateLightboxUI();
    }

    function showNext() {
      const activeItems = currentPortfolioFilter === 'todos' 
        ? PORTFOLIO_DATA 
        : PORTFOLIO_DATA.filter(item => item.category === currentPortfolioFilter);
      currentLightboxIndex = (currentLightboxIndex + 1) % activeItems.length;
      updateLightboxUI();
    }

    if (prevBtn) prevBtn.addEventListener('click', showPrev);
    if (nextBtn) nextBtn.addEventListener('click', showNext);

    document.addEventListener('keydown', (e) => {
      const lightbox = document.getElementById('lightbox-modal');
      if (lightbox && lightbox.classList.contains('is-open')) {
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'ArrowRight') showNext();
      }
    });
  }

  // --- 11. LEGAL MODALS CONTROLLER ---
  function initLegalModals() {
    document.querySelectorAll('[data-open-legal]').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const type = this.getAttribute('data-open-legal');
        if (type === 'privacy') openModal('privacy-modal');
        if (type === 'cookies') openModal('cookies-modal');
      });
    });
  }

  // --- 12. WHATSAPP ACTION HOOKS ---
  function initWhatsAppLinks() {
    document.querySelectorAll('[data-whatsapp-action]').forEach((link) => {
      const customMsg = link.getAttribute('data-whatsapp-action');
      link.href = buildWhatsAppUrl(customMsg);
    });
  }

  // --- 13. DOM INITIALIZATION ---
  document.addEventListener('DOMContentLoaded', () => {
    initNavbarScroll();
    initMobileMenu();
    initSmoothScroll();
    initModals();
    initQuoteModal();
    initContactForm();
    initPortfolio();
    initLightboxNavigation();
    initLegalModals();
    initWhatsAppLinks();
  });

})();
