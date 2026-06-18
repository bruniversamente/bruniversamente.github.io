const params = new URLSearchParams(window.location.search);

const CASES = {
  playzone: {
    file: "data/playzone.json",
    repo: "https://github.com/bruniversamente/product-analytics-funnel-retention",
    tags: ["Product Analytics", "Funnel", "Retention", "Marketplace"],
    copy: {
      pt: {
        tab: "Playzone",
        title: "Playzone: ativação, retenção e liquidez do marketplace",
        description: "A leitura central é que o gargalo mais caro não está no cadastro: ele aparece antes do convite enviado. O dashboard mostra funil, canais, retenção e categorias para priorizar a alavanca certa.",
        recommendation: "Priorizar experimentos que aumentem convite enviado e qualidade de oportunidade antes de otimizar etapas já saudáveis."
      },
      en: {
        tab: "Playzone",
        title: "Playzone: activation, retention and marketplace liquidity",
        description: "The core read is that the most expensive bottleneck is not signup. It appears before invitation sent. The dashboard shows funnel, channels, retention and categories to prioritize the right lever.",
        recommendation: "Prioritize experiments that increase invitation sent and opportunity quality before optimizing already healthy steps."
      },
      es: {
        tab: "Playzone",
        title: "Playzone: activación, retención y liquidez del marketplace",
        description: "La lectura central es que el cuello de botella más caro no está en el registro. Aparece antes de enviar la invitación. El dashboard muestra embudo, canales, retención y categorías.",
        recommendation: "Priorizar experimentos que aumenten invitaciones enviadas y calidad de oportunidad antes de optimizar etapas saludables."
      }
    }
  },
  "ai-quality": {
    file: "data/ai-quality.json",
    repo: "https://github.com/bruniversamente/ai-response-quality-analysis",
    tags: ["Applied AI", "Quality", "Release governance", "Prompt evaluation"],
    copy: {
      pt: {
        tab: "AI Quality",
        title: "AI Quality: governança de release para respostas de IA",
        description: "O case separa qualidade média de prontidão operacional. A v3 é o melhor baseline, mas ainda existe backlog relevante por versão, caso de uso e tipo de falha.",
        recommendation: "Usar v3 como baseline, atacar falhas de contexto e actionability, e manter gate de release por caso de uso."
      },
      en: {
        tab: "AI Quality",
        title: "AI Quality: release governance for AI responses",
        description: "The case separates average quality from operational readiness. v3 is the best baseline, but there is still meaningful backlog by version, use case and failure type.",
        recommendation: "Use v3 as the baseline, address context and actionability failures, and keep a release gate by use case."
      },
      es: {
        tab: "AI Quality",
        title: "AI Quality: gobernanza de release para respuestas de IA",
        description: "El caso separa calidad media de preparación operacional. v3 es el mejor baseline, pero todavía hay backlog por versión, caso de uso y tipo de falla.",
        recommendation: "Usar v3 como baseline, atacar fallas de contexto y accionabilidad, y mantener gate por caso de uso."
      }
    }
  },
  pipeline: {
    file: "data/pipeline.json",
    repo: "https://github.com/bruniversamente/data-pipeline-quality-checks",
    tags: ["Data Quality", "Pipeline", "BI gate", "DuckDB"],
    copy: {
      pt: {
        tab: "Pipeline Quality",
        title: "Pipeline Quality: publicação bloqueada com score alto",
        description: "O score geral parece saudável, mas nove falhas críticas impedem a publicação executiva. O dashboard mostra por que média boa não substitui regra de bloqueio.",
        recommendation: "Publicar apenas marts Ready, corrigir falhas críticas e tratar warnings fora da receita executiva."
      },
      en: {
        tab: "Pipeline Quality",
        title: "Pipeline Quality: publication blocked despite a high score",
        description: "The overall score looks healthy, but nine critical failures block executive publication. The dashboard shows why a good average does not replace blocking rules.",
        recommendation: "Publish Ready marts only, fix critical failures and monitor warnings outside executive revenue."
      },
      es: {
        tab: "Pipeline Quality",
        title: "Pipeline Quality: publicación bloqueada con score alto",
        description: "El score general parece saludable, pero nueve fallas críticas bloquean la publicación ejecutiva. El dashboard muestra por qué un buen promedio no reemplaza reglas críticas.",
        recommendation: "Publicar solo marts Ready, corregir fallas críticas y monitorear warnings fuera del ingreso ejecutivo."
      }
    }
  },
  retail: {
    file: "data/retail.json",
    repo: "https://github.com/bruniversamente/retail-bi-sales-dashboard",
    tags: ["Retail BI", "Margin", "Targets", "Executive dashboard"],
    copy: {
      pt: {
        tab: "Retail BI",
        title: "Retail BI: receita, margem e metas executivas",
        description: "O dashboard mostra uma operação aprovada para publicação: R$ 1,08M em receita, margem de 31,0% e leitura por canal, categoria, mês e produto.",
        recommendation: "Proteger categorias com margem pressionada e usar metas por canal para explicar onde receita cresceu sem preservar rentabilidade."
      },
      en: {
        tab: "Retail BI",
        title: "Retail BI: executive revenue, margin and targets",
        description: "The dashboard shows an operation approved for publication: R$1.08M revenue, 31.0% margin and reads by channel, category, month and product.",
        recommendation: "Protect categories with pressured margin and use channel targets to explain where revenue grew without preserving profitability."
      },
      es: {
        tab: "Retail BI",
        title: "Retail BI: ingresos, margen y metas ejecutivas",
        description: "El dashboard muestra una operación aprobada para publicación: R$1,08M en ingresos, margen de 31,0% y lectura por canal, categoría, mes y producto.",
        recommendation: "Proteger categorías con margen presionado y usar metas por canal para explicar dónde creció ingreso sin preservar rentabilidad."
      }
    }
  }
};

