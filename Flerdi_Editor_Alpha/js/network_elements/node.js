/*
 * Module node: represents a single node in the network
 * Author: Flerdi Team, Kai Müller
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery", "node_visualisation", "json2yaml"], (function($, Node_Visualisation, Json2yaml) {

	/* constructor */
	var Node = function(network_element, positions) {
		console.log("creating node");
		this.network_element = network_element;	
		this.attributes = network_element.attributes;
		this.id = network_element.attributes.id;
		this.type = network_element.attributes.ne_type;
		this.position = new Array(Math.floor(Math.random() * 501), Math.floor(Math.random() * 501));
		if (positions != undefined) {
			this.readPosition(positions);
		}
		this.visualisation = new Node_Visualisation(this.position, this.type);
		this.visualisation.show();
	} //constructor
	
	/* overrides the random position if one is given */
	Node.prototype.readPosition = function(positions) {
		for (var i = 0; i < positions.length; i++) {
			if (positions[i].attributes.id == this.id) {
				this.position[0] = positions[i].attributes.x;
				this.position[1] = positions[i].attributes.y;
				break;
			}
		}
	} //readPosition
	
	/* returns a representation of the node in yaml format */
	Node.prototype.getNodeYaml = function() {
		//testshithere	
		var yaml = "- !yaml.org,2002:NetworkElement\n";
		
		//attributes
		yaml += "attributes:\n";
		var yaml_attr = "\t";
		yaml_attr += json2yaml(this.attributes);
		yaml_attr = yaml_attr.replace(/(\n)/g,"\n\t"); //tabulator
		yaml_attr = yaml_attr.replace(/null/g,""); //null entfernen
		yaml_attr = yaml_attr.replace(/\"/g,""); //"" entfernen
		yaml_attr = yaml_attr.replace(/ (\d+)/g," \"$1\"");
		yaml_attr += "\n";
		yaml += yaml_attr;
		
		//attributes_cache
		yaml += "attributes_cache: {}\n\n";
		
		//constraint_groups_network_elements
		yaml += "constraint_groups_network_elements: []\n\n";
		
		//features
		yaml += "features:";
		var yaml_features = " []\n\n";
		if (this.network_element.features != undefined) {
			yaml_features = "\n";
			for (var i = 0; i < this.network_element.features.length; i++) {
				yaml_features += "- !yaml.org,2002:Feature\n";
				yaml_features += "\tattributes:\n\t\t";
				var yaml_features_attr = json2yaml(this.network_element.features[i].attributes);
				yaml_features_attr = yaml_features_attr.replace(/(\n)/g,"\n\t\t"); //tabulator
				yaml_features_attr = yaml_features_attr.replace(/null/g,""); //null entfernen
				yaml_features_attr = yaml_features_attr.replace(/\"/g,""); //"" entfernen
				yaml_features_attr = yaml_features_attr.replace(/ (\d+)/g," \"$1\"");
				yaml_features_attr += "\n";
				yaml_features += yaml_features_attr;
				yaml_features += "\tattributes_cache: {}\n";
				yaml_features += "\n";
			}
		}
		yaml += yaml_features;
		
		//hosted_network_elements_mappings
		yaml += "hosted_network_elements_mappings: []\n\n";
		
		//mgmt_flags
		yaml += "mgmg_flags: []\n\n";
		
		//network_interfaces
		yaml += "network_interfaces: []\n\n";
		
		//resources
		yaml += "resources:";
		var yaml_resources = " []\n";		
		if (this.network_element.resources != undefined) {
			yaml_resources = "\n";
			for (var i = 0; i < this.network_element.resources.length; i++) {
				yaml_resources += "- !yaml.org,2002:Resource\n";
				yaml_resources += "\tattributes:\n\t\t";
				var yaml_resources_attr = json2yaml(this.network_element.resources[i].attributes);
				yaml_resources_attr = yaml_resources_attr.replace(/(\n)/g,"\n\t\t");
				yaml_resources_attr = yaml_resources_attr.replace(/null/g,"");
				yaml_resources_attr = yaml_resources_attr.replace(/\"/g,"");
				yaml_resources_attr = yaml_resources_attr.replace(/ (\d+)/g," \"$1\"");
				yaml_resources_attr += "\n";
				yaml_resources += yaml_resources_attr;
				yaml_resources += "\tattributes_cache: {}\n\n";
			}
		}
		yaml += yaml_resources;
		
		yaml = yaml.replace(/(\n)/g,"\n\t"); //tabulator
		return yaml;
	} //getNodeYaml
	
	/* returns a representation of the position in yaml format */
	Node.prototype.getPositionYaml = function() {
		var yaml = "--- !Flerdit,2012:Position\n";
		yaml += "attributes:\n";
		yaml += "\tid: \"" + this.id + "\"\n";
		yaml += "\tx: " + this.position[0] + "\n";
		yaml += "\ty: " + this.position[1] + "\n";
		yaml += "attributes_cache: {}\n";
		return yaml;	
	} //getPositionYaml	
	
	return Node;
})); //define