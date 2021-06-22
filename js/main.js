

$(document).ready(function(e) {
  $('img[usemap]').rwdImageMaps();

  $('area').on('focus', function(e) {
    e.preventDefault();
    $('.selection p').html($(this).attr('class'));      
  });

  $(document).on('click', function(e) {
    e.preventDefault();
    if ( $(e.target).closest('area').length === 0 ) {
      $('.selection p').html('click a brick'); 
    }  
  });
  

  
});

///////////////////////////////////////////////////

$(document).ready(function() {

  var s_round = '.s_round';

  $(s_round).hover(function() {
    $('.b_round').toggleClass('b_round_hover');
    return false;
  });

  $(s_round).click(function() {
    $('.flip_box').toggleClass('flipped');
    $(this).addClass('s_round_click');
    $('.s_arrow').toggleClass('s_arrow_rotate');
    $('.b_round').toggleClass('b_round_back_hover');
    return false;
  });

  $(s_round).on('transitionend', function() {
    $(this).removeClass('s_round_click');
    $(this).addClass('s_round_back');
    return false;
  });
});







(function() {
"use strict";

/*------------------------------------------------------------------

  01. Custom easings
  02. Preloader
  03. Header
  04. Page reveals
  05. Custom cursor
  06. Elements reveal
  07. Main sliders
  08. Section sliders
  09. Contact form
  10. Isotope grids
  11. Lazy loading
  12. Parallax
  13. To top button
  14. Scroll down button
  15. Video
  16. Scroll to id
  17. PJAX

-------------------------------------------------------------------*/



// GSAP: turn off console warnings
gsap.config({
	nullTargetWarn: false
});

window.App = {};

App.config = {
  headroom: {
    enabled: true,
    options: {
      classes : {
        initial : "headroom",
        pinned : "is-pinned",
        unpinned : "is-unpinned",
        top : "is-top",
        notTop : "is-not-top",
        bottom : "is-bottom",
        notBottom : "is-not-bottom",
        frozen: "is-frozen",
      },
    }
  },
  ajax: {
    enabled: true,
  },
  cursorFollower: {
    enabled: true,
    disableBreakpoint: '992', // cursor will be disabled on this device width
  },
}

App.html = document.querySelector('html');
App.body = document.querySelector('body');
App.SMcontroller = new ScrollMagic.Controller();

if (App.config.headroom.enabled) {
  App.headroom = new Headroom(document.querySelector(".js-header"), App.config.headroom.options);
}

window.onload = function () {

  customEasingsInit();
  pageRevealEffects();
  Preloader.init();

  if (App.config.headroom.enabled) {
    App.headroom.init();
  }

  if (App.config.cursorFollower.enabled) {
    Cursor.init();
  }
  
  if (App.config.ajax.enabled) {
		PJAX.init();
	}

  document.fonts.ready.then(function () {
    initComponents();
    initialReveal();
  });

}


// Reloads all scripts when navigating through pages
function initComponents() {

  Header.init();
  lazyLoading();
  splitTextIntoLines();
  backButton();
  uiScrollDown();
  scrollToIdInit();
  parallaxInit();
  contactForm();
  
  mainSlider1Init();
  mainSlider2Init();
  MainSlider3.init();
  sectionSlidersInit();
  
  masonryFilterInit();
  masonryGridInit();
  
  feather.replace();
  videoBtn();

  //
	// your custom plugins init here
	//

}


/*--------------------------------------------------
  01. Custom easings
---------------------------------------------------*/

function customEasingsInit() {
  CustomEase.create("quart.out", "0.25, 1, 0.5, 1");
  CustomEase.create("quart.inOut", "0.76, 0, 0.24, 1");
}

/*--------------------------------------------------
  02. Preloader
---------------------------------------------------*/

const Preloader = (function() {

  const preloader = document.querySelector('.js-preloader');
  const bg = preloader.querySelector('.preloader__bg');
  const progress = preloader.querySelector('.preloader__progress');
  const progressInner = preloader.querySelector('.preloader__progress__inner');

  function initial() {

    gsap.registerEffect({
      name: 'preloaderInitial',
      effect: (target, config) => {

        document.documentElement.classList.add('html-overflow-hidden');
        const tl = gsap.timeline();

        if (!document.body.classList.contains('preloader-visible')) {
          document.documentElement.classList.remove('html-overflow-hidden');
          return tl;
        }
        
        return tl
          .fromTo(progressInner, {
            scaleY: 0,
          }, {
            scaleY: 1,
            ease: 'none',
            duration: 1,
            delay: 0.3,
            onStart: () => {
              bg.classList.add('origin-top');
            }
          })
          .to(progress, {
            duration: 0.5,
            ease: 'quart.inOut',
            opacity: 0,
            scale: 0.75,
          }, '>-0.1')
          .to(bg, {
            ease: 'quart.inOut',
            duration: 0.6,
            scaleY: 0,
            onComplete: () => {
              document.documentElement.classList.remove('html-overflow-hidden');
            },
          }, '>-0.5')

      },
      extendTimeline: true,
    });

  }

  function show() {

    gsap.registerEffect({
      name: 'preloaderShow',
      effect: (target, config) => {
    
        const tl = gsap.timeline();

        if (!preloader) {
          return tl;
        }
    
        tl
          .set(progress, {
            opacity: 0,
            scale: 0.75,
          })
          .set(progressInner, {
            scaleY: 0,
          })
    
          .to(bg, {
            ease: 'quart.inOut',
            duration: 0.6,
            scaleY: 1,
            onStart: () => {
              bg.classList.remove('origin-top');
              document.documentElement.classList.add('html-overflow-hidden');
            },
          })
          .to(progress, {
            delay: 0.1,
            duration: 0.6,
            ease: 'quart.out',
            opacity: 1,
            scale: 1,
          })
          .to(progressInner, {
            scaleY: 1,
            duration: 1,
            ease: 'none',
          }, '>-0.3')
    
    
        return tl;
    
      },
      extendTimeline: true,
    });

  }
  
  function hide() {

    gsap.registerEffect({
      name: 'preloaderHide',
      effect: (target, config) => {
    
        const tl = gsap.timeline();

        return tl
          .to(progress, {
            delay: 0.15,
            duration: 0.5,
            ease: 'quart.inOut',
            opacity: 0,
            scale: 0.75,
            onStart: () => {
              bg.classList.add('origin-top');
            }
          })
          .to(bg, {
            ease: 'quart.inOut',
            duration: 0.6,
            scaleY: 0,
            onComplete: () => {
              document.documentElement.classList.remove('html-overflow-hidden');
              document.documentElement.classList.remove('overflow-hidden');
              document.body.classList.remove('overflow-hidden');
            },
          }, '>-0.5')
    
      },
      extendTimeline: true,
    });

  }

  function init() {

    if (!preloader) return;

    initial();
    show();
    hide();

  }

  return {
    init: init,
  }

})();

/*--------------------------------------------------
  03. Header
---------------------------------------------------*/

const Header = (function() {

  let navInner;
  let navBg;
  let navList;
  let navListLinks;
  let navInfoItems;
  
  let navBtnOpen;
  let navBtnClose;
  let navBack;

  let menuDeepLevel;
  let timeline = gsap.timeline();

  function updateVars() {
    navInner = document.querySelector('.js-nav-inner');
    navBg = navInner.querySelector('.js-nav-bg');
    navList = navInner.querySelector('.js-navList');
    navListLinks = navInner.querySelectorAll('.js-navList > li > a');
    navInfoItems = navInner.querySelectorAll('.js-navInfo-item');

    navBtnOpen = document.querySelector('.js-nav-open');
    navBtnClose = document.querySelector('.js-nav-close');
    navBack = document.querySelector('.js-nav-back');

    menuDeepLevel = 0;
  }

  
  function init() {

    updateVars();
    menuListBindEvents();
    menuAnimBindEvents();
    classicMenuInit();
    headerSticky();

  }

  function deepLevelCheck(level) {

    if (level) {
      gsap.to(navBack, {
        ease: "quart.inOut",
        duration: 0.6,
        y: '0px',
        opacity: 1,
        onStart: () => {
          navBack.classList.remove('pointer-events-none');
        },
      })
    } else {
      gsap.to(navBack, {
        ease: "quart.inOut",
        duration: 0.6,
        opacity: 0,
        onStart: () => {
          navBack.classList.add('pointer-events-none');
        },
      })
    }

  }

  function menuListBindEvents() {

    const listItems = document.querySelectorAll('.js-navList .menu-item-has-children');

    if (!listItems.length) return;

    navBack.addEventListener('click', () => {
      const visibleList = navList.querySelector('ul.is-visible');
      const parentList = visibleList.parentElement.parentElement;

      menuDeepLevel--;

      deepLevelCheck(menuDeepLevel);
      menuListStepAnimate(visibleList, parentList);
    });
    
    listItems.forEach(el => {
      const parentLink = el.querySelector('li > a');
      parentLink.removeAttribute('href');

      parentLink.addEventListener('click', () => {
        const parent = el.parentElement;
        const subnavList = el.lastElementChild;

        menuDeepLevel++;

        deepLevelCheck(menuDeepLevel);
        menuListStepAnimate(parent, subnavList);
      });
    });

  }

  function menuListStepAnimate(hideList, showList) {

    const navBtnClose = document.querySelector('.js-nav-close');
    
    let hideListItems = hideList.children;
    hideListItems = Array.from(hideListItems);
    const hideListLinks = hideListItems.map(item => item.querySelector('li > a'));
    
    let showListItems = showList.children;
    showListItems = Array.from(showListItems);
    const showListLinks = showListItems.map(item => item.querySelector('li > a'));

    timeline
      .clear()
      .to(hideListLinks, {
        ease: 'quart.out',
        stagger: -0.04,
        duration: 1.0,
        y: '100%',
        onStart: () => {
          showList.classList.add('is-visible');
          hideList.classList.remove('is-visible');
          navBtnClose.classList.add('pointer-events-none');
        },
      })
      .to(showListLinks, {
        ease: 'quart.out',
        stagger: 0.08,
        duration: 1.2,
        y: '0%',
        onComplete: () => {
          navBtnClose.classList.remove('pointer-events-none');
        },
      }, '>-0.6')

  }

  function menuAnimBindEvents() {

    if (!navBtnOpen) return;

    navBtnOpen.addEventListener('click', () => {
      if (App.config.headroom.enabled) {
        App.headroom.freeze();
      }

      App.html.classList.add('html-overflow-hidden');
      showMenu();
    });

    navBtnClose.addEventListener('click', () => {
      if (App.config.headroom.enabled) {
        App.headroom.unfreeze();
      }

      App.html.classList.remove('html-overflow-hidden');
      hideMenu();
    })

  }

  function showMenu() {

    navInner.classList.add('is-active');

    gsap.timeline()
      .set(navListLinks, { opacity: 1, })
      .set(navBack, { opacity: 0, })

      .fromTo(navBg, {
        scaleY: 0,
      }, {
        scaleY: 1,
        duration: 0.8,
        ease: "quart.inOut",
      })
      .fromTo(navBtnClose, {
        y: '16px',
        opacity: 0,
      }, {
        ease: "quart.out",
        duration: 0.8,
        y: '0px',
        opacity: 1,
      }, '>-0.2')
      .fromTo(navListLinks, {
        y: '100%',
      }, {
        ease: 'quart.out',
        stagger: 0.08,
        duration: 1.2,
        y: '0%',
      }, '>-0.7')
      .fromTo(navInfoItems, {
        opacity: 0,
        y: '34px',
      }, {
        ease: "quart.out",
        stagger: 0.08,
        duration: 1.0,
        opacity: 1,
        y: '0px',
        onComplete: () => {
          navList.classList.add('is-visible');
          navBtnClose.classList.remove('pointer-events-none');
        },
      }, '<')

  }

  function hideMenu() {

    const navVisibleList = navInner.querySelector('.is-visible');
    const navActiveListLinks = navInner.querySelectorAll('.is-visible > li > a');
    menuDeepLevel = 0;

    gsap.timeline()
      .to([navBtnClose, navBack], {
        ease: "quart.out",
        duration: 0.6,
        opacity: 0,
        y: '-16px',
        onStart: () => {
          navBtnClose.classList.add('pointer-events-none');
          navVisibleList.classList.remove('is-visible');
          navBg.classList.add('origin-top');
        },
      })
      .to(navActiveListLinks, {
        ease: "quart.out",
        duration: 0.8,
        y: '-100%',
      }, '>-0.4')
      .to(navInfoItems, {
        opacity: 0,
        y: '-34px',
        ease: "quart.out",
        duration: 0.8,
      }, '<')

      .to(navBg, {
        ease: "quart.inOut",
        duration: 0.8,
        scaleY: 0,
        onComplete: () => {
          navBtnOpen.classList.remove('pointer-events-none');
          navBg.classList.remove('origin-top');
          navInner.classList.remove('is-active');
        },
      }, '>-0.6')

  }

  function classicMenuInit() {

    const target = document.querySelectorAll('.js-navClassic-list .menu-item-has-children');
  
    if (!target.length) return;
  
    const header = document.querySelector('.header');
    let dropDownTheme;
  
    if (header.classList.contains('js-header-dark')) {
      dropDownTheme = 'dark';
    } else {
      dropDownTheme = 'light';
    }
  
    target.forEach(el => {
      let subnav = el.children;
      let where = 'bottom';
      subnav = subnav[subnav.length - 1];

      if (
        el.closest(".menu-item-has-children") &&
        el.closest(".subnav-list")
      ) {
        where = 'right';
      }
      
      tippy(el, {
        interactive: true,
        content: subnav,
        allowHTML: true,
        placement: where,
        offset: [40, 0],
        delay: [null, 200],
  
        theme: dropDownTheme,
        animation: 'shift',
  
        popperOptions: {
          modifiers: [
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['left-start'],
              },
            },
            {
              name: 'preventOverflow',
              options: {
                altAxis: true,
              },
            },
          ],
        },
      });
    });
  
  }
  
  function headerSticky() {
  
    const header = document.querySelector('.js-header');
  
    if (!header) return;
  
    new ScrollMagic.Scene({
      offset: '2px',
    })
      .setClassToggle(header, 'is-sticky')
      .addTo(App.SMcontroller);
  
  }


  return {
    init: init,
  }

})();

