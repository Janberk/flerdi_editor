/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the statusbar
 */
define (['jquery'],function($) {
	var Statusbar = function(obj) {
		this.target = obj;
		this.html = $(document.createElement('div'))
			.attr('class', 'sb');
	}
	Statusbar.prototype.addTextfield = function(label, value) {
		this.html.append($(document.createElement('label'))
			.append(label + ':')
			.append($(document.createElement('input'))
				.attr({'value': value,
					'name': label
				})
			)
		);
	}
	Statusbar.prototype.addDropdown = function(label, sel, vals) {
		var select = $(document.createElement('select'))
			.attr('name', label);		
		for(var i=0;i<vals.length;i++) {
			var o = $(document.createElement('option'))
				.attr('value', vals[i])
				.append(vals[i]);
			if(vals[i]==sel) o.attr('selected', 'selected');
			select.append(o);
		}
		this.html.append($(document.createElement('label'))
			.append(label + ':')
			.append(select)
		);
			
	}
	Statusbar.prototype.show = function(b) {
		if(!$('#statusbar div').hasClass('sb_edit')) {
			if(b) {
				$('#statusbar').append(this.html);
				$('#statusbar input').attr('readonly', 'readonly');
				$('#statusbar select').attr('disabled', 'disabled');
			} else {
				$('.sb').remove();
			}
		}
	}
	Statusbar.prototype.edit = function(b) {
		if(b) {
			var _this = this;
			$('.sb').remove();
			$('#statusbar').append(this.html);
			this.html.addClass('sb_edit');
			$('#statusbar input')
				.removeAttr('readonly')
				.on('change', function(e) {
					_this.target.set($(this).attr('name'), $(this).attr('value'));
				});
			$('#statusbar select')
				.removeAttr('disabled')
				.on('change', function(e) {
					_this.target.set($(this).attr('name'), $(this).val());
				});
		} else {
			this.html.removeClass('sb_edit');
			$('.sb').remove();
		}
	}
		
	return Statusbar;
});
