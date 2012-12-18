/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of toolbar
 */
define (["jquery", "toolbarButton"],(function($, ToolbarButton) {
	var _this = this;
	var Toolbar = (function(src) {
		this.buttons = new Array();
		this.imageSrc = src || "";
		this.checked = "";
	});
	Toolbar.prototype.addButton = (function(img, funct) {
		var btn = new ToolbarButton(this.imageSrc, "tb"+this.buttons.length, img, funct);
		this.buttons.push(btn);
		$("#toolbar").append(btn.src);
		if(this.buttons.length == 1) {
			_this.checked = btn.id;
			$("#"+_this.checked).addClass("checked");
		}
		$("#"+btn.id).on('click', function(e) {
			$("#"+_this.checked).removeClass("checked");
			_this.checked = btn.id;
			$("#"+_this.checked).addClass("checked");
			btn.funct(e);
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
