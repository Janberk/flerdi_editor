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
					callback : function(e) {
						var pos = {
							x : e.pageX - 31 - 25 + $('#drawarea').scrollLeft(),
							y : e.pageY - 31 - 25 + $('#drawarea').scrollTop()
						}
						var json = {
							attributes : {
								'id' : 5,
								'ne_type' : _this.type
							}
						}
						environment.getNetworkOrganisation().getNetwork().commandManager
								.newCommand(new NewNodeCommand(environment
										.getNetworkOrganisation().getNetwork(),
										json, pos));
					}
				} ];
			}
			/*
			 * NewNode.prototype.changeListeners = function() { // abort if this
			 * network is undefined if (this.network === undefined) return; //
			 * get all nodes from the network var nodes = this.network.nodes ||
			 * []; // set eventlistener for all nodes for ( var i = 0; i <
			 * nodes.length; i++) { var node = nodes[i];
			 * 
			 * node.removeMoveEvent(); node.removeConnectEvent(); } }
			 * 
			 * NewNode.prototype.onClick = function(e) { // TODO replace 25 and
			 * 25 by node-width/2 and node-height/2 var pos = { x : e.pageX - 31 -
			 * 25 + $('#drawarea').scrollLeft(), y : e.pageY - 31 - 25 +
			 * $('#drawarea').scrollTop() } var id =
			 * 0;//this.network.getIdHandler().getNextElementId() || 0;
			 * 
			 * var json = { attributes : { 'id' : id, 'ne_type' : this.type } }; //
			 * create command for undo this.network.commandManager.newCommand(
			 * new NewNodeCommand(this.network, json, pos)); }
			 */
			return NewNode;
		});
