/*
 * Author: Flerdi Team
 * RequireJS module definition
 */

define([ "jquery", "button", "overviewComponent" ], (function($, Button,
		OverviewComponent) {
	var networkElementResourcesOverviewView = function(attributes, parent,
			callback) {
		this.parent = parent;
		this.attributes = attributes || {};

		this.resources = attributes.resources || [];
		
		this.overviewComponents = [];

		this.callback = function() {
		};
		if (callback != undefined && typeof callback == 'function') {
			this.callback = callback;
		}

		this.drawView();
	}

	/**
	 * This functions draws the View.
	 * 
	 */
	networkElementResourcesOverviewView.prototype.drawView = function() {
		var _this = this;
		this.buttonBar = document.createElement('div');
		this.overViewContainer = document.createElement('div');

		$(this.overViewContainer).css({
			margin : '0px 10px 0px 0px',
			height : 200,
		});

		$(this.buttonBar).css({
			margin : '5px 10px 0px 0px',
			textAlign : "left"
		});

		
		this.overviewComponents = [];
		for(var i=0;i<this.resources.length;i++){
			this.overviewComponents.push(new OverviewComponent({
				id : _this.resources[i].id,
				name : _this.resources[i].name
			}, this.overViewContainer, function(evt, data) {
				_this.callback(evt, data)
			}));
			this.overviewComponents[i].show();
		}


		var btn = new Button({
			text : "New Resource",
			size : 'mini'
		}, this.buttonBar, function() {
			_this.callback('add', {});
		});

		btn.show();

		$(this.parent).append(this.overViewContainer);
		$(this.parent).append(this.buttonBar);

	}

	/**
	 * This function returns a JSON representing the content of all Input and
	 * select fields, belonging to this Dialogue
	 * 
	 */
	networkElementResourcesOverviewView.prototype.getValues = function() {
		return {};
	}

	/*
	 * This view refreshes the view
	 * 
	 */
	networkElementResourcesOverviewView.prototype.refresh = function() {

	}

	networkElementResourcesOverviewView.prototype.getBody = function() {
		return this.table;
	}

	networkElementResourcesOverviewView.prototype.remove = function() {

	}

	return networkElementResourcesOverviewView;
})); // define
