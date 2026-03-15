(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const HERO_SLIDES = [
    {
      img: "img/herói-1.jpg",
      title: "Caldeiraria, fabricação e montagem industrial com padrão técnico",
      desc: "Soluções metálicas para empresas e indústrias com foco em estrutura, qualidade, segurança e execução profissional."
    },
    {
      img: "img/herói-2.jpg",
      title: "Estruturas metálicas e fabricação sob medida para diferentes demandas industriais",
      desc: "Projetos com leitura técnica, resistência e alinhamento ao escopo real da operação."
    },
    {
      img: "img/herói-3.jpg",
      title: "Montagem, manutenção e soluções metálicas com presença institucional",
      desc: "Atendimento para fabricação, adequação e serviços industriais com padrão profissional."
    },
    {
      img: "img/herói-5.jpg",
      title: "Projetos industriais com mais organização, segurança e confiabilidade",
      desc: "Cada serviço é desenvolvido para unir desempenho, resistência e leitura técnica."
    }
  ];

  const WHATSAPP = "5531983913499";
  const COMPANY_EMAIL = "contato@metallmec.com.br";

  let heroIndex = 0;
  let heroTimer = null;

  function init() {
    const body = document.body;

    /* =========================
       ANO RODAPÉ
    ========================= */
    const year = $("#year");
    if (year) year.textContent = new Date().getFullYear();

    /* =========================
       HEADER
    ========================= */
    const topbar = $("#topbar");

    function updateHeader() {
      if (!topbar) return;
      topbar.classList.toggle("scrolled", window.scrollY > 70);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    /* =========================
       MOBILE MENU
    ========================= */
    const menuToggle = $("#menuToggle");
    const mobileMenu = $("#mobileMenu");

    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        mobileMenu.classList.toggle("show");
        menuToggle.classList.toggle("active");
      });

      $$("a", mobileMenu).forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("show");
          menuToggle.classList.remove("active");
        });
      });

      document.addEventListener("click", (e) => {
        const clickedInsideMenu = mobileMenu.contains(e.target);
        const clickedToggle = menuToggle.contains(e.target);

        if (!clickedInsideMenu && !clickedToggle) {
          mobileMenu.classList.remove("show");
          menuToggle.classList.remove("active");
        }
      });
    }

    /* =========================
       HERO
    ========================= */
    const heroTrack = $("#heroTrack");
    const heroDots = $("#heroDots");
    const heroTitle = $("#heroTitle");
    const heroDesc = $("#heroDesc");
    const heroPrev = $("#heroPrev");
    const heroNext = $("#heroNext");
    const heroSlider = $("#heroSlider");

    function renderHero() {
      if (!heroTrack || !heroDots || !HERO_SLIDES.length) return;

      heroTrack.innerHTML = HERO_SLIDES.map((slide, i) => `
        <div class="heroSlide ${i === 0 ? "active" : ""}" data-index="${i}" aria-hidden="${i === 0 ? "false" : "true"}">
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
          aria-pressed="${i === 0 ? "true" : "false"}">
        </button>
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

    function bindHeroDots() {
      $$(".heroDot", heroDots).forEach((dot) => {
        dot.addEventListener("click", () => {
          heroIndex = Number(dot.dataset.index);
          updateHero();
          restartHeroTimer();
        });
      });
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
      clearInterval(heroTimer);
      heroTimer = null;
    }

    function startHeroTimer() {
      stopHeroTimer();
      if (HERO_SLIDES.length <= 1) return;
      heroTimer = setInterval(nextHero, 6500);
    }

    function restartHeroTimer() {
      startHeroTimer();
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
      heroSlider.addEventListener("touchstart", stopHeroTimer, { passive: true });
      heroSlider.addEventListener("touchend", startHeroTimer, { passive: true });
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
      const scrollRef = window.scrollY + 150;
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
    const portfolioCards = $$(".portfolioCard");
    const portfolioLightbox = $("#portfolioLightbox");
    const lightboxImage = $("#lightboxImage");
    const lightboxClose = $("#lightboxClose");

    function openLightbox(src, alt = "Imagem ampliada") {
      if (!portfolioLightbox || !lightboxImage || !src) return;
      lightboxImage.src = src;
      lightboxImage.alt = alt;
      portfolioLightbox.classList.add("show");
      portfolioLightbox.setAttribute("aria-hidden", "false");
      body.style.overflow = "hidden";
    }

    function closeLightbox() {
      if (!portfolioLightbox || !lightboxImage) return;
      portfolioLightbox.classList.remove("show");
      portfolioLightbox.setAttribute("aria-hidden", "true");
      lightboxImage.src = "";
      lightboxImage.alt = "Imagem ampliada do portfólio";
      body.style.overflow = "";
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

    if (portfolioLightbox) {
      portfolioLightbox.addEventListener("click", (e) => {
        if (e.target === portfolioLightbox) closeLightbox();
      });
    }

    /* =========================
       MODAL
    ========================= */
    const budgetModal = $("#budgetModal");
    const openBudgetModal = $("#openBudgetModal");
    const openBudgetModalTop = $("#openBudgetModalTop");
    const openBudgetModalBottom = $("#openBudgetModalBottom");
    const closeBudgetModal = $("#closeBudgetModal");
    const sendModalWhatsapp = $("#sendModalWhatsapp");

    function openModal() {
      if (!budgetModal) return;
      budgetModal.classList.add("show");
      budgetModal.setAttribute("aria-hidden", "false");
      body.style.overflow = "hidden";

      const firstInput = $("#mName");
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 80);
      }
    }

    function closeModal() {
      if (!budgetModal) return;
      budgetModal.classList.remove("show");
      budgetModal.setAttribute("aria-hidden", "true");
      body.style.overflow = "";
    }

    [openBudgetModal, openBudgetModalTop, openBudgetModalBottom]
      .filter(Boolean)
      .forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          openModal();
        });
      });

    if (closeBudgetModal) {
      closeBudgetModal.addEventListener("click", closeModal);
    }

    if (budgetModal) {
      budgetModal.addEventListener("click", (e) => {
        if (e.target === budgetModal) closeModal();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (budgetModal?.classList.contains("show")) closeModal();
        if (portfolioLightbox?.classList.contains("show")) closeLightbox();
      }
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

    function sendWhatsapp(data) {
      const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildWhatsappText(data))}`;
      window.open(url, "_blank", "noopener,noreferrer");
    }

    if (sendModalWhatsapp) {
      sendModalWhatsapp.addEventListener("click", () => {
        const data = getModalFormData();
        sendWhatsapp(data);
      });
    }

    /* =========================
       RODAPÉ
    ========================= */
    const footerWhatsapp = $("#footerWhatsapp");
    const footerEmail = $("#footerEmail");

    if (footerWhatsapp) {
      const msg = "Olá! Vim pelo site da Metallmec e quero solicitar um orçamento.";
      footerWhatsapp.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
      footerWhatsapp.target = "_blank";
      footerWhatsapp.rel = "noopener noreferrer";
    }

    if (footerEmail) {
      footerEmail.href = `mailto:${COMPANY_EMAIL}`;
      if (!footerEmail.textContent.trim()) {
        footerEmail.textContent = COMPANY_EMAIL;
      }
    }

    /* =========================
       MAPA
    ========================= */
    const mapFrame = $(".mapBox iframe");
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
