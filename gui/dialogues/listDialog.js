define(['jquery', 'dialog', "jsonViewer", "changeNodeAttributeCommand", "changeFeaturesAttributeCommand", "changeInterfacesAttributeCommand", "changeResourcesAttributeCommand"],
function($, Dialog,JsonViewer, ChangeNodeAttributeCommand, ChangeFeaturesAttributeCommand, ChangeInterfacesAttributeCommand, ChangeResourcesAttributeCommand) {
	var ListDialog = function(node) {
		this.node = node;
		this.json = node.getJson();
		this.nodeId = this.json.attributes.id;
		
		var dia = new Dialog('props', 'Node Properties');
		dia.addCancel();
		
		var tab_titles = ['General', 'Resources', 'Features', 'Interfaces'];
		
		var content = $(document.createElement('div'))
			.append($(document.createElement('ul'))
				.addClass('nav nav-tabs')
			)
			.append($(document.createElement('div'))
				.addClass('tab-content')
		);
		
		$.each(tab_titles, function() {
			content.find('.nav').append($(document.createElement('li'))
				.append($(document.createElement('a'))
					.attr({
						'href': '#'+this.toLowerCase(),
						'data-toggle': 'tab'
					})
					.append(String(this))
				)
			);
			content.find('.tab-content').append($(document.createElement('div'))
				.addClass('tab-pane')
				.attr('id', this.toLowerCase())
			);
		});
		content.find('.nav a:first').tab('show');
		content.find('#general').append(new JsonViewer(this.node).generalTab());
		content.find('#resources').append(new JsonViewer(this.node).resourcesTab());
		content.find('#features').append(new JsonViewer(this.node).featuresTab());
		content.find('#interfaces').append(new JsonViewer(this.node).networkInterfacesTab());
		dia.setContent(content);
		this.setEventListeners();
	}
	
	ListDialog.prototype.setEventListeners = function() {
		var _this = this;
		
		//TODO using $(this).val() with select elements causes jquery warnings
		$('.ui-general-attributes-input').change(function () {
			//get attribute and value
			var attribute = $(this).attr('name');
			var value = $(this).val();
	
			//create command for undo
			var commandManager = _this.node.getNetwork().getCommandManager();
			commandManager.newCommand(new ChangeNodeAttributeCommand(_this.node, attribute, value, $(this)));
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
			commandManager.newCommand(new ChangeResourcesAttributeCommand(resource, attribute, value, $(this)));
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
			commandManager.newCommand(new ChangeFeaturesAttributeCommand(feature, attribute, value, $(this)));
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
			commandManager.newCommand(new ChangeInterfacesAttributeCommand(networkInterface, attribute, value, $(this)));
		});
	}
	return ListDialog;
})
