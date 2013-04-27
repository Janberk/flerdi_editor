/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define(
	["networkElementDrawView"],
	(function(NetworkElementDrawView){

		var NetworkElementDrawController = function(model){
			this.model = model;
			this.view = new NetworkElementDrawView(this);
		}
		
		return NetworkElementDrawController;
	})
);