const UI = {
  pt: {
    lang: "pt-BR",
    pageTitle: "Dashboards analíticos | Bruno Nascimento",
    navCases: "Projetos",
    navMethod: "Método",
    navContact: "Contato",
    eyebrow: "Dashboards publicados no GitHub Pages",
    title: "Quatro estudos de caso, uma camada executiva interativa.",
    subtitle: "Cada dashboard usa os dados versionados do respectivo repositório e mantém filtros, contexto, evidência e recomendação em uma experiência navegável.",
    summaryCases: "cases conectados",
    summaryStatic: "estático e versionável",
    summaryState: "filtros compartilháveis",
    caseLabel: "Selecionar case",
    openRepo: "Abrir repositório",
    backPortfolio: "Voltar ao portfólio",
    recommendation: "Recomendação",
    status: "Status",
    dataLayer: "Camada de dados",
    controls: {
      channel: "Canal",
      version: "Versão do prompt",
      severity: "Severidade",
      source: "Origem",
      category: "Categoria",
      useCase: "Caso de uso",
      issue: "Tipo de falha",
      rule: "Regra",
      month: "Mês"
    },
    all: "Todos",
    notesLabel: "Como ler",
    notesTitle: "O dashboard mostra decisão, não só gráfico.",
    notesBody: "A ordem de leitura é: contexto do problema, KPIs que mudam a decisão, evidência visual, registros ou dimensões de apoio e recomendação. Os dados são sintéticos, mas a estrutura simula uma entrega profissional.",
    charts: {
      orderedFunnel: "Funil ordenado até reserva confirmada",
      orderedFunnelSub: "A maior perda aparece antes do convite enviado.",
      activationByChannel: "Ativação por canal",
      retention: "Retenção por ativação",
      categoryLiquidity: "Liquidez por categoria",
      cohortHeatmap: "Cohorts de retenção",
      liquidityMap: "Mapa de liquidez",
      promptVersion: "Prontidão por versão",
      useCaseQuality: "Qualidade por caso de uso",
      dimensions: "Dimensões da avaliação",
      issues: "Distribuição de falhas",
      backlog: "Backlog priorizado",
      releaseMatrix: "Matriz de prontidão",
      qualityTrend: "Tendência mensal de qualidade",
      failedRules: "Regras com falha",
      sourceReadiness: "Prontidão por origem",
      readyRevenue: "Receita pronta para BI",
      reviewQueue: "Fila de revisão",
      categoryImpact: "Impacto por categoria",
      revenueTrend: "Receita e margem por mês",
      channelRevenue: "Receita por canal",
      categoryMargin: "Categoria: receita e margem",
      targets: "Atingimento de meta por canal",
      products: "Produtos que explicam o resultado",
      productMap: "Mapa de produtos"
    },
    terms: {
      published: "Publicado",
      localJson: "JSON local versionado para GitHub Pages",
      activation: "Ativação",
      invitationBottleneck: "Gargalo do convite",
      confirmation: "Confirmação",
      d30Retention: "Retenção D30",
      usersAtValue: "usuários no momento de valor",
      afterInvitation: "Depois do convite enviado",
      category: "Categoria",
      confirmed: "Confirmadas",
      rate: "Taxa",
      avgHours: "Horas médias",
      releaseReady: "Pronto para release",
      qualityScore: "Score de qualidade",
      criticalIssueRate: "Taxa de falha crítica",
      reviewed: "Avaliadas",
      allPromptVersions: "Todas as versões de prompt",
      scaleOneToFive: "Escala de 1 a 5",
      operationalRisk: "Risco operacional",
      responsesEvaluated: "Respostas avaliadas",
      issue: "Falha",
      severity: "Severidade",
      count: "Qtd.",
      share: "Participação",
      useCase: "Caso de uso",
      version: "Versão",
      notApproved: "Não aprovadas",
      qualityScoreShort: "Score de qualidade",
      highAverage: "Média alta, mas insuficiente",
      criticalFailures: "Falhas críticas",
      blockingPublication: "Bloqueiam a publicação",
      readyOrders: "Pedidos prontos",
      rawOrders: "pedidos brutos",
      reviewOrders: "Pedidos em revisão",
      needCorrection: "Precisam de correção antes do BI executivo",
      source: "Origem",
      channel: "Canal",
      month: "Mês",
      orders: "Pedidos",
      orderTotal: "Total pedido",
      captured: "Capturado",
      order: "Pedido",
      total: "Total",
      netRevenue: "Receita líquida",
      allChannels: "Todos os canais",
      grossMargin: "Margem bruta",
      deliveredOrders: "Pedidos entregues",
      validForBi: "Entregues e válidos para BI",
      averageTicket: "Ticket médio",
      portfolioMetric: "Métrica do portfólio",
      revenueShare: "Participação de receita",
      avgTarget: "Atingimento médio da meta",
      product: "Produto",
      margin: "Margem",
      invitationsBookingsTime: "Convites, reservas confirmadas e tempo de confirmação",
      readyRateByVersion: "Taxa de prontidão por versão de prompt",
      avgScoreByUseCase: "Score médio por caso de uso",
      avgDimensionScore: "Score médio por dimensão",
      issueShareBySeverity: "Participação por falha e severidade",
      topBacklog: "Principais combinações não aprovadas",
      filteredBy: "Filtrado por",
      criticalWarningRules: "Regras críticas e de aviso",
      allSources: "Todas as origens",
      completedCaptured: "Pedidos concluídos e pagamento capturado",
      blockedRecords: "Registros bloqueados para publicação executiva",
      revenueMarginReference: "Linha de receita líquida e referência de margem",
      allCategories: "Todas as categorias",
      topProducts: "Ranking dos principais produtos"
      ,
      activeFilters: "Filtros ativos",
      noActiveFilters: "Sem filtros ativos",
      clearFilters: "Limpar filtros",
      copyLink: "Copiar link",
      copied: "Link copiado",
      week: "Semana",
      cohort: "Cohort",
      retentionRate: "Retenção",
      opportunities: "Oportunidades",
      bookings: "Reservas",
      confirmationRate: "Taxa de confirmação",
      avgTime: "Tempo médio",
      releaseReadyRate: "Taxa pronta para release",
      monthlyTrend: "Evolução mensal",
      revenue: "Receita",
      units: "Unidades",
      target: "Meta",
      realized: "Realizado"
      ,
      confirmedPerOpen: "Reserva confirmada / abertura do app",
      retentionWindows: "D1, D7 e D30"
    }
  },
  en: {
    lang: "en",
    pageTitle: "Analytics dashboards | Bruno Nascimento",
    navCases: "Projects",
    navMethod: "Method",
    navContact: "Contact",
    eyebrow: "Dashboards published on GitHub Pages",
    title: "Four case studies, one interactive executive layer.",
    subtitle: "Each dashboard uses versioned data from its repository and keeps filters, context, evidence and recommendation in a navigable experience.",
    summaryCases: "connected cases",
    summaryStatic: "static and versioned",
    summaryState: "shareable filters",
    caseLabel: "Select case",
    openRepo: "Open repository",
    backPortfolio: "Back to portfolio",
    recommendation: "Recommendation",
    status: "Status",
    dataLayer: "Data layer",
    controls: {
      channel: "Channel",
      version: "Prompt version",
      severity: "Severity",
      source: "Source",
      category: "Category",
      useCase: "Use case",
      issue: "Issue type",
      rule: "Rule",
      month: "Month"
    },
    all: "All",
    notesLabel: "How to read",
    notesTitle: "The dashboard shows decisions, not just charts.",
    notesBody: "The reading order is: problem context, decision-changing KPIs, visual evidence, support records or dimensions and recommendation. The data is synthetic, but the structure simulates a professional delivery.",
    charts: {
      orderedFunnel: "Ordered funnel to confirmed booking",
      orderedFunnelSub: "The largest loss appears before invitation sent.",
      activationByChannel: "Activation by channel",
      retention: "Retention by activation",
      categoryLiquidity: "Liquidity by category",
      cohortHeatmap: "Retention cohorts",
      liquidityMap: "Liquidity map",
      promptVersion: "Readiness by version",
      useCaseQuality: "Quality by use case",
      dimensions: "Evaluation dimensions",
      issues: "Failure distribution",
      backlog: "Prioritized backlog",
      releaseMatrix: "Readiness matrix",
      qualityTrend: "Monthly quality trend",
      failedRules: "Failed rules",
      sourceReadiness: "Readiness by source",
      readyRevenue: "BI-ready revenue",
      reviewQueue: "Review queue",
      categoryImpact: "Category impact",
      revenueTrend: "Revenue and margin by month",
      channelRevenue: "Revenue by channel",
      categoryMargin: "Category: revenue and margin",
      targets: "Target attainment by channel",
      products: "Products explaining the result",
      productMap: "Product map"
    },
    terms: {
      published: "Published",
      localJson: "Versioned local JSON for GitHub Pages",
      activation: "Activation",
      invitationBottleneck: "Invitation bottleneck",
      confirmation: "Confirmation",
      d30Retention: "D30 retention",
      usersAtValue: "users at the value moment",
      afterInvitation: "After invitation is sent",
      category: "Category",
      confirmed: "Confirmed",
      rate: "Rate",
      avgHours: "Avg hours",
      releaseReady: "Release-ready",
      qualityScore: "Quality score",
      criticalIssueRate: "Critical issue rate",
      reviewed: "Reviewed",
      allPromptVersions: "All prompt versions",
      scaleOneToFive: "Scale 1 to 5",
      operationalRisk: "Operational risk",
      responsesEvaluated: "Responses evaluated",
      issue: "Issue",
      severity: "Severity",
      count: "Count",
      share: "Share",
      useCase: "Use case",
      version: "Version",
      notApproved: "Not approved",
      qualityScoreShort: "Quality score",
      highAverage: "High average, but not enough",
      criticalFailures: "Critical failures",
      blockingPublication: "Blocking publication",
      readyOrders: "Ready orders",
      rawOrders: "raw orders",
      reviewOrders: "Review orders",
      needCorrection: "Need correction before executive BI",
      source: "Source",
      channel: "Channel",
      month: "Month",
      orders: "Orders",
      orderTotal: "Order total",
      captured: "Captured",
      order: "Order",
      total: "Total",
      netRevenue: "Net revenue",
      allChannels: "All channels",
      grossMargin: "Gross margin",
      deliveredOrders: "Delivered orders",
      validForBi: "Delivered and valid for BI",
      averageTicket: "Average ticket",
      portfolioMetric: "Portfolio-wide metric",
      revenueShare: "Revenue share",
      avgTarget: "Average target attainment",
      product: "Product",
      margin: "Margin",
      invitationsBookingsTime: "Invitations, confirmed bookings and time to confirmation",
      readyRateByVersion: "Release-ready rate by prompt version",
      avgScoreByUseCase: "Average score by use case",
      avgDimensionScore: "Average dimension score",
      issueShareBySeverity: "Occurrence share by issue and severity",
      topBacklog: "Top not-approved combinations",
      filteredBy: "Filtered by",
      criticalWarningRules: "Critical and warning rules",
      allSources: "All source systems",
      completedCaptured: "Completed orders and captured payment amount",
      blockedRecords: "Records blocked from executive publication",
      revenueMarginReference: "Net revenue line and margin reference",
      allCategories: "All categories",
      topProducts: "Top product ranking",
      activeFilters: "Active filters",
      noActiveFilters: "No active filters",
      clearFilters: "Clear filters",
      copyLink: "Copy link",
      copied: "Link copied",
      week: "Week",
      cohort: "Cohort",
      retentionRate: "Retention",
      opportunities: "Opportunities",
      bookings: "Bookings",
      confirmationRate: "Confirmation rate",
      avgTime: "Average time",
      releaseReadyRate: "Release-ready rate",
      monthlyTrend: "Monthly trend",
      revenue: "Revenue",
      units: "Units",
      target: "Target",
      realized: "Realized"
      ,
      confirmedPerOpen: "Confirmed booking / app open",
      retentionWindows: "D1, D7 and D30"
    }
  },
  es: {
    lang: "es",
    pageTitle: "Dashboards analíticos | Bruno Nascimento",
    navCases: "Proyectos",
    navMethod: "Método",
    navContact: "Contacto",
    eyebrow: "Dashboards publicados en GitHub Pages",
    title: "Cuatro estudios de caso, una capa ejecutiva interactiva.",
    subtitle: "Cada dashboard usa datos versionados del repositorio correspondiente y mantiene filtros, contexto, evidencia y recomendación en una experiencia navegable.",
    summaryCases: "casos conectados",
    summaryStatic: "estático y versionable",
    summaryState: "filtros compartibles",
    caseLabel: "Seleccionar caso",
    openRepo: "Abrir repositorio",
    backPortfolio: "Volver al portafolio",
    recommendation: "Recomendación",
    status: "Status",
    dataLayer: "Capa de datos",
    controls: {
      channel: "Canal",
      version: "Versión del prompt",
      severity: "Severidad",
      source: "Origen",
      category: "Categoría",
      useCase: "Caso de uso",
      issue: "Tipo de falla",
      rule: "Regla",
      month: "Mes"
    },
    all: "Todos",
    notesLabel: "Cómo leer",
    notesTitle: "El dashboard muestra decisión, no solo gráfico.",
    notesBody: "El orden de lectura es: contexto del problema, KPIs que cambian la decisión, evidencia visual, registros o dimensiones de apoyo y recomendación. Los datos son sintéticos, pero la estructura simula una entrega profesional.",
    charts: {
      orderedFunnel: "Embudo ordenado hasta reserva confirmada",
      orderedFunnelSub: "La mayor pérdida aparece antes de enviar la invitación.",
      activationByChannel: "Activación por canal",
      retention: "Retención por activación",
      categoryLiquidity: "Liquidez por categoría",
      cohortHeatmap: "Cohorts de retención",
      liquidityMap: "Mapa de liquidez",
      promptVersion: "Preparación por versión",
      useCaseQuality: "Calidad por caso de uso",
      dimensions: "Dimensiones de evaluación",
      issues: "Distribución de fallas",
      backlog: "Backlog priorizado",
      releaseMatrix: "Matriz de preparación",
      qualityTrend: "Tendencia mensual de calidad",
      failedRules: "Reglas con falla",
      sourceReadiness: "Preparación por origen",
      readyRevenue: "Ingreso listo para BI",
      reviewQueue: "Cola de revisión",
      categoryImpact: "Impacto por categoría",
      revenueTrend: "Ingreso y margen por mes",
      channelRevenue: "Ingreso por canal",
      categoryMargin: "Categoría: ingreso y margen",
      targets: "Cumplimiento de meta por canal",
      products: "Productos que explican el resultado",
      productMap: "Mapa de productos"
    },
    terms: {
      published: "Publicado",
      localJson: "JSON local versionado para GitHub Pages",
      activation: "Activación",
      invitationBottleneck: "Cuello de botella de invitación",
      confirmation: "Confirmación",
      d30Retention: "Retención D30",
      usersAtValue: "usuarios en el momento de valor",
      afterInvitation: "Después de enviar la invitación",
      category: "Categoría",
      confirmed: "Confirmadas",
      rate: "Tasa",
      avgHours: "Horas medias",
      releaseReady: "Listo para release",
      qualityScore: "Score de calidad",
      criticalIssueRate: "Tasa de falla crítica",
      reviewed: "Evaluadas",
      allPromptVersions: "Todas las versiones de prompt",
      scaleOneToFive: "Escala de 1 a 5",
      operationalRisk: "Riesgo operacional",
      responsesEvaluated: "Respuestas evaluadas",
      issue: "Falla",
      severity: "Severidad",
      count: "Cant.",
      share: "Participación",
      useCase: "Caso de uso",
      version: "Versión",
      notApproved: "No aprobadas",
      qualityScoreShort: "Score de calidad",
      highAverage: "Media alta, pero insuficiente",
      criticalFailures: "Fallas críticas",
      blockingPublication: "Bloquean la publicación",
      readyOrders: "Pedidos listos",
      rawOrders: "pedidos brutos",
      reviewOrders: "Pedidos en revisión",
      needCorrection: "Necesitan corrección antes del BI ejecutivo",
      source: "Origen",
      channel: "Canal",
      month: "Mes",
      orders: "Pedidos",
      orderTotal: "Total pedido",
      captured: "Capturado",
      order: "Pedido",
      total: "Total",
      netRevenue: "Ingreso neto",
      allChannels: "Todos los canales",
      grossMargin: "Margen bruto",
      deliveredOrders: "Pedidos entregados",
      validForBi: "Entregados y válidos para BI",
      averageTicket: "Ticket promedio",
      portfolioMetric: "Métrica del portafolio",
      revenueShare: "Participación de ingreso",
      avgTarget: "Cumplimiento medio de meta",
      product: "Producto",
      margin: "Margen",
      invitationsBookingsTime: "Invitaciones, reservas confirmadas y tiempo de confirmación",
      readyRateByVersion: "Tasa de preparación por versión de prompt",
      avgScoreByUseCase: "Score medio por caso de uso",
      avgDimensionScore: "Score medio por dimensión",
      issueShareBySeverity: "Participación por falla y severidad",
      topBacklog: "Principales combinaciones no aprobadas",
      filteredBy: "Filtrado por",
      criticalWarningRules: "Reglas críticas y de aviso",
      allSources: "Todos los orígenes",
      completedCaptured: "Pedidos completados y pago capturado",
      blockedRecords: "Registros bloqueados para publicación ejecutiva",
      revenueMarginReference: "Línea de ingreso neto y referencia de margen",
      allCategories: "Todas las categorías",
      topProducts: "Ranking de productos principales",
      activeFilters: "Filtros activos",
      noActiveFilters: "Sin filtros activos",
      clearFilters: "Limpiar filtros",
      copyLink: "Copiar link",
      copied: "Link copiado",
      week: "Semana",
      cohort: "Cohort",
      retentionRate: "Retención",
      opportunities: "Oportunidades",
      bookings: "Reservas",
      confirmationRate: "Tasa de confirmación",
      avgTime: "Tiempo medio",
      releaseReadyRate: "Tasa lista para release",
      monthlyTrend: "Evolución mensual",
      revenue: "Ingreso",
      units: "Unidades",
      target: "Meta",
      realized: "Realizado"
      ,
      confirmedPerOpen: "Reserva confirmada / apertura de app",
      retentionWindows: "D1, D7 y D30"
    }
  }
};

