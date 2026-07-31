(function () {
  var page = document.querySelector('.section-course-lessons');
  if (!page) return;

  var showAllBtn = page.querySelector('[data-course-show-all]');
  var extraCards = page.querySelectorAll('.course-lesson-card--extra');
  if (showAllBtn && extraCards.length) {
    showAllBtn.addEventListener('click', function () {
      var opened = showAllBtn.classList.contains('is-opened');
      extraCards.forEach(function (card) {
        card.hidden = opened;
      });
      showAllBtn.classList.toggle('is-opened', !opened);
      var textEl = showAllBtn.querySelector('.course-lessons__more-text');
      if (textEl) {
        textEl.textContent = opened ? 'Показать все уроки' : 'Скрыть дополнительные уроки';
      }
    });
  }

  var bannerClose = document.querySelector('[data-course-webinar-close]');
  var bannerSection = document.querySelector('[data-course-webinar-banner]');
  if (bannerClose && bannerSection) {
    bannerClose.addEventListener('click', function () {
      bannerSection.style.display = 'none';
    });
  }

  document.querySelectorAll('.course-schedule').forEach(function (schedule, scheduleIndex) {
    var tabList = schedule.querySelector('.course-schedule__tabs');
    var tabs = Array.prototype.slice.call(schedule.querySelectorAll('.course-schedule__tab'));
    if (!tabList || !tabs.length) return;

    tabList.setAttribute('role', 'tablist');

    function activateTab(activeIndex, moveFocus) {
      tabs.forEach(function (tab, tabIndex) {
        var isActive = tabIndex === activeIndex;
        tab.classList.toggle('course-schedule__tab--active', isActive);
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        tab.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      schedule.setAttribute('data-active-tab', String(activeIndex));
      if (moveFocus) tabs[activeIndex].focus();
    }

    tabs.forEach(function (tab, tabIndex) {
      tab.setAttribute('id', 'course-schedule-tab-' + scheduleIndex + '-' + tabIndex);

      tab.addEventListener('click', function () {
        activateTab(tabIndex, false);
      });

      tab.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

        event.preventDefault();
        var direction = event.key === 'ArrowRight' ? 1 : -1;
        var nextIndex = (tabIndex + direction + tabs.length) % tabs.length;
        activateTab(nextIndex, true);
      });
    });

    var initialIndex = tabs.findIndex(function (tab) {
      return tab.classList.contains('course-schedule__tab--active');
    });
    activateTab(initialIndex === -1 ? 0 : initialIndex, false);
  });
})();
