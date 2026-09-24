# SOLÈNE — Biocompatible Makeup Archive & Showcase

A warm, polished, product-forward single-page static showcase website for **SOLÈNE** — an elevated DTC beauty brand based around biocompatible lipids and micronized earth pigments.

> **Showcase, not a store:** Built strictly as a brand experience and product catalog without e-commerce cart, checkout, pricing, star ratings, or purchase buttons. Every section is dedicated to formulation transparency, tactile shade discovery, and physical stockist routing.

---

## Features

- **Cinematic Hero with Live Ocean Video Background**: Smooth looping aerial drone wave footage (`hero_video.mp4`) with a warm, multi-stop gradient overlay and radial vignettes.
- **Ambient Motion & Depth Controls**:
  - Interactive play/pause toggle pill (`Ocean Motion`) with pulse ripple indicator.
  - Interactive 3D mouse parallax tilt on the flagship product card.
  - Reduced-motion accessibility detection (`prefers-reduced-motion`).
- **Product Line Grid & Category Filtering**:
  - 9 distinct formulations categorized into **Face**, **Lips**, and **Eyes**.
  - Dynamic category switching (All, Face, Lips, Eyes) with smooth fade transitions.
  - Interactive shade swatches that update shade names and undertone labels in real time.
- **Formulation & Actives Slide-Over Drawer**:
  - Interactive detail drawer modal providing deep dives into ingredient matrices, wear profiles, skin compatibility, and ritual applications.
- **"How It's Made" Formulation Architecture**:
  - Breakdown of the Oregon Meadowfoam & Squalane Matrix, sub-micronized non-nano mineral platelets, and fermented camellia actives.
- **Editorial Press Mentions**: Typographic editorial quotes from *Vogue*, *The Cut*, and *Harper's Bazaar*.
- **Stockist Directory**: Filterable directory across global locations (*Paris*, *London*, *New York*, *Tokyo*, *Sydney*, *Online Flagship*).
- **Mobile-First & Fully Responsive**: Built with semantic HTML5, CSS clamp-based fluid typography, and custom design tokens.

---

## Tech Stack

- **HTML5**: Semantic document layout with accessible dialog/modal drawers and micro-interactions.
- **CSS3**: Custom design tokens, fluid typography (`clamp`), glassmorphism (`backdrop-filter`), CSS Grid, and GPU-accelerated keyframe animations.
- **JavaScript (Vanilla)**: Lightweight event-driven logic for video motion control, shade selectors, filter tabs, modal state, and 3D parallax.
- **Assets**: Studio product photography, botanical ingredients visual, and optimized looping background MP4.

---

## Quick Start

Open `index.html` directly in any modern browser, or run a local static server:

```bash
# Using Node.js
npx serve .

# Or using Python
python -m http.server 8080
```
