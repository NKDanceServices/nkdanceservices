/**
 * LoadYT JS
 * @desc loads the playlist from youtube and construct UI elements 
 * to display and play videos
 */

var nk = nk || {};
	nk.Youtube = nk.Youtube || {};

/**
 * @class YT
 * @desc Youtube class
 * @param {Object} - jQuery Object
 */
nk.Youtube.YT = function($) {

	var videoListContainer 				= 	$('#playlistList');
		nk.Youtube.playingVideoTitle	=	$('.loop-item-title'),
		nk.Youtube.playingVideoDesc		=	$('.loop-item-excerpt');

	/**
	 * @func videoStr
	 * @desc builds playlist UI
	 * @param {String} - videoId, title and desc string
	 * @return {String} - html string
	 */
	function videoStr(videoId, title, description){

		return "<div class=item>"
                + "<a id="+videoId+" class='playVideo' href='http://www.youtube.com/watch?v="+videoId+"' >"
                + "<span class='icon'><i class='fa fa-play'></i></span>"
                + title
                + "<span class='thumbnail-content'>"
                + description.substring(0, 60)
                + "..."
                + "</span></a></div>"
	};

	/**
	 * @func requestVideoPlaylist
	 * @desc makes Ajax request to get playlist 
	 * @param {String} - playlist string
	 */ 
	function requestVideoPlaylist(playlistId) {
		var request,
			requestOptions = {
				playlistId: playlistId,
			    part: 'snippet',
			    maxResults: 3
			};
		
		request = gapi.client.youtube.playlistItems.list(requestOptions);

		request.then(function(response){
			var playlistItems = response.result.items;	
			displayVideos(playlistItems);

			nk.Youtube.defaultVideoId = playlistItems[0].snippet.resourceId.videoId;
			nk.Youtube.defaultTitle = playlistItems[0].snippet.title;
			nk.Youtube.defaultDesc = playlistItems[0].snippet.description.substring(0, 60)+"...";

			if(_.has(nk.Youtube.player,'loadVideoById')){
				nk.Youtube.setVideo(nk.Youtube.defaultVideoId, nk.Youtube.defaultTitle, nk.Youtube.defaultDesc);
				nk.Youtube.player.stopVideo();
			}
		});
	}

	/**
	 * @func displayVideos
	 * @desc displays built UI with videos
	 * @param {Object} - playlistItems
	 */
	function displayVideos(playlistItems) {
		_.each(playlistItems, function(item, idx){
			var video = videoStr(item.snippet.resourceId.videoId, item.snippet.title, item.snippet.description);
			videoListContainer.append(video);	
		});

		$('a.playVideo').on('click', function(e) {
			e.preventDefault();
			var content = e.currentTarget.innerText.split('\n');
			nk.Youtube.setVideo(this.id, content[0], content[1]);
		});
	};

	return {
		init: function() {
			var playlistId = 'PLqYO29da0WeMO4YHFGsvSD3Je0lazp-I_';
			gapi.client.setApiKey('AIzaSyDiOEtpZrjLjTs-EzB4fMv7ycAK1l0xmYM');
			gapi.client.load('youtube', 'v3').then(function(result){
				requestVideoPlaylist(playlistId);
			});
		}
	}
};

/**
 * @func setVideo
 * @desc loads video by id
 * @param {String} - videoId, title, desc string
 */
nk.Youtube.setVideo = function(videoId, title, desc){
	nk.Youtube.player.loadVideoById(videoId, 5, "large");
	nk.Youtube.playingVideoTitle.html(title);
	nk.Youtube.playingVideoDesc.html(desc);
};



function initYT(){
	var yt = new nk.Youtube.YT(jQuery);
	yt.init();
}
