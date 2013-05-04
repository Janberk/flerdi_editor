/*
 * Author: Flerdi Team
 */

/* 
 *  This class handles the appearance of the menubar
 */
define([ 'jquery', 'observable' ], function($, Observable) {
	var DrawArea = function() {
		this.observable = new Observable();
		this.state;

	};

	DrawArea.prototype.setState = function(state) {
		this.state = state;
		this.observable.notifyAll("changeState", this.state.name);

		$('#drawarea').off();
		for ( var i = 0; i < this.state.events.length; i++) {
			$('#drawarea').on(this.state.events[i].name,
					this.state.events[i].callback);
		}

	};
	return DrawArea;
});
