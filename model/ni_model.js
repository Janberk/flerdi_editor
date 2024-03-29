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
		this.base = Observable;
		this.base();
		
		values = values || {};
		this.alias = values.alias || "";
		this.id = values.id || "";
		this.identifier = values.identifier || "";
		this.network_element_id = values.network_element_id || {}; // reference to the network element, this interface belongs to
		this.network_interface_id = values.network_interface_id || {}; // reference to then interface_model "on the other side"
		this.ni_type = values.ni_type || "";
		
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
			alias : this.alias,
			id : this.id,
			identifier : this.identifier,
			network_element_id : this.network_element_id.id,
			network_interface_id : this.network_interface_id.id,
			ni_type : this.ni_type
		}
	}
	return NetworkInterfaceModel;
})); // define
