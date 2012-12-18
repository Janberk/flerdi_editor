/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of toolbar
 */
define (["jquery"],(function($) {
	var ToolbarButton = (function(src, id, img, funct) {
		this.id = id;
		this.img = img || "dummy";
		this.src = '<div id="' + this.id + '" class="tb_button"><img src="' + src + this.img + '.svg"></div>';

		this.funct = funct || (function() { alert("No function yet"); });
	});
	return ToolbarButton;
}));	
