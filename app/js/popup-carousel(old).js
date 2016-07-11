(function($) {
    //popup
    $('.btn_reserve').magnificPopup({
        type: 'inline',
        midClick:true,
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
    $('.btn_popupCarousel').magnificPopup({
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
        theme: 'sq-bar'
    });
    $('.rc').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        $('.mCSB_container').animate({top: '-100%'}, 600);
        $('.mCSB_dragger').animate({top: '55%'}, 600);
        //document.getElementById('roomContent').scrollIntoView()
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
        //2
        var carouselStage1      = $('.carousel-stage').jcarousel().eq(1);
        var carouselNavigation1 = $('.carousel-navigation').jcarousel().eq(1);
        var carouselDescripttionImg1 = $('.description-block').jcarousel().eq(1);

        // We loop through the items of the navigation carousel and set it up
        // as a control for an item from the stage carousel.
        carouselNavigation.jcarousel('items').each(function() {
            var item = $(this);
            var desc = carouselDescripttionImg.jcarousel('items');
            //console.log(item);
            // This is where we actually connect to items.
            var target = connector(item, carouselStage);
            //console.log(target);
            item
                .on('jcarouselcontrol:active', function() {
                    carouselNavigation.jcarousel('scrollIntoView', this);
                    item.addClass('active');
                    desc.eq(item.attr('data-id')).addClass('active animated fadeIn');
                })
                .on('jcarouselcontrol:inactive', function() {
                    item.removeClass('active');
                    desc.eq(item.attr('data-id')).removeClass('active animated fadeIn');
                })
                .jcarouselControl({
                    target: target,
                    carousel: carouselStage
                });
        });
        //carousel without content room
        carouselNavigation1.jcarousel('items').each(function() {
            var item = $(this);
            var desc = carouselDescripttionImg1.jcarousel('items');
            //console.log(item);
            // This is where we actually connect to items.
            var target = connector(item, carouselStage1);
            //console.log(target);
            item
                .on('jcarouselcontrol:active', function() {
                    carouselNavigation1.jcarousel('scrollIntoView', this);
                    item.addClass('active');
                    desc.eq(item.attr('data-id')).addClass('active animated fadeIn');
                })
                .on('jcarouselcontrol:inactive', function() {
                    item.removeClass('active');
                    desc.eq(item.attr('data-id')).removeClass('active animated fadeIn');
                })
                .jcarouselControl({
                    target: target,
                    carousel: carouselStage1
                });
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
