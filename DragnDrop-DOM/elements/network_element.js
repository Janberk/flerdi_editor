define (["jquery"],
(function($) {
	
	var NetworkElement = function(div)
	{
		this.div = div;
		document.body.appendChild(div); // perhaps replace with a jQuery funciton.
	}
	
	/*
	* This function returns the anchor point for this NetworkElement
	*/
	NetworkElement.prototype.getPoint = function()
	{
		var x = $(div).position().left;
		var y = $(div).position().top;
			
		var width = $(div).width();
		var length = $(div).height();
			
		return [(x+width/2), (y+length/2)];
	}
	
	/*
	* This function returns the div element, which representing this NetworkElement
	*/
	NetworkElement.prototype.getDiv = function()
	{
		return this.div;
	}
	
	/*
	* This function checks if the div belongs to this NetowrkElement
	* div : well , what to say^^
	*/
	NetworkElement.prototype.is = function(div){
		return (this.div == div);
	}
	
	return NetworkElement;
	
}));
