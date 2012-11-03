define (["jquery"],
(function($) {
	var Util = function(){
	}
	
	// This function returns a Div-Container
	Util.createDiv = function(x,y) {
		
		var newDiv = document.createElement("div");
		newDiv.setAttribute('class','dragable_note',0);
		newDiv.setAttribute('style','top:'+y+'px; left:'+x+'px;background-color:#'+this.getRandomColorHex()+';',0);
	
			var closeDiv = document.createElement("div");
			closeDiv.setAttribute('class','close',0);
			closeDiv.setAttribute('onClick','remove(this)',0);
	
		newDiv.appendChild(closeDiv);
		
		return newDiv;
	}
	
	/*
	* This function returns a integer from a css value
	* e.g. 150px -> 150
	* value : css value you want to parse
	*/
	Util.cssToInt = function(value){
		return parseInt(String(value).replace(/[^-\d\.]/g, ''));
	}
	
	//This function returns a random color in hex notaion
	Util.getRandomColorHex = function(){
		var farbe = Math.floor(Math.random()*16777215).toString(16);
	
		if(farbe.length == 6 ){
			return farbe;
		}else{
			return this.getRandomColorHex();
		}
	}
	
	return Util;
}));