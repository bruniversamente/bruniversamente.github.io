document.documentElement.classList.add("js-ready");

const revealItems = document.querySelectorAll(".reveal");
const animatedVisuals = document.querySelectorAll(".hero-lab, .case-feature, .proof-rail");
const countItems = document.querySelectorAll(".count-up");
const siteHeader = document.querySelector(".site-header");
const languageButtons = document.querySelectorAll("[data-lang-option]");

const translations = {
  pt: {
    lang: "pt-BR",
    title: "Bruno Nascimento | Dados, BI e IA aplicada",
    description: "Portfólio de Bruno Nascimento: projetos práticos de Dados, BI, Product Analytics, qualidade de dados e IA aplicada, com SQL, Python, DuckDB e Power BI.",
    texts: {
      ".skip-link": "Pular para os cases",
      ".brand-copy strong": "Bruno Nascimento",
      ".brand-copy small": "Dados, BI e IA aplicada",
      ".nav a[href=\"#cases\"]": "Projetos",
      ".nav a[href=\"#metodo\"]": "Método",
      ".nav a[href=\"#stack\"]": "Stack",
      ".nav a[href=\"#contato\"]": "Contato",
      ".role-line": "Portfólio de Dados, BI, MIS, Produto e IA aplicada",
      ".hero h1": "Análises confiáveis para decisões de negócio.",
      ".hero-text": "Sou Bruno Nascimento, de Curitiba/PR. Desenvolvo análises, consultas, validações e dashboards que conectam dados operacionais a indicadores úteis para áreas de negócio.",
      ".hero .hero-actions .button.primary": "Ver cases",
      ".lab-topbar em": "simulação",
      ".workflow-steps span:nth-child(1)": "briefing",
      ".workflow-steps span:nth-child(2)": "python",
      ".workflow-steps span:nth-child(3)": "resultado",
      ".workflow-steps span:nth-child(4)": "dashboard",
      ".notebook-panel .panel-label small": "notebook",
      ".notebook-panel .panel-label strong": "margem_analysis.ipynb",
      ".workflow-question": "Pergunta: onde a margem cai antes da receita parecer um problema?",
      ".result-panel .panel-label small": "resultado",
      ".result-panel .panel-label strong": "3 sinais priorizados",
      ".result-table > div:nth-child(1) span:nth-child(1)": "canal",
      ".result-table > div:nth-child(1) span:nth-child(2)": "categoria",
      ".result-table > div:nth-child(1) span:nth-child(3)": "margem",
      ".result-table > div:nth-child(2) span:nth-child(2)": "Eletrônicos",
      ".result-table > div:nth-child(3) span:nth-child(2)": "Moda",
      ".result-table > div:nth-child(4) span:nth-child(2)": "Casa",
      ".insight-card small": "insight",
      ".insight-card strong": "margem abaixo da meta",
      ".insight-card span": "2 canais críticos",
      ".mini-dashboard-title small": "preview executivo",
      ".workflow-caption": "Representação fictícia de um fluxo de análise: pergunta de negócio, código, validação e entrega visual.",
      ".proof-rail div:nth-child(1) span": "repositórios com dados sintéticos, SQL e documentação",
      ".proof-rail div:nth-child(2) span": "KPI, margem, meta, storytelling e blueprint de dashboard",
      ".proof-rail div:nth-child(3) strong": "Produto",
      ".proof-rail div:nth-child(3) span": "funil, retenção, cohorts e métricas de marketplace",
      ".proof-rail div:nth-child(4) span": "avaliação de respostas, curadoria e melhoria de prompts",
      "#cases .section-kicker span": "Projetos em destaque",
      "#cases .section-kicker p": "Cases com problema de negócio, modelo de dados, consultas SQL, validações, documentação e proposta de dashboard.",
      ".dash-title-row span": "Vendas e margem",
      ".dash-kpis div:nth-child(1) small": "Receita líquida",
      ".dash-kpis div:nth-child(1) span": "+12% vs meta",
      ".dash-kpis div:nth-child(2) small": "Margem",
      ".dash-kpis div:nth-child(2) span": "2,1 p.p. abaixo",
      ".dash-kpis div:nth-child(3) small": "Ticket médio",
      ".dash-kpis div:nth-child(3) span": "varejo multicanal",
      ".dash-card-title span": "Receita por canal",
      ".dash-main .dash-chart-card:nth-child(2) .dash-card-title span": "Margem vs meta",
      ".dash-legend span:nth-child(1)": "real",
      ".dash-legend span:nth-child(2)": "meta",
      ".dash-alerts span:nth-child(1)": "Margem abaixo da meta em 2 canais",
      ".dash-alerts span:nth-child(2)": "Categoria com alto volume e baixa rentabilidade",
      ".dash-table-head span:nth-child(1)": "Categoria",
      ".dash-table-head span:nth-child(2)": "Receita",
      ".dash-table-head span:nth-child(3)": "Margem",
      ".dash-table > div:nth-child(2) span": "Eletrônicos",
      ".dash-table > div:nth-child(3) span": "Casa",
      ".dash-table > div:nth-child(4) span": "Moda",
      ".case-copy .case-meta span:nth-child(1)": "Case principal",
      ".case-copy h2": "Playzone: funil, retenção e liquidez",
      ".case-copy > p": "Estudo de caso para diagnosticar se usuários chegam ao momento de valor em uma plataforma de experiências, jogos e atividades: reserva confirmada após descoberta de oportunidade e envio de convite.",
      ".case-proof-grid div:nth-child(1) strong": "Problema",
      ".case-proof-grid div:nth-child(1) span": "ativação baixa e perda relevante antes do convite enviado",
      ".case-proof-grid div:nth-child(2) strong": "Entrega",
      ".case-proof-grid div:nth-child(2) span": "funil ordenado, cohorts de retenção, liquidez por categoria, outputs CSV e dashboard HTML",
      ".case-copy .text-link": "Abrir repositório",
      ".case-card:nth-child(1) .case-meta span:nth-child(1)": "BI / MIS",
      ".case-card:nth-child(1) .case-meta span:nth-child(2)": "Vendas + margem",
      ".case-card:nth-child(1) h3": "Dashboard executivo de vendas e margem",
      ".case-card:nth-child(1) p": "Modelo analítico, KPIs comerciais, medidas DAX e blueprint de dashboard para receita, margem, metas, canais e categorias.",
      ".case-card:nth-child(1) .text-link": "Ver case",
      ".case-card:nth-child(2) .case-meta span:nth-child(1)": "IA aplicada",
      ".case-card:nth-child(2) .case-meta span:nth-child(2)": "Qualidade",
      ".case-card:nth-child(2) h3": "Análise de qualidade de respostas de IA",
      ".case-card:nth-child(2) p": "Framework para revisar respostas, classificar erros, comparar versões de prompt e transformar curadoria em indicadores.",
      ".case-card:nth-child(2) .text-link": "Ver case",
      ".case-card:nth-child(3) .case-meta span:nth-child(1)": "Data Quality",
      ".case-card:nth-child(3) h3": "Pipeline analítico com checagens de qualidade",
      ".case-card:nth-child(3) p": "Pipeline local com Python, DuckDB e SQL para ingestão, staging, validações, marts e monitoramento de problemas.",
      ".case-card:nth-child(3) .text-link": "Ver case",
      ".evidence-section .section-kicker span": "O que o recrutador encontra",
      ".evidence-section .section-kicker p": "Cada repositório apresenta contexto, premissas, consultas, validações e entregáveis de forma objetiva.",
      ".evidence-item:nth-child(1) h3": "Pergunta de negócio",
      ".evidence-item:nth-child(1) p": "Definição do problema, das métricas e dos critérios de sucesso da análise.",
      ".evidence-item:nth-child(2) h3": "Dados e regras",
      ".evidence-item:nth-child(2) p": "Bases sintéticas, dicionário, regras de cálculo e premissas documentadas.",
      ".evidence-item:nth-child(3) h3": "SQL reproduzível",
      ".evidence-item:nth-child(3) p": "Consultas separadas por schema, qualidade, KPIs, funil, cohorts ou marts.",
      ".evidence-item:nth-child(4) h3": "Entrega explicável",
      ".evidence-item:nth-child(4) p": "Blueprints de dashboard e recomendações para conectar insight com decisão.",
      ".method-copy .section-label": "Método",
      ".method-copy h2": "Clareza antes do gráfico.",
      ".method-copy p": "Antes de construir visualizações, defino a pergunta de negócio, as regras de cálculo, a qualidade dos dados e a melhor forma de comunicar o indicador.",
      ".timeline-item:nth-child(1) h3": "Entender",
      ".timeline-item:nth-child(1) p": "Qual decisão precisa ser tomada? Qual KPI muda a conversa?",
      ".timeline-item:nth-child(2) h3": "Modelar",
      ".timeline-item:nth-child(2) p": "Separar granularidade, joins, dimensões, fatos e regras de cálculo.",
      ".timeline-item:nth-child(3) h3": "Validar",
      ".timeline-item:nth-child(3) p": "Checar duplicidade, nulos, integridade, totais e desvios antes de publicar.",
      ".timeline-item:nth-child(4) h3": "Comunicar",
      ".timeline-item:nth-child(4) p": "Apresentar contexto, insight, risco e próxima ação de forma direta.",
      "#stack .section-kicker span": "Stack",
      "#stack .section-kicker p": "Ferramentas aplicadas nos projetos e em rotinas de análise, BI, produto e qualidade de dados.",
      ".stack-board > div:nth-child(1) h3": "Análise e BI",
      ".stack-board > div:nth-child(1) li:nth-child(1)": "SQL para KPI, funil, cohort, joins e validações",
      ".stack-board > div:nth-child(1) li:nth-child(2)": "Power BI, DAX, Power Query e storytelling",
      ".stack-board > div:nth-child(1) li:nth-child(3)": "Métricas comerciais, produto, MIS e operação",
      ".stack-board > div:nth-child(2) h3": "Dados e automação",
      ".stack-board > div:nth-child(2) li:nth-child(1)": "Python, Pandas e geração de dados sintéticos",
      ".stack-board > div:nth-child(2) li:nth-child(2)": "DuckDB e BigQuery como engines analíticas",
      ".stack-board > div:nth-child(2) li:nth-child(3)": "Data quality, contratos e marts para BI",
      ".stack-board > div:nth-child(3) h3": "Produto e IA",
      ".stack-board > div:nth-child(3) li:nth-child(1)": "Tracking plan, eventos e análise de jornada",
      ".stack-board > div:nth-child(3) li:nth-child(2)": "Avaliação de respostas, prompts e curadoria",
      ".stack-board > div:nth-child(3) li:nth-child(3)": "Documentação que ajuda time técnico e negócio",
      ".about-panel .section-label": "Sobre",
      ".about-panel h2": "Perfil analítico com foco em negócio.",
      ".about-panel p:nth-of-type(1)": "Meu foco profissional está em transformar dados operacionais em leituras úteis para áreas de negócio, produto, operação e gestão.",
      ".about-panel p:nth-of-type(2)": "Este portfólio demonstra prática em organização de dados, SQL, documentação, validação de métricas e comunicação de resultados.",
      ".contact-panel > p": "Curitiba/PR · remoto, híbrido ou presencial conforme oportunidade",
      ".contact-panel h2": "Se sua equipe precisa transformar dados e indicadores em análises claras, vamos conversar.",
      ".site-footer p": "© 2026 Bruno Nascimento. Portfólio estático publicado com GitHub Pages.",
      ".site-footer a": "Voltar ao topo"
    },
    counts: {
      ".chart-head .count-up": { suffix: "%", text: "92%" },
      ".dash-kpis div:nth-child(1) .count-up": { prefix: "R$ ", suffix: " mi", decimals: "1", comma: "true", text: "R$ 2,4 mi" },
      ".dash-kpis div:nth-child(2) .count-up": { suffix: "%", decimals: "1", comma: "true", text: "18,6%" },
      ".dash-kpis div:nth-child(3) .count-up": { prefix: "R$ ", text: "R$ 184" }
    },
    attrs: {
      ".brand": { "aria-label": "Voltar ao início" },
      ".nav": { "aria-label": "Navegação principal" },
      ".language-switcher": { "aria-label": "Selecionar idioma" },
      ".nav-cta": { "aria-label": "Conversar pelo WhatsApp" },
      ".hero-actions": { "aria-label": "Ações principais" },
      ".hero-lab": { "aria-label": "Simulação visual de um fluxo de trabalho analítico" },
      ".proof-rail": { "aria-label": "Resumo profissional" },
      ".dash-line": { "aria-label": "Linha de tendência de margem" }
    }
  },
  en: {
    lang: "en",
    title: "Bruno Nascimento | Data, BI and Applied AI",
    description: "Bruno Nascimento portfolio: practical Data, BI, Product Analytics, data quality and applied AI projects using SQL, Python, DuckDB and Power BI.",
    texts: {
      ".skip-link": "Skip to cases",
      ".brand-copy small": "Data, BI and applied AI",
      ".nav a[href=\"#cases\"]": "Projects",
      ".nav a[href=\"#metodo\"]": "Method",
      ".nav a[href=\"#stack\"]": "Stack",
      ".nav a[href=\"#contato\"]": "Contact",
      ".role-line": "Data, BI, MIS, Product and applied AI portfolio",
      ".hero h1": "Reliable analysis for business decisions.",
      ".hero-text": "I am Bruno Nascimento, based in Curitiba, Brazil. I develop analyses, queries, validations and dashboards that connect operational data to useful indicators for business teams.",
      ".hero .hero-actions .button.primary": "View cases",
      ".lab-topbar em": "simulation",
      ".workflow-steps span:nth-child(1)": "briefing",
      ".workflow-steps span:nth-child(2)": "python",
      ".workflow-steps span:nth-child(3)": "result",
      ".workflow-steps span:nth-child(4)": "dashboard",
      ".notebook-panel .panel-label small": "notebook",
      ".notebook-panel .panel-label strong": "margin_analysis.ipynb",
      ".workflow-question": "Question: where does margin fall before revenue starts looking like a problem?",
      ".result-panel .panel-label small": "result",
      ".result-panel .panel-label strong": "3 prioritized signals",
      ".result-table > div:nth-child(1) span:nth-child(1)": "channel",
      ".result-table > div:nth-child(1) span:nth-child(2)": "category",
      ".result-table > div:nth-child(1) span:nth-child(3)": "margin",
      ".result-table > div:nth-child(2) span:nth-child(2)": "Electronics",
      ".result-table > div:nth-child(3) span:nth-child(2)": "Fashion",
      ".result-table > div:nth-child(4) span:nth-child(2)": "Home",
      ".insight-card small": "insight",
      ".insight-card strong": "margin below target",
      ".insight-card span": "2 critical channels",
      ".mini-dashboard-title small": "executive preview",
      ".workflow-caption": "Fictional representation of an analysis workflow: business question, code, validation and visual delivery.",
      ".proof-rail div:nth-child(1) span": "repositories with synthetic data, SQL and documentation",
      ".proof-rail div:nth-child(2) span": "KPIs, margin, targets, storytelling and dashboard blueprint",
      ".proof-rail div:nth-child(3) strong": "Product",
      ".proof-rail div:nth-child(3) span": "funnel, retention, cohorts and marketplace metrics",
      ".proof-rail div:nth-child(4) span": "response evaluation, curation and prompt improvement",
      "#cases .section-kicker span": "Featured projects",
      "#cases .section-kicker p": "Cases with business problem, data model, SQL queries, validations, documentation and dashboard proposal.",
      ".dash-title-row span": "Sales and margin",
      ".dash-kpis div:nth-child(1) small": "Net revenue",
      ".dash-kpis div:nth-child(1) span": "+12% vs target",
      ".dash-kpis div:nth-child(2) small": "Margin",
      ".dash-kpis div:nth-child(2) span": "2.1 p.p. below",
      ".dash-kpis div:nth-child(3) small": "Average ticket",
      ".dash-kpis div:nth-child(3) span": "multichannel retail",
      ".dash-card-title span": "Revenue by channel",
      ".dash-main .dash-chart-card:nth-child(2) .dash-card-title span": "Margin vs target",
      ".dash-legend span:nth-child(1)": "actual",
      ".dash-legend span:nth-child(2)": "target",
      ".dash-alerts span:nth-child(1)": "Margin below target in 2 channels",
      ".dash-alerts span:nth-child(2)": "High-volume category with low profitability",
      ".dash-table-head span:nth-child(1)": "Category",
      ".dash-table-head span:nth-child(2)": "Revenue",
      ".dash-table-head span:nth-child(3)": "Margin",
      ".dash-table > div:nth-child(2) span": "Electronics",
      ".dash-table > div:nth-child(3) span": "Home",
      ".dash-table > div:nth-child(4) span": "Fashion",
      ".case-copy .case-meta span:nth-child(1)": "Main case",
      ".case-copy h2": "Playzone: funnel, retention and liquidity",
      ".case-copy > p": "Product analytics case to diagnose whether users reach the value moment in an experiences, games and activities platform: confirmed booking after opportunity discovery and invitation.",
      ".case-proof-grid div:nth-child(1) strong": "Problem",
      ".case-proof-grid div:nth-child(1) span": "low activation and meaningful drop-off before invitation sent",
      ".case-proof-grid div:nth-child(2) strong": "Delivery",
      ".case-proof-grid div:nth-child(2) span": "ordered funnel, retention cohorts, category liquidity, CSV outputs and HTML dashboard",
      ".case-copy .text-link": "Open repository",
      ".case-card:nth-child(1) .case-meta span:nth-child(1)": "BI / MIS",
      ".case-card:nth-child(1) .case-meta span:nth-child(2)": "Sales + margin",
      ".case-card:nth-child(1) h3": "Executive sales and margin dashboard",
      ".case-card:nth-child(1) p": "Analytical model, commercial KPIs, DAX measures and dashboard blueprint for revenue, margin, targets, channels and categories.",
      ".case-card:nth-child(1) .text-link": "View case",
      ".case-card:nth-child(2) .case-meta span:nth-child(1)": "Applied AI",
      ".case-card:nth-child(2) .case-meta span:nth-child(2)": "Quality",
      ".case-card:nth-child(2) h3": "AI response quality analysis",
      ".case-card:nth-child(2) p": "Framework to review responses, classify errors, compare prompt versions and turn curation work into indicators.",
      ".case-card:nth-child(2) .text-link": "View case",
      ".case-card:nth-child(3) .case-meta span:nth-child(1)": "Data Quality",
      ".case-card:nth-child(3) h3": "Analytical pipeline with quality checks",
      ".case-card:nth-child(3) p": "Local pipeline with Python, DuckDB and SQL for ingestion, staging, validations, marts and issue monitoring.",
      ".case-card:nth-child(3) .text-link": "View case",
      ".evidence-section .section-kicker span": "What recruiters find",
      ".evidence-section .section-kicker p": "Each repository presents context, assumptions, queries, validations and deliverables objectively.",
      ".evidence-item:nth-child(1) h3": "Business question",
      ".evidence-item:nth-child(1) p": "Definition of the problem, metrics and success criteria for the analysis.",
      ".evidence-item:nth-child(2) h3": "Data and rules",
      ".evidence-item:nth-child(2) p": "Synthetic datasets, data dictionary, calculation rules and documented assumptions.",
      ".evidence-item:nth-child(3) h3": "Reproducible SQL",
      ".evidence-item:nth-child(3) p": "Queries separated by schema, quality, KPIs, funnel, cohorts or marts.",
      ".evidence-item:nth-child(4) h3": "Explainable delivery",
      ".evidence-item:nth-child(4) p": "Dashboard blueprints and recommendations that connect insight to decision-making.",
      ".method-copy .section-label": "Method",
      ".method-copy h2": "Clarity before the chart.",
      ".method-copy p": "Before building visualizations, I define the business question, calculation rules, data quality and the best way to communicate the indicator.",
      ".timeline-item:nth-child(1) h3": "Understand",
      ".timeline-item:nth-child(1) p": "Which decision needs to be made? Which KPI changes the conversation?",
      ".timeline-item:nth-child(2) h3": "Model",
      ".timeline-item:nth-child(2) p": "Separate granularity, joins, dimensions, facts and calculation rules.",
      ".timeline-item:nth-child(3) h3": "Validate",
      ".timeline-item:nth-child(3) p": "Check duplicates, nulls, integrity, totals and deviations before publishing.",
      ".timeline-item:nth-child(4) h3": "Communicate",
      ".timeline-item:nth-child(4) p": "Present context, insight, risk and next action directly.",
      "#stack .section-kicker span": "Stack",
      "#stack .section-kicker p": "Tools applied in projects and analysis, BI, product and data quality routines.",
      ".stack-board > div:nth-child(1) h3": "Analysis and BI",
      ".stack-board > div:nth-child(1) li:nth-child(1)": "SQL for KPIs, funnel, cohort, joins and validations",
      ".stack-board > div:nth-child(1) li:nth-child(2)": "Power BI, DAX, Power Query and storytelling",
      ".stack-board > div:nth-child(1) li:nth-child(3)": "Commercial, product, MIS and operations metrics",
      ".stack-board > div:nth-child(2) h3": "Data and automation",
      ".stack-board > div:nth-child(2) li:nth-child(1)": "Python, Pandas and synthetic data generation",
      ".stack-board > div:nth-child(2) li:nth-child(2)": "DuckDB and BigQuery as analytical engines",
      ".stack-board > div:nth-child(2) li:nth-child(3)": "Data quality, contracts and marts for BI",
      ".stack-board > div:nth-child(3) h3": "Product and AI",
      ".stack-board > div:nth-child(3) li:nth-child(1)": "Tracking plan, events and journey analysis",
      ".stack-board > div:nth-child(3) li:nth-child(2)": "Response evaluation, prompts and curation",
      ".stack-board > div:nth-child(3) li:nth-child(3)": "Documentation that supports technical and business teams",
      ".about-panel .section-label": "About",
      ".about-panel h2": "Analytical profile focused on business.",
      ".about-panel p:nth-of-type(1)": "My professional focus is transforming operational data into useful readings for business, product, operations and management teams.",
      ".about-panel p:nth-of-type(2)": "This portfolio demonstrates practice in data organization, SQL, documentation, metric validation and results communication.",
      ".contact-panel > p": "Curitiba, Brazil · remote, hybrid or on-site depending on the opportunity",
      ".contact-panel h2": "If your team needs to turn data and indicators into clear analysis, let us talk.",
      ".site-footer p": "© 2026 Bruno Nascimento. Static portfolio published with GitHub Pages.",
      ".site-footer a": "Back to top"
    },
    counts: {
      ".chart-head .count-up": { suffix: "%", text: "92%" },
      ".dash-kpis div:nth-child(1) .count-up": { prefix: "R$ ", suffix: "M", decimals: "1", comma: "false", text: "R$ 2.4M" },
      ".dash-kpis div:nth-child(2) .count-up": { suffix: "%", decimals: "1", comma: "false", text: "18.6%" },
      ".dash-kpis div:nth-child(3) .count-up": { prefix: "R$ ", text: "R$ 184" }
    },
    attrs: {
      ".brand": { "aria-label": "Back to top" },
      ".nav": { "aria-label": "Main navigation" },
      ".language-switcher": { "aria-label": "Select language" },
      ".nav-cta": { "aria-label": "Chat on WhatsApp" },
      ".hero-actions": { "aria-label": "Main actions" },
      ".hero-lab": { "aria-label": "Visual simulation of an analytical workflow" },
      ".proof-rail": { "aria-label": "Professional summary" },
      ".dash-line": { "aria-label": "Margin trend line" }
    }
  },
  es: {
    lang: "es",
    title: "Bruno Nascimento | Datos, BI e IA aplicada",
    description: "Portafolio de Bruno Nascimento: proyectos prácticos de Datos, BI, Product Analytics, calidad de datos e IA aplicada con SQL, Python, DuckDB y Power BI.",
    texts: {
      ".skip-link": "Saltar a los casos",
      ".brand-copy small": "Datos, BI e IA aplicada",
      ".nav a[href=\"#cases\"]": "Proyectos",
      ".nav a[href=\"#metodo\"]": "Método",
      ".nav a[href=\"#stack\"]": "Stack",
      ".nav a[href=\"#contato\"]": "Contacto",
      ".role-line": "Portafolio de Datos, BI, MIS, Producto e IA aplicada",
      ".hero h1": "Análisis confiables para decisiones de negocio.",
      ".hero-text": "Soy Bruno Nascimento, de Curitiba/PR. Desarrollo análisis, consultas, validaciones y dashboards que conectan datos operativos con indicadores útiles para áreas de negocio.",
      ".hero .hero-actions .button.primary": "Ver casos",
      ".lab-topbar em": "simulación",
      ".workflow-steps span:nth-child(1)": "briefing",
      ".workflow-steps span:nth-child(2)": "python",
      ".workflow-steps span:nth-child(3)": "resultado",
      ".workflow-steps span:nth-child(4)": "dashboard",
      ".notebook-panel .panel-label small": "notebook",
      ".notebook-panel .panel-label strong": "margen_analysis.ipynb",
      ".workflow-question": "Pregunta: ¿dónde cae el margen antes de que los ingresos parezcan un problema?",
      ".result-panel .panel-label small": "resultado",
      ".result-panel .panel-label strong": "3 señales priorizadas",
      ".result-table > div:nth-child(1) span:nth-child(1)": "canal",
      ".result-table > div:nth-child(1) span:nth-child(2)": "categoría",
      ".result-table > div:nth-child(1) span:nth-child(3)": "margen",
      ".result-table > div:nth-child(2) span:nth-child(2)": "Electrónicos",
      ".result-table > div:nth-child(3) span:nth-child(2)": "Moda",
      ".result-table > div:nth-child(4) span:nth-child(2)": "Hogar",
      ".insight-card small": "insight",
      ".insight-card strong": "margen debajo de la meta",
      ".insight-card span": "2 canales críticos",
      ".mini-dashboard-title small": "preview ejecutivo",
      ".workflow-caption": "Representación ficticia de un flujo de análisis: pregunta de negocio, código, validación y entrega visual.",
      ".proof-rail div:nth-child(1) span": "repositorios con datos sintéticos, SQL y documentación",
      ".proof-rail div:nth-child(2) span": "KPI, margen, meta, storytelling y blueprint de dashboard",
      ".proof-rail div:nth-child(3) strong": "Producto",
      ".proof-rail div:nth-child(3) span": "embudo, retención, cohorts y métricas de marketplace",
      ".proof-rail div:nth-child(4) span": "evaluación de respuestas, curaduría y mejora de prompts",
      "#cases .section-kicker span": "Proyectos destacados",
      "#cases .section-kicker p": "Casos con problema de negocio, modelo de datos, consultas SQL, validaciones, documentación y propuesta de dashboard.",
      ".dash-title-row span": "Ventas y margen",
      ".dash-kpis div:nth-child(1) small": "Ingresos netos",
      ".dash-kpis div:nth-child(1) span": "+12% vs meta",
      ".dash-kpis div:nth-child(2) small": "Margen",
      ".dash-kpis div:nth-child(2) span": "2,1 p.p. abajo",
      ".dash-kpis div:nth-child(3) small": "Ticket promedio",
      ".dash-kpis div:nth-child(3) span": "retail multicanal",
      ".dash-card-title span": "Ingresos por canal",
      ".dash-main .dash-chart-card:nth-child(2) .dash-card-title span": "Margen vs meta",
      ".dash-legend span:nth-child(1)": "real",
      ".dash-legend span:nth-child(2)": "meta",
      ".dash-alerts span:nth-child(1)": "Margen debajo de la meta en 2 canales",
      ".dash-alerts span:nth-child(2)": "Categoría con alto volumen y baja rentabilidad",
      ".dash-table-head span:nth-child(1)": "Categoría",
      ".dash-table-head span:nth-child(2)": "Ingresos",
      ".dash-table-head span:nth-child(3)": "Margen",
      ".dash-table > div:nth-child(2) span": "Electrónicos",
      ".dash-table > div:nth-child(3) span": "Hogar",
      ".dash-table > div:nth-child(4) span": "Moda",
      ".case-copy .case-meta span:nth-child(1)": "Caso principal",
      ".case-copy h2": "Playzone: embudo, retención y liquidez",
      ".case-copy > p": "Estudio de Product Analytics para diagnosticar si los usuarios llegan al momento de valor en una plataforma de experiencias, juegos y actividades: reserva confirmada tras descubrir una oportunidad y enviar una invitación.",
      ".case-proof-grid div:nth-child(1) strong": "Problema",
      ".case-proof-grid div:nth-child(1) span": "baja activación y pérdida relevante antes de enviar la invitación",
      ".case-proof-grid div:nth-child(2) strong": "Entrega",
      ".case-proof-grid div:nth-child(2) span": "embudo ordenado, cohorts de retención, liquidez por categoría, outputs CSV y dashboard HTML",
      ".case-copy .text-link": "Abrir repositorio",
      ".case-card:nth-child(1) .case-meta span:nth-child(1)": "BI / MIS",
      ".case-card:nth-child(1) .case-meta span:nth-child(2)": "Ventas + margen",
      ".case-card:nth-child(1) h3": "Dashboard ejecutivo de ventas y margen",
      ".case-card:nth-child(1) p": "Modelo analítico, KPIs comerciales, medidas DAX y blueprint de dashboard para ingresos, margen, metas, canales y categorías.",
      ".case-card:nth-child(1) .text-link": "Ver caso",
      ".case-card:nth-child(2) .case-meta span:nth-child(1)": "IA aplicada",
      ".case-card:nth-child(2) .case-meta span:nth-child(2)": "Calidad",
      ".case-card:nth-child(2) h3": "Análisis de calidad de respuestas de IA",
      ".case-card:nth-child(2) p": "Framework para revisar respuestas, clasificar errores, comparar versiones de prompt y transformar curaduría en indicadores.",
      ".case-card:nth-child(2) .text-link": "Ver caso",
      ".case-card:nth-child(3) .case-meta span:nth-child(1)": "Data Quality",
      ".case-card:nth-child(3) h3": "Pipeline analítico con controles de calidad",
      ".case-card:nth-child(3) p": "Pipeline local con Python, DuckDB y SQL para ingesta, staging, validaciones, marts y monitoreo de problemas.",
      ".case-card:nth-child(3) .text-link": "Ver caso",
      ".evidence-section .section-kicker span": "Lo que encuentra el reclutador",
      ".evidence-section .section-kicker p": "Cada repositorio presenta contexto, premisas, consultas, validaciones y entregables de forma objetiva.",
      ".evidence-item:nth-child(1) h3": "Pregunta de negocio",
      ".evidence-item:nth-child(1) p": "Definición del problema, las métricas y los criterios de éxito del análisis.",
      ".evidence-item:nth-child(2) h3": "Datos y reglas",
      ".evidence-item:nth-child(2) p": "Bases sintéticas, diccionario, reglas de cálculo y premisas documentadas.",
      ".evidence-item:nth-child(3) h3": "SQL reproducible",
      ".evidence-item:nth-child(3) p": "Consultas separadas por schema, calidad, KPIs, embudo, cohorts o marts.",
      ".evidence-item:nth-child(4) h3": "Entrega explicable",
      ".evidence-item:nth-child(4) p": "Blueprints de dashboard y recomendaciones para conectar insight con decisión.",
      ".method-copy .section-label": "Método",
      ".method-copy h2": "Claridad antes del gráfico.",
      ".method-copy p": "Antes de construir visualizaciones, defino la pregunta de negocio, las reglas de cálculo, la calidad de los datos y la mejor forma de comunicar el indicador.",
      ".timeline-item:nth-child(1) h3": "Entender",
      ".timeline-item:nth-child(1) p": "¿Qué decisión debe tomarse? ¿Qué KPI cambia la conversación?",
      ".timeline-item:nth-child(2) h3": "Modelar",
      ".timeline-item:nth-child(2) p": "Separar granularidad, joins, dimensiones, hechos y reglas de cálculo.",
      ".timeline-item:nth-child(3) h3": "Validar",
      ".timeline-item:nth-child(3) p": "Revisar duplicados, nulos, integridad, totales y desvíos antes de publicar.",
      ".timeline-item:nth-child(4) h3": "Comunicar",
      ".timeline-item:nth-child(4) p": "Presentar contexto, insight, riesgo y próxima acción de forma directa.",
      "#stack .section-kicker span": "Stack",
      "#stack .section-kicker p": "Herramientas aplicadas en los proyectos y en rutinas de análisis, BI, producto y calidad de datos.",
      ".stack-board > div:nth-child(1) h3": "Análisis y BI",
      ".stack-board > div:nth-child(1) li:nth-child(1)": "SQL para KPI, embudo, cohort, joins y validaciones",
      ".stack-board > div:nth-child(1) li:nth-child(2)": "Power BI, DAX, Power Query y storytelling",
      ".stack-board > div:nth-child(1) li:nth-child(3)": "Métricas comerciales, producto, MIS y operación",
      ".stack-board > div:nth-child(2) h3": "Datos y automatización",
      ".stack-board > div:nth-child(2) li:nth-child(1)": "Python, Pandas y generación de datos sintéticos",
      ".stack-board > div:nth-child(2) li:nth-child(2)": "DuckDB y BigQuery como motores analíticos",
      ".stack-board > div:nth-child(2) li:nth-child(3)": "Data quality, contratos y marts para BI",
      ".stack-board > div:nth-child(3) h3": "Producto e IA",
      ".stack-board > div:nth-child(3) li:nth-child(1)": "Tracking plan, eventos y análisis de jornada",
      ".stack-board > div:nth-child(3) li:nth-child(2)": "Evaluación de respuestas, prompts y curaduría",
      ".stack-board > div:nth-child(3) li:nth-child(3)": "Documentación que ayuda a equipos técnicos y de negocio",
      ".about-panel .section-label": "Sobre",
      ".about-panel h2": "Perfil analítico con foco en negocio.",
      ".about-panel p:nth-of-type(1)": "Mi foco profesional está en transformar datos operativos en lecturas útiles para áreas de negocio, producto, operación y gestión.",
      ".about-panel p:nth-of-type(2)": "Este portafolio demuestra práctica en organización de datos, SQL, documentación, validación de métricas y comunicación de resultados.",
      ".contact-panel > p": "Curitiba/PR · remoto, híbrido o presencial según la oportunidad",
      ".contact-panel h2": "Si tu equipo necesita transformar datos e indicadores en análisis claros, conversemos.",
      ".site-footer p": "© 2026 Bruno Nascimento. Portafolio estático publicado con GitHub Pages.",
      ".site-footer a": "Volver arriba"
    },
    counts: {
      ".chart-head .count-up": { suffix: "%", text: "92%" },
      ".dash-kpis div:nth-child(1) .count-up": { prefix: "R$ ", suffix: " mi", decimals: "1", comma: "true", text: "R$ 2,4 mi" },
      ".dash-kpis div:nth-child(2) .count-up": { suffix: "%", decimals: "1", comma: "true", text: "18,6%" },
      ".dash-kpis div:nth-child(3) .count-up": { prefix: "R$ ", text: "R$ 184" }
    },
    attrs: {
      ".brand": { "aria-label": "Volver al inicio" },
      ".nav": { "aria-label": "Navegación principal" },
      ".language-switcher": { "aria-label": "Seleccionar idioma" },
      ".nav-cta": { "aria-label": "Conversar por WhatsApp" },
      ".hero-actions": { "aria-label": "Acciones principales" },
      ".hero-lab": { "aria-label": "Simulación visual de un flujo de trabajo analítico" },
      ".proof-rail": { "aria-label": "Resumen profesional" },
      ".dash-line": { "aria-label": "Línea de tendencia de margen" }
    }
  }
};

