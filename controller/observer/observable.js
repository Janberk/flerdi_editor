/*
 * Module network: represents a network, handles the nodes and links
 * Author: Flerdi Team
 */

/*
 * RequireJS module definition
 */
define(
		[],
		(function() {

			var Observable = function() {
				this.observer = []; // list of all registered observer
			};

			/**
			 * This function adds a Observer to this Observable
			 * 
			 * @param observer
			 *            observer that should be add
			 * 
			 */
			Observable.prototype.addObserver = function(observer) {
				this.observer.push(observer);
			}

			/**
			 * This function removes a Observer from this Observable
			 * 
			 * @param observer
			 *            observer that should be removed
			 * 
			 */
			Observable.prototype.removeObserver = function(observer) {
				for ( var i = 0; i < this.observer.length; i++) {
					if (this.observer[i] === observer) {
						this.observer.splice(i, 1);
					}
				}
			}

			/**
			 * This functions notifys all Observer.
			 * 
			 * @param commando
			 *            see "Observable_Commandos.txt"
			 * @param data
			 *            data send to the Observers
			 * 
			 */
			Observable.prototype.notifyAll = function(commando, data) {
				for ( var i = 0; i < this.observer.length; i++) {
					this.observer[i].update(commando, data);
				}
			}

			return Observable;
		})); // define
