(() => {
  const cards = [...document.querySelectorAll('[data-atlas]')];
  const search = document.querySelector('#atlas-search');
  const status = document.querySelector('#results-status');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  let category = 'all';
  function update() {
    const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let count = 0;
    for (const card of cards) {
      const haystack = (card.dataset.search + ' ' + card.textContent).toLowerCase();
      const visible = (category === 'all' || card.dataset.category === category) && words.every(word => haystack.includes(word));
      card.hidden = !visible;
      if (visible) count++;
    }
    buttons.forEach(button => {
      const active = button.dataset.filter === category;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    status.textContent = `${count} ${count === 1 ? 'atlas' : 'atlases'}${words.length || category !== 'all' ? ' found' : ' to explore'}`;
    document.querySelector('#empty-state').hidden = count !== 0;
  }
  search.addEventListener('input', update);
  buttons.forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; update(); }));
  document.querySelector('#clear-filters').addEventListener('click', () => { category = 'all'; search.value = ''; update(); search.focus(); });
  document.querySelector('#other-filter').hidden = !cards.some(card => card.dataset.category === 'other');
  document.querySelector('#filters').hidden = false;
  update();
})();
