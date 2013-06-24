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
	var ProvisioningInterface = function(values) {
		this.base = Observable;
		this.base();
		
		values = values || {};
		this.address = values.address || '';
		this.protocol = values.protocoll || '';
		this.port = values.port || 8080;
		this.username = values.username || '';
		this.password = values.password || '';
	}

	// star extends
	ProvisioningInterface.prototype = new Observable();
	// end extends

	/**
	 * This function returns a JSON-Object, representing this provisioning interface
	 * 
	 * @return JSON-Object representing this feature
	 */
	ProvisioningInterface.prototype.getJson = function() {
		return {
			address : this.address,
			protocol : this.protocol,
			port : this.port,
			username : this.username,
			password : this.password,
		};
	}
	return ProvisioningInterface;
})); // define
