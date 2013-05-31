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
		[ "networkElementResourcesOverviewView",
				"resourceAttributesChangeController", "controller",
				"newResourceCommand", "composedCommand",
				"changeAttributesCommand", "deleteResourceCommand" ],
		(function(NetworkElementResourcesOverviewView,
				ResourceAttributesChangeController, Controller,
				NewResourceCommand, ComposedCommand, ChangeAttributesCommand,
				DeleteResourceCommand) {

			var NetworkElementResourcesOverviewController = function(model,
					parentController, parentClass) {
				this.base = Controller;
				this.base(model, parentController, parentClass);

				this.internId = 0;

				this.model.addObserver(this);

				var _this = this;

				this.resources = [];

				for ( var i = 0; i < this.model.resources.length; i++) {
					this.resources.push({
						model : this.model.resources[i],
						id : ++this.internId,
						name : this.model.resources[i].identifier,
						status : 'old',
						removed : false,
						attr : this.model.resources[i].getJson()
					});
				}

				this.attributesController = undefined;

				this.view = new NetworkElementResourcesOverviewView(this
						.createAttributesForView(), this.parent, function(evt,
						data) {
					switch (evt) {
					case 'showAttributes':
						_this.showAttributesController(data.id);
						break;
					case 'new':
						var newId = ++_this.internId;
						_this.resources.push({
							model : undefined,
							id : newId,
							name : 'new resource',
							status : 'new',
							removed : false,
							attr : {}
						});
						_this.view.resources = _this.createAttributesForView();
						_this.view.refresh();

						_this.showAttributesController(newId);
						break;
					case 'remove':
						_this.removeResource(data.id);
						_this.view.resources = _this.createAttributesForView();

						_this.view.refresh();
						break;
					}
				});
			}

			NetworkElementResourcesOverviewController.prototype = new Controller();

			NetworkElementResourcesOverviewController.prototype.getCommand = function() {
				var commands = [];
				for ( var i = 0; i < this.resources.length; i++) {
					switch (this.resources[i].status) {
					case 'old':
						if (this.resources[i].removed == true
								&& this.resources[i].model !== undefined) {
							commands.push(new DeleteResourceCommand(this.model,
									this.resources[i].model));
						} else if (this.resources[i].attr !== undefined
								&& this.resources[i].model !== undefined) {
							commands.push(new ChangeAttributesCommand(
									this.resources[i].model,
									this.resources[i].attr));
						}
						break;
					case 'new':
						if (this.resources[i].removed == false
								&& this.resources[i].attr !== undefined) {
							commands.push(new NewResourceCommand(this.model,
									this.resources[i].attr));
						}
						break;
					}
				}
				return new ComposedCommand(commands);
			}

			NetworkElementResourcesOverviewController.prototype.update = function(
					command, data) {
				switch (command) {
				case "update":
					this.view.resources = this.createAttributesForView();
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

			NetworkElementResourcesOverviewController.prototype.createAttributesForView = function() {
				var attributes = [];
				for ( var i = 0; i < this.resources.length; i++) {
					attributes.push({});
					for ( var key in this.resources[i]) {

						if (key !== 'model') {
							attributes[i][key] = this.resources[i][key];
						}
					}
				}
				return attributes;
			}

			NetworkElementResourcesOverviewController.prototype.removeResource = function(
					id) {
				for ( var i = 0; i < this.resources.length; i++) {
					if (this.resources[i].id === id) {
						this.resources[i].removed = true;
						break;
					}
				}
				this.view.refresh();
			}

			NetworkElementResourcesOverviewController.prototype.setAttributes = function(
					id, attr) {
				for ( var i = 0; i < this.resources.length; i++) {
					if (this.resources[i].id == id) {
						this.resources[i].attr = attr;
						break;
					}
				}
			}

			NetworkElementResourcesOverviewController.prototype.getAttributes = function(
					id) {
				for ( var i = 0; i < this.resources.length; i++) {
					if (this.resources[i].id === id) {
						return this.resources[i].attr
					}
				}
			}

			/**
			 * This function shows the View for a resource, with the given
			 * intern id
			 * 
			 * @param id
			 *            intern id of the resource you want to show the
			 *            attributes view for
			 */
			NetworkElementResourcesOverviewController.prototype.showAttributesController = function(
					id) {
				var _this = this;
				
				if (this.attributesController !== undefined) {
					this.attributesController.update('remove', {});
					this.attributesController = undefined;
				}
				
				this.attributesController = new ResourceAttributesChangeController(
						this.model, this, '');

				if (this.getAttributes(id) !== undefined) {
					this.attributesController.update('updateWithoutModel',
							this.getAttributes(id));
				}
				this.view.resources = this.createAttributesForView();
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

			return NetworkElementResourcesOverviewController;
		}));