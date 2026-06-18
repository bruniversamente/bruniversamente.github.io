document.documentElement.classList.add("js-ready");

const revealItems = document.querySelectorAll(".reveal");
const animatedVisuals = document.querySelectorAll(".hero-lab, .case-feature, .proof-rail");
const countItems = document.querySelectorAll(".count-up");
const siteHeader = document.querySelector(".site-header");
const languageButtons = document.querySelectorAll("[data-lang-option]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
      "[data-dashboard-nav]": "Dashboards",
      ".nav a[href=\"#metodo\"]": "Método",
      ".nav a[href=\"#stack\"]": "Stack",
      ".nav a[href=\"#contato\"]": "Contato",
      ".role-line": "Portfólio de Dados, BI, MIS, Produto e IA aplicada",
      ".hero h1": "Análises confiáveis para decisões de negócio.",
      ".hero-text": "Sou Bruno Nascimento, de Curitiba/PR. Desenvolvo análises, consultas, validações e dashboards que conectam dados operacionais a indicadores úteis para áreas de negócio.",
      ".hero .hero-actions .button.primary": "Ver cases",
      ".lab-topbar em": "simulação",
      ".workflow-agent span": "executando",
      ".workflow-status strong": "execução simulada",
      ".workflow-status span": "pergunta → código → validação → visual",
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
      ".insight-card strong": "pressão de margem antes da receita cair",
      ".insight-card span": "2 canais pedem revisão de mix e preço",
      ".activity-log small": "validação",
      ".activity-log span:nth-of-type(1)": "schema conferido",
      ".activity-log span:nth-of-type(2)": "nulos revisados",
      ".activity-log span:nth-of-type(3)": "métrica pronta",
      ".mini-dashboard-title small": "preview executivo",
      ".proof-rail div:nth-child(1) span": "repositórios com dados sintéticos, SQL e documentação",
      ".proof-rail div:nth-child(2) span": "KPI, margem, meta, storytelling e blueprint de dashboard",
      ".proof-rail div:nth-child(3) strong": "Produto",
      ".proof-rail div:nth-child(3) span": "funil, retenção, cohorts e métricas de marketplace",
      ".proof-rail div:nth-child(4) span": "avaliação de respostas, curadoria e melhoria de prompts",
      "#cases .section-kicker span": "Projetos em destaque",
      ".case-topic-capsules span:nth-child(1)": "Product Analytics",
      ".case-topic-capsules span:nth-child(2)": "AI Quality",
      ".case-topic-capsules span:nth-child(3)": "Pipeline Quality",
      ".case-topic-capsules span:nth-child(4)": "Retail BI",
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
      ".case-copy h2": "Playzone: aumentar ativação",
      ".case-copy > p": "Case de produto que diagnostica por que apenas 5,6% dos usuários chegam ao momento de valor e mostra que a primeira alavanca está antes do convite enviado, não no topo do funil.",
      ".activation-map-head span": "Mapa de ativação",
      ".activation-map-head strong": "Playzone",
      ".activation-summary strong": "O gargalo aparece antes do convite.",
      ".activation-summary span": "O usuário chega ao app, mas a maior perda acontece antes da ação que cria valor para o grupo.",
      ".activation-funnel .funnel-step:nth-child(1) strong": "Abertura do app",
      ".activation-funnel .funnel-step:nth-child(1) em": "500 usuários",
      ".activation-funnel .funnel-step:nth-child(2) strong": "Cadastro",
      ".activation-funnel .funnel-step:nth-child(2) em": "407 usuários",
      ".activation-funnel .funnel-step:nth-child(3) strong": "Perfil completo",
      ".activation-funnel .funnel-step:nth-child(3) em": "340 usuários",
      ".activation-funnel .funnel-step:nth-child(4) strong": "Busca realizada",
      ".activation-funnel .funnel-step:nth-child(4) em": "219 usuários",
      ".activation-funnel .funnel-step:nth-child(5) strong": "Convite enviado",
      ".activation-funnel .funnel-step:nth-child(5) em": "78 usuários",
      ".activation-funnel .funnel-step:nth-child(6) strong": "Reserva confirmada",
      ".activation-funnel .funnel-step:nth-child(6) em": "28 usuários",
      ".activation-callout small": "Principal achado",
      ".activation-callout span": "da perda relevante ocorre antes do convite enviado",
      ".activation-foot span:nth-child(1) em": "ativação completa",
      ".activation-foot span:nth-child(2) em": "retenção D30 entre ativados",
      ".case-proof-grid div:nth-child(1) strong": "5,6%",
      ".case-proof-grid div:nth-child(1) span": "ativação ordenada até reserva confirmada",
      ".case-proof-grid div:nth-child(2) strong": "64,8%",
      ".case-proof-grid div:nth-child(2) span": "perda na passagem para convite enviado",
      ".case-proof-grid div:nth-child(3) strong": "62,2%",
      ".case-proof-grid div:nth-child(3) span": "confirmação depois que o convite acontece",
      ".case-proof-grid div:nth-child(4) strong": "35,7%",
      ".case-proof-grid div:nth-child(4) span": "retenção D30 entre usuários ativados",
      ".case-copy .dashboard-cta": "Abrir dashboard",
      ".case-copy .text-link": "Abrir repositório",
      ".case-card:nth-child(1) .case-meta span:nth-child(1)": "IA aplicada",
      ".case-card:nth-child(1) .case-meta span:nth-child(2)": "Qualidade",
      ".ai-mini .mini-visual-head span": "Qualidade IA",
      ".ai-mini .mini-ring span": "score",
      ".ai-mini .mini-metric-grid div:nth-child(1) small": "Release-ready",
      ".ai-mini .mini-metric-grid div:nth-child(2) small": "Baseline",
      ".ai-mini .mini-bar-list span:nth-child(1) small": "clareza",
      ".ai-mini .mini-bar-list span:nth-child(2) small": "segurança",
      ".ai-mini .mini-bar-list span:nth-child(3) small": "prontidão",
      ".case-card:nth-child(1) h3": "Governança de release para respostas de IA",
      ".case-card:nth-child(1) p": "Avalia 500 respostas e separa qualidade média de prontidão operacional: 41,0% release-ready, v3 como melhor baseline e backlog por falha.",
      ".case-card:nth-child(1) .dashboard-cta": "Abrir dashboard",
      ".case-card:nth-child(1) .text-link": "Ver case",
      ".case-card:nth-child(2) .case-meta span:nth-child(1)": "Data Quality",
      ".case-card:nth-child(2) .case-meta span:nth-child(2)": "Pipeline",
      ".pipeline-mini .mini-visual-head span": "Qualidade do pipeline",
      ".pipeline-mini .mini-status-block small": "Status",
      ".pipeline-mini .mini-status-block strong": "Bloqueado",
      ".pipeline-mini .mini-metric-grid div:nth-child(1) small": "Falhas críticas",
      ".pipeline-mini .mini-metric-grid div:nth-child(2) small": "Pedidos prontos",
      ".pipeline-mini .mini-bar-list span:nth-child(1) small": "score",
      ".pipeline-mini .mini-bar-list span:nth-child(2) small": "pedidos",
      ".pipeline-mini .mini-bar-list span:nth-child(3) small": "risco",
      ".case-card:nth-child(2) h3": "Pipeline bloqueado mesmo com 98,2% de score",
      ".case-card:nth-child(2) p": "Gate de qualidade para BI: 9 falhas críticas impedem publicação executiva, mesmo com score acima da meta e 495 pedidos prontos.",
      ".case-card:nth-child(2) .dashboard-cta": "Abrir dashboard",
      ".case-card:nth-child(2) .text-link": "Ver case",
      ".case-card:nth-child(3) .case-meta span:nth-child(1)": "BI / MIS",
      ".case-card:nth-child(3) .case-meta span:nth-child(2)": "Vendas + margem",
      ".retail-mini .mini-visual-head span": "Executivo BI",
      ".retail-mini .mini-status-block small": "Margem",
      ".retail-mini .mini-metric-grid div:nth-child(1) small": "Pedidos",
      ".retail-mini .mini-metric-grid div:nth-child(2) small": "Alerta",
      ".retail-mini .mini-metric-grid div:nth-child(2) strong": "2 canais",
      ".retail-mini .mini-bar-list span:nth-child(1) small": "receita",
      ".retail-mini .mini-bar-list span:nth-child(2) small": "margem",
      ".retail-mini .mini-bar-list span:nth-child(3) small": "meta",
      ".case-card:nth-child(3) h3": "Decisão executiva de receita, margem e metas",
      ".case-card:nth-child(3) p": "BI aprovado para publicação: R$ 1,08M em receita, 31,0% de margem e alerta para proteger rentabilidade em categorias pressionadas.",
      ".case-card:nth-child(3) .dashboard-cta": "Abrir dashboard",
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
      ".playzone-visual": { "aria-label": "Mapa analítico do funil Playzone, destacando perda de 64,8% antes do convite enviado." },
      ".case-topic-capsules": { "aria-label": "Categorias dos cases" },
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
      "[data-dashboard-nav]": "Dashboards",
      ".nav a[href=\"#metodo\"]": "Method",
      ".nav a[href=\"#stack\"]": "Stack",
      ".nav a[href=\"#contato\"]": "Contact",
      ".role-line": "Data, BI, MIS, Product and applied AI portfolio",
      ".hero h1": "Reliable analysis for business decisions.",
      ".hero-text": "I am Bruno Nascimento, based in Curitiba, Brazil. I develop analyses, queries, validations and dashboards that connect operational data to useful indicators for business teams.",
      ".hero .hero-actions .button.primary": "View cases",
      ".lab-topbar em": "simulation",
      ".workflow-agent span": "running",
      ".workflow-status strong": "simulated execution",
      ".workflow-status span": "question → code → validation → visual",
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
      ".insight-card strong": "margin pressure before revenue drops",
      ".insight-card span": "2 channels need mix and pricing review",
      ".activity-log small": "validation",
      ".activity-log span:nth-of-type(1)": "schema checked",
      ".activity-log span:nth-of-type(2)": "nulls reviewed",
      ".activity-log span:nth-of-type(3)": "metric ready",
      ".mini-dashboard-title small": "executive preview",
      ".proof-rail div:nth-child(1) span": "repositories with synthetic data, SQL and documentation",
      ".proof-rail div:nth-child(2) span": "KPIs, margin, targets, storytelling and dashboard blueprint",
      ".proof-rail div:nth-child(3) strong": "Product",
      ".proof-rail div:nth-child(3) span": "funnel, retention, cohorts and marketplace metrics",
      ".proof-rail div:nth-child(4) span": "response evaluation, curation and prompt improvement",
      "#cases .section-kicker span": "Featured projects",
      ".case-topic-capsules span:nth-child(1)": "Product Analytics",
      ".case-topic-capsules span:nth-child(2)": "AI Quality",
      ".case-topic-capsules span:nth-child(3)": "Pipeline Quality",
      ".case-topic-capsules span:nth-child(4)": "Retail BI",
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
      ".case-copy h2": "Playzone: increasing activation",
      ".case-copy > p": "Product case diagnosing why only 5.6% of users reach the value moment and showing that the first lever sits before invitation sent, not at the top of the funnel.",
      ".activation-map-head span": "Activation map",
      ".activation-map-head strong": "Playzone",
      ".activation-summary strong": "The bottleneck appears before the invitation.",
      ".activation-summary span": "Users reach the app, but the largest loss happens before the action that creates value for the group.",
      ".activation-funnel .funnel-step:nth-child(1) strong": "App opened",
      ".activation-funnel .funnel-step:nth-child(1) em": "500 users",
      ".activation-funnel .funnel-step:nth-child(2) strong": "Sign-up",
      ".activation-funnel .funnel-step:nth-child(2) em": "407 users",
      ".activation-funnel .funnel-step:nth-child(3) strong": "Profile completed",
      ".activation-funnel .funnel-step:nth-child(3) em": "340 users",
      ".activation-funnel .funnel-step:nth-child(4) strong": "Search completed",
      ".activation-funnel .funnel-step:nth-child(4) em": "219 users",
      ".activation-funnel .funnel-step:nth-child(5) strong": "Invitation sent",
      ".activation-funnel .funnel-step:nth-child(5) em": "78 users",
      ".activation-funnel .funnel-step:nth-child(6) strong": "Booking confirmed",
      ".activation-funnel .funnel-step:nth-child(6) em": "28 users",
      ".activation-callout small": "Main finding",
      ".activation-callout span": "of the relevant loss happens before invitation sent",
      ".activation-foot span:nth-child(1) em": "full activation",
      ".activation-foot span:nth-child(2) em": "D30 retention among activated users",
      ".case-proof-grid div:nth-child(1) strong": "5.6%",
      ".case-proof-grid div:nth-child(1) span": "ordered activation to confirmed booking",
      ".case-proof-grid div:nth-child(2) strong": "64.8%",
      ".case-proof-grid div:nth-child(2) span": "drop-off before invitation sent",
      ".case-proof-grid div:nth-child(3) strong": "62.2%",
      ".case-proof-grid div:nth-child(3) span": "confirmation after invitation happens",
      ".case-proof-grid div:nth-child(4) strong": "35.7%",
      ".case-proof-grid div:nth-child(4) span": "D30 retention among activated users",
      ".case-copy .dashboard-cta": "Open dashboard",
      ".case-copy .text-link": "Open repository",
      ".case-card:nth-child(1) .case-meta span:nth-child(1)": "Applied AI",
      ".case-card:nth-child(1) .case-meta span:nth-child(2)": "Quality",
      ".ai-mini .mini-visual-head span": "AI quality",
      ".ai-mini .mini-ring span": "score",
      ".ai-mini .mini-metric-grid div:nth-child(1) small": "Release-ready",
      ".ai-mini .mini-metric-grid div:nth-child(2) small": "Baseline",
      ".ai-mini .mini-bar-list span:nth-child(1) small": "clarity",
      ".ai-mini .mini-bar-list span:nth-child(2) small": "safety",
      ".ai-mini .mini-bar-list span:nth-child(3) small": "readiness",
      ".case-card:nth-child(1) h3": "Release governance for AI responses",
      ".case-card:nth-child(1) p": "Reviews 500 responses and separates average quality from operational readiness: 41.0% release-ready, v3 as the best baseline and backlog by failure type.",
      ".case-card:nth-child(1) .dashboard-cta": "Open dashboard",
      ".case-card:nth-child(1) .text-link": "View case",
      ".case-card:nth-child(2) .case-meta span:nth-child(1)": "Data Quality",
      ".case-card:nth-child(2) .case-meta span:nth-child(2)": "Pipeline",
      ".pipeline-mini .mini-visual-head span": "Pipeline quality",
      ".pipeline-mini .mini-status-block small": "Status",
      ".pipeline-mini .mini-status-block strong": "Blocked",
      ".pipeline-mini .mini-metric-grid div:nth-child(1) small": "Critical failures",
      ".pipeline-mini .mini-metric-grid div:nth-child(2) small": "Ready orders",
      ".pipeline-mini .mini-bar-list span:nth-child(1) small": "score",
      ".pipeline-mini .mini-bar-list span:nth-child(2) small": "orders",
      ".pipeline-mini .mini-bar-list span:nth-child(3) small": "risk",
      ".case-card:nth-child(2) h3": "Pipeline blocked even with a 98.2% score",
      ".case-card:nth-child(2) p": "Quality gate for BI: 9 critical failures block executive publication, even with score above target and 495 orders ready.",
      ".case-card:nth-child(2) .dashboard-cta": "Open dashboard",
      ".case-card:nth-child(2) .text-link": "View case",
      ".case-card:nth-child(3) .case-meta span:nth-child(1)": "BI / MIS",
      ".case-card:nth-child(3) .case-meta span:nth-child(2)": "Sales + margin",
      ".retail-mini .mini-visual-head span": "Executive BI",
      ".retail-mini .mini-status-block small": "Margin",
      ".retail-mini .mini-metric-grid div:nth-child(1) small": "Orders",
      ".retail-mini .mini-metric-grid div:nth-child(2) small": "Alert",
      ".retail-mini .mini-metric-grid div:nth-child(2) strong": "2 channels",
      ".retail-mini .mini-bar-list span:nth-child(1) small": "revenue",
      ".retail-mini .mini-bar-list span:nth-child(2) small": "margin",
      ".retail-mini .mini-bar-list span:nth-child(3) small": "target",
      ".case-card:nth-child(3) h3": "Executive decision on revenue, margin and targets",
      ".case-card:nth-child(3) p": "BI approved for publication: R$ 1.08M in revenue, 31.0% margin and an alert to protect profitability in pressured categories.",
      ".case-card:nth-child(3) .dashboard-cta": "Open dashboard",
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
      ".playzone-visual": { "aria-label": "Analytical map of the Playzone funnel, highlighting a 64.8% loss before invitation sent." },
      ".case-topic-capsules": { "aria-label": "Case categories" },
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
      "[data-dashboard-nav]": "Dashboards",
      ".nav a[href=\"#metodo\"]": "Método",
      ".nav a[href=\"#stack\"]": "Stack",
      ".nav a[href=\"#contato\"]": "Contacto",
      ".role-line": "Portafolio de Datos, BI, MIS, Producto e IA aplicada",
      ".hero h1": "Análisis confiables para decisiones de negócio.",
      ".hero-text": "Soy Bruno Nascimento, de Curitiba/PR. Desarrollo análisis, consultas, validaciones y dashboards que conectan datos operativos con indicadores útiles para áreas de negócio.",
      ".hero .hero-actions .button.primary": "Ver casos",
      ".lab-topbar em": "simulación",
      ".workflow-agent span": "ejecutando",
      ".workflow-status strong": "ejecución simulada",
      ".workflow-status span": "pregunta → código → validación → visual",
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
      ".insight-card strong": "presión de margen antes de caída de ingresos",
      ".insight-card span": "2 canales requieren revisión de mix y precio",
      ".activity-log small": "validación",
      ".activity-log span:nth-of-type(1)": "schema revisado",
      ".activity-log span:nth-of-type(2)": "nulos revisados",
      ".activity-log span:nth-of-type(3)": "métrica lista",
      ".mini-dashboard-title small": "preview ejecutivo",
      ".proof-rail div:nth-child(1) span": "repositórios con datos sintéticos, SQL y documentación",
      ".proof-rail div:nth-child(2) span": "KPI, margen, meta, storytelling y blueprint de dashboard",
      ".proof-rail div:nth-child(3) strong": "Producto",
      ".proof-rail div:nth-child(3) span": "embudo, retención, cohorts y métricas de marketplace",
      ".proof-rail div:nth-child(4) span": "evaluación de respuestas, curaduría y mejora de prompts",
      "#cases .section-kicker span": "Proyectos destacados",
      ".case-topic-capsules span:nth-child(1)": "Product Analytics",
      ".case-topic-capsules span:nth-child(2)": "AI Quality",
      ".case-topic-capsules span:nth-child(3)": "Pipeline Quality",
      ".case-topic-capsules span:nth-child(4)": "Retail BI",
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
      ".case-copy h2": "Playzone: aumentar activación",
      ".case-copy > p": "Caso de producto que diagnostica por qué solo 5,6% de los usuarios llegan al momento de valor y muestra que la primera palanca está antes de enviar la invitación, no arriba del embudo.",
      ".activation-map-head span": "Mapa de activación",
      ".activation-map-head strong": "Playzone",
      ".activation-summary strong": "El cuello de botella aparece antes de la invitación.",
      ".activation-summary span": "El usuario llega a la app, pero la mayor pérdida ocurre antes de la acción que crea valor para el grupo.",
      ".activation-funnel .funnel-step:nth-child(1) strong": "Apertura de la app",
      ".activation-funnel .funnel-step:nth-child(1) em": "500 usuarios",
      ".activation-funnel .funnel-step:nth-child(2) strong": "Registro",
      ".activation-funnel .funnel-step:nth-child(2) em": "407 usuarios",
      ".activation-funnel .funnel-step:nth-child(3) strong": "Perfil completo",
      ".activation-funnel .funnel-step:nth-child(3) em": "340 usuarios",
      ".activation-funnel .funnel-step:nth-child(4) strong": "Búsqueda realizada",
      ".activation-funnel .funnel-step:nth-child(4) em": "219 usuarios",
      ".activation-funnel .funnel-step:nth-child(5) strong": "Invitación enviada",
      ".activation-funnel .funnel-step:nth-child(5) em": "78 usuarios",
      ".activation-funnel .funnel-step:nth-child(6) strong": "Reserva confirmada",
      ".activation-funnel .funnel-step:nth-child(6) em": "28 usuarios",
      ".activation-callout small": "Hallazgo principal",
      ".activation-callout span": "de la pérdida relevante ocurre antes de enviar la invitación",
      ".activation-foot span:nth-child(1) em": "activación completa",
      ".activation-foot span:nth-child(2) em": "retención D30 entre activados",
      ".case-proof-grid div:nth-child(1) strong": "5,6%",
      ".case-proof-grid div:nth-child(1) span": "activación ordenada hasta reserva confirmada",
      ".case-proof-grid div:nth-child(2) strong": "64,8%",
      ".case-proof-grid div:nth-child(2) span": "pérdida antes de enviar la invitación",
      ".case-proof-grid div:nth-child(3) strong": "62,2%",
      ".case-proof-grid div:nth-child(3) span": "confirmación después de la invitación",
      ".case-proof-grid div:nth-child(4) strong": "35,7%",
      ".case-proof-grid div:nth-child(4) span": "retención D30 entre usuarios activados",
      ".case-copy .dashboard-cta": "Abrir dashboard",
      ".case-copy .text-link": "Abrir repositório",
      ".case-card:nth-child(1) .case-meta span:nth-child(1)": "IA aplicada",
      ".case-card:nth-child(1) .case-meta span:nth-child(2)": "Calidad",
      ".ai-mini .mini-visual-head span": "Calidad IA",
      ".ai-mini .mini-ring span": "score",
      ".ai-mini .mini-metric-grid div:nth-child(1) small": "Release-ready",
      ".ai-mini .mini-metric-grid div:nth-child(2) small": "Baseline",
      ".ai-mini .mini-bar-list span:nth-child(1) small": "claridad",
      ".ai-mini .mini-bar-list span:nth-child(2) small": "seguridad",
      ".ai-mini .mini-bar-list span:nth-child(3) small": "preparación",
      ".case-card:nth-child(1) h3": "Gobernanza de release para respuestas de IA",
      ".case-card:nth-child(1) p": "Evalúa 500 respuestas y separa calidad media de preparación operacional: 41,0% release-ready, v3 como mejor baseline y backlog por falla.",
      ".case-card:nth-child(1) .dashboard-cta": "Abrir dashboard",
      ".case-card:nth-child(1) .text-link": "Ver caso",
      ".case-card:nth-child(2) .case-meta span:nth-child(1)": "Data Quality",
      ".case-card:nth-child(2) .case-meta span:nth-child(2)": "Pipeline",
      ".pipeline-mini .mini-visual-head span": "Calidad del pipeline",
      ".pipeline-mini .mini-status-block small": "Status",
      ".pipeline-mini .mini-status-block strong": "Bloqueado",
      ".pipeline-mini .mini-metric-grid div:nth-child(1) small": "Fallas críticas",
      ".pipeline-mini .mini-metric-grid div:nth-child(2) small": "Pedidos listos",
      ".pipeline-mini .mini-bar-list span:nth-child(1) small": "score",
      ".pipeline-mini .mini-bar-list span:nth-child(2) small": "pedidos",
      ".pipeline-mini .mini-bar-list span:nth-child(3) small": "riesgo",
      ".case-card:nth-child(2) h3": "Pipeline bloqueado incluso con 98,2% de score",
      ".case-card:nth-child(2) p": "Gate de calidad para BI: 9 fallas críticas impiden publicación ejecutiva, incluso con score arriba de la meta y 495 pedidos listos.",
      ".case-card:nth-child(2) .dashboard-cta": "Abrir dashboard",
      ".case-card:nth-child(2) .text-link": "Ver caso",
      ".case-card:nth-child(3) .case-meta span:nth-child(1)": "BI / MIS",
      ".case-card:nth-child(3) .case-meta span:nth-child(2)": "Ventas + margen",
      ".retail-mini .mini-visual-head span": "BI ejecutivo",
      ".retail-mini .mini-status-block small": "Margen",
      ".retail-mini .mini-metric-grid div:nth-child(1) small": "Pedidos",
      ".retail-mini .mini-metric-grid div:nth-child(2) small": "Alerta",
      ".retail-mini .mini-metric-grid div:nth-child(2) strong": "2 canales",
      ".retail-mini .mini-bar-list span:nth-child(1) small": "ingresos",
      ".retail-mini .mini-bar-list span:nth-child(2) small": "margen",
      ".retail-mini .mini-bar-list span:nth-child(3) small": "meta",
      ".case-card:nth-child(3) h3": "Decisión ejecutiva de ingresos, margen y metas",
      ".case-card:nth-child(3) p": "BI aprobado para publicación: R$ 1,08M en ingresos, 31,0% de margen y alerta para proteger rentabilidad en categorías presionadas.",
      ".case-card:nth-child(3) .dashboard-cta": "Abrir dashboard",
      ".case-card:nth-child(3) .text-link": "Ver caso",
      ".evidence-section .section-kicker span": "Lo que encuentra el reclutador",
      ".evidence-section .section-kicker p": "Cada repositório presenta contexto, premisas, consultas, validaciones y entregables de forma objetiva.",
      ".evidence-item:nth-child(1) h3": "Pregunta de negócio",
      ".evidence-item:nth-child(1) p": "Definición del problema, las métricas y los critérios de éxito del análisis.",
      ".evidence-item:nth-child(2) h3": "Datos y reglas",
      ".evidence-item:nth-child(2) p": "Bases sintéticas, diccionario, reglas de cálculo y premisas documentadas.",
      ".evidence-item:nth-child(3) h3": "SQL reproducible",
      ".evidence-item:nth-child(3) p": "Consultas separadas por schema, calidad, KPIs, embudo, cohorts o marts.",
      ".evidence-item:nth-child(4) h3": "Entrega explicable",
      ".evidence-item:nth-child(4) p": "Blueprints de dashboard y recomendaciones para conectar insight con decisión.",
      ".method-copy .section-label": "Método",
      ".method-copy h2": "Claridad antes del gráfico.",
      ".method-copy p": "Antes de construir visualizaciones, defino la pregunta de negócio, las reglas de cálculo, la calidad de los datos y la mejor forma de comunicar el indicador.",
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
      ".stack-board > div:nth-child(3) li:nth-child(3)": "Documentación que ayuda a equipos técnicos y de negócio",
      ".about-panel .section-label": "Sobre",
      ".about-panel h2": "Perfil analítico con foco en negócio.",
      ".about-panel p:nth-of-type(1)": "Mi foco profesional está en transformar datos operativos en lecturas útiles para áreas de negócio, producto, operación y gestión.",
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
      ".playzone-visual": { "aria-label": "Mapa analítico del embudo Playzone, destacando pérdida de 64,8% antes de enviar la invitación." },
      ".case-topic-capsules": { "aria-label": "Categorías de los casos" },
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

  document.querySelectorAll("[data-dashboard-case]").forEach((link) => {
    link.setAttribute("href", `dashboards/?case=${encodeURIComponent(link.dataset.dashboardCase)}&lang=${language}`);
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

const prepareCodeTyping = (container) => {
  const code = container.querySelector(".code-window code");
  if (!code || code.dataset.typingPrepared === "true") return null;

  const lines = Array.from(code.querySelectorAll("span"));
  lines.forEach((line) => {
    line.dataset.fullText = line.textContent;
    if (!prefersReducedMotion) line.textContent = "";
  });

  code.dataset.typingPrepared = "true";
  return { code, lines };
};

const startCodeTyping = (container) => {
  const prepared = prepareCodeTyping(container);
  const code = prepared?.code || container.querySelector(".code-window code");
  const lines = prepared?.lines || Array.from(container.querySelectorAll(".code-window code span"));

  if (!code || !lines.length || code.dataset.typed === "true") return;
  code.dataset.typed = "true";

  if (prefersReducedMotion) return;

  const cursor = document.createElement("i");
  cursor.className = "typing-cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.textContent = "|";

  let lineIndex = 0;
  let charIndex = 0;

  const typeNext = () => {
    const line = lines[lineIndex];
    if (!line) {
      cursor.remove();
      return;
    }

    const fullText = line.dataset.fullText || "";
    line.textContent = fullText.slice(0, charIndex);
    line.appendChild(cursor);

    if (charIndex < fullText.length) {
      charIndex += 1;
      window.setTimeout(typeNext, 22);
      return;
    }

    line.textContent = fullText;
    line.appendChild(cursor);
    lineIndex += 1;
    charIndex = 0;
    window.setTimeout(typeNext, 95);
  };

  window.setTimeout(typeNext, 180);
};

const workflowStageClasses = ["workflow-stage-0", "workflow-stage-1", "workflow-stage-2", "workflow-stage-3", "workflow-stage-4"];

const setWorkflowStage = (container, stage) => {
  container.classList.remove(...workflowStageClasses);
  container.classList.add(`workflow-stage-${stage}`);
};

const startWorkflowLayout = (container) => {
  if (!container.classList.contains("hero-lab") || container.dataset.workflowLayoutStarted === "true") return;
  container.dataset.workflowLayoutStarted = "true";

  if (prefersReducedMotion) {
    setWorkflowStage(container, 4);
    return;
  }

  setWorkflowStage(container, 0);
  [1, 2, 3, 4].forEach((stage, index) => {
    window.setTimeout(() => setWorkflowStage(container, stage), 1450 + index * 1550);
  });
};

document.querySelectorAll(".hero-lab").forEach((item) => {
  prepareCodeTyping(item);
  setWorkflowStage(item, prefersReducedMotion ? 4 : 0);
});

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
        startWorkflowLayout(entry.target);
        startCodeTyping(entry.target);
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
    startWorkflowLayout(item);
    startCodeTyping(item);
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
