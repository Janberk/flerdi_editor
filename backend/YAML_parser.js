/*
 * Author: Team Flerdi
 */
define([ "jquery", 'loadingWindow', 'network', 'networkElementModel',
		'resourceModel', 'featureModel', 'networkInterfaceModel' ], (function(
		$, LoadingWindow, NetworkModel, NetworkElementModel, ResourceModel,
		FeatureModel, NetworkInterfaceModel) {
	/**
	 * This function parse a yaml file, to a JSON.
	 * 
	 * @param path
	 *            path to the yaml file, need to be on the server
	 * @param callback :
	 *            function that should be executed after parsing, gets the json
	 *            as parameter
	 */
	Parser.load = function(path, callback) {
		$('#yaml_datei').prop('disabled', true);
		this.loadingScreen = new LoadingWindow('\'' + path
				+ '\' wird geladen...');
		var _this = this;
		$.post("/backend/YAML_parser.php", {
			source : path,
			type : 'file'
		}, function(json) {
			//console.log(json);
			_this.loadingScreen.close();
			$('#yaml_datei').prop('disabled', false);
			callback(json);
		}, 'json');
	}
	/**
	 * This function parses a String to a JSON.
	 * 
	 * @param _text
	 *            text that should be parsed
	 * @param name
	 *            name of the network
	 * @param callback
	 *            function that should be called after parsing the file, the
	 *            parsed JSON si the parameter of this function
	 */
	Parser.loadFromText = function(_text, name, callback) {
		var loadingWindow = new LoadingWindow('\'' + name
				+ '\' wird geladen...');
		var _this = this;
		$.post("/backend/YAML_parser.php", {
			source : _text,
			type : 'text'
		}, function(json) {
			//console.log(json);
			loadingWindow.close();
			_this.getNetworkFromJson(json);
			// callback(json);
		}, 'json');
	}

	/**
	 * This function create a Network-Object from a given JSON. Use the Json
	 * from loadFromtext oder load functions.
	 * 
	 * @param josn
	 *            json representing the network, comes out of the parser
	 * 
	 * @return a Network-Object
	 * 
	 */
	Parser.getNetworkFromJson = function(json) {
		var network = new NetworkModel();

		var interfaces = [];

		for ( var key in json['--- !yaml.org,2002'].attributes) {
			network[key] = json['--- !yaml.org,2002'].attributes[key];
		}

		for ( var i = 0; i < json.network_elements.length; i++) {
			network.addNetworkElement(this.getNode(json.network_elements[i],
					network));
		}

		//console.log(network);
	}

	/**
	 * This function create a Network_element out of a given, json and a
	 * network-object
	 * 
	 * @param json
	 *            json representing this network_element
	 * @param network
	 *            network-object this network_element belongs to
	 * 
	 * @return network_element_model
	 * 
	 */
	Parser.getNode = function(json, network) {
		var ne = new NetworkElementModel(network);

		for ( var key in json.attributes) {
			if (key != "graph_label_id") {
				ne[key] = json.attributes[key];
			}
		}

		for ( var i = 0; i < json.resources.length; i++) {
			ne.addResource(this.getResource(json.resources[i], ne));
		}

		for ( var i = 0; i < json.features.length; i++) {
			ne.addFeature(this.getFeature(json.features[i], ne));
		}

		for ( var i = 0; i < json.network_interfaces.length; i++) {
			ne.addNetworkInterface(this.getNetworkInterface(
					json.network_interfaces[i], ne));
		}

		return ne;
	}

	/**
	 * This function create a resource-object out of a given, json and a
	 * network-element-object
	 * 
	 * @param json
	 *            json representing this resource
	 * @param parent
	 *            parent-object this resource belongs to
	 * 
	 * @return resource_model
	 * 
	 */
	Parser.getResource = function(json, parent) {
		var re = new ResourceModel();
		for ( var key in json.attributes) {
			if (key == "the_parent_record_id") {
				re[key] = parent;
			} else {
				re[key] = json.attributes[key];
			}
		}

		return re;
	}

	/**
	 * This function create a feature-object out of a given, json and a
	 * network-element-object
	 * 
	 * @param json
	 *            json representing this feature
	 * @param parent
	 *            parent-object this feature belongs to
	 * 
	 * @return feature_model
	 * 
	 */
	Parser.getFeature = function(json, parent) {
		var fe = new FeatureModel();
		for ( var key in json.attributes) {
			if (key == "network_element_id") {
				fe[key] = parent;
			} else {
				fe[key] = json.attributes[key];
			}
		}

		return fe;
	}

	/**
	 * This function create a network-interface-object out of a given, json and
	 * a network-element-object
	 * 
	 * @param json
	 *            json representing this feature
	 * @param parent
	 *            parent-object this network-interface belongs to
	 * 
	 * @return network-interface
	 * 
	 */
	Parser.getNetworkInterface = function(json, parent) {
		var inf = new NetworkInterfaceModel();

		for ( var key in inf) {
			if (key == "network_element_id") {
				inf[key] = parent;
			} else {
				inf[key] = json.attributes[key];
			}
		}

		console.log(inf);
		
		for ( var i = 0; i < json.resources.length; i++) {
			inf.addResource(this.getResource(json.resources[i], inf));
		}

		for ( var i = 0; i < json.features.length; i++) {
			inf.addFeature(this.getFeature(json.features[i], inf));
		}

		return inf;
	}

	return Parser;
}));