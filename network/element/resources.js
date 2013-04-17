/*
 * Author: Flerdi Team
 * RequireJS module definition
 */ 

define (["jquery"], 
(function($) {
	
	/**
	* This is the constructor, sherlock
	*
	* @param element NetworkElement, or NetworkInterface this Resource is applied to
	* @param json JSON-Object representing all informations, this resource should have
	*/
	var Resources = function(element, json){
		console.log('creating Resources');
		this.element = element;
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
		this.json.attributes.avp_attribute = json.attributes.avp_attribute || "/node/host/generic/RAM/real/amount";
		this.json.attributes.composing_operation = json.attributes.composing_operation || "";
		this.json.attributes.confidence = json.attributes.confidence || "";
		this.json.attributes.id = json.attributes.id || this.element.getNetwork().getIdHandler().getNextResourceId();
		this.json.attributes.identifier = json.attributes.identifier || this.element.getNetwork().getIdHandler().getNextIdentifierId();
		this.json.attributes.is_request = json.attributes.is_request || 1;
		this.json.attributes.resource_unit = json.attributes.resource_unit || "";
		this.json.attributes.the_parent_record_id = json.attributes.the_parent_record_id || this.element.getJson().attributes.id;
		this.json.attributes.time_unit = json.attributes.time_unit || "";
		this.json.attributes.timestamp = json.attributes.timestamp || "";
		this.json.attributes.value = json.attributes.value || 100;
		this.json.attributes.value_type = json.attributes.value_type || "constant";
		this.json.attributes_cache = json.attributes_cache || [];
	}
	
	/**
	* This function sets a specific value
	*
	* @param attribute the attribute name, given as string
	* @param value the attibute's new value
	*/
	Resources.prototype.set = function(attribute, value) {
		switch (attribute) {
			case 'alias': {
				this.json.attributes.alias = value;
				break;
			}
			case 'avp_attribute': {
				this.json.attributes.avp_attribute = value;
				break;
			}
			case 'composing_operation': {
				this.json.attributes.composing_operation = value;
				break;
			}
			case 'confidence': {
				this.json.attributes.confidence = value;
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
			case 'is_request': {
				this.json.is_request = value;
				break;
			}
			case 'resource_unit': {
				this.json.attributes.resource_unit = value;
				break;
			}
			case 'the_parent_record_id': {
				this.json.attributes.the_parent_record_id = value;
				break;
			}
			case 'time_unit': {
				this.json.attributes.time_unit = value;
				break;
			}
			case 'timestamp': {
				this.json.attributes.timestamp = value;
				break;
			}
			case 'value': {
				this.json.attributes.value = value;
				break;
			}
			case 'value_type': {
				this.json.attributes.value_type = value;
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
	Resources.prototype.get = function(attribute) {
		switch (attribute) {
			case 'alias': {
				return this.json.attributes.alias;
			}
			case 'avp_attribute': {
				return this.json.attributes.avp_attribute;
			}
			case 'composing_operation': {
				return this.json.attributes.composing_operation;
			}
			case 'confidence': {
				return this.json.attributes.confidence;
			}
			case 'id': {
				return this.json.attributes.id;
			}
			case 'identifier': {
				return this.json.attributes.identifier;
			}
			case 'is_request': {
				return this.json.is_request;
			}
			case 'resource_unit': {
				return this.json.attributes.resource_unit;
			}
			case 'the_parent_record_id': {
				return this.json.attributes.the_parent_record_id;
			}
			case 'time_unit': {
				return this.json.attributes.time_unit;
			}
			case 'timestamp': {
				return this.json.attributes.timestamp;
			}
			case 'value': {
				return this.json.attributes.value;
			}
			case 'value_type': {
				return this.json.attributes.value_type;
			}
			case 'attributes_cache': {
				return this.json.attributes_cache;
			}
			default: throw new Error("Attribute "+attribute+" not found.");
		}
	}

	/**
	* This function returns a JSON-Object, representing this resource
	*
	* @return JSON-Object representing this resource
	*/
	Resources.prototype.getJson = function(){
		return this.json;
	}
	return Resources;
})); //define
