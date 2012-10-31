
	function NetworkElement(div)
	{
		this.div = div;
		
		document.body.appendChild(div);
	
		this.getPoint = function()
		{
			var x = $(div).position().left;
			var y = $(div).position().top;
			
			var width = $(div).width();
			var length = $(div).height();
			
			return [(x+width/2), (y+length/2)];
		};
		
		this.getDiv = function()
		{
			return this.div;
		}
	
	};
