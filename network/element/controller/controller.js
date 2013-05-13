/*
 * Author: Flerdi Team
 * RequireJS module definition
 * 
 * implements IObserver
 */

define(
		['jquery', 'observable'],
		(function($, Observable) {

			/**
			 * This is the 
			 * 
			 * @param model referenze of the model, this controller is connected to.
			 * @param parentController referenze to the controller holding referenz on this controller, just for view in view
			 * @param parentClass class name of the DOM-Element this controllers view should be shown in
			 * 
			 */
			var Controller = function(model, parentController, parentClass) {

			}

			Controller.prototype = new Observable();

			/**
			 * overwrite this function, this function is called by the observables this controller has registered to.
			 * 
			 */
			Controller.prototype.update = function(command, data) {
			}
			
			return Controller;
		}));