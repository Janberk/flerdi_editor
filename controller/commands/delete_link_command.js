/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * interfaces : IUndoableCommand
 */

define([ "jquery" ], 
(function($) {

	/**
	 * This is the constructor
	 * 
	 * @param network the network
	 * @param link the deleted link
	 */
	var DeleteLinkCommand = function(network, model){
		this.network = network;
		this.model = model;
	}
	
	/**
	 * This function creates the link
	 */
	DeleteLinkCommand.prototype.execute = function(){
		this.model.notifyAll('remove',{});
		this.network.removeNetworkElement(this.model);
	}
	
	/**
	 * This function removes the link
	 */
	DeleteLinkCommand.prototype.undo = function(){
		this.network.addNetworkElement(this.model);
		controllerFactory.build(this.model,"draw_area");
	}
	
	return DeleteLinkCommand;
})); // define
