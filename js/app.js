(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  const HERO_SLIDES = [
    {
      img: "img/hero-1.jpg",
      title: "Estruturas metálicas sob medida com acabamento profissional",
      desc: "Execução para residências, empresas e obras, com foco em qualidade, estrutura, prazo e presença visual forte."
    },
    {
      img: "img/hero-2.jpg",
      title: "Projetos para portões, grades e coberturas com leitura técnica",
      desc: "Soluções que unem resistência, visual profissional e adaptação ao espaço do cliente."
    },
    {
      img: "img/hero-3.jpg",
      title: "Montagem, reforço e instalação com padrão institucional",
      desc: "A Metallmec entrega projetos com presença, organização, acabamento e linguagem de empresa grande."
    },
    {
      img: "img/hero-4.jpg",
      title: "Atendimento para obras, empresas e demandas especiais",
      desc: "Estruturas metálicas sob medida com foco em funcionalidade, confiança e resistência."
    },
    {
      img: "img/hero-5.jpg",
      title: "Presença visual forte do início ao resultado final",
      desc: "Cada projeto é pensado para unir estrutura, estética e leitura profissional."
    }
  ];

  const PROJECTS = [
    { img: "img/projeto-1.jpg", title: "Portão residencial premium", desc: "Projeto com presença visual forte, estrutura reforçada e acabamento profissional." },
    { img: "img/projeto-2.jpg", title: "Grade de proteção sob medida", desc: "Solução funcional para segurança residencial com visual limpo e robusto." },
    { img: "img/projeto-3.jpg", title: "Cobertura metálica", desc: "Execução com alinhamento técnico, resistência e boa leitura arquitetônica." },
    { img: "img/projeto-4.jpg", title: "Escada e guarda-corpo", desc: "Estrutura pensada para segurança, estética e durabilidade." },
    { img: "img/projeto-5.jpg", title: "Fechamento comercial", desc: "Projeto para empresas com foco em segurança e presença profissional." },
    { img: "img/projeto-6.jpg", title: "Estrutura para obra", desc: "Montagem metálica para reforço, apoio e execução em campo." },
    { img: "img/projeto-7.jpg", title: "Portão social e acesso", desc: "Leitura visual elegante com fabricação sob medida para o cliente." },
    { img: "img/projeto-8.jpg", title: "Projeto metálico personalizado", desc: "Solução especial desenvolvida conforme necessidade real da obra." }
  ];

  const WHATSAPP = "5531983913499";
  const COMPANY_EMAIL = "contato@metallmec.com.br";

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  // =========================
  // HEADER
  // =========================
  const topbar = $("#topbar");

  function updateHeader() {
    if (!topbar) return;
    topbar.classList.toggle("scrolled", window.scrollY > 80);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // =========================
  // MOBILE MENU
  // =========================
  const menuToggle = $("#menuToggle");
  const mobileMenu = $("#mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("show");
    });

    $$("a", mobileMenu).forEach((link) => {
      link.addEventListener("click", () => mobileMenu.classList.remove("show"));
    });

    document.addEventListener("click", (e) => {
      const clickedInsideMenu = mobileMenu.contains(e.target);
      const clickedToggle = menuToggle.contains(e.target);
      if (!clickedInsideMenu && !clickedToggle) {
        mobileMenu.classList.remove("show");
      }
    });
  }

  // =========================
  // HERO
  // =========================
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
        <img src="${slide.img}" alt="${slide.title}" ${i === 0 ? 'fetchpriority="high" decoding="async"' : 'loading="lazy" decoding="async"'}>
      </div>
    `).join("");

    heroDots.innerHTML = HERO_SLIDES.map((_, i) => `
      <button class="heroDot ${i === 0 ? "active" : ""}" data-index="${i}" type="button" aria-label="Ir para slide ${i + 1}"></button>
    `).join("");

    bindHeroDots();
    updateHero();
  }

  function updateHero() {
    const slides = $$(".heroSlide", heroTrack);
    const dots = $$(".heroDot", heroDots);

    slides.forEach((slide, i) => slide.classList.toggle("active", i === heroIndex));
    dots.forEach((dot, i) => dot.classList.toggle("active", i === heroIndex));

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

  function prevHero() {
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

  if (heroPrev) heroPrev.addEventListener("click", () => { prevHero(); restartHeroTimer(); });
  if (heroNext) heroNext.addEventListener("click", () => { nextHero(); restartHeroTimer(); });

  renderHero();
  startHeroTimer();

  // =========================
  // PROJECTS
  // =========================
  const projectTrack = $("#projectTrack");
  const projectIndicators = $("#projectIndicators");
  const projectPrev = $("#projectPrev");
  const projectNext = $("#projectNext");
  let projectIndex = 0;

  const projectPages = [];
  for (let i = 0; i < PROJECTS.length; i += 2) {
    projectPages.push(PROJECTS.slice(i, i + 2));
  }

  function renderProjects() {
    if (!projectTrack || !projectIndicators) return;

    projectTrack.innerHTML = projectPages.map((page) => `
      <div class="projectSlide">
        ${page.map((item) => `
          <article class="projectCard">
            <img src="${item.img}" alt="${item.title}" loading="lazy" decoding="async">
            <div class="projectCardContent">
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
            </div>
          </article>
        `).join("")}
      </div>
    `).join("");

    projectIndicators.innerHTML = projectPages.map((_, i) => `
      <button class="projectIndicator ${i === 0 ? "active" : ""}" data-index="${i}" type="button" aria-label="Ir para página ${i + 1}"></button>
    `).join("");

    bindProjectIndicators();
    updateProjects();
  }

  function updateProjects() {
    if (!projectTrack) return;

    projectTrack.style.transform = `translateX(-${projectIndex * 100}%)`;

    $$(".projectIndicator", projectIndicators).forEach((dot, i) => {
      dot.classList.toggle("active", i === projectIndex);
    });
  }

  function bindProjectIndicators() {
    $$(".projectIndicator", projectIndicators).forEach((dot) => {
      dot.addEventListener("click", () => {
        projectIndex = Number(dot.dataset.index);
        updateProjects();
      });
    });
  }

  if (projectPrev) {
    projectPrev.addEventListener("click", () => {
      projectIndex = (projectIndex - 1 + projectPages.length) % projectPages.length;
      updateProjects();
    });
  }

  if (projectNext) {
    projectNext.addEventListener("click", () => {
      projectIndex = (projectIndex + 1) % projectPages.length;
      updateProjects();
    });
  }

  renderProjects();

  // =========================
  // ACTIVE MENU
  // =========================
  const menuLinks = $$(".navMenu a, .mobileMenu a");
  const sections = ["inicio", "quem-somos", "servicos", "projetos", "parceiros", "depoimentos", "contato"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function updateActiveMenu() {
    const scrollY = window.scrollY + 140;
    let currentId = "inicio";

    sections.forEach((sec) => {
      if (scrollY >= sec.offsetTop) currentId = sec.id;
    });

    menuLinks.forEach((link) => {
      const href = link.getAttribute("href");
      link.classList.toggle("active", href === `#${currentId}`);
    });
  }

  window.addEventListener("scroll", updateActiveMenu, { passive: true });
  updateActiveMenu();

  // =========================
  // BACK TO TOP
  // =========================
  const backToTop = $("#backToTop");

  function updateBackToTop() {
    if (!backToTop) return;
    backToTop.classList.toggle("show", window.scrollY > 500);
  }

  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // =========================
  // FLOAT WHATS
  // =========================
  const floatWhats = $("#floatWhats");

  if (floatWhats) {
    const msg = `Olá! Vim pelo site da Metallmec e quero solicitar um orçamento.`;
    floatWhats.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
  }

  // =========================
  // FORM HELPERS
  // =========================
  function buildWhatsappText(data) {
    return `Olá! Vim pelo site da Metallmec.

Nome: ${data.name || "-"}
E-mail: ${data.email || "-"}
WhatsApp: ${data.phone || "-"}
Cidade/Bairro: ${data.place || "-"}
Serviço: ${data.service || "-"}
Medidas: ${data.measures || "-"}
Mensagem: ${data.message || "-"}`;
  }

  function getMainFormData() {
    return {
      name: $("#name")?.value.trim() || "",
      email: $("#email")?.value.trim() || "",
      phone: $("#phone")?.value.trim() || "",
      place: $("#place")?.value.trim() || "",
      service: $("#service")?.value.trim() || "",
      measures: $("#measures")?.value.trim() || "",
      message: $("#message")?.value.trim() || ""
    };
  }

  function getModalFormData() {
    return {
      name: $("#mName")?.value.trim() || "",
      email: $("#mEmail")?.value.trim() || "",
      phone: $("#mPhone")?.value.trim() || "",
      place: $("#mPlace")?.value.trim() || "",
      service: $("#mService")?.value.trim() || "",
      measures: "",
      message: $("#mMessage")?.value.trim() || ""
    };
  }

  function sendWhatsapp(data) {
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildWhatsappText(data))}`;
    window.open(url, "_blank");
  }

  function sendEmail(data) {
    const subject = `Orçamento - Metallmec`;
    const body =
`Nome: ${data.name || "-"}
E-mail: ${data.email || "-"}
WhatsApp: ${data.phone || "-"}
Cidade/Bairro: ${data.place || "-"}
Serviço: ${data.service || "-"}
Medidas: ${data.measures || "-"}
Mensagem: ${data.message || "-"}`;

    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  const sendWhatsappBtn = $("#sendWhatsapp");
  const sendEmailBtn = $("#sendEmail");

  if (sendWhatsappBtn) {
    sendWhatsappBtn.addEventListener("click", () => sendWhatsapp(getMainFormData()));
  }

  if (sendEmailBtn) {
    sendEmailBtn.addEventListener("click", () => sendEmail(getMainFormData()));
  }

  // =========================
  // MODAL
  // =========================
  const budgetModal = $("#budgetModal");
  const openBudgetModal = $("#openBudgetModal");
  const openBudgetModalTop = $("#openBudgetModalTop");
  const closeBudgetModal = $("#closeBudgetModal");
  const modalWhatsapp = $("#modalWhatsapp");
  const modalEmail = $("#modalEmail");

  function openModal() {
    if (!budgetModal) return;
    budgetModal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!budgetModal) return;
    budgetModal.classList.remove("show");
    document.body.style.overflow = "";
  }

  if (openBudgetModal) openBudgetModal.addEventListener("click", openModal);
  if (openBudgetModalTop) openBudgetModalTop.addEventListener("click", openModal);
  if (closeBudgetModal) closeBudgetModal.addEventListener("click", closeModal);

  if (budgetModal) {
    budgetModal.addEventListener("click", (e) => {
      if (e.target === budgetModal) closeModal();
    });
  }

  if (modalWhatsapp) {
    modalWhatsapp.addEventListener("click", () => sendWhatsapp(getModalFormData()));
  }

  if (modalEmail) {
    modalEmail.addEventListener("click", () => sendEmail(getModalFormData()));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // =========================
  // OTIMIZAÇÃO DE CARREGAMENTO
  // =========================
  window.addEventListener("load", () => {
    document.body.classList.add("site-loaded");
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(heroTimer);
    } else {
      startHeroTimer();
    }
  });
})();
