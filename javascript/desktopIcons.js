function desktopIcons_setDesktopSize() {
	var height = $(window).height();
	$('.desktopIcons').css('height', height - 
		parseInt($('.desktopIcons').css('padding-top')) - 
		parseInt($('.desktopIcons').css('padding-bottom')));
}

desktopIcons_setDesktopSize();
window.addEventListener('resize', function(event) {
	desktopIcons_setDesktopSize();
});

$('#foodLink').click(function() {
	if ($('html').hasClass('mobile')) {
		document.location = "./menu.html";
	} else {
		if ($('#food').is(':visible')) {
			$('#food').hide();
		} else {
			$('#food').show();
		}
	}
});

$('#mentorsLink').click(function() {
	if ($('html').hasClass('mobile')) {
		document.location = "./mentors.html";
	} else {
		if ($('#mentors').is(':visible')) {
			$('#mentors').hide();
		} else {
			$('#mentors').show();
		}
	}
});

$('#scheduleLink').click(function() {
	if ($('html').hasClass('mobile')) {
		document.location = "./schedule.html";
	} else {
		if ($('#schedule').is(':visible')) {
			$('#schedule').hide();
		} else {
			$('#schedule').show();
		}
	}
});

$('#prizesLink').click(function() {
	if ($('html').hasClass('mobile')) {
		document.location = "./prizes.html";
	} else {
		if ($('#prizes').is(':visible')) {
			$('#prizes').hide();
		} else {
			$('#prizes').show();
		}
	}
});

$('#mapLink').click(function() {
	if ($('html').hasClass('mobile')) {
		document.location = "./maps.html";
	} else {
		if ($('#map').is(':visible')) {
			$('#map').hide();
		} else {
			$('#map').show();
		}
	}
});

$('#wifiLink').click(function() {
	if ($('html').hasClass('mobile')) {
		document.location = "./wifi.html";
	} else {
		if ($('#wifi').is(':visible')) {
			$('#wifi').hide();
		} else {
			$('#wifi').show();
		}
	}
});

$('#chatLink').click(function() {
	if ($('html').hasClass('mobile')) {
		document.location = "http://webchat.freenode.net?channels=%23HackNC&uio=OT10cnVlJjExPTIyNge7";
	} else {
		if ($('#chat').is(':visible')) {
			$('#chat').hide();
		} else {
			$('#chat').show();
		}
	}
});

$('#terminalLink').click(function() {
	if ($('html').hasClass('mobile')) {
		document.location = "http://hackertyper.net";
	} else {
		if ($('#terminal').is(':visible')) {
			$('#terminal').hide();
		} else {
			$('#terminal').show();
		}
	}
});

$('#codeshipLink').click(function() {
	if ($('html').hasClass('mobile')) {
		document.location = "./codeship.html";
	} else {
		if ($('#codeship').is(':visible')) {
			$('#codeship').hide();
		} else {
			$('#codeship').show();
		}
	}
});

// close
$('.popup').click(function(e) {
	if (e.target === this) {
		if ($(this).is(':visible')) {
			$(this).hide();
		}
	}
});

$('.popup .closeButton').click(function(e) {
	if ($(this).closest('.popup').is(':visible')) {
		$(this).closest('.popup').hide();
	}
});