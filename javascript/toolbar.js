var Toolbar = function(menuFadeTime, numberOfBatteryImageFrames, arbitraryStartDate, endDate) {		// constructor for Toolbar object
	this.menu = new Menu(menuFadeTime);
	this.time = new Time();
	this.battery = new Battery(numberOfBatteryImageFrames, arbitraryStartDate, endDate);
}

Toolbar.prototype = {
	menu: null,
	time: null,
	battery: null
}

var Menu = function(fadeTime) {			// constructor for Menu object
	this.fadeTime = fadeTime;
}

Menu.prototype = {

	fadeTime: null,

	openMenu: function(menu) {
		menu.fadeIn(this.fadeTime);
		menu.css('top', $('.toolbar table').height());
		if (menu.offset().left + menu.width() > $(window).width()) {
			menu.css('left', $(window).width()- (menu.offset().left + menu.width()));
		}
	}, 

	closeMenu: function(menu) {
		menu.fadeOut(this.fadeTime);
	}, 

	attachActionHandlers: function(toolbar) {
		//display notification center when icon is clicked
		var isNotificationCenterVisible = false;
		$('.toolbar #notificationCenter').click( function() {
			if (isNotificationCenterVisible) {
				$('.toolbar .notificationCenter').animate({ right: -250 },'slow', function() {
					$(this).hide();
				});
			}
			else {
				$('.notificationCenter').css('top', $('.toolbar table').height());
				$('.notificationCenter').show().animate({ right: 0 },'slow');

			}
			isNotificationCenterVisible = !isNotificationCenterVisible;
		});

		//////////////////// Toolbar javascript ///////////////////

		// Menubar clicks
		var lastOpen;
		$('.toolbar ul.topmenu > li > a').click(function() {
			var button = $(this).parent();
			var menu = $(this).next('ul.submenu');
			if(!menu.length) {
				return;
			}
			if (lastOpen) {
				// if a menu is open
				if (lastOpen.hasClass('open') && button.hasClass('open')) {
					// if this is the same menu that was just opened, close it
					toolbar.menu.closeMenu(menu);
					button.removeClass('open');
					lastOpen = null;
				} else {
					// if this is a different menu than what is already open, close the old and open this
					toolbar.menu.closeMenu(lastOpen.find('ul.submenu'));
					lastOpen.removeClass('open');
					toolbar.menu.openMenu(menu);
					button.addClass('open');
					lastOpen = button;
				}
			} else {
				// else no menu is open, open the menu that was clicked
				toolbar.menu.openMenu(menu);
				button.addClass('open');
				lastOpen = button;
			}
			return false;
		});

		// Menubar hover.  Hover is enabled after a menu button is clicked.
		$('.toolbar ul.topmenu > li').hover(
			// on mouse enter
			function() {
				var button = $(this);
				var menu = $(this).find('ul.submenu');
				if (!menu.length) {
					return;
				}
				if (lastOpen && !button.hasClass('open')) {
					// if a menu is open but it's not this menu, open this and close the old
					toolbar.menu.closeMenu(lastOpen.find('ul.submenu'));
					lastOpen.removeClass('open');
					toolbar.menu.openMenu(menu);
					button.addClass('open');
					lastOpen = button;
				}
			}, 
			// on mouse exit
			function() {
				// do nothing
			});

		// Submenu clicks
		$('.toolbar ul.topmenu > li').each(function() {
			var button = $(this);
			var menu = button.find('ul.submenu');
			if (!menu.length) {
				return;
			}
			$(this).find('ul.submenu > li > a').click(function() {
				menu.fadeOut(toolbar.menu.fadeTime);
				button.removeClass('open');
				lastOpen = null;
			});
		});

		// Submenu hover/highlight
		$('.toolbar ul.submenu li a').hover(function() {
			$(this).addClass('open');
		}, function() {
			$(this).removeClass('open');
		});

		// Submenu closes on page click
		$('body:not(.toolbar)').click(function() {
			if (lastOpen) {
				// if a menu is open and the click is not on a new menu
				toolbar.menu.closeMenu(lastOpen.find('ul.submenu'));
				lastOpen.removeClass('open');
				lastOpen = null;
			}
		});

		// power button
		var poweredOn = true;
		var animatingNow = false;
		$(function() {
			$('.power').click(function() {
				if (!animatingNow) {
					animatingNow = true;
					if (poweredOn) {
						poweredOn = false;
						$('.standby').fadeIn(function() {animatingNow = false});
					} else {
						poweredOn = true;
						$('.standby').fadeOut(function() {animatingNow = false});
					}
				}
			})
		});

		// scrolling on menu item anchor clicks
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

		$('#osInfoLink').click(function() {
			if ($('.osInfo').is(':visible')) {
				$('.osInfo').hide();
			} else {
				$('.osInfo').show();
			}
		});

		$('.osInfo').click(function(e) {
			if (e.target === this) {
				if ($(this).is(':visible')) {
					$(this).hide();
				}
			}
		});

		var isDoge = false;
		$('#dogeify').click(function() {
			if (isDoge) {
				$('body').css('font-family', '');
				$('.toolbar').css('font-family', '');
				$('#dogeify').delay(100).queue(function(next) {
					$(this).text('Doge');
					next();
				});
			} else {
				$('body').css('font-family', '\'Comic Sans MS\', \'Comic Sans\', \'Chalkboard\', \'Helvetica\', \'Arial\', sans-serif');
				$('.toolbar').css('font-family', '\'Comic Sans MS\', \'Comic Sans\', \'Chalkboard\', \'Helvetica\', \'Arial\', sans-serif');
				$('#dogeify').delay(100).queue(function(next) {
					$(this).text('Normal');
					next();
				});
			}
			isDoge = !isDoge;
		});
	}
}

