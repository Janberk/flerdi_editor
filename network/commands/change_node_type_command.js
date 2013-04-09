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
	 * @param node the node whose type is changed
	 * @param type the new node type 
	 */
	var ChangeNodeTypeCommand = function(node, type){
		this.node = node;
		this.type = type;
		this.oldType = this.node.getJson().attributes.ne_type;
	}
	
	/**
	 * This function changes the node type
	 */
	ChangeNodeTypeCommand.prototype.execute = function(){	
		this.node.set('ne_type', this.type);
	}
	
	/**
	 * This function changes the node type back
	 */
	ChangeNodeTypeCommand.prototype.undo = function(){
		this.node.set('ne_type', this.oldType);
	}
	
	return ChangeNodeTypeCommand;
})); // define
