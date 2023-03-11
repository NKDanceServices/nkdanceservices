/**
 * PlayerYT JS
 * @desc Youtube player 
 * loads youtube player iFrame and plays the video by id
 */

jQuery(function(){
	var tag = document.createElement('script');
	tag.src = '//www.youtube.com/iframe_api';
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});


function onYouTubeIframeAPIReady() {
	nk.Youtube.player = new YT.Player('player', {
		height: '450',
	  	width: '600',
	  	events: {
	    	'onReady': function(){
	    		if(_.has(nk.Youtube, 'defaultVideoId')){
	    			nk.Youtube.setVideo(nk.Youtube.defaultVideoId, nk.Youtube.defaultTitle, nk.Youtube.defaultDesc);
					nk.Youtube.player.stopVideo();
	    		}
	    	}
	  	}
	});
}