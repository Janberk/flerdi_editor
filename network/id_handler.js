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
			identifier: 0
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
			if(typeof eleFier === "number" && eleFier > this.id.identifier){
				this.id.identifier = eleFier;
			}

			for ( var j = 0; j < element.network_interfaces.length; j++) {
				var netInterface = element.network_interfaces[j];

				var infId = parseInt(netInterface.attributes.id);
				if (infId > this.id.networkInterface) {
					this.id.networkInterface = infId
				}
				var infFier = netInterface.attributes.identifier;
				if(typeof infFier === "number" && infFier > this.id.identifier){
					this.id.identifier = infFier;
				}

				for ( var k = 0; k < netInterface.resources.length; k++) {
					var infResId = parseInt(netInterface.resources[k].attributes.id);
					if (infResId > this.id.resource) {
						this.id.resource = infResId;
					}
					var infResFier = netInterface.resources[k].attributes.identifier;
					if(typeof infResFier === "number" && infResFier > this.id.identifier){
						this.id.identifier = infResFier;
					}
				}

				for ( var k = 0; k < netInterface.features.length; k++) {
					var infFeatId = parseInt(netInterface.features[k].attributes.id);
					if (infFeatId > this.id.feature) {
						this.id.feature = infFeatId;
					}
					var infFeatFier = netInterface.features[k].attributes.identifier;
					if(typeof infFeatFier === "number" && infFeatFier > this.id.identifier){
						this.id.identifier = infFeatFier;
					}
				}
			}
			
			for(var j=0;j<element.resources.length;j++){
				var resId = parseInt(element.resources[j].attributes.id);
				if(resId > this.id.resource){
					this.id.resource = resId;
				}
				var resFier = element.resources[j].identifier;
				if(typeof resFier === "number" && resFier > this.id.identifier){
					this.id.identifier = resFier;
				}
			}
			
			for(var j=0;j<element.features.length;j++){
				var featId = parseInt(element.features[j].attributes.id);
				if(featId > this.id.feature){
					this.id.feature = featId;
				}
				var featFier = element.features[j].identifier;
				if(typeof featFier === "number" && featFier > this.id.identifier){
					this.id.identifier = featFier;
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
		
		console.log(this.id);
		
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
	 * This function returns the next available identifier
	 * 
	 * @return next available Position Id
	 */
	IdHandler.prototype.getNextIdentifierId = function(){
		return ++this.id.identifier;
	}

	return IdHandler;
})); // define
