/*
 * Module element_key: displays colors for network elements
 * Author: Flerdi Team, Franz Nieschalk
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery"],
(function($)
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
		$(this.key).css('right', '0');
		$(this.key).css('bottom', '0');
		
		// add the key to the document
		document.body.appendChild(key);
		
		// bind drag events to the dragger of this key
		$(key).bind('dragstart',function( event )
		{return $(event.target).is(keyDragger);})
		.bind('drag',function( event ){$( this ).css({top: event.offsetY, left: event.offsetX});});
	}
	
	/*
	* return constructor
	*/
	return ElementKey;
}));
