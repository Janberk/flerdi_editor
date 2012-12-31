/*
 * Author: Team Flerdi
 *
 */
define (["jquery",'loadingWindow'],
(function($,LoadingWindow) {
	
	/* 
	*  This function parse a yaml file, to a JSON.
	*  
	*  path: path to the yaml file, need to be on the server
	*  callback : function that should be executed after parsing, gets the json as parameter
	*/ 
	Parser.load = function(path,callback){
		$('#yaml_datei').prop('disabled',true);
		this.loadingScreen = new LoadingWindow('\''+path+'\' wird geladen...');
		var _this = this;
		$.post("/backend/parser.php", { file: path}, function(json) {
								_this.loadingScreen.close();
								$('#yaml_datei').prop('disabled',false);
								callback(json);
							},'json');
	}
return Parser;
}));