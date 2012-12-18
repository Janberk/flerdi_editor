/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of menubar
 */
define (["jquery", "menubarMenu", "menubarButton"],(function($, Menu, MenuButton) {
	var Menubar = (function() {
		this.menus = new Array();

	});

	Menubar.prototype.draw = (function() {
		$.each( this.menus, (function(i, val) {
			$("#menubar").append(val.src);
		}));
	});
	Menubar.prototype.addMenu = (function(title) {
		this.menus.push(new Menu(this.menus.length, title));
	});
	return Menubar;
}));	
