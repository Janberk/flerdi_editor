define (["jquery",'drag',"network_element","network_link","util","toolbox"],
(function($,drag,NetworkElement,NetworkLink,Util,ToolBox) {
	
	//This handels everything....just everything, even your PC, but no MACs, MACs are evil.
	
	var Environment = function(canvasId){
		this.canvas = canvasId; // if og the canvas, at the moment unimportent
		this.toolBox = new ToolBox(this);
		this.knotes = []; // array of all NetworkElement-Objects in the scene
		this.lines = []; // array of all NetworkLink-Objects in the scene
		
		this.lastClickedPoint = undefined;
		
		Environment.bindButtonHandler(this);
	}
	
	var canvas = "l"; // nonsense, to lazy to delete, but still add a comment
	
	/* 
	* This function creates a new NetworkElement and adds it to the array
	* div : div-container representing the NetworkElement
	*/
	Environment.prototype.newKnot = function(div) {
		this.knotes.push(new NetworkElement(div,this.lines.length+this.knotes.lenght +1,this));
		this.updateZIndex();
	}
		
	/* 
	* This function creates a new NetworkLink and adds it to the array
	* start	: position where the Link should start : [x,y]
	* end 	: position where the Link should end : [x,y]
	*/
	Environment.prototype.newLine = function(start,end) {
		// actually, it doesn't do anything
		var _start = undefined;
		var _end = undefined
		
		for(i=this.knotes.length; i>0;i--){
			if(this.knotes[i-1].isHit(start)){
				_start = this.knotes[i-1];
				break; // OMG der GOETHE-BREAK, tanz den GOETHE-BREAK-DANCE
			}
		}
		for(i=this.knotes.length; i>0;i--){
			if(this.knotes[i-1].isHit(end)){
				_end = this.knotes[i-1];
				break; // OMG der GOETHE-BREAK, tanz den GOETHE-BREAK-DANCE
			}
		}
		
		if(_start === undefined || _end === undefined){
			console.log('keine elemente gefunden');
		} else {
			
			var line = new NetworkLink(_start,_end,this.canvas);
			
			// give references to the new link
			_start.addLink(line);
			_end.addLink(line);
			
			this.lines.push(line);
		}

	}
	
	/*
	* This function updates the Z-Index value for all elements in the scene, by calling the setZIndex() function
	* for every object.
	*/
	Environment.prototype.updateZIndex = function(){
		var index = 0;
		
		
		for(i=0;i<this.lines.length;i++){
			this.lines[i].setZIndex(index++);
		}
		for(i=0; i<this.knotes.length;i++){
			this.knotes[i].setZIndex(index++);
		}
		this.toolBox.setZIndex(index);
	}
	
	/* 
	* This function binds all handler to the Buttons, just use it once.
	* element : this Environment-object , yeah seems like a dirty hack
	*/
	Environment.bindButtonHandler = function(element){
	
		/*
		* This click-handler checks where the last Mouseclick  where located, and what network element was clicket on
		*/
		/*$(window).click(function(e){
			element.lastClickedPoint = [e.pageX,e.pageY];
			
			if(!element.toolBox.isHit(element.lastClickedPoint)){
				var _knotes = element.knotes;
				for(i=_knotes.length; i>0;i--){
					if(_knotes[i-1].isHit(element.lastClickedPoint)){
						console.log(_knotes[i-1].getDiv().style.top);
						break; // OMG der GOETHE-BREAK, tanz den GOETHE-BREAK-DANCE
					}
				}
			}
		})*/
		
		// wow, i just don't know why this function is still in.
		
	}
	
	/*
	* This function binds all event to determined where the drag starts an where the drag ends
	*/
	Environment.prototype.startLineDrag = function(){
		var element = this;
		var start = [];
		var end = [];
		
		for(i=0; i< this.knotes.length;i++){ //unbind all events from all NetworkElements
			this.knotes[i].unbindDragEvent();
		}
		
		$(window).on('drag',function(event){}).on('dragstart',function(event){
			start = [event.pageX,event.pageY];
		}).on('dragend',function(event){
			end = [event.pageX,event.pageY];
			element.stopLineDrag(start, end);
		});
	}
	
	/*
	* This function unbinds all Events
	* start : startpoint of the drag : [x,y]
	* end : endpoint of the drag : [x,y]
	*/
	Environment.prototype.stopLineDrag = function(start, end){
		
		$(window).off('drag').off('dragstart').off('dragend');
		
		for(i=0; i< this.knotes.length;i++){ //bind all events to all NetworkElements
			this.knotes[i].bindDragEvent();
		}

		this.newLine(start,end);
	}
	
	return Environment;
}));