/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * implements IObserver
 */

define([ "networkElementDrawView", "contextMenu", "deleteNodeCommand" ],
		(function(NetworkElementDrawView, ContextMenu, DeleteNodeCommand) {

			var NetworkElementDrawController = function(model) {
				this.model = model;
				this.model.observable.addObserver(this);
				var _this = this;
				this.view = new NetworkElementDrawView(this.model.x,
						this.model.y, this.model.ne_type, function(data) {
							// TODO das muss noch als Command ausgekapselt
							// werden
							_this.model.x = data.x;
							_this.model.y = data.y;
							_this.model.ne_type = data.ne_type;
							_this.model.observable.notifyAll("update");
						});

				this.menu = new ContextMenu();
				this.menu.addButton('Delete', function(e) {
					// create command for undo
					environment.networks.getNetwork().commandManager
							.newCommand(new DeleteNodeCommand(
									environment.networks.getNetwork(),
									_this.model));
				});
				this.menu.addButton('Properties', function(e) {
					controllerFactory.build(_this.model,"networkElementAttributes");
				});

				this.view.addContextMenue(this.menu);
			}

			NetworkElementDrawController.prototype.update = function(command,
					data) {
				switch (command) {
				case "update":
					this.view.x = this.model.x;
					this.view.y = this.model.y;
					this.view.ne_type = this.model.ne_type;
					this.view.refresh();
					break;
				case "remove":
					this.view.remove();
					this.model.observable.removeObserver(this);
					break;
				}
			}

			return NetworkElementDrawController;
		}));