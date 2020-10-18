$(function(){
  $('li.has-submenu > a').on('click', function(e){
    e.preventDefault();
    $('li.has-submenu.active').removeClass('active');
    $(this).parent().toggleClass('active');
  })
});