document.documentElement.classList.add("js-ready");

const translations = {
  en: {
    skip: "Skip to the project",
    brandRole: "Data, BI and applied AI",
    navCases: "Projects",
    navDashboards: "Interactive analyses",
    navMethod: "Method",
    navContact: "Contact",
    projectPlayzone: "Playzone",
    projectAi: "AI Governance",
    projectPipeline: "Pipeline Quality",
    projectRetail: "Revenue and margin",
    projectTennis: "Serving under pressure",
    caseType: "Business Analysis and automation",
    stepProblem: "Problem",
    stepRequirements: "Requirements",
    stepSolution: "Build",
    stepDeliverables: "Deliverables",
    stepEvidence: "Evidence",
    backCases: "All projects",
    tagBusiness: "Business Analysis",
    tagAutomation: "Data, SQL and automation",
    tagProduct: "Author-owned product",
    heroTitle: "AGA Studio: from a development's location to the aeronautical process",
    heroLead: "I designed and developed a Windows application that checks construction data against protected-airspace plans, calculates height limits and generates the technical documents used in an aeronautical assessment.",
    executiveKicker: "Executive readout",
    signalVersion: "Internal version",
    signalEngineTests: "Calculation tests",
    signalReleaseChecks: "Version checks",
    executiveProblemLabel: "Problem",
    executiveProblemText: "An assessment relied on searches, calculations and documents spread across spreadsheets, maps, drawings and separate systems.",
    executiveDiagnosisLabel: "Diagnosis",
    executiveDiagnosisText: "The greatest risk was in the handoffs: retyping coordinates, using an outdated source or delivering a document that no longer matched the calculation.",
    executiveDecisionLabel: "Decision",
    executiveDecisionText: "Turn the process into one product, with local data, verifiable rules, outputs tied to the calculation and human review before official submission.",
    objectiveLabel: "Objective",
    objectiveText: "Reduce repeated work and keep sources, calculations and deliverables tied to the same work cycle.",
    scopeLabel: "Verified scope",
    scopeText: "Windows application 0.2.4 prepared for controlled internal distribution.",
    metricPlans: "Protection plans catalogued",
    metricFiles: "Files catalogued",
    metricEngineTests: "Calculation tests",
    metricReleaseChecks: "Version checks",
    shot01Label: "Screenshot 01",
    shot01Title: "One project, from location to deliverables",
    shot01Text: "The screen will show a fictional example from the development's location to the technical deliverables, without real client data.",
    chapter01Label: "The problem",
    chapter01Title: "A building's height may be limited by the protected airspace around it",
    metaProcesses: "Processes",
    metaRequirements: "Requirements",
    methodApplied: "What needed to be solved",
    chapter01Body: "In Brazilian aeronautical regulation, OPEA is a building, structure or piece of equipment that may affect air navigation. Before designing the application, I broke down the real work: locate the development, find which protection plans reach the area, apply each plan's rules, determine the allowed height and prepare the documents for official review.",
    decisionLabel: "Product decision",
    chapter01Decision: "A calculation would only be reliable if coordinates, sources, rules and documents stayed tied to the same project version.",
    flowFiles: "Locate the development",
    flowSearch: "Find applicable plans",
    flowCalculation: "Calculate height limits",
    flowDelivery: "Generate and review outputs",
    chapter02Label: "Requirements",
    chapter02Title: "Product rules came from the points where the process could produce a misleading result",
    metaRules: "Business rules",
    metaTraceability: "Data quality",
    rule01Title: "Proximity does not mean restriction",
    rule01Text: "The application first finds candidate plans, then confirms the geometric intersection and only then calculates whether an applicable limit exists.",
    rule02Title: "Simulation does not become official data",
    rule02Text: "Points used to test the whole area stay separate from the official vertices that identify the development.",
    rule03Title: "A change invalidates outdated work",
    rule03Text: "If coordinates, documents or rules change, older reports, drawings and packages are marked as outdated.",
    rule04Title: "Data extracted from PDFs requires review",
    rule04Text: "Each value keeps its page, original text and normalised form. It only enters the project after review and confirmation.",
    rule05Title: "Final submission remains human",
    rule05Text: "The application prepares and checks the files, but login, legal statements, signature, CAPTCHA and submission remain the specialist's responsibility.",
    chapter03Label: "Build",
    chapter03Title: "Local data, geospatial calculation and history form the product's foundation",
    capabilityDataKicker: "Data and SQL",
    capabilityDataTitle: "Local plan catalogue",
    capabilityDataText: "I modelled a SQLite database with 6,733 plans and 24,636 file records. SQL queries retrieve information by municipality, aerodrome, type, coordinate or KML file.",
    capabilityDataProof: "Text index + RTree spatial index",
    capabilityGeoKicker: "Geospatial analysis",
    capabilityGeoTitle: "From a fast search to an exact intersection",
    capabilityGeoText: "The spatial index narrows the candidates. The engine then opens the geometry and confirms which plans truly reach the development, so proximity is not presented as a restriction.",
    capabilityGeoProof: "SQLite RTree + Shapely + PyProj",
    capabilityEngineKicker: "Rule engine",
    capabilityEngineTitle: "Height calculation across the whole area",
    capabilityEngineText: "The engine compares vertices, boundary points and internal samples with the applicable surfaces. It returns the most restrictive point, altitude limit, maximum height and how far the construction stays below or rises above that limit.",
    capabilityEngineProof: "Deterministic calculation in Python",
    capabilityDocumentsKicker: "Documents",
    capabilityDocumentsTitle: "Assisted PDF extraction",
    capabilityDocumentsText: "The application recognises seven types of technical document and proposes fields, coordinates and parameters. PDFs without searchable text are blocked for manual review or OCR.",
    capabilityDocumentsProof: "Page, original value and confirmation recorded",
    capabilityProjectKicker: "Traceability",
    capabilityProjectTitle: "A project file with history",
    capabilityProjectText: "The .aga file stores sources, engine and catalogue versions, calculation runs, outputs and approvals. Automatic recovery protects work if the application is interrupted.",
    capabilityProjectProof: "Version, fingerprint and recovery",
    capabilityRuntimeKicker: "Desktop product",
    capabilityRuntimeTitle: "Engine and database run on the computer",
    capabilityRuntimeText: "The installed version includes the interface, Python engine and SQLite catalogue. Searches and calculations keep working without the published service.",
    capabilityRuntimeProof: "Windows application packaged with Electron",
    architectureInputs: "Received data",
    inputCoordinates: "Coordinates",
    inputMaps: "Maps",
    inputDrawings: "Drawings",
    inputDocuments: "Documents",
    architectureCore: "Data, steps and rules in one place",
    architectureEngine: "Calculation engine that checks areas, heights and results",
    architectureOutputs: "Deliverables",
    outputEvidence: "Map and evidence",
    outputReport: "Report",
    outputDrawings: "Technical drawings",
    outputPackage: "Files for the official submission",
    shot02Label: "Screenshot 02",
    shot02Title: "Catalogue search and intersecting plans",
    shot02Text: "Show the local search, the sources found and the difference between a candidate plan, a confirmed intersection and a calculated restriction.",
    shot03Label: "Screenshot 03",
    shot03Title: "Result explained point by point",
    shot03Text: "Show the most restrictive point, applicable surface, allowed height and the values used in the calculation.",
    chapter04Label: "Deliverables",
    chapter04Title: "The same calculation feeds maps, the report, the technical drawing and process preparation",
    deliveryEvidenceKicker: "Technical evidence",
    deliveryEvidenceTitle: "Map and point-by-point analysis",
    deliveryEvidenceText: "The package shows the study area, intersecting plans, the most restrictive point, evaluated surfaces and the values used in the calculations.",
    deliveryEvidenceFormats: "KML | maps | tables",
    deliveryReportKicker: "Feasibility report",
    deliveryReportTitle: "Document with calculation and source",
    deliveryReportText: "The report includes conclusion, method, sources, map, critical-restriction profile, point analysis, table and detailed calculations. Calculated values cannot be changed in the text editor.",
    deliveryReportFormats: "DOCX | HTML prepared for PDF",
    deliveryCadKicker: "Technical drawing",
    deliveryCadTitle: "CAD Site Plan generated by the application",
    deliveryCadText: "The A0 sheet includes the perimeter, vertices, elevations, coordinate table, title block and updated magnetic declination. The generator checks collisions, text outside cells and required components.",
    deliveryCadFormats: "DXF | PDF | PNG | JSON audit",
    deliverySysagaKicker: "Official process",
    deliverySysagaTitle: "Package checked before SysAGA",
    deliverySysagaText: "Pre-analysis, Annex C2 and the application package receive a SHA-256 code that detects any change and pass a no-submit test. The application blocks automatic save, advance, protocol and submission actions.",
    deliverySysagaFormats: "Validated package | human pause",
    metaHumanReview: "Human review",
    metaProtectedSubmission: "Protected submission",
    automationSide: "The application can",
    automation01: "query sources and run calculations;",
    automation02: "generate maps, reports and the Site Plan;",
    automation03: "validate fields, files and versions;",
    automation04: "prepare the package and test its completion.",
    boundary: "Mandatory review",
    humanSide: "The specialist must",
    human01: "confirm the data and technical conclusion;",
    human02: "review the report and final drawing;",
    human03: "accept legal statements and technical responsibility;",
    human04: "log in, sign and submit in SysAGA.",
    shot04Label: "Screenshot 04",
    shot04Title: "Complete technical report",
    shot04Text: "Show the conclusion, map, restriction profile and calculation-run traceability.",
    shot05Label: "Screenshot 05",
    shot05Title: "Generated Site Plan",
    shot05Text: "Show the DXF and its preview with coordinate table, title block, vertices and automated checks.",
    chapter05Label: "Controls and evidence",
    chapter05Title: "Automation ends where professional judgement and responsibility begin",
    metaAutomatedTests: "Automated tests",
    metaInstaller: "Installer",
    metaAcceptance: "Clean installation",
    evidenceEngine: "Python engine",
    evidenceEngineText: "rule and calculation tests passed",
    evidenceDocs: "Documents and CAD",
    evidenceDocsText: "document checks passed",
    evidenceRelease: "Installation package",
    evidenceReleaseText: "version resources checked with no failures",
    evidenceE2e: "Interface flows",
    evidenceE2eText: "50 passed together; 5 exceeded the time limit and passed when repeated separately",
    chapter06Label: "Current result",
    chapter06Title: "Version 0.2.4 was installed and validated in a clean Windows profile",
    deliveredLabel: "What is proven",
    deliveredText: "The application queries the SQLite catalogue, runs the local Python engine, saves and recovers projects, exports KML, generates the technical report, prepares the Site Plan and builds verified SysAGA packages.",
    limitsLabel: "What I do not claim yet",
    limitsText: "The installer does not yet have a commercial code signature. Address search and the background map may require internet access. Profile Plan generation remains blocked until the full graphic rules are defined. Time savings and error reduction will be measured with comparable tasks.",
    portfolioProofLabel: "What this project demonstrates",
    portfolioProofBusiness: "Business Analysis",
    portfolioProofBusinessText: "Process, requirements, rules, exceptions and acceptance criteria.",
    portfolioProofData: "Data and SQL",
    portfolioProofDataText: "SQLite modelling, queries, text search, spatial index and catalogue integrity.",
    portfolioProofAutomation: "Python and automation",
    portfolioProofAutomationText: "Local API, geospatial calculation, document extraction and file generation.",
    portfolioProofQuality: "Quality and governance",
    portfolioProofQualityText: "Traceability, human review, versions, tests and safeguards against outdated results.",
    measurementLabel: "Next measurement",
    measurementTitle: "Compare the previous process and AGA Studio on equivalent tasks.",
    measurementText: "The assessment will record time, manual steps, corrections, discrepancies and generated files. Until then, this case presents technical capability and product quality, not estimated operational gains.",
    closingLabel: "Business Analysis, product and automation",
    closingTitle: "AGA Studio shows how I translated a specialised process into a working product with data, rules, technical deliverables and explicit human controls.",
    closingCases: "View other projects",
    closingContact: "Get in touch",
    backTop: "Back to top"
  },
  es: {
    skip: "Saltar al proyecto",
    brandRole: "Datos, BI e IA aplicada",
    navCases: "Proyectos",
    navDashboards: "Análisis interactivos",
    navMethod: "Método",
    navContact: "Contacto",
    projectPlayzone: "Playzone",
    projectAi: "Gobernanza de IA",
    projectPipeline: "Calidad del pipeline",
    projectRetail: "Ingresos y margen",
    projectTennis: "Saque bajo presión",
    caseType: "Business Analysis y automatización",
    stepProblem: "Problema",
    stepRequirements: "Requisitos",
    stepSolution: "Construcción",
    stepDeliverables: "Entregables",
    stepEvidence: "Evidencias",
    backCases: "Todos los proyectos",
    tagBusiness: "Business Analysis",
    tagAutomation: "Datos, SQL y automatización",
    tagProduct: "Producto propio",
    heroTitle: "AGA Studio: de la ubicación del proyecto al proceso aeronáutico",
    heroLead: "Diseñé y desarrollé una aplicación para Windows que cruza los datos de una construcción con los planes de protección del espacio aéreo, calcula los límites de altura y genera los documentos técnicos usados en la evaluación aeronáutica.",
    executiveKicker: "Lectura ejecutiva",
    signalVersion: "Versión interna",
    signalEngineTests: "Pruebas de cálculo",
    signalReleaseChecks: "Verificaciones de la versión",
    executiveProblemLabel: "Problema",
    executiveProblemText: "Una evaluación dependía de consultas, cálculos y documentos distribuidos entre hojas de cálculo, mapas, dibujos y sistemas separados.",
    executiveDiagnosisLabel: "Diagnóstico",
    executiveDiagnosisText: "El mayor riesgo estaba en los traspasos: volver a escribir coordenadas, usar una fuente antigua o entregar un documento que ya no correspondía al cálculo.",
    executiveDecisionLabel: "Decisión",
    executiveDecisionText: "Convertir el proceso en un único producto, con datos locales, reglas verificables, entregables ligados al cálculo y revisión humana antes del trámite oficial.",
    objectiveLabel: "Objetivo",
    objectiveText: "Reducir tareas repetidas y mantener fuentes, cálculos y entregables vinculados a la misma ronda de trabajo.",
    scopeLabel: "Alcance comprobado",
    scopeText: "Aplicación para Windows 0.2.4 preparada para distribución interna controlada.",
    metricPlans: "Planes de protección catalogados",
    metricFiles: "Archivos catalogados",
    metricEngineTests: "Pruebas de cálculo",
    metricReleaseChecks: "Verificaciones de la versión",
    shot01Label: "Captura 01",
    shot01Title: "Un proyecto, desde la ubicación hasta los entregables",
    shot01Text: "La pantalla mostrará un ejemplo ficticio desde la ubicación del proyecto hasta los entregables técnicos, sin datos reales de clientes.",
    chapter01Label: "El problema",
    chapter01Title: "La altura de una construcción puede estar limitada por el espacio aéreo protegido que la rodea",
    metaProcesses: "Procesos",
    metaRequirements: "Requisitos",
    methodApplied: "Qué había que resolver",
    chapter01Body: "En la regulación aeronáutica brasileña, OPEA es una construcción, estructura o equipo que puede afectar la navegación aérea. Antes de diseñar la aplicación, descompuse el trabajo real: ubicar el proyecto, encontrar qué planes de protección alcanzan el área, aplicar las reglas de cada plan, determinar la altura permitida y preparar los documentos para la evaluación oficial.",
    decisionLabel: "Decisión de producto",
    chapter01Decision: "El cálculo solo sería confiable si coordenadas, fuentes, reglas y documentos permanecieran vinculados a la misma versión del proyecto.",
    flowFiles: "Ubicar el proyecto",
    flowSearch: "Encontrar los planes aplicables",
    flowCalculation: "Calcular los límites de altura",
    flowDelivery: "Generar y revisar los entregables",
    chapter02Label: "Requisitos",
    chapter02Title: "Las reglas del producto nacieron de los puntos donde el proceso podía inducir a error",
    metaRules: "Reglas de negocio",
    metaTraceability: "Calidad de datos",
    rule01Title: "Proximidad no significa restricción",
    rule01Text: "La aplicación primero encuentra planes candidatos, después confirma la intersección geométrica y solo entonces calcula si existe un límite aplicable.",
    rule02Title: "La simulación no se convierte en dato oficial",
    rule02Text: "Los puntos usados para probar toda el área se mantienen separados de los vértices oficiales que identifican el proyecto.",
    rule03Title: "Un cambio invalida lo que quedó antiguo",
    rule03Text: "Si cambian las coordenadas, los documentos o las reglas, los informes, dibujos y paquetes anteriores quedan marcados como desactualizados.",
    rule04Title: "Los datos extraídos de PDF exigen revisión",
    rule04Text: "Cada valor conserva su página, el texto original y la forma normalizada. Solo entra al proyecto después de la revisión y confirmación.",
    rule05Title: "El envío final sigue siendo humano",
    rule05Text: "La aplicación prepara y comprueba los archivos, pero el acceso, las declaraciones, la firma, el CAPTCHA y el envío siguen bajo responsabilidad del profesional.",
    chapter03Label: "Construcción",
    chapter03Title: "Los datos locales, el cálculo geoespacial y el historial forman la base del producto",
    capabilityDataKicker: "Datos y SQL",
    capabilityDataTitle: "Catálogo local de planes",
    capabilityDataText: "Modelé una base SQLite con 6.733 planes y 24.636 registros de archivos. Las consultas SQL recuperan información por municipio, aeródromo, tipo, coordenada o archivo KML.",
    capabilityDataProof: "Índice textual + índice espacial RTree",
    capabilityGeoKicker: "Análisis geoespacial",
    capabilityGeoTitle: "De la búsqueda rápida a la intersección exacta",
    capabilityGeoText: "El índice espacial reduce los candidatos. Luego el motor abre la geometría y confirma qué planes realmente alcanzan el proyecto, evitando presentar proximidad como restricción.",
    capabilityGeoProof: "SQLite RTree + Shapely + PyProj",
    capabilityEngineKicker: "Motor normativo",
    capabilityEngineTitle: "Cálculo de altura en toda el área",
    capabilityEngineText: "El motor compara vértices, bordes y puntos internos con las superficies aplicables. El resultado identifica el punto más restrictivo, el límite de altitud, la altura máxima y cuánto queda la construcción por debajo o por encima de ese límite.",
    capabilityEngineProof: "Cálculo determinista en Python",
    capabilityDocumentsKicker: "Documentos",
    capabilityDocumentsTitle: "Lectura asistida de PDF",
    capabilityDocumentsText: "La aplicación reconoce siete tipos de documento técnico y propone campos, coordenadas y parámetros. Los PDF sin texto consultable se bloquean para revisión manual u OCR.",
    capabilityDocumentsProof: "Página, valor original y confirmación registrados",
    capabilityProjectKicker: "Trazabilidad",
    capabilityProjectTitle: "Un archivo de proyecto con historial",
    capabilityProjectText: "El archivo .aga guarda fuentes, versiones del motor y del catálogo, cálculos, entregables y aprobaciones. La recuperación automática protege el trabajo si la aplicación se interrumpe.",
    capabilityProjectProof: "Versión, huella digital y recuperación",
    capabilityRuntimeKicker: "Producto de escritorio",
    capabilityRuntimeTitle: "Motor y base de datos ejecutados en el ordenador",
    capabilityRuntimeText: "La versión instalada incluye la interfaz, el motor Python y el catálogo SQLite. Las consultas y los cálculos siguen funcionando sin depender del servicio publicado.",
    capabilityRuntimeProof: "Aplicación Windows empaquetada con Electron",
    architectureInputs: "Datos recibidos",
    inputCoordinates: "Coordenadas",
    inputMaps: "Mapas",
    inputDrawings: "Planos",
    inputDocuments: "Documentos",
    architectureCore: "Datos, etapas y reglas en un solo lugar",
    architectureEngine: "Motor de cálculo para comprobar áreas, alturas y resultados",
    architectureOutputs: "Entregas",
    outputEvidence: "Mapa y pruebas",
    outputReport: "Informe",
    outputDrawings: "Planos técnicos",
    outputPackage: "Archivos para el envío oficial",
    shot02Label: "Captura 02",
    shot02Title: "Consulta del catálogo y planes incidentes",
    shot02Text: "Mostrar la búsqueda local, las fuentes encontradas y la diferencia entre plan candidato, intersección confirmada y restricción calculada.",
    shot03Label: "Captura 03",
    shot03Title: "Resultado explicado punto por punto",
    shot03Text: "Mostrar el punto más restrictivo, la superficie aplicable, la altura permitida y los valores usados en el cálculo.",
    chapter04Label: "Entregables",
    chapter04Title: "El mismo cálculo alimenta mapas, informe, dibujo técnico y preparación del proceso",
    deliveryEvidenceKicker: "Pruebas técnicas",
    deliveryEvidenceTitle: "Mapa y análisis por punto",
    deliveryEvidenceText: "El paquete muestra el área estudiada, los planes incidentes, el punto más restrictivo, las superficies evaluadas y los valores usados en los cálculos.",
    deliveryEvidenceFormats: "KML | mapas | tablas",
    deliveryReportKicker: "Informe de viabilidad",
    deliveryReportTitle: "Documento con cálculo y origen",
    deliveryReportText: "El informe reúne conclusión, método, fuentes, mapa, perfil de la restricción crítica, análisis por punto, tabla y detalle de los cálculos. Los valores calculados no pueden modificarse en el editor de texto.",
    deliveryReportFormats: "DOCX | HTML preparado para PDF",
    deliveryCadKicker: "Dibujo técnico",
    deliveryCadTitle: "Plano de Situación generado en CAD",
    deliveryCadText: "La lámina A0 incluye perímetro, vértices, cotas, tabla de coordenadas, cajetín y declinación magnética actualizada. El generador comprueba colisiones, textos fuera de las celdas y componentes obligatorios.",
    deliveryCadFormats: "DXF | PDF | PNG | auditoría JSON",
    deliverySysagaKicker: "Proceso oficial",
    deliverySysagaTitle: "Paquete comprobado antes de SysAGA",
    deliverySysagaText: "El preanálisis, el Anexo C2 y la solicitud reciben un código SHA-256 que detecta cualquier cambio y pasan por una prueba sin envío. La aplicación bloquea guardar, avanzar, protocolizar o enviar automáticamente.",
    deliverySysagaFormats: "Paquete validado | pausa humana",
    metaHumanReview: "Revisión humana",
    metaProtectedSubmission: "Envío protegido",
    automationSide: "La aplicación puede",
    automation01: "consultar fuentes y ejecutar cálculos;",
    automation02: "generar mapas, informes y el Plano de Situación;",
    automation03: "validar campos, archivos y versiones;",
    automation04: "preparar el paquete y probar su llenado.",
    boundary: "Revisión obligatoria",
    humanSide: "El profesional debe",
    human01: "confirmar los datos y la conclusión técnica;",
    human02: "revisar el informe y el dibujo final;",
    human03: "asumir las declaraciones y la responsabilidad técnica;",
    human04: "acceder, firmar y enviar en SysAGA.",
    shot04Label: "Captura 04",
    shot04Title: "Informe técnico completo",
    shot04Text: "Mostrar la conclusión, el mapa, el perfil de la restricción y la trazabilidad de la ejecución del cálculo.",
    shot05Label: "Captura 05",
    shot05Title: "Plano de Situación generado",
    shot05Text: "Mostrar el DXF y su vista previa con tabla de coordenadas, cajetín, vértices y comprobaciones automáticas.",
    chapter05Label: "Controles y pruebas",
    chapter05Title: "La automatización termina donde comienzan el juicio y la responsabilidad profesional",
    metaAutomatedTests: "Pruebas automáticas",
    metaInstaller: "Instalador",
    metaAcceptance: "Instalación limpia",
    evidenceEngine: "Motor Python",
    evidenceEngineText: "pruebas de reglas y cálculos aprobadas",
    evidenceDocs: "Documentos y CAD",
    evidenceDocsText: "verificaciones documentales aprobadas",
    evidenceRelease: "Paquete de instalación",
    evidenceReleaseText: "recursos de la versión comprobados sin fallos",
    evidenceE2e: "Flujos de la interfaz",
    evidenceE2eText: "50 pasaron en conjunto; 5 excedieron el tiempo y pasaron al repetirse por separado",
    chapter06Label: "Resultado actual",
    chapter06Title: "La versión 0.2.4 fue instalada y validada en un perfil limpio de Windows",
    deliveredLabel: "Lo que está probado",
    deliveredText: "La aplicación consulta el catálogo SQLite, ejecuta el motor Python local, guarda y recupera proyectos, exporta KML, genera el informe técnico, prepara el Plano de Situación y crea paquetes verificados para SysAGA.",
    limitsLabel: "Lo que todavía no afirmo",
    limitsText: "El instalador todavía no tiene firma comercial. La búsqueda de direcciones y el mapa de fondo pueden requerir internet. La generación del Plano de Perfil sigue bloqueada hasta completar sus reglas gráficas. El ahorro de tiempo y la reducción de errores se medirán con tareas comparables.",
    portfolioProofLabel: "Lo que demuestra este proyecto",
    portfolioProofBusiness: "Análisis de negocios",
    portfolioProofBusinessText: "Proceso, requisitos, reglas, excepciones y criterios de aceptación.",
    portfolioProofData: "Datos y SQL",
    portfolioProofDataText: "Modelado SQLite, consultas, búsqueda textual, índice espacial e integridad del catálogo.",
    portfolioProofAutomation: "Python y automatización",
    portfolioProofAutomationText: "API local, cálculo geoespacial, lectura de documentos y generación de archivos.",
    portfolioProofQuality: "Calidad y gobernanza",
    portfolioProofQualityText: "Trazabilidad, revisión humana, versiones, pruebas y bloqueos contra resultados desactualizados.",
    measurementLabel: "Próxima medición",
    measurementTitle: "Comparar el proceso anterior y AGA Studio en tareas equivalentes.",
    measurementText: "La evaluación registrará tiempo, etapas manuales, correcciones, divergencias y archivos generados. Hasta entonces, el caso presenta capacidad técnica y calidad del producto, no beneficios operativos estimados.",
    closingLabel: "Business Analysis, producto y automatización",
    closingTitle: "AGA Studio muestra cómo traduje un proceso especializado en un producto funcional, con datos, reglas, entregables técnicos y controles humanos explícitos.",
    closingCases: "Ver otros proyectos",
    closingContact: "Contactar",
    backTop: "Volver arriba"
  }
};

