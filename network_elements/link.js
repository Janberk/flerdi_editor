/*
 * Author: Flerdi Team
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery"], (function($) {

	var Link = function(json,network){
		console.log('creating link');
		this.json = json;
		this.network = network;
		this.setAttributes(json);

		this.nodes = []; //references to nodes, connected to this link
				
		this.lines = [];		
		// set hasChanged true to capture changes
		console.log("Action: link constructor");
		this.network.setHasChanged(true);
	}
	
	Link.prototype.setAttributes = function(json){
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
		this.json.resources.attributes_cache = json.resources.attributes_cache || [];
	}
	
	Link.prototype.getJson = function(){
		return this.json;
	}
	
	Link.prototype.getLinkStyle = function() {
		var link_style;
		
		switch (this.json.attributes.ne_type) {
			case "/link/generic":
				link_style = "stroke:rgb(115,62,145);"; break; //#733e91
			case "/link/transit" :
				link_style = "stroke:rgb(81,188,190);"; break; //#51bcbe
			default:
				link_style = "stroke:rgb(0,0,0);"; break; //#000000
		}

		// if the avp attribute ends with "/symmetric/bandwidth", its half-duplex
		var avp = this.json.resources[0].attributes.avp_attribute;
		var suffix = "/symmetric/bandwidth";

		if(avp.indexOf(suffix, avp.length - suffix.length) !== -1) {
			link_style = link_style + "stroke-width:2"; //half-duplex-link
		}
		else {
			link_style = link_style + "stroke-width:4"; //full-duplex-link
		}
		return link_style;
	}
	
	Link.prototype.createSvgTag = function(){
		console.log('creating svg-tags for this link');
		/*this loop determinate all nodes connected to this link*/
		for(var i=0;i<this.json.network_interfaces.length;i++){
			var node = this.network.getNodeByInterfaceId(parseInt(this.json.network_interfaces[i].attributes.network_interface_id));
			
			this.nodes.push(node); //add the node to the array of connected nodes
			
			node.addLink(this); //tell the node that its connected by this link
		}
		
		// TODO replace standart width and height values
		var node_width = 50;
		var node_height = 50;
		
		var svg_lines = [];
		
		// create the first line
		var x1 = this.nodes[0].getPositionJson().x + node_width/2;
		var y1 = this.nodes[0].getPositionJson().y + node_height/2;
		var x2 = this.nodes[1].getPositionJson().x + node_width/2;
		var y2 = this.nodes[1].getPositionJson().y + node_height/2;
		
		var i = svg_lines.push(document.createElementNS("http://www.w3.org/2000/svg", "line")) - 1;

		svg_lines[i].setAttribute("x1", x1);
		svg_lines[i].setAttribute("y1", y1);
		svg_lines[i].setAttribute("x2", x2);
		svg_lines[i].setAttribute("y2", y2);
		svg_lines[i].setAttribute("style", this.getLinkStyle());
		
		// if there are more than 2 nodes connected, add more lines
		if(this.nodes.length > 2)
		{
			// create an anchor point for additional lines
			var anchor_x = Math.min(x1, x2) + ((Math.max(x1, x2) - Math.min(x1, x2)) / 2);
			var anchor_y = Math.min(y1, y2) + ((Math.max(y1, y2) - Math.min(y1, y2)) / 2);
			var anchor = [anchor_x, anchor_y];
			
			// draw additional nodes
			for(var j = 2; j < this.nodes.length; j++) {
				x1 = anchor[0];
				y1 = anchor[1];
				x2 = this.nodes[j].getPositionJson().x + node_width/2;
				y2 = this.nodes[j].getPositionJson().y + node_height/2;
				
				i = svg_lines.push(document.createElementNS("http://www.w3.org/2000/svg", "line")) - 1;

				svg_lines[i].setAttribute("x1", x1);
				svg_lines[i].setAttribute("y1", y1);
				svg_lines[i].setAttribute("x2", x2);
				svg_lines[i].setAttribute("y2", y2);
				svg_lines[i].setAttribute("style", this.getLinkStyle());
			}
		}
		this.lines = svg_lines;
	}
	
	Link.prototype.removeSvgTag = function(){
		console.log('removing svg-tags for this link from the svgRoot');
		for(var i = 0; i < this.lines.length; i++) {
			document.getElementById('links').removeChild(this.lines[i]);
		}
	}
	
	Link.prototype.appendSvgTag = function(){
		console.log('appanding svg-tags for this link to the svgRoot');
		for(var i = 0; i < this.lines.length; i++) {
			document.getElementById('links').appendChild(this.lines[i]);
		}
	}
	
	Link.prototype.getId = function(){
		return this.json.attributes.id;
	}
	
	Link.prototype.update = function(){
		// TODO replace standart width and height values
		var node_width = 50;
		var node_height = 50;
	
		// update the first line
		var x1 = this.nodes[0].getPositionJson().x + node_width/2;
		var y1 = this.nodes[0].getPositionJson().y + node_height/2;
		var x2 = this.nodes[1].getPositionJson().x + node_width/2;
		var y2 = this.nodes[1].getPositionJson().y + node_height/2;
		
		this.lines[0].setAttribute("x1", x1);
		this.lines[0].setAttribute("y1", y1);
		this.lines[0].setAttribute("x2", x2);
		this.lines[0].setAttribute("y2", y2);
		
		// if there are more than 2 nodes connected, update more lines
		if(this.nodes.length > 2)
		{
			// create an anchor point for additional lines
			var anchor_x = Math.min(x1, x2) + ((Math.max(x1, x2) - Math.min(x1, x2)) / 2);
			var anchor_y = Math.min(y1, y2) + ((Math.max(y1, y2) - Math.min(y1, y2)) / 2);
			var anchor = [anchor_x, anchor_y];
			
			// update additional nodes
			for(var i = 2; i < this.nodes.length; i++) {
				x1 = anchor[0];
				y1 = anchor[1];
				x2 = this.nodes[i].getPositionJson().x + node_width/2;
				y2 = this.nodes[i].getPositionJson().y + node_height/2;

				this.lines[i-1].setAttribute("x1", x1);
				this.lines[i-1].setAttribute("y1", y1);
				this.lines[i-1].setAttribute("x2", x2);
				this.lines[i-1].setAttribute("y2", y2);
			}
		}
	}
	
	return Link;
})); //define