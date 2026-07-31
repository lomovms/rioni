/**
 * Cookie: первый показ при отсутствии localStorage rioni_cookie_consent
 * Онбординг / auth: открытие по data-popup; имя онбординга — rioni_last_login
 *
 * «Возобновить регистрацию»: после submitForm() в registration-form пишется
 * rioni_onboarding_resume_pending; при загрузке страницы показывается попап онбординга;
 * ключ удаляется после верного SMS или закрытия попапа (см. заказчик).
 */
(function () {
  var COOKIE_KEY = 'rioni_cookie_consent';
  var LOGIN_KEY = 'rioni_last_login';
  /** Выставляется в registration-form после перехода к шагу с SMS */
  var ONBOARDING_RESUME_KEY = 'rioni_onboarding_resume_pending';

  function getCurrentPopupHref() {
    if (typeof $ === 'undefined' || !$.magnificPopup || !$.magnificPopup.instance) return '';
    var mp = $.magnificPopup.instance;
    if (!mp.currItem) return '';
    var el = mp.currItem.el && mp.currItem.el[0];
    return (el && $(el).attr('href')) || mp.currItem.src || '';
  }

  function syncOnboardingName() {
    var href = getCurrentPopupHref();
    if (href !== '#onboarding-resume-popup') return;
    var span = document.getElementById('onboarding-resume-name');
    if (!span) return;
    var name = '';
    try {
      name = (window.localStorage && localStorage.getItem(LOGIN_KEY)) || '';
    } catch (e) {}
    span.textContent = name.trim() || 'друг';
  }

  if (typeof $ !== 'undefined') {
    $(document).on('mfpOpen.mfp', function () {
      syncOnboardingName();
    });
  }

  function closePopup() {
    if (typeof $ !== 'undefined' && $.magnificPopup) {
      $.magnificPopup.close();
    }
  }

  function openRegistrationAfterClose() {
    setTimeout(function () {
      if (typeof $ !== 'undefined' && $.magnificPopup) {
        $.magnificPopup.open({
          items: { src: '#registration-form' },
          type: 'inline',
          mainClass: 'mfp-zoom-in',
          closeMarkup: '<button title="Закрыть" type="button" class="mfp-close popup__close"></button>',
          removalDelay: 500
        });
      }
    }, 350);
  }

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t.closest) return;

    var accept = t.closest('[data-cookie-accept]');
    if (accept) {
      e.preventDefault();
      var v = accept.getAttribute('data-cookie-accept');
      try {
        localStorage.setItem(COOKIE_KEY, v === 'essential' ? 'essential' : 'all');
      } catch (err) {}
      closePopup();
      return;
    }

    var cont = t.closest('[data-onboarding-continue]');
    if (cont) {
      e.preventDefault();
      closePopup();
      openRegistrationAfterClose();
      return;
    }

    var soonClose = t.closest('[data-soon-available-close]');
    if (soonClose) {
      e.preventDefault();
      closePopup();
    }
  });

  var cookieBannerScheduled = false;

  function tryOpenCookieBanner() {
    if (cookieBannerScheduled) return true;
    if (!document.getElementById('cookie-consent-popup')) return true;
    try {
      if (localStorage.getItem(COOKIE_KEY)) return true;
    } catch (e) {
      return true;
    }
    if (typeof $ === 'undefined' || !$.magnificPopup) return false;

    cookieBannerScheduled = true;
    setTimeout(function () {
      $.magnificPopup.open({
        items: { src: '#cookie-consent-popup' },
        type: 'inline',
        mainClass: 'mfp-zoom-in mfp-cookie-modal',
        closeMarkup: '<button title="Закрыть" type="button" class="mfp-close popup__close"></button>',
        removalDelay: 500,
        modal: true,
        closeOnBgClick: false,
        showCloseBtn: false,
        enableEscapeKey: false,
        callbacks: {
          open: function () {
            var el = document.getElementById('cookie-consent-popup');
            if (el) el.setAttribute('aria-hidden', 'false');
          },
          afterClose: function () {
            var el = document.getElementById('cookie-consent-popup');
            if (el) el.setAttribute('aria-hidden', 'true');
            setTimeout(scheduleOnboardingResumePopup, 400);
          }
        }
      });
    }, 400);
    return true;
  }

  function scheduleCookieBanner() {
    var n = 0;
    var id = setInterval(function () {
      n++;
      if (tryOpenCookieBanner() || n >= 60) clearInterval(id);
    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleCookieBanner);
  } else {
    scheduleCookieBanner();
  }

  function hasOnboardingResumePending() {
    try {
      return !!localStorage.getItem(ONBOARDING_RESUME_KEY);
    } catch (e) {
      return false;
    }
  }

  function hasCookieConsent() {
    try {
      return !!localStorage.getItem(COOKIE_KEY);
    } catch (e) {
      return false;
    }
  }

  function clearOnboardingResumePending() {
    try {
      localStorage.removeItem(ONBOARDING_RESUME_KEY);
    } catch (e) {}
  }

  /**
   * Показать попап онбординга, если есть rioni_onboarding_resume_pending и не открыт другой MFP.
   */
  function scheduleOnboardingResumePopup() {
    if (!document.getElementById('onboarding-resume-popup')) return;
    if (!hasOnboardingResumePending()) return;
    if (typeof window.$ === 'undefined' || !window.$.magnificPopup) return;

    function tryOpen() {
      if (!hasOnboardingResumePending()) return;
      var mp = window.$.magnificPopup.instance;
      if (mp && mp.isOpen) {
        window.$(document).one('mfpAfterClose', function () {
          setTimeout(tryOpen, 450);
        });
        return;
      }
      if (typeof window.rioniOpenOnboardingPopup === 'function') {
        window.rioniOpenOnboardingPopup();
      }
    }

    setTimeout(tryOpen, 500);
  }

  if (typeof window.$ !== 'undefined') {
    window.$(document).on('mfpAfterClose.mfpOnboarding', function () {
      if (window._rioniClearPendingAfterOnboardingClose) {
        window._rioniClearPendingAfterOnboardingClose = false;
        clearOnboardingResumePending();
      }
    });
    window.$(document).on('mfpBeforeClose.mfpOnboarding', function () {
      window._rioniClearPendingAfterOnboardingClose = false;
      var mp = window.$.magnificPopup.instance;
      if (!mp || !mp.currItem) return;
      var href =
        (mp.currItem.el &&
          mp.currItem.el[0] &&
          window.$(mp.currItem.el[0]).attr('href')) ||
        mp.currItem.src ||
        '';
      if (href === '#onboarding-resume-popup') {
        window._rioniClearPendingAfterOnboardingClose = true;
      }
    });
  }

  setTimeout(function initOnboardingResumeFromStorage() {
    if (!hasOnboardingResumePending()) return;
    if (!hasCookieConsent()) return;
    scheduleOnboardingResumePopup();
  }, 900);

  /** Общие опции Magnific для системных inline-попапов (как в app.js / popup) */
  var MFP_SITE_POPUP = {
    type: 'inline',
    mainClass: 'mfp-zoom-in',
    closeMarkup: '<button title="Закрыть" type="button" class="mfp-close popup__close"></button>',
    removalDelay: 500
  };

  function openSiteInlinePopup(src) {
    if (typeof window.$ === 'undefined' || !window.$.magnificPopup) {
      return false;
    }
    window.$.magnificPopup.open(
      window.$.extend({ items: { src: src } }, MFP_SITE_POPUP)
    );
    return true;
  }

  /**
   * Глобально: попап «продолжить регистрацию / онбординг» (#onboarding-resume-popup).
   * @param {Object} [options]
   * @param {string} [options.displayName] — имя в тексте (если не задано, при открытии подставится localStorage rioni_last_login или «друг»)
   */
  window.rioniOpenOnboardingPopup = function (options) {
    options = options || {};
    if (options.displayName !== undefined) {
      var nameSpan = document.getElementById('onboarding-resume-name');
      if (nameSpan) {
        var n = options.displayName == null ? '' : String(options.displayName).trim();
        nameSpan.textContent = n || 'друг';
      }
    }
    return openSiteInlinePopup('#onboarding-resume-popup');
  };

  /**
   * Глобально: открыть попап входа (#login-form).
   */
  window.rioniOpenLoginPopup = function () {
    return openSiteInlinePopup('#login-form');
  };

  /**
   * Глобально: открыть попап регистрации (#registration-form).
   */
  window.rioniOpenRegistrationPopup = function () {
    return openSiteInlinePopup('#registration-form');
  };

  /**
   * Глобально: попап восстановления доступа (#password-recovery-popup).
   */
  window.rioniOpenPasswordRecoveryPopup = function () {
    return openSiteInlinePopup('#password-recovery-popup');
  };

  /**
   * Глобально: открыть форму регистрации сразу в состоянии lockout.
   * Используется для сценария «превышено количество попыток».
   */
  window.rioniOpenRegistrationLockoutPopup = function () {
    var opened = openSiteInlinePopup('#registration-form');
    if (!opened) return false;

    // После открытия принудительно выставляем нужное состояние.
    setTimeout(function () {
      var regModal = document.getElementById('registration-form');
      if (regModal) {
        regModal.setAttribute('data-state', 'lockout');
      }
    }, 0);

    return true;
  };

  /**
   * Глобально: попап «нужна авторизация» (#auth-required-popup) — регистрация / вход.
   */
  window.rioniOpenAuthRequiredPopup = function () {
    return openSiteInlinePopup('#auth-required-popup');
  };

  /**
   * Глобально: попап «нужен брокерский счет» (#broker-account-required-popup).
   */
  window.rioniOpenBrokerAccountRequiredPopup = function () {
    return openSiteInlinePopup('#broker-account-required-popup');
  };

  /**
   * Глобально: попап «доступ запрещен» (#access-denied-popup).
   */
  window.rioniOpenAccessDeniedPopup = function () {
    return openSiteInlinePopup('#access-denied-popup');
  };

  /**
   * Глобально: попап «скоро будет доступно».
   * @param {Object} [options]
   * @param {string} [options.title]
   * @param {string} [options.text]
   */
  window.rioniOpenSoonAvailablePopup = function (options) {
    options = options || {};
    var titleNode = document.getElementById('soon-available-title');
    var textNode = document.getElementById('soon-available-text');
    if (titleNode && options.title != null) {
      titleNode.textContent = String(options.title);
    }
    if (textNode && options.text != null) {
      textNode.textContent = String(options.text);
    }
    return openSiteInlinePopup('#soon-available-popup');
  };

  /**
   * Глобально: попап консультации по тарифам (#tariff-consultation-popup).
   */
  window.rioniOpenTariffConsultationPopup = function () {
    return openSiteInlinePopup('#tariff-consultation-popup');
  };

  /**
   * Глобально: popup «что-то пошло не так».
   */
  window.rioniOpenRegistrationSomethingWrongPopup = function () {
    return openSiteInlinePopup('#registration-something-wrong-popup');
  };

  /**
   * Глобально: popup «сервис временно недоступен».
   */
  window.rioniOpenRegistrationServiceUnavailablePopup = function () {
    return openSiteInlinePopup('#registration-service-unavailable-popup');
  };

  /**
   * Глобально: popup «вход недоступен для данного пользователя».
   */
  window.rioniOpenRegistrationBannedPopup = function () {
    return openSiteInlinePopup('#registration-banned-popup');
  };

  /**
   * Глобально: popup «регистрация завершена».
   * @param {Object} [options]
   * @param {string} [options.email]
   */
  window.rioniOpenRegistrationCompletedPopup = function (options) {
    options = options || {};
    var emailNode = document.getElementById('registration-completed-email');
    if (emailNode && options.email !== undefined) {
      var email = options.email == null ? '' : String(options.email).trim();
      emailNode.textContent = email || 'takoytotam@mail.ru';
    }
    return openSiteInlinePopup('#registration-completed-popup');
  };

  /**
   * Единый глобальный API для вызова попапов из бизнес-логики приложения.
   */
  window.rioniPopups = {
    openLogin: window.rioniOpenLoginPopup,
    openRegistration: window.rioniOpenRegistrationPopup,
    openPasswordRecovery: window.rioniOpenPasswordRecoveryPopup,
    openRegistrationLockout: window.rioniOpenRegistrationLockoutPopup,
    openRegistrationSomethingWrong: window.rioniOpenRegistrationSomethingWrongPopup,
    openRegistrationServiceUnavailable: window.rioniOpenRegistrationServiceUnavailablePopup,
    openRegistrationBanned: window.rioniOpenRegistrationBannedPopup,
    openRegistrationCompleted: window.rioniOpenRegistrationCompletedPopup,
    openAuthRequired: window.rioniOpenAuthRequiredPopup,
    openBrokerAccountRequired: window.rioniOpenBrokerAccountRequiredPopup,
    openAccessDenied: window.rioniOpenAccessDeniedPopup,
    openSoonAvailable: window.rioniOpenSoonAvailablePopup,
    openTariffConsultation: window.rioniOpenTariffConsultationPopup,
    openOnboarding: window.rioniOpenOnboardingPopup
  };

  /**
   * Сброс флага «нужно показать онбординг» (тот же ключ, что после submitForm).
   */
  window.rioniClearOnboardingResumePending = clearOnboardingResumePending;
})();
