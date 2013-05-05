/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * implements IObserver
 */

define([ "networkElementDrawView", "contextMenu", "deleteNodeCommand",
		"changeAttributesCommand" ], (function(NetworkElementDrawView,
		ContextMenu, DeleteNodeCommand, ChangeAttributesCommand) {

	var NetworkElementDrawController = function(model) {
		this.model = model;
		this.model.observable.addObserver(this);
		var _this = this;
		this.view = new NetworkElementDrawView(this.model.x, this.model.y,
				this.model.ne_type, function(data) {
					_this.model.graph_label.commandManager
							.newCommand(new ChangeAttributesCommand(
									_this.model, {
										x : data.x,
										y : data.y,
										ne_type : data.ne_type
									}));
				});

		this.menu = new ContextMenu();
		this.menu.addButton('Delete', function(e) {
			// create command for undo
			_this.model.graph_label.commandManager
					.newCommand(new DeleteNodeCommand(_this.model.graph_label,
							_this.model));
		});
		this.menu.addButton('Properties', function(e) {
			controllerFactory.build(_this.model, "networkElementAttributes");
		});

		this.view.addContextMenue(this.menu);
	}

	NetworkElementDrawController.prototype.update = function(command, data) {
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