'use strict';

$(function () {
  var DEFAULT_STATE_COLLAPSED = 'collapsed';
  var DEFAULT_STATE_EXPANDED = 'expanded';

  var navBarDefaultState = $('body').hasClass('nav-bar-expanded') ? DEFAULT_STATE_EXPANDED : DEFAULT_STATE_COLLAPSED;

  var barClassName = '.nav-bar';
  var menuClassName = '.nav-bar-menu';

  var $navBar = $(barClassName);
  var $items = $navBar.find(barClassName + '__items');
  var $mobileMenu = $navBar.find(barClassName + '__items--mobile-menu');
  var $menuScrim = $(menuClassName + '-scrim');

  // TODO: the two types of fly-out menus and which div is
  //       the scroll container for each could be simplified
  // custom flyout menu scrollbar
  $('.nav-bar-menu').not('.nav-bar-menu--multi-section').find('.nav-bar-menu__items').perfectScrollbar({ swipePropagation: false });
  // different scroll container
  $('.nav-bar-menu--multi-section').perfectScrollbar({ swipePropagation: false });

  // menu close btn
  $(menuClassName).find('.close-btn').click(function (e) {
    e.preventDefault();
    hideNavMenu();
    clearMenuItemSelections();
  });

  // scrim click when menu's open
  $menuScrim.click(function (e) {
    hideNavMenu();
    clearMenuItemSelections();
  });

  initNav();
  initResponsive();
  $(window).on('resize', _.debounce(initResponsive, 200));

  function initResponsive(e) {
    if (Utils.isMobile()) {
      initMobileNav();
    } else {
      // undo this mobile settings that occurs when one
      // of the 1st three menus are opened
      $(menuClassName).css({ top: '', height: '' });
      initDesktopNav();
    }
  }

  /**
   * Behaviors that apply to mobile and desktop
   */
  function initNav() {
    $navBar.find(barClassName + '__item a')
    // click items to show fly-out menus
    .click(function (e) {
      var $itemLink = $(e.currentTarget);
      var $item = $itemLink.parent();

      if ($itemLink.data('menuId')) {
        e.preventDefault();

        // applicable when another menu is current expanded and
        // a new one is opened
        if (isMenuOpen() && !Utils.isMobile()) {
          $items.find('.is-selected').removeClass('is-selected').addClass('is-unselected');

          $item.addClass('is-selected').removeClass('is-unselected');
        }

        if (Utils.isMobile()) {
          // no hover handler to pre-set is-selected dimming class
          $items.find(barClassName + '__item').removeClass('is-selected').addClass('is-unselected');
          $item.addClass('is-selected').removeClass('is-unselected');
        }

        var menuId = $itemLink.data('menuId');
        var $menu = getMenu(menuId);
        // some item changes based on whether we're showing or hiding a menu
        if ($menu.hasClass('active')) {
          if (Utils.isMobile()) {
            // gotta cleanup the item dimming classes - sliiightly tedious
            $items.find(barClassName + '__item').removeClass('is-unselected');
          }
        }

        toggleNavMenu(menuId);
      }
    });
  }

  function initMobileNav() {
    // hamburger click to open menu
    $navBar.find(barClassName + '__burger').off('click').click(showMobileMenu);

    // menu X click to close menu
    $navBar.find(barClassName + '__item--mobile-search i').off('click').click(function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();

      hideMobileMenu();
    });

    // change functionality of clicking on items within --mobile-menu
    $mobileMenu.find(barClassName + '__item a').off('click').click(function (e) {
      var $itemLink = $(e.currentTarget);
      var menuId = $itemLink.data('menuId');

      if (menuId) {
        e.preventDefault();
        // if link has a data-menu-id
        //  slide out mobile menu left
        $mobileMenu.addClass('active--sub-menu');
        //  slide in sub menu
        getMenu(menuId).addClass('active');
      }
    });

    // add extra handler for submenu close btn
    // run after hideNavMenu upon clicking close button
    $(menuClassName + '--mobile-submenu .close-btn').click(function (e) {
      console.log('submenu close');

      // keep the no-scroll class on body
      $('body').addClass('no-scroll');
      // bring mobile main menu back into frame
      $mobileMenu.removeClass('active--sub-menu');
    });
  }

  function initDesktopNav() {
    // mouse over/off
    if (!Utils.isTouch()) {
      $navBar.find(barClassName + '__item a')
      // on hover of nav bar item, others fade out
      .hover(function (e) {
        $(e.currentTarget).parent().addClass('is-selected');
        $navBar.find(barClassName + '__item:not(.is-selected)').addClass('is-unselected');
      }, function (e) {
        var $item = $(e.currentTarget).parent();
        if (isMenuOpen()) {
          if (!$item.hasClass('has-open-menu')) {
            // partial clear on hover out if this item is not the
            // one with its menu open
            $item.removeClass('is-selected');
          }
          return;
        }

        // clear those above classes from all
        clearMenuItemSelections();
      });
    }

    if (navBarDefaultState === DEFAULT_STATE_COLLAPSED) {
      // expand/collapse clicks
      $navBar.find(barClassName + '__burger').on('click', expandDesktopNav);
      $menuScrim.on('click', collapseDesktopNav);
      $(menuClassName).find('.close-btn').on('click', collapseDesktopNav);
    }
  }

  function expandDesktopNav() {
    $navBar.addClass('is-expanded');
    $menuScrim.addClass('active');
  }

  function collapseDesktopNav() {
    $navBar.removeClass('is-expanded');
    $menuScrim.removeClass('active');
  }

  function toggleNavMenu(menuId) {
    var $menu = getMenu(menuId);
    if ($menu.hasClass('active')) {
      hideNavMenu(navBarDefaultState === DEFAULT_STATE_EXPANDED);
    } else {
      showNavMenu(menuId);
    }
  }

  function showNavMenu(menuId) {
    var delay = 0;

    // hide any existing ones
    if (isMenuOpen()) {
      hideNavMenu(false);
      delay = 300;
    }

    // open new one, delayed if hiding another
    _.delay(function () {
      var $menu = getMenu(menuId);
      $navBar.addClass('has-open-menu');

      if (Utils.isMobile()) {
        var effectiveNavBarH = $navBar.outerHeight() - $(window).scrollTop();
        $menu.css({
          top: effectiveNavBarH,
          height: 'calc(100% - ' + effectiveNavBarH + 'px)'
        });
      } else {
        $menuScrim.addClass('active');
      }

      $menu.addClass('active');
      showItemCaret(menuId);

      $('body').addClass('no-scroll');
    }, delay);
  }

  function hideNavMenu() {
    var hideScrim = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    $(menuClassName + '.active').removeClass('active');

    if (hideScrim) {
      $navBar.removeClass('has-open-menu');
      $menuScrim.removeClass('active');
    }

    $('body').removeClass('no-scroll');
    hideItemCaret();
  }

  function clearMenuItemSelections() {
    $navBar.find(barClassName + '__item').removeClass('is-selected').removeClass('is-unselected');
  }

  function showItemCaret(menuId) {
    var $item = getItemWithMenu(menuId);
    var delay = Utils.isMobile() ? 0 : 200;

    $item.addClass('has-caret');
    _.delay(function () {
      $item.addClass('show-caret has-open-menu');
    }, delay);
  }

  function hideItemCaret() {
    var $item = $(barClassName + '__item.has-caret');
    var delay = Utils.isMobile() ? 0 : 200;

    $item.removeClass('show-caret');
    _.delay(function () {
      $item.removeClass('has-caret has-open-menu');
    }, delay);
  }

  function showMobileMenu() {
    console.log('showMobileMenu');

    $mobileMenu.addClass('active');

    $('body').addClass('shifted no-scroll').animate({ scrollTop: 0 }, 300);

    // TODO: need to fix up menu height and scrolling, preferably while
    // preventing the body from scrolling
  }

  function hideMobileMenu() {
    $mobileMenu.removeClass('active');
    $('body').removeClass('shifted no-scroll');
  }

  function isMenuOpen() {
    return $navBar.hasClass('has-open-menu');
  }

  function getItemWithMenu(menuId) {
    return $(barClassName + '__item > a[data-menu-id="' + menuId + '"]').parent();
  }

  function getMenu(menuId) {
    return $(menuClassName + '[data-menu-id="' + menuId + '"]');
  }
});