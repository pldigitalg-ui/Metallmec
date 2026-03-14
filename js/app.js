(() => {

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

const site = window.SITE || {};
const c = site.contact || {};


// =========================
// ANO AUTOMÁTICO
// =========================
const year = $("#year");
if(year) year.textContent = new Date().getFullYear();


// =========================
// WHATSAPP LINK
// =========================
function wppLink(text){
  const phone = (c.whatsapp || "").replace(/\D/g,"");
  if(!phone) return "#";
  return `https://wa.me/${phone}?text=${encodeURIComponent(text || "")}`;
}

const baseMsg =
`Olá! Vim pelo site da ${site.brand || "Metallmec"}.
Gostaria de solicitar um orçamento.

Serviço:
Cidade/Bairro:
Detalhes:`;


// =========================
// BOTÕES WHATSAPP
// =========================

const wppFloat = $(".waFloat a");

if(wppFloat){
  wppFloat.href = wppLink(baseMsg);
}


// =========================
// HERO BACKGROUND
// =========================

const hero = $(".heroMedia");

if(hero && Array.isArray(site.heroImages)){

  let i = 0;
  const imgs = site.heroImages;

  hero.style.backgroundImage = `url(${imgs[0]})`;

  if(imgs.length > 1){

    setInterval(()=>{

      i = (i+1) % imgs.length;

      hero.style.backgroundImage = `url(${imgs[i]})`;

    },6000);

  }

}


// =========================
// MENU ATIVO
// =========================

const navLinks = $$(".topNav a");

navLinks.forEach(link=>{
  link.addEventListener("click",()=>{

    navLinks.forEach(l=>l.classList.remove("active"));

    link.classList.add("active");

  });
});


// =========================
// HEADER SCROLL
// =========================

const header = $(".topbar");

function updateHeader(){

  const y = window.scrollY || 0;

  if(!header) return;

  header.classList.toggle("scrolled", y > 120);

}

updateHeader();

window.addEventListener("scroll",updateHeader,{passive:true});


// =========================
// PARALLAX HERO
// =========================

if(hero){

window.addEventListener("scroll",()=>{

  const y = window.scrollY || 0;

  const move = Math.min(20, y * 0.05);

  hero.style.transform = `translateY(${move}px)`;

},{passive:true});

}


// =========================
// RENDER SERVIÇOS
// =========================

const servicesGrid = $("#servicesGrid");

if(servicesGrid && Array.isArray(site.services)){

servicesGrid.innerHTML = site.services.map(s=>`

<article class="card">

<div class="card__icon">${s.icon || "⚙️"}</div>

<h3>${s.title || ""}</h3>

<p class="muted">${s.desc || ""}</p>

<div class="card__meta">
${(s.tags || []).slice(0,3).map(t=>`<span class="tag">${t}</span>`).join("")}
</div>

</article>

`).join("");

}


// =========================
// RENDER PROJETOS
// =========================

const projectsGrid = $("#projectsGrid");

if(projectsGrid && Array.isArray(site.projects)){

projectsGrid.innerHTML = site.projects.map(p=>`

<article class="card">

<h3>${p.title || ""}</h3>

<p class="muted">${p.desc || ""}</p>

<div class="card__meta">

<span class="tag">${p.tag || "Projeto"}</span>

<span class="tag">Metallmec</span>

</div>

</article>

`).join("");

}


// =========================
// CONTATO
// =========================

const contactList = $("#contactList");

if(contactList){

const phoneHref = `tel:+${(c.phoneCall || "").replace(/\D/g,"")}`;

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
<div class="v"><a href="${wppLink(baseMsg)}">Abrir conversa</a></div>
<div class="m">Mensagem pronta para orçamento</div>
</div>
</div>

<div class="contactItem">
<div>✉️</div>
<div>
<div class="k">E-mail</div>
<div class="v"><a href="mailto:${c.email || ""}">${c.email || ""}</a></div>
<div class="m">Envie sua solicitação</div>
</div>
</div>

<div class="contactItem">
<div>📍</div>
<div>
<div class="k">Atendimento</div>
<div class="v">${c.city || ""}</div>
<div class="m">Belo Horizonte e região</div>
</div>
</div>

`;

}

})();
