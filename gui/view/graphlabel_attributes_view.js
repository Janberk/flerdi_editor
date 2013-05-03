/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ "jquery", 'dialog', 'listDialogueAttributes', 'jsonViewer' ],
		(function($, Dialog, ListDialogueAttributes, JsonViewer) {
			var GraphLabelAttribuesView = function(attributes, callback, onDelete) {

				attributes = attributes || {};
				this.id = attributes.id || "";
				this.graph_type = attributes.graph_type || "";
				this.role_identifier = attributes.role_identifier || "";
				this.v_net_identifier = attributes.v_net_identifier || "";
				this.graph_tag = attributes.graph_tag || "";
				this.graph_nr = attributes.graph_nr || "";

				this.callback = function() {
				};
				if (callback != undefined && typeof callback == 'function') {
					this.callback = callback;
				}
				if (onDelete != undefined && typeof onDelete == 'function') {
					this.onDelete = onDelete;
				}				

				this.drawView();
			}

			/**
			 * This functions draws the View.
			 * 
			 */
			GraphLabelAttribuesView.prototype.drawView = function() {
				var _this = this;
				this.dialog = new Dialog("changeGraphlabelAttributes",
						"graph attributes");
				this.dialog.addOk(function() {
					_this.callback(_this.getValues());
					
				});
				this.dialog.addCancel(function() {
					_this.onDelete();
				});

				this.table = document.createElement('table');
				new JsonViewer().createHeader(this.table);
				$(this.table).append(
						new JsonViewer().createTable({
							id : _this.id,
							graph_type : _this.graph_type,
							role_identifier : _this.role_identifier,
							v_net_identifier : _this.v_net_identifier,
							graph_tag : _this.graph_tag,
							graph_nr : _this.graph_nr
						},
								new ListDialogueAttributes()
										.getGraphLableJson(),
								"ui-graphlabel-attributes-input")).css('width',
						'100%');

				this.dialog.setContent(this.table);
			}

			/**
			 * This function returns a JSON representing the content of all
			 * Input and select fields, belonging to this Dialogue
			 * 
			 */
			GraphLabelAttribuesView.prototype.getValues = function() {
				var elements = $.find('.ui-graphlabel-attributes-input');
				var json = {};
				for ( var i = 0; i < elements.length; i++) {
					json[$(elements[i]).attr('name')] = $(elements[i]).val()
				}

				return json;
			}

			// TODO ich bin noch nicht zufrieden mit dieser funktion, sowhl als
			// allgmeiner aufbau der refresh funktion als auch dieser spezielle
			// fall - Stefan
			/**
			 * This view refreshes the view
			 * 
			 */
			GraphLabelAttribuesView.prototype.refresh = function() {
				var elements = $.find('.ui-graphlabel-attributes-input');
				for ( var i = 0; i < elements.length; i++) {
					switch ($(elements[i]).attr('name')) {
					case 'id':
						$(elements[i]).val(this.id);
						break;
					case 'graph_type':
						$(elements[i]).val(this.graph_type);
						break;
					case 'role_identifier':
						$(elements[i]).val(this.role_identifier);
						break;
					case 'v_net_identifier':
						$(elements[i]).val(this.v_net_identifier);
						break;
					case 'graph_tag':
						$(elements[i]).val(this.graph_tag);
						break;
					case 'graph_nr':
						$(elements[i]).val(this.graph_nr);
						break;
					}
				}
			}

			GraphLabelAttribuesView.prototype.remove = function() {
				
			}

			return GraphLabelAttribuesView;
		})); // define
