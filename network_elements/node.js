/*
 * Author: Flerdi Team
 * RequireJS module definition
 */ 

define (["jquery", "drag", "listDialogue", "contextMenu", "link", "statusbar"], 
(function($, Drag, listDialogue, ContextMenu, Link, Statusbar) {

	var NodeTypes = ["/node/host/generic", "/node/host/pip", "/node/switch/cisco", "/node/switch/tunnelbridge", "/node/switch/pip"];

	var Node = function(json,position,network){
		console.log('creating node');
		this.json = json;
		this.position = position;
		this.element; // element representing the node
			
		this.network = network;
		
		this.links = []; // all links that connect this node
			
		this.setAttributes(json);
		this.setPositionValues(position);
		this.contextMenu = this.setContextMenu();
		this.statusbar = this.setStatusbar();
	}
	
	Node.prototype.setAttributes = function(json){
		this.json.attributes = json.attributes || {};
		this.json.attributes.alias = json.attributes.alias || "";
		this.json.attributes.console_interface_id = json.attributes.console_interface_id || "";
		this.json.attributes.graph_label_id = json.attributesgraph_label_idalias || this.network.getNetworkId();
		this.json.attributes.id = json.attributes.id || this.network.getNextElementId();
		this.json.attributes.ne_type = json.attributes.ne_type || "/node/host/generic";
		this.json.attributes.provisioning_interface_id = json.attributes.provisioning_interface_id || "";
		this.json.attributes_cache = json.attributes_cache || [];
		this.json.constraint_groups_network_elements = json.constraint_groups_network_elements || [];
		this.json.features = json.features || [];
		this.json.hosted_network_elements_mappings = json.hosted_network_elements_mappings || [];
		this.json.mgmt_flags = json.mgmt_flags || [];
		this.json.network_interfaces = json.network_interfaces || [];
		this.json.resources = json.resources || [];
	}
	
	Node.prototype.setPositionValues = function(json){
		this.position.id = json.id || this.network.getNextPositionId();	
		this.position.x = json.x || Math.floor(Math.random() * $('#drawarea').width());
		this.position.y = json.y || Math.floor(Math.random() * $('#drawarea').height());
		this.position.network_element_id = json.network_element_id || this.json.attributes.id;
		this.position.attributes_cache = json.attributes_cache || [];
	}
	
	Node.prototype.setContextMenu = function() {
		var _this = this;
		var menu = new ContextMenu();
		menu.addButton('Delete', function(e) { _this.removeNode() });
		menu.addButton('Properties', function(e) {new listDialogue(_this.getJson()) });
		return menu;
	}
	
	Node.prototype.setStatusbar = function() {
		var sb = new Statusbar(this);
		sb.addTextfield('ne_identifier', this.json.attributes.id);
		sb.addTextfield('alias', this.json.attributes.alias);
		sb.addDropdown('ne_type', this.json.attributes.ne_type, NodeTypes);
		return sb;
	}
	Node.prototype.set = function(target, v) {
		switch(target) {
			case 'ne_identifier': this.json.attributes.id = v;
			case 'alias': this.json.attributes.alias = v;
			case 'ne_type': {
				this.json.attributes.ne_type = v;
				this.removeSvgTag();
				this.createSvgTag();
				this.appendSvgTag();
			}
		}
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

		var _this = this;
		$(node).on('contextmenu', function(e) {
			_this.contextMenu.show(e.clientX-32,e.clientY-32);
			return false;
			})
			.hover(function(e) {
				_this.statusbar.show(true);
			}, function(e) {
				_this.statusbar.show(false);
			})
			.on('click', function(e) {
				_this.statusbar.edit(true);
			});
		$('#drawarea').on('click', function(e) {
			if($(e.target).closest('image').length == 0) _this.statusbar.edit(false);
		});

	}
	
	Node.prototype.appendMoveEvent = function (){
		var _this = this;
		
		// this dummy shows the original position while moving
		var dummy;
		
		$(_this.element).on('dragstart', function(event){
			dummy = document.createElementNS("http://www.w3.org/2000/svg", "image");
			dummy.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', ''); 
			dummy.setAttribute('opacity', '0.5');
			
			// TODO replace standart width and height values
			dummy.setAttribute("x", _this.position.x);
			dummy.setAttribute("y", _this.position.y);
			dummy.setAttribute("width", 50);
			dummy.setAttribute("height", 50);
			dummy.setAttribute("xlink:href", _this.getPathToSvg());
			
			// add dummy to document
			document.getElementById('nodes').appendChild(dummy);
		}).on('drag', function(event){
			$(_this.element).attr('x', event.offsetX-32);
			$(_this.element).attr('y', event.offsetY-32);
		}).on('dragend',function(event){
			_this.position.x = event.offsetX-32;
			_this.position.y = event.offsetY-32;
			
			// remove dummy from document
			document.getElementById('nodes').removeChild(dummy);
			
			_this.updateLinks();
		});
	}
	
	Node.prototype.removeMoveEvent = function(){
		$(this.element).off('dragstart').off('drag').off('dragend');
	}
	
	Node.prototype.appendConnectEvent = function(linkState){
		var _this = this;

		$(_this.element).on('dragstart', function(event){
			// save this element in the new_link state
			linkState.setFirstElement(_this);
		}).on('drag', function(event){
			// draw a line in the new_link state
			linkState.drawDummyLine(_this);
		}).on('mouseup',function(event){
			// try to connect in the new_link state
			linkState.setSecondElement(_this);
		});
	}

	Node.prototype.removeConnectEvent = function(){
		$(this.element).off('dragstart').off('drag').off('mouseup');
	}
	
	Node.prototype.removeSvgTag = function(){
		console.log('removing svg-tags for this node from the svgRoot');
		document.getElementById('nodes').removeChild(this.element);
	}
	
	Node.prototype.appendSvgTag = function(){
		console.log('appanding svg-tags for this node to the svgRoot');
		document.getElementById('nodes').appendChild(this.element);
	}
	
	Node.prototype.removeNode = function(){
		this.removeSvgTag();
		this.network.removeNodeById(this.getJson().attributes.id);
	}
	
	Node.prototype.getId = function(){
		return this.json.attributes.id;
	}
	
	/* this function is called by links, to notify the node that its connected by this link */
	Node.prototype.addLink = function(link){
		this.links.push(link);
	}
		
	/* updates all connected links, called when a node is moved */
	Node.prototype.updateLinks = function(){
		for(var i = 0; i < this.links.length; i++){
			this.links[i].update();
		}
	}
	
	return Node;
})); //define
