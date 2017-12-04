'use strict';

$(function () {
  // probably definitely gonna abstract this
  var UP = 'up';
  var DOWN = 'down';

  var className = '.page-dashboard';
  var $el = $(className);

  var $swipeableModules = void 0,
      $scrollableModules = void 0;

  makeSortableLists($el);
  initResponsiveModules();
  initNotifications();
  initInterviews();

  $(window).on('resize', _.debounce(onWinResize, 200));

  // simple lists, interview, notifs, utils, docs
  // may abstract list functionality later
  $el.find('.header-sort').click(function (e) {
    var $sortLabel = $(e.currentTarget);
    var curSortDir = $sortLabel.attr('data-sort-dir');
    var curSortCol = $sortLabel.attr('data-sort-col');

    // NOTE: look out for class name changes as this markup evolves
    var $list = $sortLabel.closest('.list__container').children('ul');

    switch (curSortDir) {
      case UP:
        sortList($list, curSortCol, DOWN);
        setSortLabel($sortLabel, DOWN);
        break;

      case DOWN:
        sortList($list, curSortCol, UP);
        setSortLabel($sortLabel, UP);
        break;

      default:
        sortList($list, curSortCol, DOWN);
        setSortLabel($sortLabel, DOWN);
        break;
    }

    if ($list.hasClass('ps')) {
      $list.perfectScrollbar('update');
    }
  });

  function onWinResize(e) {
    initResponsiveModules();
  }

  /**
   * The scrollable / swipeable modules - Notifications, Interviews, Documents, and Utilities
   */
  function initResponsiveModules() {
    // in case this is a re-init after resize, destroy
    if ($scrollableModules && $scrollableModules.length) {
      $scrollableModules.perfectScrollbar('destroy');
    }

    // diff't modules get the scrollbar based on view size
    if (Utils.isMobile()) {
      $swipeableModules = $el.find('.notifications .dashboard-list, .interviews .dashboard-list');
      $swipeableModules.slick({
        centerMode: true,
        centerPadding: '32px'
      }).on('afterChange', function (e, slick, current, next) {
        // update current count after each slide
        var $carousel = $(e.currentTarget);
        var $curCount = $carousel.closest('.list__container').find('.list__count-current');
        $curCount.text(current + 1);
      });

      // custom scroll bars just for Documents and Utils
      $scrollableModules = $el.find('.documents .dashboard-list, .utilities .dash-board-list');
    } else {
      // in case this is a re-init after resize, destroy
      if ($swipeableModules && $swipeableModules.length) {
        $swipeableModules.slick('unslick');
        $swipeableModules = null;
      }

      // custom scrollbars for all dashboard's scrollable modules
      $scrollableModules = $el.find('.dashboard-list');
    }

    $scrollableModules.perfectScrollbar({
      wheelPropagation: true
    });
  }

  function initNotifications() {
    // Notifications can be removed from the list but clicking "X"
    var $module = $el.find('.dashboard__module.notifications');
    var $listCont = $module.find('.list__container');
    var $list = $module.find('.dashboard-list');
    var $items = $list.find('.list-item');
    var $item = void 0;

    $items.each(function () {
      $(this).on('click', '.del-btn', function (e) {
        $item = $(e.currentTarget).closest('.list-item');

        // slide out left
        $item.addClass('pre-delete');

        // shrink vertically or if last one, mark container as empty and show empty message
        _.delay(function () {
          if ($list.find('.list-item:not(.list-item--empty)').length > 1) {
            $item.addClass('post-delete');
          } else {
            $listCont.addClass('list__container--empty');
            $item.css({ position: 'absolute' });
          }
        }, 400);

        // clean up and make b/e call
        _.delay(function () {
          $item.remove();
          $list.perfectScrollbar('update');

          //TODO: back-end API call to remove item from user's dashboard view goes here
          //
        }, 700);
      });
    });
  }

  function initInterviews() {
    var $module = $el.find('.dashboard__module.interviews');

    // the user timezone may come from a back-end user setting ...
    // but until then guess it with Moment.js and add to all the ATC event vars.
    $module.find('.atc_timezone').html(window.moment.tz.guess());
    window.addtocalendar.load();

    // expose method to global so AddToCalendar buttons can get it with
    // their data-on-button-click widget option.
    window.onCalIconClick = function (e) {
      var $link = $(e.currentTarget);
      var $icon = $link.closest('.end-icon');
      var $originalList = $link.siblings('.atcb-list')
      // because there are two ul.atcb-list for some reason
      .eq(1);

      // we need to list to float above the list-item and its container so clone it
      // and append to body.
      var $clonedList = $originalList.clone(true);
      var $clonedIcon = $icon.clone();
      var $clonedListCont = $('<div>').addClass('atc-style-menu-wb clone');
      var coords = {
        x: $icon.offset().left + $icon.width() / 2,
        y: $icon.offset().top + $icon.height() / 2
      };
      var $container = $icon.closest('.dashboard-list');

      var onContainerScroll = function onContainerScroll(e) {
        $link.blur();
        onMenuClose();
      };

      var onMenuClose = function onMenuClose() {
        $link.off('blur', onMenuClose);
        // delayed so ATC can process the click before link
        // is destroyed. *shrug*
        _.delay(function () {
          $clonedListCont.empty().remove();
        }, 500);
      };

      $originalList.hide();
      $clonedList.css({ display: 'block', opacity: 1 });
      $clonedIcon.addClass('active');
      $clonedListCont.append($clonedIcon).append($clonedList).appendTo('body').css({
        position: 'absolute',
        top: coords.y + 'px',
        left: coords.x + 'px',
        zIndex: 10
      });

      $container.off('scroll', onContainerScroll).on('scroll', onContainerScroll);

      $link.on('blur', onMenuClose);
    };
  }

  // Distributes column numbers to list__header labels and list-item children
  function makeSortableLists($el) {
    $el.find('.list__container').each(function (i, list) {
      var cols = 0;

      $(list).find('.header-sort').each(function (i, sortHead) {
        cols++;
        $(sortHead).attr('data-sort-col', i);
      });

      $(list).find('li').each(function (i, listItem) {
        // first-gen descendents of the <li> becomecolumn cells
        $(listItem).children().each(function (i, sortCell) {
          // break if more cells than headers
          if (i >= cols) {
            return;
          }
          $(sortCell).attr('data-sort-col', i);
        });
      });
    });
  }

  /**
   * Takes a <ul> and sorts its <li> els based on text
   * content in a specific column (data-sort-col), in alpha or reverse alpha order.
   */
  function sortList($list, sortCol, sortDir) {
    var listItems = $list.children('li');
    var firstGreater = sortDir === DOWN ? 1 : -1;
    var secondGreater = sortDir === DOWN ? -1 : 1;

    listItems.sort(function (a, b) {
      a = $(a).find('[data-sort-col=' + sortCol + ']');
      b = $(b).find('[data-sort-col=' + sortCol + ']');

      if (a.data('sortValue') && b.data('sortValue')) {
        a = a.data('sortValue');
        b = b.data('sortValue');
      } else {
        a = a.text().toLowerCase();
        b = b.text().toLowerCase();
      }

      if (a > b) return firstGreater;else if (a < b) return secondGreater;else return 0;
    });

    $list.empty().append(listItems);
  }

  function setSortLabel($label, sortDir) {
    // hide all other sort arrows in this table
    $label.closest('.list__container').find('[data-sort-dir]').attr('data-sort-dir', '');

    // set direction on clicked label
    $label.attr('data-sort-dir', sortDir);

    // if there's alt text, show it and hide original
    $label.find('[data-sort-text]').hide();
    $label.find('[data-sort-text=' + sortDir + ']').show();
  }
});