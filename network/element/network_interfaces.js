/*
 * Author: Flerdi Team
 * RequireJS module definition
 */ 

define (["jquery","features", "resources"], 
(function($, Features, Resources) {
	
	/**
	* This is the constructor
	*
	* @param element NetworkElement this interface is applied to
	* @param json JSON-Object representing all informations, this network interface should have
	*/
	var Network_Interfaces = function(element, json){
		console.log('creating Features');
		this.json = {};
		this.element = element;
		
		this.features = []
		this.resources = []
			
		this.setAttributes(json);
	}
	
	/**
	* This function sets all default values
	*
	* @param json JSON-Object representing all informations for this network interface while creating
	*/
	Network_Interfaces.prototype.setAttributes = function(json){
		this.json.attributes = json.attributes || {};
		
		this.json.attributes.alias = json.attributes.alias || "";
		this.json.attributes.id = json.attributes.id || this.element.getNetwork().getIdHandler().getNextInterfaceId();
		this.json.attributes.identifier = json.attributes.identifier || "";
		this.json.attributes.network_element_id = json.attributes.network_element_id || "";
		this.json.attributes.network_interface_id = json.attributes.network_interface_id || "";
		this.json.attributes.ni_type = json.attributes.ni_type || "";
		
		this.json.attributes_cache = json.attributes_cache || [];
			
		this.json.features = json.features || [];
		for(var i = 0; i<this.json.features.length; i++){
			this.features.push(new Features(this, this.json.features[i]));
		}	
		this.json.features = [];
		
		this.json.resources = json.resources || [];
		for(var i = 0; i<this.json.resources.length; i++){
			this.resources.push(new Resources(this, this.json.resources[i]));
		}
		this.json.resources = [];
	}
	
	/**
	* This function returns a JSON-Object, representing this network interface
	*
	* @return JSON-Object representing this network interface
	*/
	Network_Interfaces.prototype.getJson = function(){
		this.json.resources = this.getResources();
		this.json.features = this.getFeatures();
		return this.json;
	}
	/**
	* This function returns a array of all resources this network interface have
	*
	* @return Array of all resources
	*/
	Network_Interfaces.prototype.getResources = function(){
		var res = []
		for(var i=0;i<this.resources.length; i++){
			res.push(this.resources[i].getJson());
		}
		return res;
	}
	/**
	* This function returns a array of all resources this network interface have
	*
	* @return Array of all features
	*/
	Network_Interfaces.prototype.getFeatures = function(){
		var fet = []
		for(var i=0;i<this.features.length; i++){
			fet.push(this.features[i].getJson());
		}
		return fet;
	}
	
	/**
	 * This function returns the network object from the element this Interface is applied to
	 * 
	 * @return network element from the element this Interface is applied to
	 */
	Network_Interfaces.prototype.getNetwork = function(){
		return this.element.getNetwork();
	}
	
	return Network_Interfaces;
})); //define
