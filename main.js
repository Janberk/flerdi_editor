/*
 * Module main: handles requireJS and starts the program
 * Author: Flerdi Team
 */

/*
 * RequireJS path configuration
 */
requirejs.config({
	paths: {
		"jquery": "lib/jquery-1.8.2.min",
		"jquery_ui": "lib/jquery-ui-1.10.0.custom",
		"drag": "lib/jquery.event.drag-1.5.min",
		"json2yaml" : "lib/json2yaml",
		"spinner":"lib/spinner.min",
		
		"parser": "backend/YAML_parser",
		
		"environment": "environment",
		
		"window":"gui/dialogues/window",
		"listDialogue":"gui/dialogues/listDialogue",
		"openDialogue":"gui/dialogues/openDialogue",
		"alertDialogue":"gui/dialogues/alertDialogue",
		
		"contextMenu":"gui/contextMenu",
		"element_key" : "gui/element_key",
		"loadingWindow":"gui/loadingWindow",
		"toolbar":"gui/toolbar",
		"menubar":"gui/menubar",
		"statusbar":"gui/statusbar",
		"drawArea":"gui/drawArea",
		"jsonViewer":"gui/jsonViewer",
		"move":"gui/States/move",
		"newNode":"gui/States/new_node",
		"newLink":"gui/States/new_link",
		
		"network": "network/network",
		"node": "network/element/node",
		"link": "network/element/link",
		"resources": "network/element/resources",
		"features": "network/element/features",
		"network_interfaces": "network/element/network_interfaces",
		"networkOrganisation": "network/network_organisation",
		"jsonBuilder": "network/json_builder",
		"idHandler": "network/id_handler",
		
		"commandManager":	"network/command_manager",
		"moveNodeCommand":	"network/commands/move_node_command",
		"newNodeCommand":	"network/commands/new_node_command",
		"newLinkCommand":	"network/commands/new_link_command",
		"deleteNodeCommand":	"network/commands/delete_node_command",
		"changeNodeTypeCommand":	"network/commands/change_node_type_command"
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
