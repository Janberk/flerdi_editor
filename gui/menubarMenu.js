/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the menubar
 */
define (["jquery", "menubarButton"],function($, MenuButton) {
	var Menu = function(title) {
		var html = $(document.createElement('div'))
			.attr('class', 'mb_menu')
			.append(title)
			.append($(document.createElement('div'))
				.attr('class', 'mb_sub')
			);
		this.html = html;
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
	Menu.prototype.showSubMenu = function() {
		$(this.html).children('.mb_sub').css({
			'display': 'block',
			'left': $(this.html).offset().left
		});
	};
	Menu.prototype.hideSubMenu = function() {
		$(this.html).children('.mb_sub').css('display','none');
	};
	return Menu;
});	
