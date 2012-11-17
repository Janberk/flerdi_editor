/* 
jquery.event.drag.js ~ v1.5 ~ Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)  
Liscensed under the MIT License ~ http://threedubmedia.googlecode.com/files/MIT-LICENSE.txt
*/


/* 
 *  RequireJS alias/path configuration (http://requirejs.org/)
 */

requirejs.config({
 paths: {
    
        // jquery library
        "jquery": 'lib/jquery',
	"drag": "lib/jquery.event.drag-1.5.min",
	"drawing1" : "lib/jquery.drawinglibrary",
	"drawing2" : "lib/jquery.svg",
	"util" : "backend/util",
	"network_element" : "elements/network_element",
	"parser" : "lib/parser",
	"yamlParser" : "lib/js-yaml.min",
	"network_link" : "elements/network_link",
	"toolbox" : "gui/toolbox",
	"element_key" : "gui/element_key",
	"graphics" : "lib/wz_jsgraphics",
    }
});


/*
 * The function defined below is the "main" function,
 * it will be called once all prerequisites listed in the
 * define() statement are loaded.
 *
 */

/* requireJS module definition */
define(["jquery","drag","environment"], 
       (function($,drag,Environment) {

    "use strict";
    /*
     * main program, to be called once the document has loaded 
     * and the DOM has been constructed
     */
    $(document).ready( (function() {

        var envoronment = new Environment('canvas');
	    
	
        
    }));

})); // define module
        

