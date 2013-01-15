/*
 * Module environment: handles the program
 * Author: Flerdi Team
 *
 * ----------
 * insert on-change and new_node-click function: Johanna Wehrens
 */
 
/*
 * RequireJS module definition
 */ 

define (["jquery","networkOrganisation", "element_key", "parser", "toolbar", "menubar", "drawArea", "move", "newNode"], 
		(function($, NetworkOrganisation, ElementKey, Parser, Toolbar, Menubar, DrawArea, Move, NewNode) {


	/* constructor */
	var Environment = function() {
		console.log("creating environment");
		
		this.networks = new NetworkOrganisation();
		this.networks.newNetwork({});
			
		var _this = this;
			
		var drawArea = new DrawArea();
		//this.elementKey = new ElementKey(10, 10);
		this.toolbar = new Toolbar("assets/img/");
		this.toolbar.addButton("arrow",function() { drawArea.setState(new Move())});
		this.toolbar.addSeperator();
		this.toolbar.addButton("network_elements/generic_host",function(e) { drawArea.setState(new NewNode(_this.networks.getNetwork(),'/node/host/generic'))});
		this.toolbar.addButton("network_elements/pip_host",function(e) { drawArea.setState(new NewNode(_this.networks.getNetwork(),'/node/host/pip'))});
		this.toolbar.addButton("network_elements/cisco_switch",function(e) { drawArea.setState(new NewNode(_this.networks.getNetwork(),'/node/switch/cisco'))});		
		this.toolbar.addButton("network_elements/tunnelbridge_switch",function(e) { drawArea.setState(new NewNode(_this.networks.getNetwork(),'/node/switch/tunnelbridge') )});	
		this.toolbar.addButton("network_elements/pip_switch",function(e) { drawArea.setState(new NewNode(_this.networks.getNetwork(),'/node/switch/pip'))});
		// add additional Buttons here


		this.menubar = new Menubar();
		this.menubar.addMenu("File");
		this.menubar.addSubMenu("File", "New", (function() { _this.networks.newNetwork({}); }));
		this.menubar.addSubMenu("File", "Open...", (function() {document.getElementById('yaml_datei').click()}));
		this.menubar.addSubSeperator("File");
		this.menubar.addSubMenu("File", "Save", (function() {  _this.saveNetwork({}); }));
		this.menubar.addMenu("Edit");
		this.menubar.addSubMenu("Edit", "Undo", (function() { alert("Undo - Comming Soon") }));
		this.menubar.addMenu("View");
		this.menubar.addMenu("Help");

		this.creating = false;
		this.test = 0;	
		
		//loads selected yaml file and parses it
		this.jsonObj;
				
		$('#yaml_datei').on('change', function() {
			var environment = _this;
			var name = $('#yaml_datei').val();
			name = name.replace(/\..*/,'');
			console.log(name);
			Parser.load("test_files/"+$('#yaml_datei').val(),function(json){
				environment.importJson(json, name);
			});
		 });
		 
		 $('#save_button').on('click', function() {
			if (_this.network == undefined) {
				alert("Load a network first.");
			} else {
				_this.saveNetwork();
			}
		 });
		 
		//this.importJson(this.createTestJson());
	}

	/* creates a new networkObject from a given jsonObject */
	Environment.prototype.importJson = function(jsonObject, name) {
		console.log("importing network from json object");
		this.networks.newNetwork(jsonObject, name);
	} //importJson
	
	/* saves the network as a yaml file per php */
	Environment.prototype.saveNetwork = function() {
		$.ajax({
			url: 'backend/saveNetwork.php',
			type: 'POST',
			datatype: 'json',
			data: {
				fileName: "exported.yaml",
				content: this.networks.getNetwork().getJson()		
			}, 
			success: function(data) {
				console.log(data);
			}
		});
	} //saveNetwork	
	
	return Environment;
})); //define
