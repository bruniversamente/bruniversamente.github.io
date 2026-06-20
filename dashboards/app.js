const params = new URLSearchParams(window.location.search);

const CASES = {
  playzone: {
    file: "data/playzone.json",
    repo: "https://github.com/bruniversamente/product-analytics-funnel-retention",
    tags: ["Product Analytics", "Funnel", "Retention", "Marketplace"],
    copy: {
      pt: {
        tab: "Product Analytics",
        title: "Product Analytics: funil de ativação do marketplace Playzone",
        description: "No marketplace Playzone, só 5,6% da jornada chega à reserva confirmada. A maior perda aparece antes do convite enviado.",
        recommendation: "Priorizar experimentos que aumentem convite enviado e qualidade de oportunidade antes de otimizar etapas já saudáveis."
      },
      en: {
        tab: "Product Analytics",
        title: "Product Analytics: activation funnel for the Playzone marketplace",
        description: "In the Playzone marketplace, only 5.6% of the journey reaches confirmed booking. The largest loss appears before invitation sent.",
        recommendation: "Prioritize experiments that increase invitation sent and opportunity quality before optimizing already healthy steps."
      },
      es: {
        tab: "Product Analytics",
        title: "Product Analytics: embudo de activación del marketplace Playzone",
        description: "En el marketplace Playzone, solo 5,6% de la jornada llega a reserva confirmada. La mayor pérdida aparece antes de enviar la invitación.",
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
        description: "41,0% release-ready. A v3 é o melhor baseline, com backlog por versão, caso de uso e tipo de falha.",
        recommendation: "Usar v3 como baseline, atacar falhas de contexto e actionability, e manter gate de release por caso de uso."
      },
      en: {
        tab: "AI Quality",
        title: "AI Quality: release governance for AI responses",
        description: "41.0% release-ready. v3 is the best baseline, with backlog by version, use case and failure type.",
        recommendation: "Use v3 as the baseline, address context and actionability failures, and keep a release gate by use case."
      },
      es: {
        tab: "AI Quality",
        title: "AI Quality: gobernanza de release para respuestas de IA",
        description: "41,0% release-ready. v3 es el mejor baseline, con backlog por versión, caso de uso y tipo de falla.",
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
        description: "98,2% de score geral, mas 9 falhas críticas bloqueiam a publicação executiva.",
        recommendation: "Publicar apenas marts Ready, corrigir falhas críticas e tratar warnings fora da receita executiva."
      },
      en: {
        tab: "Pipeline Quality",
        title: "Pipeline Quality: publication blocked despite a high score",
        description: "98.2% overall score, but 9 critical failures block executive publication.",
        recommendation: "Publish Ready marts only, fix critical failures and monitor warnings outside executive revenue."
      },
      es: {
        tab: "Pipeline Quality",
        title: "Pipeline Quality: publicación bloqueada con score alto",
        description: "98,2% de score general, pero 9 fallas críticas bloquean la publicación ejecutiva.",
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
        description: "R$ 1,08M em receita, 31,0% de margem e alertas por canal, categoria, mês e produto.",
        recommendation: "Proteger categorias com margem pressionada e usar metas por canal para explicar onde receita cresceu sem preservar rentabilidade."
      },
      en: {
        tab: "Retail BI",
        title: "Retail BI: executive revenue, margin and targets",
        description: "R$1.08M revenue, 31.0% margin and alerts by channel, category, month and product.",
        recommendation: "Protect categories with pressured margin and use channel targets to explain where revenue grew without preserving profitability."
      },
      es: {
        tab: "Retail BI",
        title: "Retail BI: ingresos, margen y metas ejecutivas",
        description: "R$1,08M en ingresos, 31,0% de margen y alertas por canal, categoría, mes y producto.",
        recommendation: "Proteger categorías con margen presionado y usar metas por canal para explicar dónde creció ingreso sin preservar rentabilidad."
      }
    }
  }
};

const JOURNEYS = {
  playzone: {
    pt: [
      {
        step: "01",
        kicker: "Brief",
        title: "O que o marketplace Playzone precisava descobrir",
        body: "Playzone é a marca do marketplace deste case. A pergunta de negócio era onde uma jornada com interesse real deixava de virar reserva confirmada, para priorizar produto sem olhar apenas volume bruto.",
        logic: "perda_etapa = 1 - usuarios_etapa / usuarios_etapa_anterior\nconversao_total = usuarios_etapa / usuarios_inicio",
        meta: ["Produto", "Funil ordenado", "Priorização"]
      },
      {
        step: "02",
        kicker: "Camada de dados",
        title: "Eventos organizados como uma jornada comparável",
        body: "Transformei eventos em etapas de decisão: abertura, busca, oportunidade, convite, aceite e reserva confirmada. Canal e categoria foram preservados para separar gargalo de aquisição, oferta e experiência.",
        logic: "SELECT canal, categoria, etapa,\n       COUNT(DISTINCT user_id) AS usuarios\nFROM eventos\nGROUP BY 1, 2, 3",
        meta: ["Python", "DuckDB/SQL", "JSON versionado"]
      },
      {
        step: "03",
        kicker: "Diagnóstico",
        title: "Volume não bastava: validei retenção e liquidez",
        body: "Depois do funil, comparei retenção D1/D7/D30 e liquidez por categoria. Essa etapa evita recomendar crescimento em canais que trazem usuários, mas não sustentam reservas confirmadas.",
        logic: "liquidez = reservas_confirmadas / oportunidades\nretencao_D30 = usuarios_ativos_D30 / usuarios_ativados",
        meta: ["Cohort", "Retenção", "Liquidez"]
      },
      {
        step: "04",
        kicker: "Decisão",
        title: "A intervenção correta vem antes da confirmação",
        body: "A leitura final é priorizar convite enviado e qualidade da oportunidade. A confirmação em si está menos problemática; o risco seria investir em polimento tarde demais na jornada.",
        meta: ["Experimentos", "Métrica de sucesso", "Produto"]
      }
    ],
    en: [
      {
        step: "01",
        kicker: "Brief",
        title: "What the Playzone marketplace needed to learn",
        body: "Playzone is the marketplace brand in this case. The business question was where a journey with real interest stopped becoming a confirmed booking, so product priorities would not be based on raw volume alone.",
        logic: "step_loss = 1 - users_at_step / users_previous_step\ntotal_conversion = users_at_step / users_start",
        meta: ["Product", "Ordered funnel", "Prioritization"]
      },
      {
        step: "02",
        kicker: "Data layer",
        title: "Events organized as a comparable journey",
        body: "I turned events into decision steps: app open, search, opportunity, invitation, acceptance and confirmed booking. Channel and category stayed in the model to separate acquisition, supply and experience bottlenecks.",
        logic: "SELECT channel, category, step,\n       COUNT(DISTINCT user_id) AS users\nFROM events\nGROUP BY 1, 2, 3",
        meta: ["Python", "DuckDB/SQL", "Versioned JSON"]
      },
      {
        step: "03",
        kicker: "Diagnosis",
        title: "Volume was not enough: retention and liquidity mattered",
        body: "After the funnel, I compared D1/D7/D30 retention and category liquidity. This avoids recommending growth in channels that bring users but do not sustain confirmed bookings.",
        logic: "liquidity = confirmed_bookings / opportunities\nD30_retention = active_users_D30 / activated_users",
        meta: ["Cohort", "Retention", "Liquidity"]
      },
      {
        step: "04",
        kicker: "Decision",
        title: "The right intervention happens before confirmation",
        body: "The final read is to prioritize invitation sent and opportunity quality. Confirmation itself is less problematic; the risk would be polishing too late in the journey.",
        meta: ["Experiments", "Success metric", "Product"]
      }
    ],
    es: [
      {
        step: "01",
        kicker: "Brief",
        title: "Qué necesitaba descubrir el marketplace Playzone",
        body: "Playzone es la marca del marketplace de este caso. La pregunta de negocio era dónde una jornada con interés real dejaba de convertirse en reserva confirmada, para priorizar producto sin mirar solo volumen bruto.",
        logic: "perdida_etapa = 1 - usuarios_etapa / usuarios_etapa_anterior\nconversion_total = usuarios_etapa / usuarios_inicio",
        meta: ["Producto", "Embudo ordenado", "Priorización"]
      },
      {
        step: "02",
        kicker: "Capa de datos",
        title: "Eventos organizados como una jornada comparable",
        body: "Transformé eventos en etapas de decisión: apertura, búsqueda, oportunidad, invitación, aceptación y reserva confirmada. Canal y categoría quedaron en el modelo para separar adquisición, oferta y experiencia.",
        logic: "SELECT canal, categoria, etapa,\n       COUNT(DISTINCT user_id) AS usuarios\nFROM eventos\nGROUP BY 1, 2, 3",
        meta: ["Python", "DuckDB/SQL", "JSON versionado"]
      },
      {
        step: "03",
        kicker: "Diagnóstico",
        title: "El volumen no bastaba: validé retención y liquidez",
        body: "Después del embudo, comparé retención D1/D7/D30 y liquidez por categoría. Así evité recomendar crecimiento en canales que traen usuarios, pero no sostienen reservas confirmadas.",
        logic: "liquidez = reservas_confirmadas / oportunidades\nretencion_D30 = usuarios_activos_D30 / usuarios_activados",
        meta: ["Cohort", "Retención", "Liquidez"]
      },
      {
        step: "04",
        kicker: "Decisión",
        title: "La intervención correcta ocurre antes de la confirmación",
        body: "La lectura final es priorizar invitación enviada y calidad de oportunidad. La confirmación en sí está menos problemática; el riesgo sería pulir demasiado tarde en la jornada.",
        meta: ["Experimentos", "Métrica de éxito", "Producto"]
      }
    ]
  },
  "ai-quality": {
    pt: [
      {
        step: "01",
        kicker: "Brief",
        title: "A decisão não era escolher o prompt com maior média",
        body: "O problema era decidir quais respostas de IA poderiam entrar em release sem criar risco operacional. Por isso a análise precisava olhar prontidão, falhas críticas e caso de uso ao mesmo tempo.",
        logic: "release_ready = score >= limite\n                AND falha_critica = 0\n                AND caso_de_uso_aprovado = true",
        meta: ["IA aplicada", "Governança", "Release gate"]
      },
      {
        step: "02",
        kicker: "Rubrica",
        title: "Transformei avaliação qualitativa em critérios auditáveis",
        body: "Cada resposta foi avaliada por versão de prompt, caso de uso, dimensão de qualidade, severidade e tipo de falha. Isso permite justificar por que uma versão melhora sem esconder riscos específicos.",
        logic: "score_final = media(contexto, exatidao, actionability, tom)\nfalha_critica_rate = falhas_criticas / respostas_avaliadas",
        meta: ["Python", "DuckDB/SQL", "Taxonomia"]
      },
      {
        step: "03",
        kicker: "Backlog",
        title: "A média orienta, mas a matriz decide o release",
        body: "Cruzei versão, caso de uso e tipo de falha para montar um backlog acionável. A v3 aparece como baseline, mas ainda exige controle por caso de uso antes de ser tratada como release geral.",
        logic: "prioridade = casos_nao_aprovados * severidade\nbacklog = ORDER BY prioridade DESC",
        meta: ["Matriz", "Severidade", "Priorização"]
      },
      {
        step: "04",
        kicker: "Decisão",
        title: "Release só passa por gate, não por média geral",
        body: "A recomendação é usar v3 como baseline, atacar falhas de contexto e actionability, e manter um gate por caso de uso até a taxa release-ready ficar consistente.",
        meta: ["Baseline v3", "Risco", "Próxima iteração"]
      }
    ],
    en: [
      {
        step: "01",
        kicker: "Brief",
        title: "The decision was not to pick the prompt with the highest average",
        body: "The problem was deciding which AI responses could be released without creating operational risk. The analysis therefore had to connect readiness, critical failures and use case.",
        logic: "release_ready = score >= threshold\n                AND critical_failure = 0\n                AND use_case_approved = true",
        meta: ["Applied AI", "Governance", "Release gate"]
      },
      {
        step: "02",
        kicker: "Rubric",
        title: "Qualitative review became auditable criteria",
        body: "Each response was evaluated by prompt version, use case, quality dimension, severity and failure type. That makes improvements explainable without hiding specific risks.",
        logic: "final_score = avg(context, accuracy, actionability, tone)\ncritical_failure_rate = critical_failures / reviewed_responses",
        meta: ["Python", "DuckDB/SQL", "Taxonomy"]
      },
      {
        step: "03",
        kicker: "Backlog",
        title: "The average informs, but the matrix decides release",
        body: "I crossed version, use case and failure type to create an actionable backlog. v3 is the baseline, but still needs use-case control before becoming a general release.",
        logic: "priority = not_approved_cases * severity\nbacklog = ORDER BY priority DESC",
        meta: ["Matrix", "Severity", "Prioritization"]
      },
      {
        step: "04",
        kicker: "Decision",
        title: "Release passes through a gate, not a global average",
        body: "The recommendation is to use v3 as baseline, address context and actionability failures, and keep a use-case gate until release-ready performance is consistent.",
        meta: ["v3 baseline", "Risk", "Next iteration"]
      }
    ],
    es: [
      {
        step: "01",
        kicker: "Brief",
        title: "La decisión no era elegir el prompt con mayor media",
        body: "El problema era decidir qué respuestas de IA podían entrar en release sin crear riesgo operacional. Por eso el análisis debía conectar preparación, fallas críticas y caso de uso.",
        logic: "release_ready = score >= limite\n                AND falla_critica = 0\n                AND caso_de_uso_aprobado = true",
        meta: ["IA aplicada", "Gobernanza", "Release gate"]
      },
      {
        step: "02",
        kicker: "Rúbrica",
        title: "La evaluación cualitativa se volvió auditable",
        body: "Cada respuesta fue evaluada por versión de prompt, caso de uso, dimensión de calidad, severidad y tipo de falla. Así la mejora queda explicable sin esconder riesgos específicos.",
        logic: "score_final = media(contexto, exactitud, accionabilidad, tono)\ntasa_falla_critica = fallas_criticas / respuestas_evaluadas",
        meta: ["Python", "DuckDB/SQL", "Taxonomía"]
      },
      {
        step: "03",
        kicker: "Backlog",
        title: "La media orienta, pero la matriz decide el release",
        body: "Crucé versión, caso de uso y tipo de falla para crear un backlog accionable. v3 aparece como baseline, pero aún necesita control por caso de uso antes de ser release general.",
        logic: "prioridad = casos_no_aprobados * severidad\nbacklog = ORDER BY prioridad DESC",
        meta: ["Matriz", "Severidad", "Priorización"]
      },
      {
        step: "04",
        kicker: "Decisión",
        title: "El release pasa por gate, no por media global",
        body: "La recomendación es usar v3 como baseline, atacar fallas de contexto y accionabilidad, y mantener gate por caso de uso hasta estabilizar release-ready.",
        meta: ["Baseline v3", "Riesgo", "Próxima iteración"]
      }
    ]
  },
  pipeline: {
    pt: [
      {
        step: "01",
        kicker: "Brief",
        title: "Score alto não significa dado publicável",
        body: "O case responde se a camada executiva poderia ser publicada mesmo com qualidade média alta. A decisão precisava separar warnings toleráveis de falhas críticas que contaminariam BI, receita e confiança.",
        logic: "publicavel = falhas_criticas == 0\nscore_qualidade = checks_ok / checks_total",
        meta: ["Data Quality", "BI gate", "Risco executivo"]
      },
      {
        step: "02",
        kicker: "Regras",
        title: "Cada check recebeu severidade, origem e impacto",
        body: "Modelei regras de integridade para pagamentos, pedidos, clientes e produtos. A média geral continuou visível, mas a decisão de publicação passou a depender das regras críticas.",
        logic: "CASE\n  WHEN severidade = 'Critical' THEN 'Review'\n  ELSE 'Ready'\nEND AS publish_status",
        meta: ["Python", "DuckDB/SQL", "Checks"]
      },
      {
        step: "03",
        kicker: "Operação",
        title: "Criei filas Ready e Review antes do dashboard executivo",
        body: "A análise mostra quais origens podem alimentar BI e quais registros precisam voltar para correção. Isso transforma data quality em fluxo operacional, não apenas em relatório de erro.",
        logic: "ready_orders = pedidos WHERE publish_status = 'Ready'\nreview_queue = pedidos WHERE publish_status = 'Review'",
        meta: ["Marts", "Fila de revisão", "Publicação"]
      },
      {
        step: "04",
        kicker: "Decisão",
        title: "Publicar só o que está pronto e corrigir o restante",
        body: "A recomendação é publicar apenas marts Ready, corrigir as 9 falhas críticas e monitorar warnings fora da receita executiva até a camada completa ficar confiável.",
        meta: ["Ready only", "Correção", "Governança"]
      }
    ],
    en: [
      {
        step: "01",
        kicker: "Brief",
        title: "A high score does not mean publishable data",
        body: "The case answers whether the executive layer could be published despite a high average quality score. The decision had to separate tolerable warnings from critical failures that would damage BI, revenue and trust.",
        logic: "publishable = critical_failures == 0\nquality_score = checks_passed / checks_total",
        meta: ["Data Quality", "BI gate", "Executive risk"]
      },
      {
        step: "02",
        kicker: "Rules",
        title: "Each check received severity, source and impact",
        body: "I modeled integrity rules for payments, orders, customers and products. The overall average remained visible, but publication depended on critical rules.",
        logic: "CASE\n  WHEN severity = 'Critical' THEN 'Review'\n  ELSE 'Ready'\nEND AS publish_status",
        meta: ["Python", "DuckDB/SQL", "Checks"]
      },
      {
        step: "03",
        kicker: "Operation",
        title: "Ready and Review queues came before executive BI",
        body: "The analysis shows which sources can feed BI and which records must return for correction. Data quality becomes an operational flow, not just an error report.",
        logic: "ready_orders = orders WHERE publish_status = 'Ready'\nreview_queue = orders WHERE publish_status = 'Review'",
        meta: ["Marts", "Review queue", "Publication"]
      },
      {
        step: "04",
        kicker: "Decision",
        title: "Publish only what is ready and fix the rest",
        body: "The recommendation is to publish Ready marts only, fix the 9 critical failures and monitor warnings outside executive revenue until the full layer is trustworthy.",
        meta: ["Ready only", "Correction", "Governance"]
      }
    ],
    es: [
      {
        step: "01",
        kicker: "Brief",
        title: "Un score alto no significa dato publicable",
        body: "El caso responde si la capa ejecutiva podía publicarse aunque el score promedio fuera alto. La decisión debía separar warnings tolerables de fallas críticas que contaminarían BI, ingreso y confianza.",
        logic: "publicable = fallas_criticas == 0\nscore_calidad = checks_ok / checks_total",
        meta: ["Data Quality", "BI gate", "Riesgo ejecutivo"]
      },
      {
        step: "02",
        kicker: "Reglas",
        title: "Cada check recibió severidad, origen e impacto",
        body: "Modelé reglas de integridad para pagos, pedidos, clientes y productos. La media general siguió visible, pero la decisión de publicación pasó a depender de reglas críticas.",
        logic: "CASE\n  WHEN severidad = 'Critical' THEN 'Review'\n  ELSE 'Ready'\nEND AS publish_status",
        meta: ["Python", "DuckDB/SQL", "Checks"]
      },
      {
        step: "03",
        kicker: "Operación",
        title: "Creé colas Ready y Review antes del BI ejecutivo",
        body: "El análisis muestra qué orígenes pueden alimentar BI y qué registros deben volver a corrección. Data quality se vuelve flujo operacional, no solo reporte de errores.",
        logic: "ready_orders = pedidos WHERE publish_status = 'Ready'\nreview_queue = pedidos WHERE publish_status = 'Review'",
        meta: ["Marts", "Cola de revisión", "Publicación"]
      },
      {
        step: "04",
        kicker: "Decisión",
        title: "Publicar solo lo listo y corregir el resto",
        body: "La recomendación es publicar solo marts Ready, corregir las 9 fallas críticas y monitorear warnings fuera del ingreso ejecutivo hasta que la capa completa sea confiable.",
        meta: ["Ready only", "Corrección", "Gobernanza"]
      }
    ]
  },
  retail: {
    pt: [
      {
        step: "01",
        kicker: "Brief",
        title: "Receita cresceu, mas a pergunta era qualidade do crescimento",
        body: "O dashboard responde se a operação cresceu preservando margem e metas. A leitura executiva precisava unir receita, margem, canal, categoria e produto em uma visão filtrável.",
        logic: "crescimento_saudavel = receita_cresce\n                       AND margem_pct >= limite\n                       AND atingimento_meta >= 100%",
        meta: ["Retail BI", "Executivo", "Rentabilidade"]
      },
      {
        step: "02",
        kicker: "Métricas",
        title: "Modelei receita, margem, ticket e meta no mesmo mart",
        body: "A camada de BI calcula receita líquida, margem bruta, ticket médio, pedidos entregues e atingimento de meta. Isso evita uma leitura otimista de receita que ignora rentabilidade.",
        logic: "margem_bruta_pct = margem_bruta / receita_liquida\natingimento_meta = receita_realizada / meta_receita",
        meta: ["Python", "DuckDB/SQL", "Marts BI"]
      },
      {
        step: "03",
        kicker: "Diagnóstico",
        title: "Cruzei canal, categoria e produto para explicar o resultado",
        body: "A análise separa onde a receita veio, quais categorias pressionam margem e quais produtos explicam a variação. O filtro permite reproduzir a leitura executiva por recorte.",
        logic: "diagnostico = canal + categoria + produto\nalerta_margem = margem_bruta_pct < limite_categoria",
        meta: ["Segmentação", "Metas", "Produtos"]
      },
      {
        step: "04",
        kicker: "Decisão",
        title: "Crescimento só vale se margem e meta acompanharem",
        body: "A recomendação é proteger categorias com margem pressionada e usar metas por canal para explicar onde receita cresceu sem preservar rentabilidade.",
        meta: ["Margem", "Canal", "Plano executivo"]
      }
    ],
    en: [
      {
        step: "01",
        kicker: "Brief",
        title: "Revenue grew, but the question was growth quality",
        body: "The dashboard answers whether the operation grew while preserving margin and targets. The executive view had to connect revenue, margin, channel, category and product in a filterable layer.",
        logic: "healthy_growth = revenue_grows\n                 AND margin_pct >= threshold\n                 AND target_attainment >= 100%",
        meta: ["Retail BI", "Executive", "Profitability"]
      },
      {
        step: "02",
        kicker: "Metrics",
        title: "Revenue, margin, ticket and target were modeled in one mart",
        body: "The BI layer calculates net revenue, gross margin, average ticket, delivered orders and target attainment. This avoids an optimistic revenue read that ignores profitability.",
        logic: "gross_margin_pct = gross_margin / net_revenue\ntarget_attainment = realized_revenue / revenue_target",
        meta: ["Python", "DuckDB/SQL", "BI marts"]
      },
      {
        step: "03",
        kicker: "Diagnosis",
        title: "Channel, category and product explain the result",
        body: "The analysis separates where revenue came from, which categories pressure margin and which products explain the variation. Filters let the executive read be reproduced by segment.",
        logic: "diagnosis = channel + category + product\nmargin_alert = gross_margin_pct < category_threshold",
        meta: ["Segmentation", "Targets", "Products"]
      },
      {
        step: "04",
        kicker: "Decision",
        title: "Growth only matters when margin and targets follow",
        body: "The recommendation is to protect categories with pressured margin and use channel targets to explain where revenue grew without preserving profitability.",
        meta: ["Margin", "Channel", "Executive plan"]
      }
    ],
    es: [
      {
        step: "01",
        kicker: "Brief",
        title: "El ingreso creció, pero la pregunta era la calidad del crecimiento",
        body: "El dashboard responde si la operación creció preservando margen y metas. La lectura ejecutiva debía unir ingreso, margen, canal, categoría y producto en una capa filtrable.",
        logic: "crecimiento_sano = ingreso_crece\n                    AND margen_pct >= limite\n                    AND cumplimiento_meta >= 100%",
        meta: ["Retail BI", "Ejecutivo", "Rentabilidad"]
      },
      {
        step: "02",
        kicker: "Métricas",
        title: "Modelé ingreso, margen, ticket y meta en el mismo mart",
        body: "La capa de BI calcula ingreso neto, margen bruto, ticket medio, pedidos entregados y cumplimiento de meta. Así se evita una lectura optimista que ignora rentabilidad.",
        logic: "margen_bruto_pct = margen_bruto / ingreso_neto\ncumplimiento_meta = ingreso_realizado / meta_ingreso",
        meta: ["Python", "DuckDB/SQL", "Marts BI"]
      },
      {
        step: "03",
        kicker: "Diagnóstico",
        title: "Crucé canal, categoría y producto para explicar el resultado",
        body: "El análisis separa de dónde vino el ingreso, qué categorías presionan margen y qué productos explican la variación. Los filtros permiten reproducir la lectura ejecutiva por recorte.",
        logic: "diagnostico = canal + categoria + producto\nalerta_margen = margen_bruto_pct < limite_categoria",
        meta: ["Segmentación", "Metas", "Productos"]
      },
      {
        step: "04",
        kicker: "Decisión",
        title: "El crecimiento solo vale si margen y meta acompañan",
        body: "La recomendación es proteger categorías con margen presionado y usar metas por canal para explicar dónde creció ingreso sin preservar rentabilidad.",
        meta: ["Margen", "Canal", "Plan ejecutivo"]
      }
    ]
  }
};