var Time = function() {				// constructor for Time object

}

Time.prototype = {

	startTime: function() {
		var today = new Date();
		var month = this.fixMonth(today.getMonth());
		var date = today.getDate();
		var h = this.fixHours(today.getHours());
		var m = this.fixMinutes(today.getMinutes());
		var amPm = this.getAmPm(today.getHours());
		
		$('.toolbar #clock').html(month + ' ' + date + ', ' + h + ':' + m + ' ' + amPm);
		var previousTime = today;
		var currentTime;
		window.setInterval( function() {
			currentTime = new Date();
			if (previousTime.getMinutes() != currentTime.getMinutes()) { 				// only do this work if the minutes have changed
				var minutes = Time.prototype.fixMinutes(currentTime.getMinutes());
				if (previousTime.getHours() == currentTime.getHours()) { 				// and if the hours haven't changed
					var oldTime = $('.toolbar #clock').html().split(':');
					var oldAmPM = oldTime[1].split(' ')[1];
					$('.toolbar #clock').html(oldTime[0] + ':' + minutes + ' ' + oldAmPM);
				} else {																// else ... update hours too
					var hours = Time.prototype.fixHours(currentTime.getHours());
					var amPm = Time.prototype.getAmPm(currentTime.getHours());
					if (previousTime.getDate() == currentTime.getDate()) {				// ...if the date hasn't changed
						var oldTime = $('.toolbar #clock').html().split(', ');
						$('.toolbar #clock').html(oldTime[0] + ', ' + hours + ':' + minutes + ' ' + amPm);
					} else {															// else ... update date too
						var date = currentTime.getDate();
						if (previousTime.getMonth() == currentTime.getMonth()) {		// ...if the month hasn't changed
							var oldTime = $('.toolbar #clock').html().split(' ');
							$('.toolbar #clock').html(oldTime[0] + ' ' + date + ', ' + hours + ':' + minutes + ' ' + amPm);
						} else {														// else update the month too. 
							var month = Time.prototype.fixMonth(currentTime.getMonth());
							$('.toolbar #clock').html(month + ' ' + date + ', ' + hours + ':' + minutes + ' ' + amPm);
							createCalendar();
						}
					}
				}
			}
			previousTime = currentTime;
		}, 1000); // call every second
	},


	fixMonth: function(month) {
		switch(month) {
			case 0:
				month = 'January';
				break;
			case 1:
				month = 'February';
				break;
			case 2:
				month = 'March';
				break;
			case 3:
				month = 'April';
				break;
			case 4:
				month = 'May';
				break;
			case 5:
				month = 'June';
				break;
			case 6:
				month = 'July';
				break;
			case 7:
				month = 'August';
				break;
			case 8:
				month = 'September';
				break;
			case 9:
				month = 'October';
				break;
			case 10:
				month = 'November';
				break;
			case 11:
				month = 'December';
				break;
			default:
				month = 'Caturday';
				break;
		}
		return month;
	},

	getAmPm: function(h) {
		if (h >= 12) {
			return 'PM';
		} else {
			return 'AM';
		}
	},

	fixHours: function(h) {
		if (h > 12) {
			return h - 12;
		} else if (h == 0) {
			return 12;
		} else {
			return h;
		}
	},

	fixMinutes: function(i) {
	    if (i < 10) {i = '0' + i};  // add zero in front of numbers < 10
	    return i;
	},

	createCalendar: function() {
		var today = new Date();
		var date = today.getDate();
		var month = today.getMonth() % 13; // there are thirteen moths flying around in the HackNC year.
		var year = today.getFullYear();
		var beginningOfMonth = new Date(year, month, 1, 0, 0, 0, 0);
		var daysInMonth = 0;
		switch (month) {
			case 0:
				month = 'January';
				daysInMonth = 31;
				break;
			case 1:
				month = 'February';
				daysInMonth = (year % 4 == 0 && year % 400 != 0) ? 29 : 28;
				break;
			case 2:
				month = 'March';
				daysInMonth = 31;
				break;
			case 3:
				month = 'April';
				daysInMonth = 30;
				break;
			case 4:
				month = 'May';
				daysInMonth = 31;
				break;
			case 5:
				month = 'June';
				daysInMonth = 30;
				break;
			case 6:
				month = 'July';
				daysInMonth = 31;
				break;
			case 7:
				month = 'August';
				daysInMonth = 31;
				break;
			case 8:
				month = 'September';
				daysInMonth = 30;
				break;
			case 9:
				month = 'October';
				daysInMonth = 31;
				break;
			case 10:
				month = 'November';
				daysInMonth = 30;
				break;
			case 11:
				month = 'December';
				daysInMonth = 31;
				break;
			default:
				month = 'Caturday';
				daysInMonth = 666;
				break;
		}
		var startDay = beginningOfMonth.getDay();
		var i = 1 - startDay;

		var table = '';
		table += '<li class=\'calendar\'>';
		table += '<h3>' + month + '</h3>';
		table += '<table><tbody>';
		table += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
		for (var week = 0; week < 6; week++) {
			if (i > daysInMonth) {
				break;
			}
			table += '<tr>'
			for (var day = 0; day < 7; day++) {
				if (date == i) {
					table += '<td class=\'today\'>';
				} else {
					table += '<td>';
				}
				if (i > 0 && i <= daysInMonth) {
					table += '<a href=\'http://en.wikipedia.org/wiki/' + month + '_' + i + '\'>' + i + '</a>';
				}
				table += '</td>'
				i++;
			}
			table += '</tr>'
		}
		$('.toolbar #clock + ul.submenu').html(table);
	}
}

