'use strict';

$(function () {
  var pageClass = '.page-job-record';

  var $candidateTabs = $(pageClass + '__candidate-tabs');

  var $el = $('.acc-table');
  var $isNewDots = $el.find('.acc-table__is-new-dots');
  var newColSelector = '.new';

  var didFirstDraw = false;

  var accTable = new AccTable();
  accTable.init($el, {
    data: 'json/job-record-hire-ajax.json',
    leftFixedColumns: 2,
    rowId: 'candidate_id',
    //forceHeight: true,
    columns: [{ data: null, render: accTable.renderLink('candidate'), className: 'send-to-tab-cell' }, {
      data: 'is_engaged',
      render: accTable.renderDoubleSingleButtons('Engage', 'Reject', 'Engagement in Progress'),
      className: 'engage-reject-cell'
    }, { data: 'candidate_id' },
    //{ data: null, render: accTable.renderLinksGroup([
    //  {name: 'History', column: 'history'},
    //  {name: 'Resume', column: 'resume'},
    //  {name: 'Comments', column: 'comments'}
    //])},
    { data: 'resume_match', render: accTable.renderPercent }, { data: 'skills_match', render: accTable.renderPercent }, { data: 'rating', render: accTable.renderStarRating }, { data: 'shortlist', render: accTable.renderFlag }, { data: 'compare', render: accTable.renderCheckbox('Compare'), className: 'left-rule scroll-anchor' }, { data: 'interview_date', render: accTable.renderDate('MM/DD/YY @ h:mm A z') }, { data: 'alternate_date' }, { data: 'format' }, { data: null, render: accTable.renderLink('interview'), className: 'left-rule scroll-anchor interview-cell' }, { data: 'bill_rate' }, { data: 'proposed_bill_rate' }, { data: 'total_cost' }, { data: null, render: accTable.renderLink('negotiate'), className: 'negotiate-cell' }, { data: 'vendor' }, { data: 'submitted' }],
    info: "_TOTAL_ / _MAX_ records <i class='acc-table__next-section-btn icomoon-next'></i>"
    //columnDefs: [{ targets: ['currency', 'new'], visible: false }]
  });

  var dataTable = accTable.dataTable;

  function initAnchorColumns() {
    var $scrollBody = $el.find('.dataTables_scrollBody');

    $el.on('click', '.acc-table__next-section-btn', function () {
      var $anchorColTds = $(dataTable.columns('.scroll-anchor').nodes());
      var foundOne = false;
      // scroll to the first anchor whose current position is positive
      $anchorColTds.each(function (i, el) {
        var leftPos = $(el).position().left;
        if (leftPos > 0) {
          foundOne = true;
          $(el).velocity('scroll', {
            container: $scrollBody,
            axis: 'x',
            offset: '1px'
          });
          return false;
        }
      });

      // if there's no further column, go back to 0
      if (!foundOne) {
        $scrollBody.find('td:first-child').velocity('scroll', {
          container: $scrollBody,
          axis: 'x'
        });
      }
    });
  }

  dataTable.on('draw.dt', function () {
    onTableDraw();
    onFirstDraw();
  });

  onTableDraw();
  initTableCellClicks();

  $('.mdb-select').material_select();

  // build stack of dots overlapping the left side of the table
  function buildIsNewDots() {
    var rowHeight = $(dataTable.rows().nodes(0)).outerHeight();
    var data = dataTable.rows({ search: 'applied' }).data();
    // clear old dots
    $isNewDots.html('');
    $.each(data, function (i, datum) {
      var $isNewBlock = $('<div class="is-new-block"></div>');

      $isNewBlock.appendTo($isNewDots).css({ height: rowHeight });
      if (datum.new) {
        $isNewBlock.addClass('dot');
      }
    });
  }

  // first column links create new tabs with candidate names
  function initTableCellClicks() {
    $el.on('click', 'td.send-to-tab-cell a', handleSendToTabClick);
    $el.on('click', 'td.engage-reject-cell .td-btn-group__btn--left', handleEngageClick);
    $el.on('click', 'td.engage-reject-cell .td-btn-group__btn--right', handleRejectClick);
  }

  // TODO: probably need to attach candidate ID in renderFunc to display proper data under new tab
  function handleSendToTabClick(e) {
    var id = dataTable.row($(e.target).closest('td')[0]).id();
    var name = $(e.target).text();
    var $appendTarget = $candidateTabs.find('.tabs');

    if (!$appendTarget.find('*:contains(' + name + ')').length) {
      var $newTab = $('<div class="tab tab--deletable" data-candidate-id="' + id + '">' + name + ' <i class="material-icons">close</i></div>');
      $appendTarget.append($newTab);
    } else {
      console.warn('candidate tab already exists!');
    }
  }

  // TODO: Finish this
  function handleEngageClick(e) {
    var id = dataTable.row($(e.target).closest('td')[0]).id();
    console.log('ENGAGE ' + id);
  }
  // TODO: finish this
  function handleRejectClick(e) {
    var id = dataTable.row($(e.target).closest('td')[0]).id();
    console.log('REJECT ' + id);
  }

  function onTableDraw() {
    buildIsNewDots();
  }

  // after first DT draw
  function onFirstDraw() {
    if (!didFirstDraw) {
      initAnchorColumns();
    }
    didFirstDraw = true;
  }
});