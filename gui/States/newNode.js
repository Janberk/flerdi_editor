/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the menubar
 */
define (['jquery',"node_visualisation"],function($, Node_Visualisation) {
	var type = '';
	var NewNode = function(src) {
		type = src;
	};
	NewNode.prototype.onClick = function(e) {
		var pos = [e.pageX-31,e.pageY-31];	
		var node = new Node_Visualisation(pos, type);
		node.addDrag();
		node.show();
	};
	return NewNode;
});	
