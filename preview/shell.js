/** Injects shared header, footer, cart drawer. Call FORM_renderShell({ active }) */
window.FORM_renderShell = function (opts) {
  const active = opts?.active || '';
  const ann = window.FORM.announcement;

  document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="form-announcement" role="region">${ann}</div>
    <header class="form-header" role="banner">
      <div class="form-container form-header__inner">
        <a href="index.html" class="form-header__logo">${window.FORM.brand.name}</a>
        <nav class="form-header__nav" data-form-nav aria-label="Main">
          <a href="shop.html"${active === 'shop' ? ' aria-current="page"' : ''}>Shop</a>
          <a href="science.html"${active === 'science' ? ' aria-current="page"' : ''}>Science</a>
          <a href="index.html#about">About</a>
        </nav>
        <div class="form-header__actions">
          <button type="button" class="form-menu-toggle" data-form-menu-toggle aria-expanded="false">Menu</button>
          <a href="#" class="form-header__icon" data-form-open-cart>
            Cart <span class="form-cart-count" data-form-cart-count hidden>0</span>
          </a>
        </div>
      </div>
    </header>`,
  );

  document.body.insertAdjacentHTML(
    'beforeend',
    `
    <footer class="form-footer" role="contentinfo">
      <div class="form-container">
        <div class="form-footer__grid">
          <div>
            <a href="index.html" class="form-footer__brand">${window.FORM.brand.name}</a>
            <p class="form-footer__tagline">${window.FORM.brand.tagline}</p>
          </div>
          <div class="form-footer__col">
            <h3>Shop</h3>
            <ul class="form-footer__links">
              <li><a href="shop.html">All formulas</a></li>
              <li><a href="product.html#magnesium-glycinate">Magnesium</a></li>
              <li><a href="product.html#daily-multi">Daily Multi</a></li>
            </ul>
          </div>
          <div class="form-footer__col">
            <h3>Learn</h3>
            <ul class="form-footer__links">
              <li><a href="science.html">Our standards</a></li>
              <li><a href="index.html#about">About FORM</a></li>
            </ul>
          </div>
          <div class="form-footer__col">
            <h3>Support</h3>
            <ul class="form-footer__links">
              <li><a href="cart.html">Cart</a></li>
              <li><a href="#">Shipping</a></li>
              <li><a href="#">Returns</a></li>
            </ul>
          </div>
        </div>
        <div class="form-footer__bottom">
          &copy; ${new Date().getFullYear()} FORM. Portfolio preview — static HTML, Liquid-ready.
        </div>
      </div>
    </footer>

    <div class="form-cart-drawer" data-form-cart-drawer aria-hidden="true">
      <div class="form-cart-drawer__backdrop" data-form-close-cart></div>
      <div class="form-cart-drawer__panel" role="dialog" aria-label="Cart">
        <div class="form-cart-drawer__head">
          <h2>Cart</h2>
          <button type="button" class="form-cart-drawer__close" data-form-close-cart aria-label="Close">✕</button>
        </div>
        <div class="form-cart-drawer__body" data-form-cart-body></div>
        <div class="form-cart-drawer__foot">
          <div class="form-cart-drawer__subtotal">
            <span>Subtotal</span>
            <span data-form-cart-subtotal>$0</span>
          </div>
          <a href="cart.html" class="form-btn form-btn--primary form-btn--full">View cart</a>
        </div>
      </div>
    </div>`,
  );
};
