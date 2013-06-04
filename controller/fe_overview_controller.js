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
		[ "featuresOverviewView",
				"featureAttributesChangeController", "controller",
				"newFeatureCommand", "composedCommand",
				"changeAttributesCommand", "deleteFeatureCommand" ],
		(function(FeaturesOverviewView,
				FeatureAttributesChangeController, Controller,
				NewFeatureCommand, ComposedCommand, ChangeAttributesCommand,
				DeleteFeatureCommand) {

			var FeaturesOverviewController = function(model,
					parentController, parentClass) {
				this.base = Controller;
				this.base(model, parentController, parentClass);

				this.internId = 0;

				this.model.addObserver(this);

				var _this = this;

				this.features = [];

				for ( var i = 0; i < this.model.features.length; i++) {
					this.features.push({
						model : this.model.features[i],
						id : ++this.internId,
						name : this.model.features[i].identifier,
						status : 'old',
						removed : false,
						attr : this.model.features[i].getJson()
					});
				}

				this.attributesController = undefined;

				this.view = new FeaturesOverviewView(this
						.createAttributesForView(), this.parent, function(evt,
						data) {
					switch (evt) {
					case 'showAttributes':
						_this.showAttributesController(data.id);
						break;
					case 'new':
						var newId = ++_this.internId;
						_this.features.push({
							model : undefined,
							id : newId,
							name : 'new feature',
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

			FeaturesOverviewController.prototype = new Controller();

			FeaturesOverviewController.prototype.getCommand = function() {
				var commands = [];
				for ( var i = 0; i < this.features.length; i++) {
					switch (this.features[i].status) {
					case 'old':
						if (this.features[i].removed == true
								&& this.features[i].model !== undefined) {
							commands.push(new DeleteFeatureCommand(this.model,
									this.features[i].model));
						} else if (this.features[i].attr !== undefined
								&& this.features[i].model !== undefined) {
							commands.push(new ChangeAttributesCommand(
									this.features[i].model,
									this.features[i].attr));
						}
						break;
					case 'new':
						if (this.features[i].removed == false
								&& this.features[i].attr !== undefined) {
							commands.push(new NewFeatureCommand(this.model,
									this.features[i].attr));
						}
						break;
					}
				}
				return new ComposedCommand(commands);
			}

			FeaturesOverviewController.prototype.update = function(
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

			FeaturesOverviewController.prototype.createAttributesForView = function() {
				var attributes = [];
				for ( var i = 0; i < this.features.length; i++) {
					attributes.push({});
					for ( var key in this.features[i]) {

						if (key !== 'model') {
							attributes[i][key] = this.features[i][key];
						}
					}
				}
				return attributes;
			}

			FeaturesOverviewController.prototype.removeResource = function(
					id) {
				for ( var i = 0; i < this.features.length; i++) {
					if (this.features[i].id === id) {
						this.features[i].removed = true;
						break;
					}
				}
				this.view.refresh();
			}

			FeaturesOverviewController.prototype.setAttributes = function(
					id, attr) {
				for ( var i = 0; i < this.features.length; i++) {
					if (this.features[i].id == id) {
						this.features[i].attr = attr;
						break;
					}
				}
			}

			FeaturesOverviewController.prototype.getAttributes = function(
					id) {
				for ( var i = 0; i < this.features.length; i++) {
					if (this.features[i].id === id) {
						return this.features[i].attr
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
			FeaturesOverviewController.prototype.showAttributesController = function(
					id) {
				var _this = this;
				
				if (this.attributesController !== undefined) {
					this.attributesController.update('remove', {});
					this.attributesController = undefined;
				}
				
				this.attributesController = new FeatureAttributesChangeController(
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

			return FeaturesOverviewController;
		}));