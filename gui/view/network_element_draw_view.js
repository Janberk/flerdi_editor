/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ "jquery" ], (function($) {

	/**
	 * This is the Constructor.
	 * 
	 * @param controller
	 *            controller which holds the reference to the Model
	 * @param callback
	 *            functions that should be triggered when the View is sending
	 *            new Data for the Model
	 * 
	 */
	var NetworkElementDrawView = function(controller, x, y, ne_type, callback) {
		this.controller = controller;
		this.x = x;
		this.y = y;

		this.callback = function() {
		};
		if (callback != undefined && typeof callback == 'function') {
			this.callback = callback;
		}

		this.ne_type = ne_type;

		this.svg;

		environment.drawArea.observable.addObserver(this);

		this.create();
		this.drawView();

	}

	/**
	 * This functions draws the View.
	 * 
	 */
	NetworkElementDrawView.prototype.drawView = function() {
		document.getElementById('nodes').appendChild(this.svg);
	}

	/**
	 * This function refreshes the Values in the View
	 * 
	 */
	NetworkElementDrawView.prototype.refresh = function() {
		this.svg.setAttribute("x", this.x);
		this.svg.setAttribute("y", this.y);
		this.svg.setAttribute("xlink:href", this.getPathToSvg());
	}

	/**
	 * This function creates all UI-Elements for this View
	 * 
	 */
	NetworkElementDrawView.prototype.create = function() {
		this.svg = document.createElementNS("http://www.w3.org/2000/svg",
				"image");
		this.svg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href',
				'');

		// TODO replace standard width and height values
		this.svg.setAttribute("width", 50);
		this.svg.setAttribute("height", 50);
		this.refresh();
	}

	/**
	 * This function removes all UI-Elements this View created
	 * 
	 */
	NetworkElementDrawView.prototype.remove = function() {
		document.getElementById('nodes').removeChild(this.svg);
	}

	NetworkElementDrawView.prototype.update = function(command, data) {
		var _this = this;
		
		switch (command) {
		
		case "changeState":
			switch (data) {
			case "move":
				this.removeEvents();
				var dummy;

				var drawAreaWidth = $('#svg').attr('width');
				var drawAreaHeight = $('#svg').attr('height');
				
				$(this.svg)
					.on('dragstart', function(event) {
						drawAreaWidth = $('#svg').attr('width');
						drawAreaHeight = $('#svg').attr('height');

						dummy = document.createElementNS("http://www.w3.org/2000/svg", "image");
						dummy.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '');
						dummy.setAttribute('opacity', '0.5');
								
						// TODO replace standard width and height values
						dummy.setAttribute("x", _this.x);
						dummy.setAttribute("y", _this.y);
						dummy.setAttribute("width", 50);
						dummy.setAttribute("height", 50);
						dummy.setAttribute("xlink:href", _this.getPathToSvg());

						// add dummy to document
						document.getElementById('nodes').appendChild(dummy);
					}).on('drag', function(event) {
						$(_this.svg).attr('x', event.offsetX - 32);
						$(_this.svg).attr('y', event.offsetY - 32);
					}).on('dragend', function(event) {
						_this.x = event.offsetX - 32;
						_this.y = event.offsetY - 32;

						// remove dummy from document
						document.getElementById('nodes').removeChild(dummy);
						_this.callback({x:_this.x,y:_this.y,ne_type:_this.ne_type});
					});
				break;
				
			case "newLink":
				this.removeEvents();
				
				$(this.svg)
					.on('dragstart', function(event) {
						environment.drawArea.state.onDragStart(event, _this);
					}).on('drag', function(event) {
						environment.drawArea.state.onDrag(event);
					}).on('dragend', function(event) {
						environment.drawArea.state.onDragEnd(event);
					}).on('mouseup', function(event) {
						environment.drawArea.state.onMouseUp(event, _this);
					});
				break;
				
			default:
				this.removeEvents();
			}
			break;
		}
	}

	NetworkElementDrawView.prototype.removeEvents = function() {
		$(this.svg).off('drag').off('dragend').off('dragstart').off('mouseup');
	}
	// TODO diese funktion gehört eich in eine Öffentliche Bibliothek, muss
	// später noch aisgelagert werden
	/**
	 * This function returns the Path to al SVG file - representing a specific
	 * ne-type
	 * 
	 */
	NetworkElementDrawView.prototype.getPathToSvg = function() {
		var path = '/assets/img/network_elements/';
		switch (this.ne_type) {
		case "/node/host/generic":
			return path + 'generic_host.svg';
		case "/node/host/pip":
			return path + 'pip_host.svg';
		case "/node/switch/cisco":
			return path + 'cisco_switch.svg';
		case "/node/switch/tunnelbridge":
			return path + 'tunnelbridge_switch.svg';
		case "/node/switch/pip":
			return path + 'pip_switch.svg';
		default:
			throw "could not draw svg tag for undefined ne_type '"
					+ this.ne_type + "'";
		}
	}
	
	NetworkElementDrawView.prototype.addContextMenue = function(contextMenue){
		$(this.svg).on('contextmenu', function(e) {
			contextMenue.show(e);
			return false;
		})
	}

	return NetworkElementDrawView;
}));