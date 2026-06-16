(function () {
  const CART_KEY = 'form-preview-cart';

  function formatMoney(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  }

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch {
      return [];
    }
  }

  function saveCart(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    updateCartCount();
    renderCartDrawer();
  }

  function findProduct(id) {
    if (!id) return undefined;
    return window.FORM.products.find((p) => p.id === id);
  }

  /** serve strips ?query when rewriting product.html → /product; hash survives. */
  function getProductIdFromUrl() {
    const hash = location.hash.replace(/^#/, '').trim();
    if (hash) return decodeURIComponent(hash);

    const fromQuery = new URLSearchParams(location.search).get('id');
    if (fromQuery) return decodeURIComponent(fromQuery);

    const stored = sessionStorage.getItem('form-pdp-id');
    if (stored) return stored;

    return null;
  }

  function productPageUrl(id) {
    return `product.html#${encodeURIComponent(id)}`;
  }

  function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('[data-form-cart-count]').forEach((el) => {
      if (count > 0) {
        el.textContent = String(count);
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });
  }

  function showToast(message) {
    let toast = document.querySelector('.form-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'form-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  }

  function renderProductCard(product) {
    const img = product.image
      ? `<img src="${product.image}" alt="${product.imageAlt}" loading="lazy" width="400" height="400">`
      : `<div class="form-product-card__media--fallback">${product.type}</div>`;

    return `
      <a href="${productPageUrl(product.id)}" class="form-product-card">
        <div class="form-product-card__media">${img}</div>
        <div class="form-product-card__body">
          <span class="form-product-card__tag">${product.type}</span>
          <h3 class="form-product-card__title">${product.title}</h3>
          <p class="form-product-card__meta">${product.description.slice(0, 72)}…</p>
          <p class="form-product-card__price">${formatMoney(product.price)}</p>
        </div>
      </a>`;
  }

  function renderCartDrawer() {
    const body = document.querySelector('[data-form-cart-body]');
    const subtotalEl = document.querySelector('[data-form-cart-subtotal]');
    if (!body) return;

    const items = getCart();
    if (items.length === 0) {
      body.innerHTML = '<p class="form-cart-empty">Your cart is empty.</p>';
      if (subtotalEl) subtotalEl.textContent = formatMoney(0);
      return;
    }

    let total = 0;
    body.innerHTML = items
      .map((item) => {
        const product = findProduct(item.id);
        if (!product) return '';
        const line = product.price * item.qty;
        total += line;
        const thumb = product.image
          ? `<img class="form-cart-line__thumb" src="${product.image}" alt="">`
          : '<div class="form-cart-line__thumb"></div>';
        return `
          <div class="form-cart-line" data-cart-id="${product.id}">
            ${thumb}
            <div>
              <a class="form-cart-line__title" href="${productPageUrl(product.id)}">${product.title}</a>
              <p class="form-cart-line__meta">Qty ${item.qty}</p>
              <p class="form-cart-line__price">${formatMoney(line)}</p>
            </div>
            <button type="button" class="form-cart-line__remove" data-remove="${product.id}">Remove</button>
          </div>`;
      })
      .join('');

    if (subtotalEl) subtotalEl.textContent = formatMoney(total);

    body.querySelectorAll('[data-remove]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-remove');
        saveCart(getCart().filter((i) => i.id !== id));
      });
    });
  }

  function openCart() {
    document.querySelector('[data-form-cart-drawer]')?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    document.querySelector('[data-form-cart-drawer]')?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function addToCart(productId, qty) {
    const cart = getCart();
    const existing = cart.find((i) => i.id === productId);
    if (existing) existing.qty += qty;
    else cart.push({ id: productId, qty });
    saveCart(cart);
    showToast('Added to cart');
    openCart();
  }

  // Grid targets
  document.querySelectorAll('[data-form-products]').forEach((el) => {
    const limit = Number(el.dataset.limit || window.FORM.products.length);
    el.innerHTML = window.FORM.products
      .slice(0, limit)
      .map(renderProductCard)
      .join('');
  });

  function renderHighlights(items) {
    if (!items?.length) return '';
    return `
      <ul class="form-pdp__highlights">
        ${items.map((item) => `<li>${item}</li>`).join('')}
      </ul>`;
  }

  function renderFactsTable(ingredients) {
    if (!ingredients?.length) return '';
    return `
      <table class="form-supplement-facts">
        <caption>Supplement facts · per serving</caption>
        <thead>
          <tr>
            <th scope="col">Ingredient</th>
            <th scope="col">Amount</th>
            <th scope="col">% DV</th>
          </tr>
        </thead>
        <tbody>
          ${ingredients
            .map(
              (row) => `
            <tr>
              <td>${row.name}</td>
              <td>${row.amount}</td>
              <td>${row.dv}</td>
            </tr>`,
            )
            .join('')}
        </tbody>
      </table>
      <p class="form-supplement-facts__note">† Daily value not established.</p>`;
  }

  function renderStackProducts(ids) {
    const products = (ids || [])
      .map((id) => findProduct(id))
      .filter(Boolean);
    if (!products.length) return '';
    return `
      <section class="form-pdp-section form-pdp-section--related">
        <div class="form-container">
          <p class="form-eyebrow">Stack with</p>
          <h2 class="form-pdp-section__title">Pairs well with</h2>
          <div class="form-product-grid form-product-grid--compact">
            ${products.map(renderProductCard).join('')}
          </div>
        </div>
      </section>`;
  }

  function bindPdpAccordions(root) {
    root.querySelectorAll('[data-pdp-accordion]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const panel = trigger.nextElementSibling;
        const expanded = trigger.getAttribute('aria-expanded') === 'true';
        trigger.setAttribute('aria-expanded', String(!expanded));
        panel.hidden = expanded;
      });
    });
  }

  function getPdpQty(input) {
    return Math.min(9, Math.max(1, Number(input?.value) || 1));
  }

  function bindPdpPurchase(root, product) {
    const priceEl = root.querySelector('[data-pdp-price]');
    const subscribeToggle = root.querySelector('[data-pdp-subscribe]');
    const qtyInput = root.querySelector('[data-pdp-qty]');

    function updatePrice() {
      const qty = getPdpQty(qtyInput);
      if (qtyInput) qtyInput.value = String(qty);

      const subscribe = subscribeToggle?.checked;
      const unitPrice = subscribe ? product.subscribePrice : product.price;
      const total = unitPrice * qty;
      const compareTotal = product.price * qty;

      if (!priceEl) return;

      priceEl.innerHTML = subscribe
        ? `<span class="form-pdp__price-compare">${formatMoney(compareTotal)}</span>${formatMoney(total)} <span class="form-pdp__price-note">/ delivery</span>`
        : formatMoney(total);
    }

    subscribeToggle?.addEventListener('change', updatePrice);
    qtyInput?.addEventListener('input', updatePrice);
    qtyInput?.addEventListener('change', updatePrice);

    root.querySelector('[data-qty-minus]')?.addEventListener('click', () => {
      if (qtyInput) qtyInput.value = String(getPdpQty(qtyInput) - 1);
      updatePrice();
    });
    root.querySelector('[data-qty-plus]')?.addEventListener('click', () => {
      if (qtyInput) qtyInput.value = String(getPdpQty(qtyInput) + 1);
      updatePrice();
    });

    updatePrice();

    root.querySelector('[data-add-cart]')?.addEventListener('click', () => {
      addToCart(product.id, getPdpQty(qtyInput));
    });
  }

  function renderPdp() {
    const pdpRoot = document.querySelector('[data-form-pdp]');
    const pdpExtra = document.querySelector('[data-form-pdp-extra]');
    if (!pdpRoot) return;

    const productId = getProductIdFromUrl();
    const product = findProduct(productId) || window.FORM.products[0];

    if (productId) {
      sessionStorage.setItem('form-pdp-id', productId);
      if (location.hash !== `#${productId}`) {
        history.replaceState(null, '', productPageUrl(productId));
      }
    }

    if (!product) return;

    document.title = `${product.title} | FORM`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = product.description;

    pdpRoot.innerHTML = `
      <div class="form-pdp__media">
        ${
          product.image
            ? `<img src="${product.image}" alt="${product.imageAlt}">`
            : '<div class="form-hero__visual--placeholder"><span>FORM</span></div>'
        }
      </div>
      <div class="form-pdp__buy" data-pdp-buy>
        <p class="form-eyebrow">${product.type}</p>
        <h1 class="form-pdp__title">${product.title}</h1>
        <p class="form-pdp__price" data-pdp-price>${formatMoney(product.price)}</p>
        <p class="form-pdp__desc">${product.description}</p>
        ${renderHighlights(product.highlights)}
        <div class="form-pdp__purchase">
          <label class="form-pdp__subscribe">
            <input type="checkbox" data-pdp-subscribe>
            <span>
              <strong>Subscribe &amp; save 15%</strong>
              <small>Deliver every 30 days · pause anytime</small>
            </span>
          </label>
          <div class="form-pdp__atc-row">
            <div class="form-pdp__qty">
              <label class="visually-hidden" for="pdp-qty">Quantity</label>
              <button type="button" class="form-pdp__qty-btn" data-qty-minus aria-label="Decrease quantity">−</button>
              <input id="pdp-qty" type="number" min="1" max="9" value="1" data-pdp-qty>
              <button type="button" class="form-pdp__qty-btn" data-qty-plus aria-label="Increase quantity">+</button>
            </div>
            <button type="button" class="form-btn form-btn--primary form-pdp__atc" data-add-cart="${product.id}">
              Add to cart
            </button>
          </div>
        </div>
        <ul class="form-pdp__trust">
          <li>Third-party tested</li>
          <li>Free shipping $50+</li>
          <li>30-day returns</li>
        </ul>
        <dl class="form-pdp__facts">
          <dt>Serving</dt><dd>${product.serving}</dd>
          <dt>Format</dt><dd>${product.format}</dd>
          <dt>Testing</dt><dd>${product.testing}</dd>
        </dl>
      </div>`;

    if (pdpExtra) {
      pdpExtra.innerHTML = `
        <section class="form-pdp-section form-pdp-section--story">
          <div class="form-container form-pdp-section__split">
            <div>
              <p class="form-eyebrow">Why FORM</p>
              <h2 class="form-pdp-section__title">Formulated for absorption</h2>
              <p class="form-pdp-section__text">${product.longDescription || ''}</p>
            </div>
            <div class="form-pdp-section__panel">
              ${renderFactsTable(product.ingredients)}
            </div>
          </div>
        </section>
        <section class="form-pdp-section form-pdp-section--details">
          <div class="form-container form-pdp-accordion">
            <div class="form-pdp-accordion__item">
              <button type="button" class="form-pdp-accordion__trigger" data-pdp-accordion aria-expanded="true">
                How to use
              </button>
              <div class="form-pdp-accordion__panel">${product.howToUse || ''}</div>
            </div>
            <div class="form-pdp-accordion__item">
              <button type="button" class="form-pdp-accordion__trigger" data-pdp-accordion aria-expanded="false">
                Full ingredient list
              </button>
              <div class="form-pdp-accordion__panel" hidden>
                ${(product.ingredients || []).map((i) => i.name).join(', ')}.
                Other ingredients: vegetable cellulose (capsule), organic rice flour.
                Manufactured in a cGMP facility. Free from gluten, soy, and artificial dyes.
              </div>
            </div>
            <div class="form-pdp-accordion__item">
              <button type="button" class="form-pdp-accordion__trigger" data-pdp-accordion aria-expanded="false">
                Shipping &amp; returns
              </button>
              <div class="form-pdp-accordion__panel" hidden>
                Free standard shipping on orders over $50. Most US orders arrive in 3–5 business days.
                Unopened bottles may be returned within 30 days for a full refund.
              </div>
            </div>
          </div>
        </section>
        ${renderStackProducts(product.stackWith)}`;
    }

    bindPdpPurchase(pdpRoot, product);
    bindPdpAccordions(pdpExtra || pdpRoot);
  }

  renderPdp();
  window.addEventListener('hashchange', renderPdp);

  // Cart page
  const cartPage = document.querySelector('[data-form-cart-page]');
  if (cartPage) {
    const items = getCart();
    if (items.length === 0) {
      cartPage.innerHTML = `
        <p class="form-lead">Your cart is empty.</p>
        <a href="shop.html" class="form-btn form-btn--primary" style="margin-top:1.5rem;display:inline-flex">Shop formulas</a>`;
    } else {
      let total = 0;
      const lines = items
        .map((item) => {
          const product = findProduct(item.id);
          if (!product) return '';
          const line = product.price * item.qty;
          total += line;
          return `
            <li style="display:grid;grid-template-columns:5rem 1fr auto;gap:1rem;align-items:center;padding-bottom:1.5rem;border-bottom:1px solid var(--form-border);list-style:none;">
              <img src="${product.image}" alt="" width="80" height="80" style="border-radius:0.5rem;object-fit:cover;background:var(--form-accent-soft)">
              <div>
                <a href="${productPageUrl(product.id)}" style="font-weight:600;text-decoration:none">${product.title}</a>
                <p class="form-lead" style="margin:0.25rem 0 0;font-size:0.875rem">Qty ${item.qty}</p>
                <p style="margin:0.5rem 0 0;font-weight:600">${formatMoney(line)}</p>
              </div>
            </li>`;
        })
        .join('');
      cartPage.innerHTML = `
        <ul style="margin:0;padding:0">${lines}</ul>
        <div style="margin-top:2rem;display:flex;justify-content:space-between;align-items:center">
          <p style="font-size:1.125rem;font-weight:600;margin:0">Subtotal: ${formatMoney(total)}</p>
          <span class="form-preview-badge">Preview — no checkout</span>
        </div>`;
    }
  }

  // Drawer controls
  document.querySelectorAll('[data-form-open-cart]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  });
  document.querySelectorAll('[data-form-close-cart]').forEach((btn) => {
    btn.addEventListener('click', closeCart);
  });
  document.querySelector('[data-form-cart-drawer] .form-cart-drawer__backdrop')?.addEventListener('click', closeCart);

  // Mobile nav
  const toggle = document.querySelector('[data-form-menu-toggle]');
  const nav = document.querySelector('[data-form-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  updateCartCount();
  renderCartDrawer();
})();
