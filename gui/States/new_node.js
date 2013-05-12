/*
 * Author: Flerdi Team
 */

/* 
 *  This class handles the appearance of the menubar
 */
define(
		[ 'jquery', "networkOrganisation", "newNodeCommand" ],
		function($, Network, NewNodeCommand) {

			var NewNode = function(type) {
				this.name = "newNode";
				this.type = type;
				
				var _this = this;
				var network = environment.networks.getNetwork(); // TODO get network by ID
				
				this.events = [ {
					name : 'click',
					callback : function(event) {
						var pos = {
							x : event.pageX - 31 - 25 + $('#drawarea').scrollLeft(),
							y : event.pageY - 31 - 25 + $('#drawarea').scrollTop()
						}
						var json = {
							attributes : {
								'id' : network.idHandler.getNextElementId(),
								'ne_type' : _this.type
							}
						}
						
						// create command for undo						
						network.commandManager.newCommand(new NewNodeCommand(network, json, pos));
					}
				}];
			}

			return NewNode;
		});
