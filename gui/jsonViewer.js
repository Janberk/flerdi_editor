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
	 * This function fills the General Tab for a given note
	 * 
	 * @return the table of the General Tab, including the possibility to edit attributes
	 */
	JsonViewer.prototype.generalTab = function(){
		var table = document.createElement('table');
		this.createHeader(table);
		var contentJson = this.node.getJson().attributes;
		console.log(contentJson);
		var compareJson = this.listDialogueAttributes.getGeneralJson();

		$(table).append(this.createTable(contentJson, compareJson));
		
		this.appendCss(table);
		return table;
	}
	
	/**
	 * This function fills the Resources Tab for a given note
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
			elements += this.createTable(array[i].attributes, compareJson);
		}
		
		$(table).append(elements);
		this.appendCss(table);
		return table;
	}
	
	/**
	 * This function fills the Features Tab for a given note
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
			elements += this.createTable(array[i].attributes, compareJson);
		}
		
		$(table).append(elements);
		this.appendCss(table);
		return table;
	}

	/**
	 * This function fills the NetworkInterfaces Tab for a given note
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
			elements += this.createTable(array[i].attributes, compareJson);
		}
		
		$(table).append(elements);
		this.appendCss(table);
		console.log(elements);
		return table;
	}
	
	/**
	* This function creates all necessary elements, and returns them
	*
	* @param json that you want to show
	*
	* @return all necessary elements
	*/
	JsonViewer.prototype.createTable = function(contentJson, compareJson){
		var elements = "";
		var keys = Object.keys(contentJson);
		
		for (var key in keys) {
			compareJson[key].values = contentJson[key].values;
			elements += '<tr><td>' + key +'</td><td>'+ compareJson[key] +'</td></tr>';
		}
		/*for(var i=0; i < keys.length; i++){
			
			
		}*/
		
		return elements;
	}
	
	/**
	* This function fills the information in the table
 	*
	*/
	JsonViewer.prototype.createHeader = function(table){
		$(table).html('<tr><td>Attributes</td><td>Values</td></tr>');
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