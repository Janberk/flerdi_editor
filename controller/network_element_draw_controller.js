/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * implements IObserver
 */

define([ "networkElementDrawView", "contextMenu", "deleteNodeCommand",
		"changeAttributesCommand","controller" ], (function(NetworkElementDrawView,
		ContextMenu, DeleteNodeCommand, ChangeAttributesCommand, Controller) {

	var NetworkElementDrawController = function(model,parentController,parentClass) {
		this.base = Controller;
		this.base(model,parentController,parentClass);
		this.model = model;
		this.model.addObserver(this);
		var _this = this;
		
		this.view = new NetworkElementDrawView(this, {x:this.model.x,y:this.model.y,ne_type:this.model.ne_type},
				function(evt, data) {
					switch (evt){
					case 'context':
						return _this.menu;
						break;
					case 'moved':
						_this.model.graph_label.commandManager.newCommand(_this.getCommand());
						break;
					}
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

	}
	
	NetworkElementDrawController.prototype = new Controller();
	
	NetworkElementDrawController.prototype.getCommand = function(){
		return new ChangeAttributesCommand(this.model, this.view.getValues());
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
			this.model.removeObserver(this);
			break;
		}
	}
	

	return NetworkElementDrawController;
}));