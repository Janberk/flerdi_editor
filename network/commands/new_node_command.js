/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * interfaces : IUndoableCommand
 */

define([ "jquery","networkElementModel" ], 
(function($,NetworkElementModel) {

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
		
		// create node
		this.node = new NetworkElementModel(this.network);
		
		// set node attributes
		this.node.graph_label = this.network;
		this.node.id = this.network.idHandler.getNextElementId();
		this.node.x = this.pos.x;
		this.node.y = this.pos.y;
		this.node.ne_type = this.json.attributes.ne_type;
	}
	
	/**
	 * This function creates the node
	 */
	NewNodeCommand.prototype.execute = function(){
		// add new node to the network
		this.network.addNetworkElement(this.node);
		controllerFactory.build(this.node,"draw_area");
	}
	
	/**
	 * This function removes the node
	 */
	NewNodeCommand.prototype.undo = function(){
		// remove the node
		this.network.removeNetworkElement(this.node);
		this.node.notifyAll('remove',{});
	}
	
	return NewNodeCommand;
})); // define
