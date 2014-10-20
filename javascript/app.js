$(".app tr").click(function( e ) {
	var target = e.target;
	if ( target.nodeName == 'A' ) {
		var hashIndex = target.href.indexOf( '#' );
		if ( hashIndex !== -1 ) {
			e.preventDefault();
			slide(this);
		} else return true;
	} else {
		slide(this);
	}
});

function slide( element ) {
	$(element).find('.slider').slideToggle();
	if ($(element).find('td + td').attr('style')) {
		$(element).find('td + td').removeAttr('style');
	} else {
		$(element).find('td + td').css('background-color', 'rgba(0,0,0,0.05)');
	}
	return false;
}
