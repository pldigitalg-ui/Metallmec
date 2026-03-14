/* js/data.js */
window.SITE = {
  brand: "Metallmec Engenharia e Serviços",
  tagline: "Soluções metálicas com engenharia, estrutura e acabamento profissional",
  subtitle: "Projetos, fabricação, montagem e instalação para residências, empresas e obras em Belo Horizonte e região.",

  contact: {
    phoneLabel: "(31) 98391-3499",
    phoneCall: "553183913499",
    email: "contato@metallmec.com.br",
    city: "Belo Horizonte - MG • BH e região",
    whatsapp: "553183913499"
  },

  /* HERO */
  heroImages: [
    "img/herois.jpg",
    "img/herois-2.jpg",
    "img/herois-3.jpg"
  ],

  /* SERVIÇOS PRINCIPAIS / APOIO INSTITUCIONAL */
  products: [
    {
      title: "Portões e acessos",
      desc: "Projetos sob medida para residências, empresas e entradas sociais.",
      tag: "Sob medida"
    },
    {
      title: "Grades de proteção",
      desc: "Soluções metálicas para segurança residencial, comercial e industrial.",
      tag: "Proteção"
    },
    {
      title: "Escadas e guarda-corpo",
      desc: "Execução com reforço estrutural, alinhamento e acabamento profissional.",
      tag: "Estrutura"
    },
    {
      title: "Coberturas metálicas",
      desc: "Estruturas para coberturas com montagem técnica e visual profissional.",
      tag: "Cobertura"
    },
    {
      title: "Estruturas metálicas",
      desc: "Fabricação e montagem para obras, ampliações e reforços estruturais.",
      tag: "Obras"
    },
    {
      title: "Projetos especiais",
      desc: "Desenvolvimento sob demanda conforme medida, desenho ou referência visual.",
      tag: "Personalizado"
    }
  ],

  /* BLOCOS DE SERVIÇO */
  services: [
    {
      icon: "⚙️",
      title: "Fabricação sob medida",
      desc: "Portões, grades, estruturas e peças metálicas conforme necessidade do projeto.",
      tags: ["Medida", "Precisão", "Acabamento"]
    },
    {
      icon: "🏗️",
      title: "Estruturas metálicas",
      desc: "Execução de estruturas para obras, reforços e aplicações residenciais ou comerciais.",
      tags: ["Obra", "Reforço", "Montagem"]
    },
    {
      icon: "🚪",
      title: "Portões e acessos",
      desc: "Portões de correr, abrir, sociais e soluções de acesso com acabamento profissional.",
      tags: ["Residencial", "Comercial", "Instalação"]
    },
    {
      icon: "🪜",
      title: "Escadas e guarda-corpo",
      desc: "Soluções metálicas com segurança, alinhamento e visual robusto.",
      tags: ["Segurança", "Estrutura", "Detalhe"]
    },
    {
      icon: "🏠",
      title: "Coberturas e fechamentos",
      desc: "Coberturas, fechamentos e composições metálicas para diferentes aplicações.",
      tags: ["Cobertura", "Proteção", "Execução"]
    },
    {
      icon: "🛠️",
      title: "Serviços personalizados",
      desc: "Você envia foto, medida ou referência, e a Metallmec executa a melhor solução.",
      tags: ["Projeto", "Sob demanda", "Atendimento"]
    }
  ],

  /* PORTFÓLIO / PROJETOS */
  projects: [
    {
      title: "Portão premium residencial",
      desc: "Projeto sob medida com acabamento alinhado ao visual do imóvel.",
      tag: "Portões"
    },
    {
      title: "Grade residencial",
      desc: "Solução metálica para proteção e valorização do ambiente.",
      tag: "Grades"
    },
    {
      title: "Escada e guarda-corpo",
      desc: "Execução com reforço estrutural, segurança e acabamento profissional.",
      tag: "Escadas"
    },
    {
      title: "Cobertura metálica",
      desc: "Estrutura para proteção com montagem técnica e estética limpa.",
      tag: "Coberturas"
    },
    {
      title: "Estrutura para obra",
      desc: "Aplicação metálica para suporte, reforço e desenvolvimento de obra.",
      tag: "Estruturas"
    },
    {
      title: "Projeto comercial",
      desc: "Execução sob medida para empresas, lojas e aplicações especiais.",
      tag: "Comercial"
    }
  ]
};

/* SAFETY */
(() => {
  const s = window.SITE || {};

  if (!Array.isArray(s.heroImages)) s.heroImages = [];
  s.heroImages = s.heroImages.filter(Boolean);

  if (s.heroImages.length === 0) {
    s.heroImages = ["img/herois.jpg"];
  }

  if (!Array.isArray(s.products)) s.products = [];
  if (!Array.isArray(s.services)) s.services = [];
  if (!Array.isArray(s.projects)) s.projects = [];
})();
