/*
 * Author: Flerdi Team
 */
 
/*
 * This class is specifically for dialogues concerning Resources, Features and NetworkInterfaces
 */ 
define (["jquery","window","jsonViewer", "changeNodeAttributeCommand", "changeFeaturesAttributeCommand", "changeInterfacesAttributeCommand", "changeResourcesAttributeCommand"], 
	(function($,Window,JsonViewer, ChangeNodeAttributeCommand, ChangeFeaturesAttributeCommand, ChangeInterfacesAttributeCommand, ChangeResourcesAttributeCommand) {

	/*
	 * constructor: creates a new listDialogue for the given node,
	 * fills the tabs with the data of the json and shows it immediately
	 */
	var ListDialogue = function(node){
		console.log("creating listDialogue for selected node");
		this.node = node;
		this.json = node.getJson();
		this.nodeId = this.json.attributes.id;
		this.win = new Window('Node Properties', [450,600]);
		this.tabs = document.createElement('div');	
		$(this.tabs).html(
		'<ul>' +
		'<li><a href="#general-tab-id-' + this.nodeId + '">General</a></li>' +
		'<li><a href="#resources-tab-id-' + this.nodeId + '">Resources</a></li>' +
		'<li><a href="#features-tab-id-' + this.nodeId + '">Features</a></li>' +
		'<li><a href="#interfaces-tab-id-' + this.nodeId + '">Interfaces</a></li>' +
		'</ul>' +
		'<div id="general-tab-id-' + this.nodeId + '"></div>' +
		'<div id="resources-tab-id-' + this.nodeId + '"></div>' +
		'<div id="features-tab-id-' + this.nodeId + '"></div>' +
		'<div id="interfaces-tab-id-' + this.nodeId + '"></div>'
		);
		$(this.tabs).tabs();
		this.win.setContent(this.tabs);
		this.update();
		
		this.setEventListeners();
	}
	
	/*
	 * updates the tab contents to match the current json of the node
	 */
	ListDialogue.prototype.update = function() {			
		console.log("updating listDialogue for node with id = " + this.nodeId);
		$('#general-tab-id-' + this.nodeId).append(new JsonViewer(this.node).generalTab());
		$('#resources-tab-id-' + this.nodeId).append(new JsonViewer(this.node).resourcesTab());
		$('#features-tab-id-' + this.nodeId).append(new JsonViewer(this.node).featuresTab());
		$('#interfaces-tab-id-' + this.nodeId).append(new JsonViewer(this.node).networkInterfacesTab());
	}
	
	/*
	 * opens the dialogue again after it was closed
	 */
	ListDialogue.prototype.show = function() {
		console.log("showing listDialogue for node with id = " + this.nodeId);
		this.win.show();
	}

	/*
	 * sets event listener for all inputs in this dialoge
	 */
	ListDialogue.prototype.setEventListeners = function() {
		var _this = this;
		
		//TODO using $(this).val() with select elements causes jquery warnings
		$('.ui-general-attributes-input').change(function () {
			//get attribute and value
			var attribute = $(this).attr('name');
			var value = $(this).val();
	
			//create command for undo
			var commandManager = _this.node.getNetwork().getCommandManager();
			commandManager.newCommand(new ChangeNodeAttributeCommand(_this.node, attribute, value));
		});
		
		$('.ui-resources-attributes-input').change(function () {
			//get attribute and value
			var attribute = $(this).attr('name');
			var value = $(this).val();
			
			//identifiy which resource gets changed
			var i = $(this).attr('class').split(' ')[1];
			var resource = _this.node.getResource(i);
			
			//create command for undo
			var commandManager = _this.node.getNetwork().getCommandManager();
			commandManager.newCommand(new ChangeResourcesAttributeCommand(resource, attribute, value));
		});

		$('.ui-features-attributes-input').change(function () {
			//get attribute and value
			var attribute = $(this).attr('name');
			var value = $(this).val();
			
			//identifiy which feature gets changed
			var i = $(this).attr('class').split(' ')[1];
			var feature = _this.node.getFeature(i);
			
			//create command for undo
			var commandManager = _this.node.getNetwork().getCommandManager();
			commandManager.newCommand(new ChangeFeaturesAttributeCommand(feature, attribute, value));
		});
		
		$('.ui-interfaces-attributes-input').change(function () {
			//get attribute and value
			var attribute = $(this).attr('name');
			var value = $(this).val();
			
			//identifiy which interface gets changed
			var i = $(this).attr('class').split(' ')[1];
			var networkInterface = _this.node.getNetworkInterface(i);
			
			//create command for undo
			var commandManager = _this.node.getNetwork().getCommandManager();
			commandManager.newCommand(new ChangeInterfacesAttributeCommand(networkInterface, attribute, value));
		});
	}

	return ListDialogue;
})); //define

/**
 * Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n<br>";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n<br>";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}