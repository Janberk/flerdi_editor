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
	 * @param node the node whose type is changed
	 * @param type the new node type 
	 */
	var NewNodeTypeCommand = function(node, type){
		this.node = node;
		this.type = type;
		this.old_type = this.node.getJson().attributes.ne_type;
		console.log("COMMAND ACTIVATED!");
	}
	
	/**
	 * This function changes the node type
	 */
	NewNodeTypeCommand.prototype.execute = function(){	
		this.node.set('ne_type', this.type);
	}
	
	/**
	 * This function changes the node type back
	 */
	NewNodeTypeCommand.prototype.undo = function(){
		this.node.set('ne_type', this.old_type);
	}
	
	return NewNodeTypeCommand;
})); // define
