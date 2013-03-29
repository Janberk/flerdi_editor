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

	return CommandManager;
})); // define
