'use strict';

$(function () {
  var $el = $('.banner');
  var $content = $el.find('.banner__content');
  var bannerPad = 15;

  $el.find('.banner__expand-icon').on('click', handleExpandClick);

  function handleExpandClick(e) {
    if ($el.hasClass('banner--state-collapse')) {
      var expandHeight = $el.height() + $content.outerHeight() + bannerPad;
      $el.height(expandHeight).removeClass('banner--state-collapse').addClass('banner--state-expand');
    } else {
      $el.removeAttr('style').removeClass('banner--state-expand').addClass('banner--state-collapse');
    }
  }
});