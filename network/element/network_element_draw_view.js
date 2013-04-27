/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
	[],
	(function(){

		var NetworkElementDrawView = function(controller){
			this.controller = controller;
			this.createSvg();
		}
		
		NetworkElementDrawView.createSvg(){
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "image");
			svg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '');
	
			// TODO replace standard width and height values
			svg.setAttribute("x", this.controller.model.x);
			svg.setAttribute("y", this.controller.model.y);
			svg.setAttribute("width", 50);
			svg.setAttribute("height", 50);
			svg.setAttribute("xlink:href", this.getPathToSvg());
	
			this.svg = svg;
		}
		
		NetworkElementDrawView.prototype.getPathToSvg = function(){
			var path = ' /assets/img/network_elements/';
			var type = this.controller.model.ne_type;
			
			switch (type){
				case "/node/host/generic": return path + 'generic_host.svg';
				case "/node/host/pip": return path + 'pip_host.svg';
				case "/node/switch/cisco": return path + 'cisco_switch.svg';
				case "/node/switch/tunnelbridge": return path + 'tunnelbridge_switch.svg';
				case "/node/switch/pip": return path + 'pip_switch.svg';
				default: throw "could not draw svg tag for undefined ne_type '" + type + "'";
			}
		}
		
		return NetworkElementDrawView;
	})
);