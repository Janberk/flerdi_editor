define([ "jquery" ],
		function($) {
	
			/**
			 * This is the onstructor.
			 * 
			 * @param attributes initial attributes for this progress bar
			 * 
			 * {	striped : true || false, default = false
			 * 		animated: true || false, default = false
			 * 		type : info || success || warning || danger, default = info
			 * }
			 * 
			 * @param parent DOM-Object that should contain this progressbar, If undefined, documnet.body will be used
			 * 
			 * 
			 */
			var Progressbar = function(attributes, parent) {
				attributes = attributes || {};
				this.striped = false;
				this.animated = false;
				this.type = attributes.type || "info";
				this.parent = parent || document.body;
				this.value = 0;
				
				if(attributes.striped !== undefined && attributes.striped){
					this.striped = true;
				}
				if(attributes.animated !== undefined && attributes.animated){
					this.animated = true;
				}
				if(this.type === 'success' || this.type === 'warning' || this.type === 'danger' || this.type === 'info'){
					
				}else{
					console.warn("type " + this.type + " not supported. Set to default");
					this.type = 'info';
				}
				
				this.bar = document.createElement('div');
				this.barContainer = document.createElement('div');
				this.barContainer.appendChild(this.bar);
				this.refresh();
			}
			
			Progressbar.prototype.refresh = function(){
				$(this.barContainer).removeClass();
				$(this.barContainer).addClass('progress').addClass('progress-'+this.type);
				
				if(this.striped){
					$(this.barContainer).addClass('progress-striped')
				}
				if(this.animated){
					$(this.barContainer).addClass('active')
				}
				
				$(this.bar).css({width:this.value+'%'}).addClass('bar');
				
			}
			
			/**
			 * This functions sets the value of the progressbar, must be value >=0 && value <= 100
			 * 
			 */
			Progressbar.prototype.setValue = function(value){
				this.value = value;
				$(this.bar).css({width:value+"%"});
			}
			
			Progressbar.prototype.show = function(){
				$(this.parent).append(this.barContainer);
			}
			
			Progressbar.prototype.remove = function() {
				this.parent.removeCihld(this.barContainer);
				this.barContainer = undefined;
			}
			
			return Progressbar;
		})
