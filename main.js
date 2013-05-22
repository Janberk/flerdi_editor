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
				"progressbar": "gui/progressbar",
				"button":"gui/button",
				"parser" : "backend/YAML_parser",
				
				"overviewComponent": "gui/components/overview_component",

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

				"networkOrganisation" : "network/network_organisation",
				"idHandler" : "network/id_handler",

				"network" : "network/element/model/network_model",
				"networkElementModel" : "network/element/model/network_element_model",
				"networkInterfaceModel" : "network/element/model/network_interface_model",
				"resourceModel" : "network/element/model/resource_model",
				"featureModel" : "network/element/model/feature_model",
				
				"controllerFactory" : "network/element/controller_factory",
				"controller" : "network/element/controller/controller",
				"graphLabelAttributesChangeController" : "network/element/controller/graphlabel_attributes_change_controller",
				"graphLabelAttributesCreateController" : "network/element/controller/graphlabel_attributes_create_controller",
				"networkElementDrawController" : "network/element/controller/network_element_draw_controller",
				"networkElementAttributesController" : "network/element/controller/network_element_attributes_controller",
				"networkElementGeneralAttributesController" : "network/element/controller/network_element_general_attributes_controller",
				"linkDrawController" : "network/element/controller/link_draw_controller",
				"networkElementResourcesOverviewController":"network/element/controller/network_element_resources_overview_controller",
				"resourceGeneralAttributesController":"network/element/controller/resource_general_attributes_controller",
				"networkElementFeaturesOverviewController":"network/element/controller/network_element_features_overview_controller",
				"featureGeneralAttributesController":"network/element/controller/feature_general_attributes_controller",
				"networkElementInterfacesOverviewController":"network/element/controller/network_element_interfaces_overview_controller",
				"interfaceGeneralAttributesController":"network/element/controller/interface_general_attributes_controller",

				"networkElementDrawView" : "gui/view/network_element_draw_view",
				"networkElementAtrributesMainview" : "gui/view/network_element_attributes_mainview",
				"networkElementGeneralAttributesView" : "gui/view/network_element_general_attributes_view",
				"linkDrawView" : "gui/view/link_draw_view",
				"networkElementResourcesOverviewView":"gui/view/network_element_resources_overview_view",
				"resourceGeneralAttributesView" : "gui/view/resource_general_attributes_view",
				"networkElementFeaturesOverviewView":"gui/view/network_element_features_overview_view",
				"featureGeneralAttributesView" : "gui/view/feature_general_attributes_view",
				"networkElementInterfacesOverviewView":"gui/view/network_element_interfaces_overview_view",
				"interfaceGeneralAttributesView" : "gui/view/interface_general_attributes_view",

				"commandManager" : "network/command_manager",
				"newNodeCommand" : "network/commands/new_node_command",
				"newLinkCommand" : "network/commands/new_link_command",
				"deleteNodeCommand" : "network/commands/delete_node_command",
				"changeAttributesCommand" : "network/commands/change_attributes_command",
				"composedCommand":"network/commands/composed_command",
				"newResourceCommand" : "network/commands/new_resource_command",
				"deleteResourceCommand" : "network/commands/delete_resource_command",
				"newFeatureCommand" : "network/commands/new_feature_command",
				"deleteFeatureCommand" : "network/commands/delete_feature_command",
				"newInterfaceCommand" : "network/commands/new_interface_command",
				"deleteInterfaceCommand" : "network/commands/delete_interface_command",

				"observable" : "network/observable",
				
				
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
