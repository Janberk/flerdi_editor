/*
 * Author: Flerdi Team
 */
 
/*
 * This class specifies which and how attributes in list dialogues are changed
 */ 
define (["jquery"], (function($) {


	var ListDialogueAttributes = function(node){
		// empty, functions of this class are 'static'
	}

	/**
	 * Returns a json that contains all attributes that can be changed in the general tab
	 * 
	 */
	ListDialogueAttributes.prototype.getGeneralJson = function() {
		var json = {
			
			'identifier': {
				'input': 'none',
				'values': '',
				'default': ''
			},

			'alias': {
				'input': 'none',
				'values': '',
				'default': ''
			},
			
			'ne_type': {
				'input': 'select',
				'values': ['/node/host/generic', '/node/host/pip', '/node/switch/cisco', '/node/switch/tunnelbridge', '/node/switch/pip'],
				'default': '/node/host/generic'
			},
			
			'v_net_identifier': {
				'input': 'text',
				'values': '',
				'default': ''
			}
		}
		
		return json;
	}
	
	/**
	 * Returns a json that contains all attributes that can be changed in the resources tab
	 * 
	 */
	ListDialogueAttributes.prototype.getResourcesJson = function() {
		var json = {
			
			'alias': {
				'input': 'text',
				'values': '',
				'default': ''
			},

			'avp_attribute': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'composing_operation': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'confidence': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'id': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'identifier': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'is_request': {
				'input': 'text',
				'values': '',
				'default': 1
			},
			
			'resource_unit': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'the_parent_record_id': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'time_unit': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'timestamp': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'value': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'value_type': {
				'input': 'text',
				'values': '',
				'default': ''
			}
		}
		
		return json;
	}
	
	
	/**
	 * Returns a json that contains all attributes that can be changed in the features tab
	 * 
	 */
	ListDialogueAttributes.prototype.getFeaturesJson = function() {
		var json = {
			
			'avp_attribute': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'id': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'is_request': {
				'input': 'text',
				'values': '',
				'default': 1
			},
			
			'network_element_id': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'network_interface_id': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'priority': {
				'input': 'text',
				'values': '',
				'default': 1
			},
			
			'value': {
				'input': 'text',
				'values': '',
				'default': ''
			}
		}
		
		return json;
	}
	
	/**
	 * Returns a json that contains all attributes that can be changed in the interfaces tab
	 * 
	 */
	ListDialogueAttributes.prototype.getInterfacesJson = function() {
		var json = {
			
			'alias': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'id': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'identifier': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'network_element_id': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'network_interface_id': {
				'input': 'text',
				'values': '',
				'default': ''
			},
			
			'ni_type': {
				'input': 'text',
				'values': '',
				'default': ''
			}
		}
		
		return json;
	}
	
	return ListDialogueAttributes;
})); //define
