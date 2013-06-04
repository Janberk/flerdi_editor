/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
		["observable" ],
		(function(Observable) {

			var NetworkElementModel = function(graph_label, id, x, y,
					resources, features, network_interfaces, ne_type,
					provisioning_interface, console_interface, alias,
					identifier, customer_console_interface) {
				//call observable to get an own observer variable
				Observable.call(this);
				this.id = id || "";
				this.x = x || "";
				this.y = y || "";
				this.ne_type = ne_type || "";
				this.console_interface = console_interface || "";
				this.alias = alias || "";
				this.identifier = identifier || "";

				this.graph_label = graph_label || {}; // TODO das is jetzt die
				// Netzwerkklasse, sollte aber
				// eventuell gendert werden, das
				// wir ein Model f�r GraphLaleb
				// haben und Network der
				// Beh�lter f�r alles ist.
				this.resources = resources || [];
				this.features = features || [];
				this.network_interfaces = network_interfaces || [];
				this.provisioning_interface = provisioning_interface || {};
				this.customer_console_interface = customer_console_interface || {};
				
				
				
				this.graph_label.addObserver(this);
			}
			
			// start extends
			NetworkElementModel.prototype = new Observable();
			// end extends

			NetworkElementModel.prototype.getJson = function() {
				this.json.resources = this.getResources();
				this.json.features = this.getFeatures();
				this.json.network_interfaces = this.getNetworkInterfaces();
				return this.json;
			}
			/**
			 * This function returns an array of all resources this
			 * NetworkElementModel has
			 * 
			 * @return Array of all resources
			 */
			NetworkElementModel.prototype.getResources = function() {
				var res = []
				for ( var i = 0; i < this.resources.length; i++) {
					res.push(this.resources[i].getJson());
				}
				return res;
			}
			/**
			 * This function returns an array of all features this
			 * NetworkElementModel has
			 * 
			 * @return Array of all features
			 */
			NetworkElementModel.prototype.getFeatures = function() {
				var fet = []
				for ( var i = 0; i < this.features.length; i++) {
					fet.push(this.features[i].getJson());
				}
				return fet;
			}
			/**
			 * This function returns an array of all interfaces this
			 * NetworkElementModel has
			 * 
			 * @return Array of all features
			 */
			NetworkElementModel.prototype.getNetworkInterfaces = function() {
				var nis = [];
				for ( var i = 0; i < this.network_interfaces.length; i++) {
					nis.push(this.network_interfaces[i].getJson());
				}
				return nis;
			}

			/**
			 * This function removes a NetworkInterface from this
			 * NetworkElementModel
			 * 
			 * @param id
			 *            the id of the NetworkInterface
			 */
			NetworkElementModel.prototype.removeNetworkInterfaceById = function(id) {
				for ( var i = 0; i < this.network_interfaces.length; i++) {
					if (this.network_interfaces[i].id == id) {
						this.network_interfaces.splice(i, 1);
						break;
					}
				}
			}

			/**
			 * This function removes a Feature from this NetworkElementModel
			 * 
			 * @param id
			 *            the id of the Feature
			 */
			NetworkElementModel.prototype.removeFeatureById = function(id) {
				for ( var i = 0; i < this.features.length; i++) {
					if (this.features[i].id == id) {
						this.features.splice(i, 1);
						break;
					}
				}
			}

			/**
			 * This function removes a Resource from this NetworkElementModel
			 * 
			 * @param id
			 *            the id of the Resource
			 */
			NetworkElementModel.prototype.removeResourceById = function(id) {
				for ( var i = 0; i < this.resources.length; i++) {
					if (this.resources[i].id == id) {
						this.resources.splice(i, 1);
						break;
					}
				}
			}
			
			NetworkElementModel.prototype.update = function(command, data){
				switch(command){
				case "remove":
					this.graph_label.removeNetworkElement(this);
					this.notifyAll("remove",{});
					break;
				}
			}
			
			/**
			 * This functions adds a resource to this network_element
			 * 
			 * @param resource resource_model you want to add
			 * 
			 */
			NetworkElementModel.prototype.addResource = function(resource){
				this.resources.push(resource);
			}
			
			/**
			 * This functions adds a feature to this network_element
			 * 
			 * @param feature feature_model you want to add
			 * 
			 */
			NetworkElementModel.prototype.addFeature = function(feature){
				this.features.push(feature);
			}
			
			/**
			 * This functions adds a network_interface to this network_element
			 * 
			 * @param interface network_interface you want to add
			 * 
			 */
			NetworkElementModel.prototype.addNetworkInterface = function(network_interface){
				this.network_interfaces.push(network_interface);
			}

			return NetworkElementModel;
		})); // define
