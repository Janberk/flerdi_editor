/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * interfaces : IUndoableCommand
 */

define([ "jquery", "networkElementModel", "resourceModel", "networkInterfaceModel" ], 
(function($, NetworkElementModel, ResourceModel, NetworkInterfaceModel) {
	
	/**
	 * This is the constructor
	 * 
	 * @param network the network
	 * @param json the json of the new link
	 */
	var NewLinkCommand = function(network, json, elem1, elem2, symmetric){
		this.network = network;
		this.json = json;
		this.elem1 = elem1;
		this.elem2 = elem2;
		this.symmetric = symmetric;
		
		// create element interfaces
		this.elemIf1 = new NetworkInterfaceModel({
			id: this.network.idHandler.getNextInterfaceId(),
			network_element_id: this.elem1
		});
		this.elemIf2 = new NetworkInterfaceModel({
			id: this.network.idHandler.getNextInterfaceId(),
			network_element_id: this.elem2
		});
		
		// create link
		this.link = new NetworkElementModel(this.network);
		
		// set link attributes
		this.link.graph_label = this.network;
		this.link.id = this.json.attributes.id;
		this.link.ne_type = this.json.attributes.ne_type;

		// create link resources
		if(this.symmetric) {
			this.link.addResource(new ResourceModel({
				'id': network.idHandler.getNextResourceId(),
				'avp_attribute': this.link.ne_type+'/symmetric/bandwidth'}));
		}
		else {
			this.link.addResource(new ResourceModel({
				'id': network.idHandler.getNextResourceId(),
				'avp_attribute': this.link.ne_type+'/upstream/bandwidth'}));
			this.link.addResource(new ResourceModel({
				'id': network.idHandler.getNextResourceId(),
				'avp_attribute': this.link.ne_type+'/downstream/bandwidth'}));
		}
		
		var linkIf1 = new NetworkInterfaceModel({
			'id': network.idHandler.getNextInterfaceId(),
			'network_element_id': this.link,
			'network_interface_id': this.elemIf1});
		var linkIf2 = new NetworkInterfaceModel({
			'id': network.idHandler.getNextInterfaceId(),
			'network_element_id': this.link,
			'network_interface_id': this.elemIf2})
		
		// create link interfaces
		this.link.addNetworkInterface(linkIf1);
		this.link.addNetworkInterface(linkIf2);
		
		// connect the new interfaces
		this.elemIf1.network_interface_id = linkIf1;
		this.elemIf2.network_interface_id = linkIf2;
	}
	
	/**
	 * This function creates the link
	 */
	NewLinkCommand.prototype.execute = function(){
		// add new interfaces to the elements that get connected
		this.elem1.addNetworkInterface(this.elemIf1);
		this.elem2.addNetworkInterface(this.elemIf2);
		
		// add new link to the network
		this.network.addNetworkElement(this.link);
		this.controller = controllerFactory.build(this.link, "draw_area");
	}
	
	/**
	 * This function removes the link
	 */
	NewLinkCommand.prototype.undo = function(){		
		// remove the link
		this.network.removeNetworkElement(this.link);
		this.controller.update('remove',{});

		// remove the interfaces
		this.elem1.removeNetworkInterfaceById(this.elemIf1.id);
		this.elem2.removeNetworkInterfaceById(this.elemIf2.id);
	}
	
	return NewLinkCommand;
})); // define
