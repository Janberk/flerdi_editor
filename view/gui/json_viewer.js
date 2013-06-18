/*
*  Author: Flerdi Team
*
* This class creates a table, showing the content of a JSON
*
*/ 
define (["jquery", "listDialogueAttributes"], (function($, ListDialogueAttributes) {

	/**
	* This class creates a table showing the content of a certain tab
	*
	* @param node the node from which the contents are taken
	*/
	var JsonViewer = function(node){
		this.node = node;
		this.listDialogueAttributes = new ListDialogueAttributes();
		
		//je nach tab -> fkt aufrufen
		//fkt -> sucht aus dem node die richtigen Infos + aus list_dialogue_attributes das richtige json -> neue fkt
		//neue fkt -> bastelt aus beiden eine bearbeitbare Tabelle	
	}
	
	/**
	 * This function fills the General Tab for a given node
	 * 
	 * @return the table of the General Tab, including the possibility to edit attributes
	 */
	JsonViewer.prototype.generalTab = function(){
		var table = document.createElement('table');
		this.createHeader(table);
		var contentJson = this.node.getJson().attributes;
		var compareJson = this.listDialogueAttributes.getGeneralJson();

		$(table).append(this.createTable(contentJson, compareJson, "ui-general-attributes-input"));
		this.appendCss(table);
		return table;
	}
	
	/**
	 * This function fills the Resources Tab for a given node
	 * 
	 * @return the table of the Resources Tab, including the possibility to edit attributes
	 */
	JsonViewer.prototype.resourcesTab = function(){
		var table = document.createElement('table');
		this.createHeader(table);
		var array = this.node.getJson().resources;
		var compareJson = this.listDialogueAttributes.getResourcesJson();
		
		var elements = '';
		for (var i=0; i<array.length; i++) {
			elements += '<tr><th colspan="2"> Resource ' + (i+1) + '</th></tr>';
			elements += this.createTable(array[i].attributes, compareJson, "ui-resources-attributes-input "+i);
		}
		
		$(table).append(elements);
		this.appendCss(table);
		return table;
	}
	
	/**
	 * This function fills the Features Tab for a given node
	 * 
	 * @return the table of the Features Tab, including the possibility to edit attributes
	 */
	JsonViewer.prototype.featuresTab = function(){
		var table = document.createElement('table');
		this.createHeader(table);
		var array = this.node.getJson().features;
		var compareJson = this.listDialogueAttributes.getFeaturesJson();
		
		var elements = '';
		for (var i=0; i<array.length; i++) {
			elements += '<tr><th colspan="2"> Feature ' + (i+1) + '</th></tr>';
			elements += this.createTable(array[i].attributes, compareJson, "ui-features-attributes-input "+i);
		}
		
		$(table).append(elements);
		this.appendCss(table);
		return table;
	}

	/**
	 * This function fills the NetworkInterfaces Tab for a given node
	 * 
	 * @return the table of the NetworkInterfaces Tab, including the possibility to edit attributes
	 */
	JsonViewer.prototype.networkInterfacesTab = function(){
		var table = document.createElement('table');
		this.createHeader(table);
		var array = this.node.getJson().network_interfaces;
		var compareJson = this.listDialogueAttributes.getInterfacesJson();
		
		var elements = '';
		for (var i=0; i<array.length; i++) {
			elements += '<tr><th colspan="2"> NetworkInterface ' + (i+1) + '</th></tr>';
			elements += this.createTable(array[i].attributes, compareJson, "ui-interfaces-attributes-input "+i);
		}
		
		$(table).append(elements);
		this.appendCss(table);
		return table;
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
		
		for (var attribute in compareJson) {
			var content = contentJson[attribute];
			
			if(contentJson[attribute] === undefined || contentJson[attribute] == '') 
				content = compareJson[attribute].standard;

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
	* This function fills the information in the table
 	*
	*/
	JsonViewer.prototype.createHeader = function(table){
		$(table).append('');
		
		//$(table).html('<tr><td>Attributes</td><td>Values</td></tr>');
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