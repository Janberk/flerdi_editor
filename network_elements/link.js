/*
 * Module link: represents a single link in the network
 * Author: Flerdi Team, Franz Nieschalk
 */
 
 /*
 * RequireJS module definition
 */ 
define (["jquery", "link_visualisation"], (function($, Link_Visualisation) {

	/* constructor */
	var Link = function(network_element, connected_nodes) {
	
		console.log("creating link");
		
		this.connected_nodes = connected_nodes;
		this.node_positions = [];
		
		for(var i = 0; i < this.connected_nodes.length; i++) {
			var node = this.connected_nodes[i];

			this.node_positions.push(node.position || [Math.floor(Math.random() * 501), Math.floor(Math.random() * 501)]);
		}

		this.network_element = network_element;
		this.attributes = network_element.attributes;
		this.id = network_element.attributes.id;
		this.type = network_element.attributes.ne_type;
		
		var resource = network_element.resources.pop();
		this.avp_attribute = resource.attributes.avp_attribute;
		
		this.visualisation = new Link_Visualisation(this.node_positions, this.type, this.avp_attribute);
		this.visualisation.show();
	} //constructor
	
	return Link;
}));