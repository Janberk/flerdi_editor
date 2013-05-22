/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the menubar
 */
define (['jquery', 'menubarButton'],function($, MenuButton) {
	var Menu = function(title) {
		this.html = $(document.createElement('div'))
			.attr('class', 'mb_menu')
			.append(title)
			.append($(document.createElement('div'))
				.attr('class', 'mb_sub')
			);
	};
	Menu.prototype.addMenubutton = function(title, funct) {
		$(this.html).children('.mb_sub').append((new MenuButton(title,funct)).html);
	};
	Menu.prototype.addSeperator = function() {
		$(this.html).children('.mb_sub').append(
			$(document.createElement('div'))
				.attr('class', 'mb_seperator')
		);
	};
	return Menu;
});	
