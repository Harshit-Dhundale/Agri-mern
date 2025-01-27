import $ from 'jquery';

$(document).on('change', '.div-toggle', function () {
  const target = $(this).data('target');
  const show = $("option:selected", this).data('show');
  $(target).children().addClass('hide');
  $(show).removeClass('hide');
});

$(document).ready(function () {
  $('.div-toggle').trigger('change');
});
