/*
 * Author: Flerdi Team
 */

/* 
 *  This class handles the appearance of the context menu
 */
define([ 'jquery', 'button' ], function($, Button) {
	var ContextMenu = function() {
		this.container = $(document.createElement('ul')).addClass(
				'dropdown-menu').attr({
			'role' : 'menu',
			'aria-labelledby' : 'dropdownMenu'
		});

	};

	ContextMenu.prototype.addButton = function(label, funct) {
		var btn = new Button();
		$(this.container).append(
				$(document.createElement('li')).append(
						$(document.createElement('a')).attr('href','#').append(label).on('click',
								funct || function() {
									alert('comming soon')
								})));
	};

	ContextMenu.prototype.addSeperator = function() {
		$(this.container).append(
				$(document.createElement('li')).addClass('divider'))
	};

	ContextMenu.prototype.show = function(e) {
		var _this = this;
		$('body').append(this.container);
	
		$(this.container).css({
			'left' : e.clientX,
			'top' : e.clientY,
			'display' : 'block',
		});
		
		$(this.container).addClass('open');
		$('body').on('click', function() {
			$(_this.container).detach();
		})
	};
	
	return ContextMenu;
});