/*--------------------------------------------------
  04. Page reveals
---------------------------------------------------*/

function pageRevealEffects() {

  // masthead shapes
  gsap.registerEffect({
    name: 'mastheadShapes',
    effect: (target, config) => {

      return gsap.fromTo(target, {
        opacity: 0,
        y: config.y,
      }, {
        ease: config.easing,
        duration: config.duration,
        opacity: 1,
        y: '0%',
      })
  
    },
    extendTimeline: true,
    defaults: {
      easing: 'quart.out',
      duration: 3.0,
      y: '90%',
    },
  });

  // header, menu and ui elements
  gsap.registerEffect({
    name: 'uiElementsAnimate',
    effect: (target, config) => {

      let headerLogo;
      let headerMenu;
      let classicMenu;
      let uiElements;

      if (document.querySelector('.js-header-logo')) {
        headerLogo = document.querySelector('.js-header-logo');
      }
      if (document.querySelector('.js-header-menu')) {
        headerMenu = document.querySelector('.js-header-menu');
      }
      if (document.querySelector('.js-navClassic-list > li > a')) {
        classicMenu = document.querySelectorAll('.js-navClassic-list > li > a');
      }
      if (document.querySelector('.js-ui')) {
        uiElements = document.querySelectorAll('.js-ui');
      }

      if (!headerLogo && !headerMenu && !uiElements && !classicMenu) return;

      return gsap.fromTo([
        headerLogo,
        headerMenu,
        classicMenu,
        uiElements,
      ], {
        y: config.y,
        opacity: 0,
      }, {
        ease: config.easing,
        duration: config.duration,
        y: '0px',
        opacity: 1,
      })
  
    },
    extendTimeline: true,
    defaults: {
      easing: 'quart.out',
      duration: 0.8,
      y: '30px',
    },
  });

  // masthead background
  gsap.registerEffect({
    name: 'mastheadBackground',
    effect: (target, config) => {

      return gsap.fromTo(target, {
        scale: 1.4,
        opacity: 0,
      }, {
        ease: 'quart.inOut',
        duration: 1.4,
        scale: 1,
        opacity: 1,
      })
  
    },
    extendTimeline: true,
  });

}


