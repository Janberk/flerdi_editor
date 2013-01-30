/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the context menu
 */
define (['jquery'],function($) {
	var ContextMenu = function() {
		var _this = this;
		$('body').on('click', function() {
				_this.hide();
			});
		this.buttons = new Array();
		this.functs = new Array();
	};
	ContextMenu.prototype.addButton = function(label, funct) {
		var _this = this;
		var sfunct = funct || function() alert('comming soon');
		var button = $(document.createElement('div'))
			.append(label);
		this.buttons.push(button);
		this.functs.push(sfunct);
	};
	ContextMenu.prototype.addSeperator = function() {
		this.html.append($(document.createElement('div')).attr('class', 'seperator'));
	};
	ContextMenu.prototype.show = function(x, y) {
		$('.context_menu').remove();
		var _this = this;
		this.html = $(document.createElement('div'))
			.attr('class', 'context_menu');
		$('#drawarea').append(this.html);
		for(var i = 0; i < this.buttons.length; i++) {		
			_this.html.append(this.buttons[i]
				.on('click', this.functs[i]));
		};
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
