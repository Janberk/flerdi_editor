/*
 * Author: Flerdi Team
 */
 
/*
 * This class is specifically for dialogues to open YAML-Files from your local machine
 */ 
define (["jquery","window","parser"], (
function($,Window,Parser) {

	/**
	* This function creates a new OpenDialogue Window
	*
	* @param environment reference to the environment object
	*/
	var OpenDialogue = function(environment){
		console.log('Open Open-Dialouge');
		this.env = environment;

		this.win = new Window('Open');
		// creating the file input tag
		this.text = document.createElement('p');
		this.input = document.createElement('input');
		var _this = this;
		$(this.input).on('change',function(e){
			if (this.files !== 'undefined' && typeof FileReader !== 'undefined') {
				
				var file = this.files[0];
				if(file.name.split('\.')[file.name.split('\.').length-1] == 'yaml'){
					var reader = new FileReader();
					
					reader.onload = function(e){
						Parser.loadFromText(e.target.result,file.name,function(json){_this.env.importJson(json,file.name);});
						_this.win.close()
						};
								
					reader.readAsText(file);
				}else{
					alert('Please choose a .yaml File');
				}
				    
			} else {
			    alert('Your browser does not support the HTML5 File-API');
			}
			});
			
		$(this.text).html('Please searche a YAML-File').css({	padding:	0,
									margin:		5});

		$(this.input).attr({	type:		'file'})
			     .css({	display:	'block',
					margin:		5});
					
		
		this.fillWindow();
	}
	
	OpenDialogue.prototype.fillWindow = function() {
		//var wHeight = $(this.windiv).height() - 41;
		
		//this.windiv.appendChild(this.text);
		this.win.setContent(this.input);
	}

	return OpenDialogue;
}));