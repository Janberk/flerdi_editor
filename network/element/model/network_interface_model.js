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
	var NetworkInterfaceModel = function(values) {
		this.ni_type = values.ni_type || "";
		;
		this.id = values.id || "";
		this.network_interface_id = values.network_interface_id || {};
		this.network_element_id = values.network_element_id || {}; // reference
		// to the
		// network_element,
		// this
		// model
		// belongst
		// to
		this.alias = values.alias || "";
		this.identifier = values.identifier || "";

		this.resources = [];
		this.features = [];

		this.observable = new Observable();
	}

	NetworkInterfaceModel.prototype.addResource = function(resource) {
		this.resources.push(resource);
	}

	NetworkInterfaceModel.prototype.addFeature = function(feature) {
		this.features.push(feature);
	}

	NetworkInterfaceMolde.prototype.removeResource = function(resource) {
		for ( var i = 0; i < this.resources.length; i++) {
			if (this.resources[i] === resource) {
				this.resources.splice(i, 1);
				break;
			}
		}
	}

	NetworkInterfaceMolde.prototype.removeFeature = function(feature) {
		for ( var i = 0; i < this.features.length; i++) {
			if (this.features[i] === feature) {
				this.features.splice(i, 1);
				break;
			}
		}
	}

	/**
	 * This function returns a JSON-Object, representing this feature
	 * 
	 * @return JSON-Object representing this feature
	 */
	NetworkInterfaceModel.prototype.getJson = function() {
		return this.json;
	}
	return Features;
})); // define
