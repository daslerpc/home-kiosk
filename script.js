function setInspiration(element) {
	var quotesToPull = 25;
	var successful = false;

	
	$.getJSON("http://www.reddit.com/r/showerthoughts/hot/.json?count=" + quotesToPull, function(data) {
		do {
			var index = Math.floor((Math.random() * (quotesToPull - 1)));			
			var quote = data.data.children[index].data.title;
			var stickied = data.data.children[index].data.stickied;

			if( !stickied ) {
				document.getElementById(element).innerHTML = quote;	
				successful = true;
			}
		} while (!successful);	
	
	});
}

function setImage(element) {

	var imagesToPull = 25;
	var index = Math.floor((Math.random() * (imagesToPull - 1)));

	$.getJSON("http://www.reddit.com/r/earthporn/hot/.json?count="+imagesToPull, function(data) { 

		var imageSource = data.data.children[index].data.url;

		// if it doesn't end in a picture extension, add .jpg
		if ( imageSource.indexOf("imgur") != -1 && ! /\.(jpe?g|png|gif|bmp)$/i.test(imageSource) ) 
			imageSource += ".jpg";

		// currently seems to have trouble with links that don't end in .jpg
		document.getElementById(element).innerHTML += '<img id="background_image" src="' + imageSource + '">';

		
	});
}
