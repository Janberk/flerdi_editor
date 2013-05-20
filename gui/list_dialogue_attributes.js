/*
 * Author: Flerdi Team
 */

/*
 * This class specifies which and how attributes in list dialogues are changed
 */
define([ "jquery" ], (function($) {

	var ListDialogueAttributes = function(node) {
		// empty, functions of this class are 'static'
	}

	/**
	 * Returns a json that contains all attributes that can be changed in the
	 * general tab
	 * 
	 */
	ListDialogueAttributes.prototype.getGeneralJson = function() {
		var json = {

			'identifier' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

			'alias' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

			'ne_type' : {
				'input' : 'select',
				'values' : [ '/node/host/generic', '/node/host/pip',
						'/node/switch/cisco', '/node/switch/tunnelbridge',
						'/node/switch/pip' ],
				'standard' : '/node/host/generic'
			},

			'v_net_identifier' : {
				'input' : 'none',
				'values' : '',
				'standard' : ''
			}
		}

		return json;
	}

	/**
	 * Returns a json that contains all attributes that can be changed in the
	 * resources tab
	 * 
	 */
	ListDialogueAttributes.prototype.getResourcesJson = function() {
		var json = {

			'alias' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

			'avp_attribute' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

			'composing_operation' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

			'confidence' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

/*			'id' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},*/

			'identifier' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

			'is_request' : {
				'input' : 'text',
				'values' : '',
				'standard' : 1
			},

			'resource_unit' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

/*			'the_parent_record_id' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},*/

			'time_unit' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

			'timestamp' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

			'value' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

			'value_type' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			}
		}

		return json;
	}

	/**
	 * Returns a json that contains all attributes that can be changed in the
	 * features tab
	 * 
	 */
	ListDialogueAttributes.prototype.getFeaturesJson = function() {
		var json = {

			'avp_attribute' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

			'is_request' : {
				'input' : 'text',
				'values' : '',
				'standard' : 1
			},

			'priority' : {
				'input' : 'text',
				'values' : '',
				'standard' : 1
			},

			'value' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			}
			
		}

		return json;
	}

	/**
	 * Returns a json that contains all attributes that can be changed in the
	 * interfaces tab
	 * 
	 */
	ListDialogueAttributes.prototype.getInterfacesJson = function() {
		var json = {

			'alias' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

			'identifier' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

			'ni_type' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			}
		}

		return json;
	}

	ListDialogueAttributes.prototype.getGraphLableJson = function() {
		return {
			'graph_type' : {
				'input' : 'select',
				'values' : [ 'OL', 'UL' ],
				'standard' : 'OL'
			},
			'role_identifier' : {
				input : 'text',
				values : '',
				standard : ''
			},
			'v_net_identifier' : {
				input : 'text',
				values : '',
				standard : ''
			},
			'graph_tag' : {
				input : 'text',
				values : '',
				standard : ''
			},
			'graph_nr' : {
				input : 'text',
				values : '',
				standard : ''
			}
		};
	}

	return ListDialogueAttributes;
})); // define
