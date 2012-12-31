/*
 * Author: Flerdi Team, Stefan Boitschuk
 */
define (["jquery",'yamlParser','loadingWindow'],
(function($,jsyaml,LoadingWindow) {
	
	/* This function parse a yaml file, to a JSON.
	*  
	*  path: path to the yaml file
	*  return : a JSON representations of the yaml file
	*/ 
	Parser.load = function(path,callback){
		$.ajaxSetup({async:true,});
		$('#yaml_datei').prop('disabled',true);
		this.pff = new LoadingWindow('YAML-Datei wird geladen...');
		var _this = this;

			$.post("/lib/parser.php", { file: path},
					   function(json) {
						callback(json);
						//console.log(json);
						_this.pff.close();
						$('#yaml_datei').prop('disabled',false);
					   },'json');
		

	}
	
	Parser.loadFile = function(path, callback){
		var source = [];
		$.get(path, function(data,status){
			source = data.split("\n");
			
			callback(source);
		}, 'text');
	}
	
return Parser;
	
}));