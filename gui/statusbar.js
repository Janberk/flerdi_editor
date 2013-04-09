/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the statusbar
 */
define (['jquery', 'changeNodeTypeCommand'],function($, ChangeNodeTypeCommand) {
	var Statusbar = function(obj) {
		this.target = obj;
		if($('#statusbar').children().length == 0) {
				$('#statusbar').addClass('navbar navbar-fixed-bottom')
					.append($(document.createElement('div'))
						.addClass('navbar-inner')
						.append($(document.createElement('div'))
							.addClass('container pull-left')));
		} else {
			$('#statusbar .container').children().remove();
		}
	}
	
	var check_row = function() {
		if($('#statusbar .container .form-inline').length == 0) {
			$('#statusbar .container')
				.append($(document.createElement('div'))
					.addClass('form-inline'))
		}
	}
	Statusbar.prototype.addTextfield = function(label, value) {
		var _this = this;
		check_row();
		$('#statusbar .container .form-inline')
			.append($(document.createElement('label'))
				.append(label + ':')
				.addClass('control-label')
				.attr('for', label))
			.append($(document.createElement('input'))
					.attr({
						'value': value,
						'id': label,
						'type': 'text',
						'class': 'input-medium'
					})
					.on('keyup', function() {
						_this.target.set(label, $(this).attr('value'));
					})
		);
	}
	Statusbar.prototype.addDropdown = function(label, sel, vals) {
		check_row();
		var _this = this;
		$('#statusbar .form-inline')
			.append($(document.createElement('label'))
				.append(label + ':')
				.addClass('control-label')
				.attr('for', label))
			.append($(document.createElement('select'))
					.attr('id', label)
					.on('change', function(e) {
					_this.target.getNetwork().getCommandManager().newCommand(new ChangeNodeTypeCommand(_this.target, $(this).attr('value')));
				}));
		for(var i=0;i<vals.length;i++) {
			var o = $(document.createElement('option'))
				.attr('value', vals[i])
				.append(vals[i]);
			if(vals[i]==sel) o.attr('selected', 'selected');
			$('#statusbar #' + label).append(o);
		}
	}
	Statusbar.prototype.show = function(b) {
		if(!$('#statusbar').hasClass('sb_edit')) {
			if(b) {
				$('#statusbar input').attr('disabled', 'disabled');
				$('#statusbar select').attr('disabled', 'disabled');
			} else {
				$('#statusbar').find('.form-inline').children().remove();
			}
		}
	}
	Statusbar.prototype.edit = function(b) {
		if(b) {
			var _this = this;
			$('#statusbar').addClass('sb_edit');
			$('#statusbar input')
				.removeAttr('disabled');
			$('#statusbar select')
				.removeAttr('disabled')
				
		} else {
			$('#statusbar').removeClass('sb_edit');
			$('#statusbar').find('.form-inline').children().remove();
		}
	}
	return Statusbar;
});
