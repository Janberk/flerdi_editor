/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of toolbarbuttons
 */
define (['jquery'],function($) {
	var ToolbarButton = function(src, img, funct) {
		this.html = document.createElement('div');
		this.html.setAttribute('class', 'tb_button');

		this.img = document.createElement('img');
		this.img.setAttribute('src', src + (img || 'dummy') + '.svg');
		this.img.setAttribute('alt', 'hover text');

		this.html.appendChild(this.img);
		$(this.html).on('click', funct || function() { alert('No function yet') });
	};
	return ToolbarButton;
});	
