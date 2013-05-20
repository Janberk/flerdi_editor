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
				console.log(this.view.getValues());
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
					features : [ {
						id : 1,
						name : "test1",
						status : 'old',
						removed : false,
					}, {
						id : 5,
						name : 'test2',
						status : 'old',
						removed : false,
					} ]
				};
			}

			return NetworkElementInterfacesOverviewController;
		}));