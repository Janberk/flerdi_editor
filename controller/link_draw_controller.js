/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * implements IObserver
 */

define(
		[ "linkDrawView" ,"controller", "contextMenu", "deleteLinkCommand"],
		(function(LinkDrawView, Controller, ContextMenu, DeleteLinkCommand) {

			var LinkDrawController = function(model, parentController, parentClass) {
				this.base = Controller;
				this.base(model,parentController,parentClass);
				this.model = model;
				this.model.addObserver(this);
				var _this = this;

				this.points = [];

				for ( var i = 0; i < this.model.network_interfaces.length; i++) {
					var ne = this.model.network_interfaces[i].network_interface_id.network_element_id;
					
					this.points.push({
						x : ne.x,
						y : ne.y
					});
					
					// add observer to the connected elements
					ne.addObserver(this);
				}

				this.view = new LinkDrawView(this.model.id, this.model.ne_type,
						this.model.resources[0].avp_attribute, this.points,
						function(evt, data) {
							switch (evt){
							case 'context':
								return _this.menu;
								break;
							}
						});
				
				this.menu = new ContextMenu();
				this.menu.addButton('Delete', function(e) {
					// create command for undo
					_this.model.graph_label.commandManager
							.newCommand(new DeleteLinkCommand(_this.model.graph_label,
									_this.model));
				});
				this.menu.addButton('Properties', function(e) {
					controllerFactory.build(_this.model, "networkElementAttributes");
				});
			}

			LinkDrawController.prototype = new Controller();
			
			LinkDrawController.prototype.getCommand = function(){
				return undefined;
			}
			
			LinkDrawController.prototype.update = function(command, data) {
				switch (command) {
				case "update":
					this.points = [];
					for ( var i = 0; i < this.model.network_interfaces.length; i++) {
						this.points.push({
							x : this.model.network_interfaces[i].network_interface_id.network_element_id.x,
							y : this.model.network_interfaces[i].network_interface_id.network_element_id.y
						});
					}
					this.view.id = this.model.id;
					this.view.ne_type = this.model.ne_type;
					this.view.avp_attribute = this.model.resources[0].avp_attribute;
					this.view.points = this.points;
					this.view.refresh();
					break;
				case "remove":
					this.view.remove();
					this.model.removeObserver(this);
					for ( var i = 0; i < this.model.network_interfaces.length; i++) {
						this.model.network_interfaces[i].network_interface_id.network_element_id.removeObserver(this);
					}
					break;
				}
			}

			return LinkDrawController;
		}));