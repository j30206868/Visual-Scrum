$(document).ready(function() {
	var dock = new MacStyleDock(
		  document.getElementById('dock'),
		  [
			{
			  name      : 'mac-icon-0-',
			  extension : '.jpg',
			  sizes     : [32, 64],
			  onclick   : function(){
							alert('You clicked on the first icon');
						  }
			},
			{
			  name      : 'mac-icon-1-',
			  extension : '.jpg',
			  sizes     : [32, 64],
			  onclick   : function(){
							alert('You clicked on the second icon');
						  }
			}
		  ],
		  32,
		  64,
		  2
	);
});