# FORM — Shopify Liquid Theme

Portfolio theme for a **supplement / vitamins** brand. Clean, clinical wellness aesthetic — built on **Shopify Online Store 2.0** (JSON templates + sections).

Companion to the [VØID](https://github.com/) Hydrogen storefront (fashion); this project demonstrates **Liquid theme** skills for agency work.

## Stack

- Shopify Liquid 2.0
- JSON templates (`index.json`, `product.json`, …)
- Custom sections (hero, benefits, featured collection, newsletter)
- No build step — CSS/JS in `assets/`

## Structure

```
layout/theme.liquid     Global shell
sections/               Editable homepage & template sections
templates/              JSON template → section mapping
snippets/product-card.liquid
assets/form.css         Brand styles
assets/form.js          Mobile nav
```

## Static preview (no Shopify)

For portfolio / local demo without a store account:

```powershell
cd C:\Form\preview
npx --yes serve .
```

Open the URL shown (usually `http://localhost:3000`). See `preview/README.md`.

## Local development (Liquid on dev store)

1. Install [Shopify CLI](https://shopify.dev/docs/api/shopify-cli):
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```
2. Create a **development store** (or use an existing one).
3. From this folder:
   ```bash
   cd C:\Form
   shopify theme dev --store YOUR-STORE.myshopify.com
   ```
4. Open the preview URL from the CLI.

### First-time store setup

In **Shopify Admin**:

1. **Products** — add 3–4 vitamin SKUs (e.g. Magnesium, D3+K2, Omega-3, Daily Multi).
2. **Collections** — create `Core stack` and assign products.
3. **Online Store → Themes → Customize** — assign collection to **Featured collection** section.
4. **Navigation** — create `main-menu` with Shop, Science, About links.

## Brand direction

| Token | Value |
|-------|--------|
| Background | Warm off-white `#F4F2EC` |
| Accent | Sage `#3F6F5F` |
| Type | Fraunces (headings) + Instrument Sans (body) |

Tone: transparent, science-led, daily ritual — not influencer hype.

## Portfolio note

Theme is designed to pair with a Hydrogen headless demo: **VØID = composable storefront**, **FORM = Liquid theme craft**. Both are valid paths agencies sell to clients.

## License

MIT — portfolio / learning use.
