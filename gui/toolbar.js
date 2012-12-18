/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of toolbar
 */
define (["jquery", "toolbarButton"],(function($, ToolbarButton) {
	var Toolbar = (function(src) {
		this.buttons = new Array();
		this.imageSrc = src || "";

		this.checked = this.buttons[0];
	});
	Toolbar.prototype.addButton = (function(img, funct) {
		var btn = new ToolbarButton(this.imageSrc, "tb"+this.buttons.length, img, funct);
		this.buttons.push(btn);
		$("#toolbar").append(btn.src);
		$("#"+btn.id).click(function() {
			this.checked = btn.id;
			btn.funct();
		});
	});
	Toolbar.prototype.addSeperator = (function() {
		$("#toolbar").append('<div class="tb_seperator"></div>');
	});
	Toolbar.prototype.setImageSource = (function(src) {
		this.imageSrc = src;
	});
	return Toolbar;
}));	
