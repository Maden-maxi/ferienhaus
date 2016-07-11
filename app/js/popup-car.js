(function($) {
    //rooms_nav
    $('.rooms-nav__link').each(function(index, el) {
        var self = $('.rooms-nav__link');
        if ( el == location.href ) {
            self.eq(index).addClass('rooms-nav__link_active');
        }
    });
    //popup
    $('.btn_reserve').magnificPopup({
        type: 'inline',
        midClick:true,
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
    $('.btn_popupCarousel, .nav ul li:first ul li a').magnificPopup({
        type: 'inline',
        midClick:true,
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
    $('.btn_popupCarouselLands').magnificPopup({
        type: 'inline',
        midClick:true,
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
    // This is the connector function.
    // It connects one item from the navigation carousel to one item from the
    // stage carousel.
    // The default behaviour is, to connect items with the same index from both
    // carousels. This might _not_ work with circular carousels!
    var popupWrapper = $('.popup-wrapper');
    popupWrapper.css({
        height: $(window).height()
    });
    //scrollbar
    popupWrapper.mCustomScrollbar({
        theme: 'sq-bar',
        scrollInertia: 100
    });
    
        $('.rc').on('click', function(event) {
            event.preventDefault();
            /* Act on the event */
            if($(window).width() > 768){
                $('.mCSB_container').animate({top: '-100%'}, 600);
                $('.mCSB_dragger').animate({top: '55%'}, 600);
                console.log($(window).width());
            }else{
                document.getElementById('roomContent').scrollIntoView();
                console.log($(window).width());
            }
        });
/*
    popupWrapper.jScrollPane({
        autoReinitialise: true
    });
    */
    var connector = function(itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };
    $(function() {
        // Setup the carousels. Adjust the options for both carousels here.
        var carouselStage      = $('.carousel-stage').jcarousel();
        var carouselNavigation = $('.carousel-navigation').jcarousel();
        var carouselDescripttionImg = $('.description-block').jcarousel();//add description change

        // We loop through the items of the navigation carousel and set it up
        // as a control for an item from the stage carousel.
        /*
        console.log(carouselStage);
        console.log(carouselNavigation);
        console.log(carouselDescripttionImg);
        */
        carouselNavigation.each(function(index, el) {
            //console.log($(this).eq(index),index);
            console.log('in nav ');
            $(this).jcarousel('items').each(function() {
                console.log('in items');
                var item = $(this);
                console.log(item.index())
                var desc = carouselDescripttionImg.eq(index).jcarousel('items');
                // This is where we actually connect to items.
                var target = connector(item, carouselStage.eq(index));
                item
                    .on('jcarouselcontrol:active', function() {
                        carouselNavigation.jcarousel('scrollIntoView', this);
                        //desc.eq(item.attr('data-id')).addClass('active animated fadeIn');
                        desc.eq(item.index()).addClass('active animated fadeIn');
                        console.log(item.index());
                        item.addClass('active');
                        console.log('in active')
                    })
                    .on('jcarouselcontrol:inactive', function() {
                            //desc.eq(item.attr('data-id')).removeClass('active animated fadeIn');
                            desc.eq(item.index()).removeClass('active animated fadeIn');
                            item.removeClass('active');
                            console.log('in inactive')
                    })
                    .jcarouselControl({
                        target: target,
                        carousel: carouselStage.eq(index)
                    });
            });
            /*
            $(this).jcarousel('items').eq(1).removeClass('active');
            $(this).jcarousel('items').eq(0).addClass('active');
            carouselDescripttionImg.eq(index).jcarousel('items').eq(1).removeClass('active animated fadeIn');
            carouselDescripttionImg.eq(index).jcarousel('items').eq(0).addClass('active animated fadeIn');
            */
        });
        

        // Setup controls for the stage carousel
        $('.prev-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.next-stage')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });

        // Setup controls for the navigation carousel
        $('.prev-navigation')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '-=1'
            });

        $('.next-navigation')
            .on('jcarouselcontrol:inactive', function() {
                $(this).addClass('inactive');
            })
            .on('jcarouselcontrol:active', function() {
                $(this).removeClass('inactive');
            })
            .jcarouselControl({
                target: '+=1'
            });
    });
})(jQuery);
