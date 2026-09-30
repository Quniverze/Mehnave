/**
 * MEHNAVE — ONLINE ETHNIC WEAR LABEL
 * Founder & Designer: Khadeeja Mehna (Calicut, Kerala)
 * Online-first brand: Custom design & tailoring for every requirement
 * Direct WhatsApp: +91 8137010627
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
        if (motionText) motionText.textContent = 'Calicut Breeze';
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

/* --- 5. Genuine Ethnic Garment & Custom Tailoring Data --- */
const garmentTextileData = {
  'c-beypore-kurta': {
    title: 'The Beypore Straight Kurta Set',
    subtitle: 'Kurta Sets / Breathable Pure Soft Cotton',
    image: 'assets/kurta_set.jpg',
    finish: 'Straight-Cut Kurta with Tailored Pants & Dupatta',
    wearTime: 'Breathable, Soft All-Day Summer Cotton',
    skinTypes: 'Includes Straight Tailored Pants & Floral Block Dupatta',
    keyActives: [
      'Custom Sizing to Exact Measurements (Bust, Waist, Hip, Height)',
      'Sleeve Length & Neckline Customization Available',
      'Concealed Feeding Zips Provided on Request',
      'Matching Trousers with Comfortable Elastic/Drawstring',
      '100% Online Order with Direct WhatsApp Consultation'
    ],
    ritual: 'Gentle machine wash cold or quick hand wash with mild liquid detergent. Line dry in shade to maintain color depth.',
    stockistNote: 'Online custom order. Share your measurements directly on WhatsApp for tailored sizing and custom adjustments.'
  },
  'c-mananchira-kurta': {
    title: 'The Mananchira Embroidered Kurta Set',
    subtitle: 'Kurta Sets / Textured Cotton with Delicate Needlework',
    image: 'assets/kurta_set.jpg',
    finish: 'Graceful Split Neckline with Cigarette Trousers',
    wearTime: 'Lightweight, Breathable Comfort Cotton',
    skinTypes: 'Tailored Straight Fit with Deep Functional Side Pockets',
    keyActives: [
      'Tailored to Any Body Measurements or Standard Sizes',
      'Delicate Hand Needlework along Neckline & Cuffs',
      'Custom Sleeve Length & Lining Options Available',
      'Concealed Feeding Zips Built-In upon Request',
      'Directly Dispatched to Your Doorstep Worldwide'
    ],
    ritual: 'Gentle cold hand wash or machine wash delicate. Warm iron on reverse side for a crisp, neat finish.',
    stockistNote: 'Custom made by Mehnave. Message Khadeeja Mehna on WhatsApp to tailor your exact fit.'
  },
  'c-malabar-anarkali': {
    title: 'The Malabar Tiered Flared Anarkali',
    subtitle: 'Anarkalis / Flared Flowing Cotton Gown',
    image: 'assets/anarkali.jpg',
    finish: '3-Tier Gathered Floor-Length Flare with Dupatta',
    wearTime: 'Featherlight Airy Cotton with Generous Flare',
    skinTypes: 'Universally Flattering Silhouette for Celebrations & Events',
    keyActives: [
      'Custom Chest, Yoke Length & Total Gown Height Tailoring',
      'Full Sweeping Flare without Heavy, Stiff Linings',
      'Feeding-Friendly Concealed Zips on Request',
      'Includes Matching Cotton Dupatta with Hand-Tied Tassels',
      'Custom Modest Sleeve & Neckline Coverage Available'
    ],
    ritual: 'Hand wash gently in cold water or dry clean for special occasions. Hang on a padded hanger in the shade.',
    stockistNote: 'Perfect for weddings, festive gatherings, and special events. Consult on WhatsApp for custom measurements.'
  },
  'c-wayanad-anarkali': {
    title: 'The Wayanad Flared Anarkali Set',
    subtitle: 'Anarkalis / Soft Slub Cotton with Floral Motifs',
    image: 'assets/anarkali.jpg',
    finish: 'Empire Gathered Ankle-Length Silhouette',
    wearTime: 'Soft Textured Cotton for All-Day Wear',
    skinTypes: 'Generous Gathers for Effortless Grace & Movement',
    keyActives: [
      'Custom Lengths for Petite or Tall Heights',
      'Modest Necklines & Full Sleeve Customization Available',
      'Pair with Matching Straight Pants or Churidars',
      'Breathable Non-Itchy Inner Seam Stitching',
      'Personal Designer Guidance from Khadeeja Mehna'
    ],
    ritual: 'Cold gentle wash. Air dry in soft morning light. Iron on medium setting.',
    stockistNote: 'Made to your specific order. Share your desired length and measurements on WhatsApp.'
  },
  'c-kozhikode-kaftan': {
    title: 'The Kozhikode Breeze Cotton Kaftan',
    subtitle: 'Kaftans / Relaxed Modest Loungewear & Outing Kaftan',
    image: 'assets/kaftan.jpg',
    finish: 'Fluid Cocoon Fit with Adjustable Waist Drawstring',
    wearTime: '100% Breathable, Soft Washing Cotton',
    skinTypes: 'Comfortable Split V-Neck with Braided Cotton Tassels',
    keyActives: [
      'One Generous Relaxed Size or Custom Tailored Height',
      'Adjustable Waist Drawstring to Cinch or Wear Loose',
      'Full-Coverage Modest Cut with Elegant Border Detailing',
      'Feeding-Friendly Front Button or Zip Variations Available',
      'Effortless Slip-On Comfort for Daily & Occasion Wear'
    ],
    ritual: 'Cold machine wash on delicate cycle. Hang to dry away from harsh direct midday sunlight.',
    stockistNote: 'Online order ready. Message us on WhatsApp with your color choice and length preference.'
  },
  'c-arabica-kaftan': {
    title: 'The Arabica Coastal Kaftan',
    subtitle: 'Kaftans / Featherweight Breathable Cotton',
    image: 'assets/kaftan.jpg',
    finish: 'Relaxed Silhouette with Contrast Printed Cuffs & Hem',
    wearTime: 'Ultra-Soft Muslin Cotton for Warm Climates',
    skinTypes: 'Effortless Resort, Travel & Festive Lounge Drape',
    keyActives: [
      'Super-Soft, Non-Transparent Lightweight Cotton',
      'Custom Sleeve Length & Side Slit Height on Request',
      'Airy Fit Designed for Humidity & Warm Weather',
      'Quick Ordering & Prompt Doorstep Delivery',
      'Custom Pockets Added upon Request'
    ],
    ritual: 'Quick cold hand wash. Shake out creases and dry in shade. Light steam if desired.',
    stockistNote: 'Made to order by Mehnave. Chat on WhatsApp for direct sizing and immediate dispatch dates.'
  },
  'c-nilambur-coord': {
    title: 'The Nilambur Ethnic Co-ord Set',
    subtitle: 'Co-ords / Modern Tunic & Wide-Leg Culottes',
    image: 'assets/coord_set.jpg',
    finish: 'Smart Mandarin Tunic & Comfortable Elastic Crop Pants',
    wearTime: 'Structured Breathable Cotton for All-Day Polish',
    skinTypes: 'Effortless Two-Piece Set with Deep Functional Pockets',
    keyActives: [
      'Separate Top & Bottom Sizing (Mix & Match Sizes)',
      'Custom Tunic Length & Sleeve Length Options',
      'High-Rise Culottes with Flat Front & Elastic Back',
      'Feeding Zip Additions Welcomed on Request',
      'Tailored with Neat Interlocked Seams for Longevity'
    ],
    ritual: 'Machine wash cold on gentle cycle. Hang dry. Easy warm iron.',
    stockistNote: 'One of our most popular online designs. Chat on WhatsApp to share your top and pant sizes.'
  },
  'c-kappad-coord': {
    title: 'The Kappad Leisure Co-ord Set',
    subtitle: 'Co-ords / Relaxed High-Low Tunic & Trousers',
    image: 'assets/coord_set.jpg',
    finish: 'High-Low Side Slit Tunic with Straight Fluid Pants',
    wearTime: 'Natural Slub Cotton with Soft Botanical Tones',
    skinTypes: 'Minimalist Contemporary Ethnic Everyday Luxury',
    keyActives: [
      'Custom Bust, Waist, and Pant Inseam Measurements',
      'Flattering Modest High-Low Hemline Coverage',
      'Soft Pre-Washed Cotton that Never Shrinks',
      'Available in All Four Signature Pastel Botanical Shades',
      '100% Online Consultation with Founder Khadeeja Mehna'
    ],
    ritual: 'Hand wash or delicate machine wash cold. Hang to dry on a padded hanger.',
    stockistNote: 'Custom made to your order. Inquire directly on WhatsApp to order your personalized set.'
  }
};

/* --- 6. Garment Craft & Customization Drawer Modal --- */
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
      const encodedMsg = encodeURIComponent(`Hello Khadeeja, I would like to order "${data.title}" from Mehnave. Can you help me with custom sizing and details?`);
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
