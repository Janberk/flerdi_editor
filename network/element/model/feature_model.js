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
	var FeatureModel = function(values){
		values = values || {};
		this.avp_attributes = values.avp_attribute || '';
		this.id = values.id || '';
		this.is_request = values.is_request || '';
		this.priority = values.priority || '';
		this.value = values.value || '';
		
		this.network_element_id = values.network_element_id || {}; // reference to the network_element this feature belongs to
		this.network_interface_id = values.network_interface_id || {};
	}
	
	// star extends
	FeatureModel.prototype = new Observable();
	// end extends
	
	/**
	* This function returns a JSON-Object, representing this feature
	*
	* @return JSON-Object representing this feature
	*/
	FeatureModel.prototype.getJson = function(){
		return this.json;
	}
	return FeatureModel;
})); //define
