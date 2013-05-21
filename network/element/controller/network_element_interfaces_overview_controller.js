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
		[ "networkElementInterfacesOverviewView", "interfaceGeneralAttributesController","controller", ],
		(function(NetworkElementInterfacesOverviewView,InterfaceGeneralAttributesController, Controller) {

			var NetworkElementInterfacesOverviewController = function(model,
					parentController, parentClass) {
				this.base = Controller;
				this.base(model, parentController, parentClass);
				
				var _this = this;

				this.view = new NetworkElementInterfacesOverviewView(this
						.createAttributesForView(), this.parent, 
				function(evt,data) {
					switch(evt){
					case 'showAttributes':
						if(_this.AttributesView != undefined){
							_this.AttributesView.update('remove',{});
						}
						_this.AttributesView = new InterfaceGeneralAttributesController(_this.model,_this.parentController,'interface-attributes');
						break;
					}
				});

				this.AttributesView = undefined;
				// creating the views that should be shown inside this
				// controllers view
			}

			NetworkElementInterfacesOverviewController.prototype = new Controller();

			NetworkElementInterfacesOverviewController.prototype.getCommand = function() {
				return undefined;
			}

			NetworkElementInterfacesOverviewController.prototype.update = function(
					command, data) {
				switch (command) {
				case "remove":
					this.notifyAll("remove", {});
					this.view.remove();
					this.model.removeObserver(this);
					break;
				}
			}

			NetworkElementInterfacesOverviewController.prototype.createAttributesForView = function() {
				return {
					network_interfaces : [ {
						id : 9001,
						name : "over9000",
						status : 'old',
						removed : false,
					}]
				};
			}

			return NetworkElementInterfacesOverviewController;
		}));