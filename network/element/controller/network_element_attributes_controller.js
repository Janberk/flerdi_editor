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

define([ "networkElementAtrributesMainview", "network" , "observable", "networkElementGeneralAttributesController"], (function(
		NetworkElementAttributesMainview, Network, Observable, NetworkElementGeneralAttributesController) {

	var NetworkElementAttributesController = function(model) {
		var _this = this;
		this.model = model;
		
		
		this.view = new NetworkElementAttributesMainview({},document.body, function(data) {
			_this.observable.notifyAll("save",{});
			_this.update('remove', {});
		});
		
		this.model.observable.addObserver(this);
		
		this.observable = new Observable();
		this.observable.addObserver(new NetworkElementGeneralAttributesController(this.model,this,'attributes-general'));
	}

	NetworkElementAttributesController.prototype.update = function(command,
			data) {
		switch (command) {
		case "remove":
			this.observable.notifyAll("remove", {});
			this.view.remove();
			this.model.observable.removeObserver(this);
			break;
		}
	}

	return NetworkElementAttributesController;
}));