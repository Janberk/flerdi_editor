/*
 * Module link: represents a single link in the network
 * Author: Flerdi Team, Franz Nieschalk
 */
 
 /*
 * RequireJS module definition
 */ 
define (["jquery", "link_visualisation"], (function($, Link_Visualisation) {

	/* constructor */
	var Link = function(network_element, startNode, endNode) {
	
		console.log("creating link");
		
		this.startPosition = startNode.position || [Math.floor(Math.random() * 501), Math.floor(Math.random() * 501)];
		this.endPosition = endNode.position || [Math.floor(Math.random() * 501), Math.floor(Math.random() * 501)];

		this.network_element = network_element;
		this.attributes = network_element.attributes;
		this.id = network_element.attributes.id;
		this.type = network_element.attributes.ne_type;
		
		this.visualisation = new Link_Visualisation(this.startPosition[0], this.startPosition[1], this.endPosition[0], this.endPosition[1], this.type);
		this.visualisation.show();
	} //constructor
	
	return Link;
}));