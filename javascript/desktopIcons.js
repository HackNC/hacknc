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

$('#pizzaLink').click(function() {
	if ($('#pizza').is(':visible')) {
		$('#pizza').hide();
	} else {
		$('#pizza').show();
	}
});

$('#mentorsLink').click(function() {
	if ($('#mentors').is(':visible')) {
		$('#mentors').hide();
	} else {
		$('#mentors').show();
	}
});

$('#scheduleLink').click(function() {
	if ($('#schedule').is(':visible')) {
		$('#schedule').hide();
	} else {
		$('#schedule').show();
	}
});

$('#prizesLink').click(function() {
	if ($('#prizes').is(':visible')) {
		$('#prizes').hide();
	} else {
		$('#prizes').show();
	}
});

$('#mapLink').click(function() {
	if ($('#map').is(':visible')) {
		$('#map').hide();
		$('#map').html('');
	} else {
		$('#map').show();
		$('#map > div > div').html('<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3231.5102169434963!2d-79.0533016!3d35.91000950000001!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89acc2e6270ae415%3A0xc63ad7541cb9e8a1!2sSitterson+Hall%2C+University+of+North+Carolina+at+Chapel+Hill%2C+Chapel+Hill%2C+NC+27514!5e0!3m2!1sen!2sus!4v1407797241270" width="380" height="300" frameborder="0" style="border:0"></iframe>');
	}
});

$('#wifiLink').click(function() {
	if ($('#wifi').is(':visible')) {
		$('#wifi').hide();
	} else {
		$('#wifi').show();
	}
});

$('.popup').click(function(e) {
	if (e.target === this) {
		if ($(this).is(':visible')) {
			$(this).hide();
		}
	}
});

