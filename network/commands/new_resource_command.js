/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * interfaces : IUndoableCommand
 */

define([ "jquery","networkElementModel", "idHandler","resourceModel" ], 
(function($,NetworkElementModel, IdHandler, Resource) {

	/**
	 * This is the constructor
	 * 
	 * @param network the network
	 * @param json the json of the new node
	 */
	var NewResourceCommand = function(node, json){
		this.node = node;
		this.json = json;
		
		// create node
		this.res = new Resource({});
		this.res.the_parent_record_id = this.node;
		for(var key in json){
			if(key != "the_parent_record_id" && this.res[key] !== undefined){
				console.log(key);
				this.res[key] = this.json[key];
			}
		}
		
		console.log(this.res);
		
	}
	
	/**
	 * This function creates the node
	 */
	NewResourceCommand.prototype.execute = function(){
		// add new node to the network
		this.node.addResource(this.res);
	}
	
	/**
	 * This function removes the node
	 */
	NewResourceCommand.prototype.undo = function(){
		// remove the node
		this.node.removeResourceById(this.res.id);
		this.res.notifyAll('remove',{});
	}
	
	return NewResourceCommand;
})); // define
