'use strict';

$(function () {
  // prepend selected option to top before mdb-select init
  $('.mdb-select').find('option:selected').prependTo($('.mdb-select'));
  $('.mdb-select').material_select();
});