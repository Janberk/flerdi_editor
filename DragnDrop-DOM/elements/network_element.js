define (["jquery",'util'],
(function($,Util) {
	
	var NetworkElement = function(div, zindex, envrionment)
	{
		this.div = div;
		this.zindex = zindex;
		this.environtment = envrionment;
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
	* This function returns the div element, which represents this NetworkElement
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
	
	/*
	* This function sets the z-index for the div object, represents this NetworkElement.
	* index : the index for, well, the z-index
	*/
	NetworkElement.prototype.setZIndex = function(index){
		$(this.div).css('z-index',index);
		this.zindex = index;
	}
	
	/*
	* This function determineds if this Object was hit.
	* position : [x,y] array
	*/
	NetworkElement.prototype.isHit = function(position){
		var thisPosition = [Util.cssToInt($(this.div).css('left')), Util.cssToInt($(this.div).css('top'))];
		var width = Util.cssToInt($(this.div).css('width'));
		var height = Util.cssToInt($(this.div).css('height'));
		
		return ((thisPosition[0] <= position[0] && thisPosition[1] <= position[1]) && (position[0] <= (thisPosition[0]+width) && position[1] <= (thisPosition[1]+height)));
	}
	
	return NetworkElement;
	
}));
