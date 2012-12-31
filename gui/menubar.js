/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of menubar
 */
define (["jquery", "menubarMenu", "menubarButton"],function($, Menu, MenuButton) {
	var Menubar = function() {
		this.menus = new Array;
	};
	Menubar.prototype.addMenu = function(title) {
		var menu = new Menu(title);
		this.menus[title] = menu;
		$("#menubar").append(menu.html);
		$(menu.html).hover(function() {
			menu.showSubMenu();
		});
		$(menu.html).mouseout(function() {
			menu.hideSubMenu();
			$("#menu"+menu.id).hover(function() {
				menu.showSubMenu();
			});
		});
	};
	Menubar.prototype.addSubMenu = function(menu, subtitle, funct) {
		this.menus[menu].addMenubutton(subtitle, funct);	
	};
	Menubar.prototype.addSubSeperator = function(menu) {
		this.menus[menu].addSeperator();
	};
	return Menubar;
});	
