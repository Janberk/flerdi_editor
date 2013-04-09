/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ "jquery" ], (function($) {

	var CommandManager = function(network) {
		this.network = network;
		this.commands = new Array(); // stack of all commands, done by this
										// CommandManager
		this.position = 0; // index of the last executed command
		this.hasChanged = false; //boolean to see if anything has changed
	}

	/**
	 * This function adds a new Command to this Manager, and invokes it
	 * 
	 * @param command command-object that should be add and invoked
	 */
	CommandManager.prototype.newCommand = function(command) {
		if (this.position != 0) {
			this.commands = this.commands.slice(this.position)
			this.position = 0;
		}
		this.commands.unshift(command);
		this.commands[0].execute();
		this.hasChanged = true;
	}

	/**
	 * This function undoes the last done command.
	 * 
	 */
	CommandManager.prototype.undo = function() {
		if (this.position < this.commands.length) {
			this.commands[this.position].undo();
			this.position++;
		} else {
			console.log('nothing to undo');
			this.hasChanged = false;
		}
	}

	/**
	 * This function redoes the last undone command.
	 * 
	 */
	CommandManager.prototype.redo = function() {
		if (this.position != 0) {
			this.commands[this.position - 1].execute();
			this.position--;
		}
	}
	
	CommandManager.prototype.isHasChanged = function() {
		return this.hasChanged;
	}
	
	CommandManager.prototype.setHasChanged = function(hasChanged) {
		this.hasChanged = hasChanged;
	}

	return CommandManager;
})); // define
