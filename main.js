/*
 * Module main: handles requireJS and starts the program
 * Author: Flerdi Team, Kai M�ller
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
		"json2yaml" : "lib/json2yaml",
		"spinner":"lib/spinner.min",
		
		"parser": "backend/parser",
		
		"environment": "environment",
		
		"dialogue":"gui/dialogue",
		"listDialogue":"gui/listDialogue",
		"contextMenu":"gui/contextMenu",
		"element_key" : "gui/element_key",
		"loadingWindow":"gui/loadingWindow",
		"toolbar":"gui/toolbar",
		"toolbarButton":"gui/toolbarButton",
		"menubar":"gui/menubar",
		"menubarMenu":"gui/menubarMenu",
		"menubarButton":"gui/menubarButton",
		"drawArea":"gui/drawArea",
		"move":"gui/States/move",
		"newNode":"gui/States/newNode",
		
		"network": "network_elements/network",
		"node": "network_elements/node",
		"link": "network_elements/link",
		"networkOrganisation":"network_elements/network_organisation",
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
		
		var environment = new Environment();
	})); //&(document).ready()
	
})); //define
