'use strict';

$(function () {
  var className = '.list-controls';
  var $el = $(className);

  var $ctrlCustom = $el.find(className + '__button[data-menu-id="customize"]');
  var $ctrlExport = $el.find(className + '__button[data-menu-id="export"]');

  var menus = {};

  $ctrlCustom.on('click', handleCustomizeClick);
  $ctrlExport.on('click', handleExportClick);

  // TODO: changes if we end up building the actual columns programatically
  // gets fresh column order and visibility data for customize menu redraw
  function getColumnData() {
    var numCols = dataTable.columns().header().length;
    var visibleArray = getColVisibility();
    // divide into two columns
    var groupLen = numCols % 2 === 0 ? numCols / 2 : (numCols + 1) / 2;

    var columnData = {
      columns: []
    };

    dataTable.columns().header().each(function (el, i) {
      var column = {
        id: i,
        name: $(el).html(),
        required: $(el).attr('data-required') === 'true',
        checked: visibleArray[i]
      };

      columnData.columns.push(column);
    });

    return columnData;
  }

  function setColVisibility(visibleArray) {
    $.each(visibleArray, function (i, isVisible) {
      dataTable.column(i).visible(isVisible);
    });
  }

  function getColVisibility() {
    var visibleArray = dataTable.columns().visible();
    return visibleArray;
  }

  function handleCustomizeOk(e) {
    var $menu = $(e.target).closest('.popup-menu');
    var $inputs = $menu.find('input');
    var columnVisibility = [];

    $inputs.each(function () {
      columnVisibility.push($(this).prop('checked'));
    });

    setColVisibility(columnVisibility);

    hidePopUp($menu);
  }

  function handleCustomizeReset(e) {
    var $menu = $(e.target).closest('.popup-menu');
    var $inputs = $menu.find('input');

    $inputs.prop('checked', true);
    dataTable.columns().visible(true);

    hidePopUp($menu);
  }

  function handleCustomizeClick(e) {
    // don't showMenu again when we click the body, since menu is inside button
    if (!$(e.target).closest('.popup-menu').length) {
      showMenu('lc-menu-customize-template', $ctrlCustom, e);
    }
  }

  // TODO: menu option click functionality ...
  function handleExportClick(e) {
    // don't showMenu again when we click the body, since menu is inside button
    if (!$(e.target).closest('.popup-menu').length) {
      showMenu('lc-menu-export-template', $ctrlExport, e);
    }
  }

  function showMenu(menuId, $parent, e) {
    var $menu = void 0;
    var tmplData = menuId === 'lc-menu-customize-template' ? getColumnData() : false;

    if (menus[menuId] && menuId === 'lc-menu-export-template') {
      $menu = menus[menuId];

      $menu.show();

      setPopupCloseListener($menu, e);
    } else {
      // remove existing menu
      $parent.find('.popup-menu').remove();

      var menuTmpl = Utils.getTemplate(menuId);
      $menu = $(menuTmpl(tmplData));
      $menu.appendTo($parent);
      menus[menuId] = $menu;

      setPopupCloseListener($menu, e);
    }

    if (menuId === 'lc-menu-customize-template') {
      var $resetButton = $menu.find('.popup-menu__confirm-buttons div:eq(0)');
      var $okButton = $menu.find('.popup-menu__confirm-buttons div:eq(1)');

      $okButton.on('click', handleCustomizeOk);
      $resetButton.on('click', handleCustomizeReset);
    }
  }
});