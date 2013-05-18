define([ "jquery" , "button"],
		function($, Button) {
	
			/**
			 * This is the onstructor.
			 * 
			 * @param attributes 
			 * 
			 * @param parent DOM-Object that should contain this progressbar, If undefined, documnet.body will be used
			 * 
			 * 
			 */
			var OverviewComponent = function(attributes, parent, callback) {
				attributes = attributes || {};

				this.id = attributes.id || "";
				this.name = attributes.name || "";
				this.active = false;
				this.parent = parent;
				
				
				if(attributes.active === true){
					this.active = true;
				}
				
				this.callback = function(){};
				if (callback != undefined && typeof callback == 'function') {
					this.callback = callback;
				}
				
				var _this = this;
				
				this.container = document.createElement('div');
				this.label = document.createElement('span');
				
				
				$(this.container).css({padding: '0px 0px 0px 5px',margin: '0px 0px 5px 0px',textAlign:'right'});
				$(this.label).css({float:'left'});
				
				this.remove = new Button({type:'link',text:'delete',size:'mini'},this.container, function(evt){
					_this.callback('remove',{id:_this.id});
				});
				
				$(this.container).append(this.label);
				this.refresh();
				
			}
			
			OverviewComponent.prototype.refresh = function(){
				if(this.active){
					$(this.container).addClass('active');
				}else{
					$(this.container).removeClass('active');
				}
				$(this.label).html(this.name);
				this.remove.show();
			}
			
			OverviewComponent.prototype.show = function(){
				$(this.parent).append(this.container);
			}
			
			OverviewComponent.prototype.remove = function() {

			}
			
			return OverviewComponent;
		})
