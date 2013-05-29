define([ "jquery", "bootstrap" ],
		function($, Bootstrap) {
			var Dialogue = function(id, title) {
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
								}).append('&times;')).append(
								$(document.createElement('h3')).append(title)))
						.append(
								$(document.createElement('div')).addClass(
										'modal-body')).append(
								$(document.createElement('div')).addClass(
										'modal-footer'))

				
			}
			
			Dialogue.prototype.show = function(){
				$('body').append(this.dia);
				$(this.dia).modal('show');
			}
			
			Dialogue.prototype.setContent = function(content) {
				this.getBody().append(content);
			}
			Dialogue.prototype.addCancel = function(funct) {
				var _this = this;
				if(funct === undefined) {
					funct = function() {};
				}
				
				this.dia.find('.modal-footer').append(
						$(document.createElement('button')).addClass(
								'btn cancel').attr({
							'data-dismiss' : 'modal',
							'aria-hidden' : true
						}).append('Cancel').on('click', function() {
							funct();
							_this.remove();
						}))
			}
			Dialogue.prototype.getBody = function() {
				return this.dia.find('.modal-body');
			}
			Dialogue.prototype.addOk = function(funct) {
				var _this = this;
				if(funct === undefined) {
					funct = function() {};
				}
				
				this.dia.find('.modal-footer').append(
						$(document.createElement('a')).addClass(
								'btn btn-primary ok').attr({
							'aria-hidden' : true
						}).append('OK').on('click', function() {
							funct();
							_this.remove();
						}))
			}
			Dialogue.prototype.remove = function() {
				this.dia.modal('hide');
				this.dia.remove();
			}
			return Dialogue;
		})
