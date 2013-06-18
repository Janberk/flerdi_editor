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
				'standard' : '/node/host/generic',
				shownAs : 'ne type'
			},

			'v_net_identifier' : {
				'input' : 'none',
				'values' : '',
				'standard' : '',
				shownAs : 'v net identifier'
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
				'standard' : '',
				shownAs : 'avp attribute'
			},

			'composing_operation' : {
				'input' : 'text',
				'values' : '',
				'standard' : '',
				shownAs : 'composing operation'
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
				'input' : 'select',
				'values' : ['0','1'],
				'standard' : defaultValues.resource['is_request'],
				shownAs : 'is request'
			},

			'resource_unit' : {
				'input' : 'text',
				'values' : '',
				'standard' : '',
				shownAs : 'resource unit'
			},

/*			'the_parent_record_id' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},*/

			'time_unit' : {
				'input' : 'text',
				'values' : '',
				'standard' : '',
				shownAs : 'time unit'
			},

			'timestamp' : {
				'input' : 'text',
				'values' : '',
				'standard' : ''
			},

			'value' : {
				'input' : 'text',
				'values' : '',
				'standard' : defaultValues.resource['value']
			},

			'value_type' : {
				'input' : 'text',
				'values' : '',
				'standard' : defaultValues.resource['value_type'],
				shownAs : 'value type'
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
				'standard' : '',
				shownAs : 'avp attribute'
			},

			'is_request' : {
				'input' : 'select',
				'values' : ['0','1'],
				'standard' : '0',
				shownAs : 'is request'
			},

			'priority' : {
				'input' : 'text',
				'values' : '',
				'standard' : 1
			},

			'value' : {
				'input' : 'text',
				'values' : '',
				'standard' : 100
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
				'standard' : '',
				shownAs : 'ni type'
			}
		}

		return json;
	}

	ListDialogueAttributes.prototype.getGraphLableJson = function() {
		return {
			'graph_type' : {
				'input' : 'select',
				'values' : [ 'OL', 'UL' ],
				'standard' : 'OL',
				shownAs : 'graph type'
			},
			'role_identifier' : {
				input : 'text',
				values : '',
				standard : 'team-flerdi',
				shownAs : 'role identifier'
			},
			'v_net_identifier' : {
				input : 'text',
				values : '',
				standard : '',
				shownAs : 'v net identifier'
			},
			'graph_tag' : {
				input : 'text',
				values : '',
				standard : 'request',
				shownAs : 'graph tag'
			},
			'graph_nr' : {
				input : 'text',
				values : '',
				standard : '0',
				shownAs : 'graph nr'
			}
		};
	}

	return ListDialogueAttributes;
})); // define