const PageReveal = (function() {

  function mastheadType_1(tl) {

    if (!document.querySelector('.js-masthead-type-1')) {
      return tl;
    }

    const masthead = document.querySelector('.js-masthead-type-1');
    let title = false;
    let text = masthead.querySelector('.js-text');
    let button = masthead.querySelector('.js-button');

    if (masthead.querySelector('.js-title')) {
      title = masthead.querySelectorAll('.js-title .split__line');
    }


    const splitTitle = {
      stagger: 0.1,
      duration: 1.2,
      ease: 'quart.out',
      y: '0%',
    };
    
    const textButton = {
      stagger: 0.1,
      duration: 1,
      ease: 'quart.out',
      y: '0%',
      opacity: 1,
    };


    gsap.set([text, button], {
      y: '35px',
      opacity: 0,
    })


    if (masthead.classList.contains('js-shapes')) {
      const shapes = masthead.querySelectorAll('.js-shape');

      tl
        .mastheadShapes(shapes, '>-0.7')
        .to(title, splitTitle, '>-2.3')
        .to([text, button], textButton, '>-0.8')
        .uiElementsAnimate(null, '>-0.8')
    }

    if (masthead.classList.contains('js-bg')) {
      const bgItem = masthead.querySelector('.js-bg-item');

      tl
        .mastheadBackground(bgItem, '>-0.0')
        .to(title, splitTitle, '>-0.5')
        .to([text, button], textButton, '>-0.8')
        .uiElementsAnimate(null, '>-0.8')
    }

  }

  function mastheadType_2(tl) {

    if (!document.querySelector('.js-masthead-type-2')) {
      return tl;
    }

    const masthead = document.querySelector('.js-masthead-type-2');
    const shapes = masthead.querySelectorAll('.js-shape');
    const bgItem = masthead.querySelector('.js-bg-item');
    const title = masthead.querySelector('.js-title');
    const text = masthead.querySelector('.js-text');
    const button = masthead.querySelector('.js-button');

    let delay = '>-0.1';

    if (shapes.length) {
      tl.mastheadShapes(shapes, '>-0.2')
      tl.uiElementsAnimate(null, '>-2.5')
      delay = '>-0.9';
    } else if (bgItem) {
      tl.mastheadBackground(bgItem, '>-0.8')
      tl.uiElementsAnimate(null, '>-0.1')
      delay = '>-0.1';
    }

    tl
      .fromTo(title.querySelectorAll('.split__line'), {
        y: '100%',
      }, {
        stagger: 0.12,
        duration: 1.4,
        ease: 'quart.out',
        y: '0%',
      }, delay)
      .fromTo(text.querySelectorAll('.split__line'), {
        y: '100%',
      }, {
        stagger: 0.08,
        duration: 1.2,
        ease: 'quart.out',
        y: '0%',
      }, '>-0.8')
      .fromTo(button, {
        y: '100%',
      }, {
        ease: 'quart.out',
        duration: 1.2,
        y: '0%',
      }, '>-0.8')

  }

  function mastheadType_3(tl) {

    if (!document.querySelector('.js-masthead-type-3')) {
      return tl;
    }

    const masthead = document.querySelector('.js-masthead-type-3');
    let subtitle = false;
    let title = false;
    let text = false;
    let button = masthead.querySelector('.js-button');
    let button2 = masthead.querySelector('.js-button-2');
    

    if (masthead.querySelector('.js-subtitle')) {
      subtitle = masthead.querySelectorAll('.js-subtitle .split__line');
    }

    if (masthead.querySelector('.js-title')) {
      title = masthead.querySelectorAll('.js-title .split__line');
    }

    if (masthead.querySelector('.js-text')) {
      text = masthead.querySelectorAll('.js-text .split__line');
    }


    const splitLines = {
      stagger: 0.1,
      duration: 1.2,
      ease: 'quart.out',
      y: '0%',
    };

    const slideButton = {
      ease: 'quart.out',
      duration: 1.2,
      y: '0%',
    };

    gsap.set(button, { y: '100%' });
    gsap.set(button2, { y: '100%' });


    if (masthead.classList.contains('js-shapes')) {
      const shapes = masthead.querySelectorAll('.js-shape');

      tl
        .mastheadShapes(shapes, '>-0.7')
        .to(subtitle, splitLines, '>-2.0')
        .to(title, splitLines, '>-0.9')
        .to(text, splitLines, '>-0.9')
        .to(button, slideButton, '>-0.9')
        .to(button2, slideButton, '>-0.9')
        .uiElementsAnimate(null, '>-0.9')
    }

    if (masthead.classList.contains('js-bg')) {
      const bgItem = masthead.querySelector('.js-bg-item');

      tl
        .mastheadBackground(bgItem, '>-0.0')
        .to(subtitle, splitLines, '>-0.5')
        .to(title, splitLines, '>-0.9')
        .to(text, splitLines, '>-0.9')
        .to(button, slideButton, '>-0.9')
        .to(button2, slideButton, '>-0.9')
        .uiElementsAnimate(null, '>-0.9')
    }

  }

  function mastheadType_4(tl) {

    if (!document.querySelector('.js-masthead-type-4')) {
      return tl;
    }

    const masthead = document.querySelector('.js-masthead-type-4');
    let image = masthead.querySelector('.js-image');
    let imageCover = masthead.querySelector('.js-image-cover');
    let subtitle = false;
    let title = false;
    let text = false;
    let button = masthead.querySelector('.js-button');

    if (masthead.querySelector('.js-subtitle')) {
      subtitle = masthead.querySelectorAll('.js-subtitle .split__line');
    }

    if (masthead.querySelector('.js-title')) {
      title = masthead.querySelectorAll('.js-title .split__line');
    }

    if (masthead.querySelector('.js-text')) {
      text = masthead.querySelectorAll('.js-text .split__line');
    }


    gsap.set(image, { scale: 2.2 });
    gsap.set(button, { y: '101%' });

    tl
      .to(imageCover, {
        duration: 0.8,
        ease: 'quart.inOut',
        scaleX: 0,
      }, '>-0.1')
      .to(image, {
        duration: 0.8,
        ease: 'quart.inOut',
        scale: 1,
      }, '>-0.8')
      
      .to(subtitle, {
        stagger: 0.1,
        duration: 1.0,
        ease: 'quart.out',
        y: '0%',
      }, '>-0.3')
      .to(title, {
        stagger: 0.1,
        duration: 1.0,
        ease: 'quart.out',
        y: '0%',
      }, '>-0.8')
      .to(text, {
        stagger: 0.1,
        duration: 1.0,
        ease: 'quart.out',
        y: '0%',
      }, '>-0.8')
      .to(button, {
        ease: 'quart.out',
        duration: 1,
        y: '0%',
      }, '>-0.8')

      .uiElementsAnimate(null, '>-0.8')

  }


  function mastheadPortfolioWorkType_1(tl) {

    if (!document.querySelector('.js-masthead-type-work-1')) {
      return tl;
    }

    const masthead = document.querySelector('.js-masthead-type-work-1');
    const subtitle = masthead.querySelectorAll('.js-subtitle .split__line');
    const title = masthead.querySelectorAll('.js-title .split__line');
    const infoItems = masthead.querySelectorAll('.js-info-item .split__line');
    

    const splitBase = {
      stagger: 0.1,
      duration: 1,
      ease: 'quart.out',
      y: '0%',
    };

    const splitInfoItems = {
      stagger: 0.08,
      duration: 0.8,
      ease: 'quart.out',
      opacity: 1,
      y: '0px',
    };


    gsap.set(infoItems, { opacity: 0, y: '34px' });


    if (masthead.classList.contains('js-shapes')) {
      const shapes = masthead.querySelectorAll('.js-shape');
      const image = masthead.querySelector('.js-image');

      gsap.set(image, { opacity: 0, y: '34px' });

      tl
        .mastheadShapes(shapes, '>-0.8')
        .to(subtitle, splitBase, '>-2.3')
        .to(title, splitBase, '>-0.8')
        .to(infoItems, splitInfoItems, '>-0.8')
        .to(image, {
          duration: 1,
          ease: 'quart.out',
          opacity: 1,
          y: '0px',
        }, '>-0.5')
    }

    if (masthead.classList.contains('js-bg')) {
      const image = masthead.querySelector('.js-image');

      gsap.set(image, { opacity: 0, scale: 1.3 });

      tl
        .to(image, {
          duration: 1.0,
          ease: 'quart.inOut',
          opacity: 1,
          scale: 1,
        }, '>-0.2')
        .uiElementsAnimate(null, '>-0.4')
        .to(subtitle, splitBase, '>-0.6')
        .to(title, splitBase, '>-0.8')
        .to(infoItems, splitInfoItems, '>-0.8')
        
    }

  }

  function mastheadBlogArticle(tl) {

    if (!document.querySelector('.js-masthead-blog-article')) {
      return tl;
    }
    
    const masthead = document.querySelector('.js-masthead-blog-article');
    const info = masthead.querySelector('.js-info');
    const title = masthead.querySelector('.js-title');

    tl
      .fromTo(info, {
        opacity: 0,
        y: '34px',
      }, {
        duration: 1,
        ease: 'quart.out',
        opacity: 1,
        y: '0px',
      }, '>-0.2')
      .to(title.querySelectorAll('.split__line'), {
        stagger: 0.1,
        duration: 1.0,
        ease: 'quart.out',
        y: '0%',
      }, '>-0.7')

  }


  function sliderMainType_1(tl) {

    if (!document.querySelector('.js-sliderMain-type-1')) {
      return tl;
    }

    const slider = document.querySelector('.js-sliderMain-type-1');
    const image = slider.querySelector('.js-image');
    const bgTitle = slider.querySelector('.sliderMain__bgTitle');
    const subtitle = slider.querySelector('.sliderMain__subtitle');
    const title = slider.querySelector('.sliderMain__title');
    const button = slider.querySelector('.sliderMain__button');

    tl
      .fromTo(image, {
        scale: 1.6,
        opacity: 0,
      }, {
        duration: 0.8,
        ease: 'quart.inOut',
        scale: 1,
        opacity: 1,
      }, '>-0.1')
  
      .fromTo([subtitle, title, button], {
        opacity: 0,
        y: '35px',
      }, {
        stagger: 0.1,
        duration: 0.8,
        ease: 'quart.out',
        opacity: 1,
        y: '0px',
      }, '>-0.2')
      .fromTo(bgTitle, {
        opacity: 0,
        x: '35px',
      }, {
        duration: 0.8,
        ease: 'quart.out',
        opacity: 1,
        x: '0px',
      }, '>-0.6')

      .uiElementsAnimate(null, '>-0.5')

  }

  function sliderMainType_2(tl) {

    if (!document.querySelector('.js-sliderMain-type-2')) {
      return tl;
    }

    const slider = document.querySelector('.js-sliderMain-type-2');
    const slideContent = slider.querySelector('[data-swiper-slide-index="0"]');
    let img = slider.querySelectorAll('.js-slider-img')[0];
    let title = slider.querySelectorAll('.js-slider-title');
    let subtitle = slideContent.querySelector('.js-slider-subtitle');

    gsap.set([title, subtitle], { opacity: 0, y: '40px', })

    tl
      .add(() => {
        img.classList.add('is-active');
      }, '>-0.0')
      .uiElementsAnimate(null, '>+0.6')
      .to(title, {
        ease: 'quart.inOut',
        duration: 0.8,
        opacity: 1,
        y: '0px',
      }, '>-0.6')
      .to(subtitle, {
        duration: 0.8,
        ease: 'quart.inOut',
        opacity: 1,
        y: '0px',
      }, '>-0.7')

  }

  function sliderMainType_3(tl) {

    if (!document.querySelector('.js-sliderMain-type-3')) {
      return tl;
    }

    const slider = document.querySelector('.js-sliderMain-type-3');
    const image = slider.querySelector('.js-image');
    const imageCover = slider.querySelector('.js-image-cover');
    const slideContent = slider.querySelector('.slider__content');
    const subtitle = slideContent.querySelector('.js-subtitle');
    const title = slideContent.querySelector('.js-title');
    const subtitle2 = slideContent.querySelector('.js-subtitle-2');
    const button = slideContent.querySelector('.js-button');
    const button2 = slideContent.querySelector('.js-button-2');
    
    

    gsap.set(image, { scale: 1.5, })
    gsap.set(button, { y: '100%', })

    tl
      .to(imageCover, {
        duration: 0.8,
        ease: 'quart.inOut',
        scaleX: 0,
      }, '>-0.1')
      .to(image, {
        duration: 0.8,
        ease: 'quart.inOut',
        scale: 1,
      }, '>-0.8')

      .to(subtitle.querySelectorAll('.split__line'), {
        duration: 1,
        ease: 'quart.inOut',
        y: '0%',
      }, '>-0.5')
      .to(title.querySelectorAll('.split__line'), {
        stagger: 0.08,
        duration: 1,
        ease: 'quart.inOut',
        y: '0%',
      }, '>-0.9')
      .to(subtitle2.querySelectorAll('.split__line'), {
        duration: 1,
        ease: 'quart.inOut',
        y: '0%',
      }, '>-0.5')
      
      .to(button, {
        duration: 1,
        ease: 'quart.inOut',
        y: '0%',
      }, '>-0.9')
      .to(button2, {
        duration: 1,
        ease: 'quart.inOut',
        y: '0%',
      }, '>-0.9')
      

      .uiElementsAnimate(null, '>-0.9')

  }


  function base(tl) {
    
    if (
      document.querySelector('.js-page-header') ||
      document.querySelector('.js-masthead-type-1') ||
      document.querySelector('.js-masthead-type-2') ||
      document.querySelector('.js-masthead-type-3') ||
      document.querySelector('.js-masthead-type-4') ||
      document.querySelector('.js-masthead-type-work-1') ||
      document.querySelector('.js-sliderMain-type-1') ||
      document.querySelector('.js-sliderMain-type-2') ||
      document.querySelector('.js-sliderMain-type-3') ||
      document.querySelector('.js-masthead-blog-article')
    ) {
      return tl;
    }

    tl.add(() => {
      RevealAnim.init();
    })

  }

  function init(tl) {

    if (document.querySelector('.page-reveal-off')) {
      return tl;
    }

    if (document.querySelector('.js-slider-full-page')) {
      App.html.classList.add('full-page-slider');
    } else {
      App.html.classList.remove('full-page-slider');
    }

    if (
      document.querySelector('.js-page-header') ||
      document.querySelector('.js-masthead-type-1') ||
      document.querySelector('.js-masthead-type-2') ||
      document.querySelector('.js-masthead-type-3') ||
      document.querySelector('.js-masthead-type-4') ||
      document.querySelector('.js-masthead-type-work-1') ||
      document.querySelector('.js-sliderMain-type-1') ||
      document.querySelector('.js-sliderMain-type-2') ||
      document.querySelector('.js-sliderMain-type-3') ||
      document.querySelector('.js-masthead-blog-article')
    ) {
      RevealAnim.init();
    }
    
    mastheadType_1(tl);
    mastheadType_2(tl);
    mastheadType_3(tl);
    mastheadType_4(tl);
    mastheadPortfolioWorkType_1(tl);
    sliderMainType_1(tl);
    sliderMainType_2(tl);
    sliderMainType_3(tl);
    mastheadBlogArticle(tl);
    base(tl);
  
    tl.add(() => {
      if (MainSlider3.isActive()) {
        MainSlider3.autoplayStart();
      }
    })

    return tl;

  }

  return {
    init: init,
  }

})();


