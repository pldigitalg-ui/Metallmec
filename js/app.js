(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ======= MENU MOBILE
  const nav = $("#nav");
  const navToggle = $("#navToggle");
  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // fecha ao clicar em link
    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  }

  // ======= DADOS
  const site = window.SITE || {};
  const c = (site.contact || {});

  // Topbar contatos
  const topPhone = $("#topPhone");
  const topMail = $("#topMail");
  if (topPhone) topPhone.href = `tel:+${c.phoneCall || ""}`;
  if (topPhone) topPhone.querySelector("span:last-child").textContent = c.phoneLabel || "(31) 0000-0000";
  if (topMail) topMail.href = `mailto:${c.email || ""}`;
  if (topMail) topMail.querySelector("span:last-child").textContent = c.email || "contato@metallmec.com.br";

  // WhatsApp builder
  function wppLink(text) {
    const phone = (c.whatsapp || "").replace(/\D/g, "");
    const msg = encodeURIComponent(text || "");
    return `https://wa.me/${phone}?text=${msg}`;
  }

  // CTAs
  const orcamentoText = `Olá! Vim pelo site da ${site.brand || "Metallmec"}.\nQuero solicitar um orçamento.\n\nServiço:\nCidade/UF:\nDetalhes:`;
  ["#btnOrcamentoHero", "#btnOrcamentoTop", "#btnOrcamentoBottom", "#wppFloat", "#btnWhatsQuick"].forEach((id) => {
    const el = $(id);
    if (el) el.href = wppLink(orcamentoText);
  });

  // ======= HERO SLIDER (leve, premium)
  const slidesWrap = $("#heroSlides");
  const dotsWrap = $("#heroDots");
  const imgs = site.heroImages || [];
  let i = 0;
  let timer = null;

  function renderSlides() {
    if (!slidesWrap || imgs.length === 0) return;
    slidesWrap.innerHTML = imgs.map((src, idx) => (
      `<div class="hero__slide ${idx === 0 ? "is-on" : ""}" style="background-image:url('${src}')"></div>`
    )).join("");

    if (dotsWrap) {
      dotsWrap.innerHTML = imgs.map((_, idx) => `<button class="dot ${idx === 0 ? "is-on" : ""}" aria-label="Banner ${idx+1}"></button>`).join("");
      $$("#heroDots .dot").forEach((d, idx) => {
        d.addEventListener("click", () => go(idx, true));
      });
    }
  }

  function go(next, user = false) {
    const slides = $$("#heroSlides .hero__slide");
    const dots = $$("#heroDots .dot");
    if (slides.length === 0) return;

    slides[i].classList.remove("is-on");
    if (dots[i]) dots[i].classList.remove("is-on");

    i = next;
    slides[i].classList.add("is-on");
    if (dots[i]) dots[i].classList.add("is-on");

    if (user) restart();
  }

  function tick() {
    const next = (i + 1) % imgs.length;
    go(next);
  }

  function restart() {
    if (timer) clearInterval(timer);
    timer = setInterval(tick, 5200);
  }

  renderSlides();
  if (imgs.length > 1) restart();

  // ======= SERVICES
  const servicesGrid = $("#servicesGrid");
  if (servicesGrid && Array.isArray(site.services)) {
    servicesGrid.innerHTML = site.services.map(s => `
      <article class="card">
        <div class="card__icon">${s.icon || "⚙️"}</div>
        <h3>${s.title || ""}</h3>
        <p class="muted">${s.desc || ""}</p>
        <div class="card__meta">
          ${(s.tags || []).slice(0, 3).map(t => `<span class="tag">${t}</span>`).join("")}
        </div>
      </article>
    `).join("");
  }

  // ======= PROJECTS
  const projectsGrid = $("#projectsGrid");
  if (projectsGrid && Array.isArray(site.projects)) {
    projectsGrid.innerHTML = site.projects.map(p => `
      <article class="card">
        <h3>${p.title || ""}</h3>
        <p class="muted">${p.desc || ""}</p>
        <div class="card__meta">
          <span class="tag">${p.tag || "Entrega"}</span>
          <span class="tag">Qualidade</span>
        </div>
      </article>
    `).join("");
  }

  // ======= STEPS
  const stepsGrid = $("#stepsGrid");
  if (stepsGrid && Array.isArray(site.steps)) {
    stepsGrid.innerHTML = site.steps.map((st, idx) => `
      <div class="step">
        <div class="step__n">0${idx+1}</div>
        <h3>${st.title || ""}</h3>
        <p>${st.desc || ""}</p>
      </div>
    `).join("");
  }

  // ======= CONTACT LIST
  const contactList = $("#contactList");
  if (contactList) {
    const phoneHref = `tel:+${(c.phoneCall || "").replace(/\D/g, "")}`;
    const mailHref = `mailto:${c.email || ""}`;

    contactList.innerHTML = `
      <div class="contactItem">
        <div>📞</div>
        <div>
          <div class="k">Telefone</div>
          <div class="v"><a href="${phoneHref}">${c.phoneLabel || ""}</a></div>
          <div class="m">Clique para ligar</div>
        </div>
      </div>

      <div class="contactItem">
        <div>💬</div>
        <div>
          <div class="k">WhatsApp</div>
          <div class="v"><a href="${wppLink(orcamentoText)}">Abrir conversa</a></div>
          <div class="m">Mensagem pronta para orçamento</div>
        </div>
      </div>

      <div class="contactItem">
        <div>✉️</div>
        <div>
          <div class="k">E-mail</div>
          <div class="v"><a href="${mailHref}">${c.email || ""}</a></div>
          <div class="m">Envie sua solicitação</div>
        </div>
      </div>

      <div class="contactItem">
        <div>📍</div>
        <div>
          <div class="k">Atendimento</div>
          <div class="v">${c.city || "Brasil"}</div>
          <div class="m">Atendimento em todo o território nacional</div>
        </div>
      </div>
    `;
  }

  // ======= FORM -> WhatsApp
  const form = $("#leadForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const nome = (fd.get("nome") || "").toString().trim();
      const empresa = (fd.get("empresa") || "").toString().trim();
      const servico = (fd.get("servico") || "").toString().trim();
      const msg = (fd.get("mensagem") || "").toString().trim();

      if (!nome || !msg) {
        alert("Preencha seu nome e a mensagem.");
        return;
      }

      const text =
        `Olá! Meu nome é ${nome}${empresa ? ` (${empresa})` : ""}.\n` +
        `Vim pelo site da ${site.brand || "Metallmec"}.\n\n` +
        `Serviço: ${servico}\n` +
        `Mensagem: ${msg}\n\n` +
        `Cidade/UF:`;

      window.location.href = wppLink(text);
    });
  }
})();

