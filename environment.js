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

define([ "jquery", "networkOrganisation", "parser", "toolbar",
		"menubar", "drawArea", "move", "newNode", "newLink", "openDialogue",
		"alertDialogue", "statusbar", "network"],
		(function($, NetworkOrganisation, Parser, Toolbar, Menubar, DrawArea, Move, NewNode, NewLink,
		OpenDialogue, AlertDialogue, Statusbar, Network) {

	/* constructor */
	var Environment = function() {
		console.log("creating environment");

		this.networks = new NetworkOrganisation();
		this.networks.newNetwork(new Network());

		var _this = this;

		var hasChanged = _this.networks.getNetwork().commandManager.isHasChanged();

		/* user interface */
		this.drawArea = new DrawArea();
		this.drawArea.setState(new Move(_this.networks.getNetwork()));

		// this.elementKey = new ElementKey(10, 10);
		this.toolbar = new Toolbar("vendor/assets/img/");
		this.toolbar.addButton("arrow", function() {
			_this.drawArea.setState(new Move(_this.networks.getNetwork()));
		}, 'Selector');
		this.toolbar.addSeperator();
		this.toolbar.addButton("generic_host", function(e) {
			_this.drawArea.setState(new NewNode('/node/host/generic'));
		}, 'Generic Host');
		this.toolbar.addButton("pip_host", function(e) {
			_this.drawArea.setState(new NewNode('/node/host/pip'));
		}, 'PIP Host');
		this.toolbar.addButton("cisco_switch", function(e) {
			_this.drawArea.setState(new NewNode('/node/switch/cisco'));
		}, 'Cisco Switch');
		this.toolbar.addButton("tunnelbridge_switch",
				function(e) {
					_this.drawArea.setState(new NewNode(
							'/node/switch/tunnelbridge'));
				}, 'Tunnelbridge Switch');
		this.toolbar.addButton("pip_switch", function(e) {
			_this.drawArea.setState(new NewNode('/node/switch/pip'));
		}, 'PIP Switch');
		this.toolbar.addSeperator();
		this.toolbar.addButton("half_duplex", function(e) {
			_this.drawArea.setState(new NewLink(true));
		}, 'Half-Duplex Link');
		this.toolbar.addButton("full_duplex", function(e) {
			_this.drawArea.setState(new NewLink(false));
		}, 'Full-Duplex Link');
		// add additional Buttons here

		this.menubar = new Menubar();
		this.menubar.addMenu("File");

		this.menubar.addSubMenu("File", "New", (function() {
			/*var hasChanged = _this.networks.getNetwork().commandManager
					.isHasChanged();

			if (_this.networks != 'undefined' && hasChanged) {
				new AlertDialogue('Unsaved Changes will be lost, click ok to continue', function() {
					controllerFactory.build(undefined, 'graphlabelAttributesCreate');
				});
			} else {
				controllerFactory.build(undefined, 'graphlabelAttributesCreate');
			}*/
			console.log(_this.networks.getNetwork())
		}));

		this.menubar.addSubMenu("File", "Open...", (function() {
			var hasChanged = _this.networks.getNetwork().commandManager.isHasChanged();

			if (_this.networks != 'undefined' && hasChanged) {
				new AlertDialogue('Unsaved Changes will be lost, click ok to continue', function() {
					new OpenDialogue(_this);
				});
			} else {
				new OpenDialogue(_this);
			}
		}));

		/* alert dialogue - window/tab closed or refresh */
		$(window).on('beforeunload', function() {
			 var hasChanged =  _this.networks.getNetwork().commandManager.isHasChanged();
			if (_this.networks != 'undefined' && hasChanged) {
				return "Window will close, unsaved changes will be lost!";
			}
		});

		this.menubar.addSubSeperator("File");
		this.menubar.addSubMenu("File", "Download", (function() {
			_this.downloadYaml({});
		}));
		this.menubar.addMenu("Edit");
		this.menubar.addSubMenu("Edit", "Undo", (function() {
			_this.networks.networks.commandManager.undo();
		}));
		this.menubar.addSubMenu("Edit", "Redo", (function() {
			_this.networks.networks.commandManager.redo();
		}));
		this.menubar.addMenu("Graph");
		this.menubar.addSubMenu('Graph','Properties',(function(){
			controllerFactory.build(_this.networks.getNetwork(), 'graphlabelAttributesChange');
		}))
		this.menubar.addMenu("Help");

		$('#btn-Undo').addClass('disabled');
		$('#btn-Redo').addClass('disabled');

		this.statusbar = new Statusbar();

		/* keyboard shortcuts */
		var ctrl = false;

		$(document).keyup(function(e) {
			if (e.which == 17)
				ctrl = false;
		}).keydown(function(e) {
			if (e.which == 17)
				ctrl = true;
			// ctrl+z shortcut
			if (ctrl == true && e.which == 90) {
				$('#btn-Undo').trigger('click');
				return false;
			}
			// ctrl+y shortcut
			if (ctrl == true && e.which == 89) {
				$('#btn-Redo').trigger('click');
				return false;
			}
		});

		/* yaml parsing */
		this.creating = false;
		this.test = 0;

		// loads selected yaml file and parses it
		this.jsonObj;

		$('#yaml_datei').on('change', function() {
			var environment = _this;
			var name = $('#yaml_datei').val();
			name = name.replace(/\..*/, '');
			Parser.load("test_files/" + $('#yaml_datei').val(), function(json) {
				environment.importJson(json, name);

				// set move tool as current state, adds drag listeners to all
				// imported notes
				_this.drawArea.setState(new Move(_this.networks.getNetwork()));
			});
		});

		// $('#save_button').on('click', function() {
		// if (_this.network == undefined) {
		// alert("Load a network first.");
		// } else {
		// _this.saveNetwork();
		// }
		// });

		// this.importJson(this.createTestJson());
		
		this.networks.getNetwork().commandManager.greying();
		
	}

	/**
	 * This functions creates a new Networkelement from a given JSON
	 * 
	 * @param json
	 *            json that contains all informations to create a new Network
	 * @param name
	 *            name of the ne Network
	 */
	Environment.prototype.importJson = function(json, name) {
		this.networks.newNetwork(json, name);
		var _this = this;
		this.drawArea.setState(new Move(_this.networks.getNetwork()));
	} // importJson

	/**
	 * This function calls a download of the active Network
	 * 
	 */
	Environment.prototype.downloadYaml = function() {

		// temporary setHasChanged = false, to fix leave alert bug at download
		var _this = this;
		var hasChanged = _this.networks.networks.commandManager
				.isHasChanged();
		_this.networks.getNetwork().commandManager.setHasChanged(false);

		var yaml = this.networks.getNetwork().getYaml();
		var exportName = this.networks.getNetwork().getName();
		exportName = exportName.replace(/ /g, '_');
		exportName = exportName.replace(/.yaml/g, '');

		var temp = document.createElement("form");
		temp.action = "backend/download_YAML.php";
		temp.method = "POST";
		temp.style.display = "none";
		var t = document.createElement("textarea");
		t.name = "content";
		t.value = yaml;
		var i = document.createElement("input");
		i.type = "text";
		i.name = "name";
		i.value = exportName;
		temp.appendChild(t);
		temp.appendChild(i);
		document.body.appendChild(temp);
		temp.submit();
		document.body.removeChild(temp);
		temp.removeChild(i);
		temp.removeChild(t);
		t = "";
		i = "";
		temp = "";
		// setHasChanged back to origin
		_this.networks.getNetwork().getCommandManager()
				.isHasChanged(hasChanged);

	} // downloadYaml
	
	// TODO create bootstrap tooltips
/*
	$(function() {
		$(document).tooltip({
			items : "img",
			content : function() {
				var element = $(this);
				if (element.is("img")) {
					return element.attr("title");
				}
			}
		});
	});
*/
	/**
	 * This function returns the NetworkOrganisation object
	 * 
	 */
	Environment.prototype.getNetworkOrganisation = function() {
		return this.networks;
	}
	return Environment;
})); // define
