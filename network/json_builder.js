/*
 * Author: Flerdi Team
 *
 * This class builds JSON representations for new network elements
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery", "networkInterfaceModel"], (function($, NetworkInterfaceModel) {

	var JsonBuilder = function(){
		// empty, functions of this class are 'static'
	}
	
	// returns a json representation of a link that connects the two given network elements
	JsonBuilder.prototype.buildLinkJson = function(elem1, elem2, symmetric){
		// get the types of the elements
		var elemType1 = elem1.ne_type;
		var elemType2 = elem2.ne_type;
		
		// get the type of the network TODO get this by ID
		var network = environment.networks.getNetwork();
		var networkType = network.graph_type;
		
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
		var linkId = network.idHandler.getNextElementId();
		
		// create network interfaces
		var elemIf1 = new NetworkInterfaceModel({
			id: network.idHandler.getNextInterfaceId(),
			network_element_id: elem1
		});
		var elemIf2 = new NetworkInterfaceModel({
			id: network.idHandler.getNextInterfaceId(),
			network_element_id: elem2
		});
		
		// connect the new interfaces
		elemIf1.network_interface_id = elemIf2;
		elemIf2.network_interface_id = elemIf1;
		
		// add new interfaces to the elements that get connected
		elem1.addNetworkInterface(elemIf1);			
		elem2.addNetworkInterface(elemIf2);
		
		// create a json for the new link
		var json = {};
		
		json.attributes = {'ne_type':type};
		
		json.network_interfaces = [
		    {attributes:{
			   'id': network.idHandler.getNextInterfaceId(),
			   'network_element_id': linkId,
			   'network_interface_id': elemIf1}},
			{attributes:{
				'id': network.idHandler.getNextInterfaceId(),
				'network_element_id': linkId,
				'network_interface_id': elemIf2}}
		];
		
		json.resources = [];
		
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