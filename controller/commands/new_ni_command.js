/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * interfaces : IUndoableCommand
 */

define([ "jquery","networkElementModel", "idHandler","networkInterfaceModel" ], 
(function($,NetworkElementModel, IdHandler, Interface) {

	/**
	 * This is the constructor
	 * 
	 * @param network the network
	 * @param json the json of the new node
	 */
	var NewInterfaceCommand = function(node, json){
		this.node = node;
		this.json = json;
		
		// create node
		this.inf = new Interface({});
		this.inf.the_parent_record_id = this.node;
		for(var key in json){
			if(key != "the_parent_record_id" && this.inf[key] !== undefined){
				console.log(key);
				this.inf[key] = this.json[key];
			}
		}
		
	}
	
	/**
	 * This function creates the node
	 */
	NewInterfaceCommand.prototype.execute = function(){
		// add new node to the network
		this.node.addNetworkInterface(this.inf);
		this.node.notifyAll('update',{});
	}
	
	/**
	 * This function removes the node
	 */
	NewInterfaceCommand.prototype.undo = function(){
		// remove the node
		this.node.removeNetworkInterfaceById(this.inf.id);
		this.inf.notifyAll('remove',{});
		this.node.notifyAll('update',{});
	}
	
	return NewInterfaceCommand;
})); // define
