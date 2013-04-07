/*
 * Author: Flerdi Team
 */
 
/*
 * This class creates an empty dialogue window
 */ 
define (["jquery","jquery_ui","drag"], (function($,ui,drag) {

	var Window = function(title, size){
		console.log('creating dialogue window');
		this.title = title; //title of the window
		this.size = size || [];
		this.height = this.size[0] || 'auto'; //height of the new window
		this.width = this.size[1] || 'auto'; //width of the new window
		
		this.win = document.createElement('div');
		$(this.win).dialog({ title: this.title, height: this.height, width: this.width });
		
	}
	
	Window.prototype.setContent = function(content) {
		$(this.win).html('');
		this.win.appendChild(content);
	}
	
	Window.prototype.appendContent = function(content){
		this.win.appendChild(content);
	}
	
	Window.prototype.close = function() {
		$(this.win).dialog( "close" );
	}
	
	Window.prototype.show = function() {
		$(this.win).dialog({ title: this.title, height: this.height, width: this.width });
	}
		
	return Window;
})); //define