const PLAYZONE_STAGES = {
  pt: [
    {
      step: "01",
      kicker: "Brief e base sintética",
      title: "Descobrir se a Playzone leva usuários ao momento de valor",
      meta: ["Python", "Tracking plan", "CSV sintético", "Product Analytics"],
      body: [
        "A Playzone foi modelada como um marketplace de experiências, jogos e atividades. O objetivo do case não era contar abertura de app, mas medir se usuários chegavam ao momento de valor: uma reserva confirmada depois de buscar, ver uma oportunidade e enviar convite.",
        "A base foi gerada em Python com 500 usuários, canais de aquisição, plataformas, categorias, eventos de produto e oportunidades de marketplace. O funil e as probabilidades de passagem foram definidos explicitamente para simular uma jornada realista e auditável."
      ],
      flow: ["generate_product_events.py", "users/events/actions CSV", "tracking_plan.md", "DuckDB model", "dashboard_data.json"],
      files: ["scripts/generate_product_events.py", "docs/tracking_plan.md", "data/generated/*.csv"],
      snippets: [
        {
          label: "Eventos que definem a jornada",
          code: "FUNNEL = [\"app_open\", \"signup_completed\", \"profile_completed\",\n          \"search_performed\", \"opportunity_viewed\",\n          \"invitation_sent\", \"booking_confirmed\"]\n\nSTEP_PROB = [1.00, 0.92, 0.76, 0.64, 0.52, 0.38, 0.55]"
        },
        {
          label: "Momento de valor e tempo até confirmação",
          code: "if step == \"invitation_sent\":\n    invitation_time = current_time\nif step == \"booking_confirmed\":\n    current_time = current_time + timedelta(hours=random.randint(1, 72))\n    confirmation_time = current_time"
        }
      ],
      resultTitle: "Base e ativação inicial",
      readings: [
        "A base final reúne 500 usuários, 2.316 eventos e 219 oportunidades criadas.",
        "Apenas 28 usuários chegaram a `booking_confirmed`, resultando em 5,6% de ativação ordenada.",
        "Essa leitura define a pergunta da próxima etapa: a baixa ativação vem de uma etapa específica ou de perdas distribuídas ao longo da jornada?"
      ]
    },
    {
      step: "02",
      kicker: "Camada de dados",
      title: "Transformar eventos soltos em um funil ordenado e auditável",
      meta: ["DuckDB/SQL", "user_ordered_funnel", "outputs CSV", "Canal"],
      body: [
        "O dado bruto era um stream de eventos. Para não superestimar conversão, criei uma tabela temporária `user_ordered_funnel` em DuckDB. Cada usuário só avança se a etapa atual aconteceu depois da etapa anterior.",
        "Essa escolha muda a qualidade da análise: o dashboard não mostra apenas quantos usuários tiveram determinado evento; ele mostra quem percorreu a sequência de produto em ordem."
      ],
      flow: ["fact_events", "event_timestamp >= etapa anterior", "user_ordered_funnel", "ordered_funnel.csv", "funnel_by_channel.csv"],
      files: ["sql/03_funnel_analysis.sql", "scripts/build_outputs.py", "outputs/ordered_funnel.csv", "outputs/funnel_by_channel.csv"],
      snippets: [
        {
          label: "Regra temporal para convite",
          code: "AND events.event_name = 'invitation_sent'\nAND events.event_timestamp >= step_5.opportunity_viewed_at"
        },
        {
          label: "Regra temporal para reserva confirmada",
          code: "AND events.event_name = 'booking_confirmed'\nAND events.event_timestamp >= step_6.invitation_sent_at"
        },
        {
          label: "Conversão e perda por etapa",
          code: "ROUND(users_at_step / NULLIF(first_step_users, 0), 4) AS conversion_from_start,\nROUND(users_at_step / NULLIF(previous_step_users, 0), 4) AS conversion_from_previous,\nROUND(1 - users_at_step / NULLIF(previous_step_users, 0), 4) AS loss_from_previous"
        }
      ],
      resultTitle: "Funil ordenado e ativação por canal",
      readings: [
        "O funil sai de 500 usuários em `app_open` para 128 em `opportunity_viewed`, 45 em `invitation_sent` e 28 em `booking_confirmed`.",
        "A maior perda está em `Convite enviado`: 64,8% de queda frente à etapa anterior. O principal gargalo está entre ver oportunidade e enviar convite.",
        "Por canal, Social chega a 10,0% de ativação final, enquanto Organic fica em 2,5%. Isso sugere investigar intenção, promessa de aquisição e onboarding por origem."
      ]
    },
    {
      step: "03",
      kicker: "Diagnóstico",
      title: "Validar se ativação gera retenção e se o marketplace tem liquidez",
      meta: ["Retention", "Cohorts", "Marketplace", "Liquidez"],
      body: [
        "Depois de localizar o gargalo, testei se a ativação era uma métrica relevante de negócio. Para isso, comparei retorno ao app entre usuários ativados e não ativados em D1, D7 e D30.",
        "Em paralelo, medi liquidez por categoria no grão de oportunidade: convites enviados, reservas confirmadas, taxa de confirmação e tempo médio até confirmação."
      ],
      flow: ["user_ordered_funnel", "activation_status", "D1/D7/D30 app_open", "category liquidity", "cohort heatmap"],
      files: ["sql/04_retention_cohorts.sql", "sql/05_marketplace_metrics.sql", "outputs/retention_by_activation.csv", "outputs/marketplace_category_metrics.csv"],
      snippets: [
        {
          label: "Retenção como retorno real ao app",
          code: "MAX(CASE WHEN event_name = 'app_open' AND days_since_signup = 1 THEN 1 ELSE 0 END) AS retained_d1,\nMAX(CASE WHEN event_name = 'app_open' AND days_since_signup = 7 THEN 1 ELSE 0 END) AS retained_d7,\nMAX(CASE WHEN event_name = 'app_open' AND days_since_signup = 30 THEN 1 ELSE 0 END) AS retained_d30"
        },
        {
          label: "Classificação por ativação",
          code: "CASE WHEN funnel.booking_confirmed_at IS NOT NULL\n     THEN 'Ativados'\n     ELSE 'Não ativados'\nEND AS activation_status"
        },
        {
          label: "Liquidez por categoria",
          code: "COUNT(invitation_sent_at) AS invitations_sent,\nCOUNT(booking_confirmed_at) AS confirmed_bookings,\nROUND(COUNT(booking_confirmed_at) / NULLIF(COUNT(invitation_sent_at), 0), 4) AS confirmation_rate"
        }
      ],
      resultTitle: "Retenção, cohorts e liquidez",
      readings: [
        "Usuários ativados retêm melhor em todas as janelas: D30 de 35,7% contra 14,8% entre não ativados.",
        "A confirmação depois do convite é relativamente saudável: 62,2% no geral. Games lidera com 72,7%, enquanto Music fica em 40,0%.",
        "A conclusão muda a priorização: o problema principal não é confirmar a reserva depois do convite, mas fazer mais usuários chegarem ao convite certo."
      ]
    },
    {
      step: "04",
      kicker: "Decisão",
      title: "Priorizar experimentos no convite antes de aumentar aquisição",
      meta: ["Executive findings", "Data Quality", "Backlog", "Produto"],
      body: [
        "A decisão executiva foi gerada a partir dos próprios outputs: maior perda do funil, melhor e pior canal por ativação final, categoria mais líquida e soma de falhas críticas de qualidade.",
        "Com 0 falhas críticas nos checks principais, a leitura pode ser apresentada como simulação auditável. A recomendação é atacar a passagem `opportunity_viewed → invitation_sent` antes de aumentar tráfego."
      ],
      flow: ["ordered_funnel", "biggest_drop", "channel benchmark", "category liquidity", "executive_findings.md"],
      files: ["scripts/build_outputs.py", "sql/02_data_quality_checks.sql", "outputs/executive_findings.pt-BR.md", "outputs/data_quality_summary.csv"],
      snippets: [
        {
          label: "Maior perda do funil",
          code: "drop_rows = [row for row in funnel if row[\"step_order\"] != 1]\nbiggest_drop = max(drop_rows, key=lambda row: row.get(\"loss_from_previous\") or 0)"
        },
        {
          label: "Benchmark de canal",
          code: "best_channel = max(final_channel_rows, key=lambda row: row.get(\"conversion_from_start\") or 0)\nworst_channel = min(final_channel_rows, key=lambda row: row.get(\"conversion_from_start\") or 0)"
        },
        {
          label: "Guardrail de qualidade",
          code: "critical_failures = sum(\n    int(row[\"failed_records\"])\n    for row in dq_rows\n    if row[\"severity\"] == \"Critical\"\n)"
        }
      ],
      resultTitle: "Decisão executiva e próximos experimentos",
      readings: [
        "Intervir antes do convite: reduzir a perda em `Convite enviado`, porque é o maior vazamento mensurável do funil.",
        "Fricção provável: o usuário vê oportunidade, mas ainda precisa de clareza, preço, disponibilidade ou prova social para agir.",
        "Guardrails do experimento: testar CTA, disponibilidade/preço e prova social por categoria, monitorando `invitation_rate`, `activation_rate`, `confirmation_rate` e D30."
      ]
    }
  ],
  en: [],
  es: []
};

PLAYZONE_STAGES.en = PLAYZONE_STAGES.pt;
PLAYZONE_STAGES.es = PLAYZONE_STAGES.pt;

const UI = {
  pt: {
    lang: "pt-BR",
    pageTitle: "Dashboards analíticos | Bruno Nascimento",
    navCases: "Projetos",
    navDashboard: "Dashboards",
    navMethod: "Método",
    navStack: "Stack",
    navContact: "Contato",
    openRepo: "Abrir repositório",
    recommendation: "Recomendação",
    dataLayer: "Camada de dados",
    controls: {
      channel: "Canal",
      result: "Resultado",
      version: "Versão do prompt",
      severity: "Severidade",
      source: "Origem",
      category: "Categoria",
      useCase: "Caso de uso",
      issue: "Tipo de falha",
      rule: "Regra",
      month: "Mês",
      marginStatus: "Status margem",
      targetStatus: "Status meta"
    },
    all: "Todos",
    notesLabel: "",
    notesTitle: "",
    notesBody: "",
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
      methodStep: "Método aplicado",
      technicalJourney: "Jornada técnica",
      codeEvidence: "Evidência de código",
      sourceFiles: "Arquivos usados",
      dashboardResult: "Resultado do dashboard",
      reading: "Leitura",
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
      changeFilters: "Alterar filtros",
      week: "Semana",
      cohort: "Coorte",
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
    navDashboard: "Dashboards",
    navMethod: "Method",
    navStack: "Stack",
    navContact: "Contact",
    openRepo: "Open repository",
    recommendation: "Recommendation",
    dataLayer: "Data layer",
    controls: {
      channel: "Channel",
      result: "Result",
      version: "Prompt version",
      severity: "Severity",
      source: "Source",
      category: "Category",
      useCase: "Use case",
      issue: "Issue type",
      rule: "Rule",
      month: "Month",
      marginStatus: "Margin status",
      targetStatus: "Target status"
    },
    all: "All",
    notesLabel: "",
    notesTitle: "",
    notesBody: "",
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
      methodStep: "Method applied",
      technicalJourney: "Technical journey",
      codeEvidence: "Code evidence",
      sourceFiles: "Files used",
      dashboardResult: "Dashboard result",
      reading: "Reading",
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
      changeFilters: "Change filters",
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
    navDashboard: "Dashboards",
    navMethod: "Método",
    navStack: "Stack",
    navContact: "Contacto",
    openRepo: "Abrir repositorio",
    recommendation: "Recomendación",
    dataLayer: "Capa de datos",
    controls: {
      channel: "Canal",
      result: "Resultado",
      version: "Versión del prompt",
      severity: "Severidad",
      source: "Origen",
      category: "Categoría",
      useCase: "Caso de uso",
      issue: "Tipo de falla",
      rule: "Regla",
      month: "Mes",
      marginStatus: "Estado margen",
      targetStatus: "Estado meta"
    },
    all: "Todos",
    notesLabel: "",
    notesTitle: "",
    notesBody: "",
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
      methodStep: "Método aplicado",
      technicalJourney: "Jornada técnica",
      codeEvidence: "Evidencia de código",
      sourceFiles: "Archivos usados",
      dashboardResult: "Resultado del dashboard",
      reading: "Lectura",
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
      changeFilters: "Cambiar filtros",
      week: "Semana",
      cohort: "Cohorte",
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
    "9 falhas críticas encontradas; publicar apenas os marts Ready.": "9 critical failures found; publish Ready marts only.",
    "release-ready": "Release-ready",
    "backlog": "Backlog",
    "high-severity": "High severity",
    payment: "Payment",
    reference: "Reference",
    duplicate: "Duplicate",
    quantity: "Quantity",
    status: "Order status",
    "below-floor": "Below floor",
    "above-floor": "On/above floor",
    "below-target": "Below target",
    "met-target": "Target met"
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
    "9 falhas críticas encontradas; publicar apenas os marts Ready.": "9 fallas críticas encontradas; publicar solo marts Ready.",
    "release-ready": "Release-ready",
    "backlog": "Backlog",
    "high-severity": "Severidad alta",
    payment: "Pago",
    reference: "Referencia",
    duplicate: "Duplicidad",
    quantity: "Cantidad",
    status: "Estado del pedido",
    "below-floor": "Debajo del piso",
    "above-floor": "En/arriba del piso",
    "below-target": "Debajo de meta",
    "met-target": "Meta cumplida"
  },
  pt: {
    "Eletronicos": "Eletrônicos",
    "release-ready": "Release-ready",
    "backlog": "Backlog",
    "high-severity": "Severidade alta",
    payment: "Pagamento",
    reference: "Referência",
    duplicate: "Duplicidade",
    quantity: "Quantidade",
    status: "Status do pedido",
    "below-floor": "Abaixo do piso",
    "above-floor": "No/acima do piso",
    "below-target": "Abaixo da meta",
    "met-target": "Meta batida"
  }
};

const state = {
  caseId: CASES[params.get("case")] ? params.get("case") : "playzone",
  lang: UI[params.get("lang")] ? params.get("lang") : "pt",
  filters: {
    channel: params.get("channel") || "all",
    result: params.get("result") || "all",
    version: params.get("version") || "all",
    severity: params.get("severity") || "all",
    source: params.get("source") || "all",
    category: params.get("category") || "all",
    useCase: params.get("useCase") || "all",
    issue: params.get("issue") || "all",
    rule: params.get("rule") || "all",
    month: params.get("month") || "all",
    marginStatus: params.get("marginStatus") || "all",
    targetStatus: params.get("targetStatus") || "all"
  }
};

let datasets = {};
let chartRevealObserver = null;

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
const aiResultOptions = () => ["release-ready", "backlog", "high-severity"];
const pipelineIssueGroups = () => ["payment", "reference", "duplicate", "quantity", "status"];
const retailMarginStatusOptions = () => ["below-floor", "above-floor"];
const retailTargetStatusOptions = () => ["below-target", "met-target"];
const pipelineIssueGroup = (value = "") => {
  const text = String(value || "").toLowerCase();
  if (text.includes("payment") || text.includes("captured")) return "payment";
  if (text.includes("reference") || text.includes("missing customer") || text.includes("missing product") || text.includes("missing_customer") || text.includes("missing_product")) return "reference";
  if (text.includes("duplicate")) return "duplicate";
  if (text.includes("quantity")) return "quantity";
  if (text.includes("inactive") || text.includes("cancelled") || text.includes("status")) return "status";
  return "other";
};
const weightedAverage = (rows, valueKey, weightKey = "reviewed_responses") => {
  const totalWeight = (rows || []).reduce((sum, row) => sum + Number(row[weightKey] || 0), 0);
  if (!totalWeight) return 0;
  return rows.reduce((sum, row) => sum + (Number(row[valueKey] || 0) * Number(row[weightKey] || 0)), 0) / totalWeight;
};
const aiResultMatches = (row, result, data) => {
  if (result === "all") return true;
  const baselineReady = Number(data?.kpi_summary?.[0]?.release_ready_rate || 0.4);
  const baselineCritical = Number(data?.kpi_summary?.[0]?.critical_issue_rate || 0.1);
  const readyRate = Number(row.release_ready_rate || 0);
  const reworkRate = Number(row.rework_rate || 0);
  const criticalRate = Number(row.critical_issue_rate || 0);
  const severity = String(row.severity || "").toLowerCase();
  if (severity && row.release_ready_rate === undefined && row.critical_issue_rate === undefined) {
    if (result === "release-ready") return severity !== "high" && severity !== "critical";
    if (result === "backlog") return true;
    if (result === "high-severity") return severity === "high" || severity === "critical";
  }
  if (result === "release-ready") return readyRate >= baselineReady && (!criticalRate || criticalRate <= baselineCritical) && severity !== "high";
  if (result === "backlog") return Number(row.not_approved_cases || 0) > 0 || reworkRate >= 0.4 || readyRate < baselineReady;
  if (result === "high-severity") return severity === "high" || severity === "critical" || criticalRate >= baselineCritical;
  return true;
};
const summarizeAiRows = (rows, fallback = {}) => {
  const total = rows.reduce((sum, row) => sum + Number(row.reviewed_responses || 0), 0);
  if (!rows.length || !total) return fallback;
  return {
    reviewed_responses: total,
    avg_quality_score: weightedAverage(rows, "avg_quality_score"),
    release_ready_rate: weightedAverage(rows, "release_ready_rate"),
    rework_rate: weightedAverage(rows, "rework_rate"),
    critical_issue_rate: weightedAverage(rows, "critical_issue_rate")
  };
};
const chevronIcon = () => `
  <svg aria-hidden="true" viewBox="0 0 20 20" focusable="false">
    <path d="M5.8 7.4 10 11.6l4.2-4.2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  </svg>
`;

const closeCustomSelects = (except = null) => {
  document.querySelectorAll("[data-filter-select]").forEach((root) => {
    if (root === except) return;
    root.classList.remove("is-open");
    root.querySelector(".custom-select-trigger")?.setAttribute("aria-expanded", "false");
  });
};

const customSelect = (key, values, scope = "global") => {
  const selectedValue = selected(key, values);
  const selectedLabel = selectedValue === "all" ? copy().all : label(selectedValue);
  const compactClass = scope === "stage" ? " is-compact" : "";
  state.filters[key] = selectedValue;
  return `
    <div class="custom-select${compactClass}" data-filter-select="${escapeHtml(key)}" data-filter-scope="${escapeHtml(scope)}">
      <button class="custom-select-trigger" type="button" aria-haspopup="listbox" aria-expanded="false" aria-label="${escapeHtml(copy().controls[key] || key)}">
        <span>${escapeHtml(selectedLabel)}</span>
        ${chevronIcon()}
      </button>
      <div class="custom-select-menu" role="listbox">
        <button class="custom-select-option ${selectedValue === "all" ? "is-selected" : ""}" type="button" role="option" aria-selected="${selectedValue === "all"}" data-filter-option="all">${escapeHtml(copy().all)}</button>
        ${values.map((value) => `
          <button class="custom-select-option ${value === selectedValue ? "is-selected" : ""}" type="button" role="option" aria-selected="${value === selectedValue}" data-filter-option="${escapeHtml(value)}">${escapeHtml(label(value))}</button>
        `).join("")}
      </div>
    </div>
  `;
};

const bindCustomSelects = () => {
  document.querySelectorAll("[data-filter-select]").forEach((root) => {
    if (root.dataset.customSelectBound === "true") return;
    root.dataset.customSelectBound = "true";
    const trigger = root.querySelector(".custom-select-trigger");
    trigger?.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = root.classList.contains("is-open");
      closeCustomSelects(root);
      root.classList.toggle("is-open", !isOpen);
      trigger.setAttribute("aria-expanded", String(!isOpen));
    });
    root.querySelectorAll("[data-filter-option]").forEach((option) => {
      option.addEventListener("click", (event) => {
        event.stopPropagation();
        state.filters[root.dataset.filterSelect] = option.dataset.filterOption;
        closeCustomSelects();
        updateUrl();
        renderControls();
        renderCaseContent();
      });
    });
  });
};

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

