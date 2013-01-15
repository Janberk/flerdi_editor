/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the context menu
 */
define (['jquery'],function($) {
	var html = $(document.createElement('div'))
			.attr('class', 'context_menu');
	var ContextMenu = function() {
		$('#drawarea').append(html)
			.on('contextmenu', function(e) {
				html.css({
					'display': 'block',
					'left': e.pageX - this.offsetLeft - this.scrollLeft,
					'top': e.pageY - this.offsetTop - this.scrollTop
				});
				return false;
			})
		$('body').on('click', function() {
				html.css('display', 'none');
			});
		$('#nodes image').on('click', function() alert('jepp'));
		addButton('Undo');
		addButton('Redo');
		addSeperator();
		addButton('Cut', true);
		addButton('Copy', true);
		addButton('Paste');
		addButton('Delete', true);
		addSeperator();
		addButton('Select all');
	};
	var addButton = function(label, funct, node) {
		var sfunct = funct || function() alert('comming soon');
		var nButton = $(document.createElement('div'))
			.on('click', function(e) {
				html.css('display', 'none');
				sfunct(e);
			})
			.append(label);
		if(node || typeof funct == 'boolean') nButton.addClass('selection_specific');
		html.append(nButton);
	};
	var addSeperator = function() {
		html.append($(document.createElement('div')).attr('class', 'seperator'));
	};
	return ContextMenu;
});	
