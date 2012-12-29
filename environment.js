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

define (["jquery","network", "element_key", "parser", "node_visualisation", "toolbar", "menubar"], 
		(function($, Network, ElementKey, Parser, Node_Visualisation, Toolbar, Menubar) {


	/* constructor */
	var Environment = function(bodyId) {
		console.log("creating environment");
		
		this.network = undefined;
		this.body = bodyId;
		//this.elementKey = new ElementKey(10, 10);
		this.toolbar = new Toolbar("assets/img/");
		this.toolbar.addButton("arrow",(function() { _this.moveClicked()}));
		this.toolbar.addSeperator();
		this.toolbar.addButton("network_elements/generic_host",(function(e) { _this.newNodeClicked('/node/host/generic') }));
		this.toolbar.addButton("network_elements/pip_host",(function(e) { _this.newNodeClicked('/node/host/pip') }));
		this.toolbar.addButton("network_elements/cisco_switch",(function(e) { _this.newNodeClicked('/node/switch/cisco') }));		
		this.toolbar.addButton("network_elements/tunnelbridge_switch",(function(e) { _this.newNodeClicked('/node/switch/tunnelbridge') }));	
		this.toolbar.addButton("network_elements/pip_switch",(function(e) { _this.newNodeClicked('/node/switch/pip') }));
		// add additional Buttons here


		this.menubar = new Menubar();
		this.menubar.addMenu("File");
		this.menubar.addSubMenu("File", "New", (function() { alert("New File - Comming Soon") }));
		this.menubar.addSubMenu("File", "Open...", (function() { _this.loadSomething("noconnect-4-nodes.yaml") }));
		this.menubar.addSubSeperator("File");
		this.menubar.addSubMenu("File", "Save", (function() { alert("Save File - Comming Soon") }));
		this.menubar.addMenu("Edit");
		this.menubar.addSubMenu("Edit", "Undo", (function() { alert("Undo - Comming Soon") }));
		this.menubar.addMenu("View");
		this.menubar.addMenu("Help");

		var _this = this;
		
		this.creating = false;
		this.test = 0;	
		
		//loads selected yaml file and parses it
		this.jsonObj;
				
		$('#yaml_datei').on('change', function() {
			var environment = _this;
			var name = $('#yaml_datei').val();
			console.log(name);
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
	} //constructor
	
	Environment.prototype.loadSomething = function(oname){ 
		var _this = this;
		var name = oname;
		name = name.replace(/\..*/,'');
		Parser.load("/test_files/"+oname,function(json){
			_this.importJson(json, name);	
		});			
	};
	
	Environment.prototype.newNodeClicked = function(type) {
		var _this = this;		
		$('#drawarea').off("click");
		$('#drawarea').on("click", function(e){_this.drawNode({x:e.pageX-31,y:e.pageY-31}, type)});
	}
	
	Environment.prototype.moveClicked = function() {
		$('#drawarea').off("click");
	}
	
	Environment.prototype.drawNode = function(position, type) {
		var pos = [0,0];		
		pos[0] = position.x;
		pos[1] = position.y;
		var node = new Node_Visualisation(pos, type);
		node.addDrag();
		node.show();
	}

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
	
	return Environment;
})); //define
