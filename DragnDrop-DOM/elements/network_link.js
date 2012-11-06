define (["jquery", 'graphics'],
(function($,jsGraphics) {

	var NetworkLink = function(start, end, canvasID){
		this.start = start;
		this.end = end;	
		this.canvasID = canvasID;
		this.zindex = 0;
		this.canvas = getCanvas(canvasID);
		
		this.id = Math.floor(Math.random()*9999999999)
		console.log(this.id);
		this.draw();	
	}
	
	/*
	* This function checks if this is the wanted NetworkLink
	* id = id of the wanted NetworkLink
	*/
	NetworkLink.prototype.is = function(id){
		return this.id == id;
	}
	
	/*
	* This function draws the Link in the Canvas, also usable as redraw.
	*/
	NetworkLink.prototype.draw = function(){
		var startPoint = this.start.getPoint();
		var endPoint = this.end.getPoint();
		
		this.canvas.clear();

		this.canvas.setColor("#000000");
		this.canvas.setStroke(5);
		this.canvas.drawLine(startPoint[0], startPoint[1], endPoint[0], endPoint[1]);
		this.canvas.paint();
	};
	
	/*
	* This function sets the z-index for this NetworkLink
	* index : the index for, well, the z-index
	*/
	NetworkLink.prototype.setZIndex = function(index){
		//$(this.div).css('z-index',index);
		this.zindex = index;
	}
	
	/*
	* This function deletes this NetworkLink
	*/
	NetworkLink.prototype.deleteNetworkLink = function(){
		this.canvas.clear();
	}
		
	return NetworkLink;
	
}));

//another nice workaround
function getCanvas(canvasID)
{
	return new jsGraphics(canvasID);
}