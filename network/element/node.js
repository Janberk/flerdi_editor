/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
		[ "jquery", "drag", "listDialog", "contextMenu", "link", "statusbar",
				"resources", "features", "network_interfaces",
				"moveNodeCommand", "deleteNodeCommand" ],
		(function($, Drag, ListDialog, ContextMenu, Link, Statusbar,
				Resources, Features, Network_Interfaces, MoveNodeCommand,
				DeleteNodeCommand) {

			var NodeTypes = [ "/node/host/generic", "/node/host/pip",
					"/node/switch/cisco", "/node/switch/tunnelbridge",
					"/node/switch/pip" ];

			var Node = function(json, position, network) {
				console.log("S");
				this.json = json;
				this.position = position;
				this.element; // element representing the node

				this.network = network;

				this.links = []; // all links that connect this node
				this.resources = [];
				this.features = [];
				this.network_interfaces = [];

				this.setAttributes(json);
				this.setPositionValues(position);
				this.listDialogue;
			}

			Node.prototype.setAttributes = function(json) {
				this.json.attributes = json.attributes || {};
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
				this.json.resources = []
			}

			Node.prototype.setPositionValues = function(json) {
				this.position.id = json.id
						|| this.network.getIdHandler().getNextPositionId();
				this.position.x = json.x
						|| Math.floor(Math.random() * $('#drawarea').width());
				this.position.y = json.y
						|| Math.floor(Math.random() * $('#drawarea').height());
				this.position.network_element_id = json.network_element_id
						|| this.json.attributes.id;
				this.position.attributes_cache = json.attributes_cache || [];
			}

			Node.prototype.setContextMenu = function() {
				var _this = this;
				var menu = new ContextMenu();
				menu.addButton('Delete', function(e) {
					// create command for undo
					_this.network.getCommandManager().newCommand(
							new DeleteNodeCommand(_this.network, _this));
				});
				menu.addButton('Properties', function(e) {
					/*if (_this.listDialogue == undefined) {
						_this.listDialogue = new listDialogue(_this);
					} else {
						_this.listDialogue.show();
					}*/
					new ListDialog(_this);
				});
				return menu;
			}

			Node.prototype.setStatusbar = function() {
				var sb = new Statusbar(this);
				sb.addTextfield('ne_identifier', this.json.attributes.id);
				sb.addTextfield('alias', this.json.attributes.alias);
				sb.addDropdown('ne_type', this.json.attributes.ne_type,
						NodeTypes);
				return sb;
			}

			Node.prototype.set = function(attribute, value) {
				switch (attribute) {
				case 'ne_identifier': {
					this.json.attributes.id = value;
					break;
				}
				case 'identifier': {
					this.json.attributes.identifier = value;
					break;
				}
				case 'alias': {
					this.json.attributes.alias = value;
					break;
				}
				case 'ne_type': {
					this.json.attributes.ne_type = value;
					this.redrawSvgTag();
					break;
				}
				default:
					throw new Error("Attribute " + attribute + " not found.");
				}
			}

			Node.prototype.get = function(attribute) {
				switch (attribute) {
				case 'ne_identifier': {
					return this.json.attributes.id;
				}
				case 'identifier': {
					return this.json.attributes.identifier;
				}
				case 'alias': {
					return this.json.attributes.alias;
				}
				case 'ne_type': {
					return this.json.attributes.ne_type;
				}
				case 'v_net_identifier': {
					return this.network.elements['--- !yaml.org,2002'].attributes.v_net_identifier;
				}
				default:
					throw new Error("Attribute " + attribute + " not found.");
				}
			}

			Node.prototype.getPathToSvg = function() {
				var path = ' /assets/img/network_elements/';
				switch (this.json.attributes.ne_type) {
				case "/node/host/generic":
					return path + 'generic_host.svg';
				case "/node/host/pip":
					return path + 'pip_host.svg';
				case "/node/switch/cisco":
					return path + 'cisco_switch.svg';
				case "/node/switch/tunnelbridge":
					return path + 'tunnelbridge_switch.svg';
				case "/node/switch/pip":
					return path + 'pip_switch.svg';
				default:
					return path + 'generic_host.svg';
				}
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

			Node.prototype.getResource = function(i) {
				return this.resources[i];
			}

			Node.prototype.getFeature = function(i) {
				return this.features[i];
			}

			Node.prototype.getNetworkInterface = function(i) {
				return this.network_interfaces[i];
			}

			Node.prototype.getPositionJson = function() {
				return this.position;
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

			Node.prototype.createSvgTag = function() {

				var node = document.createElementNS(
						"http://www.w3.org/2000/svg", "image");
				node.setAttributeNS('http://www.w3.org/1999/xlink',
						'xlink:href', '');

				// TODO replace standard width and height values
				node.setAttribute("x", this.position.x);
				node.setAttribute("y", this.position.y);
				node.setAttribute("width", 50);
				node.setAttribute("height", 50);
				node.setAttribute("xlink:href", this.getPathToSvg());

				this.element = node;

				var _this = this;
				$(node).on('contextmenu', function(e) {
					_this.setContextMenu().show(e);
					return false;
				}).hover(function(e) {
					if (!$('#statusbar').hasClass('sb_edit'))
						_this.setStatusbar().show(true);
				}, function(e) {
					if (!$('#statusbar').hasClass('sb_edit'))
						_this.setStatusbar().show(false);
				}).on('click', function(e) {
					_this.setStatusbar().edit(true);
				});
				$('#drawarea').on('click', function(e) {
					if ($(e.target).closest('image').length == 0)
						_this.setStatusbar().edit(false);
				});

			}

			Node.prototype.move = function(pos) {
				this.position.x = pos.x;
				this.position.y = pos.y
				$(this.element).attr('x', pos.x);
				$(this.element).attr('y', pos.y);
				this.updateLinks();
				environment.getNetworkOrganisation().getNetwork()
						.calcSizeOfSvg();
			}

			Node.prototype.appendMoveEvent = function() {
				var _this = this;

				// this dummy shows the original position while moving
				var dummy;

				var drawAreaWidth = $('#svg').attr('width');
				var drawAreaHeight = $('#svg').attr('height');

				$(_this.element)
						.on(
								'dragstart',
								function(event) {

									drawAreaWidth = $('#svg').attr('width');
									drawAreaHeight = $('#svg').attr('height');

									dummy = document.createElementNS(
											"http://www.w3.org/2000/svg",
											"image");
									dummy.setAttributeNS(
											'http://www.w3.org/1999/xlink',
											'xlink:href', '');
									dummy.setAttribute('opacity', '0.5');

									// TODO replace standard width and height
									// values
									dummy.setAttribute("x", _this.position.x);
									dummy.setAttribute("y", _this.position.y);
									dummy.setAttribute("width", 50);
									dummy.setAttribute("height", 50);
									dummy.setAttribute("xlink:href", _this
											.getPathToSvg());

									// add dummy to document
									document.getElementById('nodes')
											.appendChild(dummy);
								})
						.on(
								'drag',
								function(event) {
									$(_this.element).attr(
											'x',
											event.offsetX
													- 32
													+ $('#drawarea')
															.scrollLeft());
									$(_this.element).attr(
											'y',
											event.offsetY
													- 32
													+ $('#drawarea')
															.scrollTop());
									if (event.offsetX - 32 + 50
											+ $('#drawarea').scrollLeft() > drawAreaWidth) {
										$('#svg').attr(
												'width',
												event.offsetX
														- 32
														+ 50
														+ $('#drawarea')
																.scrollLeft());

									}
									if (event.offsetY - 32 + 50
											+ $('#drawarea').scrollTop() > drawAreaHeight) {
										$('#svg').attr(
												'height',
												event.offsetY
														- 32
														+ 50
														+ $('#drawarea')
																.scrollTop());

									}


								})
						.on(
								'dragend',
								function(event) {
									/*
									 * _this.position.x = event.offsetX-32;
									 * _this.position.y = event.offsetY-32;
									 */

									// _this.move({x:event.offsetX-32,y:event.offsetY-32});
									_this.network
											.getCommandManager()
											.newCommand(
													new MoveNodeCommand(
															_this,
															{
																x : parseInt(_this.position.x),
																y : parseInt(_this.position.y)
															},
															{
																x : $(_this.element).attr('x') - 32,
																y : $(_this.element).attr('y') - 32,
															}));

									// remove dummy from document
									document.getElementById('nodes')
											.removeChild(dummy);
								});
			}

			Node.prototype.removeMoveEvent = function() {
				$(this.element).off('dragstart').off('drag').off('dragend');
			}

			Node.prototype.appendConnectEvent = function(linkState) {
				var _this = this;

				$(_this.element).on('dragstart', function(event) {
					// save this element in the new_link state
					linkState.setFirstElement(_this);
					// create a dummy line
					linkState.createDummyLine(_this, event);
				}).on('drag', function(event) {
					// update the dummy line
					linkState.updateDummyLine(_this, event);
				}).on('dragend', function(event) {
					// delete the dummy link
					linkState.deleteDummyLine();
					;
				}).on('mouseup', function(event) {
					// try to connect in the new_link state
					linkState.setSecondElement(_this);
				});
			}

			Node.prototype.removeConnectEvent = function() {
				$(this.element).off('dragstart').off('drag').off('dragend')
						.off('mouseup');
			}

			Node.prototype.removeSvgTag = function() {
				document.getElementById('nodes').removeChild(this.element);
			}

			Node.prototype.appendSvgTag = function() {
				document.getElementById('nodes').appendChild(this.element);
			}

			Node.prototype.redrawSvgTag = function() {
				this.element.setAttribute("xlink:href", this.getPathToSvg());
			}

			Node.prototype.removeNode = function() {
				this.removeSvgTag();
				this.network.removeNodeById(this.getId());
			}

			Node.prototype.getLinks = function() {
				return this.links;
			}

			Node.prototype.getId = function() {
				return this.json.attributes.id;
			}

			/*
			 * this function is called by links, to notify the node that its
			 * connected by this link
			 */
			Node.prototype.addLink = function(link) {
				this.links.push(link);
			}

			/* updates all connected links, called when a node is moved */
			Node.prototype.updateLinks = function() {
				for ( var i = 0; i < this.links.length; i++) {
					this.links[i].update();
				}
			}

			/**
			 * This function returns the network object, this node is applied to
			 * 
			 * @return network element, this node is applied to
			 */
			Node.prototype.getNetwork = function() {
				return this.network;
			}

			return Node;
		})); // define
