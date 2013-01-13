/*
 * Module network: represents a network, handles the nodes and links
 * Author: Flerdi Team
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery", "node", "link"], (function($, Node, Link) {

	var Network = function(json, name){
		this.elements = json;
		this.name = name || "Unknown network" ;
		console.log('creating new Network "'+name+'"');
		
			
		this.nodes = [];
		
		this.links = [];
		
		this.element_id = 0;
		this.position_id = 0;
		
		this.setAttributes(json);
		
		/*This loop searches tje biggest positin id, only if there is an id*/
		if(this.elements['--- !Flerdit,2012'] !== undefined){
			for(j=0; j<  this.elements['--- !Flerdit,2012'].length; j++){				
				if(this.elements['--- !Flerdit,2012'][j].id > this.position_id){
					this.position_id = this.elements['--- !Flerdit,2012'][j].id;
				}
			}
		}
		for(var i=0; i < this.elements.network_elements.length; i++){
			var type = this.elements.network_elements[i].attributes.ne_type.split('/')[1];
			var position = this.getPositionById(this.elements.network_elements[i].attributes.id);
			
			/*this if searches the biggest id, only if there is an id*/
			if(this.elements.network_elements[i].attributes.id !== undefined){
				if(parseInt(this.elements.network_elements[i].attributes.id) > this.element_id){
					this.element_id = parseInt(this.elements.network_elements[i].attributes.id);
				}
			}
					
			switch(type){
				case 'link':
					this.importLink(this.elements.network_elements[i]);
					break;
				case 'node':
					this.importNode(this.elements.network_elements[i],position);
					break;
			}
		}
		
		for(i=0; i < this.nodes.length; i++){
			this.nodes[i].createSvgTag();
			this.nodes[i].appendSvgTag();
		}
		
		for(i=0;i<this.links.length;i++){
			this.links[i].createSvgTag();
			this.links[i].appendSvgTag();
		}

		
	};
	
	Network.prototype.setAttributes = function(json){
		this.elements['--- !Flerdit,2012'] = json['--- !Flerdit,2012'] || {};
		this.elements['--- !yaml.org,2002'] = json['--- !yaml.org,2002'] || {};
		this.elements['--- !yaml.org,2002'].attributes = json['--- !yaml.org,2002'].attributes || {};
		
		this.elements['--- !yaml.org,2002'].attributes.graph_nr = json['--- !yaml.org,2002'].attributes.graph_nr || "0";
		this.elements['--- !yaml.org,2002'].attributes.graph_tag = json['--- !yaml.org,2002'].attributes.graph_tag || "";
		this.elements['--- !yaml.org,2002'].attributes.graph_type = json['--- !yaml.org,2002'].attributes.graph_type || "OL";
		this.elements['--- !yaml.org,2002'].attributes.id = json['--- !yaml.org,2002'].attributes.id || "1";
		this.elements['--- !yaml.org,2002'].attributes.role_identifier = json['--- !yaml.org,2002'].attributes.role_identifier || "PIP91";
		this.elements['--- !yaml.org,2002'].attributes.v_net_identifier = json['--- !yaml.org,2002'].attributes.v_net_identifier || this.name;
		this.elements['--- !yaml.org,2002'].attributes_cache = json['--- !yaml.org,2002'].attributes_cache || [];
			
			
		this.elements.network_elements = json.network_elements || {};
	}
	
	Network.prototype.importNode = function(json,position, show){
		var s = show || false;
		
		var id = this.nodes.push(new Node(json,position,this))-1;
		
		if(s){
			this.nodes[id].createSvgTag();
			this.nodes[id].appendSvgTag();
		}
	};
	
	Network.prototype.importLink = function(json){
		this.links.push(new Link(json,this));
	};
	
	Network.prototype.getPositionById = function(id){
		var input = this.elements['--- !Flerdit,2012'];
		var output = {};
		if(input !== undefined){
			for(j=0; j< input.length; j++){				
				if(input[j].network_element_id == id){
					output = input[j]; 
					break;
				}
			}
		}
		
		return output;
	};
	
	Network.prototype.getNextElementId = function(){
		return ++this.element_id;
	};
	
	Network.prototype.getNextPositionId = function(){
		return ++this.position_id;
	};
	
	Network.prototype.getNodeByInterfaceId = function(id){
		for(var j=0;j<this.nodes.length;j++){
			for(var k=0; k<this.nodes[j].getJson().network_interfaces.length;k++){
				if(parseInt(this.nodes[j].getJson().network_interfaces[k].attributes.id) == id){
					return this.nodes[j];
				}
			}
		}
		return null;
	};
	
	Network.prototype.getNodeById = function(id){
		for(var i=0;i<this.nodeslength; i++){
			if(parseInt(this.nodes[i].getjson().attribues.id) == parseInt(id)){
				return this.nodes[i];
			}
		}
		return null;
	}
	
	Network.prototype.remove = function(){
		console.log('remove every element  of this network');
		for(var i=0; i<this.nodes.length; i++){
			this.nodes[i].removeSvgTag();
		}
		for(var i=0; i<this.links.length; i++){
			this.links[i].removeSvgTag();
		}
	}
	Network.prototype.getNetworkId = function(){
		return this.elements['--- !yaml.org,2002'].attributes.id;
	}
	
	Network.prototype.getJson = function(){
		this.elements.network_elements = [];
		this.elements['--- !Flerdit,2012'] = [];
		console.log(this.elements);
		for(var i=0; i<this.links.length; i++){
			this.elements.network_elements.push(this.links[i].getJson());
		}
		
		
		for(var i=0; i<this.nodes.length; i++){
			this.elements.network_elements.push(this.nodes[i].getJson());
			this.elements['--- !Flerdit,2012'].push(this.nodes[i].getPositionJson());
		}
	}
	
	return Network;
})); //define