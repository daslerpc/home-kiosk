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
