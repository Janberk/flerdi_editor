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
				
				this.events = [ {
					name : 'click',
					callback : function(event) {
						var pos = {
							x : event.pageX - 31 - 25 + $('#drawarea').scrollLeft(),
							y : event.pageY - 31 - 25 + $('#drawarea').scrollTop()
						}
						var json = {
							attributes : {
								'id' : 5,
								'ne_type' : _this.type
							}
						}
						environment.networks.getNetwork().commandManager
								.newCommand(new NewNodeCommand(environment
										.getNetworkOrganisation().getNetwork(),
										json, pos));
					}
				}];
			}

			return NewNode;
		});
