/*
 * Module node: represents a single node in the network
 * Author: Flerdi Team, Kai Müller
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery", "node_visualisation"], (function($, Node_Visualisation) {

	/* constructor */
	var Node = function(network_element, positions) {
		console.log("creating node");
		
		this.id = network_element.attributes.id;
		this.type = network_element.attributes.ne_type;
		this.position = new Array(Math.floor(Math.random() * 501), Math.floor(Math.random() * 501));
		this.x = Math.floor(Math.random() * 501);
		this.y = Math.floor(Math.random() * 501);
		if (positions != undefined) {
			this.readPosition(positions);
		}
		this.visualisation = new Node_Visualisation(this.position, this.type);
		this.visualisation.show();
	} //constructor
	
	/* overrides the random position if one is given */
	Node.prototype.readPosition = function(positions) {
		for (var i = 0; i < positions.length; i++) {
			if (positions[i].attributes.id == this.id) {
				this.position[0] = positions[i].attributes.x;
				this.position[1] = positions[i].attributes.y;
				break;
			}
		}
	} //readPosition
	
	return Node;
})); //define