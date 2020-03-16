$(document).ready(function () {

// HAMBURGER MENU
  $('.burger').click(function () {
    $('.overlay').addClass('overlayshow');
    $('.menu').addClass('menushow');
  });


// CLOSE HAMBURGER MENU

  $('.close').click(function () {
    $('.overlay').removeClass('overlayshow');
    $('.menu').removeClass('menushow');

  });

// CLOSE OVERLAY

  $('.overlay').click(function () {
    $(this).removeClass('overlayshow');
    $('.menu').removeClass('menushow');

  });

// MODAL OPEN/CLOSE
  $('.modal').modal();

});


// RENDER DARK/LIGHT BACKGROUD
// CURRENTLY DEACTIVATED
function render() {
  $('.hide-light').toggleClass('active');
  $('.hide-dark').toggleClass('active');
  $('body').toggleClass('dark');
  $('.container').toggleClass('dark');
  $('.btn1').toggleClass('dark');
  $('.correct').toggleClass('dark');
  $('.wrong').toggleClass('dark');
  $('.menu').toggleClass('dark');
  $('.menu-items > a').toggleClass('dark');
  $('.burger > div').toggleClass('dark');
}