function initialReveal() {
  let tl = gsap.timeline();
  tl.preloaderInitial();
  tl = PageReveal.init(tl);
}

/*--------------------------------------------------
  05. Custom cursor
---------------------------------------------------*/

const Cursor = (function() {

  const cursor = document.querySelector(".js-cursor");
  let follower;
  let label;
  let icon;

  let clientX;
  let clientY;
  let cursorWidth;
  let cursorHeight;
  let cursorTriggers;
  let state;

  function variables() {

    follower = cursor.querySelector(".js-follower");
    label = cursor.querySelector(".js-label");
    icon = cursor.querySelector(".js-icon");

    clientX = -100;
    clientY = -100;
    cursorWidth = cursor.offsetWidth / 2;
    cursorHeight = cursor.offsetHeight / 2;
    cursorTriggers;
    state = false;

  }

  function init() {

    if (!cursor) return;

    variables();
    state = true;
    cursor.classList.add('is-enabled');

    document.addEventListener("mousedown", e => {
      cursor.classList.add('is-mouse-down');
    });

    document.addEventListener("mouseup", e => {
      cursor.classList.remove('is-mouse-down');
    });

    document.addEventListener("mousemove", (event) => {
      clientX = event.clientX;
      clientY = event.clientY;
    });

    const render = () => {
      cursor.style.transform = `translate(${clientX - cursorWidth}px, ${clientY - cursorHeight}px)`;
      requestAnimationFrame(render);
    };

    requestAnimationFrame(render);

    update();
    breakpoint();

  }

  function enterHandler({ target }) {

    cursor.classList.add('is-active');

    if (target.getAttribute('data-cursor-label')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-label');
      label.innerHTML = target.getAttribute('data-cursor-label');
    }

    if (target.getAttribute('data-cursor-icon')) {
      App.body.classList.add('is-cursor-active');
      cursor.classList.add('has-icon');
      const iconAttr = target.getAttribute('data-cursor-icon');
      icon.innerHTML = feather.icons[iconAttr].toSvg();
    }

  }
  
  function leaveHandler({ target }) {

    App.body.classList.remove('is-cursor-active');
    cursor.classList.remove('is-active');
    cursor.classList.remove('has-label');
    cursor.classList.remove('has-icon');
    label.innerHTML = '';
    icon.innerHTML = '';

  }

  function update() {

    if (!cursor) return;

    cursorTriggers = document.querySelectorAll([
      "button",
      "a",
      "input",
      "[data-cursor]",
      "[data-cursor-label]",
      "[data-cursor-icon]",
      "textarea"
    ]);
    
    cursorTriggers.forEach(el => {
      el.addEventListener("mouseenter", enterHandler);
      el.addEventListener("mouseleave", leaveHandler);
    });

  }

  function clear() {

    if (!cursor) return;
    
    cursorTriggers.forEach(el => {
      el.removeEventListener("mouseenter", enterHandler);
      el.removeEventListener("mouseleave", leaveHandler);
    });

  }

  function hide() {

    if (!cursor) return;
    cursor.classList.add('is-hidden');

  }

  function show() {

    if (!cursor) return;
    cursor.classList.remove('is-hidden');

  }

  function breakpoint() {

    if (!state) return;
    if (!App.config.cursorFollower.disableBreakpoint) return;

    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    if (width < App.config.cursorFollower.disableBreakpoint) {
      state = false;
      cursor.classList.remove('is-enabled');
      clear();
    } else {
      state = true;
      cursor.classList.add('is-enabled');
      update();
    }

    window.addEventListener('resize', () => {
      let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

      if (width < App.config.cursorFollower.disableBreakpoint) {
        state = false;
        cursor.classList.remove('is-enabled');
        clear();
      } else {
        state = true;
        cursor.classList.add('is-enabled');
        update();
      }
    })

  }

  return {
    init: init,
    update: update,
    clear: clear,
    hide: hide,
    show: show,
  };

})();

