define(['jquery', 'dialog', 'parser', 'jquery_ui'], function($, Dialog, Parser, JUI) {
	var OpenDialog = function(environment) {
		this.env = environment;
		var dia = new Dialog('open', 'Open');
		dia.addCancel();
		
		dia.setContent($(document.createElement('input'))
			.addClass('input-block-level')
			.attr('type', 'file'));
		
		var progress = $(document.createElement('div'))
			.addClass('progress');
		
		var _this = this;
		$('#open input').on('change',function(e){
				if (this.files !== 'undefined' && typeof FileReader !== 'undefined') {
					
					var file = this.files[0];
					if(file.name.split('\.')[file.name.split('\.').length-1] == 'yaml'){
						var reader = new FileReader();	
						reader.onload = function(e){					
							dia.addOk(function() {Parser.loadFromText(e.target.result,file.name,function(json){_this.env.importJson(json,file.name);})});
							};
						reader.readAsText(file);
					} else alert('Please select a .yaml File');
					    
				} else alert('Your browser does not support the HTML5 File-API');
				});
	}
	return OpenDialog;
})
