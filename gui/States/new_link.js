/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the menubar
 */
define (['jquery',"networkOrganisation"],function($, Network) {
	var NewLink = function(network,src,symmetric) {
		this.network = network;
		this.type = src;
		this.symmetric = symmetric;
		
		// save the first element(node or link) in order to connect it to the second element
		this.firstElement;
		
		this.changeListeners();
	};
	NewLink.prototype.changeListeners = function() {
		//abort if this network is undefined
		if(this.network === undefined) return;
	
		//get all nodes from the network
		var nodes = this.network.nodes;

		//set eventlistener for all nodes
		for(var i = 0; i < nodes.length; i++) {
			var node = nodes[i];

			node.removeMoveEvent();
			node.appendConnectEvent(this);
		}
	};
	
	// sets the first element, which is used when the second element is set
	NewLink.prototype.setFirstElement = function(firstElement) {
		this.firstElement = firstElement;
	}
	
	// sets the second element, tries to connect it to the first element
	NewLink.prototype.setSecondElement = function(secondElement) {
		// elements can't get connected to nothing or themselves
		if(this.firstElement !== undefined && this.firstElement !== secondElement)
		{
			var json;
			
			// if this is half duplex
			if(this.symmetric) {
				json = {
					attributes:{'ne_type':this.type}, 

					resources: [
						{attributes:{'avp_attribute': '/symmetric/bandwidth'}}
					]
				};
			}
			
			// if this is full duplex
			else {
				json = {
					attributes:{'ne_type':this.type}, 

					resources: [
						{attributes:{'avp_attribute': '/upstream/bandwidth'}},
						{attributes:{'avp_attribute': '/downstream/bandwidth'}}
					]
				};
			}
				
			this.network.importLink(json);
		}
			
		// set the first element back to normal
		this.firstElement = undefined;
	}
	
	// draws a dummy line to show what gets connected
	NewLink.prototype.drawDummyLine = function(element) {
		
	}
	
	NewLink.prototype.onClick = function(e) {
		//do nothing, this sets only node and link listeners
	};
	return NewLink;
});	
