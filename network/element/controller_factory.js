/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
	["networkElementDrawController"],
	(function(NetworkElementDrawController){

		return{
			build: function(model, controller){
				switch(controller){
					case "draw_area": 
						return new NetworkElementDrawController(model);
					default: 
						throw "controller type '" + controller + "' not supported";
				}
			}
		}
	})
);