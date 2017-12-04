'use strict';

$(function () {
  var weekTransition = 500;

  var $win = $(window);

  var $monthSelect = $('.calendar-month-select');
  var $yearSelect = $('.calendar-year-select');
  var $clndrGrid = $('#clndr-grid');
  var $clndrLastMonthGrid = $('#clndr-last-month-grid');
  var $clndrDay = $('#clndr-day');

  var now = moment();

  var calendar = void 0;
  var calendarLastMonth = void 0;
  var week = void 0;

  function getTemplate(tmplId) {
    return _.template($('#' + tmplId).html());
  }

  // makes api events nicer
  // TODO: get time-zone. moment timezone?
  function makeEventsNice(events) {
    return _.map(events, function (event) {
      return {
        name: event.name,
        eventType: event.eventType,
        time: moment(event.date).format('h:mm A') + " - " + moment(event.date_end).format('h:mm A')
      };
    });
  }

  function displayDayEvents(date, events) {
    var tmpl = getTemplate('single-day-template');

    $clndrDay.html(tmpl({ date: date, events: events }));

    var $list = $clndrDay.find('.dashboard-list');
    $list.perfectScrollbar({
      wheelPropagation: true
    });
  }

  function selectDay(date) {
    // ...and select the day
    var $todayEl = $clndrGrid.find('.calendar-day-' + date);
    $todayEl.addClass('selected');

    // set the week to determine mobile slider position
    week = $todayEl.closest('.week').index();
    mobileGoToWeek(week);

    // TODO: can this be done without faking click or sorting thru entire month?
    $todayEl.click();
  }

  function setSelects(day) {
    // clndr auto-sets the right month/year for the grid
    // we need to handle the dropdown...
    $monthSelect.find('option[selected]').removeAttr('selected');
    $yearSelect.find('option[selected]').removeAttr('selected');

    $monthSelect.find('option[value=' + (day.month() + 1) + ']').attr('selected', '');
    $yearSelect.find('option:contains(' + day.year() + ')').attr('selected', '');

    $monthSelect.find('option:disabled').html($monthSelect.find("option:selected").html());
    $yearSelect.find('option:disabled').html($yearSelect.find("option:selected").html());

    $('.mdb-select').material_select('destroy');
    $('.mdb-select').material_select();
  }

  function setCalToToday() {
    setSelects(now);
    selectDay(now.format('YYYY-MM-DD'));
  }

  function handleDayClick(target) {
    var $gridDay = $(target.element);
    var dateStr = target.date.format('dddd, MMMM D');

    $('.day.selected').removeClass('selected');
    $gridDay.addClass('selected');

    // set the week to determine mobile slider position
    week = $gridDay.closest('.week').index();
    mobileGoToWeek(week);

    displayDayEvents(dateStr, makeEventsNice(target.events));
  }

  // TODO: obviously this needs to be hooked up to read page data
  // and then make subsequent API calls for getting additional months
  var data = [{
    "name": "Lorem ipsum dolor set amet",
    "jobId": 2,
    "assignmentId": 3,
    "eventType": "interview",
    "date": "2017-05-15T16:01:46.9958955-07:00",
    "date_end": "2017-05-15T16:01:46.9958955-07:00"
  }, {
    "name": "Lorem ipsum dolor set amet",
    "jobId": 2,
    "assignmentId": 3,
    "eventType": "approval",
    "date": "2017-05-15T16:01:46.9958955-07:00",
    "date_end": "2017-05-15T16:01:46.9958955-07:00"
  }, {
    "name": "Lorem ipsum dolor set amet",
    "jobId": 2,
    "assignmentId": 3,
    "eventType": "approval",
    "date": "2017-05-15T16:01:46.9958955-07:00",
    "date_end": "2017-05-15T16:01:46.9958955-07:00"
  }, {
    "name": "Lorem ipsum dolor set amet",
    "jobId": 2,
    "assignmentId": 3,
    "eventType": "approval",
    "date": "2017-05-15T16:01:46.9958955-07:00",
    "date_end": "2017-05-15T16:01:46.9958955-07:00"
  }, {
    "name": "Lorem ipsum dolor set amet",
    "jobId": 2,
    "assignmentId": 3,
    "eventType": "approval",
    "date": "2017-05-15T16:01:46.9958955-07:00",
    "date_end": "2017-05-15T16:01:46.9958955-07:00"
  }, {
    "name": "Lorem ipsum dolor set amet",
    "jobId": 2,
    "assignmentId": 3,
    "eventType": "approval",
    "date": "2017-05-15T16:01:46.9958955-07:00",
    "date_end": "2017-05-15T16:01:46.9958955-07:00"
  }];

  var clndrOptions = {
    template: $('#dashboard-calendar-template').html(),
    daysOfTheWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    forceSixRows: true,
    // trackSelectedDate: true,
    events: data,
    doneRendering: function doneRendering() {
      onClndrRender(this);
    },
    clickEvents: {
      click: function click(target) {
        handleDayClick(target);
      }
    }
  };

  calendar = $clndrGrid.clndr(clndrOptions);

  clndrOptions.forceSixRows = false;
  calendarLastMonth = $clndrLastMonthGrid.clndr(clndrOptions);
  // calendarNextMonth = $clndrNextMonthGrid.clndr(clndrOptions);


  function handleMonthYearChange($select) {
    // figure out the day we'll set it to
    var $prevDay = $clndrGrid.find('.day.selected');
    var prevDayIndex = $prevDay.index();
    var adjacentOrNot = $prevDay.hasClass('adjacent-month') ? '.adjacent-month' : ':not(.adjacent-month)';
    var prevDayText = $prevDay.find('.day-text').text();

    // edit selector markup and switch clndr
    $select.find('option:disabled').html($select.find("option:selected").html());
    if ($select.hasClass('calendar-month-select')) {
      var newVal = $select.find("option:selected").attr('value');
      calendar.setMonth(newVal - 1);
    } else {
      var _newVal = $select.find("option:selected").html();
      calendar.setYear(_newVal);
    }

    if (Utils.isMobile()) {
      mobileHandleMonthYearChange(prevDayIndex);
      return;
    }

    // select same day as was selected in month/year
    var $newDayText = $clndrGrid.find('.day' + adjacentOrNot + ' .day-text').filter(function (i, obj) {
      return $(obj).text() === prevDayText;
    });

    // the right day if it's on the grid, otherwise the 1st of the month
    var $newDayEl = $newDayText.length ? $newDayText.closest('.day') : $clndrGrid.find('.day:not(.adjacent-month)').first();
    $newDayEl.addClass('selected');

    // TODO: can this be done without faking click or sorting thru entire month?
    $newDayEl.click();
  }

  // our own setup after render
  function onClndrRender(self) {
    mobileLabelWeeks();
    // just for visible grid
    if ($(self.element).hasClass('clndr-grid')) {
      placeAdjacentWeeks(self);
    }

    checkContentWidth();
  }

  // MOBILE STUFF
  function placeAdjacentWeeks(clndrInstance) {
    var visibleMonth = clndrInstance.month.month();
    var visibleYear = clndrInstance.month.year();

    if (calendarLastMonth) {
      // create prev month markup to grab from
      calendarLastMonth.setMonth(visibleMonth);
      calendarLastMonth.setYear(visibleYear);
      calendarLastMonth.back();

      // prepend last week from last month
      $clndrLastMonthGrid.find('.week:has(.day):not(:has(.adjacent-month))').last().clone().addClass('imported-week').prependTo($clndrGrid.find('.days'));
    }
  }

  function mobileLabelWeeks() {
    // if a week is entirely adjacent-month, we want to hide it
    // UNLESS its previous neighbor has no adjacent-month days
    $clndrGrid.find('.week:not(:first-child):has(.day.adjacent-month)').next().addClass('mobile-hidden-week');
  }

  function $days() {
    return $clndrGrid.find('.days');
  }

  function weeksThisMonth() {
    return $clndrGrid.find('.week:not(.mobile-hidden-week)').length;
  }

  function mobileSelectSameDay(week, $prevDay) {
    var dayIndex = $prevDay.index();
    var $newWeek = $clndrGrid.find('.week:eq(' + week + ')');
    var $newDay = $newWeek.find('.day:eq(' + dayIndex + ')');
    var classes = $newDay.attr('class');
    var startSlice = classes.indexOf('calendar-day-') + 13;
    var endSlice = startSlice + 10;
    var newDate = classes.slice(startSlice, endSlice);

    $newDay.click();
    // set dropdowns to the correct month/year);
    setSelects(moment(newDate));
  }

  function mobileGoToWeek(week) {
    $clndrGrid.find('.days').css({
      'transform': 'translateX(-' + week * 100 + '%)'
    });
  }

  function mobileChangeWeek(dir) {
    var $prevDay = $clndrGrid.find('.day.selected');
    week = dir === 'next' ? week + 1 : week - 1;

    // handle going into an adjacent month
    if (week < 1) {
      // highlight the right day
      mobileSelectSameDay(0, $prevDay);
      // slide to the placeholder pulled in from previous month
      $days().css('transform', 'translateX(-0%)');
      // wait till placeholder week is in place, then...
      _.delay(function () {
        // switch to prev month
        calendar.back();
        // select the day again since we re-rendered clndr
        week = weeksThisMonth() - 2;
        mobileSelectSameDay(week, $prevDay);
        // instantly go to last non-placeholder week
        $days().css({
          'transform': 'translateX(-' + week * 100 + '%)',
          'transition': 'all 0s'
        });
      }, weekTransition);
      // reset transition
      _.delay(function () {
        $days().css('transition', '');
      }, weekTransition + 10);
    } else if (week > weeksThisMonth() - 2) {
      week = 1;
      // highlight the right day
      mobileSelectSameDay(weeksThisMonth() - 1, $prevDay);
      // slide to the last/placeholder week
      $days().css('transform', 'translateX(-' + (weeksThisMonth() - 1) * 100 + '%)');
      // wait till placeholder week is in place, then...
      _.delay(function () {
        // switch to next month
        calendar.forward();
        // select the day again since we re-rendered clndr
        week = 1;
        mobileSelectSameDay(week, $prevDay);
        // instantly go to first non-placeholder week
        $days().css({
          'transform': 'translateX(-100%)',
          'transition': 'all 0s'
        });
      }, weekTransition);
      // reset transition
      _.delay(function () {
        $days().css('transition', '');
      }, weekTransition + 10);
    } else {
      mobileSelectSameDay(week, $prevDay);
      mobileGoToWeek(week);
    }
  }

  function mobileHandleMonthYearChange(dayIndex) {
    // go to the first week of the month and click the day we want
    week = 1;
    $days().css('transform', 'translateX(-100%)').find('.week:eq(1)').find('.day:eq(' + dayIndex + ')').click();
  }

  function checkContentWidth() {
    if (Utils.isMobile()) {
      $clndrGrid.find('.days').removeClass('no-transform');
    } else {
      $clndrGrid.find('.days').addClass('no-transform');
    }
  }

  $clndrGrid.swipe({
    swipe: function swipe(event, direction) {
      if (direction === 'left' && Utils.isMobile()) {
        mobileChangeWeek('next');
      } else if (direction === 'right') {
        mobileChangeWeek('prev' && Utils.isMobile());
      }
    }
  });
  // END MOBILE STUFF

  $monthSelect.on('change', function (e) {
    handleMonthYearChange($(this));
  });

  $yearSelect.on('change', function (e) {
    handleMonthYearChange($(this));
  });

  $win.on('resize', _.debounce(checkContentWidth, 200));
  checkContentWidth();

  // for mobile sliding into adjacent months
  placeAdjacentWeeks(calendar);

  setCalToToday();
});