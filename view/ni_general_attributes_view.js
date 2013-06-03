/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ "jquery", 'listDialogueAttributes', 'jsonViewer' ],
		(function($, ListDialogueAttributes, JsonViewer) {
			var InterfaceGeneralAttributesView = function(attributes, parent,
					callback) {
				this.parent = parent;
				this.attributes = attributes || {};

			    this.ni_type = attributes.ni_type;
			    this.id = attributes.id;
			    this.alias = attributes.alias;
			    this.identifier = attributes.identifier;
				
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
			InterfaceGeneralAttributesView.prototype.drawView = function() {
				var _this = this;

				this.table = document.createElement('table');
				new JsonViewer().createHeader(this.table);
				$(this.table).append(
						new JsonViewer().createTable({
							ni_type : _this.ni_type,
							id : _this.id,
							alias : _this.alias,
							identifier : _this.identifier
						}, new ListDialogueAttributes().getInterfacesJson(),
								"ui-interface-general-attributes-input")).css('width',
						'100%');

				$(this.parent).append(this.table);
			}

			/**
			 * This function returns a JSON representing the content of all
			 * Input and select fields, belonging to this Dialogue
			 * 
			 */
			InterfaceGeneralAttributesView.prototype.getValues = function() {
				var elements = $(this.table).find('.ui-interface-general-attributes-input');
				var json = {};
				for ( var i = 0; i < elements.length; i++) {
					json[$(elements[i]).attr('name')] = $(elements[i]).val();
				}
				
				return json;
			}

			/*
			 * This view refreshes the view
			 * 
			 */
			InterfaceGeneralAttributesView.prototype.refresh = function() {
				var elements =  $(this.table).find('.ui-interface-general-attributes-input');
				for ( var i = 0; i < elements.length; i++) {
					switch ($(elements[i]).attr('name')) {
					case 'ni_type':
						$(elements[i]).val(this.ni_type);
						break;
					case 'id':
						$(elements[i]).val(this.id);
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
			
			InterfaceGeneralAttributesView.prototype.getBody = function(){
				return this.table;
			}
			
			InterfaceGeneralAttributesView.prototype.remove = function() {
				$(this.parent).empty();
			}

			return InterfaceGeneralAttributesView;
		})); // define