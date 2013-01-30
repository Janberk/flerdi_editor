/*
 * Author: Flerdi Team
 */
 
/*
 * This class is specifically for dialogues concerning Resources, Features and NetworkInterfaces
 */ 
define (["jquery","window"], (function($,window) {

	var ListDialogue = function(json){
		console.log('filling dialogue window');
		this.json = json;
		this.win = new window('General',[450,450]);
		this.tabs = document.createElement('div');
		$(this.tabs).html('<ul> <li><a href="#tabs-1">General</a></li> <li><a href="#tabs-2">Resources</a></li> <li><a href="#tabs-3">Features</a></li> <li><a href="#tabs-4">Interfaces</a></li> </ul> <div id="tabs-1"> </div> <div id="tabs-2"></div> <div id="tabs-3"> </div> <div id="tabs-4"> </div>');
		$(this.tabs).tabs();
		this.win.setContent(this.tabs);
		
		this.fillWindow();
	}
	
	ListDialogue.prototype.fillWindow = function() {			
		var information = [];
		information [0] = this.json.attributes;
		information [1] = this.json.resources;
		information [2] = this.json.features;
		information [3] = this.json.network_interfaces;
		
		alert(information[0].id);
		$('#tabs-1').html(dump(information[0]));
		$('#tabs-2').html(dump(information[1]));
		$('#tabs-3').html(dump(information[2]));
		$('#tabs-4').html(dump(information[3]));
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