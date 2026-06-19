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

const bindMobileDisclosures = () => {
  const isCompact = window.innerWidth <= 640 || (window.innerWidth <= 900 && window.innerWidth > window.innerHeight);
  document.querySelectorAll("[data-mobile-collapsible]").forEach((details) => {
    if (details.dataset.userToggled === "true") return;
    details.open = !isCompact;
  });
};

const bindDisclosureToggles = () => {
  document.querySelectorAll("[data-mobile-collapsible]").forEach((details) => {
    if (details.dataset.disclosureBound === "true") return;
    details.dataset.disclosureBound = "true";
    details.addEventListener("toggle", () => {
      details.dataset.userToggled = "true";
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
      flowNote: "Miniatura do funil completo; o trecho em alerta marca o maior vazamento antes do dashboard detalhado.",
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
      flowNote: "Miniature of the full funnel; the alert segment marks the largest leak before the detailed dashboard.",
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
      flowNote: "Miniatura del embudo completo; el tramo en alerta marca la mayor fuga antes del dashboard detallado.",
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
  if (state.caseId !== "playzone" || !data?.ordered_funnel?.length) return "";
  const rows = data.ordered_funnel;
  const largestLoss = rows.reduce((max, row) => Number(row.loss_from_previous || 0) > Number(max.loss_from_previous || 0) ? row : max, rows[0]);
  return `
    <div class="hero-mini-flow">
      <div class="hero-mini-flow-track" style="--flow-count:${rows.length}">
        ${rows.map((row) => `
          <div class="hero-mini-flow-step ${row.step_order === largestLoss.step_order ? "is-alert" : ""}">
            <span>${escapeHtml(label(row.step_label))}</span>
            <i style="--w:${Math.max(4, Number(row.conversion_from_start || 0) * 100).toFixed(1)}%"></i>
          </div>
        `).join("")}
      </div>
      <span class="hero-mini-flow-note">${escapeHtml(heroText().flowNote)}</span>
    </div>
  `;
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
      version: unique(data.prompt_version_performance, "prompt_version"),
      useCase: unique(data.quality_by_use_case, "use_case"),
      severity: unique(data.issue_distribution, "severity"),
      issue: unique(data.issue_distribution, "issue_type")
    },
    pipeline: {
      severity: unique(data.failed_rules, "severity"),
      source: unique(data.source_quality, "source_system"),
      rule: unique(data.failed_rules, "rule_name")
    },
    retail: {
      channel: unique(data.channel_performance, "sales_channel"),
      category: unique(data.category_performance, "category"),
      month: unique(data.monthly_performance, "order_month")
    }
  };
  return sources[state.caseId]?.[key] || [];
};

const renderControls = () => {
  const data = datasets[state.caseId];
  let html = "";
  if (state.caseId === "playzone") html = control("channel", unique(data.funnel_by_channel, "acquisition_channel")) + control("category", unique(data.marketplace_category_metrics, "category"));
  if (state.caseId === "ai-quality") html = control("version", unique(data.prompt_version_performance, "prompt_version")) + control("useCase", unique(data.quality_by_use_case, "use_case")) + control("severity", unique(data.issue_distribution, "severity")) + control("issue", unique(data.issue_distribution, "issue_type"));
  if (state.caseId === "pipeline") html = control("severity", unique(data.failed_rules, "severity")) + control("source", unique(data.source_quality, "source_system")) + control("rule", unique(data.failed_rules, "rule_name"));
  if (state.caseId === "retail") html = control("channel", unique(data.channel_performance, "sales_channel")) + control("category", unique(data.category_performance, "category")) + control("month", unique(data.monthly_performance, "order_month"));
  $("#controls").innerHTML = html;
  bindCustomSelects();
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
  const codeLabel = term("codeEvidence");
  return `
    <section class="method-block">
      <div class="method-copy">
        <span>${escapeHtml(term("methodStep"))}</span>
        <p>${escapeHtml(item.body || "")}</p>
      </div>
      ${code ? `
        <details class="method-code-disclosure mobile-collapsible" data-mobile-collapsible>
          <summary>${escapeHtml(codeLabel)}</summary>
          <div class="mobile-collapsible-body">
            <pre class="method-code"><code>${escapeHtml(code)}</code></pre>
          </div>
        </details>
      ` : ""}
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
    <details class="code-column mobile-collapsible" data-mobile-collapsible>
      <summary>${escapeHtml(term("codeEvidence"))}</summary>
      <div class="mobile-collapsible-body">
        <span>${escapeHtml(term("codeEvidence"))}</span>
      ${item.snippets.map((snippet) => `
        <div>
          <span class="code-title">${escapeHtml(snippet.label)}</span>
          <pre class="code-snippet"><code>${escapeHtml(snippet.code)}</code></pre>
        </div>
      `).join("")}
      </div>
    </details>
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

const tableCell = (tag, column, cell) => `
  <${tag} data-label="${escapeHtml(column)}">
    <em class="table-cell-label">${escapeHtml(column)}</em>
    <span class="table-cell-value">${escapeHtml(cell)}</span>
  </${tag}>
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
          ${row.map((cell, index) => tableCell(index === 0 ? "strong" : "span", columns[index] || "", cell)).join("")}
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
                <div class="retention-lane-label">
                  <span>${escapeHtml(label(activated.activation_status || ""))}</span>
                  <strong>${escapeHtml(formatPercent(activeValue))}</strong>
                </div>
                <i class="retention-lane-bar" style="--w:${Math.max(4, (activeValue / max) * 100).toFixed(1)}%"></i>
                <span class="retention-lane-count">${escapeHtml(formatInt(retainedCount(activated, window.key)))} / ${escapeHtml(formatInt(activated.users))} ${escapeHtml(copy.retained)}</span>
              </div>
              <div class="retention-lane is-muted">
                <div class="retention-lane-label">
                  <span>${escapeHtml(label(notActivated.activation_status || ""))}</span>
                  <strong>${escapeHtml(formatPercent(inactiveValue))}</strong>
                </div>
                <i class="retention-lane-bar" style="--w:${Math.max(4, (inactiveValue / max) * 100).toFixed(1)}%"></i>
                <span class="retention-lane-count">${escapeHtml(formatInt(retainedCount(notActivated, window.key)))} / ${escapeHtml(formatInt(notActivated.users))} ${escapeHtml(copy.retained)}</span>
              </div>
            </article>
          `;
        }).join("")}
      </div>
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

const aiReadinessMatrix = (useCases, versions, rows) => {
  const matrixCopy = ({
    pt: {
      improvement: "item de melhoria",
      noBacklog: "fora do backlog",
      noPriority: "sem prioridade no backlog",
      notApproved: "nao aprov.",
      evaluated: "avaliadas",
      min: "menor prontidao",
      max: "maior prontidao"
    },
    en: {
      improvement: "improvement item",
      noBacklog: "outside backlog",
      noPriority: "no backlog priority",
      notApproved: "not approved",
      evaluated: "evaluated",
      min: "lower readiness",
      max: "higher readiness"
    },
    es: {
      improvement: "item de mejora",
      noBacklog: "fuera del backlog",
      noPriority: "sin prioridad en backlog",
      notApproved: "no aprob.",
      evaluated: "evaluadas",
      min: "menor preparacion",
      max: "mayor preparacion"
    }
  })[state.lang] || {};
  const rowFor = (useCase, promptVersion) => rows.find((item) => item.use_case === useCase && item.prompt_version === promptVersion);
  const values = rows.map((row) => Number(row.release_ready_rate || 0));
  const max = Math.max(...values, 1);
  const cellStyle = (value) => {
    const ratio = Number(value || 0) / max;
    const alpha = 0.06 + ratio * 0.28;
    return `--a:${alpha.toFixed(3)};--w:${Math.max(6, ratio * 100).toFixed(1)}%`;
  };
  const dataCell = (useCase, promptVersion) => {
    const row = rowFor(useCase, promptVersion);
    if (!row) {
      return `
        <div class="matrix-cell ai-readiness-cell is-empty">
          <strong>-</strong>
          <span>${escapeHtml(matrixCopy.noPriority)}</span>
        </div>
      `;
    }
    const value = Number(row.release_ready_rate || 0);
    return `
      <div class="matrix-cell ai-readiness-cell" style="${cellStyle(value)}">
        <strong>${escapeHtml(formatPercent(value))}</strong>
        <span>${escapeHtml(formatInt(row.not_approved_cases))} ${escapeHtml(matrixCopy.notApproved)} · ${escapeHtml(formatInt(row.reviewed_responses))} ${escapeHtml(matrixCopy.evaluated)}</span>
        <i></i>
      </div>
    `;
  };
  return `
    <div class="ai-readiness-matrix">
      <div class="ai-readiness-legend" aria-hidden="true">
        <span>${escapeHtml(matrixCopy.min)}</span>
        <i></i>
        <span>${escapeHtml(matrixCopy.max)}</span>
      </div>
      <div class="matrix-grid ai-readiness-desktop">
        <div class="matrix-row" style="--matrix-cols:${versions.length}">
          <div class="matrix-head-spacer" aria-hidden="true"></div>
          ${versions.map((promptVersion) => `<div class="matrix-cell is-head">${escapeHtml(label(promptVersion))}</div>`).join("")}
        </div>
        ${useCases.map((useCase) => `
          <div class="matrix-row" style="--matrix-cols:${versions.length}">
            <div class="matrix-cell is-head ai-row-head">
              <strong>${escapeHtml(label(useCase))}</strong>
              <span>${escapeHtml(matrixCopy.improvement)}</span>
            </div>
            ${versions.map((promptVersion) => dataCell(useCase, promptVersion)).join("")}
          </div>
        `).join("")}
      </div>
      <div class="ai-readiness-mobile">
        ${useCases.map((useCase) => `
          <article class="ai-readiness-card">
            <header>
              <strong>${escapeHtml(label(useCase))}</strong>
              <span>${escapeHtml(matrixCopy.improvement)}</span>
            </header>
            ${versions.map((promptVersion) => {
              const row = rowFor(useCase, promptVersion);
              if (!row) {
                return `
                  <section class="is-empty">
                    <b>${escapeHtml(label(promptVersion))}</b>
                    <em>-</em>
                    <small>${escapeHtml(matrixCopy.noBacklog)}</small>
                  </section>
                `;
              }
              const value = Number(row.release_ready_rate || 0);
              return `
                <section style="${cellStyle(value)}">
                  <b>${escapeHtml(label(promptVersion))}</b>
                  <em>${escapeHtml(formatPercent(value))}</em>
                  <small>${escapeHtml(formatInt(row.not_approved_cases))} ${escapeHtml(matrixCopy.notApproved)} · ${escapeHtml(formatInt(row.reviewed_responses))} ${escapeHtml(matrixCopy.evaluated)}</small>
                  <i></i>
                </section>
              `;
            }).join("")}
          </article>
        `).join("")}
      </div>
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
  const formatX = config.formatX || ((value) => formatNumber(value, { maximumFractionDigits: 1 }));
  const formatY = config.formatY || ((value) => formatNumber(value, { maximumFractionDigits: 1 }));
  const formatSize = config.formatSize || ((value) => formatNumber(value, { maximumFractionDigits: 0 }));
  const sizeLabel = config.sizeLabel || term("units");
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
    <div class="bubble-mobile-list" role="list" aria-label="${escapeHtml(config.title || "")}">
      ${rows.map((row) => {
        const xShare = Math.max(6, (Number(row.x || 0) / maxX) * 100).toFixed(1);
        const yShare = Math.max(6, (Number(row.y || 0) / maxY) * 100).toFixed(1);
        return `
          <article class="bubble-mobile-card ${row.alert ? "is-alert" : ""}" role="listitem">
            <div class="bubble-mobile-title">
              <strong>${escapeHtml(label(row.label))}</strong>
              <span>${escapeHtml(formatSize(row.size))} ${escapeHtml(sizeLabel)}</span>
            </div>
            <div class="bubble-mobile-metrics">
              <span>
                <em>${escapeHtml(config.xLabel)}</em>
                <strong>${escapeHtml(formatX(row.x))}</strong>
                <i style="--w:${xShare}%"></i>
              </span>
              <span>
                <em>${escapeHtml(config.yLabel)}</em>
                <strong>${escapeHtml(formatY(row.y))}</strong>
                <i style="--w:${yShare}%"></i>
              </span>
            </div>
          </article>
        `;
      }).join("")}
    </div>
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
      ${vizCard(copy().charts.liquidityMap, `${term("opportunities")} x ${term("confirmationRate")}`, liquidityMapChart(categoryRows.map((row) => ({
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
  const version = selected("version", versions);
  const useCase = selected("useCase", useCases);
  const severity = selected("severity", unique(data.issue_distribution, "severity"));
  const issue = selected("issue", unique(data.issue_distribution, "issue_type"));
  const base = version === "all" ? data.kpi_summary[0] : data.prompt_version_performance.find((row) => row.prompt_version === version);
  const backlog = data.improvement_backlog.filter((row) => (version === "all" || row.prompt_version === version) && (useCase === "all" || row.use_case === useCase));
  const qualityRows = data.quality_by_use_case.filter((row) => useCase === "all" || row.use_case === useCase);
  const issueRows = data.issue_distribution.filter((row) => (severity === "all" || row.severity === severity) && (issue === "all" || row.issue_type === issue));
  const chapters = journeyCopy();
  return `
    ${processChapter(chapters[0])}
    ${methodBlock(chapters[0])}
    ${kpiGrid([
      { label: term("releaseReady"), value: formatPercent(base.release_ready_rate), note: version === "all" ? term("allPromptVersions") : version },
      { label: term("qualityScore"), value: formatNumber(base.avg_quality_score, { minimumFractionDigits: 2, maximumFractionDigits: 2 }), note: term("scaleOneToFive") },
      { label: term("criticalIssueRate"), value: formatPercent(base.critical_issue_rate), note: term("operationalRisk"), alert: base.critical_issue_rate > 0.1 },
      { label: term("reviewed"), value: formatInt(base.reviewed_responses), note: term("responsesEvaluated") }
    ])}
    ${processChapter(chapters[1])}
    ${methodBlock(chapters[1])}
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
    </div>
    ${processChapter(chapters[2])}
    ${methodBlock(chapters[2])}
    <div class="viz-grid">
      ${vizCard(copy().charts.releaseMatrix, `${term("version")} x ${term("useCase")}`, aiReadinessMatrix(useCases, versions, data.improvement_backlog), true)}
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
    ${processChapter(chapters[3])}
    ${methodBlock(chapters[3])}
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
  const chapters = journeyCopy();
  return `
    ${processChapter(chapters[0])}
    ${methodBlock(chapters[0])}
    ${kpiGrid([
      { label: term("qualityScoreShort"), value: formatPercent(data.kpis.quality_score), note: term("highAverage") },
      { label: term("criticalFailures"), value: formatInt(data.kpis.critical_failures), note: term("blockingPublication"), alert: true },
      { label: term("readyOrders"), value: formatInt(data.kpis.ready_orders), note: `${formatInt(data.kpis.raw_orders)} ${term("rawOrders")}` },
      { label: term("reviewOrders"), value: formatInt(data.kpis.review_orders), note: term("needCorrection"), alert: data.kpis.review_orders > 0 }
    ])}
    ${processChapter(chapters[1])}
    ${methodBlock(chapters[1])}
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
    </div>
    ${processChapter(chapters[2])}
    ${methodBlock(chapters[2])}
    <div class="viz-grid">
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
        y: Number(row.gross_margin || 0) / Math.max(1, Number(row.net_revenue || 0)),
        size: row.units,
        alert: row.gross_margin / Math.max(1, row.net_revenue) < 0.35
      })), {
        xLabel: term("revenue"),
        yLabel: term("margin"),
        title: copy().charts.categoryImpact,
        formatX: formatMoney,
        formatY: (value) => formatPercent(value),
        formatSize: (value) => formatInt(value),
        sizeLabel: term("units")
      }), true)}
    </div>
    ${processChapter(chapters[3])}
    ${methodBlock(chapters[3])}
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
  const chapters = journeyCopy();

  return `
    ${processChapter(chapters[0])}
    ${methodBlock(chapters[0])}
    ${kpiGrid([
      { label: term("netRevenue"), value: formatMoney(channelBase.net_revenue), note: channel === "all" ? term("allChannels") : channel },
      { label: term("grossMargin"), value: formatPercent(channelBase.gross_margin_pct), note: formatMoney(channelBase.gross_margin) },
      { label: term("deliveredOrders"), value: formatInt(channelBase.delivered_orders), note: term("validForBi") },
      { label: term("averageTicket"), value: formatMoney(data.kpis.average_ticket), note: term("portfolioMetric") }
    ])}
    ${processChapter(chapters[1])}
    ${methodBlock(chapters[1])}
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
    </div>
    ${processChapter(chapters[2])}
    ${methodBlock(chapters[2])}
    <div class="viz-grid">
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
    ${processChapter(chapters[3])}
    ${methodBlock(chapters[3])}
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
  bindMobileDisclosures();
  bindDisclosureToggles();
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
window.addEventListener("resize", bindMobileDisclosures, { passive: true });

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
