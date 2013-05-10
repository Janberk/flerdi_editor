/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * interfaces : IUndoableCommand
 * 
 * This is a all-purpose command. It dosn'care which model to change, or what values to change
 */

define([ "jquery" ], 
(function($) {

	/**
	 * This is the constructor
	 * 
	 * @param model reference to the model
	 * @param values JSON of all values youw ant to change
	 */
	var ChangeAttributesCommand = function(model, values ){
		this.model = model;
		this.newValues = {};
		this.oldValues = {};
		
		// check every value if there is a corresponding value in the model
		for(var key in values){
			if(this.model[key] === undefined){
				console.log( "attribute '" + key + "' not supported");
			}else{
				this.newValues[key] = values[key];
				this.oldValues[key] = this.model[key];
			}
		}
	}
	
	/**
	 * This function changes the attributes
	 */
	ChangeAttributesCommand.prototype.execute = function(){
		for(var key in this.newValues){
			this.model[key] = this.newValues[key];
		}
		this.model.notifyAll("update",{});
	}
	
	/**
	 * This function changes the attributes back
	 */
	ChangeAttributesCommand.prototype.undo = function(){
		for(var key in this.newValues){
			this.model[key] = this.oldValues[key];
		}
		this.model.notifyAll("update",{});
	}
	
	return ChangeAttributesCommand;
})); // define
