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
		this.json.attributes.identifier = json.attributes.identifier || this.element.getNetwork().getIdHandler().getNextIdentifierId();
		this.json.attributes.network_element_id = json.attributes.network_element_id || this.element.getJson().attributes.id ;
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
	* This function sets a specific value
	*
	* @param attribute the attribute name, given as string
	* @param value the attibute's new value
	*/
	Network_Interfaces.prototype.set = function(attribute, value) {
		switch (attribute) {
			case 'alias': {
				this.json.attributes.alias = value;
				break;
			}
			case 'id': {
				this.json.attributes.id = value;
				break;
			}
			case 'identifier': {
				this.json.attributes.identifier = value;
				break;
			}
			case 'network_element_id': {
				this.json.attributes.network_element_id = value;
				break;
			}
			case 'network_interface_id': {
				this.json.attributes.network_interface_id = value;
				break;
			}
			case 'ni_type': {
				this.json.attributes.ni_type = value;
				break;
			}
			case 'attributes_cache': {
				this.json.attributes_cache = value;
				break;
			}
			default: throw new Error("Attribute "+attribute+" not found.");
		}
	}
	
	/**
	* This function gets a specific value
	*
	* @param attribute the attribute name, given as string
	*/
	Network_Interfaces.prototype.get = function(attribute) {
		switch (attribute) {
			case 'alias': {
				return this.json.attributes.alias;
			}
			case 'id': {
				return this.json.attributes.id;
			}
			case 'identifier': {
				return this.json.attributes.identifier;
			}
			case 'network_element_id': {
				return this.json.attributes.network_element_id;
			}
			case 'network_interface_id': {
				return this.json.attributes.network_interface_id;
			}
			case 'ni_type': {
				return this.json.attributes.ni_type;
			}
			case 'attributes_cache': {
				return this.json.attributes_cache;
			}
			default: throw new Error("Attribute "+attribute+" not found.");
		}
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
	
	/**
	* This function adds a new Feature to this Interface
	* 
	* @param json JSON-representation of this Feature
	*/
	Network_Interfaces.prototype.addFeatureByJSON = function(json) {
		var feature = new Features(this, json);
		this.features.push(feature);
				
		return feature;
	}

	/**
	* This function adds a new Resource to this Interface
	* 
	* @param json JSON-representation of this Resource
	*/
	Network_Interfaces.prototype.addResourceByJSON = function(json) {
		var resource = new Resources(this, json);
		this.resources.push(resource);
				
		return resource;
	}
	
	/**
	* This function removes a Feature from this NetworkInterface
	* 
	* @param id the id of the Feature
	*/
	Network_Interfaces.prototype.removeFeatureById = function(id) {
		for ( var i = 0; i < this.features.length; i++) {
			if (this.features[i].get('id') == id) {
				this.features.splice(i, 1);
				break;
			}
		}
	}
			
			
	/**
	* This function removes a Resource from this NetworkInterface
	* 
	* @param id the id of the Resource
	*/
	Network_Interfaces.prototype.removeResourceById = function(id) {
		for ( var i = 0; i < this.resources.length; i++) {
			if (this.resources[i].get('id') == id) {
				this.resources.splice(i, 1);
				break;
			}
		}
	}
	
	return Network_Interfaces;
})); //define