const setText = (selector, value) => {
  document.querySelectorAll(selector).forEach((item) => {
    const leadingIcon = item.querySelector(":scope > i");
    if (leadingIcon) {
      Array.from(item.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) node.remove();
      });
      item.append(document.createTextNode(value));
      return;
    }
    item.textContent = value;
  });
};

const setAttributes = (selector, attrs) => {
  document.querySelectorAll(selector).forEach((item) => {
    Object.entries(attrs).forEach(([name, value]) => item.setAttribute(name, value));
  });
};

const setCountDisplay = (selector, config) => {
  document.querySelectorAll(selector).forEach((item) => {
    ["prefix", "suffix", "decimals", "comma"].forEach((key) => {
      if (config[key] === undefined) {
        delete item.dataset[key];
      } else {
        item.dataset[key] = config[key];
      }
    });
    item.textContent = config.text;
  });
};

const getInitialLanguage = () => {
  const urlLanguage = new URLSearchParams(window.location.search).get("lang");
  const savedLanguage = window.localStorage.getItem("portfolio-language");
  return translations[urlLanguage] ? urlLanguage : translations[savedLanguage] ? savedLanguage : "pt";
};

const applyLanguage = (language, shouldPersist = false) => {
  const translation = translations[language] || translations.pt;

  document.documentElement.lang = translation.lang;
  document.title = translation.title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", translation.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", translation.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", translation.description);

  Object.entries(translation.texts).forEach(([selector, value]) => setText(selector, value));
  Object.entries(translation.counts).forEach(([selector, config]) => setCountDisplay(selector, config));
  Object.entries(translation.attrs).forEach(([selector, attrs]) => setAttributes(selector, attrs));

  languageButtons.forEach((button) => {
    const isActive = button.dataset.langOption === language;
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (shouldPersist) {
    window.localStorage.setItem("portfolio-language", language);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", language);
    window.history.replaceState({}, "", url);
  }
};

const currentLanguage = getInitialLanguage();
applyLanguage(currentLanguage);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.langOption, true));
});

