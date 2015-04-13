$('.arrow').click(function(e) {
	var elements = $(".hideable");
	var currentID = getVisible(elements);
	var nextID
	if (this.id === "rightarrow") {
		nextID = next(currentID, elements.length);
		toggleSlide(nextID, "left");
	} else {
		nextID = prev(currentID, elements.length);
		toggleSlide(nextID, "right");
	}
	toggleCircle(nextID);
});

$('.circle').click(function(e) {
	var circleID = $(this)[0].id;
	var elements = $(".hideable");
	var currentID = getVisible(elements);
	if (circleID === currentID) return;
	var nextID = parseInt(circleID.replace("circle-", ""));
	toggleSlide(nextID);
	toggleCircle(nextID);
});

function toggleSlide(id, direction) {
	var elements = $(".hideable");
	var visibleID = getVisible(elements);
	var current = elements[visibleID];
	var nextSlide = elements[id];

	cleanClass(current);
	
	if (direction === "right") {
		slideRight(current, nextSlide);
	} else if (direction === "left") {
		slideLeft(current, nextSlide);
	} else if (id < visibleID) {
		slideRight(current, nextSlide);
	}  else if (id === visibleID) {
		return;
	} else {
		slideLeft(current, nextSlide);
	}
	
	$(nextSlide).css("display","block");
	var bgSrc = $(current).children()[0].src;
	$('.carousel').css('background-image', 'url(' + bgSrc + ')');
}

function slideLeft(current, nextSlide) {
	$(current).css("display","none");	
	$(nextSlide).toggleClass("carousel-slide-left");
}

function slideRight(current, nextSlide) {
	$(current).css("display","none");	
	$(nextSlide).toggleClass("carousel-slide-right");
}

function cleanClass(current) {
	if ($(current).hasClass('carousel-slide-left')) {
		$(current).toggleClass('carousel-slide-left');
	} else if ($(current).hasClass('carousel-slide-right')) {
		$(current).toggleClass('carousel-slide-right');
	}
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

function toggleCircle(id) {
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