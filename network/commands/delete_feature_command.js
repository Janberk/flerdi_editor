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
	var DeleteFeatureCommand = function(node, feature){
		this.node = node;
		this.feature = feature;
	}
	
	/**
	 * This function creates the node
	 */
	DeleteFeatureCommand.prototype.execute = function(){
		this.feature.notifyAll('remove',{});
		this.node.removeFeatureById(this.feature.id);
		this.node.notifyAll('update',{});
	}
	
	/**
	 * This function removes the node
	 */
	DeleteFeatureCommand.prototype.undo = function(){
		this.node.addFeature(this.feature);
		this.node.notifyAll('update',{});
	}
	
	return DeleteFeatureCommand;
})); // define
