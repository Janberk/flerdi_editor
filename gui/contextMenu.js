/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the context menu
 */
define (['jquery'],function($) {
	var ContextMenu = function() {
		$('#contextmenu').remove();
		$('body')
			.append($(document.createElement('div'))
				.addClass('dropdown')
				.attr('id', 'contextmenu')
				.append($(document.createElement('ul'))
					.addClass('dropdown-menu')
					.attr('role', 'menu')
				)
			);
	};
	ContextMenu.prototype.addButton = function(label, funct) {
		$('#contextmenu ul')
			.append($(document.createElement('li'))
				.append($(document.createElement('button'))
					.addClass('btn btn-link')
					.append(label)
					.on('click', funct || function() { alert('comming soon') })
				)
		);
	};
	ContextMenu.prototype.addSeperator = function() {
		$('#contextmenu ul')
			.append($(document.createElement('li'))
				.addClass('divider'))
	};
	ContextMenu.prototype.show = function(e) {
		var context_active = false;
		$(document).bind("contextmenu",function(e){
			return context_active;
		});
		$('#contextmenu').css({
			'left': e.clientX,
			'top': e.clientY
		});
		$('#contextmenu')
			.addClass('open');
		$('body').on('click', function() {
			$('#contextmenu').removeClass('open')
			context_active = true;
		})
	};
	return ContextMenu;
});	
