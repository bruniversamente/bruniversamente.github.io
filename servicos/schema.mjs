import {calculateSelection, campaignIsActive} from './pricing.mjs?v=20261114-bf';

export const pageUrl = 'https://bruniversamente.github.io/servicos/';
export const pageTitle = 'Criação de sites e identidade visual | Bruno Nascimento';
export const pageDescription = 'Sites, identidade visual e marketing digital para pequenos negócios. Compare pacotes, conheça os trabalhos e fale direto com Bruno.';
const siteUrl = 'https://bruniversamente.github.io/';
const personId = siteUrl + '#person';
const websiteId = siteUrl + '#website';
const catalogId = pageUrl + '#catalogo';
const serviceId = id => pageUrl + '#servico-' + id;
const descriptions = {
  sites: 'Criação de sites para apresentar seu negócio e facilitar o contato.',
  marca: 'Identidade visual e site para o seu negócio.',
  divulgacao: 'Conteúdo para Instagram, anúncios e presença nas buscas do Google.'
};

// Used in the initial HTML too: the provider and page remain described without JavaScript.
export function buildServicesSchema(catalog, {now = Date.now()} = {}) {
  const paths = catalog?.paths ?? [
    {id: 'sites', short: 'Sites'},
    {id: 'marca', short: 'Marca e site'},
    {id: 'divulgacao', short: 'Marketing digital'}
  ];
  const graph = [
    {'@type': 'Person', '@id': personId, name: 'Bruno Nascimento', url: siteUrl,
      sameAs: ['https://www.behance.net/bruniversamente', 'https://www.instagram.com/bruniversamente/', 'https://www.linkedin.com/in/bruniversamente/']},
    {'@type': 'WebSite', '@id': websiteId, name: 'Bruno Nascimento', url: siteUrl,
      publisher: {'@id': personId}, inLanguage: ['pt-BR', 'en-US', 'es-ES']},
    {'@type': 'ImageObject', '@id': pageUrl + '#imagem',
      url: pageUrl + 'assets/social/servicos-bruno-nascimento.jpg', width: 1200, height: 630,
      caption: 'Seu negócio merece ser visto. Sites, marca e conteúdo por Bruno Nascimento.'},
    {'@type': 'WebPage', '@id': pageUrl + '#webpage', url: pageUrl,
      name: pageTitle,
      description: pageDescription,
      inLanguage: 'pt-BR', isPartOf: {'@id': websiteId}, author: {'@id': personId},
      primaryImageOfPage: {'@id': pageUrl + '#imagem'},
      mainEntity: paths.map(path => ({'@id': serviceId(path.id)}))}
  ];
  for (const path of paths) {
    graph.push({'@type': 'Service', '@id': serviceId(path.id), name: path.short,
      description: descriptions[path.id], serviceType: path.short,
      url: pageUrl + '#pacotes', provider: {'@id': personId},
      ...(catalog ? {hasOfferCatalog: {'@id': catalogId + '-' + path.id}} : {})});
  }
  if (catalog) {
    const active = campaignIsActive(catalog, now);
    const catalogs = paths.map(path => ({
      '@type': 'OfferCatalog', '@id': catalogId + '-' + path.id, name: path.short,
      numberOfItems: path.options.length,
      itemListElement: path.options.map(option => {
        const selection = {path: path.id, package: option.id, addons: []};
        const total = calculateSelection(catalog, selection, {now});
        const regular = calculateSelection(catalog, selection, {now, regular: true});
        const reduced = active && (total.initial < regular.initial || total.monthly < regular.monthly);
        const name = path.short + ' — ' + option.title;
        const components = [];
        if (total.initial) components.push({'@type': 'PriceSpecification', price: total.initial, priceCurrency: 'BRL'});
        if (total.monthly) components.push({'@type': 'UnitPriceSpecification', price: total.monthly,
          priceCurrency: 'BRL', unitCode: 'MON', unitText: 'mês', billingIncrement: 1,
          referenceQuantity: {'@type': 'QuantitativeValue', value: 1, unitCode: 'MON', unitText: 'mês'}});
        return {'@type': 'Offer', '@id': pageUrl + '#oferta-' + path.id + '-' + option.id,
          name, url: pageUrl + '#pacotes', seller: {'@id': personId},
          // Base packages only: visitor selections and optional add-ons never enter this graph.
          ...(components.length === 1 ? {price: total.initial || total.monthly, priceCurrency: 'BRL'} : {}),
          priceSpecification: components.length === 1 ? components[0] : components,
          ...(reduced ? {validFrom: catalog.campaign.starts_at,
            validThrough: new Date(Date.parse(catalog.campaign.ends_at) - 1).toISOString()} : {}),
          itemOffered: {'@type': 'Service', '@id': pageUrl + '#pacote-' + path.id + '-' + option.id,
            name, description: option.description, serviceType: path.short,
            provider: {'@id': personId}, isRelatedTo: {'@id': serviceId(path.id)}}};
      })
    }));
    graph.push({'@type': 'OfferCatalog', '@id': catalogId, name: 'Pacotes de serviços de Bruno Nascimento',
      numberOfItems: paths.length, itemListElement: catalogs});
    graph[0].hasOfferCatalog = {'@id': catalogId};
  }
  return {'@context': 'https://schema.org', '@graph': graph};
}

export function serializeSchema(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
