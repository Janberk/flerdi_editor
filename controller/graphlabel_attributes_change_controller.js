/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * implements IObserver
 */

define([ "graphlabelAttributesView", 'changeAttributesCommand' ,'controller'], (function(
		GraphLabelAttribuesView, ChangeAttributesCommand, Controller) {

	var GraphLabelAttributesChangeController = function(model,
			parentController, parentClass) {
		this.base = Controller;
		this.base(model, parentController, parentClass);

		this.model.addObserver(this);
		var _this = this;
		
		this.view = new GraphLabelAttribuesView({
			graph_type : this.model.graph_type,
			role_identifier : this.model.role_identifier,
			v_net_identifier : this.model.v_net_identifier,
			graph_tag : this.model.graph_tag,
			graph_nr : this.model.graph_nr
		},this.parent, function(evt, data) {
			switch(evt){
			case 'ok':
				_this.model.commandManager.newCommand(_this.getCommand());
				
				break;
			case 'close':
				_this.update('remove', {});
				break
			}
		});

		$(this.view.table).find('[name="graph_type"]').prop('disabled', true);
	}

	GraphLabelAttributesChangeController.prototype = new Controller();

	GraphLabelAttributesChangeController.prototype.getCommand = function() {
		var attributes = this.view.getValues();
		$.post('http://localhost:4567/graph_label/' + this.model.id, {
			_method: 'put',
			graph_type: attributes.graph_type,
			graph_tag: attributes.graph_tag,
			graph_nr: attributes.graph_nr,
			role_identifier: attributes.role_identifier,
			v_net_identifier: attributes.v_net_identifier
		});
		return new ChangeAttributesCommand(this.model, {
			graph_type : attributes.graph_type,
			role_identifier : attributes.role_identifier,
			v_net_identifier : attributes.v_net_identifier,
			graph_tag : attributes.graph_tag,
			graph_nr : attributes.graph_nr
		})
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