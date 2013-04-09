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
	 * @param node the node whose attribute is changed
	 * @param attribute the attribute name, given as string
	 * @param value the attibute's new value
	 */
	var ChangeNodeAttributeCommand = function(node, attribute, value){
		this.node = node;
		this.attribute = attribute;
		this.value = value;
		this.oldValue = this.node.get(this.attribute);
	}
	
	/**
	 * This function changes the node value
	 */
	ChangeNodeAttributeCommand.prototype.execute = function(){	
		this.node.set(this.attribute, this.value);
	}
	
	/**
	 * This function changes the node value back
	 */
	ChangeNodeAttributeCommand.prototype.undo = function(){
		this.node.set(this.attribute, this.oldValue);
	}
	
	return ChangeNodeAttributeCommand;
})); // define
