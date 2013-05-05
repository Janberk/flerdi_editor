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
	 * @param node the deleted node
	 */
	var DeleteNodeCommand = function(network, model){
		this.network = network;
		this.model = model;
	}
	
	/**
	 * This function creates the node
	 */
	DeleteNodeCommand.prototype.execute = function(){
		this.model.observable.notifyAll('remove',{});
		this.network.removeNetworkElement(this.model);
	}
	
	/**
	 * This function removes the node
	 */
	DeleteNodeCommand.prototype.undo = function(){
		this.network.addNetworkElement(this.model);
		controllerFactory.build(this.model,"draw_area");
	}
	
	return DeleteNodeCommand;
})); // define
