/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ "jquery" ],
		(function($) {

			var CommandManager = function(network) {
				this.network = network;
				this.commands = new Array(); // stack of all commands, done
												// by this
				// CommandManager
				this.position = 0; // index of the last executed command
				this.hasChanged = false; // boolean to see if anything has
											// changed
			}

			/**
			 * This function adds a new Command to this Manager, and invokes it
			 * 
			 * @param command
			 *            command-object that should be add and invoked
			 */
			CommandManager.prototype.newCommand = function(command) {
				if (this.position != 0) {
					this.commands = this.commands.slice(this.position)
					this.position = 0;
				}
				this.commands.unshift(command);
				this.commands[0].execute();
				this.greying();
				this.hasChanged = true;
			}

			/**
			 * This function undoes the last done command.
			 * 
			 */
			CommandManager.prototype.undo = function() {
				if (this.position < this.commands.length) {
					this.commands[this.position++].undo();
					this.greying();
				}
			}

			CommandManager.prototype.greying = function() {

				if (this.position == this.commands.length
						|| this.commands.length == 0) {
					this.hasChanged = false;
					$('#btn-Undo').parent().addClass('disabled');
				} else {
					$('#btn-Undo').parent().removeClass('disabled');
				}
				
				if ((this.position == 0 && this.commands.length > 0) || this.commands.length == 0) {
					$('#btn-Redo').parent().addClass('disabled');
				} else {
					$('#btn-Redo').parent().removeClass('disabled');
				}
			}

			/**
			 * This function redoes the last undone command.
			 * 
			 */
			CommandManager.prototype.redo = function() {
				if (this.position != 0) {
					this.commands[--this.position].execute();
					this.greying();
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
