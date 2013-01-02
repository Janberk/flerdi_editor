/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the menubar
 */
define (['jquery', 'menubarMenu', 'menubarButton'],function($, Menu, MenuButton) {
	var active = false;
	var activeMenu = '';
	var Menubar = function() {
		this.menus = new Array();
		$(document).on('click', function(e) {
			if($(e.target).closest('.mb_menu').length == 0 ||
					$(e.target).closest('.mb_button').length > 0) {
				active = false;
				setActive();
			}
		});
	};
	Menubar.prototype.addMenu = function(title) {
		var menu = new Menu(title);
		this.menus[title] = menu;
		$('#menubar').append(menu.html);
		$(menu.html).hover(function() {
				setActive(menu);
			})
			.on('click', function() {
				active = !active;
				setActive(menu);
			})
			.children('.mb_sub')
				.css('left', $(menu.html).offset().left);
	};
	Menubar.prototype.addSubMenu = function(menu, subtitle, funct) {
		this.menus[menu].addMenubutton(subtitle, funct);
	};
	Menubar.prototype.addSubSeperator = function(menu) {
		this.menus[menu].addSeperator();
	};
	var setActive = function(menu) {
		if(activeMenu) activeMenu.removeClass('active_menu');
		if(active && menu) {
			activeMenu = menu.html;
			activeMenu.addClass('active_menu');
		}
	};
	return Menubar;
});	
