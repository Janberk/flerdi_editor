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
	var ResourceModel = function(values){
		values = values || {};
		this.timestamp = values.timestamp || "";
		this.time_unit = values.time_unit || "";
		this.value_type = values.value_type || "";
		this.the_parent_record_id = values.the_parent_record_id || {}; // reference to network_element this model belongs to
		this.resource_unit = values.resource_unit || "";
		this.confidence = values.confidence || "";
		this.composing_operation = values.composing_operation || "";
		this.id = values.id || "";
		this.value = values.value || "";
		this.avp_attribute = values.avp_attribute || "";
		this.is_request = values.is_request || "";
		this.alias = values.alias || "";
		this.identifier = values.identifier || "";
		this.interval = values.interval || "";
		
		this.observable = new Observable();
	}
	
	/**
	* This function returns a JSON-Object, representing this resource
	*
	* @return JSON-Object representing this resource
	*/
	ResourceModel.prototype.getJson = function(){
		return this.json;
	}
	return ResourceModel;
})); //define
