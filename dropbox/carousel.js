$('#rightarrow').click(function() {
	toggleSlide(true);
	toggleCircle(true);
});
$('#leftarrow').click(function() {
	toggleSlide(false);
	toggleCircle(false);
});

// direction = boolean value: true or false. If true, go to the next slide; otherwise go to previous one
function toggleSlide(direction) {
    var elements = $(".hideable"); // gets all the "slides" in our slideshow
    // Find the LI that's currently displayed
    var visibleID = getVisible(elements);
		var current = elements[visibleID];
    // elements[visibleID].style.display = "none"; // hide the currently visible LI
    if(!direction) {
        var makeVisible = prev(visibleID, elements.length); // get the previous slide
    } else {
        var makeVisible = next(visibleID, elements.length);
				
    }
    var nextSlide = elements[makeVisible];
		if (direction) $(nextSlide).toggleClass("carousel-slide-left");
		else $(nextSlide).toggleClass("carousel-slide-right");
		
		if ($(current).hasClass('carousel-slide-left')) {
			$(current).toggleClass('carousel-slide-left');
		} else if ($(current).hasClass('carousel-slide-right')) {
			$(current).toggleClass('carousel-slide-right');
		}
		$(nextSlide).css("display","block");
		$(current).css("display","none")
		
		var bgSrc = $(current).children()[0].src
		$('.carousel').css('background-image', 'url(' + bgSrc + ')');
		
}

$('.circle').click(function(e) {
	var circleID = $(this)[0].id;
	var id = parseInt(circleID.replace("circle-", ""));
	circleSelect(id);
	toggleCircleByID(id);
});

function circleSelect(id) {
	var elements = $(".hideable");
	var visibleID = getVisible(elements);
	var current = elements[visibleID];
	var currentID = current.id;
	var nextSlide = elements[id];
	
	if (id < currentID) {
		$(nextSlide).toggleClass("carousel-slide-right");
	}  else {
		$(nextSlide).toggleClass("carousel-slide-left");
	}
	
	$(nextSlide).css("display","block");
	$(current).css("display","none");
	
	var bgSrc = $(current).children()[0].src;
	$('.carousel').css('background-image', 'url(' + bgSrc + ')');
}

function getVisible(elements) {
    var visibleID = -1;
    for(var i = 0; i < elements.length; i++) {
        if($(elements[i]).css("display") == "block") {
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
	var circles = $(".circle");
	var activeCircleID = getActiveCircle(circles);
	if (!direction) {
		var makeActive = prev(activeCircleID, circles.length);
	} else {
		var makeActive = next(activeCircleID, circles.length);
	}
	circles[activeCircleID].className = "circle blue-circle"
	circles[makeActive].className = "circle gray-circle"
}
function toggleCircleByID(id) {
	var circles = $(".circle");
	var activeCircleID = getActiveCircle(circles);
	circles[activeCircleID].className = "circle blue-circle";
	circles[id].className = "circle gray-circle"
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

