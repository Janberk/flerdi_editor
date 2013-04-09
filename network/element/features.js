/*
 * Author: Flerdi Team
 * RequireJS module definition
 */ 

define (["jquery"], 
(function($) {
	
	/**
	* This is the constructor, watson
	*
	* @param element NetworkElement, or NetworkInterface this feature is applied to
	* @param json JSON-Object representing all informations, this feature should have
	*/
	var Features = function(element, json){
		console.log('creating Features');
		this.json = {};
		this.element = element;
		
		this.setAttributes(json);
	}
	
	/**
	* This function sets all default values
	*
	* @param json JSON-Object representing all informations for this node while creating
	*/
	Features.prototype.setAttributes = function(json){
		this.json.attributes = json.attributes || {};
		this.json.attributes.avp_attribute = json.attributes.avp_attribute || "";
		this.json.attributes.id = json.attributes.id || this.element.getNetwork().getIdHandler().getNextFeatureId();
		this.json.attributes.is_request = json.attributes.is_request || "1";
		this.json.attributes.network_element_id = json.attributes.network_element_id || "";
		this.json.attributes.network_interface_id = json.attributes.network_interface_id || "";
		this.json.attributes.priority = json.attributes.priority || "1";
		this.json.attributes.value = json.attributes.value || "";
		this.json.attributes_cache = json.attributes_cache || [];
	}
	
	/**
	* This function sets a specific value
	*
	* @param attribute the attribute name, given as string
	* @param value the attibute's new value
	*/
	Features.prototype.set = function(attribute, value) {
		switch (attribute) {
			case 'avp_attribute': {
				this.json.attributes.avp_attribute = value;
				break;
			}
			case 'id': {
				this.json.attributes.id = value;
				break;
			}
			case 'is_request': {
				this.json.attributes.is_request = value;
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
			case 'priority': {
				this.json.attributes.priority = value;
				break;
			}
			case 'value': {
				this.json.attributes.value = value;
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
	* This function returns a specific value
	*
	* @param attribute the attribute name, given as string
	*/
	Features.prototype.get = function(attribute) {
		switch (attribute) {
			case 'avp_attribute': {
				return this.json.attributes.avp_attribute;
			}
			case 'id': {
				return this.json.attributes.id;
			}
			case 'is_request': {
				return this.json.attributes.is_request;
			}
			case 'network_element_id': {
				return this.json.attributes.network_element_id;
			}
			case 'network_interface_id': {
				return this.json.attributes.network_interface_id;
			}
			case 'priority': {
				return this.json.attributes.priority;
			}
			case 'value': {
				return this.json.attributes.value;
			}
			case 'attributes_cache': {
				return this.json.attributes_cache;
			}
			default: throw new Error("Attribute "+attribute+" not found.");
		}
	}
	
	/**
	* This function returns a JSON-Object, representing this feature
	*
	* @return JSON-Object representing this feature
	*/
	Features.prototype.getJson = function(){
		return this.json;
	}
	return Features;
})); //define
