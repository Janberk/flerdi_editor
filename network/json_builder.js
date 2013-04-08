/*
 * Author: Flerdi Team
 *
 * This class builds JSON representations for new network elements
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery"], (function($) {

	var JsonBuilder = function(){
		// empty, functions of this class are 'static'
	}
	
	// returns a json representation of a link that connects the two given network elements
	JsonBuilder.prototype.buildLinkJson = function(elem1, elem2, network, symmetric){
		// get the types of the elements
		var elemType1 = elem1.json.attributes.ne_type;
		var elemType2 = elem2.json.attributes.ne_type;
		
		// get the type of the network
		var networkType = network.elements['--- !yaml.org,2002'].attributes.graph_type;
		
		// determine the type of the new link
		var type;
		
		// in OL graphs, connections with '/node/host/pip' nodes must be '/link/transit' + '/link/generic' links
		if(networkType == 'OL' && (elemType1 == '/node/host/pip' || elemType2 == '/node/host/pip')) {
			type = '/link/transit';
		}
		// in UL graphs, connections between '/node/host/tunnelbridge' and '/node/host/pip' nodes must be '/link/transit' links
		else if(networkType == 'UL' && ((elemType1 == '/node/host/tunnelbridge' && elemType2 == '/node/host/pip') || (elemType1 == '/node/host/pip' && elemType2 == '/node/host/tunnelbridge'))) {
			type = '/link/transit';
		}
		// in any other case, connections must be '/link/generic' links
		else {
			type = '/link/generic';
		}
		
		// get an ID for the new link
		var linkId = network.getIdHandler().getNextElementId();
		
		// get IDs for the interfaces of the new link
		var linkIfId1 = network.getIdHandler().getNextInterfaceId();
		var linkIfId2 = network.getIdHandler().getNextInterfaceId();
			
		// get IDs for the new interfaces of the two connected elements
		var elemIfId1 = network.getIdHandler().getNextInterfaceId();
		var elemIfId2 = network.getIdHandler().getNextInterfaceId();
		
		// add new interfaces to the elements that get connected
		elem1.addNetworkInterfaceByJSON({attributes:{'id': elemIfId1,
			'network_element_id': elem1.getId(),
			'network_interface_id': linkIfId1}});
					
		elem2.addNetworkInterfaceByJSON({attributes:{'id': elemIfId2,
			'network_element_id': elem2.getId(),
			'network_interface_id': linkIfId2}});
		
		
		// create a json for the new link
		var json = {
			attributes:{'ne_type':type}, 

			network_interfaces: [
				{attributes:{'id': linkIfId1,
							'network_element_id': linkId,
							'network_interface_id': elemIfId1}},
				{attributes:{'id': linkIfId2,
							'network_element_id': linkId,
							'network_interface_id': elemIfId2}}
				],

			resources: []
		}
		
		// if this is half duplex
		if(symmetric) {
			json.resources.push(
			{attributes:{
						'timestamp': '',
						'time_unit': '',
						'value_type': '',
						'resource_unit': '',
						'confidence': '',
						'composing_operation': '',
						'id': '',
						'value': '',
						'avp_attribute': type+'/symmetric/bandwidth',
						'alias': '',
						'interval': ''}});
		}
		// if this is full duplex
		else {
			json.resources.push(
			{attributes:{
						'timestamp': '',
						'time_unit': '',
						'value_type': '',
						'resource_unit': '',
						'confidence': '',
						'composing_operation': '',
						'id': '',
						'value': '',
						'avp_attribute': type+'/upstream/bandwidth',
						'alias': '',
						'interval': ''}});
						
			json.resources.push(
			{attributes:{
						'timestamp': '',
						'time_unit': '',
						'value_type': '',
						'resource_unit': '',
						'confidence': '',
						'composing_operation': '',
						'id': '',
						'value': '',
						'avp_attribute': type+'/downstream/bandwidth',
						'alias': '',
						'interval': ''}});
		}
		
		return json;
	}
	
	return JsonBuilder;
})); //define