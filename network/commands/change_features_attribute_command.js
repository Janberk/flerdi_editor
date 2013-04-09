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
	 * @param features the features whose attribute is changed
	 * @param attribute the attribute name, given as string
	 * @param value the attibute's new value
	 */
	var ChangeFeaturesAttributeCommand = function(features, attribute, value){
		this.features = features;
		this.attribute = attribute;
		this.value = value;
		this.oldValue = this.features.get(this.attribute);
	}
	
	/**
	 * This function changes the features value
	 */
	ChangeFeaturesAttributeCommand.prototype.execute = function(){	
		this.features.set(this.attribute, this.value);
	}
	
	/**
	 * This function changes the features value back
	 */
	ChangeFeaturesAttributeCommand.prototype.undo = function(){
		this.features.set(this.attribute, this.oldValue);
	}
	
	return ChangeFeaturesAttributeCommand;
})); // define
