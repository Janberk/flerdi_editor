/*
 * Author: Flerdi Team
 */
 
/*
 * This class handles alert dialogues
 */

define (["jquery","window"], (
function($,Window) {
	

	/**
	* This function creates a new AlertDialogue Window
	*
	* @param environment reference to the environment object
	*/
	var AlertDialogue = function(environment){
		console.log('Open Alert-Dialouge');
		this.env = environment;

		this.win = new Window('WARNING!!!');
		
		this.div = document.createElement('div');
		$(this.div).html('<p>Unsaved changes will be lost. Click OK to continue or cancel.</p></br>'
						+'<button id="ok">OK</button>'
						+'<button id="cancel">Cancel</button>');						
		
		this.fillWindow();
	}
	
	AlertDialogue.prototype.fillWindow = function() {
		this.win.setContent(this.div);
	}

	return AlertDialogue;
}));