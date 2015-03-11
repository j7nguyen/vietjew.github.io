document.getElementById("play-button").addEventListener("click", function() {
	togglePlayer();
});

function togglePlayer() {
	document.getElementById("video-still").style.display = "none";
	document.getElementById("video").innerHTML = "<div class='col-12' id='video-player'>" +
	"<video autoplay controls='controls' width='100%' height='500'>" + 
	"<source src='assets/video_dfb_small.mov' type='video/mp4'>Your browser" +
	" does not support the video tag.</video></div>"
}