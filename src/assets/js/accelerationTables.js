'use strict';

var currencyConversionRates = {
  USD: {
    USD: 1,
    GBP: 0.78,
    CHF: 0.97,
    EUR: 0.89
  },
  GBP: {
    USD: 1.26,
    GBP: 1,
    CHF: 1.23,
    EUR: 1.13
  },
  CHF: {
    USD: 1.02,
    GBP: 0.81,
    CHF: 1,
    EUR: 0.92
  },
  EUR: {
    USD: 1.11,
    GBP: 0.88,
    CHF: 1.09,
    EUR: 1
  }
};

function AccTable() {
  this.init = function ($el, options) {
    this.$el = $el;

    var opts = _.defaults(options || {}, {
      data: false,
      rowId: false,
      columns: null,
      columnDefs: false,
      pagination: false,
      fullScreen: false,
      leftFixedColumns: 1,
      // true if a height is declared in CSS, false if the table should fit the data
      forceHeight: false,
      info: "_TOTAL_ / _MAX_ records"
    });

    var DT_SCROLLHEAD_HEIGHT = 114;
    var NAV_BAR_WIDTH = 60;
    var responsiveBodyHeight = 'calc(100% - ' + DT_SCROLLHEAD_HEIGHT + 'px)';

    var $win = $(window);
    var $table = $el.find('table');

    var colDragScrollInterval = false;
    var fullscreen = false;

    // TODO: Better way to set this? Not always in the same column, or even present
    // TODO: currency may no longer be different for difft rows
    var currencyCol = 16;

    var customSearches = {
      // compares two ranges
      costRange: {
        //1: { min: 1, max: 30 }
        //5: { min: 2, max: 50 }
      },
      // compares a single date to a range
      dateRange: {
        //1: { min: '5/19/17', max: '5/28/17' }
        //5: { min: '5/19/17', max: '5/28/17' }
      },
      minimum: {
        //1: { min: 50 }
      }
    };

    var columnCurrencySettings = {}
    // 11: { currency: 'GBP' }


    // extends functionality of DataTable - needs to be here before we instantiate our table
    ;addCustomSearches();

    var dataTable = this.dataTable = $table.DataTable({
      ajax: opts.data,
      scrollX: true,
      scrollY: opts.forceHeight ? responsiveBodyHeight : false,
      iDisplayLength: 50,
      lengthChange: false,
      orderCellsTop: true,
      //autoWidth: false,
      rowId: opts.rowId,
      columns: options.columns ? this.buildColumns(options.columns) : opts.columns,
      columnDefs: opts.columnDefs,
      fixedColumns: {
        leftColumns: opts.leftFixedColumns
      },
      dom: 'lrt<"pagination-container"i<"custom-paging">>',
      language: {
        info: opts.info, // "_TOTAL_ / _MAX_ records",
        infoFiltered: '',
        zeroRecords: ''
      },
      colReorder: Utils.isMobile() ? false : {
        //realtime: false,
        fixedColumnsLeft: opts.leftFixedColumns
      },
      headerCallback: drawHeaders
    });

    // post-init el
    var $scrollBody = $el.find('.dataTables_scrollBody');

    // init the thing
    onTableDraw();
    populateFilterBtns();
    initInteractiveCells();

    $table.on('draw.dt', function () {
      // make sure this happens after DT-fixed-columns updates
      setTimeout(function () {
        onTableDraw();
      }, 10);
    });

    var rowHeight = $table.find('td').height();

    $scrollBody.perfectScrollbar({
      swipePropagation: false,
      wheelSpeed: 2,
      // stepped scrolling on whole rows
      snapToY: rowHeight
    });

    // move filter menus to match horz table scroll
    $scrollBody.on('scroll', function (e) {
      // hide filters
      $('.popup-menu:visible').each(function () {
        hidePopUp($(this));
      });
    });

    // place filter menu
    $el.find('[data-filter-type]').on('click', function (e) {
      handleFilterBtnClick(e);
    });

    // style columns on hover and enable col reordering autoscroll
    $el.find('.acc-table__table-header-top').hover(function (e) {
      handleColHover(e, 'in');
    }, function (e) {
      handleColHover(e, 'out');
    }).on('mousedown', startColDrag);

    function initInteractiveCells() {
      $el.on('click', '.acc-table__td--flag .flag', handleFlagCellClick);
    }

    function handleFlagCellClick() {
      $(this).toggleClass('active');
      // TODO: whatever this actualy does
    }

    function drawHeaders(thead, data, start, end, display) {
      // transfer listed classes from table-header-top to table-header-bottom
      var transferClasses = ['left-rule', 'truncate-gradient'];

      $.each(transferClasses, function (i, className) {
        if ($(thead).find('th.' + className).length) {
          $(thead).find('th.' + className).each(function (i, el) {
            var index = $(el).index();
            $(thead).siblings().find('th').eq(index).addClass(className);
          });
        }
      });

      // add sort caret to each sorting header
      $(thead).find('th.sorting').each(function (i, th) {
        var text = $(th).text();
        $(th).text(text).append($('<i class="icomoon-caret"></div>'));
      });
    }

    function onTableDraw() {
      setTableWidthAndMargin();
      handleNoResults();
      resetScroll();

      if (opts.pagination) {
        buildCustomPagination();
      }

      if (!opts.forceHeight) {
        $el.find('.DTFC_ScrollWrapper').addClass('no-force-height');
      }

      if (opts.fullScreen && !Utils.isMobile()) {
        initDesktopFullScreenBtn();
      }

      // style rows on hover
      $el.find('tbody tr').hover(function (e) {
        handleRowHover(e, 'in');
      }, function (e) {
        handleRowHover(e, 'out');
      });
    }

    function populateFilterBtns() {
      $el.find('.dataTables_scrollHead [data-filter-type]').add($el.find('.DTFC_LeftHeadWrapper').find('[data-filter-type]')).each(function () {
        $(this).text('All');
      });
    }

    function resetScroll() {
      $scrollBody.scrollTop(0).perfectScrollbar('update');
    }

    function handleNoResults() {
      var info = dataTable.page.info();
      var records = info.recordsDisplay;
      $el.toggleClass('no-records', records === 0);
    }

    function handleColHover(e, inOrOut) {
      var colIndex = $(e.currentTarget).index();

      var $colCells = $(dataTable.column(colIndex).nodes()).add($el.find('.acc-table__table-header-top:eq(' + colIndex + ')')).add($el.find('.acc-table__table-header-bottom:eq(' + colIndex + ')'));

      $colCells.toggleClass('column-hover', inOrOut === 'in');
    }

    function handleRowHover(e, inOrOut) {
      // ZD: probably should use DT's internal row representation
      // gotta figure out how to target rows in the fixed column
      var rowIndex = $(e.currentTarget).index() + 4;

      var $mainTableRow = $el.find('.acc-table__table tr:eq(' + rowIndex + ')');
      var $fixedColRow = $el.find('.DTFC_LeftWrapper tr:eq(' + rowIndex + ')');
      var $combinedRows = $mainTableRow.add($fixedColRow);

      $combinedRows.toggleClass('row-hover', inOrOut === 'in');
    }

    // SIZING FUNCTIONS

    function getLeftColWidth() {
      var $leftWrapper = $el.find('.DTFC_LeftWrapper');
      return $leftWrapper.width();
    }

    function setTableWidthAndMargin() {
      var $info = $el.find('.dataTables_info');
      var $scrollContainer = $el.find('.dataTables_scroll');

      if (!Utils.isMobile()) {
        $info.css({
          '-webkit-flex': '0 0 ' + getLeftColWidth() + 'px',
          '-ms-flex': '0 0 ' + getLeftColWidth() + 'px',
          'flex': '0 0 ' + getLeftColWidth() + 'px'
        });
      }

      // set scroll container to the right width and position
      $scrollContainer.css({
        width: 'calc( 100% - ' + getLeftColWidth() + 'px)',
        marginLeft: getLeftColWidth()
      });

      // pull leftmost column in scroll container out of sight, since it's copied in the fixed column
      $scrollContainer.find('.dataTables_scrollHeadInner').css({
        marginLeft: -getLeftColWidth()
      });

      $scrollContainer.find('#data_table').css({
        marginLeft: -getLeftColWidth()
      });
    }

    // FILTER FUNCTIONS

    function handleColumnSearch(e) {
      var $this = e.currentTarget;
      var value = $this.value;
      dataTable.columns(1).search(value).draw();
    }

    // TODO: Populate each filterBtn with 'All'

    // FILTER SETUP FUNCTIONS
    // TODO: pull duplicate stuff into a draw setup func
    // data-filter-type="available"
    function filterDisplayTerm($filter, $filterBtn, val) {
      var $filterHead = $filter.find('.popup-menu__head');

      // add text to filter-btn and menu head
      $filterBtn.html(val);
      $filterHead.find('span').html(val);
    }

    function filterColumnClear($filter, $filterBtn) {
      var colIndex = $filterBtn.closest('th').index();

      dataTable.columns(colIndex).search('.*', true).draw();

      // add text to filter-btn and menu head
      filterDisplayTerm($filter, $filterBtn, 'All');
    }

    function filterOnColumnByCostRange(colIndex, inputMin, inputMax) {
      // build data that custom search plugin will use to target columns and filter
      customSearches.costRange[colIndex] = {
        min: inputMin,
        max: inputMax
      };

      dataTable.columns().search().draw();
    }

    function filterOnColumnByDateRange(colIndex, inputMin, inputMax) {
      // build data that custom search plugin will use to target columns and filter
      customSearches.dateRange[colIndex] = {
        min: inputMin,
        max: inputMax
      };

      dataTable.columns().search().draw();
    }

    function filterOnColumnByMinimum(colIndex, inputMin) {
      // build data that custom search plugin will use to target columns and filter
      customSearches.minimum[colIndex] = {
        min: inputMin
      };

      dataTable.columns().search().draw();
    }

    // fills date range inputs when clndr-grid days are clicked
    function handleDateFilterCalendarClick(clndrDay, $focusedFormGroup) {
      var $dayEl = $(clndrDay.element);
      var $days = $dayEl.siblings();

      var month = Utils.pad(clndrDay.date.month() + 1, '00');
      var date = Utils.pad(clndrDay.date.date(), '00');
      var year = clndrDay.date.year();

      // place numbers in the correct inputs
      $focusedFormGroup.find('.month-input').val(month);
      $focusedFormGroup.find('.day-input').val(date);
      $focusedFormGroup.find('.year-input').val(year);

      if ($focusedFormGroup.index() == 0) {
        $days.removeClass('is-from');
        $dayEl.addClass('is-from');
      } else {
        $days.removeClass('is-to');
        $dayEl.addClass('is-to');
      }
    }

    function setColumnCurrency(colIndex, newCurrency) {
      var cells = dataTable.column(colIndex).nodes();
      var origData = _.map(dataTable.column(colIndex).data(), function (data, i) {
        return {
          data: data,
          currency: dataTable.cell(i, '.currency').data()
        };
      });

      if (newCurrency === 'any') {
        delete columnCurrencySettings[colIndex];

        // write original data with currency
        cells.each(function (el, i) {
          $(el).html(origData[i].data + ' ' + origData[i].currency);
        });
      } else {
        columnCurrencySettings[colIndex] = { currency: newCurrency };

        // Convert cell html to new currency without changing underlying data
        cells.each(function (el, i) {
          var origRange = parseRange(origData[i].data);
          var mult = currencyConversionRates[origData[i].currency][newCurrency];

          // TODO: pad these
          var newMin = Math.round(origRange.min * mult * 100) / 100;
          var newMax = Math.round(origRange.max * mult * 100) / 100;

          $(el).html(newMin + ' – ' + newMax + ' ' + newCurrency);
        });
      }
    }

    function parseRange(rangeString) {
      var dashIndex = rangeString.indexOf(' – ');
      var min = parseFloat(rangeString.slice(0, dashIndex));
      var max = parseFloat(rangeString.slice(dashIndex + 3));

      var obj = {
        min: min,
        max: max
      };

      return obj;
    }

    function handleFilterBtnClick(e) {
      var $filterBtn = $(e.currentTarget);

      if (!$filterBtn.data('filterType')) {
        // Does it even have a filter?
        console.warn('handleFilterBtnClick:: no filter type specified on', $filterBtn);
      } else if ($filterBtn.data('$filter')) {
        // did we already build the filter?
        var $oldFilter = $filterBtn.data('$filter');

        $oldFilter.show();

        // size/position unless it's in the fixed column
        if (!$filterBtn.closest('.DTFC_LeftWrapper').length > 0) {
          filterSizePosition($oldFilter, $filterBtn);
        }

        // focus on input
        if ($oldFilter.find('input').length > 0) {
          $oldFilter.find('input').first().focus();
        }

        setPopupCloseListener($oldFilter, e);
      } else {
        createFilter($filterBtn, e);
      }
    }

    function createFilter($filterBtn, e) {
      // create the filter popup
      // select template and prep column datalet $colHeader = $filterBtn.siblings('.acc-table__table-header-top')
      var $appendTarget = $el;
      var $colHeader = $filterBtn.closest('thead').find('.acc-table__table-header-top').eq($filterBtn.index());
      var DT_Column = dataTable.column($filterBtn.closest('th').index());
      var filterType = $filterBtn.data('filterType');
      var tmpl = Utils.getTemplate('filter-' + filterType + '-template');
      var tmplData = void 0,
          doFilterSetup = void 0,
          columnOptions = void 0,
          optionObjs = void 0;

      switch (filterType) {
        case 'available':
          columnOptions = DT_Column.data().unique().sort().toArray();

          // render options differently for certain columns
          optionObjs = _.map(columnOptions, function (option) {
            if ($colHeader.hasClass('acc-table__td--flag')) {
              // options are true/false
              return {
                display: option ? '<i class="icomoon-flag"></i>' : '<i class="icomoon-noflag"></i>',
                data: option
              };
            } else {
              // options could be any string
              return {
                display: option,
                data: option
              };
            }
          });

          tmplData = {
            options: optionObjs,
            columnTitle: $colHeader.text()
          };
          doFilterSetup = function doFilterSetup($filter) {
            setupFilter_available($filter, $filterBtn);
          };
          break;

        case 'search':
          tmplData = { columnTitle: $colHeader.text() };
          doFilterSetup = function doFilterSetup($filter) {
            setupFilter_search($filter, $filterBtn);
          };
          break;

        case 'search-available':
          columnOptions = DT_Column.data().unique().sort().toArray();
          // could display ever be diff't from data in this filter?
          // passing the options obj into an additional setup func instead
          optionObjs = _.map(columnOptions, function (option) {
            return { display: option, data: option };
          });

          // despite filter name, use search template
          tmpl = Utils.getTemplate('filter-search-template');

          tmplData = { columnTitle: $colHeader.text() };
          doFilterSetup = function doFilterSetup($filter) {
            setupFilter_search($filter, $filterBtn);
            setupFilter_search_available($filter, $filterBtn, optionObjs);
          };
          break;

        case 'slider':
          tmplData = { columnTitle: $colHeader.text() };
          doFilterSetup = function doFilterSetup($filter) {
            setupFilter_slider($filter, $filterBtn);
          };
          break;

        case 'stars':
          tmplData = { columnTitle: $colHeader.text() };
          doFilterSetup = function doFilterSetup($filter) {
            setupFilter_stars($filter, $filterBtn);
          };
          break;

        case 'cost-range':
          // build currency options from whatever is represented in jobs list. THIS MIGHT CHANGE
          var currencyOptions = dataTable.column('.currency').data().unique().sort().toArray();
          tmplData = {
            currencies: currencyOptions,
            columnTitle: $colHeader.text()
          };
          doFilterSetup = function doFilterSetup($filter) {
            setupFilter_costRange($filter, $filterBtn);
          };
          break;

        case 'date-range':
          tmplData = {
            columnTitle: $colHeader.text()
          };
          doFilterSetup = function doFilterSetup($filter) {
            setupFilter_dateRange($filter, $filterBtn);
          };
          break;

        default:
          console.warn('handleFilterBtnClick:: filter type', filterType, 'has no setup handler!');
          return false;
      }

      var $filter = $(tmpl(tmplData));
      var $filterBody = $filter.find('.popup-menu__body');

      // if it's in the fixed column do things a lil differently
      if ($filterBtn.closest('.DTFC_LeftWrapper').length > 0) {
        var colWidth = $filterBtn.closest('th').outerWidth();

        $filter.appendTo($appendTarget).css({ width: colWidth });

        $filterBody.addClass('popup-menu__body--justify-left');
      } else {
        $filter.appendTo($appendTarget);
        filterSizePosition($filter, $filterBtn);
      }

      $filterBtn.data('$filter', $filter);

      // setup function according to filter type
      doFilterSetup($filter, $filterBtn);
      setPopupCloseListener($filter, e);
    }

    function setupFilter_available($filter, $filterBtn) {
      var $options = $filter.find('.popup-menu__option');

      $options.on('click', function () {
        var colIndex = $filterBtn.closest('th').index();
        var val = $(this).attr('value');
        var display = $(this).html();

        // clear and add check
        $options.removeClass('popup-menu__option--selected');
        $(this).addClass('popup-menu__option--selected');

        // clear or filter column
        if (val === 'All') {
          filterColumnClear($filter, $filterBtn);
          hidePopUp($filter);
        } else {
          dataTable.column(colIndex).search(val).draw();
          filterDisplayTerm($filter, $filterBtn, display);
          hidePopUp($filter);
        }
      });
    }

    function setupFilter_slider($filter, $filterBtn) {
      var colIndex = $filterBtn.closest('th').index();
      var $slider = $filter.find('input[type="range"]');
      var $amount = $filter.find('.popup-menu__slider span');
      var $resetButton = $filter.find('.popup-menu__confirm-buttons div:eq(0)');
      var $okButton = $filter.find('.popup-menu__confirm-buttons div:eq(1)');

      $slider.rangeslider({
        polyfill: false,
        onInit: function onInit() {
          $amount.html($slider[0].value + '%');
        },
        onSlide: function onSlide(position, value) {
          $amount.html(value + '%');
        }
      });

      $resetButton.on('click', function () {
        delete customSearches.minimum[colIndex];
        filterColumnClear($filter, $filterBtn);
        hidePopUp($filter);
      });

      $okButton.on('click', function () {
        // just clear the filter if it's set to 0
        if ($slider[0].value === '0') {
          delete customSearches.minimum[colIndex];
          filterColumnClear($filter, $filterBtn);
          hidePopUp($filter);
          return false;
        }

        var displayStr = $slider[0].value + '% and Up';

        filterOnColumnByMinimum(colIndex, $slider[0].value);
        filterDisplayTerm($filter, $filterBtn, displayStr);
        hidePopUp($filter);
      });
    }

    function setupFilter_stars($filter, $filterBtn) {
      var colIndex = $filterBtn.closest('th').index();
      var $resetButton = $filter.find('.popup-menu__confirm-buttons div:eq(0)');
      var $okButton = $filter.find('.popup-menu__confirm-buttons div:eq(1)');

      var $stars = $filter.find('.star');

      $stars.on('click', function (e) {
        var index = $(e.target).index();
        // remove filled class
        $stars.removeClass('filled');
        // add .filled to all stars up to index
        $stars.filter(':lt(' + (index + 1) + ')').addClass('filled');
      });

      $resetButton.on('click', function () {
        delete customSearches.minimum[colIndex];
        filterColumnClear($filter, $filterBtn);
        hidePopUp($filter);
      });

      $okButton.on('click', function () {
        var stars = $filter.find('.popup-menu__stars .star.filled').length;

        var ratingMarkup = '';
        for (var i = 0; i < 5; i++) {
          var filledClass = i < stars ? ' filled' : '';
          ratingMarkup += '<div class="star' + filledClass + '">★</div>';
        }

        ratingMarkup += ' and Up';

        filterOnColumnByMinimum(colIndex, stars);
        filterDisplayTerm($filter, $filterBtn, ratingMarkup);
        hidePopUp($filter);
      });
    }

    // data-filter-type="search"
    function setupFilter_search($filter, $filterBtn) {
      var $searchInput = $filter.find('.popup-menu__search-input');
      var $results = $filter.find('.popup-menu__results');
      var $resultsList = $filter.find('.popup-menu__results-list');
      var $clearX = $filter.find('.clear-x');

      $results.perfectScrollbar({
        swipePropagation: false,
        wheelSpeed: 2
      });

      // focus input
      $searchInput.focus();

      $clearX.on('click', function () {
        $searchInput.val('').focus();
        $resultsList.empty();
        // reset table
        filterColumnClear($filter, $filterBtn);
      });

      // keystrokes filter the list of options
      $searchInput.on('keyup', function (e) {
        var colIndex = $filterBtn.closest('th').index();
        var searchTerm = e.target.value;

        // handle empty search
        if (searchTerm === '') {
          $resultsList.empty();
          $results.perfectScrollbar('update');
          return false;
        }

        // get results
        dataTable.column(colIndex).search(searchTerm);
        var results = dataTable.column(colIndex, { search: 'applied' }).data().unique();

        // clear existing results
        $resultsList.empty();

        // build new results
        results.each(function (result) {
          var text = result.toString();
          // some cells might contain links or other HTML, so parse to plain string
          if (/<[a-z][\s\S]*>/i.test(text)) {
            text = $(text).text();
          }

          // highlight seach term within result text
          var openPos = text.toUpperCase().indexOf(searchTerm.toUpperCase());
          var closePos = openPos + searchTerm.length;
          var hilitedText = text.slice(0, openPos) + '<span class="hilite">' + text.slice(openPos, closePos) + '</span>' + text.slice(closePos);
          var $result = $('<div value="' + text + '"><div class="pad-multilines">' + hilitedText + '</div></div>')
          // setup table filter on click
          .on('click', function (e) {
            handleFilterOptionClick(e, $filter, $filterBtn, colIndex);
          });

          $resultsList.append($result);
        });

        // update scrollbar
        setTimeout(function () {
          $results.scrollTop(0).perfectScrollbar('update');
        });
      });
    }

    function handleFilterOptionClick(e, $filter, $filterBtn, colIndex) {
      var val = $(e.currentTarget).attr('value');
      dataTable.column(colIndex).search(val).draw();

      filterDisplayTerm($filter, $filterBtn, val);
      hidePopUp($filter);
    }

    // TODO: GET DESIGNS AND FINISH THIS
    // data-filter-type="search-available"
    function setupFilter_search_available($filter, $filterBtn, optionObjs) {
      var $searchInput = $filter.find('.popup-menu__search-input');
      var $results = $filter.find('.popup-menu__results');
      var $resultsHead = $filter.find('.popup-menu__results-head');
      var $resultsList = $filter.find('.popup-menu__results-list');
      var colIndex = $filterBtn.closest('th').index();

      // init with options
      buildNonSearchResults();

      $searchInput.on('keyup', function (e) {
        var colIndex = $filterBtn.closest('th').index();
        var searchTerm = e.target.value;

        // if search if empty, insert the existing options list
        if (searchTerm === '') {
          buildNonSearchResults();
        } else {
          $resultsHead.text('Results');
        }
      });

      function buildNonSearchResults() {
        $resultsHead.text('Or, Select');
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = optionObjs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var option = _step.value;

            var $result = $('<div value="' + option.data + '"><span>' + option.display + '</span></div>').on('click', function (e) {
              handleFilterOptionClick(e, $filter, $filterBtn, colIndex);
            });

            $resultsList.append($result);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        $results.perfectScrollbar('update');
      }
    }

    // data-filter-type="cost-range"
    function setupFilter_costRange($filter, $filterBtn) {
      var $inputs = $filter.find('input');
      var $minInput = $filter.find('.popup-menu__inline-form-group:eq(0) input');
      var $maxInput = $filter.find('.popup-menu__inline-form-group:eq(1) input');
      var $currencySelect = $filter.find('.mdb-select');
      var $resetButton = $filter.find('.popup-menu__confirm-buttons div:eq(0)');
      var $okButton = $filter.find('.popup-menu__confirm-buttons div:eq(1)');

      $currencySelect.material_select();
      $minInput.focus();

      // only allow numbers or '.'
      $inputs.on('keypress', function (e) {
        return e.charCode >= 48 && e.charCode <= 57 || e.charCode === 46;
      });

      $resetButton.on('click', function () {
        var colIndex = $filterBtn.closest('th').index();
        // reset and deactivate min/max inputs
        $minInput.val('');
        $minInput.siblings('label').removeClass('active');
        $maxInput.val('');
        $maxInput.siblings('label').removeClass('active');

        // reset currency to usd
        $currencySelect.find('option[selected]').removeAttr('selected');
        $currencySelect.find('option[value=any]').attr('selected', '');
        $currencySelect.material_select('destroy');
        $currencySelect.material_select();

        // focus on first input
        $minInput.focus();

        // clear custom search
        delete customSearches.costRange[colIndex];
        // clear currency settings
        setColumnCurrency(colIndex, 'any');
        // not sure if we need to, but clear normal col search
        filterColumnClear($filter, $filterBtn);

        hidePopUp($filter);
      });

      $okButton.on('click', function () {
        var colIndex = $filterBtn.closest('th').index();
        var min = parseFloat($minInput.val());
        var max = parseFloat($maxInput.val());
        var currency = $currencySelect.val();

        // if inputs are valid, get the range
        if (!isNaN(min) && !isNaN(max)) {
          setColumnCurrency(colIndex, currency);

          var currencyStr = columnCurrencySettings[colIndex] ? ' ' + columnCurrencySettings[colIndex]['currency'] : '';
          var displayStr = min.toFixed(2) + ' – ' + max.toFixed(2) + currencyStr;

          filterOnColumnByCostRange(colIndex, min, max);

          filterDisplayTerm($filter, $filterBtn, displayStr);

          hidePopUp($filter);
        } else {
          console.warn('setupFilter_costRange:: invalid input');
        }
      });
    }

    // data-filter-type="date-range"
    function setupFilter_dateRange($filter, $filterBtn) {
      // provides form-group OR input
      function $getEl(fromTo, dayMonthYear) {
        if (dayMonthYear) {
          return $filter.find('.popup-menu__inline-form-group.' + fromTo + ' .' + dayMonthYear + '-input');
        } else {
          return $filter.find('.popup-menu__inline-form-group.' + fromTo);
        }
      }

      var $formGroups = $filter.find('.popup-menu__inline-form-group');
      var $inputs = $filter.find('input');

      var $clndrGrid = $filter.find('#clndr-grid');
      var $resetButton = $filter.find('.popup-menu__confirm-buttons div:eq(0)');
      var $okButton = $filter.find('.popup-menu__confirm-buttons div:eq(1)');

      // determines what clicking the calendar will do
      var $focusedFormGroup = void 0;

      var clndrOptions = {
        template: $('#filter-calendar-template').html(),
        // forceSixRows: true,
        showAdjacentMonths: true,
        clickEvents: {
          click: function click(target) {
            handleDateFilterCalendarClick(target, $focusedFormGroup);
          }
        }
      };

      var calendar = $clndrGrid.clndr(clndrOptions);

      $inputs.on('focus', function (e) {
        $focusedFormGroup = $(e.target).closest('.popup-menu__inline-form-group');

        // cleanup
        $formGroups.removeClass('active');
        $clndrGrid.removeClass('show-from show-to');
        // mark the correct form group as active
        $focusedFormGroup.addClass('active');
        // highlight to or from date in grid
        if ($focusedFormGroup.index() == 0) {
          $clndrGrid.addClass('show-from');
        } else {
          $clndrGrid.addClass('show-to');
        }
      });

      $inputs.on('blur', function (e) {
        var $input = $(e.target);
        // zero-base months and days
        if ($input.hasClass('year-input') && $input.val().length > 0) {
          $input.val(Utils.pad($input.val(), '2000'));
          // 2000-base years
        } else if ($input.val().length > 0) {
          $input.val(Utils.pad($input.val(), '00'));
        }
      });

      $inputs.on('keypress', function (e) {
        var $input = $(e.target);
        var maxLength = $input.attr('maxlength');
        var $nextInput = $input.is($getEl('from', 'year')) ? $getEl('to', 'month') : $input.next().next('input');
        var caretPos = $input[0].selectionStart;

        // only allow numbers
        if (e.charCode < 48 || e.charCode > 57) {
          return false;
        }

        if (caretPos == maxLength) {
          // put new char in next input
          e.preventDefault();
          var newChar = String.fromCharCode(e.which);

          // if there is a next input, focus it
          if ($nextInput.length > 0) {
            $nextInput.focus().val(newChar);
          }
        }
      });

      $resetButton.on('click', function () {
        var colIndex = $filterBtn.closest('th').index();
        // reset and deactivate min/max inputs
        $formGroups.removeClass('active');
        $inputs.val('');

        // clear selected days in gridPad
        $clndrGrid.find('.day').removeClass('is-to is-from');

        // focus on first input
        $getEl('from', 'month').focus();

        // clear custom search
        delete customSearches.dateRange[colIndex];

        // not sure if we need to, but clear normal col search
        filterColumnClear($filter, $filterBtn);

        hidePopUp($filter);
      });

      $okButton.on('click', function () {
        var colIndex = $filterBtn.closest('th').index();
        var from = $getEl('from', 'month').val() + '/' + $getEl('from', 'day').val() + '/' + $getEl('from', 'year').val();
        var to = $getEl('to', 'month').val() + '/' + $getEl('to', 'day').val() + '/' + $getEl('to', 'year').val();

        // if inputs are valid, get the range
        //if (!isNaN(min) && !isNaN(max)) {
        var displayStr = from + ' – ' + to;
        filterOnColumnByDateRange(colIndex, from, to);
        filterDisplayTerm($filter, $filterBtn, displayStr);

        // } else {
        //   console.warn('setupFilter_costRange:: invalid input');
        // }

        hidePopUp($filter);
      });

      $getEl('from', 'month').focus();
    }

    // used in building new filters and revealing old filters
    // due to possible column re-ordering
    function filterSizePosition($filter, $filterBtn) {
      if (Utils.isMobile()) return;

      // get size/position data
      var $filterBody = $filter.find('.popup-menu__body');
      var scrollLeft = $scrollBody.scrollLeft();
      var colPos = $filterBtn.position().left + getLeftColWidth() + scrollLeft;
      var colWidth = $filterBtn.closest('th').outerWidth();
      var colIndex = $filterBtn.closest('th').index();

      $filter.attr('data-col-x', colPos).css({
        width: colWidth,
        left: colPos - scrollLeft
      });

      // reset left/right justify classes
      $filterBody.removeClass('popup-menu__body--justify-right popup-menu__body--justify-left');

      filterHandleWideBody($filter, $filterBtn);
    }

    function filterHandleWideBody($filter, $filterBtn) {
      var $filterBody = $filter.find('.popup-menu__body');
      var rightSideDist = $el.width() - $filterBody.offset().left - $filterBody.width();

      // handle rounded corner on sticking-out body
      if ($filterBody.outerWidth() > $filterBtn.outerWidth()) {
        if (rightSideDist <= 6) {
          // ps__scrollbar rail width
          $filterBody.addClass('popup-menu__body--justify-right');
        } else {
          $filterBody.addClass('popup-menu__body--justify-left');
        }
      }
    }

    // COLUMN REORDER SCROLLING

    function startColDrag() {
      // set listener for mouseup. On $win because DTCR_clonedTable isn't created until after some dragging
      $win.on('mouseup.colDrag', endColDrag);
      colDragScrollInterval = setInterval(colDragScroll, 50);
    }

    function endColDrag() {
      // cleanup
      $win.off('mouseup.colDrag');
      clearInterval(colDragScrollInterval);
    }

    function colDragScroll() {
      var $dragEl = $('.DTCR_clonedTable');

      if ($dragEl.length > 0) {
        var rightSideDist = $el.width() - $dragEl.offset().left - $dragEl.width();
        var leftSideDist = $dragEl.offset().left - (getLeftColWidth() + 60);
        var curScroll = $scrollBody.scrollLeft();
        var scrollStep = 15;
        var scrollTriggerDistance = 15;

        if (rightSideDist < scrollTriggerDistance) {
          // AK: commenting these at least gets the landing
          // indicator correctly positioned after the scroll is complete
          $scrollBody.scrollLeft(curScroll + (scrollStep - rightSideDist)).perfectScrollbar('update');
        } else if (leftSideDist < scrollTriggerDistance) {
          $scrollBody.scrollLeft(curScroll - (scrollStep - leftSideDist)).perfectScrollbar('update');
        }
      }
    }

    // FULLSCREEN STUFF

    function initDesktopFullScreenBtn() {
      var $fsBtn = $('<div>').addClass('list-fullscreen-btn');
      toggleFsBtnIcon($fsBtn);
      $fsBtn.on('click', onDesktopFullScreenBtnClick);
      $el.find('.custom-paging').append($fsBtn);
    }

    function goDesktopFullScreen() {
      var top = $el.offset().top;
      var left = $el.offset().left;

      $('body').addClass('fs-table-no-scroll');
      $el.addClass('fs-animating').css({
        top: -(top - $('body').scrollTop()),
        left: -(left - NAV_BAR_WIDTH),
        height: '100vh',
        width: 'calc(100vw - ' + NAV_BAR_WIDTH + 'px)',
        'z-index': 10 // above perfectScrollbars
      });

      setTimeout(function () {
        $el.removeClass('fs-animating');
      }, 1000);
    }

    function goDesktopNormalSize() {
      $el.addClass('fs-animating').removeAttr('style');

      setTimeout(function () {
        $el.removeClass('fs-animating');
        $('body').removeClass('fs-table-no-scroll');
      }, 1000);
    }

    function toggleFsBtnIcon($btn) {
      var iconHtml = '<i class="material-icons">' + (fullscreen ? 'fullscreen_exit' : 'fullscreen') + '</i>';
      $btn.html(iconHtml);
    }

    function onDesktopFullScreenBtnClick(e) {
      var $btn = $(e.currentTarget);

      if (fullscreen) {
        fullscreen = false;
        goDesktopNormalSize();
      } else {
        fullscreen = true;
        goDesktopFullScreen();
      }

      toggleFsBtnIcon($btn);
    }

    function buildCustomPagination() {
      var $customPaging = $el.find('.custom-paging');
      var pageInfo = dataTable.page.info();

      var paging_increment = Utils.isMobile() ? 5 : 10;
      var pageGroups = Math.ceil(pageInfo.pages / paging_increment);
      var currGroup = Math.floor(pageInfo.page / paging_increment);

      var visible_pages = [];
      var start = void 0,
          end = void 0;

      // show [increment] page links for the last group, even if [pages] % [increment] != 0
      if (currGroup + 1 === pageGroups && pageInfo.pages >= paging_increment) {
        start = pageInfo.pages - paging_increment;
        end = pageInfo.pages;
      } else {
        start = currGroup * paging_increment;
        end = start + paging_increment > pageInfo.pages ? pageInfo.pages : start + paging_increment;
      }

      for (var i = start; i < end; i++) {
        visible_pages.push(i + 1);
      }

      var firstPage = visible_pages.indexOf(1) === -1;
      var lastpage = visible_pages.indexOf(pageInfo.pages) === -1 ? pageInfo.pages : false;

      var tmplData = {
        pages: pageInfo.pages,
        visiblePages: visible_pages,
        current: pageInfo.page,
        increment: paging_increment,
        firstPage: firstPage,
        lastPage: lastpage,
        prevBtnGoto: (currGroup - 1) * paging_increment + paging_increment - 1,
        nextBtnGoto: (currGroup + 1) * paging_increment,
        prevBtnClass: currGroup === 0 ? 'disabled' : '',
        nextBtnClass: currGroup + 1 === pageGroups ? 'disabled' : ''
      };

      var tmpl = Utils.getTemplate('custom-paging-template');
      var $paging = $(tmpl(tmplData));
      $customPaging.html($paging);

      var $buttons = $customPaging.find('.paginate_button').not('.current');

      $buttons.on('click', function (e) {
        var page = $(e.currentTarget).attr('data-goto');
        dataTable.page(parseInt(page)).draw(false);
      });
    }

    function addCustomSearches() {
      // custom search plugin for matching ranges
      $.fn.dataTable.ext.search.push(function (settings, data, index, rowData, counter) {
        // loop through costRange searches
        var costRangeSearches = customSearches.costRange;

        for (var prop in costRangeSearches) {
          if (costRangeSearches.hasOwnProperty(prop)) {
            var colIndex = prop;
            var search = costRangeSearches[colIndex];
            var searchMin = search.min;
            var searchMax = search.max;

            var dataRange = parseRange(data[colIndex]);

            // TODO: better way to set currencyCol where original currency is stored??
            var mult = void 0;
            if (columnCurrencySettings[colIndex]) {
              mult = currencyConversionRates[data[currencyCol]][columnCurrencySettings[colIndex].currency];
            } else {
              mult = 1;
            }

            // if cell range falls outside input range, exclude cell
            if (searchMin > dataRange.min * mult || dataRange.max * mult > searchMax) {
              return false;
            }
          }
        }

        // loop through dateRange searches
        var dateRangeSearches = customSearches.dateRange;
        for (var prop in dateRangeSearches) {
          if (dateRangeSearches.hasOwnProperty(prop)) {
            var _colIndex = prop;
            var _search = dateRangeSearches[_colIndex];
            var dataMoment = moment(data[_colIndex], 'MMM DD, YYYY');
            var fromMoment = moment(_search.min, 'MM/DD/YYYY');
            var toMoment = moment(_search.max, 'MM/DD/YYYY');

            // if cell range falls outside input range, exclude cell
            if (!dataMoment.isBetween(fromMoment, toMoment)) {
              return false;
            }
          }
        }

        // loop through minimum searches
        var minSearches = customSearches.minimum;
        for (var prop in minSearches) {
          if (minSearches.hasOwnProperty(prop)) {
            var _colIndex2 = prop;
            var _search2 = minSearches[_colIndex2];
            var colData = data[_colIndex2];
            var min = _search2.min;

            if (colData < min) {
              return false;
            }
          }
        }

        return true;
      });
    }
  };

  // adds classNames for pre-determined column types
  // TODO: Is this likely to falsely ID similar methods?
  this.buildColumns = function (columns) {
    var _this = this;

    _.map(columns, function (col) {
      // flag
      if (_this.renderFlag.toString().indexOf(col.render) > -1) {
        col.className = _this.tdClass('flag', col.className);
        // checkbox
      } else if (_this.renderCheckbox.toString().indexOf(col.render) > -1) {
        col.className = _this.tdClass('checkbox', col.className);
        // stars
      } else if (_this.renderStarRating.toString().indexOf(col.render) > -1) {
        col.className = _this.tdClass('stars', col.className);
        // double-button
      } else if (_this.renderDoubleSingleButtons.toString().indexOf(col.render) > -1) {
        col.className = _this.tdClass('double-single-button', col.className);
        // links group
      } else if (_this.renderLinksGroup.toString().indexOf(col.render) > -1) {
        col.className = _this.tdClass('links-group', col.className);
      }
    });

    return columns;
  };

  // cell render functions
  // used in columns option at init
  this.tdClass = function (tdType, extraClass) {
    var returnClass = 'acc-table__td' + (tdType ? ' acc-table__td--' + tdType : '');

    if (extraClass) {
      returnClass += ' ' + extraClass;
    }

    return returnClass;
  };

  this.renderDate = function (format) {
    return function (isoDateTime, type, row, meta) {
      if (type === 'display') {
        if (isoDateTime) {
          return moment(isoDateTime).format(format);
        } else {
          return '';
        }
      } else {
        return isoDateTime;
      }
    };
  };

  this.renderPercent = function (data, type) {
    if (type === 'display') {
      return data + '%';
    } else {
      return data;
    }
  };

  // combines text from one column and link from another. links to '#' if no link provided
  this.renderLink = function (textColumn, urlColumn) {
    return function (data, type, row, meta) {
      if (type === 'display') {
        return '<a href="' + (data[urlColumn] || '#') + '">' + data[textColumn] + '</a>';
      } else {
        return data[textColumn];
      }
    };
  };

  // ZD: Is this column sortable?
  this.renderCheckbox = function (label) {
    return function (isChecked, type, row, meta) {
      if (type === 'display') {
        var checkAttr = isChecked ? 'checked' : '';
        return '<input ' + checkAttr + ' type="checkbox" id="' + meta.row + '" tabindex="4"><label for="' + meta.row + '">' + label + '</label>';
      } else {
        return isChecked;
      }
    };
  };

  this.renderFlag = function (isShortlisted, type) {
    if (type === 'display') {
      var iconClass = isShortlisted ? 'active' : '';
      return '<div class="flag ' + iconClass + '"></i>';
    } else {
      return isShortlisted;
    }
  };

  this.renderDoubleSingleButtons = function (leftBtnText, rightBtnText, fullBtnText) {
    return function (isEngaged, type, row, meta) {
      if (type === 'display') {
        if (isEngaged) {
          return '<div class="td-btn-group__wrapper"> \
            <div class="td-btn-group__btn td-btn-group__btn--fullsize">' + fullBtnText + '</div> \
            </div>';
        } else {
          return '<div class="td-btn-group__wrapper"> \
          <div class="td-btn-group__btn td-btn-group__btn--left">' + leftBtnText + '</div> \
          <div class="td-btn-group__btn td-btn-group__btn--right">' + rightBtnText + '</div> \
          </div>';
        }
      } else {
        return isEngaged;
      }
    };
  };

  this.renderStarRating = function (stars, type) {
    if (type === 'display') {
      var ratingMarkup = '';
      for (var i = 0; i < 5; i++) {
        var filledClass = i < stars ? ' filled' : '';
        ratingMarkup += '<div class="star' + filledClass + '">★</div>';
      }

      ratingMarkup += '<span class="hidden-spacer"> and Up</span>';
      return ratingMarkup;
    } else {
      return stars;
    }
  };

  // combines multiple columns into a group of links
  this.renderLinksGroup = function (linksArray) {
    return function (data, type, row, meta) {
      var linksMarkup = '';

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = linksArray[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var link = _step2.value;

          if (data[link.column]) {
            var oneLink = (linksMarkup ? ' | ' : '') + '<a href="' + data[link.column] + '">' + link.name + '</a>';
            linksMarkup += oneLink;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (type === 'display') {
        return linksMarkup;
      } else {
        return $(linksMarkup).text();
      }
    };
  };
}