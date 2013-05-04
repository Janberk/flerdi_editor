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
	var DeleteNodeCommand = function(network, node){
		this.network = network;
		this.node = node;
		console.log(this.node);
	}
	
	/**
	 * This function creates the node
	 */
	DeleteNodeCommand.prototype.execute = function(){
		this.node.observable.notifyAll('remove',{});
		this.network.removeNetworkElementById(this.node.id);
	}
	
	/**
	 * This function removes the node
	 */
	DeleteNodeCommand.prototype.undo = function(){
		this.network.addNetworkElement(this.node);
		ControllerFactory.build(this.node,"draw_area");
		
		console.log(this.network);
	}
	
	return DeleteNodeCommand;
})); // define
