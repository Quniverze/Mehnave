# MEHNAVE — Natural Fiber Atelier & Ready-to-Wear Archive

A warm, polished, product-forward single-page static showcase website for **MEHNAVE** — an elevated luxury sustainable clothing brand based around long-staple Normandy flax, raw tussah silk, and combed Mongolian cashmere.

> **Showcase, not a store:** Built strictly as a brand experience and garment catalog without e-commerce cart, checkout, pricing, star ratings, or purchase buttons. Every section is dedicated to textile transparency, tactile colorway discovery, and physical stockist routing.

---

## Features

- **Cinematic Hero with Live Ocean Video Background**: Smooth looping aerial drone wave footage (`hero_video.mp4`) with a warm, multi-stop gradient overlay and radial vignettes.
- **Ambient Motion & Depth Controls**:
  - Interactive play/pause toggle pill (`Ocean Motion`) with pulse ripple indicator.
  - Interactive 3D mouse parallax tilt on the flagship ensemble card.
  - Reduced-motion accessibility detection (`prefers-reduced-motion`).
- **Product Line Grid & Category Filtering**:
  - 9 foundational silhouettes categorized into **Tailoring & Outerwear**, **Dresses & Silks**, and **Knitwear & Trousers**.
  - Dynamic category switching (All, Tailoring, Dresses, Knitwear) with smooth fade transitions.
  - Interactive fabric swatches that update colorway names and textile labels in real time.
- **Textile & Fit Slide-Over Drawer**:
  - Interactive detail drawer modal providing deep dives into fiber composition, fabric weight (GSM), fit drape profiles, and longevity care rituals.
- **"How It's Made" Textile Architecture**:
  - Breakdown of the Normandy Flax Provenance, low-impact botanical & mineral vat dyeing, and zero synthetic polymers guarantee.
- **Editorial Press Mentions**: Typographic editorial quotes from *Vogue*, *The Cut*, and *Harper's Bazaar*.
- **Stockist Directory**: Filterable directory across global locations (*Paris*, *London*, *New York*, *Tokyo*, *Sydney*, *Online Flagship*).
- **Mobile-First & Fully Responsive**: Built with semantic HTML5, CSS clamp-based fluid typography, and custom design tokens.

---

## Tech Stack

- **HTML5**: Semantic document layout with accessible dialog/modal drawers and micro-interactions.
- **CSS3**: Custom design tokens, fluid typography (`clamp`), glassmorphism (`backdrop-filter`), CSS Grid, and GPU-accelerated keyframe animations.
- **Vanilla JavaScript**: Lightweight event-driven logic for video motion control, fabric swatches, filter tabs, modal state, and 3D parallax.
- **Assets**: Studio fashion photography, textile craftsmanship visual, and optimized looping background MP4.

---

## Quick Start

Open `index.html` directly in any modern browser, or run a local static server:

```bash
# Using Node.js
npx serve .

# Or using Python
python -m http.server 8080
```
