/*
*  Author: Flerdi Team
*
* This class creates a table, showing the content of a JSON
*
*/ 
define (["jquery"], (function($) {

	/**
	* This class creates a table showing the content of a JSON elemnt, it only shows the content of the top-level
	*
	* @param json json-object you want to show
	* @parem opt json containing styling infomrations
	*/
	var JsonViewer = function(json, opt){
		this.json = json || {};
		this.parent = parent || document.body;
		this.opt = this.setAttributes(opt);
		
		this.table = document.createElement('table');
		$(this.table).attr('class','ui-widget-jsonviewer ui-corner-all');
		this.createElements();
		this.appendCss();
	}
	
	JsonViewer.prototype.createElements = function(){
		$(this.table).html('<tr class="ui-widget-jsonviewer-head"><td>Attributes</td><td>Values</td></tr>');
		
		var keys = Object.keys(this.json);
		
		for(i=0; i < keys.length; i++){
			$(this.table).append('<tr class="ui-widget-jsonviewer-content"><td class="ui-widget-jsonviewer-attributes">' + keys[i] +'</td><td class="ui-widget-jsonviewer-values">'+ this.json[keys[i]] +'</td></tr>');
		}
	}
	
	JsonViewer.prototype.appendCss = function(){
		$(this.table).css({'width' : '100%'});
	}
	
	JsonViewer.prototype.getElement = function(){
		return this.table;
	}
	
	/**
	* This fucntions sets the default Attributes for the styling options
	*
	* @param jsson json representing the styling options
	*/
	JsonViewer.prototype.setAttributes = function(json){
		this.opt = {};
	}
	return JsonViewer;
})); //define