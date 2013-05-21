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
		[ "resourceGeneralAttributesView", "changeAttributesCommand" , 'controller'],
		(function(ResourceGeneralAttributesView, ChangeAttributesCommand, Controller) {

			var ResourceGeneralAttributesController = function(model, parentController, parentClass) {
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
					this.update("save");
				});

			}

			ResourceGeneralAttributesController.prototype = new Controller();
			
			ResourceGeneralAttributesController.prototype.getCommand = function() {
				return new ChangeAttributesCommand(this.model, this.view.getValues());
			}

			ResourceGeneralAttributesController.prototype.update = function(
					command, data) {
				switch (command) {
				case 'updateWithoutModel':
					this.view.alias = data.alias;
					this.view.avp_attribute = data.avp_attribute;
					this.view.composing_operation = data.alias;
					this.view.confidence = data.confidence;
					this.view.identifier = data.identifier;
					this.view.is_request = data.is_request;
					this.view.resource_unit = data.resource_unit;
					this.view.time_unit = data.time_unit;
					this.view.timestamp = data.timestamp;
					this.view.value = data.value;
					this.view.value_type = data.value_type;
					this.view.refresh();
					break;
				case "update":
					this.view.alias = this.model.alias;
					this.view.avp_attribute = this.model.avp_attribute;
					this.view.composing_operation = this.model.alias;
					this.view.confidence = this.model.confidence;
					this.view.identifier = this.model.identifier;
					this.view.is_request = this.model.is_request;
					this.view.resource_unit = this.model.resource_unit;
					this.view.time_unit = this.model.time_unit;
					this.view.timestamp = this.model.timestamp;
					this.view.value = this.model.value;
					this.view.value_type = this.model.value_type;
					this.view.refresh();
					break;
				case "remove":
					this.view.remove();
					this.model.removeObserver(this);
					this.parentController.removeObserver(this);
					break;
				}
			}

			return ResourceGeneralAttributesController;
		}));