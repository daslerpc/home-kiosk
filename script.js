function setInspiration(element) {
	var quotesToPull = 25;

	var index = Math.floor((Math.random() * (quotesToPull - 1)));

	$.getJSON("http://www.reddit.com/r/showerthoughts/hot/.json?count=" + quotesToPull, function(data) {
		document.getElementById(element).innerHTML = data.data.children[index].data.title;	
	});
}

function setImage(element) {

	var imagesToPull = 25;
	var index = Math.floor((Math.random() * (imagesToPull - 1)));

	$.getJSON("http://www.reddit.com/r/earthporn/hot/.json?count="+imagesToPull, function(data) { 

		var imageSource = data.data.children[index].data.url;
		var imageLoaded = "unset";

		imageLoaded = testImage(imageSource);
		// document.getElementById("text-inspiration").innerHTML += imageLoaded;

		// currently seems to have trouble with links that don't end in .jpg
		document.getElementById(element).innerHTML += '<img src="' + imageSource + '">';
	});
}

function testImage(url, timeout) {
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
