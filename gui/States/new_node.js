/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the menubar
 */
define (['jquery',"networkOrganisation"],function($, Network) {
	var NewNode = function(network,src) {
		this.network = network;
		this.type = src;
		
		this.changeListeners();
	};
	NewNode.prototype.changeListeners = function() {
		//abort if this network is undefined
		if(this.network === undefined) return;
	
		//get all nodes from the network
		var nodes = this.network.nodes;
	
		//set eventlistener for all nodes
		for(var i = 0; i < nodes.length; i++) {
			var node = nodes[i];
			
			node.removeMoveEvent();
			node.removeConnectEvent();
		}
	};
	NewNode.prototype.onClick = function(e) {
		//TODO replace 25 and 25 by node-width/2 and node-height/2
		var pos = {x:e.pageX-31-25, y:e.pageY-31-25}
		var json = {attributes:{'ne_type':this.type}};
		
		var id = this.network.importNode(json,pos,true);
		
	};
	return NewNode;
});	
