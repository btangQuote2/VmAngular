"use strict";

window.Utils = {
  getParameterByName: function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  },

  getTemplate: function getTemplate(tmplId) {
    return _.template($('#' + tmplId).html());
  },

  isMobile: function isMobile() {
    // TODO: make sure this is where we want the cut-off
    return $(window).outerWidth() < 992;
  },

  isTouch: function isTouch() {
    // imperfect but it's something
    return 'ontouchstart' in window // works on most browsers
    || navigator.maxTouchPoints; // works on IE10/11 and Surface
  },

  // ex: Utils.pad('17', '2000')
  pad: function pad(num, _pad) {
    var len = _pad.length;
    var str = num + '';
    var missingPad = len - str.length;

    if (missingPad > 0) {
      str = _pad.slice(0, missingPad) + str;
    }

    return str;
  }
};