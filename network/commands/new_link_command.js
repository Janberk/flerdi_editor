/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * interfaces : IUndoableCommand
 */

define([ "jquery" ], 
(function($) {

	/**
	 * This is the constructor
	 * 
	 * @param network the network
	 * @param json the json of the new link
	 */
	var NewLinkCommand = function(network, json){
		this.network = network;
		this.json = json;
	}
	
	/**
	 * This function creates the link
	 */
	NewLinkCommand.prototype.execute = function(){		
		this.link = this.network.importLink(this.json,true);
	}
	
	/**
	 * This function removes the link
	 */
	NewLinkCommand.prototype.undo = function(){
		this.link.removeLink();
	}
	
	return NewLinkCommand;
})); // define
