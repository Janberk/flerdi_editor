define (["jquery", 'graphics'],
(function($,jsGraphics) {

	var NetworkLink = function(start, end, canvasID){
		this.start = start;
		this.end = end;	
		this.canvasID = canvasID;
		
		this.canvas = getCanvas(canvasID);
		
		this.draw();	
	}
	
	NetworkLink.prototype.draw = function(){
		var startPoint = this.start.getPoint();
		var endPoint = this.end.getPoint();
		
		this.canvas.clear();

		this.canvas.setColor("#000000");
		this.canvas.setStroke(5);
		this.canvas.drawLine(startPoint[0], startPoint[1], endPoint[0], endPoint[1]);
		this.canvas.paint();
	};

	return NetworkLink;

}));

//another nice workaround
function getCanvas(canvasID)
{
	return new jsGraphics(canvasID);
}