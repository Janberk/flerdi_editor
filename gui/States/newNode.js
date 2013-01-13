/*
 * Author: Flerdi Team
 */
 
 /* 
 *  This class handles the appearance of the menubar
 */
define (['jquery',"networkOrganisation"],function($, Network) {
	var type = '';
	var NewNode = function(network,src) {
		this.network = network;
		type = src;
	};
	NewNode.prototype.onClick = function(e) {
		var pos = {x:e.pageX-31, y:e.pageY-31}
		var node = {attributes:{'ne_type':type}};
		
		var id = this.network.importNode(node,pos,true);
		
	};
	return NewNode;
});	
