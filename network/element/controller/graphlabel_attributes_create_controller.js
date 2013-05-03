/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * implements IObserver
 */

define(["graphlabelAttributesView", "network"], (function(GraphLabelAttribuesView, Network) {

	var GraphLabelAttributesCreateController = function(model) {
		var _this = this;
		
		this.view = new GraphLabelAttribuesView({},
			function(data) {
				// TODO das muss noch als Command ausgekapselt werden
				var network = new Network(data.id, data.graph_type, data.role_identifier, data.v_net_identifier, data.graph_tag, data.graph_nr);
				
				environment.networks.newNetwork(network);
				
				_this.update('remove', {});
			}, function(data) {
				_this.update("remove", {});
		});
	}

	GraphLabelAttributesCreateController.prototype.update = function(command, data) {
		switch (command) {
		case "remove":
			this.view.remove();
			break;
		}
	}

	return GraphLabelAttributesCreateController;
}));