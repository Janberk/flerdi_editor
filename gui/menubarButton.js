/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of menubar
 */
define (["jquery"],(function($) {
	var Button = (function(title, funct) {
		var html = $(document.createElement('div'))
			.attr('class', 'mb_menu')
			.append(title)
			.on('click', funct || function() { alert('No function yet') });
		this.html = html;
	});
	return Button;
}));	
