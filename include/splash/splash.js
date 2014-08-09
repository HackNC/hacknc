// create a mask over the header with the splash.css style
var response;
$.ajax({ type: "GET",   
     url: "include/splash/splash.html",   
     async: false,
     success : function(text)
     {
         response= text;
     }
});
$('body').append(response).queue(function(next) {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		// mobile
		setLogoSize();
		$('.splash > .container').css('display', 'table-cell');
		$('.splash').delay(1000).fadeOut(500);
	} else {
		// everything else
		setLogoSize();
		window.addEventListener('resize', function(event) {
			setLogoSize();
		});
		$('.splash > .container').css('display', 'table-cell');
		$('.splash > .container').addClass('zoomInEntrance').delay(1900).queue(function(next){
			$(this).removeClass('zoomInEntrance');
			$(this).addClass('zoomInExit').delay(400).parent().fadeOut();
			next();
		});
	}
	next();
});

// loading sequence
function setLogoSize() {
	var height = $(window).height();
	$('.splash .container').css('height', height);
	$('.splash .container').css('max-height', height);
}