/*
*  Author: Flerdi Team
*
* This class creates a table, showing the content of a JSON
*
*/ 
define (["jquery"], (function($) {

	/**
	* This class creates a table showing the content of a JSON element
	*
	* @param json json-object you want to show
	* @param opt json containing styling information
	*/
	var JsonViewer = function(json, opt){
		this.json = json || {};
		this.parent = parent || document.body;
		this.opt = this.setAttributes(opt);
		
		this.nodeProperties =
		{"ne_type": ["select", ["/node/host/generic", "/node/host/pip", "/node/switch/cisco", "/node/switch/tunnelbridge","/node/switch/pip"]],
		"id": ["input", ""]};
		
		this.table = document.createElement('table');
		$(this.table).attr('class','ui-widget-jsonviewer');
		this.fillTable();
		this.appendCss();
	}
	
	/**
	* This function creates all necessary elements, and returns them
	*
	* @param json that you want to show
	*
	* @return all necessary elements
	*/
	JsonViewer.prototype.createElements = function(json){
		var elements = "";
		var keys = Object.keys(json);
		
		for(var i=0; i < keys.length; i++){
			if(typeof(json[keys[i]]) == 'object'){
				elements += '<tr class="ui-widget-jsonviewer-segment ui-widget-jsonviewer-content"><th colspan="2">' + keys[i] + '</th></tr>';
				elements += this.createElements(json[keys[i]]);
			} else {
				elements += '<tr class="ui-widget-jsonviewer-content"><td class="ui-widget-jsonviewer-attributes">' + keys[i] +'</td><td class="ui-widget-jsonviewer-values">'+ json[keys[i]] +'</td></tr>';
			}
		}
		
		return elements;
	}
	
	/**
	* This function fills the information in the table
 	*
	*/
	JsonViewer.prototype.fillTable = function(){
		$(this.table).html('<tr class="ui-widget-jsonviewer-head"><td>Attributes</td><td>Values</td></tr>');
		
		$(this.table).append(this.createElements(this.json));
	}
	/**
	* This function appends all css values to the elements
	*
	*/
	JsonViewer.prototype.appendCss = function(){
		$(this.table).css({'width' : '100%'});
	}
	
	/**
	* This function returns the table representing the json
	*
	* @return HTML-Table representing the json
	*/
	JsonViewer.prototype.getElement = function(){
		return this.table;
	}
	
	/**
	* This functions sets the default Attributes for the styling options
	*
	* @param json representing the styling options
	*/
	JsonViewer.prototype.setAttributes = function(json){
		this.opt = {};
	}
	return JsonViewer;
})); //define