const heroText = () => {
  const texts = {
    pt: {
      kicker: "Leitura executiva",
      problem: "Problema",
      diagnosis: "Diagnóstico",
      decision: "Decisão",
      signals: {
        activation: "Ativação",
        inviteLoss: "Perda no convite",
        retentionD30: "Retenção D30",
        releaseReady: "Release-ready",
        bestVersion: "Melhor versão",
        criticalIssue: "Falha crítica",
        qualityScore: "Quality score",
        criticalFailures: "Falhas críticas",
        readyRecords: "Registros Ready",
        netRevenue: "Receita líquida",
        grossMargin: "Margem bruta",
        deliveredOrders: "Pedidos entregues"
      },
      playzone: {
        problem: "A jornada gera interesse, mas pouca reserva confirmada.",
        diagnosis: "A maior perda ocorre antes do convite enviado, não na confirmação final.",
        decision: "Priorizar qualidade de oportunidade e envio de convite antes de comprar mais aquisição."
      },
      ai: {
        problem: "O produto de IA ainda não tem previsibilidade suficiente para release amplo.",
        diagnosis: "A v3 é o melhor baseline, mas falhas críticas e retrabalho ainda exigem gate por caso de uso.",
        decision: "Publicar por critérios de qualidade, corrigindo contexto e actionability antes de escala."
      },
      pipeline: {
        problem: "O score agregado parece saudável, mas esconde falhas que podem contaminar leitura executiva.",
        diagnosis: "As falhas críticas bloqueiam publicação mesmo com alta taxa de registros prontos.",
        decision: "Publicar apenas marts Ready e tratar críticos antes de liberar a camada executiva."
      },
      retail: {
        problem: "Receita, margem e meta precisam ser lidas juntas para evitar crescimento sem rentabilidade.",
        diagnosis: "A operação está aprovada, mas categorias e canais ainda explicam pressão de margem.",
        decision: "Usar metas por canal e alertas de margem para proteger rentabilidade no crescimento."
      }
    },
    en: {
      kicker: "Executive readout",
      problem: "Problem",
      diagnosis: "Diagnosis",
      decision: "Decision",
      signals: {
        activation: "Activation",
        inviteLoss: "Invitation loss",
        retentionD30: "D30 retention",
        releaseReady: "Release-ready",
        bestVersion: "Best version",
        criticalIssue: "Critical issue",
        qualityScore: "Quality score",
        criticalFailures: "Critical failures",
        readyRecords: "Ready records",
        netRevenue: "Net revenue",
        grossMargin: "Gross margin",
        deliveredOrders: "Delivered orders"
      },
      playzone: {
        problem: "The journey creates intent, but few users reach confirmed booking.",
        diagnosis: "The largest loss happens before invitation sent, not at final confirmation.",
        decision: "Prioritize opportunity quality and invitation sending before buying more acquisition."
      },
      ai: {
        problem: "The AI product is not predictable enough for a broad release yet.",
        diagnosis: "v3 is the strongest baseline, but critical failures and rework still require gates by use case.",
        decision: "Release by quality criteria, fixing context and actionability before scale."
      },
      pipeline: {
        problem: "The aggregate score looks healthy, but hides failures that can contaminate executive reporting.",
        diagnosis: "Critical failures block publication even with a high ready-record rate.",
        decision: "Publish Ready marts only and fix critical issues before releasing the executive layer."
      },
      retail: {
        problem: "Revenue, margin and targets need to be read together to avoid unprofitable growth.",
        diagnosis: "The operation is approved, but categories and channels still explain margin pressure.",
        decision: "Use channel targets and margin alerts to protect profitability while growing."
      }
    },
    es: {
      kicker: "Lectura ejecutiva",
      problem: "Problema",
      diagnosis: "Diagnóstico",
      decision: "Decisión",
      signals: {
        activation: "Activación",
        inviteLoss: "Pérdida en invitación",
        retentionD30: "Retención D30",
        releaseReady: "Release-ready",
        bestVersion: "Mejor versión",
        criticalIssue: "Falla crítica",
        qualityScore: "Quality score",
        criticalFailures: "Fallas críticas",
        readyRecords: "Registros Ready",
        netRevenue: "Ingreso neto",
        grossMargin: "Margen bruto",
        deliveredOrders: "Pedidos entregados"
      },
      playzone: {
        problem: "La jornada genera intención, pero pocas personas llegan a reserva confirmada.",
        diagnosis: "La mayor pérdida ocurre antes de enviar la invitación, no en la confirmación final.",
        decision: "Priorizar calidad de oportunidad e invitación antes de comprar más adquisición."
      },
      ai: {
        problem: "El producto de IA aún no tiene previsibilidad suficiente para release amplio.",
        diagnosis: "v3 es el mejor baseline, pero fallas críticas y retrabajo aún exigen gate por caso de uso.",
        decision: "Publicar por criterios de calidad, corrigiendo contexto y accionabilidad antes de escalar."
      },
      pipeline: {
        problem: "El score agregado parece saludable, pero oculta fallas que pueden contaminar la lectura ejecutiva.",
        diagnosis: "Las fallas críticas bloquean la publicación incluso con alta tasa de registros listos.",
        decision: "Publicar solo marts Ready y corregir críticos antes de liberar la capa ejecutiva."
      },
      retail: {
        problem: "Ingresos, margen y metas deben leerse juntos para evitar crecimiento sin rentabilidad.",
        diagnosis: "La operación está aprobada, pero categorías y canales todavía explican presión de margen.",
        decision: "Usar metas por canal y alertas de margen para proteger rentabilidad durante el crecimiento."
      }
    }
  };
  return texts[state.lang] || texts.pt;
};

const heroFlow = (data) => {
  return "";
};

const heroEvidence = (data) => {
  const copyText = ({
    pt: {
      users: "Usuários",
      opportunities: "Oportunidades",
      invitations: "Convites",
      bookings: "Reservas",
      sample: "base analisada",
      viewed: "vistas",
      sent: "enviados",
      confirmed: "confirmadas",
      reviews: "Respostas",
      score: "Score médio",
      ready: "Ready",
      critical: "Críticas",
      evaluated: "avaliadas",
      scale: "escala 1-5",
      release: "release-ready",
      risk: "falhas",
      records: "Pedidos",
      quality: "Qualidade",
      warnings: "Warnings",
      readyRecords: "prontos",
      overall: "score global",
      monitored: "monitorados",
      revenue: "Receita",
      margin: "Margem",
      orders: "Pedidos",
      ticket: "Ticket",
      delivered: "entregues",
      average: "médio"
    },
    en: {
      users: "Users",
      opportunities: "Opportunities",
      invitations: "Invitations",
      bookings: "Bookings",
      sample: "reviewed base",
      viewed: "viewed",
      sent: "sent",
      confirmed: "confirmed",
      reviews: "Responses",
      score: "Avg. score",
      ready: "Ready",
      critical: "Critical",
      evaluated: "reviewed",
      scale: "1-5 scale",
      release: "release-ready",
      risk: "issues",
      records: "Orders",
      quality: "Quality",
      warnings: "Warnings",
      readyRecords: "ready",
      overall: "global score",
      monitored: "monitored",
      revenue: "Revenue",
      margin: "Margin",
      orders: "Orders",
      ticket: "Ticket",
      delivered: "delivered",
      average: "average"
    },
    es: {
      users: "Usuarios",
      opportunities: "Oportunidades",
      invitations: "Invitaciones",
      bookings: "Reservas",
      sample: "base analizada",
      viewed: "vistas",
      sent: "enviadas",
      confirmed: "confirmadas",
      reviews: "Respuestas",
      score: "Score medio",
      ready: "Ready",
      critical: "Críticas",
      evaluated: "evaluadas",
      scale: "escala 1-5",
      release: "release-ready",
      risk: "fallas",
      records: "Pedidos",
      quality: "Calidad",
      warnings: "Warnings",
      readyRecords: "listos",
      overall: "score global",
      monitored: "monitoreados",
      revenue: "Ingreso",
      margin: "Margen",
      orders: "Pedidos",
      ticket: "Ticket",
      delivered: "entregados",
      average: "medio"
    }
  })[state.lang] || {};
  if (state.caseId === "playzone") {
    const kpi = data.kpi_summary?.[0] || {};
    return [
      { label: copyText.users, value: formatInt(kpi.total_users), note: copyText.sample },
      { label: copyText.opportunities, value: formatInt(kpi.opportunities_created), note: copyText.viewed },
      { label: copyText.invitations, value: formatInt(kpi.opportunities_invited), note: copyText.sent },
      { label: copyText.bookings, value: formatInt(kpi.confirmed_bookings), note: copyText.confirmed }
    ];
  }
  if (state.caseId === "ai-quality") {
    const kpi = data.kpi_summary?.[0] || {};
    return [
      { label: copyText.reviews, value: formatInt(kpi.reviewed_responses), note: copyText.evaluated },
      { label: copyText.score, value: formatNumber(kpi.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), note: copyText.scale },
      { label: copyText.ready, value: formatPercent(kpi.release_ready_rate), note: copyText.release },
      { label: copyText.critical, value: formatPercent(kpi.critical_issue_rate), note: copyText.risk }
    ];
  }
  if (state.caseId === "pipeline") {
    const kpi = data.kpis || {};
    return [
      { label: copyText.records, value: formatInt(kpi.raw_orders), note: copyText.sample },
      { label: copyText.ready, value: formatInt(kpi.ready_orders), note: copyText.readyRecords },
      { label: copyText.quality, value: formatPercent(kpi.quality_score), note: copyText.overall },
      { label: copyText.warnings, value: formatInt(kpi.warning_failures), note: copyText.monitored }
    ];
  }
  const kpi = data.kpis || {};
  return [
    { label: copyText.revenue, value: formatMoney(kpi.net_revenue), note: copyText.sample },
    { label: copyText.margin, value: formatPercent(kpi.gross_margin_pct), note: copyText.overall },
    { label: copyText.orders, value: formatInt(kpi.delivered_orders), note: copyText.delivered },
    { label: copyText.ticket, value: formatMoney(kpi.average_ticket), note: copyText.average }
  ];
};

const heroNarrative = () => {
  const data = datasets[state.caseId] || {};
  const text = heroText();
  const signal = text.signals;
  const caseKey = state.caseId === "ai-quality" ? "ai" : state.caseId;
  const story = text[caseKey] || text.playzone;
  let signals = [];
  if (state.caseId === "playzone") {
    const kpi = data.kpi_summary?.[0] || {};
    const opportunity = data.ordered_funnel?.find((row) => row.step_label === "Oportunidade vista") || {};
    const invite = data.ordered_funnel?.find((row) => row.step_label === "Convite enviado") || {};
    const inviteLoss = Number(opportunity.users_at_step || 0) ? 1 - (Number(invite.users_at_step || 0) / Number(opportunity.users_at_step || 1)) : 0;
    const retention = data.retention_by_activation?.find((row) => ["Ativados", "Activated", "Activados"].includes(row.activation_status)) || data.retention_by_activation?.[0] || {};
    signals = [
      { label: signal.activation, value: formatPercent(kpi.activation_rate), alert: true },
      { label: signal.inviteLoss, value: formatPercent(inviteLoss), alert: true },
      { label: signal.retentionD30, value: formatPercent(retention.retention_d30) }
    ];
  } else if (state.caseId === "ai-quality") {
    const kpi = data.kpi_summary?.[0] || {};
    const best = [...(data.prompt_version_performance || [])].sort((a, b) => Number(b.release_ready_rate || 0) - Number(a.release_ready_rate || 0))[0] || {};
    signals = [
      { label: signal.releaseReady, value: formatPercent(kpi.release_ready_rate), alert: true },
      { label: signal.bestVersion, value: best.prompt_version || "v3" },
      { label: signal.criticalIssue, value: formatPercent(kpi.critical_issue_rate), alert: true }
    ];
  } else if (state.caseId === "pipeline") {
    signals = [
      { label: signal.qualityScore, value: formatPercent(data.kpis?.quality_score) },
      { label: signal.criticalFailures, value: formatInt(data.kpis?.critical_failures), alert: true },
      { label: signal.readyRecords, value: formatInt(data.kpis?.ready_orders) }
    ];
  } else {
    signals = [
      { label: signal.netRevenue, value: formatMoney(data.kpis?.net_revenue) },
      { label: signal.grossMargin, value: formatPercent(data.kpis?.gross_margin_pct) },
      { label: signal.deliveredOrders, value: formatInt(data.kpis?.delivered_orders) }
    ];
  }
  return {
    kicker: text.kicker,
    flow: heroFlow(data),
    evidence: heroEvidence(data),
    signals,
    readings: [
      { label: text.problem, value: story.problem },
      { label: text.diagnosis, value: story.diagnosis },
      { label: text.decision, value: story.decision }
    ]
  };
};

const renderIntro = () => {
  const def = CASES[state.caseId];
  const c = caseCopy();
  const hero = heroNarrative();
  const intro = $("#case-intro");
  intro.className = `dashboard-intro ${hero.flow ? "has-flow" : "no-flow"}`;
  $("#repo-link").href = def.repo;
  intro.innerHTML = `
    <div class="intro-copy">
      <div class="case-tags">${def.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
      <h2>${escapeHtml(c.title)}</h2>
      <p>${escapeHtml(c.description)}</p>
    </div>
    <aside class="hero-executive-panel">
      <span class="hero-executive-kicker">${escapeHtml(hero.kicker)}</span>
      <div class="hero-signal-grid">
        ${hero.signals.map((item) => `
          <div class="hero-signal ${item.alert ? "is-alert" : ""}">
            <strong>${escapeHtml(item.value)}</strong>
            <span>${escapeHtml(item.label)}</span>
          </div>
        `).join("")}
      </div>
      <ul class="hero-decision-list">
        ${hero.readings.map((item) => `
          <li><strong>${escapeHtml(item.label)}</strong><span>${escapeHtml(item.value)}</span></li>
        `).join("")}
      </ul>
    </aside>
    ${hero.flow}
    <div class="hero-evidence-strip" aria-label="Evidências principais do case">
      ${hero.evidence.map((item) => `
        <article class="hero-evidence-item">
          <small>${escapeHtml(item.label)}</small>
          <strong>${escapeHtml(item.value)}</strong>
          <span>${escapeHtml(item.note)}</span>
        </article>
      `).join("")}
    </div>
  `;
};

const control = (key, values) => {
  const selectedValue = selected(key, values);
  state.filters[key] = selectedValue;
  return `
    <div class="control-card">
      <label>${escapeHtml(copy().controls[key])}</label>
      ${customSelect(key, values, "global")}
    </div>
  `;
};

const filterOptions = (key) => {
  const data = datasets[state.caseId];
  if (!data) return [];
  const sources = {
    playzone: {
      channel: unique(data.funnel_by_channel, "acquisition_channel"),
      category: unique(data.marketplace_category_metrics, "category")
    },
    "ai-quality": {
      result: aiResultOptions(),
      version: unique(data.prompt_version_performance, "prompt_version"),
      useCase: unique(data.quality_by_use_case, "use_case"),
      severity: unique(data.issue_distribution, "severity"),
      issue: unique(data.issue_distribution, "issue_type")
    },
    pipeline: {
      severity: unique(data.failed_rules, "severity"),
      source: unique(data.source_quality, "source_system"),
      issue: pipelineIssueGroups(),
      category: unique(data.category_metrics, "category")
    },
    retail: {
      channel: unique(data.channel_performance, "sales_channel"),
      category: unique(data.category_performance, "category"),
      month: unique(data.monthly_performance, "order_month"),
      marginStatus: retailMarginStatusOptions(),
      targetStatus: retailTargetStatusOptions()
    }
  };
  return sources[state.caseId]?.[key] || [];
};

const renderControls = () => {
  const data = datasets[state.caseId];
  let html = "";
  if (state.caseId === "playzone") html = control("channel", unique(data.funnel_by_channel, "acquisition_channel")) + control("category", unique(data.marketplace_category_metrics, "category"));
  if (state.caseId === "ai-quality") html = control("result", aiResultOptions()) + control("version", unique(data.prompt_version_performance, "prompt_version")) + control("useCase", unique(data.quality_by_use_case, "use_case")) + control("severity", unique(data.issue_distribution, "severity")) + control("issue", unique(data.issue_distribution, "issue_type"));
  if (state.caseId === "pipeline") html = control("source", unique(data.source_quality, "source_system")) + control("severity", unique(data.failed_rules, "severity")) + control("issue", pipelineIssueGroups());
  if (state.caseId === "retail") html = control("channel", unique(data.channel_performance, "sales_channel")) + control("category", unique(data.category_performance, "category")) + control("month", unique(data.monthly_performance, "order_month")) + control("marginStatus", retailMarginStatusOptions()) + control("targetStatus", retailTargetStatusOptions());
  $("#controls").innerHTML = html;
  bindCustomSelects();
  renderFilterBar();
};

const currentControlKeys = () => {
  if (state.caseId === "playzone") return ["channel", "category"];
  if (state.caseId === "ai-quality") return ["result", "version", "useCase", "severity", "issue"];
  if (state.caseId === "pipeline") return ["source", "severity", "issue", "category"];
  if (state.caseId === "retail") return ["channel", "category", "month", "marginStatus", "targetStatus"];
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

const setupChartReveal = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  chartRevealObserver?.disconnect();
  const targets = [...document.querySelectorAll("#dashboard-content .viz-card, #dashboard-content .table-card, #dashboard-content .kpi-card, #dashboard-content .diagnostic-kpi-card")];
  if (!targets.length || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-inview"));
    return;
  }
  document.body.classList.add("motion-ready");
  chartRevealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-inview");
      chartRevealObserver.unobserve(entry.target);
    });
  }, {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px"
  });
  targets.forEach((target) => chartRevealObserver.observe(target));
};

const renderFilterBar = () => {
  const active = currentControlKeys().filter((key) => state.filters[key] && state.filters[key] !== "all");
  const chips = active.length ? active.map((key) => `
    <span class="filter-chip"><strong>${escapeHtml(copy().controls[key] || key)}</strong>${escapeHtml(label(state.filters[key]))}</span>
  `).join("") : `<span class="filter-chip">${escapeHtml(term("noActiveFilters"))}</span>`;
  $("#filter-bar").innerHTML = `
    ${chips}
    ${active.length ? `<button class="filter-action" type="button" data-filter-action="clear">${escapeHtml(term("clearFilters"))}</button>` : ""}
  `;
  document.querySelector('[data-filter-action="clear"]')?.addEventListener("click", resetCurrentFilters);
};

const journeyCopy = () => JOURNEYS[state.caseId]?.[state.lang] || JOURNEYS[state.caseId]?.pt || [];

const processChapter = (item) => {
  if (!item) return "";
  const meta = item.meta?.length ? `
    <div class="chapter-meta">
      ${item.meta.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}
    </div>
  ` : "";
  return `
    <section class="process-chapter">
      <div class="chapter-index">${escapeHtml(item.step)}</div>
      <div class="chapter-copy">
        <span>${escapeHtml(item.kicker)}</span>
        <h3>${escapeHtml(item.title)}</h3>
      </div>
      ${meta}
    </section>
  `;
};

const methodBlock = (item, code = item?.logic) => {
  if (!item?.body && !code) return "";
  return `
    <section class="method-block">
      <div class="method-copy">
        <span>${escapeHtml(term("methodStep"))}</span>
        <p>${escapeHtml(item.body || "")}</p>
      </div>
      ${code ? `<pre class="method-code"><code>${escapeHtml(code)}</code></pre>` : ""}
    </section>
  `;
};

const playzoneStages = () => PLAYZONE_STAGES[state.lang] || PLAYZONE_STAGES.pt;

