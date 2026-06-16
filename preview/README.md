# FORM — Static preview

Portfolio demo: **HTML / CSS / JS** with hardcoded product data. No Shopify account required.

Same visual language as the Liquid theme in `../` — shows design + front-end craft; Liquid sections map 1:1 in production.

```
preview/
├── index.html
├── shop.html
├── product.html
├── science.html
├── cart.html
├── form.css
├── preview.css
├── images/          Product photos (local assets)
├── data.js
├── shell.js
└── app.js
```

## Open locally

**Option A — double-click** `index.html` (cart uses `localStorage`; some browsers block modules on `file://` — prefer B).

**Option B — local server (recommended):**

```powershell
cd C:\Form\preview
npx --yes serve .
```

Open **http://localhost:3000** (or the port shown).

**Option C — Python:**

```powershell
cd C:\Form\preview
python -m http.server 8080
```

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage |
| `shop.html` | Collection / all products |
| `product.html#magnesium-glycinate` | PDP (hash routing — SPA between products) |
| `science.html` | Formulation standards & testing |
| `cart.html` | Cart (localStorage) |

## Deploy (Netlify)

1. Push `C:\Form` to a public GitHub repo.
2. [Netlify](https://app.netlify.com) → **Add site** → **Import from Git** → pick the repo.
3. Build settings are read from `netlify.toml` at repo root (`publish = preview`).
4. Live URLs for portfolio:
   - `/` — homepage
   - `/product.html#magnesium-glycinate` — PDP
   - `/science.html` — standards page

**Alternative:** drag the `preview/` folder onto [Netlify Drop](https://app.netlify.com/drop) — instant URL, no Git.

## Data

Edit `data.js` — products, copy, benefits. In Shopify this becomes `product`, `collection`, and section settings.

## Portfolio pitch

> FORM static preview — supplement brand UI. Shopify Liquid theme in `/sections` adapts the same layout to client stores.
