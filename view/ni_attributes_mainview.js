/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
		[ "jquery", 'dialogue', 'listDialogueAttributes', 'jsonViewer' ],
		(function($, Dialogue, ListDialogueAttributes, JsonViewer) {
			var InterfaceAttributesMainview = function(attributes, parent, callback) {
				this.base = Dialogue;
				this.base('Interface_Attributes','Interface Attributes');
				
				this.parent = parent;
				this.callback = function() {
				};
				if (callback != undefined && typeof callback == 'function') {
					this.callback = callback;
				}

				this.drawView();
				this.show();
				
				this.content.find('.nav a:first').tab('show');
			}

			InterfaceAttributesMainview.prototype = new Dialogue();
			
			/**
			 * This functions draws the View.
			 * 
			 */
			InterfaceAttributesMainview.prototype.drawView = function() {
				var _this = this;
				this.addOk(function() {
					_this.callback('ok',_this.getValues('close'));

				});
				this.addCancel(function(){_this.callback('')});

				var tab_titles = [ 'NI-General', 'NI-Resources', 'NI-Features' ];

				this.content = $(document.createElement('div')).append(
						$(document.createElement('ul'))
								.addClass('nav nav-tabs')).append(
						$(document.createElement('div'))
								.addClass('tab-content'));

				$.each(tab_titles,function() {
									_this.content.find('.nav').append(
											$(document.createElement('li')).append($(document.createElement('a'))
												.attr({'href' : '#'+ this.toLowerCase(),'data-toggle' : 'tab'})
												.append(String(this))));
									_this.content.find('.tab-content').append($(document.createElement('div'))
															.addClass('tab-pane')
															.attr('id',this.toLowerCase()));
								});

				
				this.content.find('#ni-general').append(
						$(document.createElement('div')).css({
							display: 'block'
						}).attr('class', 'attributes-general'));
		
				this.setContent(this.content);
			}

			/**
			 * This function returns a JSON representing the content of all
			 * Input and select fields, belonging to this Dialogue
			 * 
			 */
			InterfaceAttributesMainview.prototype.getValues = function() {
				return {};
			}

			/*
			 * This view refreshes the view
			 * 
			 */
			InterfaceAttributesMainview.prototype.refresh = function() {

			}

			return InterfaceAttributesMainview;
		})); // define
