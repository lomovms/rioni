import flatpickr from 'flatpickr';
import { Russian } from 'flatpickr/dist/l10n/ru';
import 'flatpickr/dist/flatpickr.css';

(function () {
  var page = document.querySelector('.section-learning-courses');
  if (!page) return;

  var tabs = page.querySelectorAll('[data-learning-tab]');
  var panels = page.querySelectorAll('[data-learning-panel]');

  function activateTab(key) {
    tabs.forEach(function (tab) {
      var isActive = tab.getAttribute('data-learning-tab') === key;
      tab.classList.toggle('learning-tabs__control--active', isActive);
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    panels.forEach(function (panel) {
      var isActive = panel.getAttribute('data-learning-panel') === key;
      panel.classList.toggle('learning-tabs__panel--active', isActive);
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateTab(tab.getAttribute('data-learning-tab'));
    });
  });

  var showAllBtn = page.querySelector('[data-learning-show-all]');
  var coursesGrid = page.querySelector('.learning-courses__grid');
  var extraCards = page.querySelectorAll('.learning-course-card--extra');
  if (coursesGrid && showAllBtn && extraCards.length) {
    coursesGrid.classList.remove('is-expanded');
    showAllBtn.addEventListener('click', function () {
      var opened = showAllBtn.classList.contains('is-opened');
      var nextOpened = !opened;
      showAllBtn.classList.toggle('is-opened', nextOpened);
      coursesGrid.classList.toggle('is-expanded', nextOpened);
      var textEl = showAllBtn.querySelector('.learning-courses__more-text');
      if (textEl) {
        textEl.textContent = opened ? 'Показать все курсы' : 'Скрыть дополнительные курсы';
      }
    });
  }

  var bannerClose = document.querySelector('[data-learning-test-banner-close]');
  var bannerSection = document.querySelector('[data-learning-test-banner]');
  if (bannerClose && bannerSection) {
    bannerClose.addEventListener('click', function () {
      bannerSection.style.display = 'none';
    });
  }

  var scheduleTabsWrap = document.querySelector('.learning-schedule__tabs');
  if (scheduleTabsWrap) {
    var scheduleTabs = scheduleTabsWrap.querySelectorAll('.learning-schedule__tab');
    scheduleTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        scheduleTabs.forEach(function (item) {
          item.classList.remove('learning-schedule__tab--active');
        });
        tab.classList.add('learning-schedule__tab--active');
      });
    });
  }

  var calendarBtn = document.querySelector('.learning-schedule__calendar-btn');
  var datepickerInput = document.querySelector('#learning-schedule-datepicker');
  if (calendarBtn && datepickerInput) {
    var picker = flatpickr(datepickerInput, {
      locale: Russian,
      disableMobile: true,
      mode: 'range',
      defaultDate: ['2025-04-01', '2025-04-07'],
      dateFormat: 'd.m.Y',
      position: 'auto left',
      positionElement: calendarBtn,
      monthSelectorType: 'static',
      clickOpens: false,
      prevArrow: '<svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.625 1L1.625 9L9.625 17" stroke="#0F171F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      nextArrow: '<svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.375 1L9.375 9L1.375 17" stroke="#0F171F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
      onReady: function (selectedDates, dateStr, instance) {
        instance.calendarContainer.classList.add('learning-schedule-datepicker-popup');
        instance.calendarContainer.style.zIndex = '9999';
      },
    });

    calendarBtn.addEventListener('click', function (event) {
      event.preventDefault();
      if (picker.isOpen) {
        picker.close();
        return;
      }
      picker.open(undefined, calendarBtn);
    });
  }
})();

(function () {
  var blocks = document.querySelectorAll('.learning-books');
  if (!blocks.length) return;

  blocks.forEach(function (block) {
    var grid = block.querySelector('[data-learning-books-grid]');
    var prevBtn = block.querySelector('[data-learning-books-prev]');
    var nextBtn = block.querySelector('[data-learning-books-next]');
    if (!grid || !prevBtn || !nextBtn) return;

    function getStep() {
      var card = grid.querySelector('.learning-book-card');
      if (!card) return grid.clientWidth;

      var gap = parseFloat(window.getComputedStyle(grid).columnGap || window.getComputedStyle(grid).gap || '0');
      return card.getBoundingClientRect().width + gap;
    }

    function updateButtonState() {
      var hasExtraBooks = grid.querySelectorAll('.learning-book-card').length > 4;
      var canScroll = hasExtraBooks && grid.scrollWidth - grid.clientWidth > 8;
      var isStart = grid.scrollLeft <= 8;
      var isEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 8;
      prevBtn.hidden = !canScroll || isStart;
      nextBtn.hidden = !canScroll || isEnd;
      prevBtn.classList.toggle('is-disabled', !canScroll || isStart);
      nextBtn.classList.toggle('is-disabled', !canScroll || isEnd);
    }

    prevBtn.addEventListener('click', function () {
      grid.scrollBy({
        left: -getStep(),
        behavior: 'smooth',
      });
    });

    nextBtn.addEventListener('click', function () {
      var step = getStep();

      grid.scrollBy({
        left: step,
        behavior: 'smooth',
      });
    });

    grid.addEventListener('scroll', updateButtonState, { passive: true });
    window.addEventListener('resize', updateButtonState);
    updateButtonState();
  });
})();
