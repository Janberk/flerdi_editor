/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
	["networkElementDrawController", "graphLabelAttributesChangeController", "graphLabelAttributesCreateController", "networkElementAttributesController"],
	(function(NetworkElementDrawController, GraphLabelAttributesChangeController, GraphLabelAttributesCreateController, NetworkElementAttributesController){

		return{
			build: function(model, controller){
				switch(controller){
					case "draw_area": 
						return new NetworkElementDrawController(model);
					case "graphlabelAttributesChange":
						return new GraphLabelAttributesChangeController(model);
					case "graphlabelAttributesCreate":
						return new GraphLabelAttributesCreateController(model);
					case "networkElementAttributes":
						return new NetworkElementAttributesController(model);
					default: 
						throw "controller type '" + controller + "' not supported";
				}
			}
		}
	})
);