/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of menubar
 */
define (['jquery'],function($) {
	var Button = function(title, funct) {
		this.html = $(document.createElement('div'))
			.attr('class', 'mb_button')
			.append(title)
			.on('click', funct || function() { alert('No function yet') });
	};
	return Button;
});	
