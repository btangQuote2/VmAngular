'use strict';

$(function () {
  console.log('login ready');

  var pageClass = '.page-login';
  var $win = $(window);
  var $header = $(pageClass + '__header');
  var $footer = $(pageClass + '__footer');
  var $body = $(pageClass + '__body');
  var $helpScrim = $(pageClass + '__desktop-help-scrim');
  var $helpPanel = $(pageClass + '__desktop-help-panel');

  // Global
  // on desktop, when content is tall, change footer to position
  // relative so content and footer don't intersect
  if ($body.hasClass('is-relative')) {
    var checkContentHeight = function checkContentHeight() {
      if ($win.width() < 768) return;

      var pad = 200;
      var availH = $win.height() - ($header.height() + $footer.height()) - pad;
      $footer.toggleClass('is-fixed', availH > $body.height());
    };

    $win.on('resize', _.debounce(checkContentHeight, 200));
    checkContentHeight();
  }

  // desktop help menu link
  $(pageClass + '__help-prompt').on('click', function (e) {
    e.preventDefault();
    showLoginHelpPanel();
  });

  $helpScrim.on('click', hideLoginHelpPanel);

  // desktop help close panel link
  $(pageClass + '__desktop-help-panel-header').on('click', function (e) {
    e.preventDefault();
    hideLoginHelpPanel();
  });

  function showLoginHelpPanel() {
    $helpScrim.addClass('active');
    $helpPanel.addClass('active');
  }

  function hideLoginHelpPanel() {
    $helpScrim.removeClass('active');
    $helpPanel.removeClass('active');
  }

  // Role Select
  // hide bottom border of the item above that which is hovered
  // and dim non-selected items
  $(pageClass + '__role-list-item').hover(function (e) {
    $(e.currentTarget).prev().addClass('no-border');
    $(e.currentTarget).siblings().addClass('deselected');
  }, function (e) {
    $(e.currentTarget).prev().removeClass('no-border');
    $(e.currentTarget).siblings().removeClass('deselected');
  });
});