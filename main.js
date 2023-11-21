$(window).on('load', function () {
  // 이미지 로드 후에 Isotope.js 초기화
  var $grid = $(".grid").isotope({
    masonry: {
      columnWidth: 220,
      gutter: 50
    },
    itemSelector: '.item',
    getSortData: {
      name: '.name',
      year: '.year',
      duration: '.duration parseInt',
      level: '.level parseInt',
      category: '[data-category]',
    }
  });
  var $gridkpt = $(".grid-kpt").isotope({
    masonry: {
      columnWidth: 100,
      gutter: 50
    },
    itemSelector: '.kpt',
    getSortData: {
      date: function( itemElem ) {
        var weight = $( itemElem ).find('.date').text();
        return parseFloat( weight.replace( /[\-(\)]/g, '') );
      },
      category: '[data-category]',
    }
  });

  // bind filter button click
  $('#filters').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({
      filter: filterValue
    });
    $gridkpt.isotope({
      filter: filterValue
    });
  });

  // "original order" 버튼 클릭 시
  $('.original-order').on('click', function () {
    $grid.isotope({
      sortBy: 'original-order',
      sortAscending: true // 오름차순으로 정렬
    });
  });

  // 다른 정렬 버튼 클릭 시
  $('#sorts').on('click', 'button:not(.original-order)', function () {
    var sortByValue = $(this).attr('data-sort-by');
    $grid.isotope({
      sortBy: sortByValue,
      sortAscending: false // 내림차순으로 정렬
    });
    $gridkpt.isotope({
      sortBy: sortByValue,
      sortAscending: false // 내림차순으로 정렬
    });
  });

  $('#sorts').on('click', 'button.old', function () {
    console.log('ok');
    var sortByValue = $(this).attr('data-sort-by');
    $gridkpt.isotope({
      sortBy: sortByValue,
      sortAscending: true // 내림차순으로 정렬
    });
  });

  // change is-checked class on buttons
  $('.button-group').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });
});

$(document).ready(function() {
  $('.kpt.keep').hover(
    function() {
      $('body').css('background-color', '#B89CE2');
    },
    function() {
      $('body').css('background-color', '');
    }
  );
  $('.kpt.problem').hover(
    function() {
      $('body').css('background-color', '#70D0E2');
    },
    function() {
      $('body').css('background-color', '');
    }
  );
  $('.kpt.try').hover(
    function() {
      $('body').css('background-color', '#F6673B');
    },
    function() {
      $('body').css('background-color', '');
    }
  );
});