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
		
		this.div = document.createElement("div");
		this.position = position;
		this.color = this.getNodeColor(nodeType);
		this.div.setAttribute("class", "node_visualisation", 0);
		
		this.updateAttributes();
	} //constructor
	
	/* returns a hex color for the node, depending on node type */
	Node_Visualisation.prototype.getNodeColor = function(nodeType) {
		switch (nodeType) {
			case "/node/host/generic":
				return "#CA2840";
			case "/node/host/pip":
				return "#929292";
			case "/node/switch/cisco":
				return "#28B228";
			case "/node/switch/tunnelbridge":
				return "#396CB3";
			case "/node/switch/pip":
				return "#D7D72A";
			default:
				return "#000000";
		}
	} //getNodeColor
	
	/* updates the position and color of the node */
	Node_Visualisation.prototype.updateAttributes = function() {
		this.div.setAttribute("style", "left:" + this.position[0] + "px;top:" + this.position[1] + "px;background-color:" + this.color + ";", 0);
	}
	
	/* makes the node visible by appending it to the body */
	Node_Visualisation.prototype.show = function() {
		console.log("showing node");
		
		$("#body_element").append(this.div);
	} //show
	
	/* makes the node invisible by removing it from the body */
	Node_Visualisation.prototype.hide = function() {
		console.log("hiding node");
		
		$(this.div).remove();
	} //hide
	
	// /* adds drag-function to nodes */
	Node_Visualisation.prototype.addDrag = function() {
		var node = this.div;
		var nodeDragger = document.createElement('div');
		nodeDragger.setAttribute('class', 'nodeDragger');
		node.appendChild(nodeDragger);
		$(node).css('right', '0');
		$(node).css('bottom', '0');
		document.body.appendChild(node);
		$(node).on('drag',function(event){
			$(this).css({top: event.offsetY, left: event.offsetX});
		}); 
	} //addDrag
	
	return Node_Visualisation;
})); //define