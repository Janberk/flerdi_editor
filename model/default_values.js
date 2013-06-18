/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([], (function() {

	/**
	 * 
	 * @param values
	 *            all values to build this model
	 */
	var DefaultValues = function() {
		this.graph = {
			'graph_nr' : 0,
			'graph_tag' : 'request',
			'graph_type':'OL',
			
		};
		
		this.resource = {
			'is_request':'1',
			valueType:'constant',
			'value':1000
		}
	}

	return DefaultValues;
})); // define
