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
	}
	
	/**
	 * This function creates the node
	 */
	DeleteNodeCommand.prototype.execute = function(){		
		this.node.removeNode();
	}
	
	/**
	 * This function removes the node
	 */
	DeleteNodeCommand.prototype.undo = function(){
		this.network.nodes.push(this.node);
		this.node.appendSvgTag();
	}
	
	return DeleteNodeCommand;
})); // define
