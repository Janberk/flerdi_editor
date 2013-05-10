/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * implements IObserver
 */

define([ "graphlabelAttributesView", 'changeAttributesCommand' ], (function(
		GraphLabelAttribuesView, ChangeAttributesCommand) {

	var GraphLabelAttributesChangeController = function(model) {
		this.model = model;
		this.model.addObserver(this);
		var _this = this;

		this.view = new GraphLabelAttribuesView({
			graph_type : this.model.graph_type,
			role_identifier : this.model.role_identifier,
			v_net_identifier : this.model.v_net_identifier,
			graph_tag : this.model.graph_tag,
			graph_nr : this.model.graph_nr
		}, function(data) {
			_this.model.commandManager.newCommand(new ChangeAttributesCommand(
					_this.model, {
						graph_type : data.graph_type,
						role_identifier : data.role_identifier,
						v_net_identifier : data.v_net_identifier,
						graph_tag : data.graph_tag,
						graph_nr : data.graph_nr
					}));
			_this.update('remove', {});
		}, function(data) {
			_this.update("remove", {});
		});

		$(this.view.table).find('[name="graph_type"]').prop('disabled', true);
	}

	GraphLabelAttributesChangeController.prototype.update = function(command,
			data) {
		switch (command) {
		case "update":
			this.view.graph_type = this.model.graph_type;
			this.view.role_identifier = this.model.role_identifier;
			this.view.v_net_identifier = this.model.v_net_identifier;
			this.view.graph_tag = this.model.graph_tag;
			this.view.graph_nr = this.model.graph_nr;
			this.view.refresh();
			break;
		case "remove":
			this.view.remove();
			this.view = undefined;
			this.model.removeObserver(this);
			break;
		}
	}

	return GraphLabelAttributesChangeController;
}));