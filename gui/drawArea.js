/*
 * Author: Flerdi Team
 */

/* 
 *  This class handles the appearance of the menubar
 */
define([ 'jquery', 'observable' ], function($, Observable) {
	var DrawArea = function() {
		this.state;

	};

	// star extends
	DrawArea.prototype = new Observable();
	// end extends

	DrawArea.prototype.setState = function(state) {
		this.state = state;
		this.notifyAll("changeState", this.state.name);

		$('#drawarea').off();
		for ( var i = 0; i < this.state.events.length; i++) {
			$('#drawarea').on(this.state.events[i].name,
					this.state.events[i].callback);
		}

	};

	return DrawArea;
});