revealItems.forEach((item) => {
  item.addEventListener("transitionend", () => item.classList.add("reveal-done"), { once: true });
});

const canUseTechCursor = window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUseTechCursor) {
  const cursor = document.createElement("div");
  const dot = document.createElement("div");
  cursor.className = "tech-cursor";
  dot.className = "tech-cursor-dot";
  document.body.append(cursor, dot);

  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;
  let dotX = cursorX;
  let dotY = cursorY;

  const moveCursor = () => {
    dotX += (cursorX - dotX) * 0.24;
    dotY += (cursorY - dotY) * 0.24;
    cursor.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
    dot.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    window.requestAnimationFrame(moveCursor);
  };

  window.addEventListener("mousemove", (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    document.body.classList.add("cursor-ready");
  });

  window.addEventListener("mouseleave", () => {
    document.body.classList.remove("cursor-ready", "cursor-hover", "cursor-action", "cursor-down");
  });

  window.addEventListener("mousedown", () => document.body.classList.add("cursor-down"));
  window.addEventListener("mouseup", () => document.body.classList.remove("cursor-down"));

  document.querySelectorAll("a, button").forEach((item) => {
    item.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover", "cursor-action"));
    item.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover", "cursor-action"));
  });

  document.querySelectorAll(".case-card, .timeline-item, .stack-board > div, .evidence-item").forEach((item) => {
    item.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    item.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });

  moveCursor();
}

