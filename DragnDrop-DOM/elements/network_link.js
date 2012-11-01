function NetworkLink(start, end, canvasID){
	this.start = start;
	this.end = end;
		
	this.canvas = new jsGraphics(canvasID);
	
	this.draw = function(){
		var startPoint = start.getPoint();
		var endPoint = end.getPoint();
		
		this.canvas.clear();

		//canvas.setColor("#ff0000");
		this.canvas.setStroke(5);
		this.canvas.drawLine(startPoint[0], startPoint[1], endPoint[0], endPoint[1]);
		this.canvas.paint();	
	};
	
	this.draw();

};
