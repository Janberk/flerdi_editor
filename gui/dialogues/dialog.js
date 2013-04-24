define(["jquery", "bootstrap"], function($, Bootstrap) {
	var Dialog = function(id, title) {
		this.dia = $(document.createElement('div'))
			.addClass('modal hide fade')
			.attr({
				'id': id,
				'tabindex': -1,
				'role': 'dialog',
				'aria-hidden': true
			})
			.append($(document.createElement('div'))
				.addClass('modal-header')
				.append($(document.createElement('button'))
					.addClass('close')
					.attr({
						'type': 'button',
						'data-dismiss': 'modal',
						'aria-hidden': true
					})
					.append('&times;')
				)
				.append($(document.createElement('h3'))
					.append(title)
				)
			)
			.append($(document.createElement('div'))
				.addClass('modal-body')
			)
			.append($(document.createElement('div'))
				.addClass('modal-footer')
			)
			
		$('body').append(this.dia);
		$(this.dia).modal('show');		
	}
	Dialog.prototype.setContent = function(content) {
		this.dia.find('.modal-body').append(content);
	}
	Dialog.prototype.addCancel = function() {
		this.dia.find('.modal-footer')
			.append($(document.createElement('button'))
				.addClass('btn cancel')
				.attr({
					'data-dismiss': 'modal',
					'aria-hidden': true
				})	
				.append('Cancel')
				.on('click', function() {
					$(this).parents('.modal').modal('hide');
					$(this).parents('.modal').remove();
				})
			)
	}
	Dialog.prototype.addOk = function(funct) {
		this.dia.find('.modal-footer')
			.append($(document.createElement('a'))
				.addClass('btn btn-primary ok')
				.attr({
					'aria-hidden': true
				})
				.append('OK')
				.on('click', function() {
					funct();
					$(this).parents('.modal').modal('hide');
					$(this).parents('.modal').remove();
				})
			)
	}
	return Dialog;
})
