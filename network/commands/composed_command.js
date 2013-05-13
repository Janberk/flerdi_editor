/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * interfaces : IUndoableCommand
 * 
 * This is a all-purpose command. It dosn'care which model to change, or what values to change
 */

define([ "jquery" ], (function($) {

	/**
	 * This is the constructor
	 * 
	 * @param commands
	 *            array of commands
	 */
	var ComposedCommand = function(commands) {
		this.commands = commands || [];

	}

	/**
	 * This function calls the execute functions for every command in the list
	 */
	ComposedCommand.prototype.execute = function() {
		for ( var i = 0; i < this.commands.length; i++) {
			this.commands[i].execute();
		}
	}

	/**
	 * This function calls the undo functions for every command in the list
	 */
	ComposedCommand.prototype.undo = function() {
		for ( var i = 0; i < this.commands.length; i++) {
			this.commands[i].undo();
		}
	}

	return ComposedCommand;
})); // define
