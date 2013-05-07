/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * interfaces : IUndoableCommand
 */

define([ "jquery","networkElementModel" ], 
(function($,NetworkElementModel) {

	/**
	 * This is the constructor
	 * 
	 * @param network the network
	 * @param json the json of the new link
	 */
	var NewLinkCommand = function(network, json){
		this.network = network;
		this.json = json;
		this.link = new NetworkElementModel(this.network);
	}
	
	/**
	 * This function creates the link
	 */
	NewLinkCommand.prototype.execute = function(){
		this.link.resources = this.json.resources;
		this.link.network_interfaces = this.json.network_interfaces;
		this.link.graph_label = this.network;
		this.link.ne_type = this.json.attributes.ne_type;
		this.network.addNetworkElement(this.link);
		controllerFactory.build(this.link,"draw_area");
	}
	
	/**
	 * This function removes the link
	 */
	NewLinkCommand.prototype.undo = function(){
		this.network.removeNetworkElement(this.link);
		this.link.observable.notifyAll('remove',{});
	}
	
	return NewLinkCommand;
})); // define
