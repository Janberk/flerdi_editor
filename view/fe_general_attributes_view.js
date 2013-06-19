/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ "jquery", 'listDialogueAttributes', 'jsonViewer' , 'dialogue'],
		(function($, ListDialogueAttributes, JsonViewer, Dialogue) {
			var FeatureGeneralAttributesView = function(attributes, parent,
					callback) {
				this.base = Dialogue;
				this.base('editFeatureView', 'feature attributes');
				this.parent = parent;
				this.attributes = attributes || {};

				this.avp_attribute = this.attributes.avp_attribute;
				this.is_request = this.attributes.is_request;
				this.priority = this.attributes.priority;
				this.value = this.attributes.value;
				
				this.callback = function() {
				};
				if (callback != undefined && typeof callback == 'function') {
					this.callback = callback;
				}

				this.drawView();
				this.show();
			}

			FeatureGeneralAttributesView.prototype = new Dialogue();
			
			
			/**
			 * This functions draws the View.
			 * 
			 */
			FeatureGeneralAttributesView.prototype.drawView = function() {
				var _this = this;

				this.addOk(function() {
					_this.callback('ok', _this.getValues());

				});
				this.addCancel(function() {
					_this.callback('close', {});
				});
				
				this.table = document.createElement('div');
				$(this.table).addClass('form-horizontal');
				new JsonViewer().createHeader(this.table);
				$(this.table).append(
						new JsonViewer().createTable({
							avp_attribute : _this.avp_attribute,
							is_request : _this.is_request,
							priority : _this.priority,
							value : _this.value
						}, new ListDialogueAttributes().getFeaturesJson(),
								"ui-feature-general-attributes-input")).css('width',
						'100%');

				this.setContent(this.table);
			}

			/**
			 * This function returns a JSON representing the content of all
			 * Input and select fields, belonging to this Dialogue
			 * 
			 */
			FeatureGeneralAttributesView.prototype.getValues = function() {
				var elements = $(this.table).find('.ui-feature-general-attributes-input');
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
			FeatureGeneralAttributesView.prototype.refresh = function() {
				var elements =  $(this.table).find('.ui-feature-general-attributes-input');
				for ( var i = 0; i < elements.length; i++) {
					switch ($(elements[i]).attr('name')) {
					case 'avp_attribute':
						$(elements[i]).val(this.avp_attribute);
						break;
					case 'is_request':
						$(elements[i]).val(this.is_request);
						break;
					case 'priority':
						$(elements[i]).val(this.priority);
						break;
					case 'value':
						$(elements[i]).val(this.value);
						break;
					}
				}
			}

			return FeatureGeneralAttributesView;
		})); // define
