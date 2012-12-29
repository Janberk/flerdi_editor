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
		this.src = '<div class="mb_menu" id="' + this.id + '">'+this.title+'</div>';

		this.funct = funct || (function() { alert("No function yet"); });
	// create irgendwas, addatribute, on('click') etc
	});
	return Button;
}));	
