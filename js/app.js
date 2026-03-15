(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const HERO_SLIDES = [
    {
      img: "img/hero-1.jpg",
      title: "Caldeiraria, fabricação e montagem industrial com padrão técnico",
      desc: "Soluções metálicas para empresas e indústrias com foco em estrutura, qualidade, segurança e execução profissional."
    },
    {
      img: "img/hero-2.jpg",
      title: "Estruturas metálicas e fabricação sob medida para diferentes demandas industriais",
      desc: "Projetos com leitura técnica, resistência e alinhamento ao escopo real da operação."
    },
    {
      img: "img/hero-3.jpg",
      title: "Montagem, manutenção e soluções metálicas com presença institucional",
      desc: "Atendimento para fabricação, adequação e serviços industriais com padrão profissional."
    },
    {
      img: "img/hero-5.jpg",
      title: "Projetos industriais com mais organização, segurança e confiabilidade",
      desc: "Cada serviço é desenvolvido para unir desempenho, resistência e leitura técnica."
    }
  ];

  const WHATSAPP = "5531983913499";
  const COMPANY_EMAIL = "contato@metallmec.com.br";
  const INSTAGRAM_URL = "https://instagram.com/metallmec_eng";
  const FACEBOOK_URL = "https://facebook.com/";

  let heroIndex = 0;
  let heroTimer = null;
  let touchStartX = 0;
  let touchEndX = 0;

  function init() {
    const body = document.body;

    const year = $("#year");
    const topbar = $("#topbar");
    const menuToggle = $("#menuToggle");
    const mobileMenu = $("#mobileMenu");

    const heroTrack = $("#heroTrack");
    const heroDots = $("#heroDots");
    const heroTitle = $("#heroTitle");
    const heroDesc = $("#heroDesc");
    const heroPrev = $("#heroPrev");
    const heroNext = $("#heroNext");
    const heroSlider = $("#heroSlider");

    const portfolioCards = $$(".portfolioCard");
    const portfolioLightbox = $("#portfolioLightbox");
    const lightboxImage = $("#lightboxImage");
    const lightboxClose = $("#lightboxClose");
    const lightboxBackdrop = $("#lightboxBackdrop");
    const lightboxDialog = $(".lightboxDialog", portfolioLightbox);

    const budgetModal = $("#budgetModal");
    const budgetModalBackdrop = $("#budgetModalBackdrop");
    const closeBudgetModal = $("#closeBudgetModal");
    const sendModalWhatsapp = $("#sendModalWhatsapp");
    const openModalButtons = $$(".openModalBtn");

    const footerWhatsapp = $("#footerWhatsapp");
    const footerEmail = $("#footerEmail");
    const footerInstagram = $("#footerInstagram");
    const footerFacebook = $("#footerFacebook");

    const floatWhats = $("#floatWhats");
    const backToTop = $("#backToTop");

    const mapFrame = $(".mapBox iframe");

    /* =========================
       HELPERS
    ========================= */
    function setBodyLocked(locked) {
      body.style.overflow = locked ? "hidden" : "";
    }

    function isModalOpen() {
      return !!budgetModal && budgetModal.classList.contains("show");
    }

    function isLightboxOpen() {
      return !!portfolioLightbox && portfolioLightbox.classList.contains("show");
    }

    function syncBodyScrollState() {
      setBodyLocked(isModalOpen() || isLightboxOpen());
    }

    function buildWhatsappUrl(text) {
      return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
    }

    function openWhatsapp(text) {
      window.open(buildWhatsappUrl(text), "_blank", "noopener,noreferrer");
    }

    /* =========================
       ANO RODAPÉ
    ========================= */
    if (year) year.textContent = new Date().getFullYear();

    /* =========================
       HEADER
    ========================= */
    function updateHeader() {
      if (!topbar) return;
      topbar.classList.toggle("scrolled", window.scrollY > 70);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    /* =========================
       MOBILE MENU
    ========================= */
    function closeMobileMenu() {
      if (!mobileMenu || !menuToggle) return;
      mobileMenu.classList.remove("show");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    function openMobileMenu() {
      if (!mobileMenu || !menuToggle) return;
      mobileMenu.classList.add("show");
      menuToggle.classList.add("active");
      menuToggle.setAttribute("aria-expanded", "true");
    }

    if (menuToggle && mobileMenu) {
      menuToggle.setAttribute("aria-expanded", "false");

      menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const willOpen = !mobileMenu.classList.contains("show");
        willOpen ? openMobileMenu() : closeMobileMenu();
      });

      $$("a", mobileMenu).forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
      });

      document.addEventListener("click", (e) => {
        const clickedInsideMenu = mobileMenu.contains(e.target);
        const clickedToggle = menuToggle.contains(e.target);

        if (!clickedInsideMenu && !clickedToggle) {
          closeMobileMenu();
        }
      });
    }

    /* =========================
       HERO SLIDER
    ========================= */
    function renderHero() {
      if (!heroTrack || !heroDots || !HERO_SLIDES.length) return;

      heroTrack.innerHTML = HERO_SLIDES.map((slide, i) => `
        <div
          class="heroSlide ${i === 0 ? "active" : ""}"
          data-index="${i}"
          aria-hidden="${i === 0 ? "false" : "true"}"
        >
          <img
            src="${slide.img}"
            alt="${slide.title}"
            data-full="${slide.img}"
            ${i === 0 ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}
          >
        </div>
      `).join("");

      heroDots.innerHTML = HERO_SLIDES.map((_, i) => `
        <button
          class="heroDot ${i === 0 ? "active" : ""}"
          data-index="${i}"
          type="button"
          aria-label="Ir para slide ${i + 1}"
          aria-pressed="${i === 0 ? "true" : "false"}"
        ></button>
      `).join("");

      bindHeroDots();
      bindHeroImageClick();
      updateHero();
    }

    function updateHero() {
      if (!heroTrack || !heroDots || !HERO_SLIDES.length) return;

      const slides = $$(".heroSlide", heroTrack);
      const dots = $$(".heroDot", heroDots);

      slides.forEach((slide, i) => {
        const active = i === heroIndex;
        slide.classList.toggle("active", active);
        slide.setAttribute("aria-hidden", active ? "false" : "true");
      });

      dots.forEach((dot, i) => {
        const active = i === heroIndex;
        dot.classList.toggle("active", active);
        dot.setAttribute("aria-pressed", active ? "true" : "false");
      });

      if (heroTitle) heroTitle.textContent = HERO_SLIDES[heroIndex].title;
      if (heroDesc) heroDesc.textContent = HERO_SLIDES[heroIndex].desc;
    }

    function nextHero() {
      heroIndex = (heroIndex + 1) % HERO_SLIDES.length;
      updateHero();
    }

    function prevHeroAction() {
      heroIndex = (heroIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
      updateHero();
    }

    function stopHeroTimer() {
      if (heroTimer) {
        clearInterval(heroTimer);
        heroTimer = null;
      }
    }

    function startHeroTimer() {
      stopHeroTimer();
      if (HERO_SLIDES.length <= 1) return;
      heroTimer = setInterval(nextHero, 6500);
    }

    function restartHeroTimer() {
      startHeroTimer();
    }

    function bindHeroDots() {
      $$(".heroDot", heroDots).forEach((dot) => {
        dot.addEventListener("click", () => {
          heroIndex = Number(dot.dataset.index || 0);
          updateHero();
          restartHeroTimer();
        });
      });
    }

    if (heroPrev) {
      heroPrev.addEventListener("click", () => {
        prevHeroAction();
        restartHeroTimer();
      });
    }

    if (heroNext) {
      heroNext.addEventListener("click", () => {
        nextHero();
        restartHeroTimer();
      });
    }

    if (heroSlider) {
      heroSlider.addEventListener("mouseenter", stopHeroTimer);
      heroSlider.addEventListener("mouseleave", startHeroTimer);

      heroSlider.addEventListener("touchstart", (e) => {
        stopHeroTimer();
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });

      heroSlider.addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        const delta = touchEndX - touchStartX;

        if (Math.abs(delta) > 45) {
          if (delta < 0) {
            nextHero();
          } else {
            prevHeroAction();
          }
        }

        startHeroTimer();
      }, { passive: true });
    }

    renderHero();
    startHeroTimer();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopHeroTimer();
      } else {
        startHeroTimer();
      }
    });

    /* =========================
       MENU ATIVO
    ========================= */
    const menuLinks = $$(".navMenu a, .mobileMenu a");
    const sectionIds = [
      "inicio",
      "empresa",
      "servicos",
      "portfolio",
      "estrutura",
      "parceiros",
      "localizacao",
      "contato"
    ];

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    function updateActiveMenu() {
      const scrollRef = window.scrollY + 160;
      let currentId = "inicio";

      sections.forEach((sec) => {
        if (scrollRef >= sec.offsetTop) currentId = sec.id;
      });

      menuLinks.forEach((link) => {
        const href = link.getAttribute("href");
        link.classList.toggle("active", href === `#${currentId}`);
      });
    }

    updateActiveMenu();
    window.addEventListener("scroll", updateActiveMenu, { passive: true });

    /* =========================
       LIGHTBOX
    ========================= */
    function openLightbox(src, alt = "Imagem ampliada") {
      if (!portfolioLightbox || !lightboxImage || !src) return;

      lightboxImage.src = src;
      lightboxImage.alt = alt;
      portfolioLightbox.classList.add("show");
      portfolioLightbox.setAttribute("aria-hidden", "false");
      syncBodyScrollState();
    }

    function closeLightbox() {
      if (!portfolioLightbox || !lightboxImage) return;

      portfolioLightbox.classList.remove("show");
      portfolioLightbox.setAttribute("aria-hidden", "true");

      setTimeout(() => {
        lightboxImage.src = "";
        lightboxImage.alt = "Imagem ampliada do portfólio";
      }, 180);

      syncBodyScrollState();
    }

    function bindHeroImageClick() {
      $$(".heroSlide img", heroTrack).forEach((img) => {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", () => {
          openLightbox(img.dataset.full || img.src, img.alt || "Imagem ampliada do slide");
        });
      });
    }

    portfolioCards.forEach((card) => {
      card.style.cursor = "zoom-in";
      card.addEventListener("click", () => {
        const full = card.dataset.full || $("img", card)?.src || "";
        const alt = $("img", card)?.alt || "Imagem ampliada do portfólio";
        openLightbox(full, alt);
      });
    });

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightboxBackdrop) {
      lightboxBackdrop.addEventListener("click", closeLightbox);
    }

    if (portfolioLightbox) {
      portfolioLightbox.addEventListener("click", (e) => {
        if (e.target === portfolioLightbox) closeLightbox();
      });
    }

    if (lightboxDialog) {
      lightboxDialog.addEventListener("click", (e) => {
        e.stopPropagation();
      });
    }

    /* =========================
       MODAL
    ========================= */
    function openModal() {
      if (!budgetModal) return;

      budgetModal.classList.add("show");
      budgetModal.setAttribute("aria-hidden", "false");
      syncBodyScrollState();

      const firstInput = $("#mName");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 90);
      }
    }

    function closeModal() {
      if (!budgetModal) return;

      budgetModal.classList.remove("show");
      budgetModal.setAttribute("aria-hidden", "true");
      syncBodyScrollState();
    }

    openModalButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        openModal();
      });
    });

    if (closeBudgetModal) {
      closeBudgetModal.addEventListener("click", closeModal);
    }

    if (budgetModalBackdrop) {
      budgetModalBackdrop.addEventListener("click", closeModal);
    }

    if (budgetModal) {
      budgetModal.addEventListener("click", (e) => {
        if (e.target === budgetModal) closeModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;

      if (isModalOpen()) closeModal();
      if (isLightboxOpen()) closeLightbox();
      closeMobileMenu();
    });

    function getModalFormData() {
      return {
        name: $("#mName")?.value.trim() || "",
        email: $("#mEmail")?.value.trim() || "",
        phone: $("#mPhone")?.value.trim() || "",
        place: $("#mPlace")?.value.trim() || "",
        service: $("#mService")?.value.trim() || "",
        measures: $("#mMeasures")?.value.trim() || "",
        message: $("#mMessage")?.value.trim() || ""
      };
    }

    function buildWhatsappText(data) {
      return `Olá! Vim pelo site da Metallmec e quero solicitar um orçamento.

Nome: ${data.name || "-"}
WhatsApp: ${data.phone || "-"}
E-mail: ${data.email || "-"}
Cidade / local: ${data.place || "-"}
Serviço desejado: ${data.service || "-"}
Medidas / escopo: ${data.measures || "-"}
Detalhes: ${data.message || "-"}`;
    }

    if (sendModalWhatsapp) {
      sendModalWhatsapp.addEventListener("click", () => {
        const data = getModalFormData();
        openWhatsapp(buildWhatsappText(data));
      });
    }

    /* =========================
       RODAPÉ
    ========================= */
    if (footerWhatsapp) {
      footerWhatsapp.href = buildWhatsappUrl(
        "Olá! Vim pelo site da Metallmec e quero solicitar um orçamento."
      );
      footerWhatsapp.target = "_blank";
      footerWhatsapp.rel = "noopener noreferrer";
    }

    if (footerEmail) {
      footerEmail.href = `mailto:${COMPANY_EMAIL}`;
      if (!footerEmail.textContent.trim()) {
        footerEmail.textContent = COMPANY_EMAIL;
      }
    }

    if (footerInstagram) {
      footerInstagram.href = INSTAGRAM_URL;
      footerInstagram.target = "_blank";
      footerInstagram.rel = "noopener noreferrer";
    }

    if (footerFacebook) {
      footerFacebook.href = FACEBOOK_URL;
      footerFacebook.target = "_blank";
      footerFacebook.rel = "noopener noreferrer";
    }

    /* =========================
       BOTÕES FLUTUANTES
    ========================= */
    if (floatWhats) {
      floatWhats.href = buildWhatsappUrl(
        "Olá! Vim pelo site da Metallmec e quero solicitar um orçamento."
      );
      floatWhats.target = "_blank";
      floatWhats.rel = "noopener noreferrer";
    }

    function updateBackToTop() {
      if (!backToTop) return;
      backToTop.classList.toggle("show", window.scrollY > window.innerHeight * 0.35);
    }

    if (backToTop) {
      updateBackToTop();

      window.addEventListener("scroll", updateBackToTop, { passive: true });

      backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    /* =========================
       MAPA
    ========================= */
    if (mapFrame) {
      mapFrame.setAttribute("loading", "lazy");
      mapFrame.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    }

    /* =========================
       LOAD
    ========================= */
    window.addEventListener("load", () => {
      body.classList.add("site-loaded");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
