/*
 * Author: Flerdi Team
 */
 
/*
 * This class creates an empty dialogue window
 */ 
define (["jquery","drag"], (function($,drag) {

	var Window = function(){
		console.log('creating dialogue window');
		this.win = document.createElement('div');
		this.statusbar = document.createElement('div');
		this.closeButton = document.createElement('div');
		
		this.statusbar.appendChild(this.closeButton);
		this.win.appendChild(this.statusbar);
		document.body.appendChild(this.win);
		this.createWindow();
	}
	
	Window.prototype.createWindow = function() {
		var wHeight = 300; //height of the new window
		var wWidth = 300; //width of the new window
		var t = $(document).height()/2 - wHeight/2;
		var l = $(document).width()/2 - wWidth/2;
		$(this.win).css({
			height:wHeight,
			width:wWidth,
			'background-color':'#eeeeee',
			position:'fixed',
			top:t,
			left:l,
			'border-width':'1px',
			'border-color':'#000000',
			'border-style':'solid',
		});
		
		$(this.statusbar).css({
			height:21,
			'background-color':'#cccccc',
			cursor: 'move',
		});
		
		$(this.closeButton).css({
			height:15,
			width:15,
			'background-color':'#a80000',
			'background-image':'url(/assets/icons/closed.png)',
			position: 'absolute',
			top:3,
			right:3,
			cursor: 'pointer',
		});
				
		var _this = this;
		 
		$(this.win)
			.on('dragstart', function(e) {
				return $(e.target).is(_this.statusbar);
			})
			.on('drag',function(e){
                $( this ).css({
                    top: e.offsetY,
                    left: e.offsetX
                });
            });
		
		$(this.closeButton).on('click', function() {
		if (_this.win != null) {
			_this.close();
		}
		});
		
		return this.win;
	}

	Window.prototype.close = function(){
		console.log('the window is closed');
		document.body.removeChild(this.win);
		this.win=null;
	}
	
	return Window;
})); //define