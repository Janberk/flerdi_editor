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

define (["jquery","networkOrganisation", "element_key", "parser", "toolbar", "menubar", "drawArea", "move", "newNode", "newLink","openDialogue"], 
		(function($, NetworkOrganisation, ElementKey, Parser, Toolbar, Menubar, DrawArea, Move, NewNode, NewLink, OpenDialogue) {


	/* constructor */
	var Environment = function() {
		console.log("creating environment");
		
		this.networks = new NetworkOrganisation();
		this.networks.newNetwork({});
			
		var _this = this;
			
		this.drawArea = new DrawArea();
		this.drawArea.setState(new Move(_this.networks.getNetwork()));
		
		//this.elementKey = new ElementKey(10, 10);
		this.toolbar = new Toolbar("assets/img/");
		this.toolbar.addButton("arrow",function() { _this.drawArea.setState(new Move(_this.networks.getNetwork())); });
		this.toolbar.addSeperator();
		this.toolbar.addButton("network_elements/generic_host",function(e) { _this.drawArea.setState(new NewNode(_this.networks.getNetwork(),'/node/host/generic')); });
		this.toolbar.addButton("network_elements/pip_host",function(e) { _this.drawArea.setState(new NewNode(_this.networks.getNetwork(),'/node/host/pip')); });
		this.toolbar.addButton("network_elements/cisco_switch",function(e) { _this.drawArea.setState(new NewNode(_this.networks.getNetwork(),'/node/switch/cisco')); });		
		this.toolbar.addButton("network_elements/tunnelbridge_switch",function(e) { _this.drawArea.setState(new NewNode(_this.networks.getNetwork(),'/node/switch/tunnelbridge')); });	
		this.toolbar.addButton("network_elements/pip_switch",function(e) { _this.drawArea.setState(new NewNode(_this.networks.getNetwork(),'/node/switch/pip')); });
		this.toolbar.addSeperator();
		this.toolbar.addButton("network_elements/generic_halfduplex",function(e) { _this.drawArea.setState(new NewLink(_this.networks.getNetwork(),'/link/generic', true)); });
		this.toolbar.addButton("network_elements/generic_fullduplex",function(e) { _this.drawArea.setState(new NewLink(_this.networks.getNetwork(),'/link/generic', false)); });
		this.toolbar.addButton("network_elements/transit_halfduplex",function(e) { _this.drawArea.setState(new NewLink(_this.networks.getNetwork(),'/link/transit', true)); });
		this.toolbar.addButton("network_elements/transit_fullduplex",function(e) { _this.drawArea.setState(new NewLink(_this.networks.getNetwork(),'/link/transit', false)); });
		// add additional Buttons here


		this.menubar = new Menubar();
		this.menubar.addMenu("File");
		this.menubar.addSubMenu("File", "New", (function() { _this.networks.newNetwork({}); }));
		this.menubar.addSubMenu("File", "Open...", (function() { 
			//document.getElementById('yaml_datei').click(); 
			var win = new OpenDialogue(_this);
			}));
		this.menubar.addSubSeperator("File");
		this.menubar.addSubMenu("File", "Download", (function() {  _this.downloadYaml({}); }));
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
				
				//set move tool as current state, adds drag listeners to all imported notes
				_this.drawArea.setState(new Move(_this.networks.getNetwork()));
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

	/** 
	* This functions creates a new Networkelement from ja given JSON
	*
	* @param json json that contains all informations to create a new Network
	* @param name name of the ne Network
	*/
	Environment.prototype.importJson = function(json, name) {
		console.log("importing network from json object");
		this.networks.newNetwork(json, name);
		var _this = this;
		this.drawArea.setState(new Move(_this.networks.getNetwork()));
	} //importJson
	
	/* saves the network as lastSave.yaml and offers a downloadlink on success */
	Environment.prototype.downloadYaml = function() {
		var yaml = this.networks.getNetwork().getYaml();
		var exportName = this.networks.getNetwork().getName();
		exportName = exportName.replace(/ /g,'_');
		exportName = exportName.replace(/.yaml/g,'');
		$.ajax({
			url: 'backend/saveNetwork.php',
			type: 'POST',
			data: {
				content: yaml
			}, 
			success: function(data) {
				document.location.href = "backend/downloadFile.php?exportName=" + exportName;
			}
		});
	} //downloadYaml	
	
	return Environment;
})); //define