const setHeaderState = () => {
  if (!siteHeader) return;
  document.body.classList.toggle("is-scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const animateCount = (item) => {
  if (item.dataset.counted === "true") return;
  item.dataset.counted = "true";

  const target = Number.parseFloat(item.dataset.count || item.textContent);
  if (!Number.isFinite(target)) return;

  const decimals = Number.parseInt(item.dataset.decimals || "0", 10);
  const prefix = item.dataset.prefix || "";
  const suffix = item.dataset.suffix || "";
  const duration = Number.parseInt(item.dataset.duration || "900", 10);
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    const renderedValue = item.dataset.comma === "true" ? value.toFixed(decimals).replace(".", ",") : value.toFixed(decimals);
    item.textContent = `${prefix}${renderedValue}${suffix}`;
    if (progress < 1) window.requestAnimationFrame(tick);
  };

  window.requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

if ("IntersectionObserver" in window) {
  const motionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-animated");
        entry.target.querySelectorAll(".count-up").forEach(animateCount);
        motionObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.24 }
  );

  animatedVisuals.forEach((item) => motionObserver.observe(item));
} else {
  animatedVisuals.forEach((item) => {
    item.classList.add("is-animated");
    item.querySelectorAll(".count-up").forEach(animateCount);
  });
}

countItems.forEach((item) => {
  if (!item.closest(".hero-lab, .case-feature, .proof-rail")) animateCount(item);
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const methodTimeline = document.querySelector(".method-timeline");
const methodItems = document.querySelectorAll(".timeline-item");

if (methodTimeline && methodItems.length) {
  const lightMethodItems = () => {
    methodTimeline.classList.add("is-active");
    methodItems.forEach((item, index) => {
      window.setTimeout(() => item.classList.add("is-lit"), index * 180);
    });
  };

  if ("IntersectionObserver" in window) {
    const methodObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          lightMethodItems();
          methodObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.28 }
    );

    methodObserver.observe(methodTimeline);
  } else {
    lightMethodItems();
  }
}
