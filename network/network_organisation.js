/*
 * Module link: represents a single link in the network
 * Author: Flerdi Team
 * 
 * This class organizes the networks, and everything related to networks.
 */
define (["jquery",'network'], (function($,Network) {


	var Network_Organisation = function() {
		/*in order to manage more than one networks, this had to be a array*/
		this.networks;
	}
	
	Network_Organisation.prototype.newNetwork = function(network){
		/*for now, only one network can be handled*/
		if(this.networks === undefined){
			this.networks = network;
		}else{
			//this.networks.remove();
			this.networks = network;
		}
	}
	
	/*in the future you select a network by id*/
	Network_Organisation.prototype.getNetwork = function(){
		return this.networks;
	}
	
	return Network_Organisation;
}));