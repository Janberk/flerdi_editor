/*
 * Author: Team Flerdi
 */
define (["jquery",'loadingWindow'],
(function($,LoadingWindow) {
	/** 
	*  This function parse a yaml file, to a JSON.
	*  
	*  @param path path to the yaml file, need to be on the server
	*  @param callback : function that should be executed after parsing, gets the json as parameter
	*/ 
	Parser.load = function(path,callback){
		$('#yaml_datei').prop('disabled',true);
		this.loadingScreen = new LoadingWindow('\''+path+'\' wird geladen...');
		var _this = this;
		$.post("/backend/YAML_parser.php", { source: path, type: 'file'}, function(json) {
								console.log(json);
								_this.loadingScreen.close();
								$('#yaml_datei').prop('disabled',false);
								callback(json);
							},'json');
	}
	/**
	* This function parses a String to a JSON.
	*
	* @param _text text that should be parsed
	* @param name name of the network
	* @param callback fucntion that should be called after parsing the file, the parsed JSON si the parameter of this function
	*/
	Parser.loadFromText = function(_text,name, callback){
		var loadingWindow = new LoadingWindow('\''+name+'\' wird geladen...');
		var _this = this;
		$.post("/backend/YAML_parser.php", { source: _text, type : 'text'}, function(json) {
								console.log(json);
								loadingWindow.close();
								callback(json);
							},'json');
	}

return Parser;
}));