/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ "jquery", 'listDialogueAttributes', 'jsonViewer' , 'dialogue'],
		(function($, ListDialogueAttributes, JsonViewer, Dialogue) {
			var InterfaceGeneralAttributesView = function(attributes, parent,
					callback) {
				this.base = Dialogue;
				this.base('editFeatureView', 'feature attributes');
				this.parent = parent;
				this.attributes = attributes || {};

			    this.ni_type = attributes.ni_type;
			    this.id = attributes.id;
			    this.network_interface_id = attributes.network_interface_id;
			    this.network_element_id = attributes.network_element_id;
			    this.alias = attributes.alias;
			    this.identifier = attributes.identifier;
				
				this.callback = function() {
				};
				if (callback != undefined && typeof callback == 'function') {
					this.callback = callback;
				}

				this.drawView();
				this.show();
			}

			InterfaceGeneralAttributesView.prototype = new Dialogue();
			
			
			/**
			 * This functions draws the View.
			 * 
			 */
			InterfaceGeneralAttributesView.prototype.drawView = function() {
				var _this = this;

				this.addOk(function() {
					_this.callback('ok', _this.getValues());

				});
				this.addCancel(function() {
					_this.callback('close', {});
				});
				
				this.table = document.createElement('table');
				new JsonViewer().createHeader(this.table);
				$(this.table).append(
						new JsonViewer().createTable({
							ni_type : _this.ni_type,
							id : _this.id,
							network_interface_id : _this.network_interface_id,
							network_element_id : _this.network_element_id,
							alias : _this.alias,
							identifier : _this.identifier
						}, new ListDialogueAttributes().getFeaturesJson(),
								"ui-interface-general-attributes-input")).css('width',
						'100%');

				this.setContent(this.table);
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
				var elements =  $(this.table).find('.ui-feature-general-attributes-input');
				for ( var i = 0; i < elements.length; i++) {
					switch ($(elements[i]).attr('name')) {
					case 'ni_type':
						$(elements[i]).val(this.ni_type);
						break;
					case 'id':
						$(elements[i]).val(this.id);
						break;
					case 'network_interface_id':
						$(elements[i]).val(this.network_interface_id);
						break;
					case 'network_element_id':
						$(elements[i]).val(this.network_element_id);
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

			return InterfaceGeneralAttributesView;
		})); // define