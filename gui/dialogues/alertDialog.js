define(['jquery', 'dialog'], function($, Dialog) {
	var AlertDialog = function(funct) {
		this.dia = new Dialog('warning', 'Warning!');
		this.dia.setContent($(document.createElement('div'))
			.append('Unsaved Changes will be lost, click ok to continue')
		);
		this.dia.addCancel();
		this.dia.addOk(funct);
	}
	return AlertDialog;
})
