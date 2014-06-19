////////////////// run this after the page has been built //////////////////
setHeaderSize();
window.addEventListener("resize", function(event) {
	setHeaderSize();
});
startTime();

////////////////// easter egg //////////////////
if (navigator.userAgent.indexOf("Chrome") != -1) {
	console.log("%c\n _    _               _      _   _   _____ \n| |  | |             | |    | \\ | | / ____|\n| |__| |  __ _   ___ | | __ |  \\| || |     \n|  __  | / _` | / __|| |/ / | . ` || |     \n| |  | || (_| || (__ |   <  | |\\  || |____ \n|_|  |_| \\__,_| \\___||_|\\_\\ |_| \\_| \\_____|\n                                           \n         WELCOME TO HACKER COUNTRY         ", "background-color:black; color:green;font-size:1.5em;");
} else {
	console.log("\n _    _               _      _   _   _____ \n| |  | |             | |    | \\ | | / ____|\n| |__| |  __ _   ___ | | __ |  \\| || |     \n|  __  | / _` | / __|| |/ / | . ` || |     \n| |  | || (_| || (__ |   <  | |\\  || |____ \n|_|  |_| \\__,_| \\___||_|\\_\\ |_| \\_| \\_____|\n                                           \n         WELCOME TO HACKER COUNTRY         ");
}

////////////////// function definitions //////////////////
$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			$target = $(this.hash);
			$target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
				$('html,body').animate({
			        // subtract navbar height;
			        scrollTop: ($target.offset().top-$('.nav table').height())
			    }, 500);
				$target.fadeOut(100).fadeIn(500);
				return false;
			}
		}
	});
});
var poweredOn = true;
var animatingNow = false;
$(function() {
	$('.power').click(function() {
		if (!animatingNow) {
			animatingNow = true;
			if (poweredOn) {
				poweredOn = false;
				$('.everything').fadeOut(400, function() {
					$('.standby').fadeIn();
					animatingNow = false;
				});
			} else {
				$('.standby').fadeOut(200, function() {
					$('.everything').fadeIn();
					poweredOn = true;
					animatingNow = false;
				});	
			}
		}
	})
})
function setHeaderSize() {
	$("header").css("height", $(window).height());
	$(".background").css("height", $(window).height());
	$(".background::before").css("height", $(window).height());
}
function startTime() {
	var today=new Date();
	var day=today.getDay();
	var month=today.getMonth();
	var date=today.getDate();
	var h=today.getHours();
	var m=today.getMinutes();
	var amPm = getAmPm(h);
	switch(day) {
		case 0:
			day = "Sunday";
			break;
		case 1:
			day = "Monday";
			break;
		case 2:
			day = "Tuesday";
			break;
		case 3:
			day = "Wednesday";
			break;
		case 4:
			day = "Thursday";
			break;
		case 5:
			day = "Friday";
			break;
		case 6:
			day = "Saturday";
			break;
		default:
			day = "";
			break;

	}
	switch(month) {
		case 0:
			month = "January";
			break;
		case 1:
			month = "February";
			break;
		case 2:
			month = "March";
			break;
		case 3:
			month = "April";
			break;
		case 4:
			month = "May";
			break;
		case 5:
			month = "June";
			break;
		case 6:
			month = "July";
			break;
		case 7:
			month = "August";
			break;
		case 6:
			month = "September";
			break;
		case 6:
			month = "October";
			break;
		case 6:
			month = "November";
			break;
		case 6:
			month = "December";
			break;
		default:
			month = "";
			break;

	}
	h = fixHours(h);
	m = fixMinutes(m);
	document.getElementById('clock').innerHTML = day + " " + month + " " + date + ", " + h + ":" + m + " " + amPm;
	var t = setTimeout(function(){
		startTime()
	},1000);
}
function getAmPm(h) {
	if (h >= 12) {
		return "PM";
	} else {
		return "AM";
	}
}
function fixHours(h) {
	if (h > 12) {
		return h - 12;
	} else if (h == 0) {
		return 12;
	} else {
		return h;
	}
}
function fixMinutes(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}