/*
 * Author: Flerdi Team
 */
 
/*
 * RequireJS module definition
 */ 

define (["jquery", "drag", "listDialogue", "contextMenu"], (function($, Drag, listDialogue, ContextMenu) {

	var Node = function(json,position,network){
		console.log('creating node');
		this.json = json;
		this.position = position;
		this.element; // element representing the node
			
		this.network = network;
			
		this.setAttributes(json);
		this.setPositionValues(position);
		this.contextMenu = this.setContextMenu();
	}
	
	Node.prototype.setAttributes = function(json){
		this.json.attributes.alias = json.attributes.alias || "";
		this.json.attributes.console_interface_id = json.attributes.console_interface_id || "";
		this.json.attributes.graph_label_id = json.attributesgraph_label_idalias || this.network.getNetworkId();
		this.json.attributes.id = json.attributes.id || this.network.getNextElementId();
		this.json.attributes.ne_type = json.attributes.ne_type || "/node/host/generic";
		this.json.attributes.provisioning_interface_id = json.attributes.provisioning_interface_id || "";
		this.json.attributes_cache = json.attributes_cache || [];
		this.json.constraint_groups_network_elements = json.constraint_groups_network_elements || [];
		this.json.features = json.features || [];
		this.json.hosted_network_element_mappings = json.hosted_network_element_mappings || [];
		this.json.mgmt_flags = json.mgmt_flags || [];
		this.json.network_interfaces = json.network_interfaces || [];
		this.json.resources = json.resources || [];
	}
	
	Node.prototype.setPositionValues = function(json){
		this.position.x = json.x || Math.floor(Math.random() * 501);
		this.position.y = json.y || Math.floor(Math.random() * 501);
		this.position.id = json.id || this.network.getNextPositionId();
		this.position.network_element_id = json.network_element_id || this.json.attributes.id;
		this.position.attributes_cache = json.attributes_cache || [];
	}
	
	Node.prototype.setContextMenu = function() {
		var _this = this;
		var menu = new ContextMenu();
		menu.addButton('Delete', function(e) { _this.removeSvgTag() });
		return menu;
	}	

	Node.prototype.getPathToSvg = function(){
		var path =' /assets/img/network_elements/';
		switch (this.json.attributes.ne_type) {
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
	}
	
	Node.prototype.getJson = function(){
		return this.json;
	}
	
	Node.prototype.getPositionJson = function(){
		return this.position;
	}
	
	Node.prototype.createSvgTag = function(){
		console.log('creating svg-tags for this node');

		var node = document.createElementNS("http://www.w3.org/2000/svg", "image");
		node.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', ''); 
		
		// TODO replace standart width and height values
		node.setAttribute("x", this.position.x);
		node.setAttribute("y", this.position.y);
		node.setAttribute("width", 50);
		node.setAttribute("height", 50);
		node.setAttribute("xlink:href", this.getPathToSvg());
		
		this.element = node;
		
		// TODO remove this
		this.appendMoveEvent();

		var _this = this;
		$(node).on ('click', function() {
			console.log(_this.getJson());
			new listDialogue("resources", _this.getJson());
		});
		$(node).on('contextmenu', function(e) {
			_this.contextMenu.show(_this.position.x, _this.position.y);
			return false;
		});

	}
	
	Node.prototype.appendMoveEvent = function (){
		var _this = this;
	
		$(_this.element).on('drag', function(event){
			$(_this.element).attr('x', event.offsetX-32);
			$(_this.element).attr('y', event.offsetY-32);
		});
	}
	
	Node.prototype.removeMoveEvent = function(){
		$(this.element).off('drag');
	}
	
	Node.prototype.removeSvgTag = function(){
		console.log('removing svg-tags for this node from the svgRoot');
		document.getElementById('nodes').removeChild(this.element);
	}
	
	Node.prototype.appendSvgTag = function(){
		console.log('appanding svg-tags for this node to the svgRoot');
		document.getElementById('nodes').appendChild(this.element);
	}
	
	return Node;
})); //define
