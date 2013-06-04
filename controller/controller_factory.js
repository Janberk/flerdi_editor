/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(["nodeDrawController",
        "linkDrawController",
		"graphLabelAttributesChangeController",
		"graphLabelAttributesCreateController",
		"networkElementAttributesController",
		"resourcesOverviewController",
		"featuresOverviewController"],
		(function(NodeDrawController,
				LinkDrawController,
				GraphLabelAttributesChangeController,
				GraphLabelAttributesCreateController,
				NetworkElementAttributesController, 
				ResourcesOverviewController,
				FeaturesOverviewController) {

			return {
				build : function(model, controller) {
					switch (controller) {
					case "draw_area":

						var element = model.ne_type.split('/')[1];

						switch (element) {
						case "node":
							return new NodeDrawController(model);
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
						return new ResourcesOverviewController(model);
					case "networkElementFeaturesOverview":		
						return new FeaturesOverviewController(model);						
					default:
						throw "controller type '" + controller
								+ "' not supported";
					}
				}
			}
		}));