/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of menubar
 */
define (["jquery"],(function($) {
	var Button = (function(id, title, funct) {
		this.title = title;
		this.id = id;
		this.buttons = new Array();
		this.src = '<div class="mb_menu">'+this.title+'</div>';
	});
	return Button;
}));	
