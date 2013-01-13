/*
 * Author: Flerdi Team
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery"], (function($) {

	var Node = function(json,position,network){
		console.log('creating node');
		this.json = json;
		this.position = position;
		this.element; // element representing the node
			
		this.network = network;
			
		this.setAttributes(json);
		this.setPositionValues(position);
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
		var svg = document.createElement('div');
		$(svg).css({	height:50,
				width:50,
				'background-color':'blue',
				position:'absolute',
				left:this.position.x,
				top:this.position.y});
				
		this.element = svg;
	}
	
	Node.prototype.appendMoveEvent = function (){
		
	}
	
	Node.prototype.removeMoveEvent = function(){
		
	}
	
	Node.prototype.removeSvgTag = function(){
		console.log('removing svg-tags for this node from the svgRoot');
		document.getElementById('drawarea').removeChild(this.element);
	}
	
	Node.prototype.appendSvgTag = function(){
		console.log('appanding svg-tags for this node to the svgRoot');
		document.getElementById('drawarea').appendChild(this.element);
	}
	
	return Node;
})); //define