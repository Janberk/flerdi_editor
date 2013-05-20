define(['jquery', 'dialog'], function($, Dialog) {
	var AlertDialog = function(message, funct) {
		this.dia = new Dialog('warning', 'Warning!');
		this.dia.setContent($(document.createElement('div'))
			.append(message)
		);
		this.dia.addCancel();
		this.dia.addOk(funct);
		this.dia.show();
	}
	return AlertDialog;
})
