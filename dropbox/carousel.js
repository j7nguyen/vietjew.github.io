document.getElementById("rightarrow").addEventListener("click", function() {
	toggleSlide(true);
	toggleCircle(true);
});
document.getElementById("leftarrow").addEventListener("click", function() {
	toggleSlide(false);
	toggleCircle(false);
});

// direction = boolean value: true or false. If true, go to NEXT slide; otherwise go to PREV slide
function toggleSlide(direction) {
    var elements = document.getElementsByClassName("hideable"); // gets all the "slides" in our slideshow
    // Find the LI that's currently displayed
    var visibleID = getVisible(elements);
    elements[visibleID].style.display = "none"; // hide the currently visible LI
    if(!direction) {
        var makeVisible = prev(visibleID, elements.length); // get the previous slide
    } else {
        var makeVisible = next(visibleID, elements.length); // get the next slide
    }
    elements[makeVisible].style.display = "block"; // show the previous or next slide
}
function getVisible(elements) {
    var visibleID = -1;
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].style.display == "block") {
            visibleID = i;
        }
    }
    return visibleID;
}
function prev(num, arrayLength) {
    if(num == 0) return arrayLength-1;
    else return num-1;
}
function next(num, arrayLength) {
    if(num == arrayLength-1) return 0;
    else return num+1;
}

function toggleCircle(direction) {
	var circles = document.getElementsByClassName("circle");
	var activeCircleID = getActiveCircle(circles);
	if (!direction) {
		var makeActive = prev(activeCircleID, circles.length);
	} else {
		var makeActive = next(activeCircleID, circles.length);
	}
	circles[activeCircleID].className = "circle blue-circle"
	circles[makeActive].className = "circle gray-circle"
}

function getActiveCircle(circles) {
	var activeID = -1;
	for (var i = 0; i < circles.length; i++) {
		if (circles[i].className == "circle gray-circle") {
			activeID = i;
		}
	}
	return activeID;
}

