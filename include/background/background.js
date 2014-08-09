// function setBackground(image) {
// 	var size = '320';
// 	var width = $(window).width();
// 	if (width <= 640) {
// 		size = '640';
// 	} else if (width <= 800) {
// 		size = '800';
// 	} else if (width <= 1024) {
// 		size = '1024';
// 	} else if (width <= 1600) {
// 		size = '1600';
// 	} else {
// 		size = '2048';
// 	}
// 	$('.background').css({'background-image': 'url(./images/backgrounds/' + image + '_' + size + '.jpg)'});
// }

// function selectRandomBackground() {
// 	var numImages = 11;
// 	return Math.floor(Math.random() * (numImages + 1));
// }

// setBackground(selectRandomBackground());