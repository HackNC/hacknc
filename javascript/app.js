$('.app tr').click(function(e) {
	$(this).find('.slider').slideToggle()
	if ($(this).find('td + td').attr('style')) {
		$(this).find('td + td').removeAttr('style');
	} else {
		$(this).find('td + td').css('background-color', 'rgba(0,0,0,0.05)');
	}
	return false;
});