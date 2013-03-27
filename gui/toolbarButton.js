/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of toolbarbuttons
 */
define (['jquery'],function($) {
	var ToolbarButton = function(src, image, funct, title) {
		this.html = $(document.createElement('div'))
			.attr('class', 'tb_button')
			.on('click', funct || function() { alert('No function yet') })
			.append($(document.createElement('img'))
				.attr({
					'src': src + (image || 'dummy') + '.svg',
					'alt': 'hover text',
					'title': title
				})
			);
	};
	return ToolbarButton;
});	
