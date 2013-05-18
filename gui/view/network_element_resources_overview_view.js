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

				this.overviewComponents = [];

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
				this.overviewComponents = [];
				for ( var i = 0; i < this.resources.length; i++) {
					if (!this.resources[i].removed) {
						this.overviewComponents.push(new OverviewComponent({
							id : _this.resources[i].id,
							name : _this.resources[i].name,
							active : false
						}, this.overViewContainer, function(evt, data) {
							switch(evt){
							case 'remove':
								_this.removeResource(data.id);
								break;
							case 'click':
								_this.callback('showAttributes',data);
								break;
							}
							_this.refresh();
						}));
					}
				}
				if (this.overviewComponents.length === 0) {
					$(this.overViewContainer)
							.append(
									$(document.createElement('div'))
											.html('no resouorces')
											.addClass(
													'flerdi-ui-overview-overviewcontainer-empty'));
				} else {
					for ( var i = 0; i < this.overviewComponents.length; i++) {
						this.overviewComponents[i].show();
					}
				}
			}

			NetworkElementResourcesOverviewView.prototype.getBody = function() {
				return this.table;
			}

			NetworkElementResourcesOverviewView.prototype.remove = function() {

			}
			
			NetworkElementResourcesOverviewView.prototype.removeResource = function(id){
				for ( var i = 0; i < this.resources.length; i++) {
					if(this.resources[i].id === id){
						this.resources[i].removed = true;
						break;
					}
				}
			}

			return NetworkElementResourcesOverviewView;
		})); // define
