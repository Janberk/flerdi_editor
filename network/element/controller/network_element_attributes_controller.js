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

define(
		[ "networkElementAtrributesMainview", "network", "observable",
				"networkElementGeneralAttributesController", "composedCommand" ],
		(function(NetworkElementAttributesMainview, Network, Observable,
				NetworkElementGeneralAttributesController, ComposedCommand) {

			var NetworkElementAttributesController = function(model, parentController, parentClass) {
				this.model = model;
				
				this.parentController = parentController || undefined;
				
				this.parent = document.body;
				
				if(this.parentController !== undefined){
					this.parentController.addObserver(this);
				}else{
					this.parentController = document.body;
				}
				
				var _this = this;
				this.view = new NetworkElementAttributesMainview({},this.parent, function(data) {						
							environment.networks.getNetwork().commandManager.newCommand(_this.getCommand());
							_this.update('remove', {});
						}, function(){
							_this.update('remove', {});
						});
				
				this.addObserver(new NetworkElementGeneralAttributesController(this.model, this, 'attributes-general'));
			}

			// star extends
			NetworkElementAttributesController.prototype = new Observable();
			// end extends

			NetworkElementAttributesController.prototype.getCommand = function() {
				var commands = [];
				for ( var i = 0; i < this.observer.length; i++) {
					commands.push(this.observer[i].getCommand());
				}

				return new ComposedCommand(commands);
			}

			NetworkElementAttributesController.prototype.update = function(
					command, data) {
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