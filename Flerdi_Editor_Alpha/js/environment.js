/*
 * Module environment: handles the program
 * Author: Flerdi Team, Kai Müller
 *
 * ----------
 * insert on-change function: Johanna Wehrens
 */
 
/*
 * RequireJS module definition
 */ 
define (["jquery", "drag", "network", "element_key", "parser"], (function($, Drag, Network, ElementKey, Parser) {

	/* constructor */
	var Environment = function(bodyId) {
		console.log("creating environment");
		
		this.network = undefined;
		this.body = bodyId;
		this.elementKey = new ElementKey(10, 10);

		this.jsonObj;
		
		var _this = this;
		
				
		 $('#yaml_datei').on('change', function(){ 
		 	var name = $('#yaml_datei').val();
			name = name.replace(/\..*/,'');
			_this.jsonObj = Parser.load("test_files/"+$('#yaml_datei').val());
			_this.importJson(_this.jsonObj, name);
		 });
		 
		 $('#save_button').on('click', function() {
			if (_this.network == undefined) {
				alert("Load a network first.");
			} else {
				_this.saveNetwork();
			}
		 });		 

		//this.importJson(this.createTestJson());
	} //constructor

	/* creates a new networkObject from a given jsonObject */
	Environment.prototype.importJson = function(jsonObject, name) {
		console.log("importing network from json object");
		
		this.network = new Network(jsonObject, name);
	} //importJson
	
	/* saves the network as a yaml file per php */
	Environment.prototype.saveNetwork = function() {
		$.ajax({
			url: 'http://localhost/flerdi/saveNetwork.php',
			type: 'POST',
			datatype: 'json',
			data: {
				fileName: this.network.getName() + ".yaml",
				content: this.network.getYaml()				
			}
		});
	} //saveNetwork	
	
	/* creates and returns a test jsonObject */
	Environment.prototype.createTestJson = function() {
		var jsonTest = { 
			attributes: { 
				graph_type: 'OL',
				id: '1',
				role_identifier: 'PIP91',
				v_net_identifier: 'noconnect-1',
				graph_tag: null,
				graph_nr: '0' 
			},
			attributes_cache: {},
			network_elements: [ 
				{ 
					attributes: { 
						graph_label_id: '1',
						ne_type: '/node/host/generic',
						id: '1',
						provisioning_interface_id: null,
						console_interface_id: null,
						alias: 'alias1-c1',
						identifier: 'c1',
						customer_console_interface_id: null 
					},
					attributes_cache: {},
					constraint_groups_network_elements: [],
					features: [ 
						{ 
							attributes: { 
								priority: '1',
								id: '1',
								value: 'xen-3.4',
								avp_attribute: '/node/host/generic/Virtualization/mechanism',
								network_interface_id: null,
								network_element_id: '1',
								is_request: '1' 
							},
							attributes_cache: {} 
						},
						{ 
							attributes: { 
								priority: '1',
								id: '2',
								value: 'text',
								avp_attribute: '/node/host/generic/Console/type',
								network_interface_id: null,
								network_element_id: '1',
								is_request: '1' 
							},
							attributes_cache: {} 
						} 
					],
					hosted_network_elements_mappings: [],
					mgmt_flags: [],
					network_interfaces: [],
					resources: [
						{ 
							attributes: { 
								timestamp: null,
								time_unit: null,
								value_type: 'constant',
								the_parent_record_id: '1',
								resource_unit: null,
								confidence: null,
								composing_operation: null,
								id: '1',
								value: '768',
								avp_attribute: '/node/host/generic/RAM/real/amount',
								is_request: '1',
								alias: null,
								identifier: null,
								interval: null 
							},
							attributes_cache: {} 
						},
						{ 
							attributes: {
								timestamp: null,
								time_unit: null,
								value_type: 'constant',
								the_parent_record_id: '1',
								resource_unit: null,
								confidence: null,
								composing_operation: null,
								id: '2',
								value: '512',
								avp_attribute: '/node/host/generic/HDD/hd_0/space',
								is_request: '1',
								alias: null,
								identifier: null,
								interval: null 
							},
							attributes_cache: {} 
						} 
					] 
				} 
			],
			positions: [
				{ 
					attributes: { 
						id: '1', x: 512, network_element_id: '1' 
					},
					attributes_cache: {} 
				},
				{ 
					attributes: { 
						id: '2', x: 512, network_element_id: '2' 
					},
					attributes_cache: {} 
				} 
			] 
		};
		
		var jsonObject = eval(jsonTest);
		return jsonObject;	   
	} //createTestJson
	return Environment;
})); //define