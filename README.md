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



