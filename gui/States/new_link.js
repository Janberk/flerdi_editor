/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the menubar
 */
define (['jquery',"networkOrganisation"],function($, Network) {
	var NewLink = function(network,symmetric) {
		this.network = network;
		this.symmetric = symmetric;
		this.type;
		
		// save the first element(node or link) in order to connect it to the second element
		this.firstElement;
		
		// draw a dummy line
		this.dummy;
		
		this.changeListeners();
	}
	
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
	}
	
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
			
			// TODO this.type = '/link/transit' || '/link/generic'
			
			// get the types of the elements
			var elementType1 = firstElement.json.attributes.ne_type;
			var elementType2 = secondElement.json.attributes.ne_type;
			
			// get the type of the network
			var networkType = this.network.elements['--- !yaml.org,2002'].attributes.graph_type;
			
			// in OL graphs, connections with '/node/host/pip' nodes must be '/link/transit' + '/link/generic' links
			if(networkType == 'OL' && (elementType1 == '/node/host/pip' || elementType2 == '/node/host/pip')) {
				this.type = '/link/transit';
			}
			// in UL graphs, connections between '/node/host/tunnelbridge' and '/node/host/pip' nodes must be '/link/transit' links
			else if(networkType == 'UL' && ((elementType1 == '/node/host/tunnelbridge' && elementType2 == '/node/host/pip') || (elementType1 == '/node/host/pip' && elementType2 == '/node/host/tunnelbridge'))) {
				this.type = '/link/transit';
			}
			// in any other case, connections must be '/link/generic' links
			else {
				this.type = '/link/generic';
			}
			
			// get an ID for the new link
			var linkId = this.network.getNextElementId();
			
			// get IDs for the interfaces of the new link
			var linkIfId1 = this.network.getNextElementId();
			var linkIfId2 = this.network.getNextElementId();
			
			// get IDs for the new interfaces of the two connected elements
			var elemIfId1 = this.network.getNextElementId();
			var elemIfId2 = this.network.getNextElementId();
			
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
				json.resources.push(
				{attributes:{
							'timestamp': '',
							'time_unit': '',
							'value_type': '',
							'the_parent_record_id': '',
							'resource_unit': '',
							'confidence': '',
							'composing_operation': '',
							'id': '',
							'value': '',
							'avp_attribute': this.type+'/symmetric/bandwidth',
							'is_request': '',
							'alias': '',
							'identifier': '',
							'interval': ''}});
			}
			// if this is full duplex
			else {
				json.resources.push(
				{attributes:{
							'timestamp': '',
							'time_unit': '',
							'value_type': '',
							'the_parent_record_id': '',
							'resource_unit': '',
							'confidence': '',
							'composing_operation': '',
							'id': '',
							'value': '',
							'avp_attribute': this.type+'/upstream/bandwidth',
							'is_request': '',
							'alias': '',
							'identifier': '',
							'interval': ''}});
							
				json.resources.push(
				{attributes:{
							'timestamp': '',
							'time_unit': '',
							'value_type': '',
							'the_parent_record_id': '',
							'resource_unit': '',
							'confidence': '',
							'composing_operation': '',
							'id': '',
							'value': '',
							'avp_attribute': this.type+'/downstream/bandwidth',
							'is_request': '',
							'alias': '',
							'identifier': '',
							'interval': ''}});
			}
			
			this.network.importLink(json,true);
		}
			
		// set the first element back to normal
		this.firstElement = undefined;
	}
	
	// create a dummy line
	NewLink.prototype.createDummyLine = function(element, event) {
		this.dummy = document.createElementNS("http://www.w3.org/2000/svg", "line");
		
		var linkStyle;
		
		switch (this.type) {
			case "/link/generic":
				linkStyle = "stroke:rgb(115,62,145);"; break; //#733e91
			case "/link/transit" :
				linkStyle = "stroke:rgb(81,188,190);"; break; //#51bcbe
			default:
				linkStyle = "stroke:rgb(0,0,0);"; break; //#000000
		}

		if(this.symmetric) {
			linkStyle = linkStyle + "stroke-width:2"; //half-duplex-link
		}
		else {
			linkStyle = linkStyle + "stroke-width:4"; //full-duplex-link
		}

		this.dummy.setAttribute("style", linkStyle);
		this.dummy.setAttribute("opacity", 0.5);
		
		this.updateDummyLine(element, event);
		
		// add dummy to document
		document.getElementById('links').appendChild(this.dummy);
	}
	
	// update the postion of the dummy line
	NewLink.prototype.updateDummyLine = function(element, event) {
		// TODO replace standart values
		this.dummy.setAttribute("x1", element.position.x+25);
		this.dummy.setAttribute("y1", element.position.y+25);
		this.dummy.setAttribute("x2", event.offsetX);
		this.dummy.setAttribute("y2", event.offsetY);
	}
	
	NewLink.prototype.deleteDummyLine = function() {
		// delete the dummy link
		document.getElementById('links').removeChild(this.dummy);
	}
	
	NewLink.prototype.onClick = function(e) {
		//do nothing, this sets only node and link listeners
	}
	return NewLink;
});	