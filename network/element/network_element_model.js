/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
		[ "resources", "features", "network_interfaces" ],
		(function(Resources, Features, Network_Interfaces) {

			var Node = function(id, x, y, graph_label, resources, features, network_interfaces, 
					ne_type, provisioning_interface, console_interface, alias, identifier, 
					customer_console_interface) {
				this.id = id || "";
				this.x = x || "";
				this.y = y || "";
				this.ne_type = ne_type || "";
				this.console_interface = console_interface || "";
				this.alias = alias || "";
				this.identifier = identifier || "";

				this.graph_label = graph_label || {};
				this.resources = resources || {};
				this.features = features || {};
				this.network_interfaces = network_interfaces || {};
				this.provisioning_interface = provisioning_interface || {};
				this.customer_console_interface = customer_console_interface || {};
			}

			Node.prototype.getJson = function() {
				this.json.resources = this.getResources();
				this.json.features = this.getFeatures();
				this.json.network_interfaces = this.getNetworkInterfaces();
				return this.json;
			}
			/**
			 * This function returns an array of all resources this node has
			 * 
			 * @return Array of all resources
			 */
			Node.prototype.getResources = function() {
				var res = []
				for ( var i = 0; i < this.resources.length; i++) {
					res.push(this.resources[i].getJson());
				}
				return res;
			}
			/**
			 * This function returns an array of all features this node has
			 * 
			 * @return Array of all features
			 */
			Node.prototype.getFeatures = function() {
				var fet = []
				for ( var i = 0; i < this.features.length; i++) {
					fet.push(this.features[i].getJson());
				}
				return fet;
			}
			/**
			 * This function returns an array of all interfaces this node has
			 * 
			 * @return Array of all features
			 */
			Node.prototype.getNetworkInterfaces = function() {
				var nis = [];
				for ( var i = 0; i < this.network_interfaces.length; i++) {
					nis.push(this.network_interfaces[i].getJson());
				}
				return nis;
			}

			/**
			 * This function adds a new NetworkInterface to this Node
			 * 
			 * @param json
			 *            JSON-representation of this NetworkInterface
			 */
			Node.prototype.addNetworkInterfaceByJSON = function(json) {
				var network_interface = new Network_Interfaces(this, json)
				this.network_interfaces.push(network_interface);

				return network_interface;
			}

			/**
			 * This function adds a new Feature to this Node
			 * 
			 * @param json
			 *            JSON-representation of this Feature
			 */
			Node.prototype.addFeatureByJSON = function(json) {
				var feature = new Features(this, json);
				this.features.push(feature);

				return feature;
			}

			/**
			 * This function adds a new Resource to this Node
			 * 
			 * @param json
			 *            JSON-representation of this Resource
			 */
			Node.prototype.addResourceByJSON = function(json) {
				var resource = new Resources(this, json);
				this.resources.push(resource);

				return resource;
			}

			/**
			 * This function removes a NetworkInterface from this Node
			 * 
			 * @param id
			 *            the id of the NetworkInterface
			 */
			Node.prototype.removeNetworkInterfaceById = function(id) {
				for ( var i = 0; i < this.network_interfaces.length; i++) {
					if (this.network_interfaces[i].get('id') == id) {
						this.network_interfaces.splice(i, 1);
						break;
					}
				}
			}

			/**
			 * This function removes a Feature from this Node
			 * 
			 * @param id
			 *            the id of the Feature
			 */
			Node.prototype.removeFeatureById = function(id) {
				for ( var i = 0; i < this.features.length; i++) {
					if (this.features[i].get('id') == id) {
						this.features.splice(i, 1);
						break;
					}
				}
			}

			/**
			 * This function removes a Resource from this Node
			 * 
			 * @param id
			 *            the id of the Resource
			 */
			Node.prototype.removeResourceById = function(id) {
				for ( var i = 0; i < this.resources.length; i++) {
					if (this.resources[i].get('id') == id) {
						this.resources.splice(i, 1);
						break;
					}
				}
			}
			
			return Node;
		})); // define
