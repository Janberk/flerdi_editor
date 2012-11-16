define (["jquery",'util'],
(function($,Util)
{
	/*
	* this key shows which color belongs to which element
	* since we only want one key, please use this constructor only once
	*/
	var ElementKey = function(x, y)
	{
		// the position of the new key
		this.x = x || 0;
		this.y = y || 0;
		
		// save the div container for drag events
		this.key = undefined;
		
		// draw this key
		this.draw();
	}
	
	/*
	* draws a simple div element which contains a graphic
	*/
	ElementKey.prototype.draw = function()
	{
		// create a div container for the key
		var key = document.createElement("div");
		key.setAttribute('class','key', 0);
		
		// create a dragger for this key
		var keyDragger = document.createElement("div");
		keyDragger.setAttribute('class','keyDragger');
		
		// set dragger as child of the key
		key.appendChild(keyDragger);
		
		// save the div container for drag events
		this.key = key;
		
		// set position for this key
		$(this.key).css('left', this.x);
		$(this.key).css('top', this.y);
		
		// add the key to the document
		document.body.appendChild(key);
		
		// bind drag events to the dragger of this key
		$(key).bind('dragstart',function( event )
		{return $(event.target).is(keyDragger);})
		.bind('drag',function( event ){$( this ).css({top: event.offsetY, left: event.offsetX});});
	}
	
	/*
	* this function determineds if this Object was hit
	* position : [x,y] array
	*/
	ElementKey.prototype.isHit = function(position)
	{
		var thisPosition = [Util.cssToInt($(this.key).css('left')), Util.cssToInt($(this.key).css('top'))];
		var width = Util.cssToInt($(this.key).css('width'));
		var height = Util.cssToInt($(this.key).css('height'));
		
		return ((thisPosition[0] <= position[0] && thisPosition[1] <= position[1]) && (position[0] <= (thisPosition[0]+width) && position[1] <= (thisPosition[1]+height)));
	}
	
	/*
	* this function sets the z-index for the div object, represents this key
	* index : the index for, well, the z-index
	*/
	ElementKey.prototype.setZIndex = function(index)
	{
		$(this.key).css('z-index',index);
		this.zindex = index;
	}
	
	/*
	* return constructor
	*/
	return ElementKey;
}));
