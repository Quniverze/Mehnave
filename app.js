/**
 * MEHNAVE (CALICUT, KERALA) — ATELIER INTERACTIVE SHOWCASE
 * Founder: Khadeeja Mehna
 * Focus: Ethnic Wears (Kurta Sets, Anarkalis, Kaftans, Co-ords)
 * Craft: Pure breathable Malabar cottons, hand-block printing, natural dyes
 * Interactive: Category filters, botanical pastel swatches, modal spec drawer, WhatsApp concierge links, video motion
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initHeroVideoAnimation();
  initCategoryFilters();
  initShadePickers();
  initFormulaModal();
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
        if (motionText) motionText.textContent = 'Malabar Motion';
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

  // Subtle interactive parallax on mouse move in hero (desktop)
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
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a, .mobile-nav .btn-whatsapp');

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

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });
}

/* --- 3. Category Filter Tabs (Ethnic Wear: Kurtas, Anarkalis, Kaftans, Co-ords) --- */
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.category-filter-list .filter-btn');
  const productCards = document.querySelectorAll('.product-grid .product-card');

  if (!filterBtns.length || !productCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetCategory = btn.getAttribute('data-category');

      productCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        const shouldShow = targetCategory === 'all' || cardCategory === targetCategory;

        if (shouldShow) {
          card.style.display = 'flex';
          card.style.opacity = '0';
          card.style.transform = 'translateY(16px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 40);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 4. Interactive Shade Swatch Selection --- */
function initShadePickers() {
  const shadePickers = document.querySelectorAll('.shade-picker');

  shadePickers.forEach(picker => {
    const chips = picker.querySelectorAll('.shade-chip');
    const container = picker.closest('.shade-selector-block');
    const activeLabel = container ? container.querySelector('.active-shade-name') : null;

    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        chips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');

        const shadeName = chip.getAttribute('data-shade-name');
        if (activeLabel && shadeName) {
          activeLabel.textContent = shadeName;
        }

        // Tactile micro-animation feedback
        chip.style.transform = 'scale(0.88)';
        setTimeout(() => {
          chip.style.transform = '';
        }, 150);
      });
    });
  });
}

