/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of toolbar
 */
define (['jquery', 'toolbarButton'],function($, ToolbarButton) {
	var _this = this;
	var Toolbar = function(src) {
		this.buttons = new Array();
		this.imageSrc = src || "";
		this.checked = "";
	};
	Toolbar.prototype.addButton = function(img, funct) {
		var btn = new ToolbarButton(this.imageSrc, img, funct);
		this.buttons.push(btn);
		$('#toolbar').append(btn.html);
		if(this.buttons.length == 1) {
			_this.checked = btn.html;
			$(_this.checked).addClass('checked');
		}
		$(btn.html).on('click', function() { 
			$(_this.checked).removeClass('checked');
			_this.checked = btn.html;
			$(_this.checked).addClass('checked'); } );
	};
	Toolbar.prototype.addSeperator = function() {
		var sep = document.createElement('div');
		sep.setAttribute('class' , 'tb_seperator');
		$('#toolbar').append(sep);
	};
	return Toolbar;
});	
