/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the menubar
 */
define (['jquery',"networkOrganisation"],function($, Network) {
	var Move = function(network) {
		this.network = network;
		
		this.changeListeners();
	};
	Move.prototype.changeListeners = function() {
		//abort if this network is undefined
		if(this.network === undefined) return;
	
		//get all nodes from the network
		var nodes = this.network.nodes;
	
		//set eventlistener for all nodes
		for(var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			
			node.removeConnectEvent();
			node.appendMoveEvent();
		}
	};
	Move.prototype.onClick = function() {
		//do nothing, this sets only node listeners
	};
	return Move;
});	
