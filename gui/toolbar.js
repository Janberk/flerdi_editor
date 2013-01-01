/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of toolbar
 */
define (['jquery', 'toolbarButton'],function($, ToolbarButton) {
	var checked = '';
	var imageSrc = '';
	var Toolbar = function(src) {
		imageSrc = src || '';
	};
	Toolbar.prototype.addButton = function(img, funct) {
		var btn = new ToolbarButton(imageSrc, img, funct);
		$('#toolbar').append(btn.html);
		if($('#toolbar').children().length == 1) {
			checked = btn.html;
			checked.addClass('checked');
		}
		$(btn.html).on('click', function() { 
			checked.removeClass('checked');
			checked = btn.html;
			checked.addClass('checked');
		});
	};
	Toolbar.prototype.addSeperator = function() {
		$('#toolbar').append($(document.createElement('div'))
			.attr('class', 'tb_seperator')
		);
	};
	return Toolbar;
});	
