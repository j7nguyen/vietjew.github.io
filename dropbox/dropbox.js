// This script determines when the images in "Why Dropbox for Business?" section should appear and slide in

var slid = false;

function isVisible(el) {
	var screenTop = $(window).scrollTop();
	var screenBottom = screenTop + $(window).height();
	var elementTop = $(el).offset().top
	var elementBottom = elementTop + $(el).height();
	return ((elementBottom<= screenBottom) && (elementTop >= screenTop))
}

$(window).scroll(function() {
	inView = isVisible(".image-slide");
	if ((inView && !slid) && $(window).scrollTop() >= 200) {

		slid = true;
		$("#no-delay").toggleClass("slid");
		setTimeout(function() {
			$('#delay-1').toggleClass("slid")
		}, 150);
		setTimeout(function() {
			$('#delay-2').toggleClass("slid")
		}, 300);
				$(".image-slide").toggleClass("why-image-small").toggleClass("why-image-large");
	}
});

