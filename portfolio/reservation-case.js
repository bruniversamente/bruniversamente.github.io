/* A reading aid for this case. It never calls the product or creates a booking. */
(() => {
  let sequence = 0;
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function renderJourney(item, signal) {
    const root = element('section', 'reservation-journey');
    root.setAttribute('aria-label', item.title);
    const controls = element('div', 'reservation-journey-controls');
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', 'Etapas da jornada de reserva');
    const panel = element('div', 'reservation-journey-panel');
    panel.id = `reservation-journey-${++sequence}`;
    panel.setAttribute('aria-live', 'polite');
    panel.setAttribute('aria-atomic', 'true');
    const buttons = [];
    function show(index) {
      const step = item.steps[index];
      buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      const heading = element('h3', 'reservation-journey-title', step.title);
      const sides = element('div', 'reservation-journey-sides');
      [['Cliente', step.customer], ['Clube', step.club]].forEach(([label, text]) => {
        const side = element('div', 'reservation-journey-side');
        side.append(element('p', 'reservation-case-label', label), element('p', '', text));
        sides.append(side);
      });
      const handoff = element('div', 'reservation-journey-handoff');
      handoff.append(element('span', 'reservation-case-label', 'Informação compartilhada'), element('p', '', step.handoff));
      const link = element('a', 'button', 'Ver esta etapa no case ↓');
      link.href = `#chapter-${step.chapter}`;
      panel.replaceChildren(heading, sides, handoff, link);
    }
    item.steps.forEach((step, index) => {
      const button = element('button', 'button reservation-journey-button');
      button.type = 'button';
      button.setAttribute('aria-controls', panel.id);
      const number = element('span', 'reservation-journey-number', String(index + 1));
      number.setAttribute('aria-hidden', 'true');
      button.append(number, document.createTextNode(step.label));
      button.addEventListener('click', () => show(index), {signal});
      buttons.push(button);
      controls.append(button);
    });
    root.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link || !root.contains(link) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const section = document.getElementById(link.hash.slice(1));
      if (!section) return;
      event.preventDefault();
      const url = new URL(location.href);
      url.hash = section.id;
      history.replaceState({...history.state}, '', url);
      section.focus({preventScroll: true});
      section.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start'});
    }, {signal});
    root.append(controls, panel);
    show(0);
    return root;
  }
  window.reservationCase = {renderJourney};
})();