/*--------------------------------------------------
  06. Elements reveal
---------------------------------------------------*/

const RevealAnim = (function() {

  function single() {

    const animationTarget = document.querySelectorAll('[data-anim]');
  
    if (!animationTarget.length) {
      return;
    }
    
    for (let i = 0; i < animationTarget.length; i++) {
      const el = animationTarget[i];
    
      new ScrollMagic.Scene({
        offset: '260px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })
      .on('enter', function (event) {
        animateElement(el);
      })
      .addTo(App.SMcontroller)
    }
  
  }
  
  function container() {
  
    const animationContainer = document.querySelectorAll('[data-anim-wrap]');
  
    if (!animationContainer.length) {
      return;
    }
    
    for (let i = 0; i < animationContainer.length; i++) {
      const el = animationContainer[i];
    
      new ScrollMagic.Scene({
        offset: '260px',
        triggerElement: el,
        triggerHook: "onEnter",
        reverse: false,
      })
      .on('enter', function (event) {
        
        const animChilds = el.querySelectorAll('[data-anim-child]');
        el.classList.add('animated');
        animChilds.forEach(el => animateElement(el));
        
      })
      .addTo(App.SMcontroller)
    }
  
  }
  

  function animateElement(target) {
    
    let attrVal;
    let animDelay;
    let attrDelayPart;
  
    if (target.getAttribute('data-anim')) {
      attrVal = target.getAttribute('data-anim');
    } else {
      attrVal = target.getAttribute('data-anim-child');
    }
    
    if (attrVal.includes('delay-')) {
      attrDelayPart = attrVal.split(' ').pop();
      animDelay = attrDelayPart.substr(attrDelayPart.indexOf('-') + 1) / 10;
    }
  
    if (attrVal.includes('counter')) {
      counter(target, animDelay);
    }
    else if (attrVal.includes('line-chart')) {
      lineChart(target, animDelay);
    }
    else if (attrVal.includes('pie-chart')) {
      pieChart(target, animDelay);
    }
    else if (attrVal.includes('split-lines')) {
      splitLines(target, animDelay);
    }
    else {
      target.classList.add('is-in-view');
    }

  }

  function pieChart(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-percent');
    const chartBar = target.querySelector('.pieChart-bar');
    
    if (counterVal < 0) { counterVal = 0;}
    if (counterVal > 100) { counterVal = 100;}
    
    gsap.fromTo(chartBar, {
      drawSVG: `0%`,
    }, {
      delay: 0.3 + animDelay,
      duration: 1.4,
      ease: 'power3.inOut',
      drawSVG: `${counterVal}%`,
  
      onStart: () => {
        chartBar.classList.remove('bar-stroke-hidden');
      }
    });
  
  
    let object = { count: 0 };
    const barPercent = target.querySelector('.pieChart-percent');
  
    gsap.to(object, {
      count: counterVal,
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        barPercent.innerHTML = Math.round(object.count) + '%';
      },
    });
  
  }
  
  function lineChart(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-percent');
  
    gsap.fromTo(target.querySelector('.js-bar'), {
      scaleX: 0,
    }, {
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      scaleX: counterVal / 100,
    })
  
  
    let object = { count: 0 };
    const barPercent = target.querySelector('.js-number');
  
    gsap.to(object, {
      count: counterVal,
      delay: 0.45 + animDelay,
      duration: 1,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        barPercent.innerHTML = Math.round(object.count) + '%';
      },
    });
  
  }
  
  function counter(target, animDelay = 0) {
  
    const counterVal = target.getAttribute('data-counter');
    const counterAdd = target.getAttribute('data-counter-add');
    const totalDelay = animDelay;
    let symbols = '';
    
    let object = { count: 0 };
    const counterNum = target.querySelector('.js-counter-num');

    if (counterAdd) {
      symbols = counterAdd;
    }
  
    gsap.to(object, {
      count: counterVal,
      delay: totalDelay,
      duration: 1.8,
      ease: 'power3.inOut',
      
      onUpdate: function() {
        counterNum.innerHTML = Math.round(object.count) + symbols;
      },
    });
  
  }
  
  function splitLines(target, animDelay = 0) {
  
    const lines = target.querySelectorAll('.split__line');

    gsap.to(lines, {
      delay: animDelay,
      stagger: 0.08,
      duration: 0.85,
      ease: 'power2.out',
      y: '0%',
    });
  
  }


  function init() {

    single();
    container();

  }


  return {
    init: init,
  }

})();



