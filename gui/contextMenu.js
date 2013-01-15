/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the context menu
 */
define (['jquery'],function($) {
	var ContextMenu = function() {
		var _this = this;
		this.html = $(document.createElement('div'))
			.attr('class', 'context_menu');
		$('body').on('click', function() {
				_this.hide();
			});
	};
	ContextMenu.prototype.addButton = function(label, funct) {
		var _this = this;
		var sfunct = funct || function() alert('comming soon');
		this.html.append($(document.createElement('div'))
			.on('click', function(e) {
				_this.hide();
				sfunct(e);
			})
			.append(label)
		);
	};
	ContextMenu.prototype.addSeperator = function() {
		this.html.append($(document.createElement('div')).attr('class', 'seperator'));
	};
	ContextMenu.prototype.show = function(x, y) {
		$('#drawarea').append(this.html);
		this.html.css({
			'left': x,
			'top': y
		});
	};
	ContextMenu.prototype.hide = function() {
		$('#drawarea').children('.context_menu').remove();
	};
	return ContextMenu;
});	
