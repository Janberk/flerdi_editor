/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * interfaces : IUndoableCommand
 */

define([ "jquery","networkElementModel","controllerFactory" ], 
(function($,NetworkElementModel,ControllerFactory) {

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
		this.node;
	}
	
	/**
	 * This function creates the node
	 */
	NewNodeCommand.prototype.execute = function(){		
		this.node = new NetworkElementModel();
		this.node.x = this.pos.x;
		this.node.y = this.pos.y;
		this.node.ne_type = this.json.attributes.ne_type;
		console.log(this.json.attributes);
		
		
		this.network.addNetworkElement(this.node);
		ControllerFactory.build(this.node,"draw_area");
		//this.node = this.network.importNode(this.json, this.pos, true);
		//this.network.calcSizeOfSvg();
	}
	
	/**
	 * This function removes the node
	 */
	NewNodeCommand.prototype.undo = function(){
		this.node.removeNode();
	}
	
	return NewNodeCommand;
})); // define