var Battery = function(numberOfBatteryImageFrames, arbitraryStartDate, endDate) { // battery constructor
	this.numberOfBatteryImageFrames = numberOfBatteryImageFrames;
	this.arbitraryStartDate = arbitraryStartDate;
	this.endDate = endDate;
}

Battery.prototype = {

	numberOfBatteryImageFrames: 0,
	arbitraryStartDate: 0,
	endDate: 0,

	getChargeLevel: function(now) {
		var percentCharged;
		if (this.endDate < now) {
			percentCharged = 1;
		} else {
			percentCharged = (now - this.arbitraryStartDate) / (this.endDate - this.arbitraryStartDate);
		}
		return  Math.floor(percentCharged * this.numberOfBatteryImageFrames);
	},

	doChargeUp: function(now) {
		var maxCharge = this.getChargeLevel(now);
		var imgs = [];
		for (var i=0; i <= maxCharge; i++) {
			imgs[i] = new Image();
			imgs[i].src = './images/toolbar/battery_' + i + '.png';
		}
		var i = 0;
		window.setInterval(function() {
			if (i <= maxCharge) {
				$('.toolbar #battery img').attr('src', imgs[i++].src);
			}
		}, 250);
	},

	setBatteryMenuText: function(now) {
		var maxCharge = this.getChargeLevel(now);
		$('.toolbar #battery ul.submenu').append('<li>' +
			Math.floor((now.getTime() - this.arbitraryStartDate.getTime()) / (this.endDate.getTime() - this.arbitraryStartDate.getTime()) * 100000) / 1000 + '% charged</li>');
	}
}

// code to run
var menuFadeTime = 100;
var numberOfBatteryImageFrames = 38;
var arbitraryStartDate = new Date(2014, 6, 6, 6, 6, 6, 6);
var endDate = new Date(2014, 9, 25, 11, 0, 0, 0);
var toolbar = new Toolbar(menuFadeTime, numberOfBatteryImageFrames, arbitraryStartDate, endDate);

toolbar.time.startTime();
toolbar.time.createCalendar();
toolbar.battery.doChargeUp(new Date());
toolbar.battery.setBatteryMenuText(new Date());
toolbar.menu.attachActionHandlers(toolbar);

if (toolbar.battery.getChargeLevel(new Date()) != toolbar.battery.numberOfBatteryImageFrames) {
	window.setInterval(function() {
			toolbar.battery.doChargeUp(new Date());
		}, 10000);
}

<!--	Twitter script	-->
!function(d, s, id){
	var js,
			fjs = d.getElementsByTagName(s)[0],
			p = /^http:/.test(d.location) ? 'http' : 'https';
	if (!d.getElementById(id)) {
		js = d.createElement(s);
		js.id = id;
		js.src = p + "://platform.twitter.com/widgets.js";
		fjs.parentNode.insertBefore(js, fjs);
	}
}(document, "script", "twitter-wjs");
		