const technicalJourney = (item) => {
  const paragraphs = (item.body || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  const files = item.files?.length ? `
    <div class="source-list" aria-label="${escapeHtml(term("sourceFiles"))}">
      ${item.files.map((file) => `<span>${escapeHtml(file)}</span>`).join("")}
    </div>
  ` : "";
  const snippets = item.snippets?.length ? `
    <div class="code-column">
      <span>${escapeHtml(term("codeEvidence"))}</span>
      ${item.snippets.map((snippet) => `
        <div>
          <span class="code-title">${escapeHtml(snippet.label)}</span>
          <pre class="code-snippet"><code>${escapeHtml(snippet.code)}</code></pre>
        </div>
      `).join("")}
    </div>
  ` : "";
  const flow = item.flow?.length ? `
    <div class="flow-column">
      <div class="flow-track">
        ${item.flow.map((step) => `<span>${escapeHtml(step)}</span>`).join("")}
      </div>
    </div>
  ` : "";
  return `
    <section class="technical-journey">
      <div class="journey-copy">
        <span>${escapeHtml(term("technicalJourney"))}</span>
        ${paragraphs}
        ${files}
      </div>
      ${snippets}
      ${flow}
    </section>
  `;
};

const stageFilterBar = (keys = currentControlKeys()) => {
  const validKeys = keys.filter((key) => currentControlKeys().includes(key));
  if (!validKeys.length) return "";
  const controls = validKeys.map((key) => {
    const values = filterOptions(key);
    const selectedValue = selected(key, values);
    state.filters[key] = selectedValue;
    return `
      <div class="stage-filter-control">
        <label>${escapeHtml(copy().controls[key] || key)}</label>
        ${customSelect(key, values, "stage")}
      </div>
    `;
  }).join("");
  return `
    <div class="stage-filter-bar">
      ${controls}
    </div>
  `;
};

const dashboardMarker = (title, filterKeys = currentControlKeys()) => `
  <section class="dashboard-marker">
    <span>${escapeHtml(term("dashboardResult"))}</span>
    <h3>${escapeHtml(title)}</h3>
    ${stageFilterBar(filterKeys)}
  </section>
`;

const resultReadout = (item) => `
  <section class="result-readout">
    <span>${escapeHtml(term("reading"))}</span>
    <ul>
      ${(item.readings || []).map((reading) => `<li>${escapeHtml(reading)}</li>`).join("")}
    </ul>
  </section>
`;

const aiQualityResultReadout = (data, context, stage = 0) => {
  const base = context.base || data.kpi_summary?.[0] || {};
  const result = context.result || "all";
  const resultLabel = result === "all" ? copy().all : label(result);
  const versions = context.versionRows?.length ? context.versionRows : data.prompt_version_performance || [];
  const qualityRows = context.qualityRows?.length ? context.qualityRows : data.quality_by_use_case || [];
  const backlogRows = context.backlog?.length ? context.backlog : data.improvement_backlog || [];
  const issueRows = context.issueRows?.length ? context.issueRows : data.issue_distribution || [];
  const bestVersion = [...versions].sort((a, b) => Number(b.release_ready_rate || 0) - Number(a.release_ready_rate || 0))[0] || {};
  const weakestUseCase = [...qualityRows].sort((a, b) => Number(a.avg_quality_score || 0) - Number(b.avg_quality_score || 0))[0] || {};
  const strongestUseCase = [...qualityRows].sort((a, b) => Number(b.avg_quality_score || 0) - Number(a.avg_quality_score || 0))[0] || {};
  const topBacklog = [...backlogRows].sort((a, b) => Number(b.not_approved_cases || 0) - Number(a.not_approved_cases || 0))[0] || {};
  const weakestDimension = [...(data.dimension_scores || [])].sort((a, b) => Number(a.avg_score || 0) - Number(b.avg_score || 0))[0] || {};
  const highSeverity = issueRows.filter((row) => String(row.severity || "").toLowerCase() === "high");
  const highSeverityCount = highSeverity.reduce((sum, row) => sum + Number(row.occurrences || 0), 0);
  const trend = data.monthly_quality_trend || [];
  const firstMonth = trend[0] || {};
  const lastMonth = [...trend].at(-1) || {};
  const scoreDelta = Number(lastMonth.avg_quality_score || 0) - Number(firstMonth.avg_quality_score || 0);
  const targetGap = Math.max(0, 4 - Number(lastMonth.avg_quality_score || 0));
  const stageTexts = {
    pt: [
      [
        `No recorte ${resultLabel}, ${formatInt(base.reviewed_responses)} respostas foram avaliadas; ${formatPercent(base.release_ready_rate)} estão prontas para release e o score médio fica em ${formatNumber(base.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/5.`,
        `A leitura não depende só da média: ${formatPercent(base.critical_issue_rate)} ainda cai em severidade alta, então o release precisa combinar score, prontidão e risco.`,
        `Quando o filtro muda, os KPIs também mudam; isso deixa explícito se o resultado vem de um baseline saudável, de backlog ou de casos que exigem bloqueio.`
      ],
      [
        `A versão com melhor sinal é ${bestVersion.prompt_version || "-"}: ${formatPercent(bestVersion.release_ready_rate)} release-ready, ${formatPercent(bestVersion.critical_issue_rate)} severidade alta e ${formatInt(bestVersion.reviewed_responses)} avaliadas.`,
        `${strongestUseCase.use_case || "O caso mais forte"} lidera em score médio com ${formatNumber(strongestUseCase.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}; ${weakestUseCase.use_case || "o caso mais frágil"} puxa a régua para baixo com ${formatNumber(weakestUseCase.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`,
        `A tendência sai de ${formatNumber(firstMonth.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} para ${formatNumber(lastMonth.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}: ganho de ${formatNumber(scoreDelta, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ponto, mas ainda abaixo do alvo 4,0.`
      ],
      [
        `A matriz mostra onde o release pode avançar por combinação de versão e caso de uso; ${topBacklog.use_case || "-"} em ${topBacklog.prompt_version || "-"} concentra ${formatInt(topBacklog.not_approved_cases)} não aprovadas.`,
        `A menor dimensão é ${weakestDimension.dimension || "-"}, com ${formatNumber(weakestDimension.avg_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/5; é o tipo de sinal que explica por que a média geral não basta.`,
        `No recorte atual há ${formatInt(highSeverityCount)} ocorrências de severidade alta nas falhas listadas. Isso é o que transforma análise de qualidade em fila de correção.`
      ],
      [
        `A decisão é manter gate por caso de uso: ${bestVersion.prompt_version || "-"} é o melhor baseline, mas não substitui a leitura de matriz, falhas e backlog.`,
        `O próximo ciclo deve atacar ${topBacklog.use_case || "-"} em ${topBacklog.prompt_version || "-"} primeiro, porque concentra ${formatInt(topBacklog.not_approved_cases)} respostas não aprovadas.`,
        `O último mês ainda está ${formatNumber(targetGap, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ponto abaixo do alvo 4,0; liberar só pela média esconderia risco operacional.`
      ]
    ],
    en: [
      [
        `For ${resultLabel}, ${formatInt(base.reviewed_responses)} responses were reviewed; ${formatPercent(base.release_ready_rate)} are release-ready and the average score is ${formatNumber(base.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/5.`,
        `The readout is not only the average: ${formatPercent(base.critical_issue_rate)} still lands in high severity, so release needs score, readiness and risk together.`,
        `When the filter changes, the KPIs change too; this makes clear whether the result comes from a healthy baseline, backlog or blocked cases.`
      ],
      [
        `The strongest version is ${bestVersion.prompt_version || "-"}: ${formatPercent(bestVersion.release_ready_rate)} release-ready, ${formatPercent(bestVersion.critical_issue_rate)} high severity and ${formatInt(bestVersion.reviewed_responses)} reviewed.`,
        `${strongestUseCase.use_case || "The strongest use case"} leads with ${formatNumber(strongestUseCase.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}; ${weakestUseCase.use_case || "the weakest use case"} pulls the bar down with ${formatNumber(weakestUseCase.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`,
        `The trend moves from ${formatNumber(firstMonth.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} to ${formatNumber(lastMonth.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}: +${formatNumber(scoreDelta, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} point, still below the 4.0 target.`
      ],
      [
        `The matrix shows where release can move forward by version and use case; ${topBacklog.use_case || "-"} on ${topBacklog.prompt_version || "-"} concentrates ${formatInt(topBacklog.not_approved_cases)} not-approved responses.`,
        `The weakest dimension is ${weakestDimension.dimension || "-"}, at ${formatNumber(weakestDimension.avg_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/5; this explains why the global average is not enough.`,
        `The current slice has ${formatInt(highSeverityCount)} high-severity occurrences in the listed issues. That turns quality analysis into a correction queue.`
      ],
      [
        `The decision is to keep a use-case gate: ${bestVersion.prompt_version || "-"} is the best baseline, but does not replace the matrix, issue and backlog readout.`,
        `The next cycle should address ${topBacklog.use_case || "-"} on ${topBacklog.prompt_version || "-"} first, because it concentrates ${formatInt(topBacklog.not_approved_cases)} not-approved responses.`,
        `The last month is still ${formatNumber(targetGap, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} point below the 4.0 target; releasing by average alone would hide operational risk.`
      ]
    ],
    es: [
      [
        `En el recorte ${resultLabel}, ${formatInt(base.reviewed_responses)} respuestas fueron evaluadas; ${formatPercent(base.release_ready_rate)} están listas para release y el score medio queda en ${formatNumber(base.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/5.`,
        `La lectura no depende solo de la media: ${formatPercent(base.critical_issue_rate)} aún cae en severidad alta, entonces el release debe combinar score, preparación y riesgo.`,
        `Cuando cambia el filtro, los KPIs también cambian; eso muestra si el resultado viene de un baseline sano, backlog o casos bloqueados.`
      ],
      [
        `La versión con mejor señal es ${bestVersion.prompt_version || "-"}: ${formatPercent(bestVersion.release_ready_rate)} release-ready, ${formatPercent(bestVersion.critical_issue_rate)} severidad alta y ${formatInt(bestVersion.reviewed_responses)} evaluadas.`,
        `${strongestUseCase.use_case || "El caso más fuerte"} lidera con ${formatNumber(strongestUseCase.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}; ${weakestUseCase.use_case || "el caso más débil"} baja la vara con ${formatNumber(weakestUseCase.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`,
        `La tendencia pasa de ${formatNumber(firstMonth.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} a ${formatNumber(lastMonth.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}: +${formatNumber(scoreDelta, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} punto, aún debajo del objetivo 4,0.`
      ],
      [
        `La matriz muestra dónde el release puede avanzar por versión y caso de uso; ${topBacklog.use_case || "-"} en ${topBacklog.prompt_version || "-"} concentra ${formatInt(topBacklog.not_approved_cases)} no aprobadas.`,
        `La dimensión más débil es ${weakestDimension.dimension || "-"}, con ${formatNumber(weakestDimension.avg_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}/5; esto explica por qué la media global no alcanza.`,
        `El recorte actual tiene ${formatInt(highSeverityCount)} ocurrencias de severidad alta en las fallas listadas. Eso convierte la calidad en fila de corrección.`
      ],
      [
        `La decisión es mantener gate por caso de uso: ${bestVersion.prompt_version || "-"} es el mejor baseline, pero no reemplaza la lectura de matriz, fallas y backlog.`,
        `El próximo ciclo debe atacar ${topBacklog.use_case || "-"} en ${topBacklog.prompt_version || "-"} primero, porque concentra ${formatInt(topBacklog.not_approved_cases)} respuestas no aprobadas.`,
        `El último mes aún está ${formatNumber(targetGap, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} punto debajo del objetivo 4,0; liberar solo por media escondería riesgo operacional.`
      ]
    ]
  };
  const texts = (stageTexts[state.lang] || stageTexts.pt)[stage] || (stageTexts[state.lang] || stageTexts.pt)[0];
  return `
    <section class="result-readout ai-result-readout">
      <span>${escapeHtml(term("reading"))}</span>
      <ul>
        ${texts.map((reading) => `<li>${escapeHtml(reading)}</li>`).join("")}
      </ul>
    </section>
  `;
};

const pipelineResultReadout = (data, context, stage = 0) => {
  const sourceLabel = context.source === "all" ? term("allSources") : label(context.source);
  const severityLabel = context.severity === "all" ? copy().all : label(context.severity);
  const issueLabel = context.issue === "all" ? copy().all : label(context.issue);
  const categoryLabel = context.category === "all" ? term("allCategories") : label(context.category);
  const rules = context.rules?.length ? context.rules : data.failed_rules || [];
  const sourceQuality = context.sourceQuality?.length ? context.sourceQuality : data.source_quality || [];
  const readyRevenue = context.readyRevenue?.length ? context.readyRevenue : data.revenue_ready || [];
  const reviewRecords = context.reviewRecords?.length ? context.reviewRecords : data.review_records || [];
  const categoryRows = context.categoryRows?.length ? context.categoryRows : data.category_metrics || [];
  const topRule = [...rules].sort((a, b) => Number(b.failed_records || 0) - Number(a.failed_records || 0))[0] || {};
  const weakestSource = [...sourceQuality].sort((a, b) => Number(a.ready_rate || 0) - Number(b.ready_rate || 0))[0] || {};
  const strongestSource = [...sourceQuality].sort((a, b) => Number(b.ready_rate || 0) - Number(a.ready_rate || 0))[0] || {};
  const readyTotal = readyRevenue.reduce((sum, row) => sum + Number(row.captured_payment_amount || 0), 0);
  const readyOrders = readyRevenue.reduce((sum, row) => sum + Number(row.completed_orders || 0), 0);
  const reviewTotal = reviewRecords.reduce((sum, row) => sum + Number(row.order_total || 0), 0);
  const topCategory = [...categoryRows].sort((a, b) => Number(b.net_revenue || 0) - Number(a.net_revenue || 0))[0] || {};
  const weakestMargin = [...categoryRows].sort((a, b) => (Number(a.gross_margin || 0) / Math.max(1, Number(a.net_revenue || 0))) - (Number(b.gross_margin || 0) / Math.max(1, Number(b.net_revenue || 0))))[0] || {};
  const weakestMarginRate = Number(weakestMargin.gross_margin || 0) / Math.max(1, Number(weakestMargin.net_revenue || 0));
  const criticalFailures = rules.filter((row) => row.severity === "Critical").reduce((sum, row) => sum + Number(row.failed_records || 0), 0);
  const stageTexts = {
    pt: [
      [
        `Com severidade ${severityLabel} e tipo ${issueLabel}, o gate enxerga ${formatInt(criticalFailures)} falhas críticas contra ${formatInt(context.rawOrders || data.kpis.raw_orders)} pedidos brutos.`,
        `O score filtrado fica em ${formatPercent(context.scopedQualityScore)}: alto o bastante para parecer saudável, mas ainda dependente de zerar falhas críticas antes da publicação.`,
        `A leitura principal é binária: se existir falha crítica no recorte, o BI executivo não deveria publicar esse pedaço como camada final.`
      ],
      [
        `No recorte de origem ${sourceLabel}, a regra com maior impacto é ${topRule.rule_name || "-"}, com ${formatInt(topRule.failed_records || 0)} registros afetados.`,
        `${strongestSource.source_system || "-"} aparece com ${formatPercent(strongestSource.ready_rate || 0)} de prontidão; ${weakestSource.source_system || "-"} é o ponto mais frágil, com ${formatPercent(weakestSource.ready_rate || 0)}.`,
        `Aqui a leitura separa volume de risco: poucas regras podem bloquear muito se atingirem pagamento, status ou referência obrigatória.`
      ],
      [
        `A fila Ready soma ${formatInt(readyOrders)} pedidos concluídos e ${formatMoney(readyTotal)} capturados para BI no recorte atual.`,
        `A fila de revisão mantém ${formatInt(reviewRecords.length)} pedidos bloqueados, somando ${formatMoney(reviewTotal)} que não deve entrar em publicação executiva sem correção.`,
        `O filtro por origem e tipo de falha deixa claro o que pode seguir para mart Ready e o que precisa continuar em revisão operacional.`
      ],
      [
        `Em ${categoryLabel}, a maior exposição de receita é ${topCategory.category || "-"}, com ${formatMoney(topCategory.net_revenue || 0)} líquidos e ${formatInt(topCategory.units || 0)} unidades.`,
        `A margem mais sensível é ${weakestMargin.category || "-"}, em ${formatPercent(weakestMarginRate)}; abaixo do piso, o ponto vira risco de publicação mesmo quando a receita é alta.`,
        `O mapa combina receita, margem e unidades para mostrar onde corrigir primeiro: categorias grandes e abaixo do piso são prioridade executiva.`
      ]
    ],
    en: [
      [
        `With severity ${severityLabel} and issue type ${issueLabel}, the gate sees ${formatInt(criticalFailures)} critical failures across ${formatInt(context.rawOrders || data.kpis.raw_orders)} raw orders.`,
        `The filtered score is ${formatPercent(context.scopedQualityScore)}: high enough to look healthy, but still dependent on clearing critical failures before publication.`,
        `The main readout is binary: if a critical failure exists in the slice, that part should not be published as the final executive layer.`
      ],
      [
        `For source ${sourceLabel}, the highest-impact rule is ${topRule.rule_name || "-"}, with ${formatInt(topRule.failed_records || 0)} affected records.`,
        `${strongestSource.source_system || "-"} shows ${formatPercent(strongestSource.ready_rate || 0)} readiness; ${weakestSource.source_system || "-"} is the weakest point at ${formatPercent(weakestSource.ready_rate || 0)}.`,
        `This readout separates volume from risk: a small number of rules can block a lot when they hit payment, status or required references.`
      ],
      [
        `The Ready queue adds up to ${formatInt(readyOrders)} completed orders and ${formatMoney(readyTotal)} captured for BI in the current slice.`,
        `The review queue keeps ${formatInt(reviewRecords.length)} blocked orders, totaling ${formatMoney(reviewTotal)} that should not enter executive publication without correction.`,
        `Filtering by source and issue type makes clear what can move to the Ready mart and what must remain in operational review.`
      ],
      [
        `In ${categoryLabel}, the largest revenue exposure is ${topCategory.category || "-"}, with ${formatMoney(topCategory.net_revenue || 0)} net and ${formatInt(topCategory.units || 0)} units.`,
        `The most sensitive margin is ${weakestMargin.category || "-"}, at ${formatPercent(weakestMarginRate)}; below the floor, the point becomes publication risk even when revenue is high.`,
        `The map combines revenue, margin and units to show what to fix first: large categories below the floor are the executive priority.`
      ]
    ],
    es: [
      [
        `Con severidad ${severityLabel} y tipo ${issueLabel}, el gate ve ${formatInt(criticalFailures)} fallas críticas sobre ${formatInt(context.rawOrders || data.kpis.raw_orders)} pedidos brutos.`,
        `El score filtrado queda en ${formatPercent(context.scopedQualityScore)}: alto para parecer sano, pero todavía depende de cerrar fallas críticas antes de publicar.`,
        `La lectura principal es binaria: si existe falla crítica en el recorte, esa parte no debería publicarse como capa ejecutiva final.`
      ],
      [
        `En la fuente ${sourceLabel}, la regla de mayor impacto es ${topRule.rule_name || "-"}, con ${formatInt(topRule.failed_records || 0)} registros afectados.`,
        `${strongestSource.source_system || "-"} aparece con ${formatPercent(strongestSource.ready_rate || 0)} de preparación; ${weakestSource.source_system || "-"} es el punto más frágil, con ${formatPercent(weakestSource.ready_rate || 0)}.`,
        `Esta lectura separa volumen de riesgo: pocas reglas pueden bloquear mucho si afectan pago, estado o referencias obligatorias.`
      ],
      [
        `La fila Ready suma ${formatInt(readyOrders)} pedidos concluidos y ${formatMoney(readyTotal)} capturados para BI en el recorte actual.`,
        `La fila de revisión mantiene ${formatInt(reviewRecords.length)} pedidos bloqueados, sumando ${formatMoney(reviewTotal)} que no debe entrar en publicación ejecutiva sin corrección.`,
        `El filtro por fuente y tipo de falla deja claro qué puede avanzar al mart Ready y qué debe seguir en revisión operacional.`
      ],
      [
        `En ${categoryLabel}, la mayor exposición de ingreso es ${topCategory.category || "-"}, con ${formatMoney(topCategory.net_revenue || 0)} netos y ${formatInt(topCategory.units || 0)} unidades.`,
        `La margen más sensible es ${weakestMargin.category || "-"}, en ${formatPercent(weakestMarginRate)}; debajo del piso, el punto se vuelve riesgo de publicación aunque el ingreso sea alto.`,
        `El mapa combina ingreso, margen y unidades para mostrar qué corregir primero: categorías grandes y debajo del piso son prioridad ejecutiva.`
      ]
    ]
  };
  const texts = (stageTexts[state.lang] || stageTexts.pt)[stage] || (stageTexts[state.lang] || stageTexts.pt)[0];
  return `
    <section class="result-readout pipeline-result-readout">
      <span>${escapeHtml(term("reading"))}</span>
      <ul>
        ${texts.map((reading) => `<li>${escapeHtml(reading)}</li>`).join("")}
      </ul>
    </section>
  `;
};

const decisionGrid = (decision) => `
  <section class="decision-block">
    <div class="decision-summary">
      <span>${escapeHtml(decision.kicker)}</span>
      <strong>${escapeHtml(decision.summary)}</strong>
    </div>
    <div class="decision-grid">
      ${decision.items.map((item) => `
        <article class="decision-card ${item.kind ? `is-${escapeHtml(item.kind)}` : ""}">
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.body)}</p>
        </article>
      `).join("")}
    </div>
  </section>
`;

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

const diagnosticKpiGrid = (items) => `
  <div class="diagnostic-kpi-grid">
    ${items.map((item) => `
      <article class="diagnostic-kpi-card ${item.alert ? "is-alert" : ""}">
        ${item.badge ? `<span class="diagnostic-kpi-badge">${escapeHtml(item.badge)}</span>` : ""}
        <small>${escapeHtml(item.label)}</small>
        <strong>${escapeHtml(item.value)}</strong>
        <p>${escapeHtml(item.note)}</p>
        <div class="diagnostic-kpi-evidence">
          <span>${escapeHtml(item.evidence)}</span>
          <i class="diagnostic-kpi-bar" style="--w:${Math.max(4, Math.min(100, Number(item.progress || 0) * 100)).toFixed(1)}%"></i>
        </div>
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

