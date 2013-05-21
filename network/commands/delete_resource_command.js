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
	var DeleteResourceCommand = function(node, resource){
		this.node = node;
		this.resource = resource;
	}
	
	/**
	 * This function creates the node
	 */
	DeleteResourceCommand.prototype.execute = function(){
		this.resource.notifyAll('remove',{});
		this.node.removeResourceById(this.resource.id);
	}
	
	/**
	 * This function removes the node
	 */
	DeleteResourceCommand.prototype.undo = function(){
		this.node.addResource(this.resource);
	}
	
	return DeleteResourceCommand;
})); // define
