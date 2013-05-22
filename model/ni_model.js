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
		values = values || {};
		this.ni_type = values.ni_type || "";
		this.id = values.id || "";
		this.network_interface_id = values.network_interface_id || {};
		// reference to then interface_model,"on the other side"
		this.network_element_id = values.network_element_id || {};
		// reference to the network element , this interface belongs to to the
		// network_element, this model belongs to
		this.alias = values.alias || "";
		this.identifier = values.identifier || "";

		this.resources = [];
		this.features = [];
	}

	// star extends
	NetworkInterfaceModel.prototype = new Observable();
	// end extends

	NetworkInterfaceModel.prototype.addResource = function(resource) {
		this.resources.push(resource);
	}

	NetworkInterfaceModel.prototype.addFeature = function(feature) {
		this.features.push(feature);
	}

	NetworkInterfaceModel.prototype.removeResource = function(resource) {
		for ( var i = 0; i < this.resources.length; i++) {
			if (this.resources[i] === resource) {
				this.resources.splice(i, 1);
				break;
			}
		}
	}

	NetworkInterfaceModel.prototype.removeFeature = function(feature) {
		for ( var i = 0; i < this.features.length; i++) {
			if (this.features[i] === feature) {
				this.features.splice(i, 1);
				break;
			}
		}
	}

	/**
	 * This function returns a JSON-Object, representing this network interface
	 * 
	 * @return JSON-Object representing this network interface
	 */
	NetworkInterfaceModel.prototype.getJson = function() {
		return {
			ni_type : this.ni_type,
			id : this.id,
			network_interface_id : this.network_interface_id.id,
			network_element_id : this.network_element_id.id,
			identifier : this.identifier,
		}
	}
	return NetworkInterfaceModel;
})); // define