const LABELS = {
  en: {
    "Abertura do app": "App opened",
    "Cadastro concluído": "Signup completed",
    "Perfil completo": "Profile completed",
    "Busca realizada": "Search performed",
    "Oportunidade vista": "Opportunity viewed",
    "Convite enviado": "Invitation sent",
    "Reserva confirmada": "Booking confirmed",
    "Ativados": "Activated",
    "Não ativados": "Not activated",
    "Casa": "Home",
    "Eletronicos": "Electronics",
    "Esporte": "Sports",
    "Moda": "Fashion",
    "Beleza": "Beauty",
    "Sem falhas críticas; 256 warnings monitorados fora da receita executiva.": "No critical failures; 256 warnings monitored outside executive revenue.",
    "9 falhas críticas encontradas; publicar apenas os marts Ready.": "9 critical failures found; publish Ready marts only."
  },
  es: {
    "Abertura do app": "Apertura de app",
    "Cadastro concluído": "Registro completado",
    "Perfil completo": "Perfil completo",
    "Busca realizada": "Búsqueda realizada",
    "Oportunidade vista": "Oportunidad vista",
    "Convite enviado": "Invitación enviada",
    "Reserva confirmada": "Reserva confirmada",
    "Ativados": "Activados",
    "Não ativados": "No activados",
    "Casa": "Hogar",
    "Eletronicos": "Electrónicos",
    "Esporte": "Deportes",
    "Moda": "Moda",
    "Beleza": "Belleza",
    "Sem falhas críticas; 256 warnings monitorados fora da receita executiva.": "Sin fallas críticas; 256 warnings monitoreados fuera del ingreso ejecutivo.",
    "9 falhas críticas encontradas; publicar apenas os marts Ready.": "9 fallas críticas encontradas; publicar solo marts Ready."
  },
  pt: {
    "Eletronicos": "Eletrônicos"
  }
};

