export default function initDisclosurePage() {
  const root = document.querySelector('.disclosure');
  if (!root) return;

  const search = root.querySelector('[data-disclosure-search]');
  const searchable = [...root.querySelectorAll('.disclosure-file, .disclosure-list details')];

  if (search) {
    search.addEventListener('input', () => {
      const query = search.value.trim().toLocaleLowerCase('ru');
      searchable.forEach((item) => {
        item.hidden = query !== '' && !item.textContent.toLocaleLowerCase('ru').includes(query);
      });
    });
  }

  root.querySelectorAll('[data-disclosure-years]').forEach((years) => {
    [...years.querySelectorAll('[data-report-year]')]
      .sort((a, b) => Number(b.dataset.reportYear) - Number(a.dataset.reportYear))
      .forEach((year, index) => {
        year.hidden = index > 2;
        years.appendChild(year);
      });
  });
}
