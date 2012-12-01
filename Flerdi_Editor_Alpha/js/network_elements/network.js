/*
 * Module network: represents a network, handles the nodes and links
 * Author: Flerdi Team, Kai Müller
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery","node", "json2yaml"], (function($, Node, Json2yaml) {

	/* constructor */
	var Network = function(jsonObject, name) {
		console.log("creating network");
		this.name = name;
		this.attributes = jsonObject.attributes;
		this.attributes_cache = jsonObject.attributes_cache;
		this.network_elements = jsonObject.network_elements;
		this.positions = jsonObject.positions;
		this.nodes = [];
		this.links = [];
		
		this.createNodes();
		this.createLinks();
	} //constructor
	
	/* creates the nodes of the network */
	Network.prototype.createNodes = function() {
		console.log("pushing nodes");
		
		for (var i = 0; i < this.network_elements.length; i++) {
			this.nodes.push(new Node(this.network_elements[i], this.positions));
		}
	} //createNodes
	
	/* creates the links of the network */
	Network.prototype.createLinks = function() {
		//TODO
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
		return yaml;
	} //getYaml	
	
	return Network;
})); //define