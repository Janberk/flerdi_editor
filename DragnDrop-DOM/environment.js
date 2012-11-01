define (["jquery","network_element","network_link","util"],
(function($,NetworkElement,NetworkLink,Util) {
	
	//This handels everything....just everything, even your PC, but no MACs, MACs are evil.
	
	var Environment = function(canvasId){
		this.canvas = canvasId; // if og the canvas, at the moment unimportent
		this.knotes = []; // array of al NetworkElement-Objects in the scene
		this.lines = []; // array of all NetworkLink-Objects in the scene
		
		Environment.bindButtonHandler(this);
	}
	
	var canvas = "l"; // nonsense, to lazy to delete, but still add a comment
	
	/* 
	* This function creates a new NetworkElement and adds it to the array
	* div : div-container representing the NetworkElement
	*/
	Environment.prototype.newKnot = function(div) {
		this.knotes.push(new NetworkElement(div));
	}
		
	/* 
	* This function creates a new NetworkLink and adds it to the array
	* start	: NetworkElement where the Link should start
	* end 	: NetworkElement where the Link should end
	*/
	Environment.prototype.newLine = function(start,end) {
		// actually, it doesn't do anything
	}
	
	/* 
	* This function binds all handler to the Buttons, just use it once.
	* element : this Environment-object , yeah seems like a dirty hack
	*/
	Environment.bindButtonHandler = function(element){
		
		$('#toolbox').bind('dragstart',function( event ){
			return $(event.target).is('#test');
			})
			.bind('drag',function( event ){
			$( this ).css({
				top: event.offsetY,
				left: event.offsetX
			});
		});
		
		$('div[class="neuErstellen"]').mousedown(function(e){
			var newDiv = Util.createDiv(e.pageX-60,e.pageY-5);
			$(newDiv).trigger('drag');
			element.newKnot(newDiv);
		});
		
		$('div[class="neuLink"]').click(function(){
			console.log('neuLink');
		});
		
		
		
	}
	
	return Environment;
}));