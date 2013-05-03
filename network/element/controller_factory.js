/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
	["networkElementDrawController", "graphLabelAttributesChangeController", "graphLabelAttributesCreateController"],
	(function(NetworkElementDrawController, GraphLabelAttributesChangeController, GraphLabelAttributesCreateController){

		return{
			build: function(model, controller){
				switch(controller){
					case "draw_area": 
						return new NetworkElementDrawController(model);
					case "graphlabelAttributesChange":
						return new GraphLabelAttributesChangeController(model);
					case "graphlabelAttributesCreate":
						return new GraphLabelAttributesCreateController(model);
					default: 
						throw "controller type '" + controller + "' not supported";
				}
			}
		}
	})
);