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
				"networkOrganisation" : "model/network_organisation",
				"idHandler" : "model/id_handler",
				"networkElementModel" : "model/ne_model",
				"networkInterfaceModel" : "model/ni_model",
				"resourceModel" : "model/re_model",
				"featureModel" : "model/fe_model",
				
				/* View */
				"nodeDrawView" : "view/node_draw_view",
				"linkDrawView" : "view/link_draw_view",
				"networkElementAtrributesMainview" : "view/ne_attributes_mainview",
				"networkElementGeneralAttributesView" : "view/ne_general_attributes_view",
				"networkElementResourcesOverviewView":"view/ne_re_overview_view",
				"resourceGeneralAttributesView" : "view/re_general_attributes_view",
				"networkElementFeaturesOverviewView":"view/ne_fe_overview_view",
				"featureGeneralAttributesView" : "view/fe_general_attributes_view",
				"networkElementInterfacesOverviewView":"view/ne_ni_overview_view",
				"interfaceGeneralAttributesView" : "view/ni_general_attributes_view",
				"graphlabelAttributesView" : "view/graphlabel_attributes_view",
				
				/* Controller */
				"controllerFactory" : "controller/controller_factory",
				"controller" : "controller/controller",
				"graphLabelAttributesChangeController" : "controller/graphlabel_attributes_change_controller",
				"graphLabelAttributesCreateController" : "controller/graphlabel_attributes_create_controller",
				"nodeDrawController" : "controller/node_draw_controller",
				"linkDrawController" : "controller/link_draw_controller",
				"networkElementAttributesController" : "controller/ne_attributes_controller",
				"networkElementGeneralAttributesController" : "controller/ne_general_attributes_controller",
				"networkElementResourcesOverviewController":"controller/ne_re_overview_controller",
				"resourceAttributesChangeController" : "controller/re_attributes_change_controller",
				"networkElementFeaturesOverviewController" : "controller/ne_fe_overview_controller",
				"featureAttributesChangeController" : "controller/fe_attributes_change_controller",
				"networkElementInterfacesOverviewController" : "controller/ne_ni_overview_controller",
				"interfaceGeneralAttributesController" : "controller/ni_general_attributes_controller",
				
				/* Back-End */
				"parser" : "controller/backend/YAML_parser",
				
				/* Commands */
				"commandManager" : "controller/commands/command_manager",
				"newNodeCommand" : "controller/commands/new_node_command",
				"newLinkCommand" : "controller/commands/new_link_command",
				"deleteNodeCommand" : "controller/commands/delete_node_command",
				"changeAttributesCommand" : "controller/commands/change_attributes_command",
				"composedCommand":"controller/commands/composed_command",
				"newResourceCommand" : "controller/commands/new_re_command",
				"deleteResourceCommand" : "controller/commands/delete_re_command",
				"newFeatureCommand" : "controller/commands/new_fe_command",
				"deleteFeatureCommand" : "controller/commands/delete_fe_command",
				"newInterfaceCommand" : "controller/commands/new_ni_command",
				"deleteInterfaceCommand" : "controller/commands/delete_ni_command",
				
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
