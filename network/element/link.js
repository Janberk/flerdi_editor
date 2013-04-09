/*
 * Author: Flerdi Team
 */

/*
 * RequireJS module definition
 */
define(
		[ "jquery", "resources", "features", "network_interfaces" ],
		(function($, Resources, Features, Network_Interfaces) {

			var Link = function(json, network) {
				console.log('creating link');
				this.json = json;
				this.network = network;

				this.nodes = []; // references to nodes, connected to this
				// link

				this.lines = [];

				this.resources = [];
				this.features = [];
				this.network_interfaces = [];

				this.setAttributes(json);
			}

			Link.prototype.setAttributes = function(json) {
				this.json.attributes.alias = json.attributes.alias || "";
				this.json.attributes.console_interface_id = json.attributes.console_interface_id
						|| "";
				this.json.attributes.graph_label_id = json.attributes.graph_label_id
						|| this.network.getNetworkId();
				this.json.attributes.id = json.attributes.id
						|| this.network.getIdHandler().getNextElementId();
				this.json.attributes.ne_type = json.attributes.ne_type
						|| "/node/host/generic";
				this.json.attributes.provisioning_interface_id = json.attributes.provisioning_interface_id
						|| "";
				this.json.attributes.identifier = json.attributes.identifier
						|| this.network.getIdHandler().getNextIdentifierId();
				this.json.attributes.customer_console_interface_id = json.attributes.customer_console_interface_id
						|| "";

				this.json.attributes_cache = json.attributes_cache || [];
				this.json.constraint_groups_network_elements = json.constraint_groups_network_elements
						|| [];

				this.json.features = json.features || [];
				for ( var i = 0; i < this.json.features.length; i++) {
					this.features
							.push(new Features(this, this.json.features[i]));
				}
				this.json.features = [];

				this.json.hosted_network_elements_mappings = json.hosted_network_elements_mappings
						|| [];
				this.json.mgmt_flags = json.mgmt_flags || [];

				this.json.network_interfaces = json.network_interfaces || [];
				for ( var i = 0; i < this.json.network_interfaces.length; i++) {
					this.network_interfaces.push(new Network_Interfaces(this,
							this.json.network_interfaces[i]));
				}
				this.json.network_interfaces = [];

				this.json.resources = json.resources || [];
				for ( var i = 0; i < this.json.resources.length; i++) {
					this.resources.push(new Resources(this,
							this.json.resources[i]));
				}
				this.json.resources = [];

			}

			Link.prototype.getJson = function() {
				this.json.resources = this.getResources();
				this.json.features = this.getFeatures();
				this.json.network_interfaces = this.getNetworkInterfaces();
				return this.json;
			}
			
			/**
			 * This function returns a array of all resources this link have
			 * 
			 * @return Array of all resources
			 */
			Link.prototype.getResources = function() {
				var res = []
				for ( var i = 0; i < this.resources.length; i++) {
					res.push(this.resources[i].getJson());
				}
				return res;
			}
			/**
			 * This function returns a array of all features this link have
			 * 
			 * @return Array of all features
			 */
			Link.prototype.getFeatures = function() {
				var fet = []
				for ( var i = 0; i < this.features.length; i++) {
					fet.push(this.features[i].getJson());
				}
				return fet;
			}
			/**
			 * This function returns a array of all interfaces this link have
			 * 
			 * @return Array of all features
			 */
			Link.prototype.getNetworkInterfaces = function() {
				var nis = [];
				for ( var i = 0; i < this.network_interfaces.length; i++) {
					nis.push(this.network_interfaces[i].getJson());
				}
				return nis;
			}

			Link.prototype.getLinkStyle = function() {
				var link_style;

				switch (this.json.attributes.ne_type) {
				case "/link/generic":
					link_style = "stroke:rgb(115,62,145);";
					break; // #733e91
				case "/link/transit":
					link_style = "stroke:rgb(81,188,190);";
					break; // #51bcbe
				default:
					link_style = "stroke:rgb(0,0,0);";
					break; // #000000
				}

				// if the avp attribute ends with "/symmetric/bandwidth", its
				// half-duplex
				var avp = this.resources[0].getJson().attributes.avp_attribute;
				var suffix = "/symmetric/bandwidth";

				if (avp.indexOf(suffix, avp.length - suffix.length) !== -1) {
					link_style = link_style + "stroke-width:2"; // half-duplex-link
				} else {
					link_style = link_style + "stroke-width:4"; // full-duplex-link
				}
				return link_style;
			}

			Link.prototype.createSvgTag = function() {
				console.log('creating svg-tags for this link');
				/* this loop determinate all nodes connected to this link */
				for ( var i = 0; i < this.network_interfaces.length; i++) {
					var node = this.network
							.getNodeByInterfaceId(parseInt(this.network_interfaces[i].getJson().attributes.network_interface_id));

					this.nodes.push(node); // add the node to the array of
					// connected nodes

					node.addLink(this); // tell the node that its connected by
					// this link
				}

				// TODO replace standart width and height values
				var node_width = 50;
				var node_height = 50;

				var svg_lines = [];

				// create the first line
				var x1 = this.nodes[0].getPositionJson().x + node_width / 2;
				var y1 = this.nodes[0].getPositionJson().y + node_height / 2;
				var x2 = this.nodes[1].getPositionJson().x + node_width / 2;
				var y2 = this.nodes[1].getPositionJson().y + node_height / 2;

				var i = svg_lines.push(document.createElementNS(
						"http://www.w3.org/2000/svg", "line")) - 1;

				svg_lines[i].setAttribute("x1", x1);
				svg_lines[i].setAttribute("y1", y1);
				svg_lines[i].setAttribute("x2", x2);
				svg_lines[i].setAttribute("y2", y2);
				svg_lines[i].setAttribute("style", this.getLinkStyle());

				// if there are more than 2 nodes connected, add more lines
				if (this.nodes.length > 2) {
					// create an anchor point for additional lines
					var anchor_x = Math.min(x1, x2)
							+ ((Math.max(x1, x2) - Math.min(x1, x2)) / 2);
					var anchor_y = Math.min(y1, y2)
							+ ((Math.max(y1, y2) - Math.min(y1, y2)) / 2);
					var anchor = [ anchor_x, anchor_y ];

					// draw additional nodes
					for ( var j = 2; j < this.nodes.length; j++) {
						x1 = anchor[0];
						y1 = anchor[1];
						x2 = this.nodes[j].getPositionJson().x + node_width / 2;
						y2 = this.nodes[j].getPositionJson().y + node_height
								/ 2;

						i = svg_lines.push(document.createElementNS(
								"http://www.w3.org/2000/svg", "line")) - 1;

						svg_lines[i].setAttribute("x1", x1);
						svg_lines[i].setAttribute("y1", y1);
						svg_lines[i].setAttribute("x2", x2);
						svg_lines[i].setAttribute("y2", y2);
						svg_lines[i].setAttribute("style", this.getLinkStyle());
					}
				}
				this.lines = svg_lines;
			}

			Link.prototype.removeSvgTag = function() {
				console.log('removing svg-tags for this link from the svgRoot');
				for ( var i = 0; i < this.lines.length; i++) {
					document.getElementById('links').removeChild(this.lines[i]);
				}
			}

			Link.prototype.appendSvgTag = function() {
				console.log('appanding svg-tags for this link to the svgRoot');
				for ( var i = 0; i < this.lines.length; i++) {
					document.getElementById('links').appendChild(this.lines[i]);
				}
			}
			
			Link.prototype.removeLink = function() {
				this.removeSvgTag();
				this.network.removeLinkById(this.getId());
			}

			Link.prototype.getId = function() {
				return this.json.attributes.id;
			}

			Link.prototype.update = function() {
				// TODO replace standart width and height values
				var node_width = 50;
				var node_height = 50;

				// update the first line
				var x1 = this.nodes[0].getPositionJson().x + node_width / 2;
				var y1 = this.nodes[0].getPositionJson().y + node_height / 2;
				var x2 = this.nodes[1].getPositionJson().x + node_width / 2;
				var y2 = this.nodes[1].getPositionJson().y + node_height / 2;

				this.lines[0].setAttribute("x1", x1);
				this.lines[0].setAttribute("y1", y1);
				this.lines[0].setAttribute("x2", x2);
				this.lines[0].setAttribute("y2", y2);

				// if there are more than 2 nodes connected, update more lines
				if (this.nodes.length > 2) {
					// create an anchor point for additional lines
					var anchor_x = Math.min(x1, x2)
							+ ((Math.max(x1, x2) - Math.min(x1, x2)) / 2);
					var anchor_y = Math.min(y1, y2)
							+ ((Math.max(y1, y2) - Math.min(y1, y2)) / 2);
					var anchor = [ anchor_x, anchor_y ];

					// update additional nodes
					for ( var i = 2; i < this.nodes.length; i++) {
						x1 = anchor[0];
						y1 = anchor[1];
						x2 = this.nodes[i].getPositionJson().x + node_width / 2;
						y2 = this.nodes[i].getPositionJson().y + node_height
								/ 2;

						this.lines[i - 1].setAttribute("x1", x1);
						this.lines[i - 1].setAttribute("y1", y1);
						this.lines[i - 1].setAttribute("x2", x2);
						this.lines[i - 1].setAttribute("y2", y2);
					}
				}
			}

			/**
			 * This function returns the network object, this Link is applied to
			 * 
			 * @return network element, this Link is applied to
			 */
			Link.prototype.getNetwork = function() {
				return this.network;
			}

			return Link;
		})); // define
