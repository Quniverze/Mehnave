# MEHNAVE — Handcrafted Ethnic Wear Atelier | Calicut, Kerala

A warm, polished, product-forward single-page static showcase website for **MEHNAVE**, founded by **Khadeeja Mehna** in **Calicut, Kerala**. The brand is dedicated entirely to handcrafted ethnic wear — shaped by pure breathable Malabar cottons, hand-carved teakwood block printing, and natural botanical dyes.

> **Showcase, not a store:** Built strictly as a brand experience and garment catalog without e-commerce cart, checkout, or automated pricing. Every piece is made in conscientious, unhurried batches with custom sizing consultations conducted directly through the **WhatsApp Concierge (+91 8137010627)** or private studio appointments in Calicut.

---

## Brand Details

- **Brand Name**: MEHNAVE
- **Founder & Creative Director**: Khadeeja Mehna
- **Base of Operations**: Calicut (Kozhikode), Kerala, India
- **Hero Statement**: *"Malabar Grace, Reimagined."*
- **Product Range**: Ethnic Wear only (Kurta Sets, Anarkalis, Kaftans, Co-ords)
- **Textile Philosophy**: Pure breathable Malabar handloom cottons, river-washed soft finishes, hand-carved teak block prints, chemical-free vegetable and mineral vat dyes.
- **Color Palette**: Soft pastel botanicals — *Powder Rose*, *Sage Mint*, *Ivory Kora*, and *Toasted Almond*.
- **Direct Concierge**: WhatsApp `+91 8137010627` with pre-filled bespoke inquiry routing.

---

## Features

- **Cinematic Hero with Looping Coastal Background Video**: Smooth looping aerial wave footage (`assets/hero_video.mp4`) celebrating Malabar's coastal trade history, with warm multi-stop gradient overlays, radial vignettes, and playback controls.
- **Ambient Motion & Depth Controls**:
  - Interactive play/pause toggle pill (`Malabar Motion`) with pulsing ripple indicator.
  - Interactive 3D mouse parallax tilt on the flagship ensemble card.
  - Reduced-motion accessibility detection (`prefers-reduced-motion`).
- **Ethnic Wear Product Line Grid & Filter Tabs**:
  - 8 foundational silhouettes across 4 categories:
    - **Kurta Sets**: *The Beypore Straight Kurta Set*, *The Mananchira Embroidered Kurta Set*
    - **Anarkalis**: *The Malabar Botanical Tiered Anarkali*, *The Wayanad Hand-Gathered Anarkali*
    - **Kaftans**: *The Kozhikode Breeze Cotton Kaftan*, *The Arabica Coast Lounging Kaftan*
    - **Co-ords**: *The Nilambur Relaxed Ethnic Co-ord*, *The Kappad Leisure Tunic & Culotte Co-ord*
  - Dynamic category switching with smooth staggered fade transitions.
  - Interactive pastel botanical shade swatches that update colorway names and textile labels in real time.
- **Dedicated Founder's Note Section**:
  - A heartfelt personal reflection from **Khadeeja Mehna** on Malabar's textile heritage, river-washed cottons, and the philosophy of slow, modest ethnic fashion.
- **Artisanal Craft & Fit Slide-Over Drawer Modal**:
  - Interactive detail drawer modal providing deep dives into weave architecture, GSM fabric weights, care and washing rituals, and custom measurement notes.
  - Dynamically updates the **WhatsApp Concierge** button with the specific garment name pre-filled for custom orders.
- **"The Malabar Textile Heritage" Craftsmanship Section**:
  - Highlights pure breathable Malabar cottons, teakwood hand-block printing, and chemical-free botanical dyes with authentic artisan photography (`assets/block_printing.jpg`).
- **Editorial Press Mentions**: Typographic editorial quotes from *The Hindu Lifestyle*, *Vogue India*, and *Platform Magazine*.
- **Direct Concierge & Calicut Studio Section**:
  - Direct WhatsApp Concierge cards, studio appointment scheduling, and small-batch bespoke guarantees.
- **Mobile-First & Fully Responsive**: Built with semantic HTML5, CSS clamp-based fluid typography, and custom design tokens.

---

## Tech Stack

- **HTML5**: Semantic document layout with accessible dialog/modal drawers and micro-interactions.
- **CSS3**: Custom design tokens, fluid typography (`clamp`), glassmorphism (`backdrop-filter`), CSS Grid, and GPU-accelerated keyframe animations.
- **Vanilla JavaScript**: Lightweight event-driven logic for video motion control, pastel fabric swatches, filter tabs, modal state, dynamic WhatsApp routing, and 3D parallax.
- **Assets**: Handcrafted ethnic wear photography, artisanal Kerala block printing photography, and optimized looping background MP4.

---

## Quick Start

Open `index.html` directly in any modern browser, or run a local static server:

```bash
# Using Node.js
npx serve .

# Or using Python
python -m http.server 8080
```
