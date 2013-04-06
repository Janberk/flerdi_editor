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
	 * @param json the json of the new node
	 * @param pos the position of the new node
	 */
	var NewNodeCommand = function(network, json, pos){
		this.network = network;
		this.json = json;
		this.pos = pos;
	}
	
	/**
	 * This function creates the node
	 */
	NewNodeCommand.prototype.execute = function(){		
		this.node = this.network.importNode(this.json, this.pos, true);
	}
	
	/**
	 * This functions removes the node
	 */
	NewNodeCommand.prototype.undo = function(){
		this.node.removeNode();
	}
	
	return NewNodeCommand;
})); // define
