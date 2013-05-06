/*
 * Module main: handles requireJS and starts the program
 * Author: Flerdi Team
 */

/*
 * RequireJS path configuration
 */
requirejs
		.config({
			paths : {
				"jquery" : "lib/jquery-1.8.2.min",
				"bootstrap" : "lib/bootstrap",
				"jquery_ui" : "lib/jquery-ui-1.10.0.custom",
				"drag" : "lib/jquery.event.drag-1.5.min",
				"json2yaml" : "lib/json2yaml",
				"spinner" : "lib/spinner.min",

				"parser" : "backend/YAML_parser",

				"environment" : "environment",

				"window" : "gui/dialogues/window",
				"listDialogue" : "gui/dialogues/listDialogue",
				"openDialogue" : "gui/dialogues/openDialogue",
				"alertDialogue" : "gui/dialogues/alertDialogue",

				"dialog" : "gui/dialogues/dialog",
				"alertDialog" : "gui/dialogues/alertDialog",
				"openDialog" : "gui/dialogues/openDialog",
				"listDialog" : "gui/dialogues/listDialog",

				"graphlabelAttributesView" : "gui/view/graphlabel_attributes_view",

				"contextMenu" : "gui/contextMenu",
				"element_key" : "gui/element_key",
				"loadingWindow" : "gui/loadingWindow",
				"toolbar" : "gui/toolbar",
				"menubar" : "gui/menubar",
				"statusbar" : "gui/statusbar",
				"drawArea" : "gui/drawArea",
				"jsonViewer" : "gui/jsonViewer",
				"listDialogueAttributes" : "gui/list_dialogue_attributes",
				"move" : "gui/States/move",
				"newNode" : "gui/States/new_node",
				"newLink" : "gui/States/new_link",

				"network" : "network/element/model/network_model",
				"node" : "network/element/node",
				"link" : "network/element/link",
				"resources" : "network/element/resources",
				"features" : "network/element/features",
				"network_interfaces" : "network/element/network_interfaces",
				"networkOrganisation" : "network/network_organisation",
				"jsonBuilder" : "network/json_builder",
				"idHandler" : "network/id_handler",

				"controllerFactory" : "network/element/controller_factory",
				"networkElementModel" : "network/element/model/network_element_model",
				"resourceModel" : "network/element/model/resource_model",
				"featureModel" : "network/element/model/feature_model",
				"networkInterfaceModel" : "network/element/model/network_interface_model",

				"networkElementDrawView" : "gui/view/network_element_draw_view",
				"networkElementAtrributesMainview" : "gui/view/network_element_attributes_mainview",
				"networkElementGeneralAttributesView" : "gui/view/network_element_genral_attributes_view",

				"graphLabelAttributesChangeController" : "network/element/controller/graphlabel_attributes_change_controller",
				"graphLabelAttributesCreateController" : "network/element/controller/graphlabel_attributes_create_controller",
				"networkElementDrawController" : "network/element/controller/network_element_draw_controller",
				"networkElementAttributesController" : "network/element/controller/network_element_attributes_controller",
				"networkElementGeneralAttributesController" : "network/element/controller/network_element_general_attributes_controller",

				"commandManager" : "network/command_manager",
				"moveNodeCommand" : "network/commands/move_node_command",
				"newNodeCommand" : "network/commands/new_node_command",
				"newLinkCommand" : "network/commands/new_link_command",
				"deleteNodeCommand" : "network/commands/delete_node_command",
				"changeNodeTypeCommand" : "network/commands/change_node_type_command",
				"changeNodeAttributeCommand" : "network/commands/change_node_attribute_command",
				"changeFeaturesAttributeCommand" : "network/commands/change_features_attribute_command",
				"changeInterfacesAttributeCommand" : "network/commands/change_interfaces_attribute_command",
				"changeResourcesAttributeCommand" : "network/commands/change_resources_attribute_command",
				"changeAttributesCommand" : "network/commands/change_attributes_command",

				"observable" : "network/observable"
			},
			shim : {
				'bootstrap' : {
					deps : [ 'jquery' ]
				}
			}
		// paths
		}); // config

/*
 * RequireJS module definition
 */
define([ "jquery", "environment","controllerFactory" ], (function($, Environment,ControllerFactory) {

	"use strict";

	/* main program, called when document loaded */
	$(document).ready((function() {
		console.log("document loaded - starting program");

		environment = new Environment();
		controllerFactory = ControllerFactory;
	})); // &(document).ready()

})); // define

var environment = "";
var controllerFactory = "";