const metadata = {
  pt: {
    title: "AGA Studio | Bruno Nascimento",
    description: "AGA Studio: produto desktop com SQL, cálculo geoespacial, relatórios técnicos, CAD e preparação controlada do processo aeronáutico."
  },
  en: {
    title: "AGA Studio | Bruno Nascimento",
    description: "AGA Studio: a desktop product with SQL, geospatial calculations, technical reports, CAD and controlled preparation of the aeronautical process."
  },
  es: {
    title: "AGA Studio | Bruno Nascimento",
    description: "AGA Studio: producto de escritorio con SQL, cálculo geoespacial, informes técnicos, CAD y preparación controlada del proceso aeronáutico."
  }
};

const ariaTranslations = {
  en: {
    brandAria: "Back to home",
    navAria: "Main navigation",
    languageAria: "Select language",
    whatsappAria: "Chat on WhatsApp",
    projectsSelectorAria: "Select project",
    projectsAria: "Projects",
    caseNavAria: "Project navigation",
    caseTopAria: "Back to the beginning of the project",
    stepsAria: "Project steps",
    tagsAria: "Project categories",
    executiveAria: "Executive summary",
    heroEvidenceAria: "Main evidence",
    heroMediaAria: "Pending main image",
    processMapAria: "Previous process flow",
    architectureAria: "AGA Studio summary architecture"
  },
  es: {
    brandAria: "Volver al inicio",
    navAria: "Navegación principal",
    languageAria: "Seleccionar idioma",
    whatsappAria: "Conversar por WhatsApp",
    projectsSelectorAria: "Seleccionar proyecto",
    projectsAria: "Proyectos",
    caseNavAria: "Navegación del proyecto",
    caseTopAria: "Volver al inicio del proyecto",
    stepsAria: "Etapas del proyecto",
    tagsAria: "Categorías del proyecto",
    executiveAria: "Resumen ejecutivo",
    heroEvidenceAria: "Evidencias principales",
    heroMediaAria: "Imagen principal pendiente",
    processMapAria: "Flujo anterior del proceso",
    architectureAria: "Arquitectura resumida de AGA Studio"
  }
};

