/*
 * Author: Flerdi Team
 * RequireJS module definition
 */ 

define (["jquery"], 
(function($) {
	
	/**
	* This is the constructor, sherlock
	*
	* @param json JSON-Object representing all informations, this resource should have
	*/
	var Resources = function(json){
		console.log('creating Resources');
		this.json = {};
			
		this.setAttributes(json);
	}
	
	/**
	* This function sets all default values
	*
	* @param json JSON-Object representing all informations for this node while creating
	*/
	Resources.prototype.setAttributes = function(json){
		this.json.attributes = json.attributes || {};
		this.json.attributes.alias = json.attributes.alias || "";
		this.json.attributes.avp_attribute = json.attributes.avp_attribute || "";
		this.json.attributes.composing_operation = json.attributes.composing_operation || "";
		this.json.attributes.confidence = json.attributes.confidence || "";
		this.json.attributes.id = json.attributes.id || "";
		this.json.attributes.identifier = json.attributes.identifier || "";
		this.json.attributes.is_request = json.attributes.is_request || "1";
		this.json.attributes.resource_unit = json.attributes.resource_unit || "";
		this.json.attributes.the_parent_record_id = json.attributes.the_parent_record_id || "";
		this.json.attributes.time_unit = json.attributes.time_unit || "";
		this.json.attributes.timestamp = json.attributes.timestamp || "";
		this.json.attributes.value = json.attributes.value || "";
		this.json.attributes.value_type = json.attributes.value_type || "";
		this.json.attributes_cache = json.attributes_cache || []
	}
	
	/**
	* This function returns a JSON-Object, representing this resource
	*
	* @return JSON-Object representing this resource
	*/
	Resources.prototype.getJson = function(){
		return this.json
	}
	return Resources;
})); //define