const tableCard = (title, subtitle, columns, rows, wide = false, template = "1.4fr 1fr 1fr", extraClass = "") => `
  <article class="table-card ${wide ? "is-wide" : ""} ${extraClass}">
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

const liquidityCategoryTable = (rows) => {
  const sortedRows = [...rows].sort((a, b) => Number(b.confirmation_rate || 0) - Number(a.confirmation_rate || 0));
  const maxConfirmed = Math.max(...sortedRows.map((row) => Number(row.confirmed_bookings || 0)), 1);
  const copy = ({
    pt: {
      lowLiquidity: "atenção",
      stable: "ok",
      slow: "lento"
    },
    en: {
      lowLiquidity: "watch",
      stable: "ok",
      slow: "slow"
    },
    es: {
      lowLiquidity: "atención",
      stable: "ok",
      slow: "lento"
    }
  })[state.lang] || {};
  return `
    <div class="liquidity-table" role="table">
      <div class="liquidity-table-row is-head" role="row">
        <span>${escapeHtml(term("category"))}</span>
        <span>${escapeHtml(term("confirmed"))}</span>
        <span>${escapeHtml(term("rate"))}</span>
        <span>${escapeHtml(term("avgHours"))}</span>
      </div>
      ${sortedRows.map((row, index) => {
        const confirmed = Number(row.confirmed_bookings || 0);
        const rate = Number(row.confirmation_rate || 0);
        const hours = Number(row.avg_hours_to_confirmation || 0);
        const isAlert = rate < 0.55;
        const isSlow = hours >= 50;
        return `
          <div class="liquidity-table-row ${isAlert ? "is-alert" : ""}" role="row">
            <strong class="liquidity-category"><span class="liquidity-rank">${String(index + 1).padStart(2, "0")}</span>${escapeHtml(label(row.category))}</strong>
            <span class="liquidity-mini-bar">
              <strong>${escapeHtml(formatInt(confirmed))}</strong>
              <i style="--w:${Math.max(6, (confirmed / maxConfirmed) * 100).toFixed(1)}%"></i>
            </span>
            <span class="liquidity-rate ${isAlert ? "is-alert" : ""}">
              <strong>${escapeHtml(formatPercent(rate))}</strong>
              <i style="--w:${Math.max(6, rate * 100).toFixed(1)}%"></i>
            </span>
            <span class="liquidity-hours ${isSlow ? "is-slow" : ""}">
              <strong>${escapeHtml(formatNumber(hours, { maximumFractionDigits: 1 }))}h</strong>
              <span>${escapeHtml(isSlow || isAlert ? copy.lowLiquidity : copy.stable)}</span>
            </span>
          </div>
        `;
      }).join("")}
    </div>
  `;
};

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

const retentionActivationComparison = (rows) => {
  const activated = rows[0] || {};
  const notActivated = rows[1] || {};
  const windows = [
    { key: "retention_d1", label: "D1" },
    { key: "retention_d7", label: "D7" },
    { key: "retention_d30", label: "D30" }
  ];
  const max = Math.max(...windows.flatMap((window) => [
    Number(activated[window.key] || 0),
    Number(notActivated[window.key] || 0)
  ]), 0.01);
  const copy = ({
    pt: {
      lift: "vantagem",
      retained: "retidos",
      summary: "Ativados retêm mais em todas as janelas",
      d30: "Diferença D30"
    },
    en: {
      lift: "lift",
      retained: "retained",
      summary: "Activated users retain better across every window",
      d30: "D30 gap"
    },
    es: {
      lift: "ventaja",
      retained: "retenidos",
      summary: "Los activados retienen mejor en todas las ventanas",
      d30: "Diferencia D30"
    }
  })[state.lang] || {};
  const retainedCount = (row, key) => Math.round(Number(row.users || 0) * Number(row[key] || 0));
  const d30Lift = Number(activated.retention_d30 || 0) - Number(notActivated.retention_d30 || 0);
  return `
    <div class="retention-comparison">
      <div class="retention-comparison-summary">
        <strong>${escapeHtml(copy.summary)}</strong>
        <span>${escapeHtml(copy.d30)}: +${escapeHtml(formatNumber(d30Lift * 100, { maximumFractionDigits: 1 }))} p.p.</span>
      </div>
      <div class="retention-window-grid">
        ${windows.map((window) => {
          const activeValue = Number(activated[window.key] || 0);
          const inactiveValue = Number(notActivated[window.key] || 0);
          const lift = activeValue - inactiveValue;
          return `
            <article class="retention-window">
              <div class="retention-window-head">
                <strong>${escapeHtml(window.label)}</strong>
                <span class="retention-lift">+${escapeHtml(formatNumber(lift * 100, { maximumFractionDigits: 1 }))} p.p. ${escapeHtml(copy.lift)}</span>
              </div>
              <div class="retention-lane">
                <span class="retention-lane-label">${escapeHtml(label(activated.activation_status || ""))}</span>
                <div class="retention-lane-meter">
                  <i class="retention-lane-bar" style="--w:${Math.max(4, (activeValue / max) * 100).toFixed(1)}%"></i>
                  <strong>${escapeHtml(formatPercent(activeValue))}</strong>
                </div>
                <span class="retention-lane-count">${escapeHtml(formatInt(retainedCount(activated, window.key)))} / ${escapeHtml(formatInt(activated.users))} ${escapeHtml(copy.retained)}</span>
              </div>
              <div class="retention-lane is-muted">
                <span class="retention-lane-label">${escapeHtml(label(notActivated.activation_status || ""))}</span>
                <div class="retention-lane-meter">
                  <i class="retention-lane-bar" style="--w:${Math.max(4, (inactiveValue / max) * 100).toFixed(1)}%"></i>
                  <strong>${escapeHtml(formatPercent(inactiveValue))}</strong>
                </div>
                <span class="retention-lane-count">${escapeHtml(formatInt(retainedCount(notActivated, window.key)))} / ${escapeHtml(formatInt(notActivated.users))} ${escapeHtml(copy.retained)}</span>
              </div>
            </article>
          `;
        }).join("")}
      </div>
    </div>
  `;
};

const liquidityKpiStrip = (rows) => {
  const safeRows = rows || [];
  const opportunities = safeRows.reduce((sum, row) => sum + Number(row.opportunities || 0), 0);
  const invitations = safeRows.reduce((sum, row) => sum + Number(row.invitations_sent || 0), 0);
  const confirmed = safeRows.reduce((sum, row) => sum + Number(row.confirmed_bookings || 0), 0);
  const avgHours = confirmed
    ? safeRows.reduce((sum, row) => sum + (Number(row.avg_hours_to_confirmation || 0) * Number(row.confirmed_bookings || 0)), 0) / confirmed
    : 0;
  const targetCount = safeRows.filter((row) => Number(row.confirmation_rate || 0) >= 0.6).length;
  const copy = ({
    pt: {
      opportunities: "Oportunidades",
      confirmed: "Reservas",
      rate: "Taxa confirm.",
      avgTime: "Tempo médio",
      marketDemand: "demanda analisada",
      confirmedBookings: "confirmadas",
      aboveTarget: `${targetCount}/${safeRows.length || 0} categorias na meta`,
      untilConfirmation: "até confirmação"
    },
    en: {
      opportunities: "Opportunities",
      confirmed: "Bookings",
      rate: "Confirm. rate",
      avgTime: "Avg. time",
      marketDemand: "demand reviewed",
      confirmedBookings: "confirmed",
      aboveTarget: `${targetCount}/${safeRows.length || 0} categories on target`,
      untilConfirmation: "to confirmation"
    },
    es: {
      opportunities: "Oportunidades",
      confirmed: "Reservas",
      rate: "Tasa confirm.",
      avgTime: "Tiempo medio",
      marketDemand: "demanda analizada",
      confirmedBookings: "confirmadas",
      aboveTarget: `${targetCount}/${safeRows.length || 0} categorías en meta`,
      untilConfirmation: "hasta confirmación"
    }
  })[state.lang] || {};
  return `
    <div class="chart-kpi-strip">
      <article class="chart-kpi-item">
        <small>${escapeHtml(copy.opportunities)}</small>
        <strong>${escapeHtml(formatInt(opportunities))}</strong>
        <span>${escapeHtml(copy.marketDemand)}</span>
      </article>
      <article class="chart-kpi-item">
        <small>${escapeHtml(copy.confirmed)}</small>
        <strong>${escapeHtml(formatInt(confirmed))}</strong>
        <span>${escapeHtml(copy.confirmedBookings)}</span>
      </article>
      <article class="chart-kpi-item">
        <small>${escapeHtml(copy.rate)}</small>
        <strong>${escapeHtml(formatPercent(invitations ? confirmed / invitations : 0))}</strong>
        <span>${escapeHtml(copy.aboveTarget)}</span>
      </article>
      <article class="chart-kpi-item">
        <small>${escapeHtml(copy.avgTime)}</small>
        <strong>${escapeHtml(formatNumber(avgHours, { maximumFractionDigits: 1 }))}h</strong>
        <span>${escapeHtml(copy.untilConfirmation)}</span>
      </article>
    </div>
  `;
};

const pipelineCategoryImpactKpiStrip = (rows) => {
  const safeRows = rows || [];
  const revenue = safeRows.reduce((sum, row) => sum + Number(row.net_revenue || 0), 0);
  const margin = safeRows.reduce((sum, row) => sum + Number(row.gross_margin || 0), 0);
  const weightedMargin = margin / Math.max(1, revenue);
  const leader = safeRows.reduce((winner, row) => Number(row.net_revenue || 0) > Number(winner.net_revenue || 0) ? row : winner, safeRows[0] || {});
  const risky = safeRows.filter((row) => (Number(row.gross_margin || 0) / Math.max(1, Number(row.net_revenue || 0))) < 0.35).length;
  const copy = ({
    pt: {
      revenue: "Receita",
      margin: "Margem",
      leader: "Maior impacto",
      risk: "Risco",
      readyRevenue: "líquida analisada",
      weighted: "ponderada",
      byRevenue: `${escapeHtml(label(leader.category || ""))} lidera`,
      belowFloor: "categorias abaixo de 35%"
    },
    en: {
      revenue: "Revenue",
      margin: "Margin",
      leader: "Highest impact",
      risk: "Risk",
      readyRevenue: "net reviewed",
      weighted: "weighted",
      byRevenue: `${escapeHtml(label(leader.category || ""))} leads`,
      belowFloor: "categories below 35%"
    },
    es: {
      revenue: "Ingreso",
      margin: "Margen",
      leader: "Mayor impacto",
      risk: "Riesgo",
      readyRevenue: "neto analizado",
      weighted: "ponderado",
      byRevenue: `${escapeHtml(label(leader.category || ""))} lidera`,
      belowFloor: "categorias abajo de 35%"
    }
  })[state.lang] || {};
  return `
    <div class="chart-kpi-strip">
      <article class="chart-kpi-item">
        <small>${escapeHtml(copy.revenue)}</small>
        <strong>${escapeHtml(formatMoney(revenue))}</strong>
        <span>${escapeHtml(copy.readyRevenue)}</span>
      </article>
      <article class="chart-kpi-item">
        <small>${escapeHtml(copy.margin)}</small>
        <strong>${escapeHtml(formatPercent(weightedMargin))}</strong>
        <span>${escapeHtml(copy.weighted)}</span>
      </article>
      <article class="chart-kpi-item">
        <small>${escapeHtml(copy.leader)}</small>
        <strong>${escapeHtml(label(leader.category || ""))}</strong>
        <span>${escapeHtml(formatMoney(leader.net_revenue || 0))}</span>
      </article>
      <article class="chart-kpi-item">
        <small>${escapeHtml(copy.risk)}</small>
        <strong>${escapeHtml(formatInt(risky))}</strong>
        <span>${escapeHtml(copy.belowFloor)}</span>
      </article>
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

const smoothPath = (points) => {
  if (points.length < 2) return "";
  return points.slice(1).reduce((path, point, index) => {
    const previous = points[index];
    const midX = (previous.x + point.x) / 2;
    return `${path} C ${midX.toFixed(1)},${previous.y.toFixed(1)} ${midX.toFixed(1)},${point.y.toFixed(1)} ${point.x.toFixed(1)},${point.y.toFixed(1)}`;
  }, `M ${points[0].x.toFixed(1)},${points[0].y.toFixed(1)}`);
};

