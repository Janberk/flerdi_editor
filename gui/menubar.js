/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the menubar
 */
define (['jquery'],function($) {
	var Menubar = function() {
		$('#menubar')
			.addClass('navbar navbar-static-top')
			.append($(document.createElement('div'))
				.addClass('navbar-inner')
				.append($(document.createElement('div'))
					.addClass('container pull-left')
					.append($(document.createElement('ul'))
						.addClass('nav')))
				.append($(document.createElement('div'))
					.addClass('pull-right')
					.append($(document.createElement('div'))
						.addClass('brand')
						.append('Flerdi'))));
	};
	Menubar.prototype.addMenu = function(title) {
		$('#menubar .nav').append($(document.createElement('li'))
			.on('mouseout', function() {
				if($('#menubar').find($(this)).length == 0) active = false;
			})
			.attr('name', title)
			.addClass('dropdown')
				.append($(document.createElement('button'))
					.addClass('btn btn-link')
					.append(title)
				)
			.hover(function() { $(this).addClass('open') },
				function() { $(this).removeClass('open')} ))
	};
	Menubar.prototype.addSubMenu = function(menu, subtitle, funct) {
		if($('#menubar .nav li[name=' + menu + '] ul').length == 0) {
			$('#menubar .nav li[name=' + menu + ']')
				.append($(document.createElement('ul'))
					.attr({
						'class': 'dropdown-menu',
						'role': 'menu'
					}));
			$('#menubar .nav li[name=' + menu + '] button').attr({
				'data-toggle': 'dropdown',
				'role': 'button'
				}).addClass('btn dropdown-toggle')
		}
		$('#menubar .nav li[name=' + menu + '] ul')
			.append($(document.createElement('li'))
				.append($(document.createElement('button'))
					.addClass('btn btn-link')
					.attr('id', 'btn-'+subtitle)
					.append(subtitle)
					.on('click', funct || function() { alert('No function yet') }))
		);
	};
	Menubar.prototype.addSubSeperator = function(menu) {
		$('#menubar .nav li[name=' + menu + '] ul')
			.append($(document.createElement('li'))
			.addClass('divider'))
	};
	return Menubar;
});	
