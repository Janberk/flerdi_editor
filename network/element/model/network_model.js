/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(["commandManager",'observable', 'idHandler'], (function(
		CommandManager, Observable, IdHandler) {
	var NetworkModel = function(id,graph_type,role_identifier,v_net_identifier,graph_tag,graph_nr) {
		this.id = id || 1;
		this.graph_type = graph_type || "OL";
		this.role_identifier = role_identifier || "";
		this.v_net_identifier = v_net_identifier || "";
		this.graph_tag = graph_tag || "";
		this.graph_nr = graph_nr || "";

		this.networkElements = [];
		
		this.observable = new Observable();
		
		this.idHandler = new IdHandler();

		//TODO der command manager geh�rt eich nicht in das model.
		this.commandManager = new CommandManager();
	}

	/**
	 * This functions adds a Network Element to this Network.
	 * 
	 * @param element
	 *            reference to the Network Element you want to add.
	 * 
	 */
	NetworkModel.prototype.addNetworkElement = function(element) {
		this.networkElements.push(element);
	}

	/**
	 * This function removes a Network Element from this Network. It just
	 * removes the reference to this element.
	 * 
	 * @param element
	 *            reference to the NetworkElement you want to remove.
	 * 
	 */
	NetworkModel.prototype.removeNetworkElementById = function(id) {
		for ( var i = 0; i < this.networkElements.length; i++) {
			if (parseInt(this.networkElements[i].id) == id) {
				this.networkElements.splice(i, 1);
				break;
			}
		}
	}
	
	/**
	 * This function returns the reference to a NetworkElement with  given Id.
	 * 
	 * @param id Id of the Element you want to have the reverence for
	 * 
	 */
	NetworkModel.prototype.getNetworkElementById = function(id){
		for(var i=0;i<this.networkElements.length ; i++){
			if(id == this.networkElements[i].id){
				return this.networkElements[i];
			}
		}
	}
	
	NetworkModel.prototype.remove = function(){
		this.observable.notifyAll("remove",{});
		this.networkElements = [];
	}

	return NetworkModel;
})); // define
