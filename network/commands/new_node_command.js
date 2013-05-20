/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * interfaces : IUndoableCommand
 */

define([ "jquery","networkElementModel", "idHandler" ], 
(function($,NetworkElementModel, IdHandler) {

	/**
	 * This is the constructor
	 * 
	 * @param network the network
	 * @param json the json of the new node
	 * @param pos the position of the new node
	 * @param showInAtttributesView if true this node will be shown in a attributes view, to edit the attributes after edeting
	 */
	var NewNodeCommand = function(network, json, pos, showInAttributesView){
		this.network = network;
		this.json = json;
		this.pos = pos;
		
		if(showInAttributesView === undefined){
			this.showInAttributesView = false;
		}else if(showInAttributesView == true){
			this.showInAttributesView = true;
		}else{
			this.showInAttributesView = false;
		}
		
		// create node
		this.node = new NetworkElementModel(this.network);
		
		// set node attributes
		this.node.graph_label = this.network;
		this.node.id = this.json.attributes.id;
		this.node.ne_type = this.json.attributes.ne_type;
		this.node.x = this.pos.x;
		this.node.y = this.pos.y;
		
		if (this.showInAttributesView == true) {
			this.node.alias = "";
			if (this.node.ne_type.indexOf("/node/host/") != -1) {
				this.node.identifier = "{host}" + this.network.idHandler.getNextHostIdentifierId();
			} else if (this.node.ne_type.indexOf("/node/switch/") != -1) {
				this.node.identifier = "{switch}" + this.network.idHandler.getNextSwitchIdentifierId();
			}			
		}		
	}
	
	/**
	 * This function creates the node
	 */
	NewNodeCommand.prototype.execute = function(){
		// add new node to the network
		this.network.addNetworkElement(this.node);
		this.controller = controllerFactory.build(this.node,"draw_area");
		if(this.showInAttributesView){
			controllerFactory.build(this.node,"networkElementAttributes");
			this.showInAttributesView = false;
		}
	}
	
	/**
	 * This function removes the node
	 */
	NewNodeCommand.prototype.undo = function(){
		// remove the node
		this.network.removeNetworkElement(this.node);
		this.controller.update('remove',{});
	}
	
	return NewNodeCommand;
})); // define
