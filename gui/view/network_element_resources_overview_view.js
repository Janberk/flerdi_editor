/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
		[ "jquery", "button", "overviewComponent" ],
		(function($, Button, OverviewComponent) {
			var NetworkElementResourcesOverviewView = function(attributes,
					parent, callback) {
				this.parent = parent;
				this.attributes = attributes || {};

				this.resources = attributes.resources || [];

				this.components = [];

				this.callback = function() {
				};
				if (callback != undefined && typeof callback == 'function') {
					this.callback = callback;
				}
				this.buttonBar = document.createElement('div');
				this.overViewContainer = document.createElement('div');
				this.container = document.createElement('div');
				this.drawView();
			}

			/**
			 * This functions draws the View.
			 * 
			 */
			NetworkElementResourcesOverviewView.prototype.drawView = function() {
				var _this = this;

				$(this.container).addClass('flerdi-ui-overview').css({
					margin : '0px 10px 0px 0px'
				});

				$(this.overViewContainer).css({
					height : 200,
					textAlign : 'center',
				}).addClass('flerdi-ui-overview-overviewcontainer');

				$(this.buttonBar).css({
					margin : '0px 0px 5px 0px',
					padding : '5px 5px 0px 5px',
					textAlign : "left"
				}).addClass('flerdi-ui-overview-btnbar');

				this.refresh();

				var btn = new Button({
					text : "New Resource",
					size : 'mini'
				}, this.buttonBar, function() {
					// TODO : hier muss dann die neue resource erstellt werden
					// bzw, die dummydatei
					_this.resources.push({
						id : 10,
						name : 'neue resource',
						status : 'new',
						removed : false
					});
					_this.refresh();
				});

				btn.show();

				$(this.container).append(this.overViewContainer);
				$(this.container).append(this.buttonBar);
				$(this.parent).append(this.container);

				if (this.components.length != 0) {
					this.callback('showAttributes', {
						id : this.components[0].base.id
					});
					this.setActive(this.components[0].base.id);
				}

			}

			/**
			 * This function returns a JSON representing the content of all
			 * Input and select fields, belonging to this Dialogue
			 * 
			 */
			NetworkElementResourcesOverviewView.prototype.getValues = function() {
				return this.resources;
			}

			/*
			 * This view refreshes the view
			 * 
			 */
			NetworkElementResourcesOverviewView.prototype.refresh = function() {
				var _this = this;
				$(this.overViewContainer).empty();
				this.components = [];
				
				for ( var i = 0; i < this.resources.length; i++) {
					if (!this.resources[i].removed) {
						this.components.push({
							base : {
								id : this.resources[i].id,
								name : this.resources[i].name,
								status : this.resources[i].status,
							},
							attributes : {},
							component : new OverviewComponent({
								id : _this.resources[i].id,
								name : _this.resources[i].name,
								active : false
							}, this.overViewContainer, function(evt, data) {
								switch (evt) {
								case 'remove':
									_this.removeResource(data.id);
									_this.refresh();
									break;
								case 'click':
									_this.callback('showAttributes', data);
									_this.setActive(data.id);
									break;
								}

							})
						});
					}
				}
				if (this.components.length === 0) {
					$(this.overViewContainer)
							.append(
									$(document.createElement('div'))
											.html('no resouorces')
											.addClass(
													'flerdi-ui-overview-overviewcontainer-empty'));
				} else {
					for ( var i = 0; i < this.components.length; i++) {
						this.components[i].component.show();
					}
				}
			}

			NetworkElementResourcesOverviewView.prototype.getBody = function() {
				return this.table;
			}

			NetworkElementResourcesOverviewView.prototype.remove = function() {

			}

			NetworkElementResourcesOverviewView.prototype.setActive = function(
					id) {
				for ( var i = 0; i < this.components.length; i++) {

					if (this.components[i].base.id === id) {
						this.components[i].component.active = true;
					} else {
						this.components[i].component.active = false;
					}
					this.components[i].component.refresh();
				}
			}

			NetworkElementResourcesOverviewView.prototype.removeResource = function(
					id) {
				for ( var i = 0; i < this.resources.length; i++) {
					if (this.resources[i].id === id) {
						this.resources[i].removed = true;
						break;
					}
				}
			}

			return NetworkElementResourcesOverviewView;
		})); // define
