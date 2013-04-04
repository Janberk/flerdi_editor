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

define([ "jquery", "networkOrganisation", "element_key", "parser", "toolbar",
		"menubar", "drawArea", "move", "newNode", "newLink", "openDialogue",
		"alertDialogue" ], (function($, NetworkOrganisation, ElementKey,
		Parser, Toolbar, Menubar, DrawArea, Move, NewNode, NewLink,
		OpenDialogue, AlertDialogue) {

	/* constructor */
	var Environment = function() {
		console.log("creating environment");

		this.networks = new NetworkOrganisation();
		this.networks.newNetwork({});

		var _this = this;

		var hasChanged = _this.networks.getNetwork().getHasChanged();
		console.log("Value of hasChanged: " + hasChanged);

		this.drawArea = new DrawArea();
		this.drawArea.setState(new Move(_this.networks.getNetwork()));

		// this.elementKey = new ElementKey(10, 10);
		this.toolbar = new Toolbar("assets/img/");
		this.toolbar.addButton("arrow", function() {
			_this.drawArea.setState(new Move(_this.networks.getNetwork()));
		}, 'Selector');
		this.toolbar.addSeperator();
		this.toolbar.addButton("network_elements/generic_host", function(e) {
			_this.drawArea.setState(new NewNode(_this.networks.getNetwork(),
					'/node/host/generic'));
		}, 'Generic Host');
		this.toolbar.addButton("network_elements/pip_host", function(e) {
			_this.drawArea.setState(new NewNode(_this.networks.getNetwork(),
					'/node/host/pip'));
		}, 'PIP Host');
		this.toolbar.addButton("network_elements/cisco_switch", function(e) {
			_this.drawArea.setState(new NewNode(_this.networks.getNetwork(),
					'/node/switch/cisco'));
		}, 'Cisco Switch');
		this.toolbar.addButton("network_elements/tunnelbridge_switch",
				function(e) {
					_this.drawArea.setState(new NewNode(_this.networks
							.getNetwork(), '/node/switch/tunnelbridge'));
				}, 'Tunnelbridge Switch');
		this.toolbar.addButton("network_elements/pip_switch", function(e) {
			_this.drawArea.setState(new NewNode(_this.networks.getNetwork(),
					'/node/switch/pip'));
		}, 'PIP Switch');
		this.toolbar.addSeperator();
		this.toolbar.addButton("network_elements/half_duplex", function(e) {
			_this.drawArea.setState(new NewLink(_this.networks.getNetwork(),
					true));
		}, 'Half-Duplex Link');
		this.toolbar.addButton("network_elements/full_duplex", function(e) {
			_this.drawArea.setState(new NewLink(_this.networks.getNetwork(),
					false));
		}, 'Full-Duplex Link');
		// add additional Buttons here

		this.menubar = new Menubar();
		this.menubar.addMenu("File");

		this.menubar.addSubMenu("File", "New", (function() {
			var hasChanged = _this.networks.getNetwork().getHasChanged();
			console.log("Value of hasChanged (addSubMenu New): " + hasChanged);

			if (_this.networks != 'undefined' && hasChanged) {
				var win = new AlertDialogue(_this);

				$('#ok').on('click', function() {
					_this.networks.newNetwork({});
					$(this).parent().parent().remove();
				});
				$('#cancel').on('click', function() {
					$(this).parent().parent().remove();
				});
			} else {
				_this.networks.newNetwork({});
			}
		}));

		// $(window).unload( function () {
		// var win = new AlertDialogue(_this);
		// });

		this.menubar.addSubMenu("File", "Open...",
				(function() {
					var hasChanged = _this.networks.getNetwork()
							.getHasChanged();
					console.log("Value of hasChanged (addSubMenu Open): "
							+ hasChanged);

					if (_this.networks != 'undefined' && hasChanged) {
						var win = new AlertDialogue(_this);

						$('#ok').on('click', function() {
							var win = new OpenDialogue(_this);
							$(this).parent().parent().remove();
							_this.networks.getNetwork().setHasChanged(false);
							console.log("wert in open after: " + hasChanged);
						});
						$('#cancel').on('click', function() {
							$(this).parent().parent().remove();
						});
					} else {
						var win = new OpenDialogue(_this);
					}
				}));

		this.menubar.addSubSeperator("File");
		this.menubar.addSubMenu("File", "Download", (function() {
			_this.downloadYaml({});
		}));
		this.menubar.addMenu("Edit");
		this.menubar.addSubMenu("Edit", "Undo", (function() {
			_this.networks.getNetwork().getCommandManager().undo();
		}));
		this.menubar.addMenu("View");
		this.menubar.addMenu("Help");

		this.creating = false;
		this.test = 0;

		// loads selected yaml file and parses it
		this.jsonObj;

		$('#yaml_datei').on('change', function() {
			var environment = _this;
			var name = $('#yaml_datei').val();
			name = name.replace(/\..*/, '');
			console.log(name);
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
	}

	/**
	 * This functions creates a new Networkelement from ja given JSON
	 * 
	 * @param json
	 *            json that contains all informations to create a new Network
	 * @param name
	 *            name of the ne Network
	 */
	Environment.prototype.importJson = function(json, name) {
		console.log("importing network from json object");
		this.networks.newNetwork(json, name);
		var _this = this;
		this.drawArea.setState(new Move(_this.networks.getNetwork()));
	} // importJson

	/* saves the network as lastSave.yaml and offers a downloadlink on success */
	Environment.prototype.downloadYaml = function() {
		var yaml = this.networks.getNetwork().getYaml();
		var exportName = this.networks.getNetwork().getName();
		exportName = exportName.replace(/ /g, '_');
		exportName = exportName.replace(/.yaml/g, '');

		$.ajax({
			url : 'backend/saveNetwork.php',
			type : 'POST',
			data : {
				content : yaml
			},
			success : function(data) {
				document.location.href = "backend/downloadFile.php?exportName="
						+ exportName;
			}
		});

		// set hasChanged false
		var _this = this;
		_this.networks.getNetwork().setHasChanged(false);
		var hasChanged = _this.networks.getNetwork().getHasChanged();
		console.log("wert in download: " + hasChanged);
	} // downloadYaml

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

	return Environment;
})); // define
