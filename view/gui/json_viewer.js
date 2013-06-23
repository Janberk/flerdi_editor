/*
*  Author: Flerdi Team
*
* This class creates a table, showing the content of a JSON
*
*/ 
define (["jquery", "listDialogueAttributes"], (function($, ListDialogueAttributes) {

	/**
	* This class creates a table showing the content of a certain tab
	*/
	var JsonViewer = function(){
		this.listDialogueAttributes = new ListDialogueAttributes();
		
		//je nach tab -> fkt aufrufen
		//fkt -> sucht aus dem node die richtigen Infos + aus list_dialogue_attributes das richtige json -> neue fkt
		//neue fkt -> bastelt aus beiden eine bearbeitbare Tabelle	
	}
	
	/**
	* This function creates all necessary elements, and returns them
	*
	* @param json that you want to show
	*
	* @return all necessary elements
	*/
	JsonViewer.prototype.createTable = function(contentJson, compareJson, elementClass){
		var elements = "";
		console.log(contentJson);
		console.log(compareJson);
		for (var attribute in compareJson) {
			var content = contentJson[attribute];
			
			
			
			
			if(content === undefined || content == ''){
				content = compareJson[attribute].standard;
			}
			
			console.log(content);
			
			var attName = compareJson[attribute].shownAs || attribute;
			elements += '<div class="control-group"><label class="control-label">'+attName+'</label>';
						
			elements += '<div class="controls">';
			if(compareJson[attribute].input == 'text') {
				elements += '<input class="'+elementClass+'" type="text" name="'+attribute+'" value="'+content+'"/>';
			}
			else if(compareJson[attribute].input == 'select') {
				elements += '<select class="'+elementClass+'" name="'+attribute+'">';
				
				for (var i in compareJson[attribute].values) {
					var option = compareJson[attribute].values[i];
					elements += '<option value="'+option+'"';
					
					if(option == content) {
						elements += 'selected="selected"';
					}
					
					elements += '>'+option+'</option>';
				}
				
				elements += '</select>';
			}
			else if(compareJson[attribute].input == 'none') {
				elements +=content+'';
			}
			
			elements += '</div></div>';
		}

		return elements;
	}
	/**
	* This function appends all css values to the elements
	*
	*/
	JsonViewer.prototype.appendCss = function(table){
		$(table).css({'width' : '100%'});
	}
	
	return JsonViewer;
})); //define