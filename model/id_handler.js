/*
 * Module network: represents a network, handles the nodes and links
 * Author: Flerdi Team
 */

/*
 * This class handles all NetworkElement Id's, NetworkInterface Id's, resource Id's and Feature Id's for one Network. 
 */
define([ "jquery" ], (function($) {

	/**
	 * @param network
	 *            NetworkObject this Id-Handler belongs to
	 */
	var IdHandler = function(network) {
		this.network = network;

		this.id = {
			networkElement : 0,
			networkInterface : 0,
			resource : 0,
			feature : 0,
			position : 0,
			host_identifier: 0,
			switch_identifier: 0
		};
	};

	/**
	 * This function analysis a Network and search the biggest ID's
	 * 
	 */
	IdHandler.prototype.analyseNetwork = function() {
		var json = this.network.getJson();

		// searching for the biggest NetworkElement, NetworkInterface, Resource
		// and Feature id.
		for ( var i = 0; i < json.network_elements.length; i++) {
			var element = json.network_elements[i];

			var eleId = parseInt(element.attributes.id);
			if (eleId > this.id.networkElement) {
				this.id.networkElement = eleId;
			}
			
			var eleFier = element.attributes.identifier;
			if (element.attributes.ne_type.indexOf("/node/host/") != -1) {
				if(typeof eleFier === "number" && eleFier > this.id.host_identifier) this.id.host_identifier = eleFier;
			} else if (element.attributes.ne_type.indexOf("/node/switch/") != -1) {
				if(typeof eleFier === "number" && eleFier > this.id.switch_identifier) this.id.switch_identifier = eleFier;
			}

			for ( var j = 0; j < element.network_interfaces.length; j++) {
				var netInterface = element.network_interfaces[j];

				var infId = parseInt(netInterface.attributes.id);
				if (infId > this.id.networkInterface) {
					this.id.networkInterface = infId
				}
				
				var infFier = netInterface.attributes.identifier;
				if (netInterface.attributes.ne_type.indexOf("/node/host/") != -1) {
					if(typeof infFier === "number" && infFier > this.id.host_identifier) this.id.host_identifier = infFier;
				} else if (netInterface.attributes.ne_type.indexOf("/node/switch/") != -1) {
					if(typeof infFier === "number" && infFier > this.id.switch_identifier) this.id.switch_identifier = infFier;
				}						
				

				for ( var k = 0; k < netInterface.resources.length; k++) {
					var infResId = parseInt(netInterface.resources[k].attributes.id);
					if (infResId > this.id.resource) {
						this.id.resource = infResId;
					}
					
					var infResFier = netInterface.resources[k].attributes.identifier;
					if (netInterface.resources[k].attributes.ne_type.indexOf("/node/host/") != -1) {
						if(typeof infResFier === "number" && infResFier > this.id.host_identifier) this.id.host_identifier = infResFier;
					} else if (netInterface.resources[k].attributes.ne_type.indexOf("/node/switch/") != -1) {
						if(typeof infResFier === "number" && infResFier > this.id.switch_identifier) this.id.switch_identifier = infResFier;
					}	
				}

				for ( var k = 0; k < netInterface.features.length; k++) {
					var infFeatId = parseInt(netInterface.features[k].attributes.id);
					if (infFeatId > this.id.feature) {
						this.id.feature = infFeatId;
					}
					
					var infFeatFier = netInterface.features[k].attributes.identifier;
					if (netInterface.features[k].attributes.ne_type.indexOf("/node/host/") != -1) {
						if(typeof infFeatFier === "number" && infFeatFier > this.id.host_identifier) this.id.host_identifier = infFeatFier;
					} else if (netInterface.features[k].attributes.ne_type.indexOf("/node/switch/") != -1) {
						if(typeof infFeatFier === "number" && infFeatFier > this.id.switch_identifier) this.id.switch_identifier = infFeatFier;
					}	
				}
			}
			
			for(var j=0;j<element.resources.length;j++){
				var resId = parseInt(element.resources[j].attributes.id);
				if(resId > this.id.resource){
					this.id.resource = resId;
				}
				
				var resFier = element.resources[j].identifier;
				if (element.resources[j].attributes.ne_type.indexOf("/node/host/") != -1) {
					if(typeof resFier === "number" && resFier > this.id.host_identifier) this.id.host_identifier = resFier;
				} else if (element.resources[j].attributes.ne_type.indexOf("/node/switch/") != -1) {
					if(typeof resFier === "number" && resFier > this.id.switch_identifier) this.id.switch_identifier = resFier;
				}	
			}
			
			for(var j=0;j<element.features.length;j++){
				var featId = parseInt(element.features[j].attributes.id);
				if(featId > this.id.feature){
					this.id.feature = featId;
				}
				
				var featFier = element.features[j].identifier;
				if (element.features[j].attributes.ne_type.indexOf("/node/host/") != -1) {
					if(typeof featFier === "number" && featFier > this.id.host_identifier) this.id.host_identifier = featFier;
				} else if (element.features[j].attributes.ne_type.indexOf("/node/switch/") != -1) {
					if(typeof featFier === "number" && featFier > this.id.switch_identifier) this.id.switch_identifier = featFier;
				}	
			}
		}

		// search for the biggest Position Id
		for( var i=0;i<json['--- !Flerdit,2012'].length;i++){
			var posId = parseInt(json['--- !Flerdit,2012'][i].id);
			if(posId > this.id.position){
				this.id.position = posId;
			}
		}
		
		
	}

	/**
	 * This function returns the next available NetworkElement Id
	 * 
	 * @return next available NetworkElement Id
	 */
	IdHandler.prototype.getNextElementId = function() {
		return ++this.id.networkElement;
	}

	/**
	 * This function returns the next available NetworkInterface Id
	 * 
	 * @return next available NetworkInterface Id
	 */
	IdHandler.prototype.getNextInterfaceId = function() {
		return ++this.id.networkInterface;
	}

	/**
	 * This function returns the next available Resource Id
	 * 
	 * @return next available Resource Id
	 */
	IdHandler.prototype.getNextResourceId = function() {
		return ++this.id.resource;
	}

	/**
	 * This function returns the next available Feature Id
	 * 
	 * @return next available Feature Id
	 */
	IdHandler.prototype.getNextFeatureId = function() {
		return ++this.id.feature;
	}
	
	/**
	 * This function returns the next available Position Id
	 * 
	 * @return next available Position Id
	 */
	IdHandler.prototype.getNextPositionId = function(){
		return ++this.id.position;
	}

	/**
	 * This function returns the next available host identifier
	 * 
	 * @return next available Position Id
	 */
	IdHandler.prototype.getNextHostIdentifierId = function(){
		return ++this.id.host_identifier;
	}
	
	/**
	 * This function returns the next available switch identifier
	 * 
	 * @return next available Position Id
	 */
	IdHandler.prototype.getNextSwitchIdentifierId = function(){
		return ++this.id.switch_identifier;
	}	
	

	return IdHandler;
})); // define
