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
	}

	return DefaultValues;
})); // define
