/**
 * Post JS 
 * @desc Pulls posts and tags through the Post API
 * populates the recent posts section and sidebar
 */

(function($){

	_.templateSettings.variable = "data";

	var post_collection = _.template($("script.post_collection").html()),
		sidebar_categories = _.template($("script.sidebar_categories").html()),
		sidebar_latest_post = _.template($("script.sidebar_latest_post").html()),
		bloghome = _.template($("script.bloghome").html());

	// Ajax call to get posts
	$.get(
		ghost.url.api('posts', {
		    limit: 'all',
		    include: 'tags,author'
		})
	).done(function (data) {

		$("div#blog_body").html(post_collection(data));
		$("div#blog_home").html(bloghome(data));
		$("div.post-area").after(sidebar_latest_post(data));

		// Ajax call to get tags
		$.get(
			ghost.url.api('tags', {
			    limit: 'all',
			    include: 'count.posts'
			})
		).done(function (tags) {
			
			$(".widget_latest_posts").append(sidebar_categories(tags));
		});

	});


})(jQuery);