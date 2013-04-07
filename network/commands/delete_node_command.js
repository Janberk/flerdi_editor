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
		this.links = this.node.getLinks();
	}
	
	/**
	 * This function creates the node
	 */
	DeleteNodeCommand.prototype.execute = function(){		
		for(var i=0; i<this.links.length; i++){
			this.links[i].removeLink();
		}
		
		this.node.removeNode();
	}
	
	/**
	 * This function removes the node
	 */
	DeleteNodeCommand.prototype.undo = function(){
		this.network.nodes.push(this.node);
		this.node.appendSvgTag();
		
		for(var i=0; i<this.links.length; i++){
			this.network.links.push(this.links[i]);
			this.links[i].appendSvgTag();
		}
	}
	
	return DeleteNodeCommand;
})); // define
