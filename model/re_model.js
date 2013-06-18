/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ 'observable' ], (function(Observable) {

	/**
	 * 
	 * @param values
	 *            all values to build this model
	 */
	var ResourceModel = function(values) {
		this.base = Observable;
		this.base();
		
		values = values || {};
		this.timestamp = values.timestamp || "";
		this.time_unit = values.time_unit || "";
		this.value_type = values.value_type || defaultValues.resource['value_type'];;
		this.the_parent_record_id = values.the_parent_record_id || {};
		this.resource_unit = values.resource_unit || "";
		this.confidence = values.confidence || "";
		this.composing_operation = values.composing_operation || "";
		this.id = values.id || "";
		this.value = values.value || "";
		this.avp_attribute = values.avp_attribute || "";
		this.is_request = values.is_request || defaultValues.resource.valueType;
		this.alias = values.alias || "";
		this.identifier = values.identifier || "";
		this.interval = values.interval || "";
	}

	// star extends
	ResourceModel.prototype = new Observable();
	// end extends

	/**
	 * This function returns a JSON-Object, representing this resource
	 * 
	 * @return JSON-Object representing this resource
	 */
	ResourceModel.prototype.getJson = function() {
		return {
			timestamp : this.timestamp,
			time_unit : this.time_unit,
			value_type : this.value_type,
			the_parent_record_id : this.the_parent_record_id.id,
			resource_unit : this.resource_unit,
			confidence : this.confidence,
			composing_operation : this.composing_operation,
			id : this.id,
			value : this.value,
			avp_attribute : this.avp_attribute,
			is_request : this.is_request,
			alias : this.alias,
			identifier : this.identifier,
			interval : this.interval
		};
	}
	return ResourceModel;
})); // define
