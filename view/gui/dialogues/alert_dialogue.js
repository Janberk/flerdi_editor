define(['jquery', 'dialogue'], function($, Dialogue) {
	var AlertDialogue = function(message, funct) {
		this.dia = new Dialogue('warning', 'Warning!');
		this.dia.setContent($(document.createElement('div'))
			.append(message)
		);
		this.dia.addCancel();
		this.dia.addOk(funct);
		this.dia.show();
	}
	return AlertDialogue;
})
