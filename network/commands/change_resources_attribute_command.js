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
	 * @param resources the resources whose attribute is changed
	 * @param attribute the attribute name, given as string
	 * @param value the attibute's new value
	 */
	var ChangeResourcesAttributeCommand = function(resources, attribute, value){
		this.resources = resources;
		this.attribute = attribute;
		this.value = value;
		this.oldValue = this.resources.get(this.attribute);
	}
	
	/**
	 * This function changes the resources value
	 */
	ChangeResourcesAttributeCommand.prototype.execute = function(){	
		this.resources.set(this.attribute, this.value);
	}
	
	/**
	 * This function changes the resources value back
	 */
	ChangeResourcesAttributeCommand.prototype.undo = function(){
		this.resources.set(this.attribute, this.oldValue);
	}
	
	return ChangeResourcesAttributeCommand;
})); // define
