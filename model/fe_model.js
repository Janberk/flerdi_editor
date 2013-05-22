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
	var FeatureModel = function(values) {
		values = values || {};
		this.avp_attributes = values.avp_attributes || '';
		this.id = values.id || '';
		this.is_request = values.is_request || '';
		this.priority = values.priority || '';
		this.value = values.value || '';

		this.network_element_id = values.network_element_id || {}; // reference
		// to the
		// network_element
		// this
		// feature
		// belongs
		// to
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
	FeatureModel.prototype.getJson = function() {
		return {
			avp_attributes : this.avp_attributes,
			id : this.id,
			is_request : this.is_request,
			priority : this.priority,
			value : this.value,
			network_element_id : this.network_element_id.id,
			network_interface_id : this.network_interface_id.id,
		};
	}
	return FeatureModel;
})); // define
