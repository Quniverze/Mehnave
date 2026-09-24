/**
 * MEHNAVE ATELIER — INTERACTIVE ARCHIVE SCRIPTS
 * Showcase behavior: Category filter, textile swatches, garment spec detail drawer, stockist filter, hero video & motion
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

/* --- 3. Garment Category Filters --- */
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

/* --- 4. Interactive Fabric & Colorway Swatches --- */
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

/* --- 5. Garment Textile & Fit Detail Modal Drawer --- */
const garmentTextileData = {
  'c-trench': {
    title: 'The Riviera Raw Linen Trench',
    subtitle: 'Tailoring / Normandy Flax Canvas (340 GSM)',
    image: 'assets/hero_clothing.jpg',
    finish: 'Architectural Relaxed Trench / Storm Flap',
    wearTime: '340 GSM Heavy Bio-Washed Linen Canvas',
    skinTypes: 'Generous Dropped Shoulder with Belted Cinched Waist',
    keyActives: [
      '100% Normandy Long-Staple Flax',
      'Natural Buffalo Horn Buttons',
      'Unlined Body for Optimal Airflow',
      'French Seam Binding Throughout',
      'Zero Petroleum Interfacings or Coatings'
    ],
    ritual: 'Dry clean organically or steam gently. Normandy flax softens naturally over decades, molding to the wearer’s natural posture.',
    stockistNote: 'Permanent installation at Le Bon Marché Paris and Nordstrom NYC Flagship Atelier.'
  },
  'c-silk-blazer': {
    title: 'Sartorial Unstructured Silk Blazer',
    subtitle: 'Tailoring / Raw Tussah Wild Silk',
    image: 'assets/silk_blazer.jpg',
    finish: 'Neapolitan Soft-Shoulder Architectural Cut',
    wearTime: '260 GSM Raw Tussah Wild Silk Weave',
    skinTypes: 'Easy Fluid Silhouette with Curved Patch Pockets',
    keyActives: [
      '100% Raw Wild Tussah Mulberry Silk',
      'Carved Corozo Nut Artisan Buttons',
      'Natural Horsehair Canvas Chest Piece',
      'Undyed Organic Cotton Pocket Linings',
      'Breathable Open-Slub Slubbing'
    ],
    ritual: 'Steam or cold spot clean. Store on broad wooden wishbone hanger to preserve natural shoulder drape.',
    stockistNote: 'Available at SSENSE worldwide and Space NK London atelier salon.'
  },
  'c-poplin-duster': {
    title: 'Atelier Drape Poplin Duster',
    subtitle: 'Tailoring / Double-Faced Organic Cotton Poplin',
    image: null,
    finish: 'Minimalist Longline Open Front Coat',
    wearTime: '180 GSM High-Density GOTS Combed Cotton',
    skinTypes: 'Floor-Grazing Fluid Duster with Deep Side Slits',
    keyActives: [
      '100% Extra-Long Staple Organic Cotton',
      'Natural Plant-Starch Crisp Weave Finish',
      'Reinforced Bar-Tack Stress Seams',
      'Zero Microplastic Synthetic Blends'
    ],
    ritual: 'Gentle machine wash cold on delicate cycle. Line dry and warm iron while slightly damp for crisp architecture.',
    stockistNote: 'Stocked across all European and North American retail stockists.'
  },
  'c-bias-slip': {
    title: 'The Sunkissed Bias Slip Dress',
    subtitle: 'Dresses / 22-Momme Sandwashed Silk',
    image: 'assets/hero_clothing.jpg',
    finish: 'Fluid 45-Degree True Bias Cut Silhouette',
    wearTime: '22-Momme Heavyweight Sandwashed Mulberry Silk',
    skinTypes: 'Skims Contours Fluidly Without Clinging or Pulling',
    keyActives: [
      '100% Grade 6A Mulberry Silk',
      'Sandwashed for Velvet Peach-Skin Touch',
      'Adjustable Delicate Rouleau Straps',
      'Hand-Rolled Hemline Finishing',
      'Mineral Vat Dyed with Madder Clays'
    ],
    ritual: 'Hand wash in tepid water with pH-neutral silk rinse. Lay flat on dry towel away from direct sun.',
    stockistNote: 'Featured in the Paris Le Bon Marché luxury silk boutique.'
  },
  'c-linen-column': {
    title: 'Terra Tiered Linen Column Dress',
    subtitle: 'Dresses / Bio-Washed Normandy Flax Linen',
    image: 'assets/linen_dress.jpg',
    finish: 'Sculptural Boatneck Column with Subtle Waist Tuck',
    wearTime: '220 GSM Medium-Weight Slub Linen',
    skinTypes: 'Straight-Cut Architectural Fall with Back Vent',
    keyActives: [
      '100% Normandy Certified Flax Linen',
      'Pre-Washed with Organic Bio-Enzymes',
      'Concealed French Inseam Pockets',
      'Organic Cotton Binding Internal Seams'
    ],
    ritual: 'Machine wash cool with natural detergent. Tumble cool or air dry; natural crinkle honors the fiber’s nobility.',
    stockistNote: 'Permanent collection at Mecca Sydney and Nordstrom NYC.'
  },
  'c-silk-caftan': {
    title: 'Nocturne Heavy Silk Caftan',
    subtitle: 'Dresses / Raw Crepe de Chine Drape',
    image: null,
    finish: 'Voluminous Cocoon Silhouette with Deep V-Neck',
    wearTime: '30-Momme Heavyweight Textured Silk Crepe',
    skinTypes: 'One-Size Generous Fluid Drape (Universal Fit)',
    keyActives: [
      '100% Heavy Crepe de Chine Silk',
      'Low-Impact Mineral Pigment Dye',
      'High Side Hem Slits for Kinetic Flow',
      'Internal Silk Belt Ties for Optional Cinched Waist'
    ],
    ritual: 'Eco-friendly dry clean or gentle cold hand wash. Store folded in breathable linen garment pouch.',
    stockistNote: 'Exclusive capsule allocation at SSENSE and Restir Tokyo.'
  },
  'c-cashmere-knit': {
    title: 'Cashmere Air Ribbed Cardigan',
    subtitle: 'Knitwear / 7-Gauge Pure Combed Cashmere',
    image: 'assets/cashmere_knit.jpg',
    finish: 'Relaxed Boxy Fit with English Fisherman Rib Knit',
    wearTime: '380 GSM Heavyweight 2-Ply Mongolian Cashmere',
    skinTypes: 'Drop-Shoulder Silhouette with Deep V-Neck Placket',
    keyActives: [
      '100% Superfine Grade-A Mongolian Cashmere',
      'Ethically Sourced & Traceable Herding Cooperative',
      'Hand-Carved Olive Wood Placket Buttons',
      'Seamless Fully-Fashioned Knitting (Zero Yarn Waste)'
    ],
    ritual: 'Hand wash in cold water with wool balm. Press between towels, do not wring. Dry flat on mesh rack.',
    stockistNote: 'Available across all London, Paris, New York, and Tokyo retail locations.'
  },
  'c-linen-trouser': {
    title: 'Wide-Leg Pleated Linen Trouser',
    subtitle: 'Trousers / High-Waist Architectural Flax',
    image: 'assets/cashmere_knit.jpg',
    finish: 'High-Rise Double Inverted Front Pleats',
    wearTime: '280 GSM Heavy Slub Normandy Linen',
    skinTypes: 'Elongating Wide-Leg Fall with Clean Front Fly',
    keyActives: [
      '100% French Normandy Long-Staple Flax',
      'Curved Tailored Waistband Curtain',
      'Deep Slanted Pockets & Double Welt Back Pockets',
      'Zero Synthetic Elastic or Interfacing'
    ],
    ritual: 'Wash cold inside out. Hang dry. Steam to release travel creases or wear relaxed for effortless resort ease.',
    stockistNote: 'Stocked in all flagship departments and partner ateliers.'
  },
  'c-palazzo-pant': {
    title: 'Sateen Lounge Palazzo Pant',
    subtitle: 'Trousers / Silk-Cotton Heavy Luster Sateen',
    image: null,
    finish: 'Fluid Pull-On Lounge Trousers with Drawstring',
    wearTime: '210 GSM Silk-Cotton Bi-Weave Luster',
    skinTypes: 'Relaxed Mid-Rise with Flowing Wide Fluid Leg',
    keyActives: [
      '60% Mulberry Silk / 40% Long-Staple Cotton',
      'Enclosed Flat Silk Drawstring Waist',
      'Clean Blind Hemming at Ankle',
      'Zero Static Cling Due to 100% Natural Fibers'
    ],
    ritual: 'Cool machine wash on gentle cycle inside a protective mesh wash bag. Cool iron on reverse side.',
    stockistNote: 'Exclusive flagship stockist availability at Space NK and SSENSE.'
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
    const data = garmentTextileData[productId];
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
        modalThumbImg.src = 'assets/hero_clothing.jpg';
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
