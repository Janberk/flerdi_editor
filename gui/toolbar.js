/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the toolbar
 */
define (['jquery'],function($) {
	var checked = '';
	var imageSrc = '';
	var Toolbar = function(src) {
		imageSrc = src || '';
		$('#toolbar')
			.addClass('navbar')
			.append($(document.createElement('div'))
				.addClass('navbar-inner')
				.append($(document.createElement('div'))
					.addClass('container')
					.append($(document.createElement('ul'))
						.addClass('nav nav-pills nav-stacked'))));
	};
	Toolbar.prototype.addButton = function(img, funct, title) {
		var b = $(document.createElement('li'))
			.append($(document.createElement('a'))
				.addClass('btn btn-link tb_btn')
				.on('click', funct || function() { alert('No function yet') })
				.append($(document.createElement('img'))
					.attr({		'src': 		imageSrc + (img || 'dummy') + '.svg',
								'class': 	'tb_img'})));
		$('#toolbar').find('ul').append(b);
		if($('#toolbar').find('li').length == 1) {
			checked = b;
			checked.addClass('active');
		}
		b.children('a').on('click', function() {
			checked.removeClass('active');
			checked = b;
			checked.addClass('active');
		});
	};
	Toolbar.prototype.addSeperator = function() {
		$('#toolbar').find('ul').append($(document.createElement('li'))
			.addClass('divider'));
	};
	return Toolbar;
});	
