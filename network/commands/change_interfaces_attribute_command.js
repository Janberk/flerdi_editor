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
	 * @param network_interfaces the network_interfaces whose attribute is changed
	 * @param attribute the attribute name, given as string
	 * @param value the attibute's new value
	 */
	var ChangeInterfacesAttributeCommand = function(network_interfaces, attribute, value, inputElement){
		this.network_interfaces = network_interfaces;
		this.attribute = attribute;
		this.value = value;
		this.oldValue = this.network_interfaces.get(this.attribute);
		this.inputElement = inputElement;
	}
	
	/**
	 * This function changes the interfaces value
	 */
	ChangeInterfacesAttributeCommand.prototype.execute = function(){	
		this.network_interfaces.set(this.attribute, this.value);
		this.inputElement.val(this.value);
	}
	
	/**
	 * This function changes the interfaces value back
	 */
	ChangeInterfacesAttributeCommand.prototype.undo = function(){
		this.network_interfaces.set(this.attribute, this.oldValue);
		this.inputElement.val(this.oldValue);
	}
	
	return ChangeInterfacesAttributeCommand;
})); // define
