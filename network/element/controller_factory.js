/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ "networkElementDrawController",
		"graphLabelAttributesChangeController",
		"graphLabelAttributesCreateController",
		"networkElementAttributesController",
		"linkDrawController"], (function(
		NetworkElementDrawController, GraphLabelAttributesChangeController,
		GraphLabelAttributesCreateController,
		NetworkElementAttributesController,
		LinkDrawController) {

	return {
		build : function(model, controller) {
			switch (controller) {
			case "draw_area":
				
				switch (model.ne_type.split('/')[1]) {
				case "node":
					return new NetworkElementDrawController(model);
				default:
					return new LinkDrawController(model);
				}

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
}));