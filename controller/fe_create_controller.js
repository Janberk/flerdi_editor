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
		[ "featureGeneralAttributesView", "newFeatureCommand" , 'controller'],
		(function(FeatureGeneralAttributesView, NewFeatureCommand, Controller) {

			var FeatureCreateController = function(model, parentController, parentClass) {
				this.base = Controller;
				this.base(model, parentController, parentClass);

				this.model.addObserver(this);
				
				var _this = this;
		
				this.view = new FeatureGeneralAttributesView({

					priority : this.model.priority,
					value : this.model.value,
					avp_attribute : this.model.avp_attribute,
					is_request : this.model.is_request
	
				}, this.parent, function(evt, data) {
					_this.update("save");
				});

			}

			FeatureCreateController.prototype = new Controller();
			
			FeatureCreateController.prototype.getCommand = function() {
				return new NewFeatureCommand(this.model, this.view.getValues());
			}

			FeatureCreateController.prototype.update = function(
					command, data) {
				switch (command) {
				case "remove":
					this.view.remove();
					this.model.removeObserver(this);
					this.parentController.removeObserver(this);
					break;
				}
			}

			return FeatureCreateController;
		}));