/*
 * Module network: represents a network, handles the nodes and links
 * Author: Flerdi Team, Kai Müller
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery","node"], (function($, Node) {

	/* constructor */
	var Network = function(jsonObject) {
		console.log("creating network");

		this.attributes = jsonObject.attributes;
		this.attributes_cache = jsonObject.attributes_cache;
		this.network_elements = jsonObject.network_elements;
		this.positions = jsonObject.positions;
		this.nodes = [];
		this.links = [];
		
		this.createNodes();
		this.createLinks();
	} //constructor
	
	/* creates the nodes of the network */
	Network.prototype.createNodes = function() {
		console.log("pushing nodes");
		
		for (var i = 0; i < this.network_elements.length; i++) {
			this.nodes.push(new Node(this.network_elements[i], this.positions));
		}
	} //createNodes
	
	/* creates the links of the network */
	Network.prototype.createLinks = function() {
		//TODO
	} //createLinks
	
	return Network;
})); //define