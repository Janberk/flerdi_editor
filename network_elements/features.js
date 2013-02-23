/*
 * Author: Flerdi Team
 * RequireJS module definition
 */ 

define (["jquery"], 
(function($) {
	
	/**
	* This is the constructor, watson
	*
	* @param json JSON-Object representing all informations, this feature should have
	*/
	var Features = function(json){
		console.log('creating Features');
		this.json = {};
			
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
		this.json.attributes.id = json.attributes.id || "";
		this.json.attributes.identifier = json.attributes.identifier || "";
		this.json.attributes.is_request = json.attributes.is_request || "1";
		this.json.attributes.network_element_id = json.attributes.network_element_id || "";
		this.json.attributes.network_interface_id = json.attributes.network_interface_id || "";
		this.json.attributes.priority = json.attributes.priority || "1";
		this.json.attributes.value = json.attributes.value || "";
		this.json.attributes_cache = json.attributes_cache || [];
	}
	
	/**
	* This function returns a JSON-Object, representing this feature
	*
	* @return JSON-Object representing this feature
	*/
	Features.prototype.getJson = function(){
		return this.json
	}
	return Features;
})); //define
