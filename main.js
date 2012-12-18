/*
 * Module main: handles requireJS and starts the program
 * Author: Flerdi Team, Kai Müller
 * 
 * ---
 * added new libs : Stefan Boitschuk
 */

/*
 * RequireJS path configuration
 */
requirejs.config({
	paths: {
		"jquery": "lib/jquery-1.8.2.min",
		"drag": "lib/jquery.event.drag-1.5.min",
		"environment": "environment",
		"network": "network_elements/network",
		"node": "network_elements/node",
		"link": "network_elements/link",
		"node_visualisation": "network_elements/node_visualisation",
		"link_visualisation": "network_elements/link_visualisation",
		"parser": "lib/parser",
		"yamlParser": "lib/js-yaml.min",
		"element_key" : "gui/element_key",
		"json2yaml" : "lib/json2yaml/json2yaml",
		"spinner":"lib/spinner.min",
		"loadingWindow":"gui/loadingWindow",
		"toolbar":"gui/toolbar",
		"toolbarButton":"gui/toolbarButton",
		"menubar":"gui/menubar",
		"menubarMenu":"gui/menubarMenu",
		"menubarButton":"gui/menubarButton",
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
