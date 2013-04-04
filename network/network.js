/*
 * Module network: represents a network, handles the nodes and links
 * Author: Flerdi Team
 */

/*
 * RequireJS module definition
 */
define(
		[ "jquery", "node", "link", "json2yaml", "commandManager", "idHandler" ],
		(function($, Node, Link, Json2yaml, CommandManager, IdHandler) {

			var Network = function(json, name) {
				this.elements = json;
				this.name = name || "Unknown network";
				console.log('creating new Network "' + name + '"');

				this.commandManager = new CommandManager(this);

				this.idHandler = new IdHandler(this);

				this.nodes = [];

				this.links = [];

				this.setAttributes(json);

				// boolean to determine, whether objectstate has changed
				this.hasChanged = false;

				for ( var i = 0; i < this.elements.network_elements.length; i++) {
					var type = this.elements.network_elements[i].attributes.ne_type
							.split('/')[1];
					var position = this
							.getPositionById(this.elements.network_elements[i].attributes.id);

					switch (type) {
					case 'link':
						this.importLink(this.elements.network_elements[i]);
						break;
					case 'node':
						this.importNode(this.elements.network_elements[i],
								position);
						break;
					}
				}

				for (i = 0; i < this.nodes.length; i++) {
					this.nodes[i].createSvgTag();
					this.nodes[i].appendSvgTag();
				}

				for (i = 0; i < this.links.length; i++) {
					this.links[i].createSvgTag();
					this.links[i].appendSvgTag();
				}

				this.idHandler.analyseNetwork();
			};

			// getter
			Network.prototype.getHasChanged = function() {
				return this.hasChanged;
			}

			// setter
			Network.prototype.setHasChanged = function(val) {
				this.hasChanged = val;
			}

			Network.prototype.setAttributes = function(json) {
				this.elements['--- !Flerdit,2012'] = json['--- !Flerdit,2012']
						|| {};
				this.elements['--- !yaml.org,2002'] = json['--- !yaml.org,2002']
						|| {};
				this.elements['--- !yaml.org,2002'].attributes = json['--- !yaml.org,2002'].attributes
						|| {};

				this.elements['--- !yaml.org,2002'].attributes.graph_nr = json['--- !yaml.org,2002'].attributes.graph_nr
						|| "0";
				this.elements['--- !yaml.org,2002'].attributes.graph_tag = json['--- !yaml.org,2002'].attributes.graph_tag
						|| "";
				this.elements['--- !yaml.org,2002'].attributes.graph_type = json['--- !yaml.org,2002'].attributes.graph_type
						|| "OL";
				this.elements['--- !yaml.org,2002'].attributes.id = json['--- !yaml.org,2002'].attributes.id
						|| "1";
				this.elements['--- !yaml.org,2002'].attributes.role_identifier = json['--- !yaml.org,2002'].attributes.role_identifier
						|| "PIP91";
				this.elements['--- !yaml.org,2002'].attributes.v_net_identifier = json['--- !yaml.org,2002'].attributes.v_net_identifier
						|| this.name;
				this.elements['--- !yaml.org,2002'].attributes_cache = json['--- !yaml.org,2002'].attributes_cache
						|| [];

				this.elements.network_elements = json.network_elements || {};
			}

			Network.prototype.importNode = function(json, position, show) {
				// set hasChanged true to capture changes
				console.log("Action: importNode");
				this.hasChanged = true;
				console.log("Value of hasChanged: " + this.hasChanged);

				var s = show || false;

				var id = this.nodes.push(new Node(json, position, this)) - 1;

				if (s) {
					this.nodes[id].createSvgTag();
					this.nodes[id].appendSvgTag();
				}
			};

			Network.prototype.importLink = function(json, show) {
				// set hasChanged true to capture changes
				console.log("Action: importLink");
				this.hasChanged = true;
				console.log("Value of hasChanged: " + this.hasChanged);

				var s = show || false;

				var id = this.links.push(new Link(json, this)) - 1;

				if (s) {
					this.links[id].createSvgTag();
					this.links[id].appendSvgTag();
				}
			};

			Network.prototype.getPositionById = function(id) {
				var input = this.elements['--- !Flerdit,2012'];
				var output = {};
				if (input !== undefined) {
					for (j = 0; j < input.length; j++) {
						if (input[j].network_element_id == id) {
							output = input[j];
							break;
						}
					}
				}

				return output;
			};

			/**
			 * This function returns a reference to the IdHandler of this
			 * Network
			 * 
			 * @return reference to IdHandler of this Network
			 */
			Network.prototype.getIdHandler = function() {
				return this.idHandler;
			}

			Network.prototype.getNodeByInterfaceId = function(id) {
				for ( var j = 0; j < this.nodes.length; j++) {
					var interfaces = this.nodes[j].getNetworkInterfaces();

					for ( var k = 0; k < interfaces.length; k++) {
						if (parseInt(interfaces[k].attributes.id) == id) {
							return this.nodes[j];
							break;
						}
					}
				}
				return null;
			};

			Network.prototype.getNodeById = function(id) {
				for ( var i = 0; i < this.nodeslength; i++) {
					if (parseInt(this.nodes[i].getjson().attribues.id) == parseInt(id)) {
						return this.nodes[i];
						break;
					}
				}
				return null;
			}

			Network.prototype.remove = function() {
				// set hasChanged true to capture changes
				console
						.log("Action: remove; remove every element of this network!");
				this.hasChanged = false;
				console.log("Value of hasChanged (remove): " + this.hasChanged);

				for ( var i = 0; i < this.nodes.length; i++) {
					this.nodes[i].removeSvgTag();
				}
				for ( var i = 0; i < this.links.length; i++) {
					this.links[i].removeSvgTag();
				}
			}
			Network.prototype.getNetworkId = function() {
				return this.elements['--- !yaml.org,2002'].attributes.id;
			}

			Network.prototype.getJson = function() {
				this.elements.network_elements = [];
				this.elements['--- !Flerdit,2012'] = [];
				// console.log(this.elements);
				for ( var i = 0; i < this.links.length; i++) {
					this.elements.network_elements
							.push(this.links[i].getJson());
				}

				for ( var i = 0; i < this.nodes.length; i++) {
					this.elements.network_elements
							.push(this.nodes[i].getJson());
					this.elements['--- !Flerdit,2012'].push(this.nodes[i]
							.getPositionJson());
				}
				return this.elements;
			}

			Network.prototype.removeNodeById = function(id) {
				for ( var i = 0; i < this.nodes.length; i++) {
					if (this.nodes[i].getJson().attributes.id == id) {
						this.nodes.splice(i, 1);
						break;
					}
				}
			}

			Network.prototype.getCommandManager = function() {
				return this.commandManager;
			}

			Network.prototype.getYaml = function() {
				var json = this.getJson();

				// +++++++++++++++++++++++++++++++++++++ network_attributes
				// +++++++++++++++++++++++++++++++++++++
				var yaml = '--- !yaml.org,2002:GraphLabel \n';
				var yaml_attr = json2yaml(json['--- !yaml.org,2002']);
				yaml_attr += '\n';
				yaml += yaml_attr;

				// +++++++++++++++++++++++++++++++++++++ network_elements
				// +++++++++++++++++++++++++++++++++++++
				yaml += '\nnetwork_elements: \n'
				for ( var i = 0; i < json.network_elements.length; i++) {
					var spaces = '  ';
					var temp = '';
					var netEle = '- !yaml.org,2002:NetworkElement \n';

					netEle += 'attributes: \n';
					temp = json2yaml(json.network_elements[i].attributes);
					temp = spaces + temp.replace(/\n/g, '\n' + spaces);
					netEle += temp;

					netEle += '\nattributes_cache: \n';
					temp = json2yaml(json.network_elements[i].attributes_cache);
					if (temp != '') {
						temp += '\n';
						temp = temp.replace(/- (attributes:)/g,
								'- !yaml.org,2002: \n' + spaces + '$1');
					} else {
						temp = spaces + temp.replace(/\n/g, '\n' + spaces);
					}
					netEle += temp;

					netEle += '\nconstraint_groups_network_elements: \n';
					temp = json2yaml(json.network_elements[i].constraint_groups_network_elements);
					if (temp != '') {
						temp += '\n';
						temp = temp.replace(/- (attributes:)/g,
								'- !yaml.org,2002: \n' + spaces + '$1');
					} else {
						temp = spaces + temp.replace(/\n/g, '\n' + spaces);
					}
					netEle += temp;

					netEle += '\nfeatures: \n';
					temp = json2yaml(json.network_elements[i].features);
					if (temp != '') {
						temp += '\n';
						temp = temp.replace(/- (attributes:)/g,
								'- !yaml.org,2002:Feature \n' + spaces + '$1');
						temp = temp.replace(/(attributes_cache: \n)(\s*-)/g,
								'$1\n$2');
					} else {
						temp = spaces + temp.replace(/\n/g, '\n' + spaces);
					}
					netEle += temp;

					netEle += '\nhosted_network_elements_mappings: \n';
					temp = json2yaml(json.network_elements[i].hosted_network_elements_mappings);
					if (temp != '') {
						temp += '\n';
						temp = temp.replace(/- (attributes:)/g,
								'- !yaml.org,2002: \n' + spaces + '$1');
					} else {
						temp = spaces + temp.replace(/\n/g, '\n' + spaces);
					}
					netEle += temp;

					netEle += '\nmgmt_flags: \n';
					temp = json2yaml(json.network_elements[i].mgmt_flags);
					if (temp != '') {
						temp += '\n';
						temp = temp.replace(/- (attributes:)/g,
								'- !yaml.org,2002: \n' + spaces + '$1');
					} else {
						temp = spaces + temp.replace(/\n/g, '\n' + spaces);
					}
					netEle += temp;

					netEle += '\nnetwork_interfaces: \n';
					temp = json2yaml(json.network_elements[i].network_interfaces);
					if (temp != '') {
						for ( var j = 0; j < json.network_elements[i].network_interfaces.length; j++) {
							var netInt = '- !yaml.org,2002:NetworkInterface \n';
							netInt += 'attributes: \n';
							temp = json2yaml(json.network_elements[i].network_interfaces[j].attributes);
							temp = spaces + temp.replace(/\n/g, '\n' + spaces);
							netInt += temp;

							netInt += '\nattributes_cache: \n';
							temp = json2yaml(json.network_elements[i].network_interfaces[j].attributes_cache);
							if (temp != '') {
								temp += '\n';
								temp = temp.replace(/- (attributes:)/g,
										'- !yaml.org,2002: \n' + spaces + '$1');
							} else {
								temp = spaces
										+ temp.replace(/\n/g, '\n' + spaces);
							}
							netInt += temp;

							netInt += '\nfeatures: \n';
							temp = json2yaml(json.network_elements[i].network_interfaces[j].features);
							if (temp != '') {
								temp += '\n';
								temp = temp.replace(/- (attributes:)/g,
										'- !yaml.org,2002:Feature \n' + spaces
												+ '$1');
								temp = temp.replace(
										/(attributes_cache: \n)(\s*-)/g,
										'$1\n$2');
							} else {
								temp = spaces
										+ temp.replace(/\n/g, '\n' + spaces);
							}
							netInt += temp;

							netInt += '\nresources: \n';
							temp = json2yaml(json.network_elements[i].network_interfaces[j].resources);
							if (temp != '') {
								temp += '\n';
								temp = temp.replace(/- (attributes:)/g,
										'- !yaml.org,2002:Resource \n' + spaces
												+ '$1');
								temp = temp.replace(
										/(attributes_cache: \n)(\s*-)/g,
										'$1\n$2');
							} else {
								temp = spaces
										+ temp.replace(/\n/g, '\n' + spaces);
							}
							netInt += temp;

							// format
							netInt = netInt.replace(/\n/g, '\n' + spaces);
							netInt = netInt.replace(/\n(\s*)$/g, '\n');

							netEle += netInt;
						}
					}

					netEle += '\nresources: \n';
					temp = json2yaml(json.network_elements[i].resources);
					if (temp != '') {
						temp += '\n';
						temp = temp.replace(/- (attributes:)/g,
								'- !yaml.org,2002:Resource \n' + spaces + '$1');
						temp = temp.replace(/(attributes_cache: \n)(\s*-)/g,
								'$1\n$2');
					} else {
						temp = spaces + temp.replace(/\n/g, '\n' + spaces);
					}
					netEle += temp;

					// format
					netEle = netEle.replace(/\n/g, '\n' + spaces);
					netEle = netEle.replace(/\n(\s*)$/g, '\n');

					yaml += netEle;
				}

				// clear unnessesary whitespaces
				yaml = yaml.replace(/\n(\s*)\n/g, '\n\n');

				// +++++++++++++++++++++++++++++++++++++ positions
				// +++++++++++++++++++++++++++++++++++++
				yaml += '\n\n\n# Example position objects (used by Flerdit and ignored by the prototype)\n';
				yaml += '\n--- !Flerdit,2012:Position\n';
				var pos = json2yaml(json['--- !Flerdit,2012']);
				pos = pos.replace(/- /g, ' -\n  ');
				pos = pos.replace(/ ( attributes_cache: \n)/g, '$1\n');
				pos += '\n\n';
				yaml += pos;

				// +++++++++++++++++++++++++++++++++++++ format
				// +++++++++++++++++++++++++++++++++++++
				// delete null lines
				yaml = yaml.replace(/\n\s*null/g, '');

				// add empty lines
				yaml = yaml.replace(
						/(\n\s*- !yaml.org,2002:NetworkInterface )/g, '\n$1');
				yaml = yaml
						.replace(
								/(network_interfaces: )\n(\n\s*- !yaml.org,2002:NetworkInterface )/g,
								'$1$2');
				yaml = yaml.replace(/(\n\s*- !yaml.org,2002:NetworkElement )/g,
						'\n$1');
				yaml = yaml
						.replace(
								/(network_elements: )\n(\n\s*- !yaml.org,2002:NetworkElement )/g,
								'$1$2');
				yaml = yaml.replace(
						/(avp_attribute.+)(\n\s*- !yaml.org,2002:Resource)/g,
						'$1\n$2');
				yaml = yaml.replace(
						/(interval.+)(\n\s*- !yaml.org,2002:Resource)/g,
						'$1\n$2');

				// add empty arrays/objects symbols
				yaml = yaml.replace(/(attributes_cache:) \n\n/g, '$1 {}\n\n');
				yaml = yaml.replace(
						/(constraint_groups_network_elements:) \n\n/g,
						'$1 []\n\n');
				yaml = yaml.replace(/(features:) \n\n/g, '$1 []\n\n');
				yaml = yaml.replace(
						/(hosted_network_elements_mappings:) \n\n/g,
						'$1 []\n\n');
				yaml = yaml.replace(/(mgmt_flags:) \n\n/g, '$1 []\n\n');
				yaml = yaml.replace(/(network_interfaces:) \n\n/g, '$1 []\n\n');
				yaml = yaml.replace(/(resources:) \n\n/g, '$1 []\n\n');

				// clear shitty "
				yaml = yaml.replace(/\"/g, '');
				// numers in ""
				yaml = yaml.replace(/(\:\ )(\d+)/g, ': "$2"');
				yaml = yaml.replace(/(\ x:\ )"(\d+)"\n/g, '$1$2\n');
				yaml = yaml.replace(/(\ y:\ )"(\d+)"\n/g, '$1$2\n');

				return yaml;
			} // getYaml

			Network.prototype.getName = function() {
				return this.name;
			}; // getName

			return Network;
		})); // define