const state = {
  caseId: CASES[params.get("case")] ? params.get("case") : "playzone",
  lang: UI[params.get("lang")] ? params.get("lang") : "pt",
  filters: {
    channel: params.get("channel") || "all",
    version: params.get("version") || "all",
    severity: params.get("severity") || "all",
    source: params.get("source") || "all",
    category: params.get("category") || "all",
    useCase: params.get("useCase") || "all",
    issue: params.get("issue") || "all",
    rule: params.get("rule") || "all",
    month: params.get("month") || "all"
  }
};

let datasets = {};

const $ = (selector) => document.querySelector(selector);
const escapeHtml = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#039;"
}[char]));

const copy = () => UI[state.lang] || UI.pt;
const caseCopy = (caseId = state.caseId) => CASES[caseId].copy[state.lang] || CASES[caseId].copy.pt;
const label = (value) => (LABELS[state.lang] && LABELS[state.lang][value]) || value;
const term = (key) => copy().terms?.[key] || UI.en.terms[key] || key;
const locale = () => ({ pt: "pt-BR", en: "en-US", es: "es-ES" }[state.lang] || "pt-BR");
const formatNumber = (value, options = {}) => new Intl.NumberFormat(locale(), options).format(Number(value || 0));
const formatPercent = (value, digits = 1) => `${formatNumber((Number(value || 0) * 100), { minimumFractionDigits: digits, maximumFractionDigits: digits })}%`;
const formatMoney = (value) => new Intl.NumberFormat(locale(), {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  maximumFractionDigits: 2
}).format(Number(value || 0));
const formatInt = (value) => formatNumber(value, { maximumFractionDigits: 0 });
const compact = (value) => formatNumber(value, { notation: "compact", maximumFractionDigits: 1 });

const updateUrl = () => {
  const url = new URL(window.location.href);
  url.searchParams.set("case", state.caseId);
  url.searchParams.set("lang", state.lang);
  Object.entries(state.filters).forEach(([key, value]) => {
    if (value && value !== "all") url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  });
  window.history.replaceState({}, "", url);
};

const setLanguage = (lang) => {
  state.lang = UI[lang] ? lang : "pt";
  document.documentElement.lang = copy().lang;
  document.title = copy().pageTitle;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    const value = key.split(".").reduce((acc, part) => acc?.[part], copy());
    if (value) node.textContent = value;
  });
  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.langOption === state.lang));
  });
};

const unique = (rows, key) => [...new Set((rows || []).map((row) => row[key]).filter(Boolean))];
const selected = (key, options) => options.includes(state.filters[key]) ? state.filters[key] : "all";

