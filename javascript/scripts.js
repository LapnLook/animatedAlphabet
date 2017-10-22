// JavaScript Document

var clipHeight;
var clipWidth;
var clipAmount;
var tracker = 0;
var rows = 4;
var letter;
var version = 1;

$(document).ready(function(){
	//console.log("loaded");
	createFrames();
	
	

function createFrames(){
	if ( $(window).width() >= 1024 ) { rows = 4; clipHeight = ($(window).height() - 100) / rows;} else if ( $(window).width() < 1024 && $(window).width() >= 480 ) { rows = 4; clipHeight = ($(window).height()*0.58 - 100) / rows;} else if ( $(window).width() <= 480 ) { rows = 3; clipHeight = ($(window).height()*0.6 - 100) / rows;}
	//console.log(clipHeight);
	clipWidth = (clipHeight / 16) * 9;
	//console.log(clipWidth);
	clipAmount = Math.floor(($(window).width() - 50) / clipWidth) * rows;
	//console.log(clipAmount);
	$('#container').empty();
	tracker = 0;
	for (var i = 0; i < clipAmount; i++){
		$('#container').append("<video class='videoFrame' playsinline webkit-playsinline id='clip"+i+"'><source src='' type='video/mp4'></video>");
	}
	$("video").prop("volume", 0.5);
	$('.videoFrame').css({"height":clipHeight, "width":clipWidth});
}

$( window ).resize(function() {
  createFrames();
});

$(document).keypress(function(e){
  //console.log(e.which);
  convertKeypress(e.which);
  insertVideo();
});

function convertKeypress(pressedKey){
	switch (pressedKey){
		default: letter = ''; break;
		case 97: letter = 'A'; break; case 98: letter = 'B'; break; case 99: letter = 'C'; break; case 100: letter = 'D'; break; case 101: letter = 'E'; break;	case 102: letter = 'F'; break; case 103: letter = 'G'; break; case 104: letter = 'H'; break; case 105: letter = 'I'; break; case 106: letter = 'J'; break; case 107: letter = 'K'; break; case 108: letter = 'L'; break; case 109: letter = 'M'; break; case 110: letter = 'N'; break; case 111: letter = 'O'; break; case 112: letter = 'P'; break; case 113: letter = 'Q'; break; case 114: letter = 'R'; break; case 115: letter = 'S'; break; case 116: letter = 'T'; break; case 117: letter = 'U'; break; case 118: letter = 'V'; break; case 119: letter = 'W'; break; case 120: letter = 'X'; break; case 121: letter = 'Y'; break; case 122: letter = 'Z'; break; case 65: letter = 'A'; break; case 66: letter = 'B'; break; case 67: letter = 'C'; break; case 68: letter = 'D'; break; case 69: letter = 'E'; break; case 70: letter = 'F'; break; case 71: letter = 'G'; break; case 72: letter = 'H'; break; case 73: letter = 'I'; break; case 74: letter = 'J'; break; case 75: letter = 'K'; break; case 76: letter = 'L'; break; case 77: letter = 'M'; break; case 78: letter = 'N'; break; case 79: letter = 'O'; break; case 80: letter = 'P'; break; case 81: letter = 'Q'; break; case 82: letter = 'R'; break; case 83: letter = 'S'; break; case 84: letter = 'T'; break; case 85: letter = 'U'; break; case 86: letter = 'V'; break; case 87: letter = 'W'; break; case 88: letter = 'X'; break; case 89: letter = 'Y'; break; case 90: letter = 'Z'; break;
		case 32: letter = 'Space'; break;
		case 13: letter = 'Enter';
	}
	
	if (pressedKey >= 97 && pressedKey <= 122){ 		
		version = 1;
	} else if (pressedKey >= 65 && pressedKey <= 90){ 	
		version = 2;
	} else{
		version = null;
	}
}
	
function insertVideo(){
	if (letter === 'Space'){
		tracker++;
		if (tracker >= clipAmount){
			tracker = 0;
		}
	}
	
	if (letter === 'Enter'){
		
		//console.log("clipAmount "+clipAmount);
		//console.log("current tracker "+tracker);
		//console.log("current remainder "+tracker % (clipAmount/rows));
		
		if (tracker % (clipAmount/rows) !== 0){
			tracker += (clipAmount/rows) - (tracker % (clipAmount/rows));
		} else {
			tracker += (clipAmount/rows);
		}
		
		if (tracker >= clipAmount){
			tracker = 0;
		}
	}
	
	if (letter !== 'Space' && letter !== 'Enter' && letter !== ''){
		//console.log('#clip'+tracker+' video');
		var src = "assets/clips/"+letter+version+"_1.mp4";
		//console.log(src);
		$('#clip'+tracker).attr("src", src);
		$('#clip'+tracker).css({'height':'clipHeight'}).css({'width':'clipWidth'});
		$('#clip'+tracker)[0].load();
		$('#clip'+tracker)[0].play();
		tracker++;
		if (tracker >= clipAmount){
			tracker = 0;
		}
	}
	console.log(tracker);
}

document.addEventListener('ended', function(e){
    if($(e.target).is('video')){
		//console.log("video ended");
        $(e.target).attr("src", "");
		$(e.target)[0].load();
    }
}, true);

$( "#infoButton" ).click(function() {
	$( "#infoPopup" ).fadeToggle("medium");
	$( "#keyboardPopup" ).fadeOut("medium");
});
	
$( "#keyboardButton" ).click(function() {
	$( "#keyboardPopup" ).fadeToggle("medium");
	$( "#infoPopup" ).fadeOut("medium");
});
	
document.getElementById("keyboardSvg").addEventListener('click', function(e){
	if($(e.target).attr('name') !== undefined){
		if ($(e.target).attr('name') === "Shift"){
			if (version === 1){version = 2;} else {version = 1;}
			$("#"+$(e.target).attr('name')).toggleClass("cls-2var");
		} else {
			letter = $(e.target).attr('name');
			insertVideo();
			$("#"+$(e.target).attr('name')).toggleClass("cls-2var");
			setTimeout(function(){
				$("#"+$(e.target).attr('name')).toggleClass("cls-2var");  
   			},200);
			}
	}
}, true);
});