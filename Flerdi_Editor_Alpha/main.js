/*
 * Module main: handles requireJS and starts the program
 * Author: Flerdi Team, Kai Müller
 * 
 * ---
 * addes new libs : Stefan Boitschuk
 */

/*
 * RequireJS path configuration
 */
requirejs.config({
	paths: {
		"jquery": "lib/jquery-1.8.2.min",
		"environment": "js/environment",
		"network": "js/network_elements/network",
		"node": "js/network_elements/node",
		"node_visualisation": "js/network_elements/node_visualisation",
		"parser": "lib/parser",
		"yamlParser": "lib/js-yaml.min",
		"element_key" : "js/gui/element_key"
	} //paths
}); //config

/*
 * RequireJS module definition
 */
define(["jquery", "environment"], (function($, Environment) {
	
	"use strict";
	
	/* main program, called when document loaded */
	$(document).ready( (function() {
		console.log("document loaded - starting program");
		
		var environment = new Environment("body_element");
	})); //&(document).ready()
	
})); //define