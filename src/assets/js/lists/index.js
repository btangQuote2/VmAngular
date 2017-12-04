'use strict';

$(function () {
  var $win = $(window);
  var $el = $('.acc-table');

  var fullscreen = false;

  initList();

  if (Utils.isMobile()) {
    initMobileViewToggle();
  }

  $(window).on('resize', _.debounce(onWinResize, 200));

  function initList() {
    var accTable = new AccTable();
    accTable.init($el, {
      pagination: true,
      fullScreen: true,
      forceHeight: true,
      columnDefs: [{ targets: ['currency'], visible: false }, { targets: ['title'], className: 'truncate-gradient' }]
    });

    // makes dataTable available for list-controls
    window.dataTable = accTable.dataTable;
  }

  function initMobileViewToggle() {
    var $globalNav = $('.nav-bar-container');
    // NOTE: beware of using lists/index.js on other pages where the page class name would change
    var $pageTitleRow = $('.page-lists__title');
    var $toggleFullBtn = $el.find('.acc-table__mobile-table-toggle-full');
    var $toggleInitBtn = $el.find('.acc-table__mobile-table-toggle-init');
    var $scrim = $el.find('.acc-table__mobile-table-scrim');

    var duration = 800,
        easing = 'easeInOutSine';

    // enough to get ios browser chrome to minimize itself
    var scrollThreshold = 48;

    $win.on('scroll', onInitUserScroll);

    function onInitUserScroll(e) {
      if ($win.scrollTop() >= scrollThreshold) {
        $win.off('scroll', onInitUserScroll);

        // instead of scrolling, just collapse the els above the table
        $pageTitleRow.velocity({ height: '0px' }, duration, easing);

        $globalNav.css({ overflow: 'hidden' }).velocity({
          height: '0px'
        }, {
          duration: duration,
          easing: easing,
          complete: function complete() {
            $scrim.hide();
          }
        });

        $el.addClass('mobile-view-table');
      }
    }

    $toggleInitBtn.on('click', function (e) {
      // go from full table view to initial view
      $scrim.show();
      $pageTitleRow.velocity('reverse');
      $globalNav.velocity('reverse');

      $('html').velocity('scroll', {
        offset: 0,
        duration: duration,
        easing: easing,
        complete: function complete() {
          $win.on('scroll', onInitUserScroll);
        }
      });

      $el.removeClass('mobile-view-table');
    });
  }

  // TODO: this should also update table's scrollY option
  function onWinResize() {}
});