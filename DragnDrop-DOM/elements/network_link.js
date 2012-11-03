define (["jquery",'util','graphics','drawing1','drawing2'],
(function($,Util,jsGraphics,draw1,draw2) {

	var NetworkLink = function(start, end, canvasID){
		this.start = start;
		this.end = end;	
		this.canvasID = canvasID;
		this.canvas = new jsGraphics(canvasID);
		this.draw();	
	}
	
	NetworkLink.prototype.draw = function(){
		var startPoint = this.start.getPoint();
		var endPoint = this.end.getPoint();
		
		this.canvas.clear();

		//canvas.setColor("#ff0000");
		this.canvas.setStroke(5);
		this.canvas.drawLine(startPoint[0], startPoint[1], endPoint[0], endPoint[1]);
		this.canvas.paint();
		
		//$(document.getElementById(this.canvasID)).drawLine(startPoint[0],startPoint[1],endPoint[0],endPoint[1]);	
	};

	return NetworkLink;

}));