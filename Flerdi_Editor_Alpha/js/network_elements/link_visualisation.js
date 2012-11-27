/*
 * Module link_visualisation: responsible for the visualisation of a link
 * Author: Flerdi Team, Kai Müller, Franz Nieschalk
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery"], (function($) {
	
	/* constructor */
	var Link_Visualisation = function(startPosition, endPosition, linkType) {
		console.log("creating line for link");
		
		this.startPosition = startPosition;
		this.endPosition = endPosition;
		this.color = this.getLinkColor(linkType);
		
		var x1 = startPosition[0]; var y1 = startPosition[1];
		var x2 = endPosition[0]; var y2 = endPosition[1];
		
		var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
		var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
		var transform = 'rotate('+angle+'deg)';

		this.div = $('<div>')
        .appendTo('#body_element')
        .addClass('line')
        .css({
          'position': 'absolute',
          'transform': transform,
		  'background-color': this.color
        })
        .width(length)
        .offset({left: x1, top: y1});
		
	} //constructor
	
	/* returns a hex color for the link, depending on link type */
	Link_Visualisation.prototype.getLinkColor = function(linkType) {
		switch (linkType) {
			case "/link/generic":
				return "#733e91";
			case "/link/transit" :
				return "#51bcbe";
			default:
				return "#000000";
		}
	} //getLinkColor
	
	/* makes the link visible by appending it to the body */
	Link_Visualisation.prototype.show = function() {
		console.log("showing link");
		
		$("#body_element").append(this.div);
	} //show
	
	/* makes the link invisible by removing it from the body */
	Link_Visualisation.prototype.hide = function() {
		console.log("hiding link");
		
		$(this.div).remove();
	} //hide
	
	return Link_Visualisation;
})); //define