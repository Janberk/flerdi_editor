/*
 * Module link_visualisation: responsible for the visualisation of a link
 * Author: Flerdi Team, Kai Müller, Franz Nieschalk
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery"], (function($) {
	
	/* constructor */
	var Link_Visualisation = function(x1, y1, x2, y2, linkType) {
		console.log("creating svg-line for link");
		
		this.x1 = x1; this.y1 = y1;
		this.x2 = x2; this.y2 = y2;
		this.style = this.getLinkStyle(linkType);
		
		this.svg_line = document.createElementNS("http://www.w3.org/2000/svg", "line");

		this.svg_line.setAttribute("x1", this.x1);
		this.svg_line.setAttribute("y1", this.y1);
		this.svg_line.setAttribute("x2", this.x2);
		this.svg_line.setAttribute("y2", this.y2);
		this.svg_line.setAttribute("style", this.style);
		
	} //constructor
	
	/* returns the style for the link, depending on link type */
	Link_Visualisation.prototype.getLinkStyle = function(linkType) {
		switch (linkType) {
			case "/link/generic":
				return "stroke:rgb(115,62,145);stroke-width:2"; //#733e91
			case "/link/transit" :
				return "stroke:rgb(81,188,190);stroke-width:2"; //#51bcbe
			default:
				return "stroke:rgb(0,0,0);stroke-width:2"; //#000000
		}
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