function splitTextIntoLines() {
  
  let target;

  if (App.body.classList.contains('page-reveal-off')) {
    target = document.querySelectorAll("[data-split='lines']:not([data-split-page-reveal])");
  } else {
    target = document.querySelectorAll("[data-split='lines']");
  }

  if (!target.length) return;

  target.forEach(el => {
    let content;
    let test = el.querySelectorAll('* > *:not(br):not(span)');

    if (test.length > 0) {
      content = el.querySelectorAll('* > *:not(br):not(span)');
    }

    new SplitText(content, {
      type: 'lines',
      linesClass: 'overflow-hidden',
    });

    content.forEach(el => {
      const lines = el.querySelectorAll('.overflow-hidden');

      new SplitText(lines, {
        type: 'lines',
        linesClass: 'split__line',
      });
    });

    gsap.set(el.querySelectorAll('.split__line'), {
      y: '100%',
    })
  });

}
/*--------------------------------------------------
  07. Main sliders
---------------------------------------------------*/

function mainSlider1Init() {

  const slider = document.querySelector('.js-sliderMain-type-1');

  if (!slider) return;

  const nav = slider.querySelector('.js-slider-nav');
  let current = 0;

  const sliderInstance = new Swiper (slider, {
    spaceBetween: 0,
    speed: 1000,
    parallax: true,
    grabCursor: true,
    allowTouchMove: true,
    touchMoveStopPropagation: true,

    lazy: {
      loadPrevNext: true,
    },

    breakpoints: {
      575: {
        parallax: false,
      },
    },
  
    navigation: {
      prevEl: nav.querySelector('.js-prev'),
      nextEl: nav.querySelector('.js-next'),
    },
  });

}


function mainSlider2Init() {

  const slider = document.querySelector('.js-sliderMain-type-2');

  if (!slider) return;

  const sliderInstance = new Swiper (slider, {
    spaceBetween: 0,
    speed: 600,
    parallax: true,
    
    loop: true,
    slidesPerView: 3,
    centeredSlides: true,

    lazy: {
      loadPrevNext: true,
    },

    breakpoints: {
      991: {
        slidesPerView: 1,
      },
    },

    pagination: {
      el: '.js-pagination',
      bulletClass: 'pagination__item',
      bulletActiveClass: 'is-active',
      clickable: true
    },

    navigation: {
      prevEl: '.js-nav-prev',
      nextEl: '.js-nav-next',
    },
  });


  const images = slider.querySelectorAll('.js-slider-img');

  let nextImg;
  let prevImg = images[sliderInstance.realIndex];

  sliderInstance.on('transitionStart', function () {
    nextImg = images[sliderInstance.realIndex];

    prevImg.classList.remove('is-active');
    nextImg.classList.add('is-active');

    prevImg = images[sliderInstance.realIndex];
  });

  sliderInstance.on('loopFix', function () {
    if (App.config.cursorFollower.enabled) {
      Cursor.update();
    }
  });

}


