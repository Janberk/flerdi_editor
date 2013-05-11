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
			_this.notifyAll("save",{});
			_this.update('remove', {});
		});
		
		this.model.addObserver(this);
		
		this.addObserver(new NetworkElementGeneralAttributesController(this.model,this,'attributes-general'));
	}
	
	// star extends
	NetworkElementAttributesController.prototype = new Observable();
	// end extends

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