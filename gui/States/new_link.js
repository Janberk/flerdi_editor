/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the menubar
 */
define (['jquery',"networkOrganisation"],function($, Network) {
	var NewLink = function(network,src) {
		this.network = network;
		this.type = src;
		
		this.removeMoveEvents();
	};
	NewLink.prototype.removeMoveEvents = function() {
		//abort if this network is undefined
		if(this.network === undefined) return;
	
		//get all nodes from the network
		var nodes = this.network.nodes;
	
		//set eventlistener for all nodes
		for(var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			
			node.removeMoveEvent();
		}
	};
	NewLink.prototype.onClick = function(e) {
		//TODO maybe delete this and add a onDrag method instead
	};
	return NewLink;
});	
