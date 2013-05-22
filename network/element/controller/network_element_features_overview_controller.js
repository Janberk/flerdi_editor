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
		[ "networkElementFeaturesOverviewView",
				"featureGeneralAttributesController", "controller",
				"newFeatureCommand", "changeAttributesCommand",
				"deleteFeatureCommand", "composedCommand" ],
		(function(NetworkElementFeaturesOverviewView,
				FeatureGeneralAttributesController, Controller,
				NewFeatureCommand, ChangeAttributesCommand,
				DeleteFeatureCommand, ComposedCommand) {

			var NetworkElementFeaturesOverviewController = function(model,
					parentController, parentClass) {
				this.base = Controller;
				this.base(model, parentController, parentClass);

				this.internId = 0;

				this.model.addObserver(this);

				var _this = this;

				this.resources = [];

				for ( var i = 0; i < this.model.features.length; i++) {
					this.resources.push({
						model : this.model.features[i],
						id : ++this.internId,
						name : 'fe-'+this.internId,
						status : 'old',
						removed : false,
						active : false,
						attr : this.model.features[i].getJson()
					});
				}

				this.lastActive = undefined;

				this.attributesController = undefined;

				this.view = new NetworkElementFeaturesOverviewView(
						this.createAttributesForView(),
						this.parent,
						function(evt, data) {
							switch (evt) {
							case 'showAttributes':

								if (_this.attributesController !== undefined) {
									_this.attributesController.update('remove',
											{});
								}

								if (_this.lastActive !== undefined) {
									_this.setAttributes(_this.lastActive);
								}
								_this.lastActive = data.id

								_this.attributesController = new FeatureGeneralAttributesController(
										_this.model, _this, 'attributes');
								_this.attributesController.model
										.removeObserver(_this.attributesController);

								_this.setActive(data.id);

								if (_this.getAttributes(data.id) !== undefined) {
									_this.attributesController.update(
											'updateWithoutModel', _this
													.getAttributes(data.id));
								}

								_this.view.resources = _this
										.createAttributesForView();
								_this.view.refresh();

								break;
							case 'new':
								_this.resources.push({
									model : undefined,
									id : ++_this.internId,
									name : 'new feature',
									status : 'new',
									removed : false,
									active : false,
									attr : {}
								});
								_this.view.resources = _this
										.createAttributesForView();
								_this.view.refresh();
								break;
							case 'remove':

								_this.removeResource(data.id);
								_this.view.resources = _this
										.createAttributesForView();

								if (data.active) {
									if (_this.nextVisibleResource() !== undefined) {
										_this.view.setActive(_this
												.nextVisibleResource());
									} else {
										_this.attributesController
												.update('remove');
										_this.attributesController = undefined;
									}
								}

								_this.view.refresh();
								break;
							}
						});

				if (this.resources.length != 0) {
					this.view.setActive(this.resources[0].id);
					this.resources[0].active = true;
				}
				// creating the views that should be shown inside this
				// controllers view

			}

			NetworkElementFeaturesOverviewController.prototype = new Controller();

			NetworkElementFeaturesOverviewController.prototype.getCommand = function() {
				if (this.attributesController !== undefined) {
					for ( var i = 0; i < this.resources.length; i++) {
						if (this.resources[i].id == this.getActive()) {
							this.resources[i].attr = this.attributesController.view
									.getValues();
						}
					}
				}
				var commands = [];
				for ( var i = 0; i < this.resources.length; i++) {
					switch (this.resources[i].status) {
					case 'old':
						if (this.resources[i].removed == true
								&& this.resources[i].model !== undefined) {
							// commands.push('löschen');
							commands.push(new DeleteFeatureCommand(this.model,
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
							// commands.push('neues');
							commands.push(new NewFeatureCommand(this.model,
									this.resources[i].attr));
						}
						break;
					}
				}
				return new ComposedCommand(commands);
			}

			NetworkElementFeaturesOverviewController.prototype.update = function(
					command, data) {
				switch (command) {
				case "update":
					this.setActive(this.nextVisibleResource());
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

			NetworkElementFeaturesOverviewController.prototype.createAttributesForView = function() {
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

			NetworkElementFeaturesOverviewController.prototype.removeResource = function(
					id) {
				for ( var i = 0; i < this.resources.length; i++) {
					if (this.resources[i].id === id) {
						this.resources[i].removed = true;
						break;
					}
				}
				this.view.refresh();
			}

			NetworkElementFeaturesOverviewController.prototype.setAttributes = function(
					id) {
				for ( var i = 0; i < this.resources.length; i++) {
					if (this.resources[i].id == id) {
						this.resources[i].attr = this.attributesController.view
								.getValues();
						break;
					}
				}
			}

			NetworkElementFeaturesOverviewController.prototype.getAttributes = function(
					id) {
				for ( var i = 0; i < this.resources.length; i++) {
					if (this.resources[i].id === id) {
						return this.resources[i].attr
					}
				}
			}

			NetworkElementFeaturesOverviewController.prototype.setActive = function(
					id) {
				for ( var i = 0; i < this.resources.length; i++) {
					if (this.resources[i].id == id) {
						this.resources[i].active = true;
					} else {
						this.resources[i].active = false;
					}
				}
			}

			NetworkElementFeaturesOverviewController.prototype.nextVisibleResource = function() {
				for ( var i = 0; i < this.resources.length; i++) {
					if (this.resources[i].removed == false) {
						return this.resources[i].id;
					}
				}

				return undefined;
			}

			NetworkElementFeaturesOverviewController.prototype.getActive = function() {
				for ( var i = 0; i < this.resources.length; i++) {
					if (this.resources[i].active) {
						return this.resources[i].id;
					}
				}
				return undefined;
			}

			return NetworkElementFeaturesOverviewController;
		}));