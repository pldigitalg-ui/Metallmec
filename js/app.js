(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));

  const site = window.SITE || {};
  const c = site.contact || {};

  // Ano
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Helpers seguros
  const safeText = (el, text) => { if (el) el.textContent = text || ""; };

  // Topbar links
  const topPhone = $("#topPhone");
  const topMail = $("#topMail");

  if (topPhone) {
    const phoneDigits = (c.phoneCall || "").replace(/\D/g, "");
    topPhone.href = phoneDigits ? `tel:+${phoneDigits}` : "#";
    const lastSpan = topPhone.querySelector("span:last-child");
    safeText(lastSpan, c.phoneLabel || "");
  }

  if (topMail) {
    topMail.href = c.email ? `mailto:${c.email}` : "#";
    const lastSpan = topMail.querySelector("span:last-child");
    safeText(lastSpan, c.email || "");
  }

  // WhatsApp link builder
  function wppLink(text) {
    const phone = (c.whatsapp || "").replace(/\D/g, "");
    if (!phone) return "#";
    return `https://wa.me/${phone}?text=${encodeURIComponent(text || "")}`;
  }

  // CTAs
  const baseOrc =
    `Olá! Vim pelo site da ${site.brand || "Metallmec"}.\n` +
    `Quero solicitar um orçamento.\n\n` +
    `Produto/Serviço:\nCidade/UF:\nDetalhes:`;

  ["#btnOrcamentoTop", "#btnOrcamentoBottom", "#wppFloat", "#btnWhatsQuick"].forEach((id) => {
    const el = $(id);
    if (el) el.href = wppLink(baseOrc);
  });

  // MENU mobile
  const nav = $("#nav");
  const navToggle = $("#navToggle");
  if (nav && navToggle) {
    navToggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  }

  // HEADER inteligente (funciona com os 2 modos)
  const header = $("#header");
  const hero = $("#topo");

  function updateHeader() {
    if (!header) return;

    // se seu HTML já estiver forçando header--scrolled, não precisa mexer
    // mas se quiser manter o efeito inteligente, deixa rodando:
    const y = window.scrollY || 0;
    const trigger = hero ? hero.offsetHeight - 120 : 240;
    header.classList.toggle("header--scrolled", y > trigger);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // HERO SLIDER (setas + dots)
  const slidesWrap = $("#heroSlides");
  const dotsWrap = $("#heroDots");
  const prevBtn = $("#heroPrev");
  const nextBtn = $("#heroNext");

  const imgs = Array.isArray(site.heroImages) ? site.heroImages : [];
  let i = 0;
  let timer = null;

  function renderSlides() {
    if (!slidesWrap || imgs.length === 0) return;

    slidesWrap.innerHTML = imgs
      .map((src, idx) =>
        `<div class="hero__slide ${idx === 0 ? "is-on" : ""}" style="background-image:url('${src}')"></div>`
      )
      .join("");

    if (dotsWrap) {
      dotsWrap.innerHTML = imgs
        .map((_, idx) => `<button class="dot ${idx === 0 ? "is-on" : ""}" aria-label="Banner ${idx + 1}"></button>`)
        .join("");

      dotsWrap.querySelectorAll(".dot").forEach((d, idx) => {
        d.addEventListener("click", () => go(idx, true));
      });
    }
  }

  function go(next, user = false) {
    if (!slidesWrap) return;
    const slides = slidesWrap.querySelectorAll(".hero__slide");
    const dots = dotsWrap ? dotsWrap.querySelectorAll(".dot") : [];
    if (!slides.length) return;

    slides[i].classList.remove("is-on");
    if (dots[i]) dots[i].classList.remove("is-on");

    i = (next + imgs.length) % imgs.length;

    slides[i].classList.add("is-on");
    if (dots[i]) dots[i].classList.add("is-on");

    if (user) restart();
  }

  function restart() {
    if (timer) clearInterval(timer);
    if (imgs.length > 1) timer = setInterval(() => go(i + 1), 5200);
  }

  if (prevBtn) prevBtn.addEventListener("click", () => go(i - 1, true));
  if (nextBtn) nextBtn.addEventListener("click", () => go(i + 1, true));

  renderSlides();
  restart();

  // Parallax leve (premium, sem exagero)
  if (slidesWrap) {
    window.addEventListener(
      "scroll",
      () => {
        const y = window.scrollY || 0;
        const move = Math.min(18, y * 0.06);
        slidesWrap.style.transform = `translateY(${move}px)`;
      },
      { passive: true }
    );
  }

  // Render Serviços
  const servicesGrid = $("#servicesGrid");
  if (servicesGrid && Array.isArray(site.services)) {
    servicesGrid.innerHTML = site.services
      .map(
        (s) => `
      <article class="card">
        <div class="card__icon">${s.icon || "⚙️"}</div>
        <h3>${s.title || ""}</h3>
        <p class="muted">${s.desc || ""}</p>
        <div class="card__meta">
          ${(s.tags || []).slice(0, 3).map((t) => `<span class="tag">${t}</span>`).join("")}
        </div>
      </article>
    `
      )
      .join("");
  }

  // Render Projetos
  const projectsGrid = $("#projectsGrid");
  if (projectsGrid && Array.isArray(site.projects)) {
    projectsGrid.innerHTML = site.projects
      .map(
        (p) => `
      <article class="card">
        <h3>${p.title || ""}</h3>
        <p class="muted">${p.desc || ""}</p>
        <div class="card__meta">
          <span class="tag">${p.tag || "Entrega"}</span>
          <span class="tag">Qualidade</span>
        </div>
      </article>
    `
      )
      .join("");
  }

  // Render Produtos + pesquisa
  const productsGrid = $("#productsGrid");
  const productSearch = $("#productSearch");

  function renderProducts(list) {
    if (!productsGrid) return;
    const arr = Array.isArray(list) ? list : [];
    productsGrid.innerHTML = arr
      .map((p) => {
        const msg =
          `Olá! Vim pelo site da ${site.brand || "Metallmec"}.\n` +
          `Quero orçamento do produto: ${p.title || ""}\n\n` +
          `Detalhes:\nCidade/UF:`;
        return `
        <article class="card">
          <h3>${p.title || ""}</h3>
          <p class="muted">${p.desc || ""}</p>
          <div class="card__meta">
            <span class="tag">${p.tag || "Produto"}</span>
            <span class="tag">Orçamento rápido</span>
          </div>
          <div style="margin-top:12px">
            <a class="btn btn--small" href="${wppLink(msg)}">Pedir orçamento</a>
          </div>
        </article>
      `;
      })
      .join("");
  }

  const allProducts = Array.isArray(site.products) ? site.products : [];
  renderProducts(allProducts);

  if (productSearch) {
    productSearch.addEventListener("input", () => {
      const q = (productSearch.value || "").toLowerCase().trim();
      if (!q) return renderProducts(allProducts);

      const filtered = allProducts.filter((p) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.desc || "").toLowerCase().includes(q) ||
        (p.tag || "").toLowerCase().includes(q)
      );

      renderProducts(filtered);
    });
  }

  // Contato
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
          <div class="v"><a href="${wppLink(baseOrc)}">Abrir conversa</a></div>
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
})();
