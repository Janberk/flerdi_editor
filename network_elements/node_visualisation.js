/*
 * Module node_visualisation: responsible for the visualisation of a node
 * Author: Flerdi Team, Kai Müller
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery", "drag"], (function($,Drag) {
	
	/* constructor */
	var Node_Visualisation = function(position, nodeType) {
		console.log("creating div for node");
		
		this.div = document.createElement("div"); // the container for the svg
		this.svg = document.createElement('img'); // the img container holding the svg file
		this.position = position;
		this.nodeType = nodeType || '/node/host/generic';
		
		this.size = {width:50, height:50}
		
		this.updateAttributes();
	} //constructor
	
	/*
	*  This function returns the path to the .svg file for the gven node type  
	*/
	Node_Visualisation.prototype.getNodePath = function(nodeType) {
		var path =' /assets/img/network_elements/';
		switch (nodeType) {
			case "/node/host/generic":
				return path + 'generic_host.svg';
			case "/node/host/pip":
				return path + 'pip_host.svg';
			case "/node/switch/cisco":
				return path + 'cisco_switch.svg';
			case "/node/switch/tunnelbridge":
				return path + 'tunnelbridge_switch.svg';
			case "/node/switch/pip":
				return path + 'pip_switch.svg';
			default:
				return path + 'generic_host.svg';
		}
	} //getNodePath
	
	/* 
	* This function updates the position and apperance of the Node
	*/
	Node_Visualisation.prototype.updateAttributes = function() {
		var _this = this;
		
		$(this.div).css({left:     this.position[0],
				 top:      this.position[1],
				 height:   this.size.height,
				 width:    this.size.width,
				 position: 'absolute',
				 cursor:   'move'});
				 
		$(this.div).hover(function(){$(this).css({border: '1px dashed black',});
					    },function(){$(this).css({ border:'none',});
							});
		
				 
		$(this.svg).attr({src: _this.getNodePath(_this.nodeType),
				  alt: _this.nodeType})
			   .css({width:   this.size.width,
				 height:  this.size.height,
				 display: 'block'});
	}
	
	/* This function appends the node to the canvas elements */
	Node_Visualisation.prototype.show = function() {
		console.log('Appending node {nodeType : '+this.nodeType+', position : '+this.position+'}');
		
		this.div.appendChild(this.svg);
		
		document.getElementById('drawarea').appendChild(this.div);
		
		//$("#body_element").append(this.div);
	} //show
	
	/* makes the node invisible by removing it from the body */
	Node_Visualisation.prototype.hide = function() {
		console.log("hiding node");
		
		$(this.div).remove();
	} //hide
	
	// /* adds drag-function to nodes */
	Node_Visualisation.prototype.addDrag = function() {	
		$(this.div).on('drag', function(event){ $(this).css({ top:  (event.offsetY-32),
								      left: (event.offsetX-32),});
						 });
	} //addDrag
	
	return Node_Visualisation;
})); //define