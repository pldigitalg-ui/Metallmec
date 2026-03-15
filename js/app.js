(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const HERO_SLIDES = [
    {
      img: "img/hero-1.jpg",
      title: "Caldeiraria, fabricação e montagem industrial com execução forte e confiável",
      desc: "A Metallmec desenvolve soluções em estruturas metálicas, equipamentos industriais e serviços sob medida para empresas e indústrias, com foco em qualidade, segurança e resultado técnico."
    },
    {
      img: "img/hero-2.jpg",
      title: "Estruturas metálicas e fabricação sob medida para diferentes demandas industriais",
      desc: "Projetos com leitura técnica, resistência, organização de processo e acabamento alinhado à real necessidade da operação."
    },
    {
      img: "img/hero-3.jpg",
      title: "Montagem, manutenção e soluções metálicas com padrão profissional",
      desc: "Atendimento para fabricação, adequação, reforço e serviços industriais com presença técnica e execução segura."
    },
    {
      img: "img/hero-4.jpg",
      title: "Equipamentos, peças e conjuntos metálicos com foco em precisão e confiabilidade",
      desc: "A Metallmec entrega soluções industriais com estrutura, funcionalidade e padrão institucional forte."
    },
    {
      img: "img/hero-5.jpg",
      title: "Projetos industriais com mais organização, qualidade e presença técnica",
      desc: "Cada serviço é desenvolvido para unir resistência, desempenho e apresentação profissional do início ao resultado final."
    }
  ];

  const WHATSAPP = "5531983913499";
  const COMPANY_EMAIL = "contato@metallmec.com.br";

  const body = document.body;
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
    });

    $$("a", mobileMenu).forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("show");
      });
    });

    document.addEventListener("click", (e) => {
      const clickedInsideMenu = mobileMenu.contains(e.target);
      const clickedToggle = menuToggle.contains(e.target);

      if (!clickedInsideMenu && !clickedToggle) {
        mobileMenu.classList.remove("show");
      }
    });
  }

  /* =========================
     HERO SLIDER
  ========================= */
  const heroTrack = $("#heroTrack");
  const heroDots = $("#heroDots");
  const heroTitle = $("#heroTitle");
  const heroDesc = $("#heroDesc");
  const heroPrev = $("#heroPrev");
  const heroNext = $("#heroNext");

  let heroIndex = 0;
  let heroTimer = null;

  function renderHero() {
    if (!heroTrack || !heroDots) return;

    heroTrack.innerHTML = HERO_SLIDES.map((slide, i) => `
      <div class="heroSlide ${i === 0 ? "active" : ""}" data-index="${i}">
        <img
          src="${slide.img}"
          alt="${slide.title}"
          ${i === 0 ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}
        >
      </div>
    `).join("");

    heroDots.innerHTML = HERO_SLIDES.map((_, i) => `
      <button
        class="heroDot ${i === 0 ? "active" : ""}"
        data-index="${i}"
        type="button"
        aria-label="Ir para slide ${i + 1}">
      </button>
    `).join("");

    bindHeroDots();
    updateHero();
  }

  function updateHero() {
    const slides = $$(".heroSlide", heroTrack);
    const dots = $$(".heroDot", heroDots);

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === heroIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === heroIndex);
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

  function startHeroTimer() {
    clearInterval(heroTimer);
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

  renderHero();
  startHeroTimer();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(heroTimer);
    } else {
      startHeroTimer();
    }
  });

  /* =========================
     ACTIVE MENU
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
     LIGHTBOX PORTFÓLIO
  ========================= */
  const portfolioCards = $$(".portfolioCard");
  const portfolioLightbox = $("#portfolioLightbox");
  const lightboxImage = $("#lightboxImage");
  const lightboxClose = $("#lightboxClose");

  function openLightbox(src, alt = "Imagem ampliada do portfólio") {
    if (!portfolioLightbox || !lightboxImage) return;
    lightboxImage.src = src;
    lightboxImage.alt = alt;
    portfolioLightbox.classList.add("show");
    body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!portfolioLightbox || !lightboxImage) return;
    portfolioLightbox.classList.remove("show");
    lightboxImage.src = "";
    body.style.overflow = "";
  }

  portfolioCards.forEach((card) => {
    card.addEventListener("click", () => {
      const full = card.dataset.full || $("img", card)?.src || "";
      const alt = $("img", card)?.alt || "Imagem ampliada do portfólio";
      if (full) openLightbox(full, alt);
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
     FORM / MODAL
  ========================= */
  const budgetModal = $("#budgetModal");
  const openBudgetModal = $("#openBudgetModal");
  const openBudgetModalTop = $("#openBudgetModalTop");
  const openBudgetModalHero = $("#openBudgetModalHero");
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

  [openBudgetModal, openBudgetModalTop, openBudgetModalHero]
    .filter(Boolean)
    .forEach((btn) => btn.addEventListener("click", openModal));

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
    const bodyText =
`Nome: ${data.name || "-"}
WhatsApp: ${data.phone || "-"}
E-mail: ${data.email || "-"}
Cidade / local: ${data.place || "-"}
Serviço desejado: ${data.service || "-"}
Medidas / escopo: ${data.measures || "-"}
Detalhes: ${data.message || "-"}`;

    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  }

  if (sendModalWhatsapp) {
    sendModalWhatsapp.addEventListener("click", () => {
      const data = getModalFormData();
      sendWhatsapp(data);
    });
  }

  /* =========================
     LINKS OPCIONAIS DE RODAPÉ
  ========================= */
  const footerWhatsapp = $("#footerWhatsapp");
  if (footerWhatsapp) {
    const msg = "Olá! Vim pelo site da Metallmec e quero solicitar um orçamento.";
    footerWhatsapp.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }

  const footerEmail = $("#footerEmail");
  if (footerEmail) {
    footerEmail.href = `mailto:${COMPANY_EMAIL}`;
  }

  /* =========================
     BOTÕES OPCIONAIS
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

  const floatWhats = $("#floatWhats");
  if (floatWhats) {
    const msg = "Olá! Vim pelo site da Metallmec e quero solicitar um orçamento.";
    floatWhats.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }

  /* =========================
     MAPA
  ========================= */
  const mapBox = $(".mapBox iframe");
  if (mapBox) {
    mapBox.setAttribute("loading", "lazy");
  }

  /* =========================
     MARCA SITE CARREGADO
  ========================= */
  window.addEventListener("load", () => {
    body.classList.add("site-loaded");
  });
})();
