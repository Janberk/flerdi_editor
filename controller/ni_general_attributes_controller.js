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
		[ "interfaceGeneralAttributesView", "changeAttributesCommand" , 'controller'],
		(function(InterfaceGeneralAttributesView, ChangeAttributesCommand, Controller) {

			var InterfaceGeneralAttributesController = function(model, parentController, parentClass) {
				this.base = Controller;
				this.base(model, parentController, parentClass);

				this.model.addObserver(this);
				
				var _this = this;

			    this.ni_type = this.model.ni_type;
			    this.id = this.model.id;
			    this.network_interface_id = this.model.network_interface_id;
			    this.network_element_id = this.model.network_element_id;
			    this.alias = this.model.alias;
			    this.identifier = this.model.identifier;
				
				this.view = new InterfaceGeneralAttributesView({
					ni_type : _this.ni_type,
					id : _this.id,
					alias : _this.alias,
					identifier : _this.identifier
				}, this.parent, function(evt, data) {
					this.update("save");
				});

			}

			InterfaceGeneralAttributesController.prototype = new Controller();
			
			InterfaceGeneralAttributesController.prototype.getCommand = function() {
				return new ChangeAttributesCommand(this.model, this.view.getValues());
			}

			InterfaceGeneralAttributesController.prototype.update = function(
					command, data) {
				switch (command) {
				case 'updateWithoutModel':
					this.view.ni_type = data.ni_type;
				    this.view.id = data.id;
				    this.view.alias = data.alias;
				    this.view.identifier = data.identifier;
					this.view.refresh();
					break;
				case "update":
				    this.view.ni_type = this.model.ni_type;
				    this.view.id = this.model.id;
				    this.view.alias = this.model.alias;
				    this.view.identifier = this.model.identifier;
					this.view.refresh();
					break;
				case "remove":
					this.view.remove();
					this.model.removeObserver(this);
					this.parentController.removeObserver(this);
					break;
				}
			}

			return InterfaceGeneralAttributesController;
		}));