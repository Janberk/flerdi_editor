/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of a loading indicator
 */ 
define (["jquery","spinner" ], 
	(function($, Spinner) {

	/* constructor */
	var LoadingWindow = function(message) {
	//creating the window
	this.message = message || '';
	this.container = document.createElement('div');
		
	this.messageContainer = document.createElement('div');
	//appending css values to the window

	var width = 400;
	var height = 200;
		
	$(this.container).css({	'width':400,
				'height':200,
				'position':'fixed',
				'left' : (($(window).width()/2)-(width/2)),
				'top' : (($(window).height()/2)-(height/2)),
				'z-index':999999,
				'background-color':'#626262',
				'border-top':'2px solid #a2a2a2',
				'border-left':'2px solid #a2a2a2',
				'border-right':'2px solid #323232',
				'border-bottom':'2px solid #323232',
			});
	var messageHeight = 20;
	$(this.messageContainer).css({	'position':'relative',
					'height' : messageHeight,
					'top':	(((height/2)-(messageHeight/2))+50),
					'color':'white',
					'text-align':'center',
			}).html(message);
			
	var opts = {
		  lines: 13, // The number of lines to draw
		  length: 7, // The length of each line
		  width: 4, // The line thickness
		  radius: 11, // The radius of the inner circle
		  corners: 1, // Corner roundness (0..1)
		  rotate: 0, // The rotation offset
		  color: '#ffffff', // #rgb or #rrggbb
		  speed: 1, // Rounds per second
		  trail: 38, // Afterglow percentage
		  shadow: true, // Whether to render a shadow
		  hwaccel: false, // Whether to use hardware acceleration
		  className: 'spinner', // The CSS class to assign to the spinner
		  zIndex: 2e9, // The z-index (defaults to 2000000000)
		  top: 'auto', // Top position relative to parent in px
		  left: 'auto' // Left position relative to parent in px
		};
	this.container.appendChild(this.messageContainer);
	document.body.appendChild(this.container);
	this.spinner = new Spinner(opts).spin(this.container);

	} //constructor

	/* 
	*  This functions close the Window and remov all objects.
	*  In Order to show the Window again, you have to crete a new LoadingWindow-Object
	*/
	LoadingWindow.prototype.close = function() {
		this.spinner.stop();
		this.message = null;
		
		this.messgaeContainer = null;
		document.body.removeChild(this.container);
		this.container = null;
	} 
	
	/*
	*  This function is a setter, you do the math.
	*/
	LoadingWindow.prototype.setMessage = function(message){
		this.message = message || '';
	}
	
	return LoadingWindow;
}));