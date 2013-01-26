/*
 * Author: Flerdi Team
 */
 
/*
 * This class is specifically for dialogues concerning Resources, Features and NetworkInterfaces
 */ 
define (["jquery","window"], (function($,dialogue) {

	var ListDialogue = function(type, json){
		console.log('filling dialogue window');
		this.type = type; //which kind: Resources, Features, NetworkInterfaces?
		this.json = json;
		this.win = new dialogue();
		this.windiv = this.win.createWindow(); //the dialogue window that has been created
		this.textfield = document.createElement('div');
		this.windiv.appendChild(this.textfield);
		this.fillWindow();
	}
	
	ListDialogue.prototype.fillWindow = function() {
		var wHeight = $(this.windiv).height() - 41;
		$(this.textfield).css({
			height:wHeight,
			'background-color':'#ffffff',
			margin:10,
			'overflow-y':'scroll',
			'font-size':10,
		});
		
		var information = [];
		switch(this.type) {
			case "resources":
				information = this.json.resources;
				break;
			case "features":
				information = this.json.features;
				break;
			case "network_interfaces":
				information = this.json.network_interfaces;
				break;
			default:
				console.log("Error with window filling. Type '"+this.type+"' is unknown.");
				break;
		}
		console.log("Test: "+this.type+" = "+information);
		
		$(this.textfield).html(this.type+":<br>"+dump(information));
	}

	return ListDialogue;
})); //define

/**
 * Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
 */
function dump(arr,level) {
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n<br>";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n<br>";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}