/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * interfaces : IUndoableCommand
 */

define([ "jquery","networkElementModel", "idHandler","featureModel" ], 
(function($,NetworkElementModel, IdHandler, Feature) {

	/**
	 * This is the constructor
	 * 
	 * @param network the network
	 * @param json the json of the new node
	 */
	var NewFeatureCommand = function(node, json){
		this.node = node;
		this.json = json;
		
		// create node
		this.fet = new Feature({});
		this.fet.network_element_id = this.node;
		for(var key in json){
			if(key != "the_parent_record_id" && this.fet[key] !== undefined){
				this.fet[key] = this.json[key];
			}
		}
		
	}
	
	/**
	 * This function creates the node
	 */
	NewFeatureCommand.prototype.execute = function(){
		// add new node to the network
		this.node.addFeature(this.fet);
		this.node.notifyAll('update',{});
	}
	
	/**
	 * This function removes the node
	 */
	NewFeatureCommand.prototype.undo = function(){
		// remove the node
		this.node.removeFeatureById(this.fet.id);
		this.fet.notifyAll('remove',{});
		this.node.notifyAll('update',{});
	}
	
	return NewFeatureCommand;
})); // define
