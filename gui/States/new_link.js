/*
 * Author: Flerdi Team
 *
 *  This class handles the appearance of the menubar.
 */
 
 /*
 * RequireJS module definition
 */ 
define (
		["jquery", "networkOrganisation", "jsonBuilder", "newLinkCommand"],
		function($, Network, JsonBuilder, NewLinkCommand) {
	
			var NewLink = function(symmetric) {
				this.name = "newLink";
				this.symmetric = symmetric;
				
				this.events = [];
				
				//save the first element that gets connected
				this.element;
				//save a dummy to visualize the process
				this.dummy;
				//save the link style
				this.style;
			}

			NewLink.prototype.onDragStart = function(event, element) {
				this.element = element;

				this.dummy = document.createElementNS("http://www.w3.org/2000/svg", "line");
				
				this.style = "stroke:rgb(0,0,0);"; //#000000
		
				if(this.symmetric) {
					this.style = this.style + "stroke-width:2"; //half-duplex-link
				}
				else {
					this.style = this.style + "stroke-width:4"; //full-duplex-link
				}
		
				//TODO replace standart values
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
				var firstElement = this.element.controller.model;
				var secondElement = element.controller.model;
				
				// elements can't get connected to nothing or themselves
				if(firstElement !== undefined && firstElement !== secondElement)
				{
					var jsonBuilder = new JsonBuilder();
					var json = jsonBuilder.buildLinkJson(firstElement, secondElement, this.symmetric);
					
					//create command for undo TODO get network by ID
					var network = environment.networks.getNetwork();
					network.commandManager.newCommand(new NewLinkCommand(network, json));
				}
					
				// set the attributes back to normal
				this.element = undefined;
			}

			return NewLink;
		});	
