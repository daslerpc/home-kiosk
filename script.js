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
		var imageLoaded = "unset";

		// This doesn't work currently
		imageLoaded = testImage(imageSource, element);

		// if it doesn't end in a picture extension, add .jpg
		if ( imageSource.indexOf("imgur") != -1 && ! /\.(jpe?g|png|gif|bmp)$/i.test(imageSource) ) 
			imageSource += ".jpg";

		// currently seems to have trouble with links that don't end in .jpg
		document.getElementById(element).innerHTML += '<img src="' + imageSource + '">';
	});
}

function testImage(url, element, timeout) {
		var response = "unknown";
	    timeout = timeout || 5000;
	    
	    var timedOut = false, timer;
	    var img = new Image();
	    
	    img.onerror = img.onabort = function() {
	        if (!timedOut) {
	            clearTimeout(timer);
	            response = "error";
	        }
	    };
	    
	    img.onload = function() {
	        if (!timedOut) {
	            clearTimeout(timer);
	            response = "success";
	        }
	    };
	    
	    img.src = url;
	    timer = setTimeout(function() {
	        timedOut = true;
	        response = "timeout";
	    }, timeout); 

	    return response;
	}
