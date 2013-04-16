	/*
	 * Author: Flerdi Team
	 */
	 
	/*
	 * This class is specifically for dialogues to open YAML-Files from your local machine
	 */ 
	define (["jquery","window","parser","jquery_ui"], (
	function($,Window,Parser,JUI) {

		/**
		* This function creates a new OpenDialogue Window
		*
		* @param environment reference to the environment object
		*/
		var OpenDialogue = function(environment){
			console.log('Open Open-Dialouge');
			this.env = environment;
			
			// creating the file input tag
			this.win = new Window('Open',[150,500]);
			this.input = document.createElement('input');
			
			$(this.input).attr({type:'file',size:55}).css({margin:'10px 0px 10px 0px'});
			
			
			this.progress = document.createElement('div');
			$(this.progress).progressbar();
			var _this = this;
			
			$(this.input).on('change',function(e){
				if (this.files !== 'undefined' && typeof FileReader !== 'undefined') {
					
					var file = this.files[0];
					if(file.name.split('\.')[file.name.split('\.').length-1] == 'yaml'){
						var reader = new FileReader();
						
						
															
						reader.onprogress = function(evt){
											if (evt.lengthComputable) {
												var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
												
												if (percentLoaded < 100) {
													$(_this.progress).progressbar( "value", percentLoaded );
												}else{
													$(_this.progress).progressbar( "value", 100 );
												}
											}
										};
						reader.onloadstart = function(){_this.win.appendContent(_this.progress)	;
										};	
						
						reader.onload = function(e){
							$(_this.progress).progressbar( "value", 100 );					
							
							setTimeout(function(){_this.win.close();Parser.loadFromText(e.target.result,file.name,function(json){_this.env.importJson(json,file.name);})},50);
							
							};
						reader.readAsText(file);
					}else{
						alert('Please select a .yaml File');
					}
					    
				} else {
				    alert('Your browser does not support the HTML5 File-API');
				}
				});
			this.fillWindow();
		}
		
		OpenDialogue.prototype.fillWindow = function(){
			var p = document.createElement('p');
			$(p).html('please select a .yaml File').css({padding:0,margin:0});
			this.win.setContent(p);
			this.win.appendContent(this.input);
		}

		return OpenDialogue;
	}));