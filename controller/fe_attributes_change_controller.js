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
		[ "featureGeneralAttributesView", "changeAttributesCommand" , 'controller'],
		(function(FeatureGeneralAttributesView, ChangeAttributesCommand, Controller) {

			var FeatureAttributesChangeController = function(model, parentController, parentClass) {
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

			FeatureAttributesChangeController.prototype = new Controller();
			
			FeatureAttributesChangeController.prototype.getCommand = function() {
				return new ChangeAttributesCommand(this.model, this.view.getValues());
			}

			FeatureAttributesChangeController.prototype.update = function(
					command, data) {
				switch (command) {
				case "updateWithoutModel":
					this.view.avp_attribute = data.avp_attribute;
					this.view.is_request = data.is_request;	
					this.view.priority = data.priority;
					this.view.value = data.value;		
					this.view.refresh();
					break;
				case "update":
					this.view.avp_attribute = this.model.avp_attribute;
					this.view.is_request = this.model.is_request;	
					this.view.priority = this.model.priority;
					this.view.value = this.model.value;
					this.view.refresh();
					break;
				case "remove":
					this.view.remove();
					this.model.removeObserver(this);
					this.parentController.removeObserver(this);
					break;
				}
			}

			return FeatureAttributesChangeController;
		}));