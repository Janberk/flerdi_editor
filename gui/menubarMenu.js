/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of menubar
 */
define (["jquery", "menubarButton"],(function($, MenuButton) {
	var Menu = (function(id, title) {
		this.title = title;
		this.id = title;
		this.buttons = new Array();
		this.src = '<div id="' + this.id + '" class="mb_menu">'+this.title+'</div><div class="mb_sub" id="menu' + this.id + '"></div>';
	});
	Menu.prototype.addMenubutton = (function(title, funct) {
		var btn = new MenuButton(this.id + this.buttons.length, title, funct);
		this.buttons.push(btn);
		$('#menu'+this.id).append(btn.src);
		$('#'+btn.id).click(btn.funct);
	});
	Menu.prototype.addSeperator = (function() {
		$('#menu'+this.id).append('<div class="mb_seperator"></div>');
	});
	Menu.prototype.showSubMenu = (function() {
		$('#menu'+this.id).css('display','block');
		$("#menu"+this.id).css( "left", $("#"+this.id).offset().left );
	});
	Menu.prototype.hideSubMenu = (function() {
		$('#menu'+this.id).css('display','none');
	});
	return Menu;
}));	
