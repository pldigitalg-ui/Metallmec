(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const HERO_SLIDES = [
    {
      img: "img/heroi-1.jpg",
      title: "Caldeiraria, fabricação e montagem industrial com padrão técnico",
      desc: "Soluções metálicas para empresas e indústrias com foco em estrutura, qualidade, segurança e execução profissional."
    },
    {
      img: "img/heroi-2.jpg",
      title: "Estruturas metálicas e fabricação sob medida para diferentes demandas industriais",
      desc: "Projetos com leitura técnica, resistência e alinhamento ao escopo real da operação."
    },
    {
      img: "img/heroi-3.jpg",
      title: "Montagem, manutenção e soluções metálicas com presença institucional",
      desc: "Atendimento para fabricação, adequação e serviços industriais com padrão profissional."
    },
    {
      img: "img/heroi-5.jpg",
      title: "Projetos industriais com mais organização, segurança e confiabilidade",
      desc: "Cada serviço é desenvolvido para unir desempenho, resistência e leitura técnica."
    }
  ];

  const WHATSAPP = "5531983913499";
  const COMPANY_EMAIL = "contato@metallmec.com.br";
  const HERO_AUTOPLAY_MS = 6500;

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
       MENU MOBILE
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
    const heroSection = $(".hero, .heroSection, #inicio");

    function renderHero() {
      if (!heroTrack || !heroDots || !HERO_SLIDES.length) return;

      heroTrack.innerHTML = HERO_SLIDES.map((slide, i) => `
        <div class="heroSlide ${i === heroIndex ? "active" : ""}" data-index="${i}" aria-hidden="${i === heroIndex ? "false" : "true"}">
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
          class="heroDot ${i === heroIndex ? "active" : ""}"
          data-index="${i}"
          type="button"
          aria-label="Ir para slide ${i + 1}"
          aria-pressed="${i === heroIndex ? "true" : "false"}">
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
      const current = HERO_SLIDES[heroIndex];

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

      if (heroTitle) heroTitle.textContent = current.title;
      if (heroDesc) heroDesc.textContent = current.desc;
    }

    function bindHeroDots() {
      $$(".heroDot", heroDots).forEach((dot) => {
        dot.addEventListener("click", () => {
          heroIndex = Number(dot.dataset.index) || 0;
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
      heroTimer = setInterval(nextHero, HERO_AUTOPLAY_MS);
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

    if (heroSection) {
      heroSection.addEventListener("mouseenter", stopHeroTimer);
      heroSection.addEventListener("mouseleave", startHeroTimer);
      heroSection.addEventListener("touchstart", stopHeroTimer, { passive: true });
      heroSection.addEventListener("touchend", startHeroTimer, { passive: true });
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
       LIGHTBOX / FOTOS
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
      lightboxImage.alt = "";
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
        const img = $("img", card);
        const full = card.dataset.full || img?.dataset.full || img?.src || "";
        const alt = img?.alt || "Imagem ampliada do portfólio";
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
       MODAL ORÇAMENTO / CONTATO
    ========================= */
    const budgetModal = $("#budgetModal");
    const closeBudgetModal = $("#closeBudgetModal");
    const sendModalWhatsapp = $("#sendModalWhatsapp");
    const sendModalEmail = $("#sendModalEmail");

    const modalOpenSelectors = [
      "#openBudgetModal",
      "#openBudgetModalTop",
      "#openBudgetModalHero",
      "#openContactModal",
      "#openContactModalTop",
      "#openContactModalHero",
      "[data-open-modal='budget']",
      "[data-open-modal='contact']"
    ];

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

    modalOpenSelectors.forEach((selector) => {
      $$(selector).forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          openModal();
        });
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

    function sendEmail(data) {
      const subject = "Orçamento - Metallmec Engenharia e Serviços";
      const bodyText = `Nome: ${data.name || "-"}
WhatsApp: ${data.phone || "-"}
E-mail: ${data.email || "-"}
Cidade / local: ${data.place || "-"}
Serviço desejado: ${data.service || "-"}
Medidas / escopo: ${data.measures || "-"}
Detalhes: ${data.message || "-"}`;

      window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    }

    if (sendModalWhatsapp) {
      sendModalWhatsapp.addEventListener("click", (e) => {
        e.preventDefault();
        const data = getModalFormData();
        sendWhatsapp(data);
      });
    }

    if (sendModalEmail) {
      sendModalEmail.addEventListener("click", (e) => {
        e.preventDefault();
        const data = getModalFormData();
        sendEmail(data);
      });
    }

    /* =========================
       BOTÕES DIRETOS WHATSAPP
    ========================= */
    const whatsappSelectors = [
      "#footerWhatsapp",
      "#floatWhats",
      "#contactWhatsapp",
      "[data-whatsapp-direct]"
    ];

    whatsappSelectors.forEach((selector) => {
      $$(selector).forEach((el) => {
        const msg = el.dataset.message || "Olá! Vim pelo site da Metallmec e quero solicitar um orçamento.";
        const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

        if (el.tagName.toLowerCase() === "a") {
          el.href = href;
          el.target = "_blank";
          el.rel = "noopener noreferrer";
        } else {
          el.addEventListener("click", () => {
            window.open(href, "_blank", "noopener,noreferrer");
          });
        }
      });
    });

    /* =========================
       E-MAIL
    ========================= */
    const footerEmail = $("#footerEmail");
    if (footerEmail) {
      footerEmail.href = `mailto:${COMPANY_EMAIL}`;
      if (!footerEmail.textContent.trim()) {
        footerEmail.textContent = COMPANY_EMAIL;
      }
    }

    /* =========================
       VOLTAR AO TOPO
    ========================= */
    const backToTop = $("#backToTop");

    function updateBackToTop() {
      if (!backToTop) return;
      backToTop.classList.toggle("show", window.scrollY > 500);
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
    const mapFrame = $(".mapBox iframe");
    if (mapFrame) {
      mapFrame.setAttribute("loading", "lazy");
      mapFrame.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
    }

    /* =========================
       EFEITO LOAD
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
