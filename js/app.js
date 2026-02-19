// ======= HERO SLIDER com setas + dots
const slidesWrap = document.querySelector("#heroSlides");
const dotsWrap = document.querySelector("#heroDots");
const prevBtn = document.querySelector("#heroPrev");
const nextBtn = document.querySelector("#heroNext");

const imgs = (window.SITE && window.SITE.heroImages) ? window.SITE.heroImages : [];
let i = 0;
let timer = null;

function renderSlides(){
  if(!slidesWrap || imgs.length === 0) return;

  slidesWrap.innerHTML = imgs.map((src, idx)=>(
    `<div class="hero__slide ${idx===0?"is-on":""}" style="background-image:url('${src}')"></div>`
  )).join("");

  if(dotsWrap){
    dotsWrap.innerHTML = imgs.map((_, idx)=>(
      `<button class="dot ${idx===0?"is-on":""}" aria-label="Banner ${idx+1}"></button>`
    )).join("");

    dotsWrap.querySelectorAll(".dot").forEach((d, idx)=>{
      d.addEventListener("click", ()=>go(idx, true));
    });
  }
}

function go(next, user=false){
  const slides = slidesWrap ? slidesWrap.querySelectorAll(".hero__slide") : [];
  const dots = dotsWrap ? dotsWrap.querySelectorAll(".dot") : [];
  if(!slides.length) return;

  slides[i].classList.remove("is-on");
  if(dots[i]) dots[i].classList.remove("is-on");

  i = (next + imgs.length) % imgs.length;

  slides[i].classList.add("is-on");
  if(dots[i]) dots[i].classList.add("is-on");

  if(user) restart();
}

function restart(){
  if(timer) clearInterval(timer);
  if(imgs.length > 1) timer = setInterval(()=>go(i+1), 5200);
}

if(prevBtn) prevBtn.addEventListener("click", ()=>go(i-1, true));
if(nextBtn) nextBtn.addEventListener("click", ()=>go(i+1, true));

renderSlides();
restart();
