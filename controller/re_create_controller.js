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
		[ "resourceGeneralAttributesView", "newResourceCommand" , 'controller'],
		(function(ResourceGeneralAttributesView, NewResourceCommand, Controller) {

			var ResourceAttributesChangeController = function(model, parentController, parentClass) {
				this.base = Controller;
				this.base(model, parentController, parentClass);

				this.model.addObserver(this);
				
				var _this = this;

				this.alias = this.model.alias;
				this.avp_attribute = this.model.avp_attribute;
				this.composing_operation = this.model.composing_operation;
				this.confidence = this.model.confidence;
				this.identifier = this.model.identifier;
				this.is_request = this.model.is_request;
				this.resource_unit = this.model.resource_unit;
				this.time_unit = this.model.time_unit;
				this.timestamp = this.model.timestamp;
				this.value = this.model.value;
				this.value_type = this.model.value_type;
				
				this.view = new ResourceGeneralAttributesView({
					alias : this.alias,
					avp_attribute : this.avp_attribute,
					composing_operation : this.composing_operation,
					confidence : this.confidence,
					identifier : this.identifier,
					is_request : this.is_request,
					resource_unit : this.resource_unit,
					time_unit : this.time_unit,
					timestamp : this.timestamp,
					value : this.value,
					value_type : this.value_type
				}, this.parent, function(evt, data) {
					switch(evt){
					case 'ok':
						environment.networks.getNetwork().commandManager.newCommand(_this.getCommand());
						_this.update('remove');
						break;
					}
				});

			}

			ResourceAttributesChangeController.prototype = new Controller();
			
			ResourceGeneralAttributesController.prototype.getCommand = function() {
				return new NewResourceCommand(this.model, this.view.getValues());
			}

			ResourceAttributesChangeController.prototype.update = function(
					command, data) {
				switch (command) {
				case "remove":
					this.view.remove();
					this.model.removeObserver(this);
					this.parentController.removeObserver(this);
					break;
				}
			}

			return ResourceAttributesChangeController;
		}));