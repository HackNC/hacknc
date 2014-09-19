function setHeaderSize() {
	var height = $(window).height();
	$('footer').css('margin-top', height);
	$('header').css('height', height);
	
}
////////////////// run this after the page has been built //////////////////
setHeaderSize();
window.addEventListener('resize', function(event) {
	setHeaderSize();
});

////////////////// easter egg //////////////////
if (navigator.userAgent.indexOf('Chrome') != -1) {
	console.log('%c\n _    _               _      _   _   _____ \n| |  | |             | |    | \\ | | / ____|\n| |__| |  __ _   ___ | | __ |  \\| || |     \n|  __  | / _` | / __|| |/ / | . ` || |     \n| |  | || (_| || (__ |   <  | |\\  || |____ \n|_|  |_| \\__,_| \\___||_|\\_\\ |_| \\_| \\_____|\n                                           \n         WELCOME TO HACKER COUNTRY         ', 'background-color:black; color:green;font-size:1.5em;');
} else {
	console.log('\n _    _               _      _   _   _____ \n| |  | |             | |    | \\ | | / ____|\n| |__| |  __ _   ___ | | __ |  \\| || |     \n|  __  | / _` | / __|| |/ / | . ` || |     \n| |  | || (_| || (__ |   <  | |\\  || |____ \n|_|  |_| \\__,_| \\___||_|\\_\\ |_| \\_| \\_____|\n                                           \n         WELCOME TO HACKER COUNTRY         ');
}

document.cookie = "WhatIsACookie=lol";

////////////////// function definitions //////////////////
// scrolling on anchor clicks
$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			$target = $(this.hash);
			$target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
				$('html,body').animate({
			        // subtract toolbar height;
			        scrollTop: ($target.offset().top-$('.toolbar > table').height())
			    }, 500);
				$target.fadeOut(100).fadeIn(500);
				return false;
			}
		}
	});
});
////////////////// Autocomplete //////////////////
$( "#entry_1965639857" ).autocomplete({
	source: schools
});
