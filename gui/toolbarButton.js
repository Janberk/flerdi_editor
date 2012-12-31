/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of toolbarbuttons
 */
define (['jquery'],function($) {
	var ToolbarButton = function(src, image, funct) {
		var img = $(document.createElement('img'))
			.attr({
				'src': src + (image || 'dummy') + '.svg',
				'alt': 'hover text',
		});
		var html = $(document.createElement('div'))
			.attr('class', 'tb_button')
			.append(img)
			.on('click', funct || function() { alert('No function yet') });

		this.html = html;
	};
	return ToolbarButton;
});	
