$(function() {
  /***/
  var slides = $(".carousel").children(".items"); // Получаем массив всех слайдов
  var slidesQuantity = slides.length;
  var cheki = slidesQuantity-1;

  for (var i = 0; i < slides.length; i++) {
    if (i==0) {
      $(".dots").append("<div data-number='"+i+"' class='dot active'></div>");
    } else {
      $(".dots").append("<div data-number='"+i+"' class='dot'></div>");
    }
  }

  var offset=0;
  slidesQuantity=0;
  var dots = $(".dots").children(".dot");
/*
  $('.dots .dot').click(function(){
    $(".dots .active").removeClass("active");
    $(this).addClass("active");
    slidesQuantity = $(this).index();
    $('.items').removeClass('right-pos');
    $('.items').removeClass('left-pos');
    $('.items').removeClass('main-pos');
    $( ".items" ).each(function( index ) {
      $('.items').eq(index).removeClass('main-pos');
      $('.items').eq(index).removeClass('left-pos');
      $('.items').eq(index).removeClass('right-pos');
      console.log( index + ": " + $( this ).text() );
    });
    if(slidesQuantity == 0){
      $('.items').eq(slidesQuantity).addClass('main-pos');
      $('.items').eq(dots.length-1).addClass('left-pos');
      $('.items').eq(slidesQuantity+1).addClass('right-pos');
    }else if (slidesQuantity == dots.length-1) {
      $('.items').eq(slidesQuantity).addClass('main-pos');
      $('.items').eq(slidesQuantity-1).addClass('left-pos');
      $('.items').eq(0).addClass('right-pos');
    }else{
      $('.items').eq(slidesQuantity).addClass('main-pos');
      $('.items').eq(slidesQuantity-1).addClass('left-pos');
      $('.items').eq(slidesQuantity+1).addClass('right-pos');
    }
    console.log(slidesQuantity);
    console.log(dots.length);
    //offset = i * width;
    //$(".carousel .items").css("transform","translate3d(-"+offset+"px, 0px, 0px)"); // Смещаем блок со слайдами к следующему
  });
  */
  /****/
//slideshow style interval
// var autoSwap = setInterval( swap,3500);

//pause slideshow and reinstantiate on mouseout
/*$('ul, span').hover(
  function () {
    clearInterval(autoSwap);
}, 
  function () {
   autoSwap = setInterval( swap,3500);
});*/

//global variables
var items = [];
var startItem = 1;
var position = 0;
var itemCount = $('.carousel li.items').length;
var leftpos = itemCount;
var resetCount = itemCount;

//unused: gather text inside items class
$('li.items').each(function(index) {
    items[index] = $(this).text();
});

//swap images function
function swap(action) {
  var direction = action;
  
  //moving carousel backwards
  if(direction == 'counter-clockwise') {
    var leftitem = $('.left-pos').attr('id') - 1;
    if(leftitem == 0) {
      leftitem = itemCount;
    }
    
    $('.right-pos').removeClass('right-pos').addClass('back-pos');
    $('.main-pos').removeClass('main-pos').addClass('right-pos');
    $('.left-pos').removeClass('left-pos').addClass('main-pos');
    $('#'+leftitem+'').removeClass('back-pos').addClass('left-pos');
    $(".dots .active").removeClass("active");
      $(dots[slidesQuantity--]).addClass("active");
      if(slidesQuantity <= 0){
        slidesQuantity= slides.length;
      }
    
    startItem--;
    if(startItem <= 0) {
      startItem = itemCount;
    }
  }
  
  //moving carousel forward
  if(direction == 'clockwise' || direction == '' || direction == null ) {
    $(".dots .active").removeClass("active");
      $(dots[slidesQuantity++]).addClass("active");
      if(slidesQuantity >= slides.length){
        slidesQuantity=0;
      }
    function pos(positionvalue) {
      if(positionvalue != 'leftposition') {
        //increment image list id
        position++;
        
        //if final result is greater than image count, reset position.
        if((startItem+position) > resetCount) {
          position = 1-startItem;
        }
      }
    
      //setting the left positioned item
      if(positionvalue == 'leftposition') {
        //left positioned image should always be one left than main positioned image.
        position = startItem - 1;
      
        //reset last image in list to left position if first image is in main position
        if(position < 1) {
          position = itemCount;
        }
      }
   
      return position;
    }  
  
   $('#'+ startItem +'').removeClass('main-pos').addClass('left-pos');
   $('#'+ (startItem+pos()) +'').removeClass('right-pos').addClass('main-pos');
   $('#'+ (startItem+pos()) +'').removeClass('back-pos').addClass('right-pos');
   $('#'+ pos('leftposition') +'').removeClass('left-pos').addClass('back-pos');
    startItem++;
    position=0;
    if(startItem > itemCount) {
      startItem = 1;
    }
  }
}

  //next button click function
  $('#next').click(function() {
    swap('clockwise');
    //console.log($('.main-pos').attr('id'))
  });

  //prev button click function
  $('#prev').click(function() {
    swap('counter-clockwise');
    //console.log($('.main-pos').attr('id'));
  });

  //if any visible items are clicked
  $('li').click(function() {
    if($(this).attr('class') == 'items left-pos') {
       swap('counter-clockwise'); 
    }
    else {
      swap('clockwise'); 
    }
  });
});