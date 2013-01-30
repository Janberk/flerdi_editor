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
			// get the first element
			var firstElement = this.firstElement;
			
			// get an ID for the new link
			var linkId = this.network.getNextElementId().toString();
			
			// get IDs for the interfaces of the new link
			var linkIfId1 = this.network.getNextElementId().toString();
			var linkIfId2 = this.network.getNextElementId().toString();
			
			// get IDs for the new interfaces of the two connected elements
			var elemIfId1 = this.network.getNextElementId().toString();
			var elemIfId2 = this.network.getNextElementId().toString();
			
			// add new interfaces to the elements that get connected
			firstElement.json.network_interfaces.push(
				{attributes:{'id': elemIfId1,
					'network_element_id': firstElement.getId(),
					'network_interface_id': linkIfId1}});
							
			secondElement.json.network_interfaces.push(
				{attributes:{'id': elemIfId2,
					'network_element_id': secondElement.getId(),
					'network_interface_id': linkIfId2}});
			
			// create a json for the new link
			var json = {
				attributes:{'ne_type':this.type}, 

				network_interfaces: [
					{attributes:{'id': linkIfId1,
								'netwok_element_id': linkId,
								'network_interface_id': elemIfId1}},
					{attributes:{'id': linkIfId2,
								'netwok_element_id': linkId,
								'network_interface_id': elemIfId2}}
					],
					
				resources: []
			}
			
			// if this is half duplex
			if(this.symmetric) {
				json.resources.push({attributes:{'avp_attribute': this.type+'/symmetric/bandwidth'}});
			}
			// if this is full duplex
			else {
				json.resources.push({attributes:{'avp_attribute': this.type+'/upstream/bandwidth'}});
				json.resources.push({attributes:{'avp_attribute': this.type+'/downstream/bandwidth'}});
			}
			
			this.network.importLink(json,true);
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
