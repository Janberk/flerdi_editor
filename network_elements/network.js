/*
 * Module network: represents a network, handles the nodes and links
 * Author: Flerdi Team, Kai Müller
 * ----------
 * insert create links function: Franz Nieschalk
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
		this.network_elements = jsonObject.network_elements;
		this.positions = jsonObject['--- !Flerdit,2012'];
		
		this.nodes = [];
		this.links = [];
		
		this.createNodes();
		this.createLinks();
	} //constructor
	
	/* creates the nodes of the network */
	Network.prototype.createNodes = function() {
		console.log("pushing nodes");
		
		for (var i = 0; i < this.network_elements.length; i++) {
		
			var element = this.network_elements[i];
			var element_type = element.attributes.ne_type;
		
			if(element_type.substr(0,5) == "/node")
				this.nodes.push(new Node(element, this.positions));
		}
	} //createNodes
	
	/* creates the links of the network */
	Network.prototype.createLinks = function() {
		for (var i = 0; i < this.network_elements.length; i++) {
			
			var element = this.network_elements[i];
			var element_type = element.attributes.ne_type;
		
			if(element_type.substr(0,5) == "/link")
				this.links.push(new Link(element, this.nodes[0], this.nodes[1])); //TODO: determine which elements are actually connected
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