/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * implements IObserver
 * 
 * 	
 * This is the Main controller for a composed view.
 * 
 *
 */

define(
		[ "networkElementGeneralAttributesView", "changeAttributesCommand" ],
		(function(NetworkElementGeneralAttributesView, ChangeAttributesCommand) {

			var NetworkElementGeneralAttributesController = function(model,
					parentController, parentClass) {
				var _this = this;

				this.model = model;

				this.ne_type = this.model.ne_type;
				this.alias = this.model.alias;
				this.identifier = this.model.identifier;

				this.parentClass = parentClass;
				this.parentController = parentController;
				this.parent = parentController.view.dialog.getBody().find(
						'.' + this.parentClass);

				this.model.addObserver(this);

				this.view = new NetworkElementGeneralAttributesView({
					identifier : this.identifier,
					ne_type : this.ne_type,
					alias : this.alias
				}, this.parent, function(data) {
					this.update("save");
				});

			}

			NetworkElementGeneralAttributesController.prototype.getCommand = function() {
				return new ChangeAttributesCommand(this.model, this.view
						.getValues());
			}

			NetworkElementGeneralAttributesController.prototype.update = function(
					command, data) {
				switch (command) {
				case "update":
					this.view.ne_type = this.model.ne_type;
					this.view.alias = this.model.alias;
					this.view.identifier = this.model.identifier;
					this.view.refresh();
					break;
				case "remove":
					this.view.remove();
					this.model.removeObserver(this);
					this.parentController.removeObserver(this);
					break;
				}
			}

			return NetworkElementGeneralAttributesController;
		}));