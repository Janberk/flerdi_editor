/*
 * Module link: represents a single link in the network
 * Author: Flerdi Team
 * 
 * This class organizes the networks, and everything related to networks.
 */
define([ "jquery", 'network' ], (function($, Network) {


	var Network_Organisation = function() {
		/*
		 * in order to manage more than one networks, this had to be a array
		 */
		this.networks = undefined;
	}

			/**
			 * This functions sets a new Network
			 * 
			 * @param network
			 *            network-object to set
			 * @param drawOnDrawArea
			 *            boolean, tru, alle controller and views will be
			 *            created , to show this network on the drawArea, if
			 *            false, then not
			 */
			Network_Organisation.prototype.newNetwork = function(network,
					drawOnDrawArea) {
				/* for now, only one network can be handled */
				if (this.networks === undefined) {
					this.networks = network;
				} else {
					this.networks.remove();
					this.networks = network;
					if (drawOnDrawArea) {
						for ( var i = 0; i < this.networks.networkElements.length; i++) {
							controllerFactory.build(
									this.networks.networkElements[i],
									"draw_area");
						}

						environment.drawArea
								.setState(environment.drawArea.state);
					}

				}
			}


	/* in the future you select a network by id */
	Network_Organisation.prototype.getNetwork = function() {
		return this.networks;
	}

	return Network_Organisation;
}));
