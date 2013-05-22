define(
		[ 'jquery', 'dialog', 'parser', 'jquery_ui', 'progressbar' ],
		function($, Dialog, Parser, JUI, Progressbar) {
			var OpenDialog = function(environment) {
				this.env = environment;
				var dia = new Dialog('open', 'Open');
				dia.addCancel();

				dia.setContent($(document.createElement('input')).addClass(
						'input-block-level').attr('type', 'file'));
				dia.show();
				this.progress = new Progressbar({},dia.getBody());

				var _this = this;
				$('#open input')
						.on('change',
								function(e) {
									if (this.files !== 'undefined'
											&& typeof FileReader !== 'undefined') {

										var file = this.files[0];
										if (file.name.split('\.')[file.name
												.split('\.').length - 1] == 'yaml') {
											var reader = new FileReader();
											
											reader.onprogress  = function(evt){
												_this.progress.setValue(Math.round((evt.loaded / evt.total) * 100));
											}
											reader.onloadstart = function(){_this.progress.show()};
											reader.onload = function(e) {
												_this.progress.setValue(100);
												_this.progress.type = 'success';
												_this.progress.refresh();
												dia.addOk(function() {
															Parser.loadFromText(
																			e.target.result,
																			file.name,
																			function(network) {
																				//console.log(network);
																				environment.networks.newNetwork(network,true);
																			})
														});
											};
											reader.readAsText(file);
										} else
											alert('Please select a .yaml File');

									} else
										alert('Your browser does not support the HTML5 File-API');
								});
				
			}
			return OpenDialog;
		})
