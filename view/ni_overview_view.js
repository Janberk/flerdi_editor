/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
		[ "jquery", "button", "overviewComponent", "alertDialogue" ],
		(function($, Button, OverviewComponent, AlertDialogue) {
			var InterfacesOverviewView = function(attributes,
					parent, callback) {
				this.parent = parent;

				this.interfaces = attributes || [];

				this.components = [];

				this.callback = function() {
				};
				if (callback != undefined && typeof callback == 'function') {
					this.callback = callback;
				}
				this.left = document.createElement('div');

				this.buttonBar = document.createElement('div');
				this.overViewContainer = document.createElement('div');
				this.container = document.createElement('div');

				this.drawView();
			}

			/**
			 * This functions draws the View.
			 * 
			 */
			InterfacesOverviewView.prototype.drawView = function() {
				var _this = this;

				$(this.container).addClass('flerdi-ui-overview').css({
					margin : '0px 10px 0px 0px'
				});

				$(this.overViewContainer).css({
					height : 200,
					textAlign : 'center'
				}).addClass('flerdi-ui-overview-overviewcontainer');

				$(this.buttonBar).css({
					margin : '0px 0px 5px 0px',
					padding : '5px 5px 0px 5px',
					textAlign : "left"
				}).addClass('flerdi-ui-overview-btnbar');

				$(this.left).css({
					height: '100%'
				});

				this.refresh();

				var btn = new Button({
					text : "New Interface",
					size : 'mini'
				}, this.buttonBar, function() {
					_this.callback('new',{});
				});

				btn.show();

				$(this.container).append(this.overViewContainer);
				$(this.container).append(this.buttonBar);
				$(this.left).append(this.container);
				$(this.parent).append(this.left);
				$(this.parent).append(this.attributesContainer);

			}

			/**
			 * This function returns a JSON representing the content of all
			 * Input and select fields, belonging to this Dialogue
			 * 
			 */
			InterfacesOverviewView.prototype.getValues = function() {
				return this.interfaces;
			}

			/*
			 * This view refreshes the view
			 * 
			 */
			InterfacesOverviewView.prototype.refresh = function() {
				var _this = this;
				
				$(this.overViewContainer).empty();
				this.components = [];

				for ( var i = 0; i < this.interfaces.length; i++) {
					if (!this.interfaces[i].removed) {
						this.components
								.push({
									base : {
										id : this.interfaces[i].id,
										name : this.interfaces[i].name,
										status : this.interfaces[i].status,
									},

									component : new OverviewComponent(
											{
												id : _this.interfaces[i].id,
												name : _this.interfaces[i].name,
												active : _this.interfaces[i].active,
											},
											this.overViewContainer,
											function(evt, data) {
												switch (evt) {
												case 'remove':
													/*new AlertDialogue(
															'Are you sure you want to delete this Interface?',
															function() {
																
															});*/
													_this.callback('remove',data)
													break;
												case 'click':
													_this.setActive(data.id)
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
											.html('no interfaces')
											.addClass(
													'flerdi-ui-overview-overviewcontainer-empty'));
				} else {
					for ( var i = 0; i < this.components.length; i++) {
						this.components[i].component.show();
					}
				}
			}

			InterfacesOverviewView.prototype.getBody = function() {
				return this.parent;
			}

			InterfacesOverviewView.prototype.remove = function() {

			}

			InterfacesOverviewView.prototype.setActive = function(id) {
				if (this.components.length != 0) {
					for ( var i = 0; i < this.components.length; i++) {

						if (this.components[i].base.id === id) {
							this.components[i].component.active = true;
							
						} else {
							this.components[i].component.active = false;
						}
						this.components[i].component.refresh();
					}
					
				}
				this.callback('showAttributes', {
					id :  id,
				});
				
			}

			return InterfacesOverviewView;
		})); // define
