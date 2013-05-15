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

define([ "networkElementAtrributesMainview", "network", "controller",
		"networkElementGeneralAttributesController", "composedCommand",
		'observable' ], (function(NetworkElementAttributesMainview, Network,
		Controller, NetworkElementGeneralAttributesController, ComposedCommand,
		Observable) {

	var NetworkElementAttributesController = function(model, parentController,
			parentClass) {
		this.base = Controller;
		this.base(model, parentController, parentClass);

		var _this = this;

		this.view = new NetworkElementAttributesMainview({}, this.parent,
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
		this.addObserver(new NetworkElementGeneralAttributesController(
				this.model, this, 'attributes-general'));
	}

	NetworkElementAttributesController.prototype = new Controller();

	NetworkElementAttributesController.prototype.getCommand = function() {
		var commands = [];
		for ( var i = 0; i < this.observer.length; i++) {
			commands.push(this.observer[i].getCommand());
		}

		return new ComposedCommand(commands);
	}

	NetworkElementAttributesController.prototype.update = function(command,
			data) {
		switch (command) {
		case "remove":
			this.notifyAll("remove", {});
			this.view.remove();
			this.model.removeObserver(this);
			break;
		}
	}

	return NetworkElementAttributesController;
}));