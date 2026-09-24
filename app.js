/**
 * SOLÈNE BEAUTY — INTERACTIVE ARCHIVE SCRIPTS
 * Showcase behavior: Category filter, shade selectors, formula detail drawer, stockist filter
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initHeroVideoAnimation();
  initCategoryFilters();
  initShadePickers();
  initFormulaModal();
  initStockistFilters();
  initMobileNav();
});

/* --- Hero Background Video & Animation Controls --- */
function initHeroVideoAnimation() {
  const video = document.getElementById('heroBgVideo');
  const toggleBtn = document.getElementById('heroMotionToggle');
  const heroSection = document.getElementById('heroSection');
  const heroCard = document.querySelector('.hero-card-animated');

  if (!video || !toggleBtn) return;

  const iconPause = toggleBtn.querySelector('.icon-pause');
  const iconPlay = toggleBtn.querySelector('.icon-play');
  const motionText = toggleBtn.querySelector('.motion-text');

  // Play/Pause toggle
  toggleBtn.addEventListener('click', () => {
    if (video.paused) {
      video.play().then(() => {
        toggleBtn.classList.remove('paused');
        if (iconPause) iconPause.style.display = 'block';
        if (iconPlay) iconPlay.style.display = 'none';
        if (motionText) motionText.textContent = 'Ocean Motion';
      }).catch(err => console.log('Video play error:', err));
    } else {
      video.pause();
      toggleBtn.classList.add('paused');
      if (iconPause) iconPause.style.display = 'none';
      if (iconPlay) iconPlay.style.display = 'block';
      if (motionText) motionText.textContent = 'Motion Paused';
    }
  });

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.pause();
    toggleBtn.classList.add('paused');
    if (iconPause) iconPause.style.display = 'none';
    if (iconPlay) iconPlay.style.display = 'block';
    if (motionText) motionText.textContent = 'Motion Paused';
  }

  // Subtle interactive parallax on mouse move in hero
  if (heroSection && heroCard && window.innerWidth > 960) {
    let ticking = false;
    heroSection.addEventListener('mousemove', (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        // Subtle 3D tilt on product showcase card
        heroCard.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(${y * -10}px)`;

        // Subtle drift on video
        video.style.transform = `scale(1.04) translate(${x * -8}px, ${y * -8}px)`;
        ticking = false;
      });
    });

    heroSection.addEventListener('mouseleave', () => {
      heroCard.style.transform = '';
      video.style.transform = 'scale(1.04)';
    });
  }
}


/* --- 1. Sticky Header Elevation --- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --- 2. Mobile Navigation Toggle --- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  const closeBtn = document.querySelector('.mobile-nav-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-nav .btn-stockists');

  if (!toggleBtn || !mobileNav) return;

  const openNav = () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openNav);
  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  mobileNav.addEventListener('click', (e) => {
    if (e.target === mobileNav) closeNav();
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

/* --- 3. Product Category Filters --- */
function initCategoryFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (!filterButtons.length || !productCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCategory = btn.getAttribute('data-category');

      productCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 4. Interactive Shade Swatches --- */
function initShadePickers() {
  const shadePickers = document.querySelectorAll('.shade-picker');

  shadePickers.forEach(picker => {
    const chips = picker.querySelectorAll('.shade-chip');
    const labelTarget = picker.closest('.shade-selector-block').querySelector('.active-shade-name');

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');

        const shadeName = chip.getAttribute('data-shade-name');
        if (labelTarget && shadeName) {
          labelTarget.textContent = shadeName;
        }
      });
    });
  });
}

/* --- 5. Product Formula & Ingredient Detail Modal Drawer --- */
const productFormulaData = {
  'p-biome-tint': {
    title: 'Fluid Nude Biome Tint',
    subtitle: 'Face / Serum Emulsion SPF 30',
    image: 'assets/hero_product.jpg',
    finish: 'Luminous Dew / Sheer Buildable',
    wearTime: '14-Hour Breathable Hydration',
    skinTypes: 'All Skin Types, including Sensitive & Rosacea-Prone',
    keyActives: [
      'Cold-Pressed Oregon Meadowfoam (42%)',
      'Olive-Derived Biocompatible Squalane',
      'Non-Nano Zinc Oxide (14.2%)',
      'Phytosterol Ceramide Complex',
      'Ectoin Environmental Shield'
    ],
    ritual: 'Dispense 2–3 drops onto fingertips. Warm gently between palms to activate the lipid matrix, then press and melt outward from center of face.',
    stockistNote: 'Available for complimentary shade matching at all Paris, London, and New York retail partners.'
  },
  'p-flush-melt': {
    title: 'Solar Flush Melting Cream',
    subtitle: 'Face / Cheeks & Lips Butter',
    image: 'assets/face_balm.jpg',
    finish: 'Natural Skin-Glow / Weightless Satin',
    wearTime: '10-Hour Non-Fading Pigment',
    skinTypes: 'Dry, Balanced, and Combination Skin',
    keyActives: [
      'Suspension-Milled Earthen Iron Oxides',
      'Cold-Pressed Jojoba Esters',
      'Wild Rosehip Berry Oil',
      'Shea Butter Tri-Glycerides',
      'Tocopherol (Pure Vitamin E)'
    ],
    ritual: 'Smile softly and tap directly onto the apple of the cheek using fingertips or a dense flat-top brush. Diffuse edges toward the hairline.',
    stockistNote: 'Featured in the Selfridges London and Bon Marché Paris beauty discovery ateliers.'
  },
  'p-velour-clay': {
    title: 'Velour Micro-Clay Silk',
    subtitle: 'Face / Translucent Diffusing Veil',
    image: null,
    finish: 'Cashmere Soft-Focus / Zero Chalkiness',
    wearTime: 'Controls Midday Sheen Without Pilling',
    skinTypes: 'Oily, Combination, and Humid Climate Wear',
    keyActives: [
      'French Kaolin Air-Floated Clay',
      'Bamboo Silica Micro-Spheres',
      'Colloidal Oat Lipids',
      'Organic Tapioca Starch',
      'Allantoin Soothing Agent'
    ],
    ritual: 'Gently swirl a fluffy powder brush into the mesh sifter. Tap off excess and press into the T-zone, smile lines, and under-eye area.',
    stockistNote: 'In stock at all global retail partners.'
  },
  'p-petale-glaze': {
    title: 'Pétale Glaze Lip Oil',
    subtitle: 'Lips / Plumping Hydrating Glaze',
    image: 'assets/lip_glaze.jpg',
    finish: 'High-Lacquered Mirror Glass / Non-Sticky',
    wearTime: '6-Hour Continuous Cushion Cushioning',
    skinTypes: 'Universal Lip Hydration',
    keyActives: [
      'Tri-Peptide Plumping Complex',
      'Cold-Pressed Red Raspberry Seed Oil',
      'Botanical Meadowfoam Esters',
      'Pomegranate Sterols',
      'Hyaluronic Micro-Spheres'
    ],
    ritual: 'Glide the curved precision paddle applicator over bare lips, or layer over a bitten lip liner for dimension and glass reflection.',
    stockistNote: 'Exclusive flagship shade archive available at SSENSE and Space NK.'
  },
  'p-cushion-matte': {
    title: 'Cushion Suede Lip Stain',
    subtitle: 'Lips / Blurring Velvet Botanical Stain',
    image: null,
    finish: 'Diffused Modern Velvet / Weightless Petal',
    wearTime: '8-Hour Transfer-Resistant Stain',
    skinTypes: 'Universal Wear',
    keyActives: [
      'Jeju Fermented Camellia Japonica Seed',
      'Sunflower Seed Wax Emollients',
      'Sub-Micronized Mineral Lake Pigments',
      'Cloudberry Seed Oil Antioxidants',
      'Bisabolol Soothing Compound'
    ],
    ritual: 'Dot once in the center of top and bottom lip, then diffuse outward using your ring finger for an effortless just-bitten editorial stain.',
    stockistNote: 'Available at Le Bon Marché Paris, Restir Tokyo, and Nordstrom NYC.'
  },
  'p-nocturne-salve': {
    title: 'Nocturne Phyto-Ceramide Salve',
    subtitle: 'Lips / Barrier Recovery Butter',
    image: null,
    finish: 'Rich Protective Enveloping Sheen',
    wearTime: 'Overnight 12-Hour Moisture Reservoir',
    skinTypes: 'Dehydrated, Weathered, and Sensitive Lips',
    keyActives: [
      'Ceramide NP + AP + EOP Biomimetic Blend',
      'Shea Butter Nilotica Fraction',
      'Cold-Pressed Evening Primrose Oil',
      'Fermented Beta-Glucan',
      'Hydrolyzed Jojoba Esters'
    ],
    ritual: 'Warm a generous dab onto clean lips before sleep, or apply a sheer veil 15 minutes before matte lip pigment as an ultra-priming barrier.',
    stockistNote: 'Offered as a complimentary gift with bespoke consultation at all stockists.'
  },
  'p-liquid-silk-eye': {
    title: 'Molten Silk Liquid Eye Wash',
    subtitle: 'Eyes / Molten Bronze Shimmer Tint',
    image: 'assets/eye_tint.jpg',
    finish: 'Multidimensional Wet-Look Sheen / Crease-Free',
    wearTime: '12-Hour Smudge-Resistant Wear',
    skinTypes: 'Ophthalmologist-Tested for Sensitive Eyes',
    keyActives: [
      'Ethically Sourced Coated Mica Flakes',
      'Plant-Derived Squalane Vehicle',
      'Cornflower Floral Water Extract',
      'Rice Bran Hydrolyzed Proteins',
      'Antioxidant Green Tea Polyphenols'
    ],
    ritual: 'Sweep one swipe across the mobile eyelid with the flocked wand, then immediately buff edges upward toward the crease with a soft ring finger.',
    stockistNote: 'Permanent installation at Mecca Australia and Space NK UK.'
  },
  'p-brow-sculpt': {
    title: 'Featherweight Laminating Brow Wax',
    subtitle: 'Eyes / Rosemary Micro-Sculpt Pomade',
    image: null,
    finish: 'Clean Polished Fluff / Zero Flaking or Stiffness',
    wearTime: '16-Hour Flexible Architectural Hold',
    skinTypes: 'All Brow Textures, from Sparse to Coarse',
    keyActives: [
      'Purified Carnauba Botanical Wax',
      'Cold-Pressed Organic Rosemary Leaf Extract',
      'Panthenol (Pro-Vitamin B5 Follicle Conditioner)',
      'Castor Seed Lipid Esters',
      'Glycerin Moisture Binder'
    ],
    ritual: 'Coat a clean spoolie lightly with wax. Brush upward against brow grain to coat hairs thoroughly, then comb diagonally into natural shape.',
    stockistNote: 'In stock at all partner boutiques.'
  },
  'p-kohl-glider': {
    title: 'Kohl Satin Eye Glider',
    subtitle: 'Eyes / Mineral Marula Pencil',
    image: null,
    finish: 'Ultra-Creamy Melt / Sets to Waterproof Satin',
    wearTime: '10-Hour Waterline & Lashline Stability',
    skinTypes: 'Safe for Contact Lens Wearers',
    keyActives: [
      'Cold-Pressed Virgin Marula Oil',
      'Japanese Sumac Berry Wax',
      'Natural Charcoal & Iron Oxide Black',
      'Organic Avocado Unsaponifiables',
      'Chamomile Flower Extract'
    ],
    ritual: 'Glide close along the upper lashline. Smudge within 45 seconds with a pencil brush for an effortless smoky haze before the formula locks in place.',
    stockistNote: 'Stocked at Le Bon Marché, Space NK, and SSENSE.'
  }
};

function initFormulaModal() {
  const modalBackdrop = document.querySelector('.modal-backdrop');
  const closeBtn = document.querySelector('.modal-close-btn');
  const detailButtons = document.querySelectorAll('.btn-formula-detail');

  if (!modalBackdrop || !detailButtons.length) return;

  const modalTitle = modalBackdrop.querySelector('.modal-title');
  const modalSubtitle = modalBackdrop.querySelector('.modal-subtitle');
  const modalThumbImg = modalBackdrop.querySelector('.modal-thumb-img');
  const modalFinish = modalBackdrop.querySelector('.modal-finish');
  const modalWear = modalBackdrop.querySelector('.modal-wear');
  const modalSkin = modalBackdrop.querySelector('.modal-skin');
  const modalIngredients = modalBackdrop.querySelector('.modal-ingredient-tags');
  const modalRitual = modalBackdrop.querySelector('.modal-ritual');
  const modalStockist = modalBackdrop.querySelector('.modal-stockist-note');

  const openModal = (productId) => {
    const data = productFormulaData[productId];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle;
    if (modalFinish) modalFinish.textContent = data.finish;
    if (modalWear) modalWear.textContent = data.wearTime;
    if (modalSkin) modalSkin.textContent = data.skinTypes;
    if (modalRitual) modalRitual.textContent = data.ritual;
    if (modalStockist) modalStockist.textContent = data.stockistNote;

    if (modalThumbImg) {
      if (data.image) {
        modalThumbImg.src = data.image;
        modalThumbImg.style.display = 'block';
      } else {
        modalThumbImg.src = 'assets/hero_product.jpg';
        modalThumbImg.style.display = 'block';
      }
    }

    if (modalIngredients) {
      modalIngredients.innerHTML = '';
      data.keyActives.forEach(act => {
        const span = document.createElement('span');
        span.className = 'modal-ingredient-tag';
        span.textContent = act;
        modalIngredients.appendChild(span);
      });
    }

    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      const productId = card ? card.getAttribute('data-product-id') : null;
      if (productId) openModal(productId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

/* --- 6. Stockist City Filter --- */
function initStockistFilters() {
  const stockistFilterButtons = document.querySelectorAll('.stockist-filter-btn');
  const stockistCards = document.querySelectorAll('.stockist-card');

  if (!stockistFilterButtons.length || !stockistCards.length) return;

  stockistFilterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      stockistFilterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetCity = btn.getAttribute('data-city');

      stockistCards.forEach(card => {
        const cardCity = card.getAttribute('data-city');
        if (targetCity === 'all' || cardCity === targetCity) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 20);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}
