function isVisible(el) {
	var screenTop = $(window).scrollTop();
	var screenBottom = screenTop + $(window).height();
	var elementTop = $(el).offset().top
	var elementBottom = elementTop + $(el).height();
	return ((elementBottom<= screenBottom) && (elementTop >= screenTop))
}

$(window).scroll(function() {
	hidden = $(".image-slide").hasClass("hidden");
	inView = isVisible(".image-slide");
	if ((inView && hidden) && $(window).scrollTop() >= 200) {
		console.log("Images are in view");
		$(".image-slide").toggleClass("hidden");
	} else {
		console.log("Go fuck yourself");
	}
});