const renderTabs = () => {
  $("#case-tabs").innerHTML = Object.keys(CASES).map((caseId) => `
    <button type="button" role="tab" aria-selected="${caseId === state.caseId}" data-case-id="${caseId}">
      ${escapeHtml(caseCopy(caseId).tab)}
    </button>
  `).join("");

  document.querySelectorAll("[data-case-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.caseId = button.dataset.caseId;
      updateUrl();
      render();
    });
  });
};

const renderIntro = () => {
  const def = CASES[state.caseId];
  const c = caseCopy();
  $("#repo-link").href = def.repo;
  $("#case-intro").innerHTML = `
    <div class="intro-copy">
      <div class="case-tags">${def.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <h2>${escapeHtml(c.title)}</h2>
      <p>${escapeHtml(c.description)}</p>
    </div>
    <aside class="recommendation-card">
      <strong>${escapeHtml(copy().recommendation)}</strong>
      <p>${escapeHtml(c.recommendation)}</p>
    </aside>
  `;
};

const control = (key, values) => {
  const selectedValue = selected(key, values);
  state.filters[key] = selectedValue;
  return `
    <div class="control-card">
      <label for="filter-${key}">${escapeHtml(copy().controls[key])}</label>
      <select id="filter-${key}" data-filter="${key}">
        <option value="all">${escapeHtml(copy().all)}</option>
        ${values.map((value) => `<option value="${escapeHtml(value)}" ${value === selectedValue ? "selected" : ""}>${escapeHtml(label(value))}</option>`).join("")}
      </select>
    </div>
  `;
};

const renderControls = () => {
  const data = datasets[state.caseId];
  let html = "";
  if (state.caseId === "playzone") html = control("channel", unique(data.funnel_by_channel, "acquisition_channel")) + control("category", unique(data.marketplace_category_metrics, "category"));
  if (state.caseId === "ai-quality") html = control("version", unique(data.prompt_version_performance, "prompt_version")) + control("useCase", unique(data.quality_by_use_case, "use_case")) + control("severity", unique(data.issue_distribution, "severity")) + control("issue", unique(data.issue_distribution, "issue_type"));
  if (state.caseId === "pipeline") html = control("severity", unique(data.failed_rules, "severity")) + control("source", unique(data.source_quality, "source_system")) + control("rule", unique(data.failed_rules, "rule_name"));
  if (state.caseId === "retail") html = control("channel", unique(data.channel_performance, "sales_channel")) + control("category", unique(data.category_performance, "category")) + control("month", unique(data.monthly_performance, "order_month"));
  $("#controls").innerHTML = html;
  document.querySelectorAll("[data-filter]").forEach((item) => {
    item.addEventListener("change", () => {
      state.filters[item.dataset.filter] = item.value;
      updateUrl();
      renderFilterBar();
      renderCaseContent();
    });
  });
  renderFilterBar();
};

const currentControlKeys = () => {
  if (state.caseId === "playzone") return ["channel", "category"];
  if (state.caseId === "ai-quality") return ["version", "useCase", "severity", "issue"];
  if (state.caseId === "pipeline") return ["severity", "source", "rule"];
  if (state.caseId === "retail") return ["channel", "category", "month"];
  return [];
};

const resetCurrentFilters = () => {
  currentControlKeys().forEach((key) => {
    state.filters[key] = "all";
  });
  updateUrl();
  renderControls();
  renderCaseContent();
};

const copyCurrentLink = async (button) => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    button.textContent = term("copied");
    window.setTimeout(() => { button.textContent = term("copyLink"); }, 1200);
  } catch {
    button.textContent = window.location.href;
  }
};

const renderFilterBar = () => {
  const active = currentControlKeys().filter((key) => state.filters[key] && state.filters[key] !== "all");
  const chips = active.length ? active.map((key) => `
    <span class="filter-chip"><strong>${escapeHtml(copy().controls[key] || key)}</strong>${escapeHtml(label(state.filters[key]))}</span>
  `).join("") : `<span class="filter-chip">${escapeHtml(term("noActiveFilters"))}</span>`;
  $("#filter-bar").innerHTML = `
    ${chips}
    <button class="filter-action" type="button" data-filter-action="copy">${escapeHtml(term("copyLink"))}</button>
    ${active.length ? `<button class="filter-action" type="button" data-filter-action="clear">${escapeHtml(term("clearFilters"))}</button>` : ""}
  `;
  document.querySelector('[data-filter-action="clear"]')?.addEventListener("click", resetCurrentFilters);
  document.querySelector('[data-filter-action="copy"]')?.addEventListener("click", (event) => copyCurrentLink(event.currentTarget));
};

const statusStrip = (status, reason, layer = "JSON + GitHub Pages") => {
  const blocked = String(status).toLowerCase().includes("blocked") || String(status).toLowerCase().includes("bloque");
  $("#status-strip").innerHTML = `
    <div><strong>${escapeHtml(copy().status)}:</strong> <span>${escapeHtml(label(reason || status))}</span></div>
    <span class="status-badge ${blocked ? "is-blocked" : ""}">${escapeHtml(status)}</span>
  `;
};

const kpiGrid = (items) => `
  <div class="kpi-grid">
    ${items.map((item) => `
      <article class="kpi-card ${item.alert ? "is-alert" : ""}">
        <small>${escapeHtml(item.label)}</small>
        <strong>${escapeHtml(item.value)}</strong>
        <span>${escapeHtml(item.note)}</span>
      </article>
    `).join("")}
  </div>
`;

const cardHead = (title, subtitle, pill = "") => `
  <div class="viz-head">
    <div>
      <h3>${escapeHtml(title)}</h3>
      <p>${escapeHtml(subtitle || "")}</p>
    </div>
    ${pill ? `<span class="metric-pill">${escapeHtml(pill)}</span>` : ""}
  </div>
`;

const bars = (rows, options) => {
  const max = options.max ?? Math.max(...rows.map((row) => Number(row.value || 0)), 1);
  return `
    <div class="bar-list">
      ${rows.map((row) => {
        const width = Math.max(3, Math.min(100, (Number(row.value || 0) / max) * 100));
        return `
          <div class="bar-row ${row.alert ? "is-alert" : ""} ${row.muted ? "is-muted" : ""}">
            <span class="bar-label">${escapeHtml(label(row.label))}</span>
            <span class="bar-track"><i class="bar-fill" style="--w:${width}%"></i></span>
            <span class="bar-value">${escapeHtml(options.format ? options.format(row.value, row) : row.value)}</span>
          </div>
        `;
      }).join("")}
    </div>
  `;
};

const vizCard = (title, subtitle, body, wide = false, pill = "") => `
  <article class="viz-card ${wide ? "is-wide" : ""}">
    ${cardHead(title, subtitle, pill)}
    ${body}
  </article>
`;

const tableCard = (title, subtitle, columns, rows, wide = false, template = "1.4fr 1fr 1fr") => `
  <article class="table-card ${wide ? "is-wide" : ""}">
    ${cardHead(title, subtitle)}
    <div class="data-table">
      <div class="table-row is-head" style="--cols:${template}">
        ${columns.map((col) => `<span>${escapeHtml(col)}</span>`).join("")}
      </div>
      ${rows.map((row) => `
        <div class="table-row" style="--cols:${template}">
          ${row.map((cell, index) => index === 0 ? `<strong>${escapeHtml(cell)}</strong>` : `<span>${escapeHtml(cell)}</span>`).join("")}
        </div>
      `).join("")}
    </div>
  </article>
`;

