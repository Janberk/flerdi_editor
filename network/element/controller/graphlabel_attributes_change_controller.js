/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * implements IObserver
 */

define([ "graphlabelAttributesView" ], (function(GraphLabelAttribuesView) {

	var GraphLabelAttributesChangeController = function(model) {
		this.model = model;
		this.model.observable.addObserver(this);
		var _this = this;
		
		this.view = new GraphLabelAttribuesView({
			id : this.model.id,
			graph_type : this.model.graph_type,
			role_identifier : this.model.role_identifier,
			v_net_identifier : this.model.v_net_identifier,
			graph_tag : this.model.graph_tag,
			graph_nr : this.model.graph_nr
		}, function(data) {
			// TODO das muss noch als Command ausgekapselt werden
			_this.model.id = data.id;
			_this.model.graph_type = data.graph_type;
			_this.model.role_identifier = data.role_identifier;
			_this.model.v_net_identifier = data.v_net_identifier;
			_this.model.graph_tag = data.graph_tag;
			_this.model.graph_nr = data.graph_nr;
			_this.model.observable.notifyAll("update");
			_this.update('remove', {});
		});
		
		$(this.view.table).find('[name="graph_type"]').prop('disabled',true);
	}

	GraphLabelAttributesChangeController.prototype.update = function(command,
			data) {
		switch (command) {
		case "update":
			this.view.id = this.model.id;
			this.view.graph_type = this.model.graph_type;
			this.view.role_identifier = this.model.role_identifier;
			this.view.v_net_identifier = this.model.v_net_identifier;
			this.view.graph_tag = this.model.graph_tag;
			this.view.graph_nr = this.model.graph_nr;
			this.view.refresh();
			break;
		case "remove":
			this.view.remove();
			this.model.observable.removeObserver(this);
			break;
		}
	}

	return GraphLabelAttributesChangeController;
}));