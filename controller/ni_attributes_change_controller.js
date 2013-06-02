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

			var InterfaceAttributesChangeController = function(model, parentController, parentClass) {
				this.base = Controller;
				this.base(model, parentController, parentClass);

				this.model.addObserver(this);
				
				var _this = this;

				this.alias = this.model.alias;
				this.id = this.model.id;
				this.identifier = this.model.identifier;
				this.network_element_id = this.model.network_element_id;
				this.network_interface_id = this.model.network_interface_id;
				this.ni_type = this.model.ni_type;
				
				this.view = new InterfaceGeneralAttributesView({
					alias : this.model.alias,
					id : this.model.id,
					identifier : this.model.identifier,
					network_element_id : this.model.network_element_id,
					network_interface_id : this.model.network_interface_id,
					ni_type : this.model.ni_type
				}, this.parent, function(evt, data) {
					_this.update("save");
				});

			}

			InterfaceAttributesChangeController.prototype = new Controller();
			
			InterfaceAttributesChangeController.prototype.getCommand = function() {
				return new ChangeAttributesCommand(this.model, this.view.getValues());
			}

			InterfaceAttributesChangeController.prototype.update = function(
					command, data) {
				switch (command) {
				case 'updateWithoutModel':
					this.alias = data.alias;
					this.id = data.id;
					this.identifier = data.identifier;
					this.network_element_id = data.network_element_id;
					this.network_interface_id = data.network_interface_id;
					this.ni_type = data.ni_type;
					break;
				case "update":
					this.alias = this.model.alias;
					this.id = this.model.id;
					this.identifier = this.model.identifier;
					this.network_element_id = this.model.network_element_id;
					this.network_interface_id = this.model.network_interface_id;
					this.ni_type = this.model.ni_type;
					break;
				case "remove":
					this.view.remove();
					this.model.removeObserver(this);
					this.parentController.removeObserver(this);
					break;
				}
			}

			return InterfaceAttributesChangeController;
		}));