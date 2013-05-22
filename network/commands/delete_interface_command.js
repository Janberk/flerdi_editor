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
	var DeleteInterfaceCommand = function(node, inf){
		this.node = node;
		this.inf = inf;
	}
	
	/**
	 * This function creates the node
	 */
	DeleteInterfaceCommand.prototype.execute = function(){
		this.inf.notifyAll('remove',{});
		this.node.removeNetworkInterfaceById(this.inf.id);
		this.node.notifyAll('update',{});
	}
	
	/**
	 * This function removes the node
	 */
	DeleteInterfaceCommand.prototype.undo = function(){
		this.node.addNetworkInterface(this.inf);
		this.node.notifyAll('update',{});
	}
	
	return DeleteInterfaceCommand;
})); // define
