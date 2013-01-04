/*
 * Module network: represents a network, handles the nodes and links
 * Author: Flerdi Team, Kai Müller, Franz Nieschalk
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery", "node", "link", "json2yaml"], (function($, Node, Link, Json2yaml) {

	/* constructor */
	var Network = function(jsonObject, name) {
		console.log("creating network");
		this.name = name;
		this.attributes = jsonObject.attributes;
		this.attributes_cache = jsonObject.attributes_cache;
		this.positions = jsonObject['--- !Flerdit,2012'];
		
		this.network_elements = [];
		this.network_interfaces = [];
		this.nodes = [];
		this.links = [];
		
		this.sortElements(jsonObject.network_elements);
		
		this.createNodes();
		this.createLinks();
	} //constructor
	
	/* sorts the elements and their interfaces of the network by ID */
	Network.prototype.sortElements = function(elements) {
		for(var i = 0; i < elements.length; i++) {
			if(elements[i] === undefined) continue;

			var element = elements[i];
			var element_id = element.attributes.id;
			
			this.network_elements[element_id] = element;
			
			/* sorts all the interfaces of the current element by ID */
			for(var j = 0; j < element.network_interfaces.length; j++) {
				var network_interface = element.network_interfaces[j];
				var network_interface_id = network_interface.attributes.id;
			
				this.network_interfaces[network_interface_id] = network_interface;
			}
		}
	} //sortElements
	
	/* creates the nodes of the network */
	Network.prototype.createNodes = function() {
		console.log("pushing nodes");
		
		for (var i = 0; i < this.network_elements.length; i++) {
		
			if(this.network_elements[i] === undefined) continue;
		
			var element = this.network_elements[i];	
			var element_type = element.attributes.ne_type;
		
			if(element_type.substr(0,5) == "/node") {
				this.nodes[i] = new Node(element, this.positions);
			}
		}
	} //createNodes
	
	/* creates the links of the network */
	Network.prototype.createLinks = function() {
		console.log("pushing links");
	
		for (var i = 0; i < this.network_elements.length; i++) {
			
			if(this.network_elements[i] === undefined) continue;
			
			var element = this.network_elements[i];
			var element_type = element.attributes.ne_type;
		
			if(element_type.substr(0,5) == "/link") {
				var connected_nodes = [];
				
				for(var j = 0; j < element.network_interfaces.length; j++) {
					var connected_interface_id = element.network_interfaces[j].attributes.network_interface_id;
					var connected_interface = this.network_interfaces[connected_interface_id];
					var connected_node = this.nodes[connected_interface.attributes.network_element_id];
					
					connected_nodes.push(connected_node);
				}

				this.links[i] = new Link(element, connected_nodes);
			}
		}
	} //createLinks
	
	/* returns the name of the network */
	Network.prototype.getName = function() {
		return this.name;
	} //getName
	
	/* returns a representation of the network in yaml format */
	Network.prototype.getYaml = function() {
		var yaml = "--- !yaml.org,2002:GraphLabel\n";
		
		//attributes
		yaml += "attributes:\n";
		var yaml_attr = "\t";
		yaml_attr += json2yaml(this.attributes);
		yaml_attr = yaml_attr.replace(/(\n)/g,"\n\t");
		yaml_attr = yaml_attr.replace(/null/g,"");
		yaml_attr = yaml_attr.replace(/\"/g,"");
		yaml_attr = yaml_attr.replace(/ (\d+)/g," \"$1\"");
		yaml_attr += "\n";
		yaml += yaml_attr;
		
		//attributes_cache
		yaml += "attributes_cache:";
		var yaml_attr_cache = " {}\n\n";
		yaml += yaml_attr_cache;
		
		//network_elements
		yaml += "network_elements:\n";
		var yaml_network_elements = "";
		for (var i = 0; i < this.network_elements.length; i++) {
			yaml_network_elements += this.nodes[i].getNodeYaml();
			yaml_network_elements += "\n";
		}
		yaml += yaml_network_elements;
		
		//positions
		yaml += "# Example position objects (used by Flerdit and ignored by the prototype)\n\n";
		for (var i = 0; i < this.network_elements.length; i++) {
			yaml += this.nodes[i].getPositionYaml();
			yaml += "\n"
		}
		
		yaml = yaml.replace(/\t/g, "  ");
		return yaml;
	} //getYaml	
	
	return Network;
})); //define