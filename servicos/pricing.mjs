// The same price calculation runs in the landing and in the lead endpoint.
const cents = value => Math.round((value ?? 0) * 100);
const reais = value => value / 100;
const partsKey = parts => [...parts].sort().join('+');

export function campaignIsActive(catalog, now = Date.now()) {
  const campaign = catalog.campaign;
  return !!campaign && now >= Date.parse(campaign.starts_at) && now < Date.parse(campaign.ends_at);
}

export function partCost(catalog, id, {now = Date.now(), regular = false} = {}) {
  const part = catalog.packages[id];
  if (!part) throw Error('unknown_part');
  const active = !regular && campaignIsActive(catalog, now);
  const initial = active && Object.hasOwn(catalog.campaign.part_prices, id)
    ? catalog.campaign.part_prices[id]
    : (!catalog.campaign && !regular ? part.promo ?? part.price ?? 0 : part.price ?? 0);
  return {initial, monthly: part.monthly ?? 0};
}

export function calculateSelection(catalog, selection, {now = Date.now(), regular = false} = {}) {
  const option = catalog.paths.find(path => path.id === selection.path)?.options.find(item => item.id === selection.package);
  if (!option) throw Error('unknown_package');
  const selected = new Set([...option.parts, ...(selection.addons ?? [])]);
  const settings = {now, regular};
  const sum = ids => [...ids].reduce((total, id) => {
    const price = partCost(catalog, id, settings);
    return {initial: total.initial + cents(price.initial), monthly: total.monthly + cents(price.monthly)};
  }, {initial: 0, monthly: 0});
  const raw = sum(selected);
  const active = !regular && campaignIsActive(catalog, now);
  const candidates = catalog.combos.filter(combo => combo.parts.every(id => selected.has(id))).map(combo => {
    const separate = sum(combo.parts);
    const promotional = active ? catalog.campaign.combo_prices[partsKey(combo.parts)] : undefined;
    const initial = Math.min(cents(combo.price), promotional === undefined ? Infinity : cents(promotional));
    // Compare against the prices in effect, never against a historic saving.
    return {...combo, initialSaving: separate.initial - initial, monthlySaving: separate.monthly - cents(combo.monthly)};
  }).filter(combo => combo.initialSaving >= 0 && combo.monthlySaving >= 0 && (combo.initialSaving > 0 || combo.monthlySaving > 0));
  let best = {initialSaving: 0, monthlySaving: 0};
  function visit(index, used, initialSaving, monthlySaving) {
    if (index === candidates.length) {
      if (initialSaving > best.initialSaving || (initialSaving === best.initialSaving && monthlySaving > best.monthlySaving)) best = {initialSaving, monthlySaving};
      return;
    }
    visit(index + 1, used, initialSaving, monthlySaving);
    const combo = candidates[index];
    if (combo.parts.every(id => !used.has(id))) visit(index + 1, new Set([...used, ...combo.parts]), initialSaving + combo.initialSaving, monthlySaving + combo.monthlySaving);
  }
  visit(0, new Set(), 0, 0);
  return {
    initial: reais(raw.initial - best.initialSaving), monthly: reais(raw.monthly - best.monthlySaving),
    initialSaving: reais(best.initialSaving), monthlySaving: reais(best.monthlySaving)
  };
}

export function projectPayments(total) {
  const entry = Math.round(cents(total) / 2);
  return {entry: reais(entry), delivery: reais(cents(total) - entry)};
}