const textElements = [...document.querySelectorAll("[data-i18n]")];
const ariaElements = [...document.querySelectorAll("[data-i18n-aria]")];

textElements.forEach((element) => {
  element.dataset.i18nDefault = element.textContent.trim();
});

ariaElements.forEach((element) => {
  element.dataset.i18nAriaDefault = element.getAttribute("aria-label") || "";
});

function languageFromContext() {
  const requested = new URL(window.location.href).searchParams.get("lang");
  if (["pt", "en", "es"].includes(requested)) return requested;
  const saved = window.localStorage.getItem("portfolio-language");
  if (["pt", "en", "es"].includes(saved)) return saved;
  return "pt";
}

function applyLanguage(language) {
  const dictionary = translations[language] || {};
  const ariaDictionary = ariaTranslations[language] || {};

  textElements.forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = dictionary[key] || element.dataset.i18nDefault;
  });

  ariaElements.forEach((element) => {
    const key = element.dataset.i18nAria;
    element.setAttribute("aria-label", ariaDictionary[key] || element.dataset.i18nAriaDefault);
  });

  document.documentElement.lang = language === "pt" ? "pt-BR" : language;
  document.title = metadata[language].title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", metadata[language].description);

  document.querySelectorAll("[data-lang-option]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.langOption === language));
  });

  document.querySelectorAll("[data-project-target]").forEach((link) => {
    link.setAttribute("href", `../../projetos/?project=${encodeURIComponent(link.dataset.projectTarget)}&lang=${language}`);
  });
  document.querySelectorAll("[data-projects-index]").forEach((link) => {
    link.setAttribute("href", `../../projetos/?lang=${language}`);
  });
  document.querySelector("[data-aga-project-link]")?.setAttribute("href", `./?lang=${language}`);

  window.localStorage.setItem("portfolio-language", language);
  const url = new URL(window.location.href);
  url.searchParams.set("lang", language);
  window.history.replaceState({}, "", url);
}

document.querySelectorAll("[data-lang-option]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.langOption));
});

applyLanguage(languageFromContext());

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -6%" });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const header = document.querySelector(".site-header");
const updateHeader = () => document.body.classList.toggle("is-scrolled", window.scrollY > 12);
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

const sections = [...document.querySelectorAll(".story-section[id]")];
const anchorLinks = [...document.querySelectorAll(".case-anchor-nav a")];
if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    anchorLinks.forEach((link) => {
      link.classList.toggle("is-current", link.getAttribute("href") === `#${visible.target.id}`);
    });
  }, { threshold: [0.2, 0.45, 0.7], rootMargin: "-28% 0px -58%" });

  sections.forEach((section) => sectionObserver.observe(section));
}
