define([ "jquery", "bootstrap", "button" ],
		function($, Bootstrap, Button) {
			var Dialogue = function(id, title) {
				var _this = this;
				this.dia = $(document.createElement('div')).addClass(
						'modal hide fade').attr({
					'id' : id,
					'tabindex' : -1,
					'role' : 'dialog',
					'aria-hidden' : true
				}).append(
						$(document.createElement('div')).addClass(
								'modal-header').append(
								$(document.createElement('button')).addClass(
										'close').attr({
									'type' : 'button',
									'data-dismiss' : 'modal',
									'aria-hidden' : true
								}).append('&times;').on('click',function(){_this.remove()})).append(
								$(document.createElement('h3')).append(title)))
						.append(
								$(document.createElement('div')).addClass(
										'modal-body')).append(
								$(document.createElement('div')).addClass(
										'modal-footer'))

			}

			Dialogue.prototype.show = function() {
				$('body').append(this.dia);
				$(this.dia).modal('show');
			}

			Dialogue.prototype.setContent = function(content) {
				$(this.getBody()).append(content);
			}

			Dialogue.prototype.addCancel = function(funct) {
				var _this = this;
				if (funct === undefined) {
					funct = function() {
					};
				}

				var btn = new Button({
					text : "Cancel"
				}, this.dia.find('.modal-footer'), function() {
					funct();
					_this.remove()
				});
				btn.show();
			}

			Dialogue.prototype.getBody = function() {
				return this.dia.find('.modal-body');
			}

			Dialogue.prototype.addOk = function(funct) {
				var _this = this;
				if (funct === undefined) {
					funct = function() {
					};
				}

				var btn = new Button({
					text : 'OK',
					type : 'primary'
				}, this.dia.find('.modal-footer'), function() {
					funct(), _this.remove()
				});
				btn.show();
			}

			Dialogue.prototype.remove = function() {
				this.dia.modal('hide');
				this.dia.remove();
			}

			return Dialogue;
		})
