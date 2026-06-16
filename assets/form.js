(function () {
  const toggle = document.querySelector('[data-form-menu-toggle]');
  const nav = document.querySelector('[data-form-nav]');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();
