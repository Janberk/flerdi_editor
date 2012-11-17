/*
 * Author: Flerdi Team, Stefan Boitschuk
 */
define (["jquery",'yamlParser'],
(function($,jsyaml) {
	
	/* This function parse a yaml file, to a JSON.
	*  
	*  path: path to the yaml file
	*  return : a JSON representations of the yaml file
	*/ 
	Parser.load = function(path){
		$.ajaxSetup({async:false});
		
		var source = [];
		var target = [];
		$.get(path, function(data,status){
			source = data.split("\n");
		}, 'text');
		
		var positions = false;
		
		for(i=0;i<source.length;i++){
			if(source[i] != ""){
				var line = source[i];
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
						target.push(source[i].replace(/--- !.*/i,'---'));
					}
				}else{
					if(positions){
						target.push(" "+source[i].replace(/- !.*/i,'-'));
					}else{
						target.push(source[i].replace(/- !.*/i,'-'));
					}
				}

			}
		}
		return parseFile(target.join('\n'));
	}
	
return Parser;
	
}));
function parseFile(string){
	return jsyaml.load(string);
}