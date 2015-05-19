// This replaces the video's placeholder image with an autoplaying html5 video element. The video file was converted to .ogv for compatibility with Firefox and other browsers that don't support mp4.

$('#play-button').click(function() {togglePlayer();});

function togglePlayer() {
	$('#video-still').css("display","none");
	$("#video").html("<div class='col-12' id='video-player'>" +
	"<video autoplay controls='controls' width='100%' height='500'>" + 
	"<source src='assets/video_dfb_small.mov' type='video/mp4'><source src='assets/" +
	"video_dfb_small.ogv' type='video/ogg'>Your browser" +
	" does not support the video tag.</video></div>");
}