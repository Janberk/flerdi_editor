/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
	["networkElementDrawController",'graphLabelAttributesChangeController'],
	(function(NetworkElementDrawController,GraphLabelAttributesChangeController){

		return{
			build: function(model, controller){
				switch(controller){
					case "draw_area": 
						return new NetworkElementDrawController(model);
					case "graphlabelAttributesChange":
						return new GraphLabelAttributesChangeController(model);
					default: 
						throw "controller type '" + controller + "' not supported";
				}
			}
		}
	})
);