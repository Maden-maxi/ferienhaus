var Wow = new WOW({
	mobile: false
}); 
Wow.init();
$(function() {
	$("[href='#contacts']").html("<i class='fa fa-envelope'></i><i class='fa fa-phone'></i><i class='fa fa-caret-down'></i>");
	$('#navbar').on('click', function(event) {
		event.preventDefault();
		/* Act on the event */
		$(this).toggleClass('nav__navbar_change');
		$(".nav ul").first().slideToggle(500);
	});
	if ($(window).width() <= 1034) {
		$(".nav ul li a").on('click', function(event) {
			event.preventDefault();
			//console.log(event);
			//console.log(event.target.nextElementSibling);
			/* Act on the event */
			if (!event.target.nextElementSibling) {
				$(".nav ul").first().slideUp(400);
				$("#navbar").removeClass('nav__navbar_change');
			}
		});
	}
	$(window).resize(function(){
		if ($(window).width() > 500) {
			$('.nav ul').removeAttr('style');
		}
	});
	//Плавный скролл по якорям
	$('a[href^="#"]').click(function(){
		elementClick = $(this).attr("href");
		destination = $(elementClick).offset().top;
		var minusTop = 0;
		switch(elementClick){
			case "#ferienhaus": minusTop = 400; break;
			case "#partyscheune": minusTop = 400; break;
			case "#gartenanlage": minusTop = 400; break;
			case "#map": minusTop = 350; break;
			case "#anfahrt_und_ueber_uns": minusTop = 60; break;
			case "#contacts": minusTop = 60; break;
		}


			$('html, body').animate( {scrollTop: destination-minusTop }, 1000 );
		return false;
		
	});
	//fix-top-menu
	$(window).on('scroll', function(event) {
		event.preventDefault();
		/* Act on the event */
		var wScroll = $(this).scrollTop();

		if(wScroll > 700)
			$(".nav").addClass("fixed");
		else
			$(".nav").removeClass("fixed");

		if(wScroll > 800)
			$(".nav").addClass("fixed_more");
		else
			$(".nav").removeClass("fixed_more");
		//button to top
		if(wScroll > 1000 && $(window).width() > 600)
			$(".btn__to-top").fadeIn('slow');
		else
			$(".btn__to-top").fadeOut('slow');
	});
});