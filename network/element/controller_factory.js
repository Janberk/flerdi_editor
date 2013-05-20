/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ "networkElementDrawController",
		"graphLabelAttributesChangeController",
		"graphLabelAttributesCreateController",
		"networkElementAttributesController",
		"linkDrawController",
		"networkElementResourcesOverviewController",
		"networkElementFeaturesOverviewController"],
		(function(NetworkElementDrawController,
				GraphLabelAttributesChangeController,
				GraphLabelAttributesCreateController,
				NetworkElementAttributesController, 
				LinkDrawController,
				NetworkElementResourcesOverviewController,
				NetworkElementFeaturesOverviewController) {

			return {
				build : function(model, controller) {
					switch (controller) {
					case "draw_area":

						var element = model.ne_type.split('/')[1];

						switch (element) {
						case "node":
							return new NetworkElementDrawController(model);
						case "link":
							return new LinkDrawController(model);
						default:
							throw "element type '" + element
									+ "' not supported";
						}

					case "graphlabelAttributesChange":
						return new GraphLabelAttributesChangeController(model);

					case "graphlabelAttributesCreate":
						return new GraphLabelAttributesCreateController(model);

					case "networkElementAttributes":
						return new NetworkElementAttributesController(model);
					case "networkElementResourcesOverview":		
						return new NetworkElementResourcesOverviewController(model);
					case "networkElementFeaturesOverview":		
						return new NetworkElementFeaturesOverviewController(model);						
					default:
						throw "controller type '" + controller
								+ "' not supported";
					}
				}
			}
		}));