/* --- 5. Handcrafted Ethnic Garment & Textile Architecture Data --- */
const garmentTextileData = {
  'c-beypore-kurta': {
    title: 'The Beypore Straight Kurta Set',
    subtitle: 'Kurta Sets / 110 GSM Malabar Handloom Cotton',
    image: 'assets/kurta_set.jpg',
    finish: 'Straight-Cut Tailored Silhouette with High Side Slits',
    wearTime: '110 GSM River-Washed Pure Malabar Cotton',
    skinTypes: 'Includes Straight Cropped Pants & Sheer Block Dupatta',
    keyActives: [
      '100% Pure Breathable Malabar Cotton',
      'Hand-Carved Teakwood Block Print',
      'Natural Botanical Mineral Dye',
      'Natural Mother-of-Pearl Neckline Buttons',
      'Tailored Ankle Trousers with Cotton Drawstring'
    ],
    ritual: 'Gentle hand wash in cold water with mild organic detergent. Dry in shaded sea breeze to protect natural botanical pigments.',
    stockistNote: 'Custom tailored to your exact measurements via WhatsApp Concierge. Dispatched directly from Calicut, Kerala.'
  },
  'c-mananchira-kurta': {
    title: 'The Mananchira Embroidered Kurta Set',
    subtitle: 'Kurta Sets / 115 GSM Unbleached Kora Cotton',
    image: 'assets/kurta_set.jpg',
    finish: 'Relaxed Silhouette with Fine Hand Needlework',
    wearTime: '115 GSM Organic Kora Handloom Cotton',
    skinTypes: 'Split Mandarin Neckline with Straight Cigarette Pants',
    keyActives: [
      '100% Unbleached Native Indian Kora Cotton',
      'Subtle Tone-on-Tone Artisan Needlework',
      'Natural Pomegranate & Madder Dye Accents',
      'Concealed Inseam Side Pockets',
      'Breathable Open-Slub Loom Texture'
    ],
    ritual: 'Cold hand wash separately. Iron lightly damp on reverse for crisp yet soft drape that softens further with every wash.',
    stockistNote: 'Bespoke sleeve length, neckline depth, and pant measurements tailored on request.'
  },
  'c-malabar-anarkali': {
    title: 'The Malabar Botanical Tiered Anarkali',
    subtitle: 'Anarkalis / 95 GSM Featherlight Cambric Cotton',
    image: 'assets/anarkali.jpg',
    finish: 'Sweeping 3-Tier Gathered Floor-Length Gown',
    wearTime: '95 GSM Featherlight Malabar Cambric Cotton',
    skinTypes: 'Universally Flattering Gathered Silhouette with Matching Dupatta',
    keyActives: [
      '100% Breathable Malabar Cambric Cotton',
      '28 Hand-Aligned Wooden Block Impressions',
      'Natural Madder Root & Iron Vat Extracts',
      'Hand-Piped Neckline and Fitted Long Sleeves',
      'Zero Synthetic Lining (Skin Breathes Fully)'
    ],
    ritual: 'Dry clean organically or dip gently in cold water with mild shampoo. Air dry on padded hanger in shade.',
    stockistNote: 'Signature piece of Mehnave. Available for festive and wedding trousseau consultations.'
  },
  'c-wayanad-anarkali': {
    title: 'The Wayanad Hand-Gathered Anarkali',
    subtitle: 'Anarkalis / 105 GSM Soft Malabar Slub Cotton',
    image: 'assets/anarkali.jpg',
    finish: 'High-Waisted Flared Ankle-Length Silhouette',
    wearTime: '105 GSM Textured Malabar Slub Cotton',
    skinTypes: 'Empire Waist Gathers with Heirloom Botanical Hem',
    keyActives: [
      '100% Hand-Spun Kerala Cotton',
      'Herbal Botanical Infusions for Color Longevity',
      'Hand-Stitched Fabric Covered Buttons',
      'Generous 4-Meter Gathers for Motion',
      'Pair with Straight Trousers or Churidar'
    ],
    ritual: 'Hand wash cold with gentle organic detergent. Air dry in soft morning light; no stiff starch needed.',
    stockistNote: 'Custom height and chest adjustments handcrafted at our Calicut atelier.'
  },
  'c-kozhikode-kaftan': {
    title: 'The Kozhikode Breeze Cotton Kaftan',
    subtitle: 'Kaftans / 120 GSM Pure Organic Cotton Weave',
    image: 'assets/kaftan.jpg',
    finish: 'Voluminous Modest Cocoon Drape with Cinched Waist',
    wearTime: '120 GSM Pure Organic Cotton Weave',
    skinTypes: 'Flattering Deep V-Neckline with Artisan Braided Tassels',
    keyActives: [
      '100% Pure Breathable Malabar Cotton',
      'Hand-Carved Teak Block Border Details',
      'Hand-Braided Tassel Drawstring Waist',
      'Modest Full-Coverage Silhouette',
      'Naturally Hypoallergenic & Skin-Cooling'
    ],
    ritual: 'Cold hand wash or gentle machine delicate cycle. Lay flat or hang in shade away from direct midday sun.',
    stockistNote: 'One relaxed fluid fit or customized lengths upon consultation.'
  },
  'c-arabica-kaftan': {
    title: 'The Arabica Coast Lounging Kaftan',
    subtitle: 'Kaftans / 100 GSM Handloom Fine Muslin Cotton',
    image: 'assets/kaftan.jpg',
    finish: 'Relaxed Open-Cut Silhouette with High Side Slits',
    wearTime: '100 GSM Handloom Fine Muslin Cotton',
    skinTypes: 'Effortless Resort & Festive Lounge Drape',
    keyActives: [
      '100% Fine Kerala Handloom Muslin Cotton',
      'Natural Plant Resin & Catechu Dye',
      'Hand-Rolled Edge Seams',
      'Featherweight Breathability in Tropical Humidity',
      'Deep Contrast Border Prints'
    ],
    ritual: 'Gentle cold soak with mild soap. Steam lightly or enjoy its natural lived-in texture.',
    stockistNote: 'Made in limited small batches. Consult directly on WhatsApp for immediate allocation.'
  },
  'c-nilambur-coord': {
    title: 'The Nilambur Relaxed Ethnic Co-ord',
    subtitle: 'Co-ords / 130 GSM Breathable Structured Cotton',
    image: 'assets/coord_set.jpg',
    finish: 'Boxy Mandarin Tunic & High-Rise Wide-Leg Culottes',
    wearTime: '130 GSM Breathable Structured Malabar Cotton',
    skinTypes: 'Effortless Two-Piece Ensemble with Functional Pockets',
    keyActives: [
      '100% Natural Malabar Cotton Weave',
      'Hand-Pressed Micro Bootah Woodblock Print',
      'Hand-Carved Coconut Shell Front Buttons',
      'Flat Front Waistband with Elasticized Back',
      'Deep Functional Inseam Pockets'
    ],
    ritual: 'Machine wash delicate cold. Hang dry on padded hanger. Quick warm steam press.',
    stockistNote: 'Separate top and pant sizing customized freely on WhatsApp.'
  },
  'c-kappad-coord': {
    title: 'The Kappad Leisure Tunic & Culotte Co-ord',
    subtitle: 'Co-ords / 125 GSM Textured Slub Cotton',
    image: 'assets/coord_set.jpg',
    finish: 'High-Low Side Slit Tunic & Relaxed Fluid Trouser',
    wearTime: '125 GSM Textured Slub Handloom Cotton',
    skinTypes: 'Contemporary Minimalist Ethnic Silhouette',
    keyActives: [
      '100% Pure Indian Hand-Spun Cotton',
      'Hand-Block Floral Border Details',
      'Hand-Finished Blind Hemming',
      'Zero Polyester or Synthetic Stretch Blends',
      'Breathable All-Day Travel and Festive Wear'
    ],
    ritual: 'Cold hand wash. Line dry in shade. Warm iron on reverse side if desired.',
    stockistNote: 'Handmade by Calicut artisans. Orders dispatched within 5 to 7 business days.'
  }
};

