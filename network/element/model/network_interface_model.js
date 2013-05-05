/*
 * Author: Flerdi Team
 * RequireJS module definition
 */ 

define (['observable'], 
(function(Observable) {
	
	/**
	*
	* @param values all values to build this model
	*/
	var NetworkInterfaceModel = function(values){
		this.ni_type = values.ni_type || "";;
		this.id = values.id || "";
		this.network_interface_id = values.network_interface_id || {};
		this.network_element_id = values.network_element_id || {}; // reference to the network_element, this model belongst to
		this.alias = values.alias || "";
		this.identifier = values.identifier || "";
		
		this.resources = [];
		this.features = [];
		
		this.observable = new Observable();
	}
	
	
	
	/**
	* This function returns a JSON-Object, representing this feature
	*
	* @return JSON-Object representing this feature
	*/
	NetworkInterfaceModel.prototype.getJson = function(){
		return this.json;
	}
	return Features;
})); //define