const MainSlider3 = (function() {

  let state = false;
  let sliderInstance;
  let current;

  function init() {

    const slider = document.querySelector('.js-sliderMain-type-3');
    if (!slider) return;

    state = true;

    const container = slider.querySelector('.swiper-container');
    const contents = slider.querySelectorAll('.js-slider-content');
    const nav = slider.querySelector('.js-slider-nav');
    const pagination = slider.querySelector('.js-slider-pagination');
    current = 0;

    let sliderSpeed = 1000;
    if (slider.getAttribute('data-speed')) sliderSpeed = slider.getAttribute('data-speed');

    let sliderAutoplay = false;
    if (slider.getAttribute('data-autoplay-delay')) {
      sliderAutoplay = {
        delay: slider.getAttribute('data-autoplay-delay'),
        disableOnInteraction: false,
      };
    }

    let sliderAutoplayStartDelay = 0;
    if (slider.getAttribute('data-autoplay-start-delay')) {
      sliderAutoplayStartDelay = slider.getAttribute('data-autoplay-start-delay');
    }


    sliderInstance = new Swiper (container, {
      spaceBetween: 0,
      speed: parseInt(sliderSpeed),
      parallax: true,
      // direction: 'vertical',
      allowTouchMove: false,
      lazy: {
        loadPrevNext: true,
      },
      autoplay: sliderAutoplay,
      navigation: {
        prevEl: nav.querySelector('.js-prev'),
        nextEl: nav.querySelector('.js-next'),
      },
      pagination: {
        el: pagination,
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        clickable: true
      },
    });


    gsap.set(slider.querySelectorAll('.js-button'), {
      y: '100%',
    })

    nav.classList.add('is-active');

    sliderInstance.autoplay.stop();

    // setTimeout(() => {
    //   sliderInstance.autoplay.start();
    // }, sliderAutoplayStartDelay);


    sliderInstance.on('transitionStart', function() {
      const currentContent = contents[current];
      const activeContent = contents[sliderInstance.realIndex];

      nav.classList.remove('is-active');

      gsap.timeline()
        .to([
          currentContent.querySelectorAll('.js-subtitle .split__line'),
          currentContent.querySelectorAll('.js-title .split__line'),
          currentContent.querySelector('.js-button'),
        ], {
          y: '-100%',
          stagger: 0.06,
          duration: 0.6,
          ease: 'quart.inOut',
          onStart: () => {
            current = sliderInstance.realIndex;
            currentContent.classList.remove('is-active');
          }
        })
        .fromTo([
          activeContent.querySelectorAll('.js-subtitle .split__line'),
          activeContent.querySelectorAll('.js-title .split__line'),
          activeContent.querySelector('.js-button'),
        ], {
          y: '100%',
        }, {
          y: '0%',
          stagger: -0.06,
          duration: 0.6,
          ease: 'quart.inOut',
          onStart: () => {
            activeContent.classList.add('is-active');
          },
          onComplete: () => {
            nav.classList.add('is-active');
          },
        }, '>-0.2')
    });

  }

  function autoplayStart() {
    if (!state) return;
    sliderInstance.autoplay.start();
  }

  function autoplayStop() {
    if (!state) return;
    sliderInstance.autoplay.stop();
  }

  function isActive() {
    return state;
  }

  return {
    init: init,
    autoplayStart: autoplayStart,
    autoplayStop: autoplayStop,
    isActive: isActive,
  };

})();
/*--------------------------------------------------
  08. Section sliders
---------------------------------------------------*/

function sectionSlidersInit() {

  const sectionSlider = document.querySelectorAll('.js-section-slider');

  if (!sectionSlider.length) return;

  for (let i = 0; i < sectionSlider.length; i++) {
    const el = sectionSlider[i];
    
    let gap = 0;
    let loop = false;
    let centered = false;
    let pagination = false;

    if (el.getAttribute('data-gap'))    gap = el.getAttribute('data-gap');
    if (el.hasAttribute('data-loop'))   loop = true;
    if (el.hasAttribute('data-center')) centered = true;

    if (el.hasAttribute('data-pagination')) {
      pagination = {
        el: el.querySelector('.js-pagination'),
        bulletClass: 'pagination__item',
        bulletActiveClass: 'is-active',
        bulletElement: 'div',
        clickable: true
      };
    }


    const colsArray = el.getAttribute('data-slider-col').split(' ');

    let cols_base = 1;
    let cols_lg = 1;
    let cols_md = 1;
    let cols_sm = 1;

    colsArray.forEach(el => {
      if (el.includes('base')) cols_base = el.slice(-1);
      if (el.includes('lg')) cols_lg = el.slice(-1);
      if (el.includes('md')) cols_md = el.slice(-1);
      if (el.includes('sm')) cols_sm = el.slice(-1);
    });

    new Swiper(el, {
      speed: 800,
      autoHeight: true,
      spaceBetween: parseInt(gap),
      centeredSlides: centered,
      parallax: true,

      loop: loop,
      
      lazy: {
        loadPrevNext: true,
      },

      slidesPerView: parseInt(cols_base),

      breakpoints: {
        1199: { slidesPerView: parseInt(cols_lg) },
        991:  { slidesPerView: parseInt(cols_md) },
        767:  { slidesPerView: parseInt(cols_sm) },
      },

      navigation: {
        prevEl: el.querySelector('.js-prev'),
        nextEl: el.querySelector('.js-next'),
      },

      pagination: pagination,
    });
  }

}

/*--------------------------------------------------
	09. Contact form
---------------------------------------------------*/

function contactForm() {

  const form = document.querySelector(".js-ajax-form");
  
  if (!form) {
    return;
  }

  const formAlert = form.querySelector('.js-ajax-form-alert');
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let validForm = true;
    let formData = {};
    formAlert.classList.remove('is-active');
    formAlert.classList.remove('is-success');
    formAlert.classList.remove('is-error');
    const inputGroups = form.querySelectorAll('.js-input-group');


    form.querySelectorAll('.form__error').forEach(el => {
      el.innerHTML = '';
      el.classList.remove('is-active');
    });
    form.querySelectorAll('.-error').forEach(el => {
      el.classList.remove('-error');
    });


    for (let i = 0; i < inputGroups.length; i++) {
      const el = inputGroups[i];
      
      let field;
      
      if (el.querySelector('input')) {
        field = el.querySelector('input');
      } else if (el.querySelector('textarea')) {
        field = el.querySelector('textarea');
      }

      let fieldName = field.getAttribute('name');
      let fieldValue = field.value;
      let errorField = el.querySelector('.form__error');

      
      if (field.hasAttribute('data-required') && !fieldValue) {
        field.classList.add('-error');
        validForm = false;
        errorField.classList.add('is-active');
        errorField.innerHTML = 'Please fill this field';
        continue;
      }
    
      if (field.getAttribute('name') === 'email') {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue)) {
          field.classList.add('-error');
          validForm = false;
          errorField.classList.add('is-active');
          errorField.innerHTML = 'Please enter correct email';
          continue;
        }
      }
    
      formData[fieldName] = fieldValue;
    }


    if (!validForm) return;

    let requestData = '';
    let request = new XMLHttpRequest();
    let dataArray = [];

    for (let property in formData) {
      dataArray.push(`${property}=${formData[property]}`);
      requestData = dataArray.join('&');
    }
    
    setTimeout(() => {
      request.onreadystatechange = function() {
        setTimeout(() => {
          if (this.readyState == 4 && this.status == 200) {
            formAlert.classList.add('is-active');
            formAlert.classList.add('is-success');
            formAlert.querySelector('.ajax-form-alert__content').innerHTML = form.getAttribute('data-message-success');
          } else {
            formAlert.classList.add('is-active');
            formAlert.classList.add('is-error');
            formAlert.querySelector('.ajax-form-alert__content').innerHTML = form.getAttribute('data-message-error');
          }
        }, 400);
      };
  
      request.open("POST.html", "contact.html", true);
      request.setRequestHeader(
        "Content-type",
        "application/x-www-form-urlencoded",
      );
      request.send(requestData);
    }, 1000);
  });

}

