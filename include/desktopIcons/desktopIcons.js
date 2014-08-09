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