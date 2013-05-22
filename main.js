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
				/* Environment */
				"environment" : "environment",
				
				/* Libraries */
				"jquery" : "vendor/lib/jquery-1.8.2.min",
				"bootstrap" : "vendor/lib/bootstrap",
				"drag" : "vendor/lib/jquery.event.drag-1.5.min",
				"json2yaml" : "vendor/lib/json2yaml",
				"spinner" : "vendor/lib/spinner.min",
				
				/* Model */
				"network" : "model/network_model",
				"networkElementModel" : "model/network_element_model",
				"networkInterfaceModel" : "model/network_interface_model",
				"resourceModel" : "model/resource_model",
				"featureModel" : "model/feature_model",
				"networkOrganisation" : "model/network_organisation",
				"idHandler" : "model/id_handler",
				
				/* View */
				"networkElementDrawView" : "view/network_element_draw_view",
				"networkElementAtrributesMainview" : "view/network_element_attributes_mainview",
				"networkElementGeneralAttributesView" : "view/network_element_general_attributes_view",
				"linkDrawView" : "view/link_draw_view",
				"networkElementResourcesOverviewView":"view/network_element_resources_overview_view",
				"resourceGeneralAttributesView" : "view/resource_general_attributes_view",
				"networkElementFeaturesOverviewView":"view/network_element_features_overview_view",
				"featureGeneralAttributesView" : "view/feature_general_attributes_view",
				"networkElementInterfacesOverviewView":"view/network_element_interfaces_overview_view",
				"interfaceGeneralAttributesView" : "view/interface_general_attributes_view",
				"graphlabelAttributesView" : "view/graphlabel_attributes_view",
				
				/* Controller */
				"controllerFactory" : "controller/controller_factory",
				"controller" : "controller/controller",
				"graphLabelAttributesChangeController" : "controller/graphlabel_attributes_change_controller",
				"graphLabelAttributesCreateController" : "controller/graphlabel_attributes_create_controller",
				"networkElementDrawController" : "controller/network_element_draw_controller",
				"networkElementAttributesController" : "controller/network_element_attributes_controller",
				"networkElementGeneralAttributesController" : "controller/network_element_general_attributes_controller",
				"linkDrawController" : "controller/link_draw_controller",
				"networkElementResourcesOverviewController":"controller/network_element_resources_overview_controller",
				"resourceGeneralAttributesController" : "controller/resource_general_attributes_controller",
				"networkElementFeaturesOverviewController" : "controller/network_element_features_overview_controller",
				"featureGeneralAttributesController" : "controller/feature_general_attributes_controller",
				"networkElementInterfacesOverviewController" : "controller/network_element_interfaces_overview_controller",
				"interfaceGeneralAttributesController" : "controller/interface_general_attributes_controller",
				
				/* Back-End */
				"parser" : "controller/backend/YAML_parser",
				
				/* Commands */
				"commandManager" : "controller/commands/command_manager",
				"newNodeCommand" : "controller/commands/new_node_command",
				"newLinkCommand" : "controller/commands/new_link_command",
				"deleteNodeCommand" : "controller/commands/delete_node_command",
				"changeAttributesCommand" : "controller/commands/change_attributes_command",
				"composedCommand":"controller/commands/composed_command",
				"newResourceCommand" : "controller/commands/new_resource_command",
				"deleteResourceCommand" : "controller/commands/delete_resource_command",
				"newFeatureCommand" : "controller/commands/new_feature_command",
				"deleteFeatureCommand" : "controller/commands/delete_feature_command",
				"newInterfaceCommand" : "controller/commands/new_interface_command",
				"deleteInterfaceCommand" : "controller/commands/delete_interface_command",
				
				/* Observer */
				"observable" : "controller/observer/observable",
				
				/* GUI */
				"progressbar": "view/gui/progressbar",
				"button":"view/gui/button",
				"overviewComponent": "view/gui/components/overview_component",
				"contextMenu" : "view/gui/context_menu",
				"loadingWindow" : "view/gui/loading_window",
				"toolbar" : "view/gui/toolbar",
				"menubar" : "view/gui/menubar",
				"statusbar" : "view/gui/statusbar",
				"drawArea" : "view/gui/draw_area",
				"jsonViewer" : "view/gui/json_viewer",
				"listDialogueAttributes" : "view/gui/list_dialogue_attributes",
				
				/* States */
				"move" : "view/gui/states/move",
				"newNode" : "view/gui/states/new_node",
				"newLink" : "view/gui/states/new_link",
				
				/* Dialogues */
				"window" : "view/gui/dialogues/window",
				"dialogue" : "view/gui/dialogues/dialogue",
				"alertDialogue" : "view/gui/dialogues/alert_dialogue",
				"openDialogue" : "view/gui/dialogues/open_dialogue",
				"listDialogue" : "view/gui/dialogues/list_dialogue"
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
define([ "jquery", "environment", "controllerFactory" ], (function($,
		Environment, ControllerFactory) {

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
