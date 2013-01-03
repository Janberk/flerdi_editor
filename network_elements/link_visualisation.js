/*
 * Module link_visualisation: responsible for the visualisation of a link
 * Author: Flerdi Team, Kai Müller, Franz Nieschalk
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery"], (function($) {
	
	/* constructor */
	var Link_Visualisation = function(x1, y1, x2, y2, link_type, avp_attribute) {
		console.log("creating svg-line for link");
		
		// TODO: determine the current size of the svg picture of the connected nodes
		var svg_length = 50;
		var svg_height = 50;
		
		this.x1 = x1 + svg_length/2; this.y1 = y1 + svg_height/2;
		this.x2 = x2 + svg_length/2; this.y2 = y2 + svg_height/2;
		this.style = this.getLinkStyle(link_type, avp_attribute);
		
		this.svg_line = document.createElementNS("http://www.w3.org/2000/svg", "line");

		this.svg_line.setAttribute("x1", this.x1);
		this.svg_line.setAttribute("y1", this.y1);
		this.svg_line.setAttribute("x2", this.x2);
		this.svg_line.setAttribute("y2", this.y2);
		this.svg_line.setAttribute("style", this.style);
		
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
	
	/* makes the link visible by appending it to the svg root */
	Link_Visualisation.prototype.show = function() {
		console.log("showing link");
		
		document.getElementById('svg_root').appendChild(this.svg_line);
	} //show
	
	/* makes the link invisible by removing it from the svg root */
	Link_Visualisation.prototype.hide = function() {
		console.log("hiding link");
		
		document.getElementById('svg_root').removeChild(this.svg_line);
	} //hide
	
	return Link_Visualisation;
})); //define