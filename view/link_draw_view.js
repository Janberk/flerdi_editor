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
	var LinkDrawView = function(id, ne_type, avp_attribute, points, callback) {
		this.ne_type = ne_type;
		this.avp_attribute = avp_attribute;
		this.id = id; // id of the model

		this.points = points || []; // points of all connected models

		this.callback = function() {
		};
		if (callback != undefined && typeof callback == 'function') {
			this.callback = callback;
		}

		this.svg = document.createElementNS("http://www.w3.org/2000/svg", "g");
		this.svg.setAttribute('id', 'link' + this.id);
		this.svg_lines = [];

		environment.drawArea.addObserver(this);
		
		this.create();
		this.drawView();
	}

	/**
	 * This functions draws the View.
	 * 
	 */
	LinkDrawView.prototype.drawView = function() {
		document.getElementById('links').appendChild(this.svg);
	}

	/**
	 * This function refreshes the Values in the View
	 * 
	 */
	LinkDrawView.prototype.refresh = function() {
		this.remove();
		this.create();
		this.drawView();
	}

	/**
	 * This function creates all UI-Elements for this View
	 * 
	 */
	LinkDrawView.prototype.create = function() {
		var _this = this;
		
		this.svg.setAttribute('id','link'+this.id);

		this.svg_lines = [];
		
		var node_width = 50;
		var node_height = 50;

		// create the first line
		var x1 = this.points[0].x + node_width / 2;
		var y1 = this.points[0].y + node_height / 2;
		var x2 = this.points[1].x + node_width / 2;
		var y2 = this.points[1].y + node_height / 2;

		var i = this.svg_lines.push(document.createElementNS(
				"http://www.w3.org/2000/svg", "line")) - 1;

		this.svg_lines[i].setAttribute("x1", x1);
		this.svg_lines[i].setAttribute("y1", y1);
		this.svg_lines[i].setAttribute("x2", x2);
		this.svg_lines[i].setAttribute("y2", y2);
		this.svg_lines[i].setAttribute("style", this.getLinkStyle());

		// if there are more than 2 nodes connected, add more lines
		if (this.points.length > 2) {
			// create an anchor point for additional lines
			var anchor_x = Math.min(x1, x2)
					+ ((Math.max(x1, x2) - Math.min(x1, x2)) / 2);
			var anchor_y = Math.min(y1, y2)
					+ ((Math.max(y1, y2) - Math.min(y1, y2)) / 2);
			var anchor = [ anchor_x, anchor_y ];

			// draw additional nodes
			for ( var j = 2; j < this.points.length; j++) {
				x1 = anchor[0];
				y1 = anchor[1];
				x2 = this.points[j].x + node_width / 2;
				y2 = this.points[j].y + node_height / 2;

				i = this.svg_lines.push(document.createElementNS(
						"http://www.w3.org/2000/svg", "line")) - 1;

				this.svg_lines[i].setAttribute("x1", x1);
				this.svg_lines[i].setAttribute("y1", y1);
				this.svg_lines[i].setAttribute("x2", x2);
				this.svg_lines[i].setAttribute("y2", y2);
				this.svg_lines[i].setAttribute("style", this.getLinkStyle());
			}
		}

		for ( var i = 0; i < this.svg_lines.length; i++) {
			this.svg.appendChild(this.svg_lines[i]);
		}
		
		$(this.svg).on('contextmenu', function(e) {
			_this.callback('context').show(e);
			return false;
		});
	}

	/**
	 * This function removes all UI-Elements this View created
	 * 
	 */
	LinkDrawView.prototype.remove = function() {
		document.getElementById('links').removeChild(this.svg);
		$(this.svg).empty();
	}

	LinkDrawView.prototype.update = function(command, data) {
		var _this = this;

		switch (command) {

		case "changeState":
			switch (data) {
			case "move":
				this.removeEvents();

				$(this.svg)
						.on('dragstart', function(event) {
							console.log("dragstart link");
						}).on('drag', function(event) {
							console.log("drag link");
						}).on('dragend', function(event) {
							console.log("dragend link");
						}).on('click', function(event) {
							for(var i=0; i<_this.svg_lines.length; i++) {
								var line = _this.svg_lines[i];
								var style = line.getAttribute("style") + "stroke-dasharray: 1, 1;";
								line.setAttribute("style", style);
							} // TODO display anchor points here
						});
				break;
				
			default:
				this.removeEvents();
			}
			break;
		}
	}
	
	LinkDrawView.prototype.removeEvents = function() {
		$(this.svg).off('drag').off('dragend').off('dragstart').off('click');
	}
	
	// TODO diese funktion gehört eich in eine Öffentliche Bibliothek, muss
	// später noch ausgelagert werden
	/**
	 * This functions calculates the
	 * 
	 */
	LinkDrawView.prototype.getLinkStyle = function() {
		var link_style;

		switch (this.ne_type) {
		case "/link/generic":
			link_style = "stroke:rgb(115,62,145);";
			break; // #733e91
		case "/link/transit":
			link_style = "stroke:rgb(81,188,190);";
			break; // #51bcbe
		default:
			link_style = "stroke:rgb(0,0,0);";
			break; // #000000
		}

		// if the avp attribute ends with "/symmetric/bandwidth", its
		// half-duplex
		var avp = this.avp_attribute;
		var suffix = "/symmetric/bandwidth";

		if (avp.indexOf(suffix, avp.length - suffix.length) !== -1) {
			link_style += "stroke-width:2;"; // half-duplex-link
		} else {
			link_style += "stroke-width:4;"; // full-duplex-link
		}
		return link_style;
	}

	return LinkDrawView;
}));