const qualityTrendChart = (rows) => {
  const compactChart = typeof window !== "undefined" && window.innerWidth < 560;
  const width = compactChart ? 640 : 920;
  const height = compactChart ? 430 : 370;
  const pad = compactChart ? { top: 52, right: 42, bottom: 74, left: 82 } : { top: 44, right: 42, bottom: 70, left: 78 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const target = 4;
  const values = rows.map((row) => Number(row.avg_quality_score || 0));
  const yMin = Math.min(3.4, ...values) - 0.02;
  const yMax = Math.max(4.1, target, ...values) + 0.02;
  const x = (index) => pad.left + (index * chartW) / Math.max(1, rows.length - 1);
  const y = (value) => pad.top + ((yMax - Number(value || 0)) / Math.max(0.01, yMax - yMin)) * chartH;
  const points = rows.map((row, index) => ({ x: x(index), y: y(row.avg_quality_score), row }));
  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${points.at(-1).x.toFixed(1)},${(pad.top + chartH).toFixed(1)} L ${points[0].x.toFixed(1)},${(pad.top + chartH).toFixed(1)} Z`;
  const barBase = pad.top + chartH;
  const barMaxHeight = compactChart ? 62 : 46;
  const barWidth = compactChart ? 44 : 54;
  const monthLabelY = height - 26;
  const xAxisY = height - 8;
  const last = rows.at(-1) || {};
  const first = rows[0] || {};
  const best = [...rows].sort((a, b) => Number(b.avg_quality_score || 0) - Number(a.avg_quality_score || 0))[0] || last;
  const delta = Number(last.avg_quality_score || 0) - Number(first.avg_quality_score || 0);
  const targetGap = target - Number(last.avg_quality_score || 0);
  const trendCopy = ({
    pt: { scoreLine: "linha = score médio", readyBars: "colunas = release-ready", yAxis: "score médio (1-5)", xAxis: "mês da avaliação", target: "alvo operacional 4,0", delta: "delta no período", bestMonth: "melhor mês", currentReady: "prontidão atual", gap: "gap até alvo" },
    en: { scoreLine: "line = average score", readyBars: "columns = release-ready", yAxis: "average score (1-5)", xAxis: "review month", target: "operational target 4.0", delta: "period delta", bestMonth: "best month", currentReady: "current readiness", gap: "gap to target" },
    es: { scoreLine: "línea = score medio", readyBars: "columnas = release-ready", yAxis: "score medio (1-5)", xAxis: "mes de evaluación", target: "objetivo operacional 4,0", delta: "delta del periodo", bestMonth: "mejor mes", currentReady: "preparación actual", gap: "brecha al objetivo" }
  })[state.lang] || {};
  const monthLabel = (value) => String(value || "").slice(5) || value;
  const yTicks = [yMin, (yMin + yMax) / 2, yMax];
  return `
    <div class="quality-trend">
      <div class="quality-trend-summary">
        <span><strong>${escapeHtml(delta >= 0 ? `+${formatNumber(delta, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : formatNumber(delta, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}</strong>${escapeHtml(trendCopy.delta)}</span>
        <span><strong>${escapeHtml(monthLabel(best.response_month))}</strong>${escapeHtml(trendCopy.bestMonth)} - ${escapeHtml(formatNumber(best.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}</span>
        <span><strong>${escapeHtml(formatPercent(last.release_ready_rate || 0))}</strong>${escapeHtml(trendCopy.currentReady)}</span>
        <span><strong>${escapeHtml(formatNumber(Math.max(0, targetGap), { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}</strong>${escapeHtml(trendCopy.gap)}</span>
      </div>
      <div class="quality-trend-legend">
        <span class="is-score">${escapeHtml(trendCopy.scoreLine)}</span>
        <span class="is-ready">${escapeHtml(trendCopy.readyBars)}</span>
      </div>
      <svg class="quality-trend-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(`${trendCopy.scoreLine}: ${formatNumber(last.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}; ${trendCopy.readyBars}: ${formatPercent(last.release_ready_rate || 0)}`)}">
        <defs>
          <linearGradient id="qualityTrendArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#39d4ff" stop-opacity="0.22"></stop><stop offset="100%" stop-color="#52e6a5" stop-opacity="0"></stop></linearGradient>
          <linearGradient id="qualityTrendLine" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stop-color="#52e6a5"></stop><stop offset="100%" stop-color="#39d4ff"></stop></linearGradient>
        </defs>
        <rect class="quality-plot-bg" x="${pad.left}" y="${pad.top}" width="${chartW}" height="${chartH}" rx="16"></rect>
        <text class="quality-axis-title is-y" x="${pad.left - 44}" y="${(pad.top + chartH / 2).toFixed(1)}" text-anchor="middle" transform="rotate(-90 ${pad.left - 44} ${(pad.top + chartH / 2).toFixed(1)})">${escapeHtml(trendCopy.yAxis)}</text>
        <text class="quality-axis-title is-x" x="${(pad.left + chartW / 2).toFixed(1)}" y="${xAxisY}" text-anchor="middle">${escapeHtml(trendCopy.xAxis)}</text>
        ${yTicks.map((tick) => `<line class="quality-grid" x1="${pad.left}" y1="${y(tick).toFixed(1)}" x2="${width - pad.right}" y2="${y(tick).toFixed(1)}"></line><text class="quality-axis-label" x="${pad.left - 16}" y="${(y(tick) + 5).toFixed(1)}" text-anchor="end">${escapeHtml(formatNumber(tick, { minimumFractionDigits: 1, maximumFractionDigits: 1 }))}</text>`).join("")}
        <line class="quality-target" x1="${pad.left}" y1="${y(target).toFixed(1)}" x2="${width - pad.right}" y2="${y(target).toFixed(1)}"></line>
        <text class="quality-target-label" x="${width - pad.right}" y="${(y(target) - 10).toFixed(1)}" text-anchor="end">${escapeHtml(trendCopy.target)}</text>
        ${rows.map((row, index) => {
          const readyRate = Number(row.release_ready_rate || 0);
          const readyHeight = Math.max(7, readyRate * barMaxHeight);
          const readyY = barBase - readyHeight;
          return `<line class="quality-month-guide" x1="${x(index).toFixed(1)}" y1="${pad.top}" x2="${x(index).toFixed(1)}" y2="${barBase}"></line><rect class="quality-ready-bar" x="${(x(index) - barWidth / 2).toFixed(1)}" y="${readyY.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${readyHeight.toFixed(1)}" rx="8"></rect><text class="quality-ready-label" x="${x(index).toFixed(1)}" y="${(readyY - 9).toFixed(1)}" text-anchor="middle">${escapeHtml(formatPercent(readyRate))}</text><text class="quality-month-label" x="${x(index).toFixed(1)}" y="${monthLabelY}" text-anchor="middle">${escapeHtml(monthLabel(row.response_month))}</text>`;
        }).join("")}
        <path class="quality-area" d="${areaPath}"></path><path class="quality-line" d="${linePath}"></path>
        ${rows.map((row, index) => `<circle class="quality-point-ring" cx="${x(index).toFixed(1)}" cy="${y(row.avg_quality_score).toFixed(1)}" r="11"></circle><circle class="quality-point" cx="${x(index).toFixed(1)}" cy="${y(row.avg_quality_score).toFixed(1)}" r="6"></circle><text class="quality-point-label" x="${x(index).toFixed(1)}" y="${(y(row.avg_quality_score) - 18).toFixed(1)}" text-anchor="middle">${escapeHtml(formatNumber(row.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}</text>`).join("")}
      </svg>
    </div>
  `;
};

const retailRevenueTrendChart = (rows) => {
  const width = 920;
  const height = 370;
  const pad = { top: 44, right: 52, bottom: 70, left: 118 };
  const chartW = width - pad.left - pad.right;
  const chartH = height - pad.top - pad.bottom;
  const values = rows.map((row) => Number(row.net_revenue || 0));
  const yMin = Math.min(0, ...values);
  const yMax = Math.max(...values, 1) * 1.08;
  const x = (index) => pad.left + (index * chartW) / Math.max(1, rows.length - 1);
  const y = (value) => pad.top + ((yMax - Number(value || 0)) / Math.max(1, yMax - yMin)) * chartH;
  const points = rows.map((row, index) => ({ x: x(index), y: y(row.net_revenue), row }));
  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${points.at(-1).x.toFixed(1)},${(pad.top + chartH).toFixed(1)} L ${points[0].x.toFixed(1)},${(pad.top + chartH).toFixed(1)} Z`;
  const marginFloor = 0.3;
  const marginScaleMax = 0.55;
  const barBase = pad.top + chartH;
  const barMaxHeight = 64;
  const barWidth = 52;
  const monthLabel = (value) => String(value || "").slice(5) || value;
  const copyText = ({ pt: { revenueLine: "linha = receita líquida", marginBars: "colunas = margem bruta", yAxis: "receita líquida", xAxis: "mês do pedido", marginFloor: "piso margem 30%" }, en: { revenueLine: "line = net revenue", marginBars: "columns = gross margin", yAxis: "net revenue", xAxis: "order month", marginFloor: "30% margin floor" }, es: { revenueLine: "línea = ingreso neto", marginBars: "columnas = margen bruto", yAxis: "ingreso neto", xAxis: "mes del pedido", marginFloor: "piso margen 30%" } })[state.lang] || {};
  return `
    <div class="quality-trend revenue-trend">
      <div class="quality-trend-legend"><span class="is-score">${escapeHtml(copyText.revenueLine)}</span><span class="is-ready">${escapeHtml(copyText.marginBars)}</span><span class="is-threshold">${escapeHtml(copyText.marginFloor)}</span></div>
      <svg class="quality-trend-chart revenue-trend-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(copyText.revenueLine)}">
        <defs>
          <linearGradient id="qualityTrendArea" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#39d4ff" stop-opacity="0.22"></stop><stop offset="100%" stop-color="#52e6a5" stop-opacity="0"></stop></linearGradient>
          <linearGradient id="qualityTrendLine" x1="0" x2="1" y1="0" y2="0"><stop offset="0%" stop-color="#52e6a5"></stop><stop offset="100%" stop-color="#39d4ff"></stop></linearGradient>
        </defs>
        <rect class="quality-plot-bg" x="${pad.left}" y="${pad.top}" width="${chartW}" height="${chartH}" rx="16"></rect>
        <text class="quality-axis-title is-y" x="${pad.left - 88}" y="${(pad.top + chartH / 2).toFixed(1)}" text-anchor="middle" transform="rotate(-90 ${pad.left - 88} ${(pad.top + chartH / 2).toFixed(1)})">${escapeHtml(copyText.yAxis)}</text>
        <text class="quality-axis-title is-x" x="${(pad.left + chartW / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle">${escapeHtml(copyText.xAxis)}</text>
        <line class="quality-grid" x1="${pad.left}" y1="${pad.top}" x2="${width - pad.right}" y2="${pad.top}"></line>
        <line class="quality-grid" x1="${pad.left}" y1="${barBase}" x2="${width - pad.right}" y2="${barBase}"></line>
        <text class="quality-axis-label" x="${pad.left - 16}" y="${(pad.top + 5).toFixed(1)}" text-anchor="end">${escapeHtml(formatMoney(yMax))}</text>
        <text class="quality-axis-label" x="${pad.left - 16}" y="${(barBase + 5).toFixed(1)}" text-anchor="end">${escapeHtml(formatMoney(yMin))}</text>
        <line class="quality-target revenue-margin-target" x1="${pad.left}" y1="${(barBase - (marginFloor / marginScaleMax) * barMaxHeight).toFixed(1)}" x2="${width - pad.right}" y2="${(barBase - (marginFloor / marginScaleMax) * barMaxHeight).toFixed(1)}"></line>
        <text class="quality-target-label revenue-margin-target-label" x="${width - pad.right}" y="${(barBase - (marginFloor / marginScaleMax) * barMaxHeight - 10).toFixed(1)}" text-anchor="end">${escapeHtml(copyText.marginFloor)}</text>
        ${rows.map((row, index) => {
          const margin = Number(row.gross_margin_pct || 0);
          const marginHeight = Math.max(7, (margin / marginScaleMax) * barMaxHeight);
          const barY = barBase - marginHeight;
          return `<line class="quality-month-guide" x1="${x(index).toFixed(1)}" y1="${pad.top}" x2="${x(index).toFixed(1)}" y2="${barBase}"></line><rect class="quality-ready-bar revenue-margin-bar" x="${(x(index) - barWidth / 2).toFixed(1)}" y="${barY.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${marginHeight.toFixed(1)}" rx="8"></rect><text class="quality-ready-label revenue-margin-label" x="${(x(index) + barWidth / 2 + 10).toFixed(1)}" y="${(barY + marginHeight / 2).toFixed(1)}" text-anchor="start" dominant-baseline="middle">${escapeHtml(formatPercent(margin))}</text><text class="quality-month-label" x="${x(index).toFixed(1)}" y="${height - 26}" text-anchor="middle">${escapeHtml(monthLabel(row.order_month))}</text>`;
        }).join("")}
        <path class="quality-area" d="${areaPath}"></path><path class="quality-line revenue-line" d="${linePath}"></path>
        ${rows.map((row, index) => `<circle class="quality-point-ring" cx="${x(index).toFixed(1)}" cy="${y(row.net_revenue).toFixed(1)}" r="11"></circle><circle class="quality-point" cx="${x(index).toFixed(1)}" cy="${y(row.net_revenue).toFixed(1)}" r="6"></circle><text class="quality-point-label revenue-point-label" x="${x(index).toFixed(1)}" y="${(y(row.net_revenue) - 18).toFixed(1)}" text-anchor="middle">${escapeHtml(formatMoney(row.net_revenue))}</text>`).join("")}
      </svg>
    </div>
  `;
};

const dimensionScoreChart = (rows) => {
  const target = 4;
  const sorted = [...rows].sort((a, b) => Number(b.avg_score || 0) - Number(a.avg_score || 0));
  const clampPercent = (value) => Math.max(0, Math.min(100, ((Number(value || 0) - 1) / 4) * 100));
  const copyText = ({ pt: { target: "alvo 4,0", scale: "escala 1-5", gap: "gap", ready: "no alvo" }, en: { target: "target 4.0", scale: "scale 1-5", gap: "gap", ready: "on target" }, es: { target: "objetivo 4,0", scale: "escala 1-5", gap: "brecha", ready: "en objetivo" } })[state.lang] || {};
  return `
    <div class="dimension-bullet-chart" style="--target:${clampPercent(target).toFixed(2)}%">
      <div class="dimension-bullet-axis" aria-hidden="true"><span>1</span><span>3</span><strong>${escapeHtml(copyText.target)}</strong><span>5</span></div>
      ${sorted.map((row, index) => {
        const value = Number(row.avg_score || 0);
        const gap = Math.max(0, target - value);
        return `<article class="dimension-bullet-row ${gap <= 0 ? "is-ready" : ""}" style="--score:${clampPercent(value).toFixed(2)}%;--rank:${index + 1}"><div class="dimension-bullet-meta"><strong>${escapeHtml(label(row.dimension))}</strong><span>${escapeHtml(gap <= 0 ? copyText.ready : `${copyText.gap} ${formatNumber(gap, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)}</span></div><div class="dimension-bullet-track"><i class="dimension-bullet-fill"></i><i class="dimension-bullet-target"></i></div><strong class="dimension-bullet-value">${escapeHtml(formatNumber(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 }))}</strong></article>`;
      }).join("")}
      <span class="dimension-bullet-scale">${escapeHtml(copyText.scale)}</span>
    </div>
  `;
};

const aiReadinessMatrix = (useCases, versions, rows) => {
  const values = rows.map((row) => Number(row.release_ready_rate || 0));
  const max = Math.max(...values, 1);
  const lerp = (start, end, t) => Math.round(start + (end - start) * t);
  const readinessColor = (value) => {
    const t = Math.max(0, Math.min(1, Number(value || 0) / max));
    const stops = [{ p: 0, c: [13, 25, 40] }, { p: 0.52, c: [35, 105, 111] }, { p: 1, c: [36, 143, 103] }];
    const lower = t <= stops[1].p ? stops[0] : stops[1];
    const upper = t <= stops[1].p ? stops[1] : stops[2];
    const localT = (t - lower.p) / Math.max(upper.p - lower.p, 0.01);
    const color = lower.c.map((channel, index) => lerp(channel, upper.c[index], localT));
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };
  const copyText = ({ pt: { improvement: "item de melhoria", noBacklog: "fora do backlog", notApproved: "não aprov.", evaluated: "avaliadas", min: "menor prontidão", max: "maior prontidão" }, en: { improvement: "improvement item", noBacklog: "outside backlog", notApproved: "not approved", evaluated: "reviewed", min: "lower readiness", max: "higher readiness" }, es: { improvement: "item de mejora", noBacklog: "fuera del backlog", notApproved: "no aprob.", evaluated: "evaluadas", min: "menor preparación", max: "mayor preparación" } })[state.lang] || {};
  const rowFor = (useCase, promptVersion) => rows.find((item) => item.use_case === useCase && item.prompt_version === promptVersion);
  const dataCell = (useCase, promptVersion) => {
    const row = rowFor(useCase, promptVersion);
    if (!row) return `<div class="ai-readiness-cell is-empty"><b class="ai-readiness-version">${escapeHtml(label(promptVersion))}</b><strong>-</strong><span>${escapeHtml(copyText.noBacklog)}</span></div>`;
    const value = Number(row.release_ready_rate || 0);
    return `<div class="ai-readiness-cell" style="--cell-bg:${readinessColor(value)}"><b class="ai-readiness-version">${escapeHtml(label(promptVersion))}</b><strong>${escapeHtml(formatPercent(value))}</strong><span>${escapeHtml(formatInt(row.not_approved_cases))} ${escapeHtml(copyText.notApproved)} - ${escapeHtml(formatInt(row.reviewed_responses))} ${escapeHtml(copyText.evaluated)}</span></div>`;
  };
  return `
    <div class="ai-readiness-matrix">
      <div class="ai-readiness-legend" aria-hidden="true"><span>${escapeHtml(copyText.min)}</span><i></i><span>${escapeHtml(copyText.max)}</span></div>
      <div class="ai-readiness-grid">
        <div class="ai-readiness-header" style="--matrix-cols:${versions.length}"><div class="ai-readiness-head-spacer" aria-hidden="true"></div>${versions.map((promptVersion) => `<div class="ai-readiness-head">${escapeHtml(label(promptVersion))}</div>`).join("")}</div>
        ${useCases.map((useCase) => `<div class="ai-readiness-row" style="--matrix-cols:${versions.length}"><div class="ai-readiness-label"><strong>${escapeHtml(label(useCase))}</strong><span>${escapeHtml(copyText.improvement)}</span></div>${versions.map((promptVersion) => dataCell(useCase, promptVersion)).join("")}</div>`).join("")}
      </div>
    </div>
  `;
};

const retailTargetMatrix = (channels, months, rows) => {
  const values = rows.map((row) => Number(row.revenue_target_attainment || 0));
  const min = Math.min(...values, 0.9);
  const max = Math.max(...values, 1.07);
  const lerp = (start, end, t) => Math.round(start + (end - start) * t);
  const readinessColor = (value) => {
    const t = Math.max(0, Math.min(1, (Number(value || 0) - min) / Math.max(max - min, 0.01)));
    const stops = [{ p: 0, c: [13, 25, 40] }, { p: 0.58, c: [35, 105, 111] }, { p: 1, c: [36, 143, 103] }];
    const lower = t <= stops[1].p ? stops[0] : stops[1];
    const upper = t <= stops[1].p ? stops[1] : stops[2];
    const localT = (t - lower.p) / Math.max(upper.p - lower.p, 0.01);
    const color = lower.c.map((channelValue, index) => lerp(channelValue, upper.c[index], localT));
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };
  const copyText = ({
    pt: { low: "abaixo da meta", high: "meta batida", empty: "sem leitura", marginGap: "gap margem", target: "meta", realized: "realizado", min: "menor atingimento", max: "maior atingimento" },
    en: { low: "below target", high: "target met", empty: "no readout", marginGap: "margin gap", target: "target", realized: "realized", min: "lower attainment", max: "higher attainment" },
    es: { low: "debajo de meta", high: "meta cumplida", empty: "sin lectura", marginGap: "gap margen", target: "meta", realized: "realizado", min: "menor cumplimiento", max: "mayor cumplimiento" }
  })[state.lang] || {};
  const monthShort = (value) => String(value || "").split("-").pop() || value;
  const rowFor = (month, salesChannel) => rows.find((item) => item.target_month === month && item.sales_channel === salesChannel);
  const dataCell = (month, salesChannel) => {
    const row = rowFor(month, salesChannel);
    if (!row) return `<div class="ai-readiness-cell retail-target-cell is-empty"><b class="ai-readiness-version">${escapeHtml(label(salesChannel))}</b><strong>-</strong><span>${escapeHtml(copyText.empty)}</span></div>`;
    const attainment = Number(row.revenue_target_attainment || 0);
    const marginGap = Number(row.realized_margin_pct || 0) - Number(row.margin_target_pct || 0);
    const alert = attainment < 1 || marginGap < 0;
    const gapText = `${copyText.marginGap} ${formatNumber(marginGap * 100, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} p.p.`;
    return `<div class="ai-readiness-cell retail-target-cell ${alert ? "is-alert" : ""}" style="--cell-bg:${readinessColor(attainment)}"><b class="ai-readiness-version">${escapeHtml(label(salesChannel))}</b><strong>${escapeHtml(formatPercent(attainment))}</strong><span>${escapeHtml(attainment >= 1 ? copyText.high : copyText.low)} - ${escapeHtml(gapText)}</span><em>${escapeHtml(copyText.realized)} ${escapeHtml(formatMoney(row.realized_revenue))} / ${escapeHtml(copyText.target)} ${escapeHtml(formatMoney(row.revenue_target))}</em></div>`;
  };
  return `
    <div class="ai-readiness-matrix retail-target-matrix">
      <div class="ai-readiness-legend" aria-hidden="true"><span>${escapeHtml(copyText.min)}</span><i></i><span>${escapeHtml(copyText.max)}</span></div>
      <div class="ai-readiness-grid">
        <div class="ai-readiness-header" style="--matrix-cols:${channels.length}"><div class="ai-readiness-head-spacer" aria-hidden="true"></div>${channels.map((salesChannel) => `<div class="ai-readiness-head">${escapeHtml(label(salesChannel))}</div>`).join("")}</div>
        ${months.map((month) => `<div class="ai-readiness-row" style="--matrix-cols:${channels.length}"><div class="ai-readiness-label"><strong>${escapeHtml(monthShort(month))}</strong><span>${escapeHtml(term("month"))}</span></div>${channels.map((salesChannel) => dataCell(month, salesChannel)).join("")}</div>`).join("")}
      </div>
    </div>
  `;
};

const retailProductMarginBullets = (rows) => {
  const floor = 0.3;
  const maxMargin = Math.max(0.55, ...rows.map((row) => Number(row.gross_margin_pct || 0)));
  const clampPercent = (value) => Math.max(0, Math.min(100, (Number(value || 0) / maxMargin) * 100));
  const copyText = ({
    pt: { floor: "piso 30%", scale: "margem bruta", ok: "ok", review: "revisar", gap: "gap", units: "un." },
    en: { floor: "30% floor", scale: "gross margin", ok: "ok", review: "review", gap: "gap", units: "units" },
    es: { floor: "piso 30%", scale: "margen bruta", ok: "ok", review: "revisar", gap: "gap", units: "un." }
  })[state.lang] || {};
  const sorted = [...rows].sort((a, b) => {
    const alertDelta = Number(a.gross_margin_pct || 0) < floor === Number(b.gross_margin_pct || 0) < floor ? 0 : Number(b.gross_margin_pct || 0) < floor ? 1 : -1;
    return alertDelta || Number(b.net_revenue || 0) - Number(a.net_revenue || 0);
  }).slice(0, 8);
  return `
    <div class="dimension-bullet-chart retail-product-bullets" style="--target:${clampPercent(floor).toFixed(2)}%">
      <div class="dimension-bullet-axis retail-product-axis" aria-hidden="true"><span>0%</span><span></span><strong>${escapeHtml(copyText.floor)}</strong><span>${escapeHtml(formatPercent(maxMargin))}</span></div>
      ${sorted.map((row) => {
        const margin = Number(row.gross_margin_pct || 0);
        const gap = margin - floor;
        const alert = margin < floor;
        const note = alert
          ? `${copyText.review} / ${copyText.gap} ${formatNumber(gap * 100, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} p.p.`
          : `${copyText.ok} / ${formatInt(row.units_sold)} ${copyText.units}`;
        return `<article class="dimension-bullet-row retail-product-row ${alert ? "is-alert" : "is-ready"}" style="--score:${clampPercent(margin).toFixed(2)}%"><div class="dimension-bullet-meta"><strong>${escapeHtml(row.product_name)}</strong><span>${escapeHtml(label(row.category))} / ${escapeHtml(formatMoney(row.net_revenue))} / ${escapeHtml(formatInt(row.units_sold))} ${escapeHtml(copyText.units)}</span></div><div class="dimension-bullet-track"><i class="dimension-bullet-fill"></i><i class="dimension-bullet-target"></i></div><strong class="dimension-bullet-value">${escapeHtml(formatPercent(margin))}</strong><span class="retail-product-status">${escapeHtml(note)}</span></article>`;
      }).join("")}
      <span class="dimension-bullet-scale">${escapeHtml(copyText.scale)}</span>
    </div>
  `;
};

const cohortRetentionGrid = (rows) => {
  const weeks = [...new Set(rows.map((row) => Number(row.week_number)).filter((week) => week > 0))]
    .sort((a, b) => a - b);
  const months = [...new Set(rows.map((row) => row.signup_month))].sort();
  const values = rows.filter((row) => Number(row.week_number) > 0).map((row) => Number(row.retention_rate || 0));
  const max = Math.max(...values, 0.01);
  const peak = Math.max(...values, 0);
  const lerp = (start, end, t) => Math.round(start + (end - start) * t);
  const cohortColor = (value) => {
    const t = Math.max(0, Math.min(1, value / max));
    const stops = [
      { p: 0, c: [13, 25, 40] },
      { p: 0.52, c: [35, 105, 111] },
      { p: 1, c: [36, 143, 103] }
    ];
    const lower = t <= stops[1].p ? stops[0] : stops[1];
    const upper = t <= stops[1].p ? stops[1] : stops[2];
    const localT = (t - lower.p) / Math.max(upper.p - lower.p, 0.01);
    const color = lower.c.map((channel, index) => lerp(channel, upper.c[index], localT));
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  };
  const copy = ({
    pt: {
      low: "menor retenção",
      high: "maior retenção",
      cohortSize: "usuários",
      week: "Semana",
      unavailable: "sem janela",
      observed: "ativos / coorte"
    },
    en: {
      low: "lower retention",
      high: "higher retention",
      cohortSize: "users",
      week: "Week",
      unavailable: "not mature",
      observed: "active / cohort"
    },
    es: {
      low: "menor retención",
      high: "mayor retención",
      cohortSize: "usuarios",
      week: "Semana",
      unavailable: "sin ventana",
      observed: "activos / cohorte"
    }
  })[state.lang] || {};
  const rowFor = (month, week) => rows.find((item) => item.signup_month === month && Number(item.week_number) === Number(week));
  const cohortSize = (month) => rows.find((item) => item.signup_month === month)?.users_in_cohort || 0;
  return `
    <div class="cohort-legend">
      <span>${escapeHtml(copy.low)}</span>
      <i class="cohort-legend-bar" aria-hidden="true"></i>
      <span>${escapeHtml(copy.high)}</span>
    </div>
    <div class="cohort-matrix">
      <div class="cohort-row is-head" style="--cohort-cols:${weeks.length}">
        <div class="cohort-head-spacer" aria-hidden="true"></div>
        ${weeks.map((week) => `<div class="cohort-cell is-head">${escapeHtml(copy.week)} ${escapeHtml(week)}</div>`).join("")}
      </div>
      ${months.map((month) => `
        <div class="cohort-row" style="--cohort-cols:${weeks.length}">
          <div class="cohort-cell is-label">
            <strong>${escapeHtml(month)}</strong>
            <span>${escapeHtml(formatInt(cohortSize(month)))} ${escapeHtml(copy.cohortSize)}</span>
          </div>
          ${weeks.map((week) => {
            const row = rowFor(month, week);
            if (!row) {
              return `<div class="cohort-cell is-empty"><em>${escapeHtml(copy.unavailable)}</em></div>`;
            }
            const value = Number(row.retention_rate || 0);
            const isPeak = value === peak;
            return `
              <div class="cohort-cell ${isPeak ? "is-peak" : ""}" style="--cohort-bg:${cohortColor(value)}">
                <strong>${escapeHtml(formatPercent(value))}</strong>
                <span>${escapeHtml(formatInt(row.active_users))}/${escapeHtml(formatInt(row.users_in_cohort))} ${escapeHtml(copy.observed)}</span>
              </div>
            `;
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

const liquidityMapChart = (rows, config) => {
  const width = 920;
  const height = 420;
  const pad = { top: 74, right: 64, bottom: 88, left: 82 };
  const valuesX = rows.map((row) => Number(row.x || 0));
  const valuesY = rows.map((row) => Number(row.y || 0));
  const minX = Math.max(0, Math.min(...valuesX) - 5);
  const maxX = Math.max(...valuesX) + 5;
  const minY = Math.max(0, Math.min(...valuesY) - 0.08);
  const maxY = Math.min(1, Math.max(...valuesY) + 0.08);
  const maxSize = Math.max(...rows.map((row) => Number(row.size || 0)), 1);
  const sortedX = [...valuesX].sort((a, b) => a - b);
  const medianX = sortedX[Math.floor(sortedX.length / 2)] || 0;
  const targetY = config.targetY ?? 0.6;
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const x = (value) => pad.left + ((Number(value || 0) - minX) / Math.max(maxX - minX, 1)) * plotWidth;
  const y = (value) => pad.top + ((maxY - Number(value || 0)) / Math.max(maxY - minY, 0.01)) * plotHeight;
  const r = (value) => 11 + Math.sqrt(Number(value || 0) / maxSize) * 17;
  const axisTicks = [minX, medianX, maxX].map((value) => Math.round(value));
  const labelOffsets = {
    Games: { dx: -18, dy: -48, anchor: "middle" },
    Education: { dx: 0, dy: -50, anchor: "middle" },
    Sports: { dx: 58, dy: -28, anchor: "start" },
    Wellness: { dx: 58, dy: 36, anchor: "start" },
    Music: { dx: 0, dy: -48, anchor: "middle" }
  };
  const decisionCopy = ({
    pt: {
      scale: "Tamanho = reservas confirmadas",
      target: "meta 60%",
      median: "volume mediano",
      priority: "Priorizar escala",
      watch: "Alta intenção, revisar oferta",
      risk: "Baixa liquidez",
      bookings: "reservas"
    },
    en: {
      scale: "Size = confirmed bookings",
      target: "60% target",
      median: "median volume",
      priority: "Prioritize scale",
      watch: "High intent, review offer",
      risk: "Low liquidity",
      bookings: "bookings"
    },
    es: {
      scale: "Tamaño = reservas confirmadas",
      target: "meta 60%",
      median: "volumen mediano",
      priority: "Priorizar escala",
      watch: "Alta intención, revisar oferta",
      risk: "Baja liquidez",
      bookings: "reservas"
    }
  })[state.lang] || {};
  return `
    <svg class="liquidity-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(config.title || "")}">
      <rect class="zone" x="${x(medianX)}" y="${pad.top}" width="${width - pad.right - x(medianX)}" height="${Math.max(0, y(targetY) - pad.top)}"></rect>
      <rect class="zone-risk" x="${pad.left}" y="${y(targetY)}" width="${plotWidth}" height="${height - pad.bottom - y(targetY)}"></rect>
      <line class="grid" x1="${pad.left}" y1="${pad.top}" x2="${width - pad.right}" y2="${pad.top}"></line>
      <line class="grid" x1="${pad.left}" y1="${y(targetY)}" x2="${width - pad.right}" y2="${y(targetY)}"></line>
      <line class="grid" x1="${pad.left}" y1="${height - pad.bottom}" x2="${width - pad.right}" y2="${height - pad.bottom}"></line>
      <line class="axis" x1="${pad.left - 10}" y1="${height - pad.bottom}" x2="${width - pad.right + 10}" y2="${height - pad.bottom}"></line>
      <line class="axis" x1="${pad.left}" y1="${pad.top - 10}" x2="${pad.left}" y2="${height - pad.bottom + 10}"></line>
      <line class="target-line" x1="${pad.left}" y1="${y(targetY)}" x2="${width - pad.right}" y2="${y(targetY)}"></line>
      <line class="median-line" x1="${x(medianX)}" y1="${pad.top}" x2="${x(medianX)}" y2="${height - pad.bottom}"></line>
      <text class="zone-label" x="${x(medianX) + 14}" y="${pad.top + 22}">${escapeHtml(decisionCopy.priority)}</text>
      <text class="zone-label" x="${pad.left + 14}" y="${y(targetY) - 14}">${escapeHtml(decisionCopy.watch)}</text>
      <text class="zone-label" x="${pad.left + 14}" y="${height - pad.bottom - 22}">${escapeHtml(decisionCopy.risk)}</text>
      <text x="${width - pad.right}" y="${height - pad.bottom + 54}" text-anchor="end">${escapeHtml(config.xLabel)}</text>
      <text x="${pad.left}" y="${pad.top - 22}">${escapeHtml(config.yLabel)}</text>
      <g class="size-legend" transform="translate(${width - pad.right - 226}, 16)">
        <rect class="size-legend-bg" x="0" y="0" width="226" height="28" rx="14"></rect>
        <circle class="size-legend-ring" cx="23" cy="14" r="7"></circle>
        <text class="size-legend-text" x="40" y="18">${escapeHtml(decisionCopy.scale)}</text>
      </g>
      <text class="reference-label" x="${width - pad.right - 6}" y="${y(targetY) - 8}" text-anchor="end">${escapeHtml(decisionCopy.target)}</text>
      <text class="reference-label" x="${x(medianX) + 10}" y="${height - pad.bottom + 40}">${escapeHtml(decisionCopy.median)}</text>
      ${axisTicks.map((tick) => `
        <text class="axis-tick" x="${x(tick)}" y="${height - pad.bottom + 22}" text-anchor="middle">${escapeHtml(formatInt(tick))}</text>
      `).join("")}
      <text class="axis-tick" x="${pad.left - 12}" y="${y(targetY) + 4}" text-anchor="end">${escapeHtml(formatPercent(targetY))}</text>
      ${rows.map((row) => {
        const cx = x(row.x);
        const cy = y(row.y);
        const radius = r(row.size);
        const offset = labelOffsets[row.label] || { dx: 0, dy: -radius - 14, anchor: "middle" };
        const labelX = cx + offset.dx;
        const labelY = cy + offset.dy;
        const lineEndX = offset.anchor === "start" ? labelX - 9 : offset.anchor === "end" ? labelX + 9 : labelX;
        const lineEndY = offset.dy < 0 ? labelY + 9 : labelY - 9;
        const distance = Math.hypot(lineEndX - cx, lineEndY - cy) || 1;
        const lineStartX = cx + ((lineEndX - cx) / distance) * (radius + 2);
        const lineStartY = cy + ((lineEndY - cy) / distance) * (radius + 2);
        return `
          <g class="bubble-group">
            <circle class="bubble ${row.alert ? "is-alert" : ""}" cx="${cx}" cy="${cy}" r="${radius}"></circle>
            <line class="label-line" x1="${lineStartX}" y1="${lineStartY}" x2="${lineEndX}" y2="${lineEndY}"></line>
            <text class="bubble-label" x="${labelX}" y="${labelY}" text-anchor="${offset.anchor}">${escapeHtml(label(row.label))}</text>
            <text class="bubble-sub" x="${labelX}" y="${labelY + 15}" text-anchor="${offset.anchor}">${escapeHtml(formatPercent(row.y))} · ${escapeHtml(formatInt(row.size))} ${escapeHtml(decisionCopy.bookings)}</text>
          </g>
        `;
      }).join("")}
    </svg>
  `;
};

const pipelineCategoryImpactMapChart = (rows, config) => {
  const width = 920;
  const height = 420;
  const pad = { top: 74, right: 64, bottom: 88, left: 96 };
  const valuesX = rows.map((row) => Number(row.x || 0));
  const valuesY = rows.map((row) => Number(row.y || 0));
  const minX = Math.max(1, Math.min(...valuesX) * 0.78);
  const maxX = Math.max(...valuesX) * 1.06;
  const minY = Math.max(0, Math.min(...valuesY) - 0.08);
  const maxY = Math.min(0.7, Math.max(...valuesY) + 0.08);
  const maxSize = Math.max(...rows.map((row) => Number(row.size || 0)), 1);
  const sortedX = [...valuesX].sort((a, b) => a - b);
  const medianX = sortedX[Math.floor(sortedX.length / 2)] || 0;
  const targetY = config.targetY ?? 0.35;
  const plotWidth = width - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const logMinX = Math.log10(minX);
  const logMaxX = Math.log10(Math.max(maxX, minX + 1));
  const x = (value) => pad.left + ((Math.log10(Math.max(1, Number(value || 0))) - logMinX) / Math.max(logMaxX - logMinX, 0.001)) * plotWidth;
  const y = (value) => pad.top + ((maxY - Number(value || 0)) / Math.max(maxY - minY, 0.01)) * plotHeight;
  const r = (value) => 12 + Math.sqrt(Number(value || 0) / maxSize) * 18;
  const axisTicks = [minX, medianX, maxX];
  const labelOffsets = {
    Home: { dx: -8, dy: 58, anchor: "middle" },
    Accessories: { dx: 42, dy: -52, anchor: "start" },
    Furniture: { dx: 0, dy: -54, anchor: "middle" },
    Electronics: { dx: -22, dy: -74, anchor: "middle" }
  };
  const decisionCopy = ({
    pt: {
      scale: "Tamanho = unidades vendidas",
      target: "piso 35%",
      median: "receita mediana",
      priority: "Escalar com margem",
      watch: "Alta receita, proteger margem",
      risk: "Baixo impacto ou margem",
      units: "unid."
    },
    en: {
      scale: "Size = units sold",
      target: "35% floor",
      median: "median revenue",
      priority: "Scale with margin",
      watch: "High revenue, protect margin",
      risk: "Low impact or margin",
      units: "units"
    },
    es: {
      scale: "Tamaño = unidades vendidas",
      target: "piso 35%",
      median: "ingreso mediano",
      priority: "Escalar con margen",
      watch: "Alto ingreso, proteger margen",
      risk: "Bajo impacto o margen",
      units: "unid."
    }
  })[state.lang] || {};
  return `
    <svg class="liquidity-chart pipeline-impact-map" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(config.title || "")}">
      <rect class="zone" x="${x(medianX)}" y="${pad.top}" width="${width - pad.right - x(medianX)}" height="${Math.max(0, y(targetY) - pad.top)}"></rect>
      <rect class="zone-risk" x="${pad.left}" y="${y(targetY)}" width="${plotWidth}" height="${height - pad.bottom - y(targetY)}"></rect>
      <line class="grid" x1="${pad.left}" y1="${pad.top}" x2="${width - pad.right}" y2="${pad.top}"></line>
      <line class="grid" x1="${pad.left}" y1="${y(targetY)}" x2="${width - pad.right}" y2="${y(targetY)}"></line>
      <line class="grid" x1="${pad.left}" y1="${height - pad.bottom}" x2="${width - pad.right}" y2="${height - pad.bottom}"></line>
      <line class="axis" x1="${pad.left - 10}" y1="${height - pad.bottom}" x2="${width - pad.right + 10}" y2="${height - pad.bottom}"></line>
      <line class="axis" x1="${pad.left}" y1="${pad.top - 10}" x2="${pad.left}" y2="${height - pad.bottom + 10}"></line>
      <line class="target-line" x1="${pad.left}" y1="${y(targetY)}" x2="${width - pad.right}" y2="${y(targetY)}"></line>
      <line class="median-line" x1="${x(medianX)}" y1="${pad.top}" x2="${x(medianX)}" y2="${height - pad.bottom}"></line>
      <text class="zone-label" x="${x(medianX) + 14}" y="${pad.top + 22}">${escapeHtml(decisionCopy.priority)}</text>
      <text class="zone-label" x="${pad.left + 14}" y="${y(targetY) - 14}">${escapeHtml(decisionCopy.watch)}</text>
      <text class="zone-label" x="${pad.left + 14}" y="${height - pad.bottom - 22}">${escapeHtml(decisionCopy.risk)}</text>
      <text x="${width - pad.right}" y="${height - pad.bottom + 54}" text-anchor="end">${escapeHtml(config.xLabel)}</text>
      <text x="${pad.left}" y="${pad.top - 22}">${escapeHtml(config.yLabel)}</text>
      <g class="size-legend" transform="translate(${width - pad.right - 226}, 16)">
        <rect class="size-legend-bg" x="0" y="0" width="226" height="28" rx="14"></rect>
        <circle class="size-legend-ring" cx="23" cy="14" r="7"></circle>
        <text class="size-legend-text" x="40" y="18">${escapeHtml(decisionCopy.scale)}</text>
      </g>
      <text class="reference-label" x="${(pad.left + plotWidth * 0.58).toFixed(1)}" y="${y(targetY) - 8}" text-anchor="middle">${escapeHtml(decisionCopy.target)}</text>
      <text class="reference-label" x="${x(medianX) + 10}" y="${height - pad.bottom + 40}">${escapeHtml(decisionCopy.median)}</text>
      ${axisTicks.map((tick) => `
        <text class="axis-tick" x="${x(tick)}" y="${height - pad.bottom + 22}" text-anchor="middle">${escapeHtml(formatMoney(tick))}</text>
      `).join("")}
      <text class="axis-tick" x="${pad.left - 12}" y="${y(targetY) + 4}" text-anchor="end">${escapeHtml(formatPercent(targetY))}</text>
      ${rows.map((row) => {
        const cx = x(row.x);
        const cy = y(row.y);
        const radius = r(row.size);
        const offset = labelOffsets[row.label] || { dx: 0, dy: -radius - 14, anchor: "middle" };
        const labelX = cx + offset.dx;
        const labelY = cy + offset.dy;
        const lineEndX = offset.anchor === "start" ? labelX - 9 : offset.anchor === "end" ? labelX + 9 : labelX;
        const lineEndY = offset.dy < 0 ? labelY + 9 : labelY - 9;
        const distance = Math.hypot(lineEndX - cx, lineEndY - cy) || 1;
        const lineStartX = cx + ((lineEndX - cx) / distance) * (radius + 2);
        const lineStartY = cy + ((lineEndY - cy) / distance) * (radius + 2);
        return `
          <g class="bubble-group">
            <circle class="bubble ${row.alert ? "is-alert" : ""}" cx="${cx}" cy="${cy}" r="${radius}"></circle>
            <line class="label-line" x1="${lineStartX}" y1="${lineStartY}" x2="${lineEndX}" y2="${lineEndY}"></line>
            <text class="bubble-label" x="${labelX}" y="${labelY}" text-anchor="${offset.anchor}">${escapeHtml(label(row.label))}</text>
            <text class="bubble-sub" x="${labelX}" y="${labelY + 15}" text-anchor="${offset.anchor}">${escapeHtml(formatPercent(row.y))} · ${escapeHtml(formatInt(row.size))} ${escapeHtml(decisionCopy.units)}</text>
          </g>
        `;
      }).join("")}
    </svg>
  `;
};

const renderPlayzone = (data) => {
  const channel = selected("channel", unique(data.funnel_by_channel, "acquisition_channel"));
  const category = selected("category", unique(data.marketplace_category_metrics, "category"));
  const funnel = channel === "all" ? data.ordered_funnel : data.funnel_by_channel.filter((row) => row.acquisition_channel === channel);
  const firstStep = funnel[0] || {};
  const finalStep = funnel[funnel.length - 1];
  const opportunityStep = funnel.find((row) => Number(row.step_order) === 5) || {};
  const inviteStep = funnel.find((row) => Number(row.step_order) === 6) || {};
  const activationRate = Number(finalStep.conversion_from_start || 0);
  const inviteLossRate = Number(opportunityStep.users_at_step || 0) ? 1 - (Number(inviteStep.users_at_step || 0) / Number(opportunityStep.users_at_step || 1)) : 0;
  const confirmationRate = Number(inviteStep.users_at_step || 0) ? Number(finalStep.users_at_step || 0) / Number(inviteStep.users_at_step || 1) : 0;
  const activatedRetention = data.retention_by_activation[0] || {};
  const retainedD30Users = Math.round(Number(activatedRetention.users || 0) * Number(activatedRetention.retention_d30 || 0));
  const diagnosticCopy = ({
    pt: {
      principalLoss: "principal perda",
      usersReachedValue: "usuários chegaram ao valor",
      didNotReachInvite: "não chegaram ao convite",
      afterInvite: "reservas depois do convite",
      retainedActivated: "ativados retidos em D30"
    },
    en: {
      principalLoss: "main loss",
      usersReachedValue: "users reached value",
      didNotReachInvite: "did not reach invitation",
      afterInvite: "bookings after invitation",
      retainedActivated: "activated users retained at D30"
    },
    es: {
      principalLoss: "principal pérdida",
      usersReachedValue: "usuarios llegaron al valor",
      didNotReachInvite: "no llegaron a la invitación",
      afterInvite: "reservas después de la invitación",
      retainedActivated: "activados retenidos en D30"
    }
  })[state.lang] || {};
  const categoryRows = data.marketplace_category_metrics.filter((row) => category === "all" || row.category === category);
  const channelRows = unique(data.funnel_by_channel, "acquisition_channel").map((name) => {
    const row = data.funnel_by_channel.find((item) => item.acquisition_channel === name && Number(item.step_order) === 7);
    return { label: name, value: row?.conversion_from_start || 0, muted: channel !== "all" && channel !== name };
  }).sort((a, b) => b.value - a.value);
  const chapters = playzoneStages();
  const decision = ({
    pt: {
      kicker: "Decisão",
      summary: "Aumentar aquisição agora ampliaria o gargalo; primeiro é preciso elevar a chegada ao convite.",
      items: [
        {
          kind: "action",
          title: "Intervir antes do convite",
          body: "Reduzir a perda entre oportunidade vista e convite enviado antes de escalar aquisição."
        },
        {
          kind: "hypothesis",
          title: "Fricção provável",
          body: "O usuário vê valor, mas ainda precisa de clareza, preço, disponibilidade ou prova social para agir."
        },
        {
          kind: "guardrail",
          title: "Guardrails do experimento",
          body: "Acompanhar invitation_rate, activation_rate, confirmation_rate e retenção D30."
        }
      ]
    },
    en: {
      kicker: "Decision",
      summary: "Scaling acquisition now would amplify the bottleneck; first, more users need to reach the invitation step.",
      items: [
        {
          kind: "action",
          title: "Intervene before invitation",
          body: "Reduce the loss between opportunity viewed and invitation sent before scaling acquisition."
        },
        {
          kind: "hypothesis",
          title: "Likely friction",
          body: "The user sees value, but still needs clarity, price, availability, or social proof to act."
        },
        {
          kind: "guardrail",
          title: "Experiment guardrails",
          body: "Track invitation_rate, activation_rate, confirmation_rate, and D30 retention."
        }
      ]
    },
    es: {
      kicker: "Decisión",
      summary: "Escalar adquisición ahora ampliaría el cuello de botella; primero hay que llevar más usuarios a la invitación.",
      items: [
        {
          kind: "action",
          title: "Intervenir antes de la invitación",
          body: "Reducir la pérdida entre oportunidad vista e invitación enviada antes de escalar adquisición."
        },
        {
          kind: "hypothesis",
          title: "Fricción probable",
          body: "El usuario ve valor, pero aún necesita claridad, precio, disponibilidad o prueba social para actuar."
        },
        {
          kind: "guardrail",
          title: "Guardrails del experimento",
          body: "Monitorear invitation_rate, activation_rate, confirmation_rate y retención D30."
        }
      ]
    }
  })[state.lang];

  return `
    ${processChapter(chapters[0])}
    ${technicalJourney(chapters[0])}
    ${dashboardMarker(chapters[0].resultTitle, ["channel"])}
    ${diagnosticKpiGrid([
      {
        label: term("activation"),
        value: formatPercent(activationRate),
        note: `${formatInt(finalStep.users_at_step)} ${term("usersAtValue")}`,
        evidence: `${formatInt(finalStep.users_at_step)} / ${formatInt(firstStep.users_at_step)} ${diagnosticCopy.usersReachedValue}`,
        progress: activationRate
      },
      {
        label: term("invitationBottleneck"),
        value: formatPercent(inviteLossRate),
        note: copy().charts.orderedFunnelSub,
        evidence: `${formatInt(Number(opportunityStep.users_at_step || 0) - Number(inviteStep.users_at_step || 0))} / ${formatInt(opportunityStep.users_at_step)} ${diagnosticCopy.didNotReachInvite}`,
        progress: inviteLossRate,
        alert: true,
        badge: diagnosticCopy.principalLoss
      },
      {
        label: term("confirmation"),
        value: formatPercent(confirmationRate),
        note: term("afterInvitation"),
        evidence: `${formatInt(finalStep.users_at_step)} / ${formatInt(inviteStep.users_at_step)} ${diagnosticCopy.afterInvite}`,
        progress: confirmationRate
      },
      {
        label: term("d30Retention"),
        value: formatPercent(activatedRetention.retention_d30),
        note: label(activatedRetention.activation_status),
        evidence: `${formatInt(retainedD30Users)} / ${formatInt(activatedRetention.users)} ${diagnosticCopy.retainedActivated}`,
        progress: Number(activatedRetention.retention_d30 || 0)
      }
    ])}
    ${resultReadout(chapters[0])}
    ${processChapter(chapters[1])}
    ${technicalJourney(chapters[1])}
    ${dashboardMarker(chapters[1].resultTitle, ["channel"])}
    <div class="viz-grid funnel-grid">
      ${vizCard(copy().charts.orderedFunnel, copy().charts.orderedFunnelSub, bars(funnel.map((row) => ({
        label: row.step_label,
        value: row.conversion_from_start,
        alert: Number(row.step_order) === 6
      })), { max: 1, format: (value) => formatPercent(value) }), false, channel === "all" ? copy().all : channel)}
      ${vizCard(copy().charts.activationByChannel, term("confirmedPerOpen"), bars(channelRows, { max: 0.12, format: (value) => formatPercent(value) }))}
    </div>
    ${resultReadout(chapters[1])}
    ${processChapter(chapters[2])}
    ${technicalJourney(chapters[2])}
    ${dashboardMarker(chapters[2].resultTitle, ["category"])}
    <div class="viz-grid retention-grid">
      ${vizCard(copy().charts.retention, term("retentionWindows"), retentionActivationComparison(data.retention_by_activation))}
      ${vizCard(copy().charts.liquidityMap, `${term("opportunities")} x ${term("confirmationRate")}`, liquidityKpiStrip(categoryRows) + liquidityMapChart(categoryRows.map((row) => ({
        label: row.category,
        x: row.opportunities,
        y: row.confirmation_rate,
        size: row.confirmed_bookings,
        alert: row.confirmation_rate < 0.55
      })), { xLabel: term("opportunities"), yLabel: term("confirmationRate"), title: copy().charts.liquidityMap, targetY: 0.6 }))}
      ${vizCard(copy().charts.cohortHeatmap, `${term("cohort")} x ${term("week")}`, cohortRetentionGrid(data.cohort_retention), true)}
      <article class="table-card is-wide liquidity-table-card">
        ${cardHead(copy().charts.categoryLiquidity, term("invitationsBookingsTime"))}
        ${liquidityCategoryTable(categoryRows)}
      </article>
    </div>
    ${resultReadout(chapters[2])}
    ${processChapter(chapters[3])}
    ${technicalJourney(chapters[3])}
    ${dashboardMarker(chapters[3].resultTitle, ["channel", "category"])}
    ${decisionGrid(decision)}
    ${resultReadout(chapters[3])}
  `;
};

const renderAiQuality = (data) => {
  const versions = unique(data.prompt_version_performance, "prompt_version");
  const useCases = unique(data.quality_by_use_case, "use_case");
  const result = selected("result", aiResultOptions());
  const version = selected("version", versions);
  const useCase = selected("useCase", useCases);
  const severity = selected("severity", unique(data.issue_distribution, "severity"));
  const issue = selected("issue", unique(data.issue_distribution, "issue_type"));
  const versionRows = data.prompt_version_performance.filter((row) => (version === "all" || row.prompt_version === version) && aiResultMatches(row, result, data));
  const base = summarizeAiRows(versionRows, version === "all" ? data.kpi_summary[0] : data.prompt_version_performance.find((row) => row.prompt_version === version) || data.kpi_summary[0]);
  const rawBacklog = data.improvement_backlog.filter((row) => (version === "all" || row.prompt_version === version) && (useCase === "all" || row.use_case === useCase));
  const rawQualityRows = data.quality_by_use_case.filter((row) => useCase === "all" || row.use_case === useCase);
  const rawIssueRows = data.issue_distribution.filter((row) => (severity === "all" || row.severity === severity) && (issue === "all" || row.issue_type === issue));
  const backlog = rawBacklog.filter((row) => aiResultMatches(row, result, data));
  const qualityRows = rawQualityRows.filter((row) => aiResultMatches(row, result, data));
  const issueRows = rawIssueRows.filter((row) => aiResultMatches(row, result, data));
  const displayBacklog = backlog.length ? backlog : rawBacklog;
  const displayQualityRows = qualityRows.length ? qualityRows : rawQualityRows;
  const displayIssueRows = issueRows.length ? issueRows : rawIssueRows;
  const matrixUseCases = unique(displayBacklog, "use_case").length ? unique(displayBacklog, "use_case") : useCases;
  const matrixVersions = unique(displayBacklog, "prompt_version").length ? unique(displayBacklog, "prompt_version") : versions;
  const chapters = journeyCopy();
  const stageTitles = ({
    pt: ["Gate inicial de release", "Prontidão, qualidade e tendência", "Matriz, falhas e backlog", "Decisão de release"],
    en: ["Initial release gate", "Readiness, quality and trend", "Matrix, issues and backlog", "Release decision"],
    es: ["Gate inicial de release", "Preparación, calidad y tendencia", "Matriz, fallas y backlog", "Decisión de release"]
  })[state.lang] || {};
  const decision = ({
    pt: {
      kicker: "Decisão",
      summary: "Release só avança quando versão, caso de uso e severidade passam juntos pelo gate.",
      items: [
        { kind: "action", title: "Baseline", body: "Usar v3 como ponto de partida, mas sem tratar a versão como aprovação geral." },
        { kind: "hypothesis", title: "Correção", body: "Atacar contexto, completude e actionability onde a matriz concentra não aprovadas." },
        { kind: "guardrail", title: "Guardrail", body: "Manter bloqueio para severidade alta e acompanhar score, prontidão e retrabalho por caso de uso." }
      ]
    },
    en: {
      kicker: "Decision",
      summary: "Release only moves forward when version, use case and severity pass the gate together.",
      items: [
        { kind: "action", title: "Baseline", body: "Use v3 as the starting point, but not as global approval." },
        { kind: "hypothesis", title: "Correction", body: "Address context, completeness and actionability where the matrix concentrates not-approved responses." },
        { kind: "guardrail", title: "Guardrail", body: "Keep high severity blocked and track score, readiness and rework by use case." }
      ]
    },
    es: {
      kicker: "Decisión",
      summary: "El release solo avanza cuando versión, caso de uso y severidad pasan juntos por el gate.",
      items: [
        { kind: "action", title: "Baseline", body: "Usar v3 como punto de partida, pero no como aprobación general." },
        { kind: "hypothesis", title: "Corrección", body: "Atacar contexto, completitud y accionabilidad donde la matriz concentra no aprobadas." },
        { kind: "guardrail", title: "Guardrail", body: "Mantener bloqueada la severidad alta y monitorear score, preparación y retrabajo por caso de uso." }
      ]
    }
  })[state.lang];
  return `
    ${processChapter(chapters[0])}
    ${methodBlock(chapters[0])}
    ${dashboardMarker(stageTitles[0], ["result", "version"])}
    ${kpiGrid([
      { label: term("releaseReady"), value: formatPercent(base.release_ready_rate), note: version === "all" ? term("allPromptVersions") : version },
      { label: term("qualityScore"), value: formatNumber(base.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), note: term("scaleOneToFive") },
      { label: term("criticalIssueRate"), value: formatPercent(base.critical_issue_rate), note: term("operationalRisk"), alert: base.critical_issue_rate > 0.1 },
      { label: term("reviewed"), value: formatInt(base.reviewed_responses), note: term("responsesEvaluated") }
    ])}
    ${aiQualityResultReadout(data, { result, base, versionRows, qualityRows: displayQualityRows, backlog: displayBacklog, issueRows: displayIssueRows }, 0)}
    ${processChapter(chapters[1])}
    ${methodBlock(chapters[1])}
    ${dashboardMarker(stageTitles[1], ["result", "version", "useCase"])}
    <div class="viz-grid">
      ${vizCard(copy().charts.promptVersion, term("readyRateByVersion"), bars((versionRows.length ? versionRows : data.prompt_version_performance).map((row) => ({
        label: row.prompt_version,
        value: row.release_ready_rate,
        muted: version !== "all" && version !== row.prompt_version
      })), { max: 0.7, format: (value) => formatPercent(value) }))}
      ${vizCard(copy().charts.useCaseQuality, term("avgScoreByUseCase"), bars(displayQualityRows.map((row) => ({
        label: row.use_case,
        value: row.avg_quality_score
      })).sort((a, b) => b.value - a.value), { max: 5, format: (value) => formatNumber(value, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }))}
      ${vizCard(copy().charts.qualityTrend, term("monthlyTrend"), qualityTrendChart(data.monthly_quality_trend), true)}
    </div>
    ${aiQualityResultReadout(data, { result, base, versionRows, qualityRows: displayQualityRows, backlog: displayBacklog, issueRows: displayIssueRows }, 1)}
    ${processChapter(chapters[2])}
    ${methodBlock(chapters[2])}
    ${dashboardMarker(stageTitles[2], ["result", "version", "useCase", "severity", "issue"])}
    <div class="viz-grid">
      ${vizCard(copy().charts.releaseMatrix, `${term("version")} x ${term("useCase")}`, aiReadinessMatrix(matrixUseCases, matrixVersions, displayBacklog.length ? displayBacklog : data.improvement_backlog), true)}
      ${vizCard(copy().charts.dimensions, term("avgDimensionScore"), dimensionScoreChart(data.dimension_scores), true)}
      ${tableCard(copy().charts.issues, term("issueShareBySeverity"), [term("issue"), term("severity"), term("count"), term("share")], displayIssueRows.slice(0, 8).map((row) => [
        row.issue_type,
        row.severity,
        formatInt(row.occurrences),
        formatPercent(row.share_of_reviews)
      ]), false, "1.4fr 0.8fr 0.7fr 0.7fr", "case-table-card")}
      ${tableCard(copy().charts.backlog, version === "all" ? term("topBacklog") : `${term("filteredBy")} ${version}`, [term("useCase"), term("version"), term("notApproved"), term("releaseReady")], displayBacklog.slice(0, 8).map((row) => [
        row.use_case,
        row.prompt_version,
        formatInt(row.not_approved_cases),
        formatPercent(row.release_ready_rate)
      ]), false, "1.5fr 0.7fr 0.8fr 0.8fr", "case-table-card")}
    </div>
    ${aiQualityResultReadout(data, { result, base, versionRows, qualityRows: displayQualityRows, backlog: displayBacklog, issueRows: displayIssueRows }, 2)}
    ${processChapter(chapters[3])}
    ${methodBlock(chapters[3])}
    ${dashboardMarker(stageTitles[3], ["result", "version", "useCase"])}
    ${decisionGrid(decision)}
    ${aiQualityResultReadout(data, { result, base, versionRows, qualityRows: displayQualityRows, backlog: displayBacklog, issueRows: displayIssueRows }, 3)}
  `;
};

const renderPipeline = (data) => {
  const severities = unique(data.failed_rules, "severity");
  const sources = unique(data.source_quality, "source_system");
  const categories = unique(data.category_metrics, "category");
  const severity = selected("severity", severities);
  const source = selected("source", sources);
  const issue = selected("issue", pipelineIssueGroups());
  const category = selected("category", categories);
  const rules = data.failed_rules.filter((row) => (severity === "all" || row.severity === severity) && (issue === "all" || pipelineIssueGroup(row.rule_name) === issue));
  const sourceQuality = data.source_quality.filter((row) => source === "all" || row.source_system === source);
  const readyRevenue = data.revenue_ready.filter((row) => source === "all" || row.source_system === source);
  const reviewRecords = data.review_records.filter((row) => (source === "all" || row.source_system === source) && (issue === "all" || pipelineIssueGroup(row.issue_summary) === issue));
  const categoryRows = data.category_metrics.filter((row) => category === "all" || row.category === category);
  const rawOrders = sourceQuality.reduce((sum, row) => sum + Number(row.orders || 0), 0);
  const readyOrders = sourceQuality.reduce((sum, row) => sum + Number(row.ready_orders || 0), 0);
  const criticalFailures = rules.filter((row) => row.severity === "Critical").reduce((sum, row) => sum + Number(row.failed_records || 0), 0);
  const scopedQualityScore = 1 - (criticalFailures / Math.max(1, rawOrders || data.kpis.raw_orders));
  const pipelineContext = { severity, source, issue, category, rules, sourceQuality, readyRevenue, reviewRecords, categoryRows, rawOrders, readyOrders, criticalFailures, scopedQualityScore };
  const chapters = journeyCopy();
  const stageTitles = ({
    pt: ["Gate inicial de publicação", "Regras, origem e severidade", "Filas Ready e Review", "Impacto por categoria"],
    en: ["Initial publication gate", "Rules, source and severity", "Ready and Review queues", "Category impact"],
    es: ["Gate inicial de publicación", "Reglas, origen y severidad", "Filas Ready y Review", "Impacto por categoría"]
  })[state.lang] || {};
  return `
    ${processChapter(chapters[0])}
    ${methodBlock(chapters[0])}
    ${dashboardMarker(stageTitles[0], ["severity", "issue"])}
    ${kpiGrid([
      { label: term("qualityScoreShort"), value: formatPercent(scopedQualityScore), note: term("highAverage") },
      { label: term("criticalFailures"), value: formatInt(criticalFailures), note: term("blockingPublication"), alert: criticalFailures > 0 },
      { label: term("readyOrders"), value: formatInt(readyOrders), note: `${formatInt(rawOrders || data.kpis.raw_orders)} ${term("rawOrders")}` },
      { label: term("reviewOrders"), value: formatInt(reviewRecords.length), note: term("needCorrection"), alert: reviewRecords.length > 0 }
    ])}
    ${pipelineResultReadout(data, pipelineContext, 0)}
    ${processChapter(chapters[1])}
    ${methodBlock(chapters[1])}
    ${dashboardMarker(stageTitles[1], ["source", "severity", "issue"])}
    <div class="viz-grid pipeline-rules-grid">
      ${vizCard(copy().charts.failedRules, severity === "all" ? term("criticalWarningRules") : severity, bars(rules.map((row) => ({
        label: row.rule_name,
        value: row.failed_records,
        alert: row.severity === "Critical"
      })), { format: (value) => formatInt(value) }))}
      ${vizCard(copy().charts.sourceReadiness, source === "all" ? term("allSources") : source, bars(sourceQuality.map((row) => ({
        label: row.source_system,
        value: row.ready_rate
      })), { max: 1, format: (value) => formatPercent(value) }))}
    </div>
    ${pipelineResultReadout(data, pipelineContext, 1)}
    ${processChapter(chapters[2])}
    ${methodBlock(chapters[2])}
    ${dashboardMarker(stageTitles[2], ["source", "issue"])}
    <div class="viz-grid pipeline-tables-grid">
      ${tableCard(copy().charts.readyRevenue, term("completedCaptured"), [term("source"), term("orders"), term("orderTotal"), term("captured")], readyRevenue.map((row) => [
        row.source_system,
        formatInt(row.completed_orders),
        formatMoney(row.order_total),
        formatMoney(row.captured_payment_amount)
      ]), false, "1fr 0.7fr 1fr 1fr", "case-table-card")}
      ${tableCard(copy().charts.reviewQueue, term("blockedRecords"), [term("order"), term("source"), term("total"), term("issue")], reviewRecords.map((row) => [
        row.order_id,
        row.source_system,
        formatMoney(row.order_total),
        row.issue_summary
      ]), false, "0.7fr 0.8fr 0.8fr 1.7fr", "case-table-card")}
    </div>
    ${pipelineResultReadout(data, pipelineContext, 2)}
    ${dashboardMarker(stageTitles[3], ["category"])}
    <div class="viz-grid">
      ${vizCard(copy().charts.categoryImpact, category === "all" ? `${term("revenue")} x ${term("margin")}` : label(category), pipelineCategoryImpactKpiStrip(categoryRows) + pipelineCategoryImpactMapChart(categoryRows.map((row) => ({
        label: row.category,
        x: row.net_revenue,
        y: row.gross_margin / Math.max(1, row.net_revenue),
        size: row.units,
        alert: row.gross_margin / Math.max(1, row.net_revenue) < 0.35
      })), { xLabel: term("revenue"), yLabel: term("margin"), title: copy().charts.categoryImpact, targetY: 0.35 }), true)}
    </div>
    ${pipelineResultReadout(data, pipelineContext, 3)}
    ${processChapter(chapters[3])}
    ${methodBlock(chapters[3])}
  `;
};

const retailResultReadout = (data, context, stage = 0) => {
  const channelLabel = context.channel === "all" ? term("allChannels") : label(context.channel);
  const categoryLabel = context.category === "all" ? term("allCategories") : label(context.category);
  const monthLabel = context.month === "all" ? copy().all : context.month;
  const marginStatusLabel = context.marginStatus === "all" ? copy().all : label(context.marginStatus);
  const targetStatusLabel = context.targetStatus === "all" ? copy().all : label(context.targetStatus);
  const channelBase = context.channelBase || data.kpis || {};
  const trendRows = context.trendRows || [];
  const channelRows = context.channelRows || [];
  const categoryRows = context.categoryRows || [];
  const productRows = context.productRows || [];
  const targetRows = context.targetRows || [];
  const sortedTrend = [...trendRows].sort((a, b) => String(a.order_month || "").localeCompare(String(b.order_month || "")));
  const latestMonth = sortedTrend.at(-1) || {};
  const bestMonth = [...trendRows].sort((a, b) => Number(b.net_revenue || 0) - Number(a.net_revenue || 0))[0] || {};
  const topChannel = [...channelRows].sort((a, b) => Number(b.net_revenue || 0) - Number(a.net_revenue || 0))[0] || {};
  const weakestCategory = [...categoryRows].sort((a, b) => Number(a.gross_margin_pct || 0) - Number(b.gross_margin_pct || 0))[0] || {};
  const alertCategoryCount = categoryRows.filter((row) => Number(row.gross_margin_pct || 0) < 0.3).length;
  const belowTargetCount = targetRows.filter((row) => Number(row.revenue_target_attainment || 0) < 1).length;
  const metTargetCount = targetRows.filter((row) => Number(row.revenue_target_attainment || 0) >= 1).length;
  const weakestTarget = [...targetRows].sort((a, b) => Number(a.revenue_target_attainment || 0) - Number(b.revenue_target_attainment || 0))[0] || {};
  const bestTarget = [...targetRows].sort((a, b) => Number(b.revenue_target_attainment || 0) - Number(a.revenue_target_attainment || 0))[0] || {};
  const topProduct = [...productRows].sort((a, b) => Number(b.net_revenue || 0) - Number(a.net_revenue || 0))[0] || {};
  const weakestProduct = [...productRows].sort((a, b) => Number(a.gross_margin_pct || 0) - Number(b.gross_margin_pct || 0))[0] || {};
  const alertProductCount = productRows.filter((row) => Number(row.gross_margin_pct || 0) < 0.3).length;
  const targetGap = Number(weakestTarget.realized_revenue || 0) - Number(weakestTarget.revenue_target || 0);
  const stageTexts = {
    pt: [
      [
        `No recorte ${channelLabel}, a leitura executiva mostra ${formatMoney(channelBase.net_revenue)} em receita líquida, ${formatPercent(channelBase.gross_margin_pct)} de margem e ${formatInt(channelBase.delivered_orders)} pedidos entregues.`,
        `O ticket médio fica em ${formatMoney(channelBase.average_ticket || data.kpis.average_ticket)}; ele ajuda a separar crescimento real de simples aumento de volume.`,
        `A leitura aqui é o ponto de partida: se a margem estiver perto do piso, a receita precisa ser explicada por canal, categoria e produto antes de virar recomendação.`
      ],
      [
        `Com mês ${monthLabel}, categoria ${categoryLabel} e status de margem ${marginStatusLabel}, o maior mês do recorte é ${bestMonth.order_month || "-"}, com ${formatMoney(bestMonth.net_revenue || 0)} líquidos.`,
        `${topChannel.sales_channel || "-"} concentra a maior receita por canal no recorte, com ${formatMoney(topChannel.net_revenue || 0)} e margem de ${formatPercent(topChannel.gross_margin_pct || 0)}.`,
        `Entre as categorias filtradas, ${weakestCategory.category || "-"} é a mais sensível em margem: ${formatPercent(weakestCategory.gross_margin_pct || 0)}. Há ${formatInt(alertCategoryCount)} categoria(s) abaixo do piso de 30%.`
      ],
      [
        `Com status de meta ${targetStatusLabel}, a matriz mostra ${formatInt(metTargetCount)} leitura(s) com meta batida e ${formatInt(belowTargetCount)} abaixo da meta no recorte atual.`,
        `O ponto mais frágil de meta é ${weakestTarget.sales_channel || "-"} em ${weakestTarget.target_month || "-"}: ${formatPercent(weakestTarget.revenue_target_attainment || 0)} de atingimento e gap de ${formatMoney(targetGap)}.`,
        `Nos produtos filtrados, ${topProduct.product_name || "-"} explica a maior receita (${formatMoney(topProduct.net_revenue || 0)}), enquanto ${weakestProduct.product_name || "-"} pressiona margem em ${formatPercent(weakestProduct.gross_margin_pct || 0)}. Há ${formatInt(alertProductCount)} produto(s) abaixo do piso.`
      ],
      [
        `A decisão combina três sinais: receita por canal, margem por categoria/produto e atingimento de meta por mês.`,
        `O melhor sinal de meta no recorte é ${bestTarget.sales_channel || "-"} em ${bestTarget.target_month || "-"}, com ${formatPercent(bestTarget.revenue_target_attainment || 0)} de atingimento.`,
        `A recomendação é proteger primeiro os itens abaixo do piso e só depois escalar o que já combina receita, margem e meta.`
      ]
    ],
    en: [
      [
        `For ${channelLabel}, the executive readout shows ${formatMoney(channelBase.net_revenue)} in net revenue, ${formatPercent(channelBase.gross_margin_pct)} margin and ${formatInt(channelBase.delivered_orders)} delivered orders.`,
        `Average ticket is ${formatMoney(channelBase.average_ticket || data.kpis.average_ticket)}; it separates real growth from simple volume expansion.`,
        `This is the starting point: if margin is close to the floor, revenue needs to be explained by channel, category and product before becoming a recommendation.`
      ],
      [
        `With month ${monthLabel}, category ${categoryLabel} and margin status ${marginStatusLabel}, the largest month in the slice is ${bestMonth.order_month || "-"}, with ${formatMoney(bestMonth.net_revenue || 0)} net.`,
        `${topChannel.sales_channel || "-"} concentrates the largest channel revenue in the slice, with ${formatMoney(topChannel.net_revenue || 0)} and ${formatPercent(topChannel.gross_margin_pct || 0)} margin.`,
        `Among filtered categories, ${weakestCategory.category || "-"} is the most margin-sensitive: ${formatPercent(weakestCategory.gross_margin_pct || 0)}. There are ${formatInt(alertCategoryCount)} category/categories below the 30% floor.`
      ],
      [
        `With target status ${targetStatusLabel}, the matrix shows ${formatInt(metTargetCount)} readout(s) with target met and ${formatInt(belowTargetCount)} below target in the current slice.`,
        `The weakest target point is ${weakestTarget.sales_channel || "-"} in ${weakestTarget.target_month || "-"}: ${formatPercent(weakestTarget.revenue_target_attainment || 0)} attainment and a ${formatMoney(targetGap)} gap.`,
        `In filtered products, ${topProduct.product_name || "-"} explains the largest revenue (${formatMoney(topProduct.net_revenue || 0)}), while ${weakestProduct.product_name || "-"} pressures margin at ${formatPercent(weakestProduct.gross_margin_pct || 0)}. There are ${formatInt(alertProductCount)} product(s) below the floor.`
      ],
      [
        `The decision combines three signals: revenue by channel, margin by category/product, and target attainment by month.`,
        `The best target signal in the slice is ${bestTarget.sales_channel || "-"} in ${bestTarget.target_month || "-"}, with ${formatPercent(bestTarget.revenue_target_attainment || 0)} attainment.`,
        `The recommendation is to protect items below the floor first, then scale what already combines revenue, margin and target.`
      ]
    ],
    es: [
      [
        `En el recorte ${channelLabel}, la lectura ejecutiva muestra ${formatMoney(channelBase.net_revenue)} en ingreso neto, ${formatPercent(channelBase.gross_margin_pct)} de margen y ${formatInt(channelBase.delivered_orders)} pedidos entregados.`,
        `El ticket promedio queda en ${formatMoney(channelBase.average_ticket || data.kpis.average_ticket)}; ayuda a separar crecimiento real de simple aumento de volumen.`,
        `Esta es la lectura inicial: si el margen está cerca del piso, el ingreso debe explicarse por canal, categoría y producto antes de convertirse en recomendación.`
      ],
      [
        `Con mes ${monthLabel}, categoría ${categoryLabel} y estado de margen ${marginStatusLabel}, el mayor mes del recorte es ${bestMonth.order_month || "-"}, con ${formatMoney(bestMonth.net_revenue || 0)} netos.`,
        `${topChannel.sales_channel || "-"} concentra el mayor ingreso por canal en el recorte, con ${formatMoney(topChannel.net_revenue || 0)} y margen de ${formatPercent(topChannel.gross_margin_pct || 0)}.`,
        `Entre las categorías filtradas, ${weakestCategory.category || "-"} es la más sensible en margen: ${formatPercent(weakestCategory.gross_margin_pct || 0)}. Hay ${formatInt(alertCategoryCount)} categoría(s) debajo del piso de 30%.`
      ],
      [
        `Con estado de meta ${targetStatusLabel}, la matriz muestra ${formatInt(metTargetCount)} lectura(s) con meta cumplida y ${formatInt(belowTargetCount)} debajo de meta en el recorte actual.`,
        `El punto más débil de meta es ${weakestTarget.sales_channel || "-"} en ${weakestTarget.target_month || "-"}: ${formatPercent(weakestTarget.revenue_target_attainment || 0)} de cumplimiento y gap de ${formatMoney(targetGap)}.`,
        `En los productos filtrados, ${topProduct.product_name || "-"} explica el mayor ingreso (${formatMoney(topProduct.net_revenue || 0)}), mientras ${weakestProduct.product_name || "-"} presiona margen en ${formatPercent(weakestProduct.gross_margin_pct || 0)}. Hay ${formatInt(alertProductCount)} producto(s) debajo del piso.`
      ],
      [
        `La decisión combina tres señales: ingreso por canal, margen por categoría/producto y cumplimiento de meta por mes.`,
        `La mejor señal de meta en el recorte es ${bestTarget.sales_channel || "-"} en ${bestTarget.target_month || "-"}, con ${formatPercent(bestTarget.revenue_target_attainment || 0)} de cumplimiento.`,
        `La recomendación es proteger primero los ítems debajo del piso y después escalar lo que ya combina ingreso, margen y meta.`
      ]
    ]
  };
  const texts = (stageTexts[state.lang] || stageTexts.pt)[stage] || (stageTexts[state.lang] || stageTexts.pt)[0];
  return `
    <section class="result-readout retail-result-readout">
      <span>${escapeHtml(term("reading"))}</span>
      <ul>
        ${texts.map((reading) => `<li>${escapeHtml(reading)}</li>`).join("")}
      </ul>
    </section>
  `;
};

const renderRetail = (data) => {
  const channels = unique(data.channel_performance, "sales_channel");
  const categories = unique(data.category_performance, "category");
  const channel = selected("channel", channels);
  const category = selected("category", categories);
  const month = selected("month", unique(data.monthly_performance, "order_month"));
  const marginStatus = selected("marginStatus", retailMarginStatusOptions());
  const targetStatus = selected("targetStatus", retailTargetStatusOptions());
  const marginMatches = (row) => marginStatus === "all" || (marginStatus === "below-floor" ? Number(row.gross_margin_pct || 0) < 0.3 : Number(row.gross_margin_pct || 0) >= 0.3);
  const targetMatches = (row) => targetStatus === "all" || (targetStatus === "below-target" ? Number(row.revenue_target_attainment || 0) < 1 : Number(row.revenue_target_attainment || 0) >= 1);
  const channelRows = data.channel_performance.filter((row) => channel === "all" || row.sales_channel === channel);
  const categoryRows = data.category_performance.filter((row) => (category === "all" || row.category === category) && marginMatches(row));
  const productRows = data.product_ranking.filter((row) => (category === "all" || row.category === category) && marginMatches(row));
  const channelBase = channel === "all" ? data.kpis : channelRows[0];
  const trendRows = data.monthly_performance.filter((row) => month === "all" || row.order_month === month);
  const targetRows = data.target_tracking.filter((row) => (channel === "all" || row.sales_channel === channel) && (month === "all" || row.target_month === month) && targetMatches(row));
  const targetMatrixChannels = targetRows.length && targetStatus !== "all"
    ? unique(targetRows, "sales_channel").sort()
    : channels.filter((name) => channel === "all" || channel === name);
  const targetMatrixMonths = targetRows.length
    ? unique(targetRows, "target_month").sort()
    : (month === "all" ? unique(data.target_tracking, "target_month").sort() : [month]);
  const chapters = journeyCopy();
  const stageTitles = ({
    pt: ["Leitura executiva de receita", "Receita, margem e canais", "Metas e produtos que explicam o resultado"],
    en: ["Executive revenue readout", "Revenue, margin and channels", "Targets and products explaining the result"],
    es: ["Lectura ejecutiva de ingreso", "Ingreso, margen y canales", "Metas y productos que explican el resultado"]
  })[state.lang] || {};
  const retailContext = { channel, category, month, marginStatus, targetStatus, channelBase, trendRows, channelRows, categoryRows, productRows, targetRows };

  return `
    ${processChapter(chapters[0])}
    ${methodBlock(chapters[0])}
    ${dashboardMarker(stageTitles[0], ["channel"])}
    ${kpiGrid([
      { label: term("netRevenue"), value: formatMoney(channelBase.net_revenue), note: channel === "all" ? term("allChannels") : channel },
      { label: term("grossMargin"), value: formatPercent(channelBase.gross_margin_pct), note: formatMoney(channelBase.gross_margin) },
      { label: term("deliveredOrders"), value: formatInt(channelBase.delivered_orders), note: term("validForBi") },
      { label: term("averageTicket"), value: formatMoney(data.kpis.average_ticket), note: term("portfolioMetric") }
    ])}
    ${retailResultReadout(data, retailContext, 0)}
    ${processChapter(chapters[1])}
    ${methodBlock(chapters[1])}
    ${dashboardMarker(stageTitles[1], ["month", "channel", "category", "marginStatus"])}
    <div class="viz-grid">
      ${vizCard(copy().charts.revenueTrend, term("revenueMarginReference"), retailRevenueTrendChart(trendRows), true)}
      ${vizCard(copy().charts.channelRevenue, channel === "all" ? term("revenueShare") : channel, bars(channelRows.map((row) => ({
        label: row.sales_channel,
        value: row.net_revenue
      })), { format: formatMoney }))}
      ${vizCard(copy().charts.categoryMargin, category === "all" ? term("allCategories") : label(category), bars(categoryRows.map((row) => ({
        label: row.category,
        value: row.gross_margin_pct,
        alert: row.gross_margin_pct < 0.3
      })), { max: 0.45, format: (value) => formatPercent(value) }))}
    </div>
    ${retailResultReadout(data, retailContext, 1)}
    ${processChapter(chapters[2])}
    ${methodBlock(chapters[2])}
    ${dashboardMarker(stageTitles[2], ["month", "channel", "targetStatus", "category", "marginStatus"])}
    <article class="viz-card is-wide retail-diagnosis-chart-grid retail-target-card">
      ${cardHead(copy().charts.targets, `${term("month")} x ${term("channel")}`)}
      ${retailTargetMatrix(targetMatrixChannels, targetMatrixMonths, targetRows)}
    </article>
    <article class="viz-card is-wide retail-diagnosis-chart-grid retail-product-card">
      ${cardHead(copy().charts.products, `${term("margin")} x ${term("product")}`)}
      ${retailProductMarginBullets(productRows)}
    </article>
    <div class="viz-grid retail-diagnosis-table-grid">
      ${tableCard(copy().charts.targets, `${term("target")} x ${term("realized")}`, [term("month"), term("channel"), term("target"), term("realized")], targetRows.slice(0, 8).map((row) => [
        row.target_month,
        row.sales_channel,
        formatMoney(row.revenue_target),
        formatMoney(row.realized_revenue)
      ]), false, "0.8fr 1fr 1fr 1fr", "case-table-card")}
      ${tableCard(copy().charts.products, category === "all" ? term("topProducts") : label(category), [term("product"), term("category"), term("netRevenue"), term("margin")], productRows.slice(0, 8).map((row) => [
        row.product_name,
        label(row.category),
        formatMoney(row.net_revenue),
        formatPercent(row.gross_margin_pct)
      ]), false, "1.7fr 0.8fr 0.9fr 0.8fr", "case-table-card")}
    </div>
    ${retailResultReadout(data, retailContext, 2)}
    ${processChapter(chapters[3])}
    ${methodBlock(chapters[3])}
    ${retailResultReadout(data, retailContext, 3)}
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
  bindCustomSelects();
  setupChartReveal();
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

document.addEventListener("click", () => closeCustomSelects());
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeCustomSelects();
});

const setHeaderState = () => {
  document.body.classList.toggle("is-scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

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
