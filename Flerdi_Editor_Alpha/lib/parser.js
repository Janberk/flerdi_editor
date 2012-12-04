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
		this.loadFile(path,function(string){
			_this.stringManipulate(string,function(string){
					parseFile(string,function(json){
							callback(json);
							_this.pff.close();
							$('#yaml_datei').prop('disabled',false);
						});
				});
		
		});
	}
	
	Parser.loadFile = function(path, callback){
		var source = [];
		$.get(path, function(data,status){
			source = data.split("\n");
			
			callback(source);
		}, 'text');
	}
	
	Parser.stringManipulate = function(string, callback){
	
		var target = [];
		
		var positions = false;
		
		for(i=0;i<string.length;i++){
			if(string[i] != ""){
				var line = string[i];
				var ergebnis = /^---.*?/i.test(line);
				if(ergebnis == true){
					var position = /\s*?--- !Flerdit,2012:Position\s.*?/i;
					if(position.test(line)){
						if(positions == true){
							target.push("-");
						}else{
							target.push("positions:");
							target.push("-");
							positions = true;
						}
					}else{
						target.push(string[i].replace(/--- !.*/i,'---'));
					}
				}else{
					if(positions){
						target.push(" "+string[i].replace(/- !.*/i,'-'));
					}else{
						target.push(string[i].replace(/- !.*/i,'-'));
					}
				}

			}
		}
		
		callback(target.join('\n'));
		
		//parseFile(target.join('\n'),function(json){console.log(json)});
	}
	
return Parser;
	
}));
function parseFile(string,callback){
	jsyaml.loadAll(string,function(json){
			callback(json);
			});
}