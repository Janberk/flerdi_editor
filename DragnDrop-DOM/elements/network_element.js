define (["jquery",'util'],
(function($,Util) {
	
	var NetworkElement = function(div, zindex, envrionment)
	{
		this.div = div;
		this.zindex = zindex;
		this.environment = envrionment;
		
		this.linkList = []; // save all links that are connected to this element
		
		// creating the div to delete this NetworkElement, jQuery should provide a function to, i don't know and i don't look, way to lazy
			this.closeDiv = document.createElement("div");
			this.closeDiv.setAttribute('class','close',0);
			
			this.div.appendChild(this.closeDiv);
		
		document.body.appendChild(div); // perhaps replace with a jQuery function.
		
		this.bindDragEvent();
	}
	
	/*
	* This function returns the anchor point for this NetworkElement
	*/
	NetworkElement.prototype.getPoint = function()
	{
		var x = $(this.div).position().left;
		var y = $(this.div).position().top;
			
		var width = $(this.div).width();
		var length = $(this.div).height();
			
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
	* This function checks if the div belongs to this NetworkElement
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
	
	
	/*
	* This function adds a new link to network element
	* link : the new link
	*/
	NetworkElement.prototype.addLink = function(link){
		this.linkList.push(link);
	}
	
	/*
	* This function updates all links that are connected to this element
	*/
	NetworkElement.prototype.updateAllLinks = function(){

		for(i in this.linkList){
			this.linkList[i].draw();
		}
	}
	
	/*
	* This function binds the drag Eventhandler to the div
	*/
	NetworkElement.prototype.bindDragEvent = function(){
		var div = this.div;
		var close = this.closeDiv;
		var element = this;
		
		$(div).on('dragstart',function(event){
				return $( this ).css('opacity',1)
					.clone().addClass('active')
					.insertAfter( this );
			})
			.on('dragend',function(event){
				$( event.dragProxy ).remove();
				$( this ).css({
					top: event.offsetY,
					left: event.offsetX,
					opacity: 1
					})
				element.updateAllLinks();
			})	
			.on('drag',function( event ){
				$( event.dragProxy ).css({
					top: event.offsetY,
					left: event.offsetX
				});

			});
		
		$(close).on('click',function(event){
			element.deleteElement();
		});

		var _this = this;
	}
	
	/*
	* This function unbinds the drag Eventhandler to the div
	*/
	NetworkElement.prototype.unbindDragEvent = function(){
		var div = this.div;
		var close = this.closeDiv;
		$(div).off('dragstart').off('drag').off('dragend');
		$(close).off('click');
		
	}
	/*
	* This function delets this NetworkElement
	*/
	NetworkElement.prototype.deleteElement = function(){
		if(this.environment.deleteNetworkElement(this.div)){
			this.environment
			for(var i=0;i<this.linkList.length;i++){
				this.environment.deleteNetworkLink(this.linkList[i].id);
			}
			$(this.div).remove();
		}
	}
	
	/*
	* This function deletes a Link from the array of this NetworkElement
	*/
	NetworkElement.prototype.deleteLink = function(id){
		for(var i=0; i<this.linkList.length;i++){
			if(this.linkList[i].is(id)){
				this.linkList.splice(i,1);
				break;// OMG der GOETHE-BREAK, tanz den GOETHE-BREAK-DANCE
			}
		}
	}		
	
	return NetworkElement;
	
}));