const lineChart = (rows, xKey, yKey, y2Key, formatY) => {
  const width = 760;
  const height = 260;
  const pad = 42;
  const values = rows.flatMap((row) => [row[yKey], y2Key ? row[y2Key] : null]).filter((value) => Number.isFinite(Number(value)));
  const min = Math.min(0, ...values);
  const max = Math.max(...values, 1);
  const x = (index) => pad + (index * (width - pad * 2)) / Math.max(1, rows.length - 1);
  const y = (value) => height - pad - ((Number(value) - min) / Math.max(0.0001, max - min)) * (height - pad * 2);
  const points = rows.map((row, index) => `${x(index)},${y(row[yKey])}`).join(" ");
  const points2 = y2Key ? rows.map((row, index) => `${x(index)},${y(row[y2Key])}`).join(" ") : "";
  return `
    <svg class="line-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(formatY(max))}">
      <line class="grid" x1="${pad}" y1="${pad}" x2="${width - pad}" y2="${pad}"></line>
      <line class="grid" x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}"></line>
      <polyline class="series" points="${points}"></polyline>
      ${points2 ? `<polyline class="series-secondary" points="${points2}"></polyline>` : ""}
      ${rows.map((row, index) => `<circle cx="${x(index)}" cy="${y(row[yKey])}" r="5"></circle>`).join("")}
      ${rows.map((row, index) => `<text x="${x(index)}" y="${height - 12}" text-anchor="middle">${escapeHtml(String(row[xKey]).slice(5) || row[xKey])}</text>`).join("")}
      <text x="${pad}" y="24">${escapeHtml(formatY(max))}</text>
    </svg>
  `;
};

const heatGrid = (rows, labelKey, valueKey, formatter) => {
  const max = Math.max(...rows.map((row) => Number(row[valueKey] || 0)), 1);
  return `
    <div class="heat-grid">
      ${rows.map((row) => {
        const alpha = 0.06 + (Number(row[valueKey] || 0) / max) * 0.22;
        return `<div class="heat-cell" style="--a:${alpha.toFixed(3)}"><strong>${escapeHtml(label(row[labelKey]))}</strong><span>${escapeHtml(formatter(row[valueKey], row))}</span></div>`;
      }).join("")}
    </div>
  `;
};

const matrixGrid = (rowLabels, colLabels, getValue, formatter) => {
  const values = rowLabels.flatMap((rowLabel) => colLabels.map((colLabel) => Number(getValue(rowLabel, colLabel) || 0)));
  const max = Math.max(...values, 1);
  return `
    <div class="matrix-grid">
      <div class="matrix-row" style="--matrix-cols:${colLabels.length}">
        <div class="matrix-cell is-head"></div>
        ${colLabels.map((colLabel) => `<div class="matrix-cell is-head">${escapeHtml(label(colLabel))}</div>`).join("")}
      </div>
      ${rowLabels.map((rowLabel) => `
        <div class="matrix-row" style="--matrix-cols:${colLabels.length}">
          <div class="matrix-cell is-head">${escapeHtml(label(rowLabel))}</div>
          ${colLabels.map((colLabel) => {
            const value = Number(getValue(rowLabel, colLabel) || 0);
            const alpha = 0.05 + (value / max) * 0.26;
            return `<div class="matrix-cell" style="--a:${alpha.toFixed(3)}"><strong>${escapeHtml(formatter(value))}</strong></div>`;
          }).join("")}
        </div>
      `).join("")}
    </div>
  `;
};

const bubbleChart = (rows, config) => {
  const width = 760;
  const height = 300;
  const pad = 48;
  const maxX = Math.max(...rows.map((row) => Number(row.x || 0)), 1);
  const maxY = Math.max(...rows.map((row) => Number(row.y || 0)), 1);
  const maxSize = Math.max(...rows.map((row) => Number(row.size || 0)), 1);
  const x = (value) => pad + (Number(value || 0) / maxX) * (width - pad * 2);
  const y = (value) => height - pad - (Number(value || 0) / maxY) * (height - pad * 2);
  const r = (value) => 7 + Math.sqrt(Number(value || 0) / maxSize) * 22;
  return `
    <svg class="bubble-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(config.title || "")}">
      <line class="axis" x1="${pad}" y1="${height - pad}" x2="${width - pad}" y2="${height - pad}"></line>
      <line class="axis" x1="${pad}" y1="${pad}" x2="${pad}" y2="${height - pad}"></line>
      <line class="grid" x1="${pad}" y1="${pad}" x2="${width - pad}" y2="${pad}"></line>
      <text x="${width - pad}" y="${height - 14}" text-anchor="end">${escapeHtml(config.xLabel)}</text>
      <text x="${pad}" y="24">${escapeHtml(config.yLabel)}</text>
      ${rows.map((row) => `
        <g class="${row.alert ? "is-alert" : ""}">
          <circle cx="${x(row.x)}" cy="${y(row.y)}" r="${r(row.size)}"></circle>
          <text x="${x(row.x)}" y="${y(row.y) - r(row.size) - 6}" text-anchor="middle">${escapeHtml(label(row.label))}</text>
        </g>
      `).join("")}
    </svg>
  `;
};

const renderPlayzone = (data) => {
  const channel = selected("channel", unique(data.funnel_by_channel, "acquisition_channel"));
  const category = selected("category", unique(data.marketplace_category_metrics, "category"));
  const funnel = channel === "all" ? data.ordered_funnel : data.funnel_by_channel.filter((row) => row.acquisition_channel === channel);
  const summary = data.kpi_summary[0];
  const finalStep = funnel[funnel.length - 1];
  const inviteStep = funnel.find((row) => Number(row.step_order) === 6) || {};
  const categoryRows = data.marketplace_category_metrics.filter((row) => category === "all" || row.category === category);
  const channelRows = unique(data.funnel_by_channel, "acquisition_channel").map((name) => {
    const row = data.funnel_by_channel.find((item) => item.acquisition_channel === name && Number(item.step_order) === 7);
    return { label: name, value: row?.conversion_from_start || 0, muted: channel !== "all" && channel !== name };
  }).sort((a, b) => b.value - a.value);
  const cohortMonths = unique(data.cohort_retention, "signup_month");
  const cohortWeeks = unique(data.cohort_retention, "week_number").sort((a, b) => Number(a) - Number(b));

  statusStrip(term("published"), term("localJson"));
  return `
    ${kpiGrid([
      { label: term("activation"), value: formatPercent(finalStep.conversion_from_start), note: `${formatInt(finalStep.users_at_step)} ${term("usersAtValue")}` },
      { label: term("invitationBottleneck"), value: channel === "all" ? formatPercent(inviteStep.loss_from_previous || 0) : formatPercent(1 - (inviteStep.conversion_from_start || 0)), note: copy().charts.orderedFunnelSub, alert: true },
      { label: term("confirmation"), value: formatPercent(summary.confirmation_rate), note: term("afterInvitation") },
      { label: term("d30Retention"), value: formatPercent(data.retention_by_activation[0].retention_d30), note: label(data.retention_by_activation[0].activation_status) }
    ])}
    <div class="viz-grid">
      ${vizCard(copy().charts.orderedFunnel, copy().charts.orderedFunnelSub, bars(funnel.map((row) => ({
        label: row.step_label,
        value: row.conversion_from_start,
        alert: Number(row.step_order) === 6
      })), { max: 1, format: (value) => formatPercent(value) }), true, channel === "all" ? copy().all : channel)}
      ${vizCard(copy().charts.activationByChannel, term("confirmedPerOpen"), bars(channelRows, { max: 0.12, format: (value) => formatPercent(value) }))}
      ${vizCard(copy().charts.retention, term("retentionWindows"), heatGrid(data.retention_by_activation.flatMap((row) => [
        { cohort: `${label(row.activation_status)} D1`, value: row.retention_d1 },
        { cohort: `${label(row.activation_status)} D7`, value: row.retention_d7 },
        { cohort: `${label(row.activation_status)} D30`, value: row.retention_d30 }
      ]), "cohort", "value", (value) => formatPercent(value)))}
      ${vizCard(copy().charts.cohortHeatmap, `${term("cohort")} x ${term("week")}`, matrixGrid(cohortMonths, cohortWeeks.map(String), (month, week) => {
        const row = data.cohort_retention.find((item) => item.signup_month === month && String(item.week_number) === String(week));
        return row?.retention_rate || 0;
      }, (value) => formatPercent(value)), true)}
      ${vizCard(copy().charts.liquidityMap, `${term("opportunities")} x ${term("confirmationRate")}`, bubbleChart(categoryRows.map((row) => ({
        label: row.category,
        x: row.opportunities,
        y: row.confirmation_rate,
        size: row.confirmed_bookings,
        alert: row.confirmation_rate < 0.55
      })), { xLabel: term("opportunities"), yLabel: term("confirmationRate"), title: copy().charts.liquidityMap }))}
      ${tableCard(copy().charts.categoryLiquidity, term("invitationsBookingsTime"), [term("category"), term("confirmed"), term("rate"), term("avgHours")], categoryRows.map((row) => [
        row.category,
        formatInt(row.confirmed_bookings),
        formatPercent(row.confirmation_rate),
        formatNumber(row.avg_hours_to_confirmation, { maximumFractionDigits: 1 })
      ]), true, "1.4fr 0.8fr 0.8fr 0.8fr")}
    </div>
  `;
};

