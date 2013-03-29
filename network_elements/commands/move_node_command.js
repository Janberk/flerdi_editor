/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ "jquery" ], 
(function($) {

	/**
	 * This is the constructor, obvious
	 * 
	 * @param node reference to the node object you want to move
	 * @param oldPosition position-JSON where the node was
	 * @param newposition position-JSON where the node will be
	 */
	var MoveNodeCommand = function(node, oldPosition, newPosition) {
		this.node = node;
		this.oldPosition = oldPosition;
		this.newPosition = newPosition;
	}
	
	/**
	 * This function moves the node to the new position
	 */
	MoveNodeCommand.prototype.execute = function(){
		this.node.move(this.newPosition);
	}
	
	/**
	 * This functions moves the node to his old position
	 */
	MoveNodeCommand.prototype.undo = function(){
		this.node.move(this.oldPosition);
	}
	
	return MoveNodeCommand;
})); // define
