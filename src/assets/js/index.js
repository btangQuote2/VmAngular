'use strict';

/*globals FastClick */
$(function () {
  // show dev grid overlay on page if ?grid=true
  if (window.Utils.getParameterByName('grid')) {
    $('body').addClass('show-dev-grid');
  }

  // BUG: using FastClick prevents closing of popup menus!
  // so disabling for now...
  // FastClick.attach(document.body)
});