const renderAiQuality = (data) => {
  const versions = unique(data.prompt_version_performance, "prompt_version");
  const useCases = unique(data.quality_by_use_case, "use_case");
  const version = selected("version", versions);
  const useCase = selected("useCase", useCases);
  const severity = selected("severity", unique(data.issue_distribution, "severity"));
  const issue = selected("issue", unique(data.issue_distribution, "issue_type"));
  const base = version === "all" ? data.kpi_summary[0] : data.prompt_version_performance.find((row) => row.prompt_version === version);
  const backlog = data.improvement_backlog.filter((row) => (version === "all" || row.prompt_version === version) && (useCase === "all" || row.use_case === useCase));
  const qualityRows = data.quality_by_use_case.filter((row) => useCase === "all" || row.use_case === useCase);
  const issueRows = data.issue_distribution.filter((row) => (severity === "all" || row.severity === severity) && (issue === "all" || row.issue_type === issue));
  statusStrip(term("published"), term("localJson"));

  return `
    ${kpiGrid([
      { label: term("releaseReady"), value: formatPercent(base.release_ready_rate), note: version === "all" ? term("allPromptVersions") : version },
      { label: term("qualityScore"), value: formatNumber(base.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), note: term("scaleOneToFive") },
      { label: term("criticalIssueRate"), value: formatPercent(base.critical_issue_rate), note: term("operationalRisk"), alert: base.critical_issue_rate > 0.1 },
      { label: term("reviewed"), value: formatInt(base.reviewed_responses), note: term("responsesEvaluated") }
    ])}
    <div class="viz-grid">
      ${vizCard(copy().charts.promptVersion, term("readyRateByVersion"), bars(data.prompt_version_performance.map((row) => ({
        label: row.prompt_version,
        value: row.release_ready_rate,
        muted: version !== "all" && version !== row.prompt_version
      })), { max: 0.7, format: (value) => formatPercent(value) }))}
      ${vizCard(copy().charts.useCaseQuality, term("avgScoreByUseCase"), bars(qualityRows.map((row) => ({
        label: row.use_case,
        value: row.avg_quality_score
      })).sort((a, b) => b.value - a.value), { max: 5, format: (value) => formatNumber(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }))}
      ${vizCard(copy().charts.qualityTrend, term("monthlyTrend"), lineChart(data.monthly_quality_trend, "response_month", "avg_quality_score", null, (value) => formatNumber(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 })), true)}
      ${vizCard(copy().charts.releaseMatrix, `${term("version")} x ${term("useCase")}`, matrixGrid(useCases, versions, (caseName, promptVersion) => {
        const row = data.improvement_backlog.find((item) => item.use_case === caseName && item.prompt_version === promptVersion);
        return row?.release_ready_rate || 0;
      }, (value) => formatPercent(value)), true)}
      ${vizCard(copy().charts.dimensions, term("avgDimensionScore"), heatGrid(data.dimension_scores, "dimension", "avg_score", (value) => formatNumber(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 })))}
      ${tableCard(copy().charts.issues, term("issueShareBySeverity"), [term("issue"), term("severity"), term("count"), term("share")], issueRows.slice(0, 8).map((row) => [
        row.issue_type,
        row.severity,
        formatInt(row.occurrences),
        formatPercent(row.share_of_reviews)
      ]), false, "1.4fr 0.8fr 0.7fr 0.7fr")}
      ${tableCard(copy().charts.backlog, version === "all" ? term("topBacklog") : `${term("filteredBy")} ${version}`, [term("useCase"), term("version"), term("notApproved"), term("releaseReady")], backlog.slice(0, 8).map((row) => [
        row.use_case,
        row.prompt_version,
        formatInt(row.not_approved_cases),
        formatPercent(row.release_ready_rate)
      ]), true, "1.5fr 0.7fr 0.8fr 0.8fr")}
    </div>
  `;
};

