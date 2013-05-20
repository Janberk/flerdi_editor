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
		[ "networkElementFeaturesOverviewView", "featureGeneralAttributesController","controller", ],
		(function(NetworkElementFeaturesOverviewView,FeatureGeneralAttributesController, Controller) {

			var NetworkElementFeaturesOverviewController = function(model,
					parentController, parentClass) {
				this.base = Controller;
				this.base(model, parentController, parentClass);

				var _this = this;

				this.view = new NetworkElementFeaturesOverviewView(this
						.createAttributesForView(), this.parent, 
				function(evt,data) {
					switch(evt){
					case 'showAttributes':
						if(_this.AttributesView != undefined){
							_this.AttributesView.update('remove',{});
						}
						_this.AttributesView = new FeatureGeneralAttributesController(_this.model,_this.parentController,'feature-attributes');
						break;
					}
				});

				this.AttributesView = undefined;
				// creating the views that should be shown inside this
				// controllers view
			}

			NetworkElementFeaturesOverviewController.prototype = new Controller();

			NetworkElementFeaturesOverviewController.prototype.getCommand = function() {
				console.log(this.view.getValues());
				return undefined;
			}

			NetworkElementFeaturesOverviewController.prototype.update = function(
					command, data) {
				switch (command) {
				case "remove":
					this.notifyAll("remove", {});
					this.view.remove();
					this.model.removeObserver(this);
					break;
				}
			}

			NetworkElementFeaturesOverviewController.prototype.createAttributesForView = function() {
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

			return NetworkElementFeaturesOverviewController;
		}));