/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * implements IObserver
 */

define([ "graphlabelAttributesView", "network", "controller" ], (function(
		GraphLabelAttribuesView, Network, Controller) {

	var GraphLabelAttributesCreateController = function(model,
			parentController, parentClass) {
		this.base = Controller;
		this.base(model, parentController, parentClass);
		var _this = this;

		this.view = new GraphLabelAttribuesView({}, this.parent, function(evt,
				data) {
			switch (evt) {
			case 'ok':
				var attributes = _this.view.getValues();
				var network = new Network(data.id, data.graph_type,
						data.role_identifier, data.v_net_identifier,
						data.graph_tag, data.graph_nr);

				environment.networks.newNetwork(network);
				_this.update('remove', {});
				break;
			case 'close':
				_this.update('remove', {});
				break
			}

		});
	}

	GraphLabelAttributesCreateController.prototype = new Controller();

	GraphLabelAttributesCreateController.prototype.getCommand = function() {
		return null;
	}

	GraphLabelAttributesCreateController.prototype.update = function(command,
			data) {
		switch (command) {
		case "remove":
			this.view.remove();
			this.view = undefined;
			break;
		}
	}

	return GraphLabelAttributesCreateController;
}));