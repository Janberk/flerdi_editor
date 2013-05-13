/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
		[ "jquery", 'dialog', 'listDialogueAttributes', 'jsonViewer' ],
		(function($, Dialog, ListDialogueAttributes, JsonViewer) {
			var NetworkElementAttributesMainview = function(attributes, parent, callback) {
				this.dialog;
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
			NetworkElementAttributesMainview.prototype.drawView = function() {
				var _this = this;
				this.dialog = new Dialog("Node_Attributes", "Node Attributes");
				this.dialog.addOk(function() {
					_this.callback('ok',_this.getValues('close'));

				});
				this.dialog.addCancel(function(){_this.callback('')});

				var tab_titles = [ 'General', 'Resources', 'Features',
						'Interfaces' ];

				var content = $(document.createElement('div')).append(
						$(document.createElement('ul'))
								.addClass('nav nav-tabs')).append(
						$(document.createElement('div'))
								.addClass('tab-content'));

				$.each(tab_titles,function() {
									content.find('.nav').append($(
									document.createElement('li')).append($(document.createElement('a'))
												.attr({'href' : '#'+ this.toLowerCase(),'data-toggle' : 'tab'})
												.append(String(this))));
									content.find('.tab-content').append($(document.createElement('div'))
															.addClass('tab-pane')
															.attr('id',this.toLowerCase()));
								});

				
				content.find('#general').append(
						$(document.createElement('div')).css({
							display: 'block'
						}).attr('class', 'attributes-general'));
				content.find('.nav a:first').tab('show');
				this.dialog.setContent(content);
			}

			/**
			 * This function returns a JSON representing the content of all
			 * Input and select fields, belonging to this Dialogue
			 * 
			 */
			NetworkElementAttributesMainview.prototype.getValues = function() {
				return {};
			}

			NetworkElementAttributesMainview.prototype.getBody = function() {
				return this.dialog.getBody();
			}
			
			/*
			 * This view refreshes the view
			 * 
			 */
			NetworkElementAttributesMainview.prototype.refresh = function() {

			}

			NetworkElementAttributesMainview.prototype.remove = function() {

			}

			return NetworkElementAttributesMainview;
		})); // define