const renderPipeline = (data) => {
  const severities = unique(data.failed_rules, "severity");
  const sources = unique(data.source_quality, "source_system");
  const severity = selected("severity", severities);
  const source = selected("source", sources);
  const rule = selected("rule", unique(data.failed_rules, "rule_name"));
  const rules = data.failed_rules.filter((row) => (severity === "all" || row.severity === severity) && (rule === "all" || row.rule_name === rule));
  const sourceQuality = data.source_quality.filter((row) => source === "all" || row.source_system === source);
  const readyRevenue = data.revenue_ready.filter((row) => source === "all" || row.source_system === source);
  statusStrip(data.publication_status, data.publication_reason);

  return `
    ${kpiGrid([
      { label: term("qualityScoreShort"), value: formatPercent(data.kpis.quality_score), note: term("highAverage") },
      { label: term("criticalFailures"), value: formatInt(data.kpis.critical_failures), note: term("blockingPublication"), alert: true },
      { label: term("readyOrders"), value: formatInt(data.kpis.ready_orders), note: `${formatInt(data.kpis.raw_orders)} ${term("rawOrders")}` },
      { label: term("reviewOrders"), value: formatInt(data.kpis.review_orders), note: term("needCorrection"), alert: data.kpis.review_orders > 0 }
    ])}
    <div class="viz-grid">
      ${vizCard(copy().charts.failedRules, severity === "all" ? term("criticalWarningRules") : severity, bars(rules.map((row) => ({
        label: row.rule_name,
        value: row.failed_records,
        alert: row.severity === "Critical"
      })), { format: (value) => formatInt(value) }), true)}
      ${vizCard(copy().charts.sourceReadiness, source === "all" ? term("allSources") : source, bars(sourceQuality.map((row) => ({
        label: row.source_system,
        value: row.ready_rate
      })), { max: 1, format: (value) => formatPercent(value) }))}
      ${tableCard(copy().charts.readyRevenue, term("completedCaptured"), [term("source"), term("orders"), term("orderTotal"), term("captured")], readyRevenue.map((row) => [
        row.source_system,
        formatInt(row.completed_orders),
        formatMoney(row.order_total),
        formatMoney(row.captured_payment_amount)
      ]), false, "1fr 0.7fr 1fr 1fr")}
      ${tableCard(copy().charts.reviewQueue, term("blockedRecords"), [term("order"), term("source"), term("total"), term("issue")], data.review_records.map((row) => [
        row.order_id,
        row.source_system,
        formatMoney(row.order_total),
        row.issue_summary
      ]), true, "0.7fr 0.8fr 0.8fr 1.7fr")}
      ${vizCard(copy().charts.categoryImpact, `${term("revenue")} x ${term("margin")}`, bubbleChart(data.category_metrics.map((row) => ({
        label: row.category,
        x: row.net_revenue,
        y: row.gross_margin,
        size: row.units,
        alert: row.gross_margin / Math.max(1, row.net_revenue) < 0.35
      })), { xLabel: term("revenue"), yLabel: term("margin"), title: copy().charts.categoryImpact }), true)}
    </div>
  `;
};

const renderRetail = (data) => {
  const channels = unique(data.channel_performance, "sales_channel");
  const categories = unique(data.category_performance, "category");
  const channel = selected("channel", channels);
  const category = selected("category", categories);
  const month = selected("month", unique(data.monthly_performance, "order_month"));
  const channelRows = data.channel_performance.filter((row) => channel === "all" || row.sales_channel === channel);
  const categoryRows = data.category_performance.filter((row) => category === "all" || row.category === category);
  const productRows = data.product_ranking.filter((row) => category === "all" || row.category === category);
  const channelBase = channel === "all" ? data.kpis : channelRows[0];
  const trendRows = data.monthly_performance.filter((row) => month === "all" || row.order_month === month);
  const targetRows = data.target_tracking.filter((row) => (channel === "all" || row.sales_channel === channel) && (month === "all" || row.target_month === month));
  const targetByChannel = channels.map((name) => {
    const rows = data.target_tracking.filter((row) => row.sales_channel === name && (month === "all" || row.target_month === month));
    return {
      label: name,
      value: rows.reduce((sum, row) => sum + row.revenue_target_attainment, 0) / Math.max(1, rows.length),
      muted: channel !== "all" && channel !== name
    };
  });

  statusStrip(data.publication_status, data.publication_reason);
  return `
    ${kpiGrid([
      { label: term("netRevenue"), value: formatMoney(channelBase.net_revenue), note: channel === "all" ? term("allChannels") : channel },
      { label: term("grossMargin"), value: formatPercent(channelBase.gross_margin_pct), note: formatMoney(channelBase.gross_margin) },
      { label: term("deliveredOrders"), value: formatInt(channelBase.delivered_orders), note: term("validForBi") },
      { label: term("averageTicket"), value: formatMoney(data.kpis.average_ticket), note: term("portfolioMetric") }
    ])}
    <div class="viz-grid">
      ${vizCard(copy().charts.revenueTrend, term("revenueMarginReference"), lineChart(trendRows, "order_month", "net_revenue", null, formatMoney), true)}
      ${vizCard(copy().charts.channelRevenue, channel === "all" ? term("revenueShare") : channel, bars(channelRows.map((row) => ({
        label: row.sales_channel,
        value: row.net_revenue
      })), { format: formatMoney }))}
      ${vizCard(copy().charts.categoryMargin, category === "all" ? term("allCategories") : label(category), bars(categoryRows.map((row) => ({
        label: row.category,
        value: row.gross_margin_pct,
        alert: row.gross_margin_pct < 0.3
      })), { max: 0.45, format: (value) => formatPercent(value) }))}
      ${vizCard(copy().charts.targets, term("avgTarget"), bars(targetByChannel, { max: 1.12, format: (value) => formatPercent(value) }))}
      ${tableCard(copy().charts.targets, `${term("target")} x ${term("realized")}`, [term("month"), term("channel"), term("target"), term("realized")], targetRows.slice(0, 8).map((row) => [
        row.target_month,
        row.sales_channel,
        formatMoney(row.revenue_target),
        formatMoney(row.realized_revenue)
      ]), false, "0.8fr 1fr 1fr 1fr")}
      ${vizCard(copy().charts.productMap, `${term("revenue")} x ${term("margin")}`, bubbleChart(productRows.slice(0, 10).map((row) => ({
        label: row.product_name,
        x: row.net_revenue,
        y: row.gross_margin_pct,
        size: row.units_sold,
        alert: row.gross_margin_pct < 0.3
      })), { xLabel: term("revenue"), yLabel: term("margin"), title: copy().charts.productMap }), true)}
      ${tableCard(copy().charts.products, category === "all" ? term("topProducts") : label(category), [term("product"), term("category"), term("netRevenue"), term("margin")], productRows.slice(0, 8).map((row) => [
        row.product_name,
        label(row.category),
        formatMoney(row.net_revenue),
        formatPercent(row.gross_margin_pct)
      ]), true, "1.7fr 0.8fr 0.9fr 0.8fr")}
    </div>
  `;
};

const renderCaseContent = () => {
  const data = datasets[state.caseId];
  if (!data) {
    $("#dashboard-content").innerHTML = `<div class="loading">Loading...</div>`;
    return;
  }
  if (state.caseId === "playzone") $("#dashboard-content").innerHTML = renderPlayzone(data);
  if (state.caseId === "ai-quality") $("#dashboard-content").innerHTML = renderAiQuality(data);
  if (state.caseId === "pipeline") $("#dashboard-content").innerHTML = renderPipeline(data);
  if (state.caseId === "retail") $("#dashboard-content").innerHTML = renderRetail(data);
};

const render = () => {
  setLanguage(state.lang);
  renderTabs();
  renderIntro();
  renderControls();
  renderCaseContent();
  updateUrl();
};

document.querySelectorAll("[data-lang-option]").forEach((button) => {
  button.addEventListener("click", () => {
    state.lang = button.dataset.langOption;
    updateUrl();
    render();
  });
});

const load = async () => {
  $("#dashboard-content").innerHTML = `<div class="loading">Loading dashboards...</div>`;
  try {
    const entries = await Promise.all(Object.entries(CASES).map(async ([caseId, def]) => {
      const response = await fetch(def.file);
      if (!response.ok) throw new Error(`${def.file}: ${response.status}`);
      return [caseId, await response.json()];
    }));
    datasets = Object.fromEntries(entries);
    render();
  } catch (error) {
    $("#dashboard-content").innerHTML = `<div class="error">Dashboard data could not be loaded: ${escapeHtml(error.message)}</div>`;
  }
};

load();
