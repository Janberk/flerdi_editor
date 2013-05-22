/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ "jquery", 'listDialogueAttributes', 'jsonViewer' ],
		(function($, ListDialogueAttributes, JsonViewer) {
			var NetworkElementGeneralAttributesView = function(attributes, parent,
					callback) {
				this.parent = parent;
				this.attributes = attributes || {};

				this.ne_type = this.attributes.ne_type || "";
				this.alias = this.attributes.alias || "";
				this.identifier = this.attributes.identifier || "";

				this.callback = function() {
				};
				if (callback != undefined && typeof callback == 'function') {
					this.callback = callback;
				}

				this.drawView();
			}

			/**
			 * This functions draws the View.
			 * 
			 */
			NetworkElementGeneralAttributesView.prototype.drawView = function() {
				var _this = this;

				this.table = document.createElement('table');
				new JsonViewer().createHeader(this.table);
				$(this.table).append(
						new JsonViewer().createTable({
							ne_type : _this.ne_type,
							console_interface : _this.console_interface,
							alias : _this.alias,
							identifier : _this.identifier
						}, new ListDialogueAttributes().getGeneralJson(),
								"ui-genral-attributes-input")).css('width',
						'100%');

				$(this.parent).append(this.table);
			}

			/**
			 * This function returns a JSON representing the content of all
			 * Input and select fields, belonging to this Dialogue
			 * 
			 */
			NetworkElementGeneralAttributesView.prototype.getValues = function() {
				var elements = $.find('.ui-genral-attributes-input');
				var json = {};
				for ( var i = 0; i < elements.length; i++) {
					json[$(elements[i]).attr('name')] = $(elements[i]).val()
				}
				
				return json;
			}

			/*
			 * This view refreshes the view
			 * 
			 */
			NetworkElementGeneralAttributesView.prototype.refresh = function() {
				var elements = $.find('.ui-genral-attributes-input');
				for ( var i = 0; i < elements.length; i++) {
					switch ($(elements[i]).attr('name')) {
					case 'ne_type':
						$(elements[i]).val(this.ne_type);
						break;
					case 'alias':
						$(elements[i]).val(this.alias);
						break;
					case 'identifier':
						$(elements[i]).val(this.identifier);
						break;
					}
				}
			}

			NetworkElementGeneralAttributesView.prototype.getBody = function(){
				return this.table;
			}
			
			NetworkElementGeneralAttributesView.prototype.remove = function() {
				$(this.parent).empty();
			}

			return NetworkElementGeneralAttributesView;
		})); // define
