/*
 * Module link_visualisation: responsible for the visualisation of a link
 * Author: Flerdi Team, Kai Müller, Franz Nieschalk
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery"], (function($) {
	
	/* constructor */
	var Link_Visualisation = function(node_positions, link_type, avp_attribute) {
		console.log("creating svg-line for link");
		
		this.node_positions = node_positions;
		
		this.style = this.getLinkStyle(link_type, avp_attribute);
		this.svg_lines = this.createLines();
		
	} //constructor

	/* returns the style for the link, depending on link type */
	Link_Visualisation.prototype.getLinkStyle = function(link_type, avp_attribute) {
		var link_style;
	
		switch (link_type) {
			case "/link/generic":
				link_style = "stroke:rgb(115,62,145);"; break; //#733e91
			case "/link/transit" :
				link_style = "stroke:rgb(81,188,190);"; break; //#51bcbe
			default:
				link_style = "stroke:rgb(0,0,0);"; break; //#000000
		}
		
		if(avp_attribute == "/link/generic/symmetric/bandwidth") {
			link_style = link_style + "stroke-width:2"; //half-duplex-link
		}
		else {
			link_style = link_style + "stroke-width:4"; //full-duplex-link
		}
		
		return link_style;
	} //getLinkColor
	
	/* creates svg lines which represent this link */
	Link_Visualisation.prototype.createLines = function() {
		// TODO: determine the current size of the svg picture of the connected nodes
		var node_length = 50;
		var node_height = 50;
		
		var svg_lines = [];
		
		// create the first line
		var x1 = this.node_positions[0][0] + node_length/2;
		var y1 = this.node_positions[0][1] + node_height/2;
		var x2 = this.node_positions[1][0] + node_length/2;
		var y2 = this.node_positions[1][1] + node_height/2;
		
		var i = svg_lines.push(document.createElementNS("http://www.w3.org/2000/svg", "line")) - 1;

		svg_lines[i].setAttribute("x1", x1);
		svg_lines[i].setAttribute("y1", y1);
		svg_lines[i].setAttribute("x2", x2);
		svg_lines[i].setAttribute("y2", y2);
		svg_lines[i].setAttribute("style", this.style);
		
		// create an anchor point for additional lines
		var anchor_x = Math.min(x1, x2) + ((Math.max(x1, x2) - Math.min(x1, x2)) / 2);
		var anchor_y = Math.min(y1, y2) + ((Math.max(y1, y2) - Math.min(y1, y2)) / 2);
		var anchor = [anchor_x, anchor_y];
		
		// if there are more than 2 nodes connected, add more lines
		for(var j = 2; j < this.node_positions.length; j++) {
			x1 = anchor[0];
			y1 = anchor[1];
			x2 = this.node_positions[j][0] + node_length/2;
			y2 = this.node_positions[j][1] + node_height/2;
			
			i = svg_lines.push(document.createElementNS("http://www.w3.org/2000/svg", "line")) - 1;

			svg_lines[i].setAttribute("x1", x1);
			svg_lines[i].setAttribute("y1", y1);
			svg_lines[i].setAttribute("x2", x2);
			svg_lines[i].setAttribute("y2", y2);
			svg_lines[i].setAttribute("style", this.style);
		}
		
		return svg_lines;
	} //createLines
	
	/* makes the link visible by appending it to the svg root */
	Link_Visualisation.prototype.show = function() {
		console.log("showing link");
		
		for(var i = 0; i < this.svg_lines.length; i++) {
			document.getElementById('svg_root').appendChild(this.svg_lines[i]);
		}
	} //show
	
	/* makes the link invisible by removing it from the svg root */
	Link_Visualisation.prototype.hide = function() {
		console.log("hiding link");
		
		for(var i = 0; i < this.svg_lines.length; i++) {
			document.getElementById('svg_root').removeChild(this.svg_lines[i]);
		}
	} //hide
	
	return Link_Visualisation;
})); //define