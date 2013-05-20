/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
		[ "jquery", "button", "overviewComponent", "alertDialog" ],
		(function($, Button, OverviewComponent, AlertDialog) {
			var NetworkElementFeaturesOverviewView = function(attributes,
					parent, callback) {
				this.parent = parent;
				this.attributes = attributes || {};

				this.features = attributes.features || [];

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
			NetworkElementFeaturesOverviewView.prototype.drawView = function() {
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
					text : "New Feature",
					size : 'mini'
				}, this.buttonBar, function() {
					// TODO : hier muss dann das neue feature erstellt werden
					// bzw, die dummydatei
					_this.features.push({
						id : 10,
						name : 'neues feature',
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
			NetworkElementFeaturesOverviewView.prototype.getValues = function() {
				return this.features;
			}

			/*
			 * This view refreshes the view
			 * 
			 */
			NetworkElementFeaturesOverviewView.prototype.refresh = function() {
				var _this = this;
				$(this.overViewContainer).empty();
				this.components = [];
				
				for ( var i = 0; i < this.features.length; i++) {
					if (!this.features[i].removed) {
						this.components.push({
							base : {
								id : this.features[i].id,
								name : this.features[i].name,
								status : this.features[i].status,
							},
							attributes : {},
							component : new OverviewComponent({
								id : _this.features[i].id,
								name : _this.features[i].name,
								active : false
							}, this.overViewContainer, function(evt, data) {
								switch (evt) {
								case 'remove':
									new AlertDialog('Are you sure you want to delete this Feature?', function() {
										_this.removeFeature(data.id);
										_this.refresh();
									});
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
											.html('no features')
											.addClass(
													'flerdi-ui-overview-overviewcontainer-empty'));
				} else {
					for ( var i = 0; i < this.components.length; i++) {
						this.components[i].component.show();
					}
				}
			}

			NetworkElementFeaturesOverviewView.prototype.getBody = function() {
				return this.table;
			}

			NetworkElementFeaturesOverviewView.prototype.remove = function() {

			}

			NetworkElementFeaturesOverviewView.prototype.setActive = function(id) {
				for ( var i = 0; i < this.components.length; i++) {

					if (this.components[i].base.id === id) {
						this.components[i].component.active = true;
					} else {
						this.components[i].component.active = false;
					}
					this.components[i].component.refresh();
				}
			}

			NetworkElementFeaturesOverviewView.prototype.removeFeature = function(id) {
				for ( var i = 0; i < this.features.length; i++) {
					if (this.features[i].id === id) {
						this.features[i].removed = true;
						break;
					}
				}
			}

			return NetworkElementFeaturesOverviewView;
		})); // define
