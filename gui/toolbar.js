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
		this.buttons.push(new ToolbarButton(this.imageSrc, "tb"+this.buttons.length, img, funct));
	});
	Toolbar.prototype.addSeperator = (function() {
		this.buttons.push(0);
	});
	Toolbar.prototype.draw = (function() {
		$.each( this.buttons, (function(i, val) {
			if( val != 0 ) {
				$("#toolbar").append(val.src);
				$("#"+val.id).click(function() {
					val.funct();
					this.checked = val.id;
				});
			} else {
				$("#toolbar").append('<div class="tb_seperator"></div>');
			}
		}));
	});
	Toolbar.prototype.setImageSource = (function(src) {
		this.imageSrc = src;
	});
	return Toolbar;
}));	
