'use strict';

$(function () {
  var $win = $(window);

  window.setPopupCloseListener = function ($menuEl, origEvent) {
    var $menuBody = $menuEl.find('.popup-menu__body');
    var id = void 0;

    // give each popup a number we use to namespace its $win click listener
    if (!$menuEl.attr('data-popup-id')) {
      // used to identify listener with specific element
      id = Math.floor(Math.random() * 90000) + 10000;
      $menuEl.attr('data-popup-id', id);
    } else {
      id = $menuEl.attr('data-popup-id');
    }

    $win.on('click.popUps.' + id, function (e) {
      // hide popup unless the click was inside the __body or it's the same click that created the popup bubbling up
      if (!($(e.target).closest($menuBody).length || origEvent.timeStamp === e.timeStamp)) {
        hidePopUp($menuEl);
      }
    });
  };

  // triggered by menu ui and $win click listener
  window.hidePopUp = function ($menuEl) {
    var id = $menuEl.attr('data-popup-id');
    $menuEl.hide();
    $win.off('click.popUps.' + id);
  };
});