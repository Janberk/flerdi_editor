/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of menubar
 */
define (["jquery", "menubarButton"],(function($, MenuButton) {
	var Menu = (function(id, title) {
		this.title = title;
		this.id = id;
		this.buttons = new Array();
		this.src = '<div class="mb_menu">'+this.title+'</div>';
	});
	Menu.prototype.addMenubutton = (function(title, funct) {
		buttons.push(new MenuButton(title, funct));
	});
	return Menu;
}));	
