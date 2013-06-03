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
		[ "interfacesOverviewView",
				"interfaceAttributesController", "controller",
				"newInterfaceCommand", "composedCommand",
				"changeAttributesCommand", "deleteInterfaceCommand" ],
		(function(InterfacesOverviewView,
				InterfaceAttributesController, Controller,
				NewInterfaceCommand, ComposedCommand, ChangeAttributesCommand,
				DeleteInterfaceCommand) {

			var InterfacesOverviewController = function(model,
					parentController, parentClass) {
				this.base = Controller;
				this.base(model, parentController, parentClass);

				this.internId = 0;

				this.model.addObserver(this);
				
				var _this = this;

				this.interfaces = [];

				for ( var i = 0; i < this.model.network_interfaces.length; i++) {
					this.interfaces.push({
						model : this.model.network_interfaces[i],
						id : ++this.internId,
						name : this.model.network_interfaces[i].identifier,
						status : 'old',
						removed : false,
						attr : this.model.network_interfaces[i].getJson()
					});
				}

				this.lastActive = undefined;

				this.attributesController = undefined;

				this.view = new InterfacesOverviewView(this
						.createAttributesForView(), this.parent, function(evt,
						data) {
					switch (evt) {
					case 'showAttributes':
						_this.showAttributesController(data.id);
						break;
					case 'new':
						var newId = ++_this.internId;
						_this.interfaces.push({
							model : undefined,
							id : newId,
							name : 'new interface',
							status : 'new',
							removed : false,
							attr : {}
						});
						_this.view.interfaces = _this.createAttributesForView();
						_this.view.refresh();

						_this.showAttributesController(newId);
						break;
					case 'remove':
						_this.removeInterface(data.id);
						_this.view.interfaces = _this.createAttributesForView();

						_this.view.refresh();
						break;
					}
				});
			}

			InterfacesOverviewController.prototype = new Controller();

			InterfacesOverviewController.prototype.getCommand = function() {
				var commands = [];
				for ( var i = 0; i < this.interfaces.length; i++) {
					switch (this.interfaces[i].status) {
					case 'old':
						if (this.interfaces[i].removed == true
								&& this.interfaces[i].model !== undefined) {
							commands.push(new DeleteInterfaceCommand(this.model,
									this.interfaces[i].model));
						} else if (this.interfaces[i].attr !== undefined
								&& this.interfaces[i].model !== undefined) {
							commands.push(new ChangeAttributesCommand(
									this.interfaces[i].model,
									this.interfaces[i].attr));
						}
						break;
					case 'new':
						if (this.interfaces[i].removed == false
								&& this.interfaces[i].attr !== undefined) {
							commands.push(new NewInterfaceCommand(this.model,
									this.interfaces[i].attr));
						}
						break;
					}
				}
				return new ComposedCommand(commands);
			}

			InterfacesOverviewController.prototype.update = function(
					command, data) {
				switch (command) {
				case "update":
					this.view.interfaces = this.createAttributesForView();
					this.view.refresh();
					break;
				case "remove":
					this.notifyAll("remove", {});
					this.view.remove();
					this.model.removeObserver(this);
					this.parentController.removeObserver(this);
					break;
				}
			}

			InterfacesOverviewController.prototype.createAttributesForView = function() {
				var attributes = [];
				for ( var i = 0; i < this.interfaces.length; i++) {
					attributes.push({});
					for ( var key in this.interfaces[i]) {

						if (key !== 'model') {
							attributes[i][key] = this.interfaces[i][key];
						}
					}
				}
				return attributes;
			}

			InterfacesOverviewController.prototype.removeInterface = function(
					id) {
				for ( var i = 0; i < this.interfaces.length; i++) {
					if (this.interfaces[i].id === id) {
						this.interfaces[i].removed = true;
						break;
					}
				}
				this.view.refresh();
			}

			InterfacesOverviewController.prototype.setAttributes = function(
					id, attr) {
				for ( var i = 0; i < this.interfaces.length; i++) {
					if (this.interfaces[i].id == id) {
						this.interfaces[i].attr = attr;
						break;
					}
				}
			}

			InterfacesOverviewController.prototype.getAttributes = function(
					id) {
				for ( var i = 0; i < this.interfaces.length; i++) {
					if (this.interfaces[i].id === id) {
						return this.interfaces[i].attr
					}
				}
			}

			/**
			 * This function shows the View for a interface, with the given
			 * intern id
			 * 
			 * @param id
			 *            intern id of the interface you want to show the
			 *            attributes view for
			 */
			InterfacesOverviewController.prototype.showAttributesController = function(
					id) {
				var _this = this;

				if (this.attributesController !== undefined) {
					this.attributesController.update('remove', {});
					this.attributesController = undefined;
				}

				this.attributesController = new InterfaceAttributesController(
						this.model, this, '');

				if (this.getAttributes(id) !== undefined) {
					this.attributesController.update('updateWithoutModel',
							this.getAttributes(id));
				}
				this.view.interfaces = this.createAttributesForView();
				this.view.refresh();
				this.attributesController.view.callback = function(evt, dataIn) {
					switch (evt) {
					case 'ok':
						_this.setAttributes(id, dataIn);
						break;
					case 'close':
						_this.attributesController = undefined;
						break;
					}
				}
			}
			
			return InterfacesOverviewController;
		}));