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
		[ "networkElementResourcesOverviewView", "controller", ],
		(function(NetworkElementResourcesOverviewView, Controller) {

			var NetworkElementResourcesOverviewController = function(model,
					parentController, parentClass) {
				this.base = Controller;
				this.base(model, parentController, parentClass);

				var _this = this;

				this.view = new NetworkElementResourcesOverviewView(this
						.createAttributesForView(), this.parent, 
				function(evt,data) {
					switch(evt){
					case 'remove':
						console.log(data);
						break;
					}
				});

				// creating the views that should be shown inside this
				// controllers view
			}

			NetworkElementResourcesOverviewController.prototype = new Controller();

			NetworkElementResourcesOverviewController.prototype.getCommand = function() {
				console.log(this.view.getValues());
				return undefined;
			}

			NetworkElementResourcesOverviewController.prototype.update = function(
					command, data) {
				switch (command) {
				case "remove":
					this.notifyAll("remove", {});
					this.view.remove();
					this.model.removeObserver(this);
					break;
				}
			}

			NetworkElementResourcesOverviewController.prototype.createAttributesForView = function() {
				return {
					resources : [ {
						id : 1,
						name : "blub",
						status : 'old',
						removed : false,
					}, {
						id : 5,
						name : 'kalimahr',
						status : 'old',
						removed : false,
					} ]
				};
			}

			return NetworkElementResourcesOverviewController;
		}));