/* --- 6. Garment Textile & Fit Detail Drawer Modal --- */
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
  const modalIngredients = modalBackdrop.querySelector('.modal-ingredient-tags');
  const modalRitual = modalBackdrop.querySelector('.modal-ritual');
  const modalStockistNote = modalBackdrop.querySelector('.modal-stockist-note');
  const modalWhatsAppBtn = modalBackdrop.querySelector('.modal-whatsapp-cta');

  const openModal = (productId) => {
    const data = garmentTextileData[productId];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle;

    if (modalThumbImg) {
      modalThumbImg.src = data.image || 'assets/hero_ethnic.jpg';
      modalThumbImg.alt = data.title;
    }

    if (modalFinish) modalFinish.textContent = data.finish;
    if (modalWear) modalWear.textContent = data.wearTime;

    if (modalIngredients) {
      modalIngredients.innerHTML = data.keyActives
        .map(tag => `<span class="modal-ingredient-tag">${tag}</span>`)
        .join('');
    }

    if (modalRitual) modalRitual.textContent = data.ritual;
    if (modalStockistNote) modalStockistNote.textContent = data.stockistNote;

    // Dynamically update WhatsApp button URL with specific garment inquiry
    if (modalWhatsAppBtn) {
      const encodedMsg = encodeURIComponent(`Hello Khadeeja, I would like to inquire about the bespoke sizing and availability of "${data.title}" from Mehnave.`);
      modalWhatsAppBtn.href = `https://wa.me/918137010627?text=${encodedMsg}`;
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
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });
}
