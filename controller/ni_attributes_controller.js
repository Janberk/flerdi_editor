/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * implements IObserver
 * 
 * 	
 * This is the Main controller for a composed view.
 * 
 *
 */

define([ "interfaceAttributesMainview", "network", "controller",
		"interfaceGeneralAttributesController", "composedCommand",
		"observable","resourcesOverviewController","featuresOverviewController"], (function(
		InterfaceAttributesMainview, Network, Controller,
		InterfaceGeneralAttributesController, ComposedCommand, Observable,ResourcesOverviewController,FeaturesOverviewController) {

	var InterfaceAttributesController = function(model, parentController,
			parentClass) {
		this.base = Controller;
		this.base(model, parentController, parentClass);

		var _this = this;

		this.view = new InterfaceAttributesMainview({}, this.parent,
				function(evt, data) {
					switch (evt) {
					case 'ok':
						environment.networks.getNetwork().commandManager
								.newCommand(_this.getCommand());
						break;
					case 'close':
						_this.update('remove', {});
						break;
					}
				});

		// creating the views that should be shown inside this controllers view
		this.addObserver(new InterfaceGeneralAttributesController(
				this.model, this, 'attributes-general'));
		this.addObserver(new ResourcesOverviewController(
				this.model, this, 'attributes-resources'));
		this.addObserver(new FeaturesOverviewController(
				this.model, this, 'attributes-features'));
	}

	InterfaceAttributesController.prototype = new Controller();

	InterfaceAttributesController.prototype.getCommand = function() {
		var commands = [];
		for ( var i = 0; i < this.observer.length; i++) {
			if (this.observer[i].getCommand() !== undefined) {
				commands.push(this.observer[i].getCommand());
			}
		}

		return new ComposedCommand(commands);
	}

	InterfaceAttributesController.prototype.update = function(command,
			data) {
		switch (command) {
		case "remove":
			this.notifyAll("remove", {});
			this.view.remove();
			this.model.removeObserver(this);
			break;
		}
	}

	return InterfaceAttributesController;
}));