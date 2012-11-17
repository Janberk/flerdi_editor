define (["jquery",'util','parser'],
(function($,Util,Parser) {
	
	var ToolBar = function(environment)
	{
		this.environment = environment;
		this.toolBox = undefined;
		this.buttons = [];
		this.zindex = 0;
		this.line = false;
		this.create();
		
	}
	
	ToolBar.prototype.isLinePressed = function(){
		return this.line;
	}
	
	/*
	* This function creates the toolbox, its a bit messy, but will be better, I promise
	*/
	ToolBar.prototype.create = function()
	{
		var toolBar = document.createElement("div");
		toolBar.setAttribute('class','toolBox',0);
		
		var handle = document.createElement('div');
		handle.setAttribute('class','verschiebeding');
		
		
		toolBar.appendChild(handle);
		
		this.toolBox = toolBar;
		
		
		var newNote = document.createElement('div');
		newNote.setAttribute('class','neuErstellen');

		var newNote2 = document.createElement('div');
		newNote2.setAttribute('class','neuLink');
		
		var newNote3 = document.createElement('div');
		newNote3.setAttribute('class','neuLink');
		
		var element = this.environment;
		
		$(newNote).mousedown(function(e){
			var newDiv = Util.createDiv(e.pageX-60,e.pageY-5);
			$(newDiv).trigger('mousedown');
			element.newKnot(newDiv);
		});
		
		
		$(newNote2).click(function(e){
			element.startLineDrag();
		});
		
		$(newNote3).click(function(e){
			console.log(Parser.load('res/noconnect-50-nodes.yaml'));
		});
		
		this.appendButton(newNote);
		this.appendButton(newNote2);
		this.appendButton(newNote3);
		
		document.body.appendChild(toolBar);
		$(toolBar).bind('dragstart',function( event ){
			return $(event.target).is(handle);
			})
			.bind('drag',function( event ){
			$( this ).css({
				top: event.offsetY,
				left: event.offsetX
			});
		});
		
	}
	/*
	* This function appends a Button to the Toolbox
	*/
	
	ToolBar.prototype.toggleLine = function(){
		this.line = !this.line;
	}
	
	ToolBar.prototype.appendButton = function(div){
		this.toolBox.appendChild(div);
		this.buttons.push(div);
	}
	
	/*
	* This function determineds if this Object was hit.
	* position : [x,y] array
	*/
	ToolBar.prototype.isHit = function(position){
		var thisPosition = [Util.cssToInt($(this.toolBox).css('left')), Util.cssToInt($(this.toolBox).css('top'))];
		var width = Util.cssToInt($(this.toolBox).css('width'));
		var height = Util.cssToInt($(this.toolBox).css('height'));
		
		return ((thisPosition[0] <= position[0] && thisPosition[1] <= position[1]) && (position[0] <= (thisPosition[0]+width) && position[1] <= (thisPosition[1]+height)));
	}
	
	/*
	* This function sets the z-index for the div object, represents this NetworkElement.
	* index : the index for, well, the z-index
	*/
	ToolBar.prototype.setZIndex = function(index){
		$(this.toolBox).css('z-index',index);
		this.zindex = index;
	}
	return ToolBar;
	
}));
