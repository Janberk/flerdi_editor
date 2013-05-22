/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ "jquery", 'listDialogueAttributes', 'jsonViewer' ],
		(function($, ListDialogueAttributes, JsonViewer) {
			var ResourceGeneralAttributesView = function(attributes, parent,
					callback) {
				this.parent = parent;
				this.attributes = attributes || {};

				this.alias = this.attributes.alias || "";
				this.avp_attribute = this.attributes.avp_attribute || "";
				this.composing_operation = this.attributes.composing_operation || "";
				this.confidence = this.attributes.confidence || "";
				this.identifier = this.attributes.identifier || "";
				this.is_request = this.attributes.is_request || "";
				this.resource_unit = this.attributes.resource_unit || "";
				this.time_unit = this.attributes.time_unit || "";
				this.timestamp = this.attributes.timestamp || "";
				this.value = this.attributes.value || "";
				this.value_type = this.attributes.value_type || "";
				
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
			ResourceGeneralAttributesView.prototype.drawView = function() {
				var _this = this;

				this.table = document.createElement('table');
				new JsonViewer().createHeader(this.table);
				$(this.table).append(
						new JsonViewer().createTable({
							alias : _this.alias,
							avp_attribute : _this.avp_attribute,
							composing_operation : _this.composing_operation,
							confidence : _this.confidence,
							identifier : _this.identifier,
							is_request : _this.is_request,
							resource_unit : _this.resource_unit,
							time_unit : _this.time_unit,
							timestamp : _this.timestamp,
							value : _this.value,
							value_type : _this.value_type,
						}, new ListDialogueAttributes().getResourcesJson(),
								"ui-resource-genral-attributes-input")).css('width',
						'100%');

				$(this.parent).append(this.table);
			}

			/**
			 * This function returns a JSON representing the content of all
			 * Input and select fields, belonging to this Dialogue
			 * 
			 */
			ResourceGeneralAttributesView.prototype.getValues = function() {
				var elements = $(this.table).find('.ui-resource-genral-attributes-input');
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
			ResourceGeneralAttributesView.prototype.refresh = function() {
				var elements =  $(this.table).find('.ui-resource-genral-attributes-input');
				for ( var i = 0; i < elements.length; i++) {
					switch ($(elements[i]).attr('name')) {
					case 'alias':
						$(elements[i]).val(this.alias);
						break;
					case 'avp_attribute':
						$(elements[i]).val(this.avp_attribute);
						break;
					case 'composing_operation':
						$(elements[i]).val(this.composing_operation);
						break;
					case 'confidence':
						$(elements[i]).val(this.confidence);
						break;
					case 'identifier':
						$(elements[i]).val(this.identifier);
						break;
					case 'is_request':
						$(elements[i]).val(this.is_request);
						break;
					case 'resource_unit':
						$(elements[i]).val(this.resource_unit);
						break;
					case 'time_unit':
						$(elements[i]).val(this.time_unit);
						break;
					case 'timestamp':
						$(elements[i]).val(this.timestamp);
						break;
					case 'value':
						$(elements[i]).val(this.value);
						break;
					case 'value_type':
						$(elements[i]).val(this.value_type);
						break;
					}
				}
			}

			ResourceGeneralAttributesView.prototype.getBody = function(){
				return this.table;
			}
			
			ResourceGeneralAttributesView.prototype.remove = function() {
				$(this.parent).empty();
			}

			return ResourceGeneralAttributesView;
		})); // define
