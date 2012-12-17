/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of toolbar
 */
define (["jquery", "toolbarButton"],(function($, ToolbarButton) {
	var Toolbar = (function() {
		this.buttons = new Array();
		this.addButton("x", "bla");
		this.addSeperator();
		this.addButton("y", "bla");

		this.checked = this.buttons[0];	
		this.draw(this.checked);
		$(".tb_button").click( function() {
			$(this).removeClass("active").addClass("active");
		});
		
	});
	Toolbar.prototype.addButton = (function(img, funct) {
		this.buttons.push(new ToolbarButton(img, funct, this.buttons.length));
	});
	Toolbar.prototype.addSeperator = (function() {
		this.buttons.push(0);
	});
	Toolbar.prototype.draw = (function(checked) {
		$.each( this.buttons, (function(i, val) {
			if( val != 0 ) {
				$("#toolbar").append(val.src);
				if( val == checked ) { $("#" + val.id).css( {"border": "1px inset", "background-color": "#bbbbbb"}); }
				else { $("#" + val.id).css( {"border": "none", "background-color": "#cccccc"}); }
			} else {
				$("#toolbar").append('<div class="tb_seperator"></div>');
			}
		}));
	});
	return Toolbar;
}));	
