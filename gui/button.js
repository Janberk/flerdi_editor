define([ "jquery" ],
		function($) {
	
			/**
			 * This is the onstructor.
			 * 
			 * @param attributes initial attributes for this progress bar
			 * 
			 * {	type : default || primary || info || success || warning || danger || inverse || link, default = defaut
			 * 		text : String
			 * 		size : large || normal || small || mini, default normal;
			 * }
			 * 
			 * @param parent DOM-Object that should contain this progressbar, If undefined, documnet.body will be used
			 * 
			 * 
			 */
			var Progressbar = function(attributes, parent, clickEvent) {
				attributes = attributes || {};
							
				this.type = attributes.type || "default";
				this.size = attributes.size || "normal";
				this.text = attributes.text || "";
				this.parent = parent;
				
				this.clickEvent = function(){};
				
				if (clickEvent != undefined && typeof clickEvent == 'function') {
					this.clickEvent = clickEvent;
				}
				
				if(this.type == 'default' || this.type == 'primary' || this.type == 'info' || this.type == 'success' || this.type == 'warning' || this.type == 'danger' || this.type == 'invers' || this.type == 'link'){
				}else{
					console.warn("type " + this.type + " not supported. Set to default");
					this.type = 'default';
				}
				
				if(this.size == 'large' || this.size == 'normal' || this.size == 'small' || this.size == 'mini'){
				}else{
					console.warn("type " + this.size + " not supported. Set to normal");
					this.type = 'normal';
				}
				
				this.button = document.createElement('button');
				
				var _this = this;
				
				$(this.button).on('click',function(e){_this.clickEvent(e)})
				
				$(this.button).attr({type:'button'});
				
				this.refresh();
				
			}
			
			Progressbar.prototype.refresh = function(){
				var typeClass = "";
				if(this.type != "default"){
					typeClass = "btn-"+this.type;
				}
				
				var sizeClass = "";
				if(this.type != "normal"){
					typeClass = "btn-"+this.size;
				}
				
				$(this.button).removeClass();	
				$(this.button).addClass('btn');
				$(this.button).addClass(typeClass);
				$(this.button).addClass(sizeClass);
				$(this.button).html(this.text);
				
			}
			
			Progressbar.prototype.show = function(){
				$(this.parent).append(this.button);
			}
			
			Progressbar.prototype.remove = function() {
				this.parent.removeCihld(this.button);
				this.button = undefined;
			}
			
			return Progressbar;
		})
