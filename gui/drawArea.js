/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the menubar
 */
define (['jquery'],function($) {
	var DrawArea = function() {
		$('#drawarea')
			.on('click', function(e) {
				if(canDo('onClick')) State.onClick(e);
			});				
	};
	var canDo = function(method) {
		return typeof State[method] == 'function';
	};
	DrawArea.prototype.setState = function(state) {
		State = state;
	};
	return DrawArea;
});	
