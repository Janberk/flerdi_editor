/*
 * Author: Flerdi Team
 *
 *  This class handles the appearance of the menubar.
 */
 
 /*
 * RequireJS module definition
 */ 
define (
		["jquery", "networkOrganisation", "networkInterfaceModel", "newLinkCommand"],
		function($, Network, NetworkInterfaceModel, NewLinkCommand) {
	
			var NewLink = function(symmetric) {
				this.name = "newLink";
				this.symmetric = symmetric;
				
				this.events = [];
				
				// save the first element that gets connected
				this.element;
				// save a dummy to visualize the process
				this.dummy;
				// save the link style
				this.style;
			}

			NewLink.prototype.onDragStart = function(event, element) {
				this.element = element;

				this.dummy = document.createElementNS("http://www.w3.org/2000/svg", "line");
				
				this.style = "stroke:rgb(0,0,0);"; // #000000
		
				if(this.symmetric) {
					this.style = this.style + "stroke-width:2"; // half-duplex-link
				}
				else {
					this.style = this.style + "stroke-width:4"; // full-duplex-link
				}
		
				// TODO replace standart values
				this.dummy.setAttribute("style", this.style);
				this.dummy.setAttribute("opacity", 0.5);
				this.dummy.setAttribute("x1", this.element.x+25);
				this.dummy.setAttribute("y1", this.element.y+25);
				this.dummy.setAttribute("x2", event.offsetX);
				this.dummy.setAttribute("y2", event.offsetY);
				
				// add dummy to document
				document.getElementById('links').appendChild(this.dummy);
			}
			
			NewLink.prototype.onDrag = function(event) {
				// TODO replace standart values
				this.dummy.setAttribute("x1", this.element.x+25);
				this.dummy.setAttribute("y1", this.element.y+25);
				this.dummy.setAttribute("x2", event.offsetX);
				this.dummy.setAttribute("y2", event.offsetY);
			}
			
			NewLink.prototype.onDragEnd = function(event) {
				// delete the dummy link
				document.getElementById('links').removeChild(this.dummy);
				
				// set the attributes back to normal
				this.dummy = undefined;
			}
			
			NewLink.prototype.onMouseUp = function(event, element) {
				// get the element models
				var elem1 = this.element.controller.model;
				var elem2 = element.controller.model;
				
				// elements can't get connected to nothing or themselves
				if(elem1 !== undefined && elem1 !== elem2)
				{
					// get the types of the elements
					var elemType1 = elem1.ne_type;
					var elemType2 = elem2.ne_type;
					
					// get the type of the network TODO get this by ID
					var network = environment.networks.getNetwork();
					var networkType = network.graph_type;
					
					// create a json for the new link
					var json = {
							attributes: {
								'id':  network.idHandler.getNextElementId(),
								'ne_type': '/link/generic'
							}
					};
					
					// in OL graphs, connections with '/node/host/pip' nodes must be '/link/transit' + '/link/generic' links
					if(networkType == 'OL' && (elemType1 == '/node/host/pip' || elemType2 == '/node/host/pip')) {
						json.attributes.ne_type = '/link/transit'; // TODO create '/link/transit' + '/link/generic' links here
					}
					// in UL graphs, connections between '/node/host/tunnelbridge' and '/node/host/pip' nodes must be '/link/transit' links
					else if(networkType == 'UL' && ((elemType1 == '/node/host/tunnelbridge' && elemType2 == '/node/host/pip') || (elemType1 == '/node/host/pip' && elemType2 == '/node/host/tunnelbridge'))) {
						json.attribute.ne_type = '/link/transit';
					}
					
					// create command for undo TODO get network by ID
					var network = environment.networks.getNetwork();
					network.commandManager.newCommand(new NewLinkCommand(network, json, elem1, elem2, this.symmetric));
				}
					
				// set the attributes back to normal
				this.element = undefined;
			}

			return NewLink;
		});	
