/**
 * Окно входа:
 * - переключение видимости пароля (eye icon)
 */
(function () {
  var modal = document.getElementById('login-form');
  if (!modal) return;

  var toggles = modal.querySelectorAll('[data-login-toggle-password]');
  var passwordInputs = modal.querySelectorAll('[data-login-password]');

  toggles.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var wrap = btn.closest('.login-form__password-wrap');
      var input = wrap && wrap.querySelector('[data-login-password]');
      if (!input) return;

      var hiddenIcon = btn.querySelector('.login-form__toggle-icon--hidden');
      var visibleIcon = btn.querySelector('.login-form__toggle-icon--visible');

      if (input.type === 'password') {
        input.type = 'text';
        btn.setAttribute('aria-label', 'Скрыть пароль');
        if (hiddenIcon) hiddenIcon.style.display = 'none';
        if (visibleIcon) visibleIcon.style.display = 'block';
      } else {
        input.type = 'password';
        btn.setAttribute('aria-label', 'Показать пароль');
        if (hiddenIcon) hiddenIcon.style.display = 'block';
        if (visibleIcon) visibleIcon.style.display = 'none';
      }
    });
  });
})();

