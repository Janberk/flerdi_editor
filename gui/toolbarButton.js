/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of toolbar
 */
define (["jquery"],(function($) {
	var ToolbarButton = (function(img, funct, id) {
		this.funct = funct;
		this.id = id;
		this.src = '<div id="' + this.id + '" class="tb_button">' + img + '</div>';
	});
	ToolbarButton.prototype.click = this.funct;
	return ToolbarButton;
}));	