/*--------------------------------------------------
	10. Isotope grids
---------------------------------------------------*/

function masonryFilterInit() {

  const filterGrids = document.querySelectorAll('.section-filter');

  if (!filterGrids.length) {
    return;
  }

  for (let i = 0; i < filterGrids.length; i++) {
    const el = filterGrids[i];

    let iso = new Isotope(el.querySelector('.masonry'), {
      itemSelector: '.masonry__item',
      percentPosition: true,
      // horizontalOrder: true,

      layoutMode: 'packery',
      packery: {
        columnWidth: '.masonry__sizer',
      },
    });


    const filterButtons = el.querySelectorAll(".filter-button-group button");
  
    for (let i = 0; i < filterButtons.length; i++) {
      const el = filterButtons[i];

      el.addEventListener("click", () => {

        let someom = iso.getItemElements();
        someom.forEach(el => {
          el.classList.remove('is-active');
        });

        filterButtons.forEach(button => button.classList.remove('btn-active'));
        el.classList.add('btn-active');

        let filterValue = el.getAttribute('data-filter');
        iso.arrange({ filter: filterValue });

      });
    }
  }

}


function masonryGridInit() {

  const grids = document.querySelectorAll('.js-masonry.js-masonry-no-filter');

  if (!grids.length) {
    return;
  }

  for (let i = 0; i < grids.length; i++) {
    new Isotope(grids[i], {
      itemSelector: '.masonry__item',
      percentPosition: true,

      layoutMode: 'packery',
      packery: {
        columnWidth: '.masonry__sizer',
      },
    });
  }
  
}
/*--------------------------------------------------
  11. Lazy loading
---------------------------------------------------*/

function lazyLoading() {
  
  if (!document.querySelector('.js-lazy')) {
    return;
  }

  new LazyLoad({
    elements_selector: ".js-lazy",
  });

}

/*--------------------------------------------------
  12. Parallax
---------------------------------------------------*/

function parallaxInit() {
  if (!document.querySelector('[data-parallax]')) {
    return;
  }
  
  const target = document.querySelectorAll('[data-parallax]');

  target.forEach(el => {
    const value = el.getAttribute('data-parallax');

    jarallax(el, {
      speed: value,
      imgElement: '[data-parallax-target]',
    });
  });
}

/*--------------------------------------------------
  13. To top button
---------------------------------------------------*/

function backButton() {

  const button = document.querySelector('.js-backButton');

  if (!button) return;

  const scrollElement = window.document.documentElement;

  const duration = () => {

    if (scrollElement.scrollTop < 1600) {
      return 1;
    } else {
      return 2.2;
    }
    
  }

  button.addEventListener('click', () => {
    gsap.to(scrollElement, {
      duration: duration(),
      ease: 'power2.inOut',
      scrollTo: 0,
    });
  })

  new ScrollMagic.Scene({
    offset: '400px',
  })
    .setClassToggle(button, 'is-visible')
    .addTo(App.SMcontroller);

}

/*--------------------------------------------------
  14. Scroll down button
---------------------------------------------------*/

function uiScrollDown() {

  const target = document.querySelector('.js-ui-scroll-button');

  if (!target) return;

  const destination = document.querySelector('section:nth-of-type(2)');

  target.addEventListener('click', () => {
    gsap.to(window.document.documentElement, {
      duration: 1,
      ease: 'power2.inOut',
      scrollTo: destination.offsetTop,
    });
  })

}

/*--------------------------------------------------
  15. Video
---------------------------------------------------*/

function videoBtn() {

  GLightbox({
    autoplayVideos: false,
  });

}

/*--------------------------------------------------
  16. Scroll to id
---------------------------------------------------*/

function scrollToIdInit() {

  const targets = document.querySelectorAll('.js-scroll-to-id');

  if (!targets.length) return;

  targets.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const id = el.getAttribute('href');
      const destination = document.querySelector(`#${id.slice(1)}`);

      console.log(destination);
      console.log(destination.offsetTop);

      gsap.to(window.document.documentElement, {
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTo: destination.offsetTop,
      });
    })
  });

}

/*--------------------------------------------------
  17. PJAX
---------------------------------------------------*/

const PJAX = (function() {

  function initNewPage(data) {
    return new Promise((resolve) => {
      
      document.body.scrollTop = document.documentElement.scrollTop = 0;

      App.SMcontroller.destroy(true);
      App.SMcontroller = new ScrollMagic.Controller();

      if (App.config.headroom.enabled) {
        App.headroom.destroy();
        App.headroom = new Headroom(document.querySelector(".js-header"), App.config.headroom.options);
        App.headroom.init();
      }

      if (App.config.cursorFollower.enabled) {
        Cursor.clear();
        Cursor.update();
      }
      
      initComponents();
      resolve(true);
      
    });
  }

  const generalTransition = {
    name: 'generalTransition',

    leave: (data) => {
      return new Promise((resolve) => {
        gsap.timeline()
          .preloaderShow()
          .add(() => {
            resolve(true);
          })
      });
    },

    enter: (data) => {
      return new Promise((resolve) => {
        initNewPage(data).then(() => resolve(true));
      });
    },

    afterEnter: (data) => {
      return new Promise((resolve) => {
        let tl = gsap.timeline();
        tl.preloaderHide();
        tl = PageReveal.init(tl);
        tl.add(() => {
          MainSlider3.autoplayStart();
          resolve(true);
        });
      });
    }
  }

  function init() {

    if (!document.body.hasAttribute('data-barba')) return;

    barba.init({
      sync: true,
      timeout: 10000,
      prevent: ({ el }) => {

				// element doesn't has attribute
        if (!el.hasAttribute('data-barba')) return true;

				// element is anchor
				if (el.getAttribute('href').indexOf('#') > -1) return true;

				// elementor preview
				if (typeof elementor === 'object') return true;

      },
      transitions: [
        generalTransition,
      ],
    });

  }

  return {
    init: init,
  }

})();


})();
/*JS FOR SCROLLING THE ROW OF THUMBNAILS*/ 
$(document).ready(function () {
  $('.vid-item').each(function(index){
    $(this).on('click', function(){
      var current_index = index+1;
      $('.vid-item .thumb').removeClass('active');
      $('.vid-item:nth-child('+current_index+') .thumb').addClass('active');
    });
  });
});



