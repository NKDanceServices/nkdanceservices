<% _.each(data.posts, function(post, index){ %>
    <article class="hentry">
        <div class="row">
            <div class="content-featured col-sm-6">
                <a class="content-thumb" href="blog-detail.html" title="">
                    <img src="http://placehold.it/600x450" alt="blog_thumbnail"/>
                </a>
            </div>
            <div class="content-wrap col-sm-6">
                <span class="content-category">
                     <% _.each(post.tags, function(tag, idx) { %>
                        <%- tag.name %>
                    <% }) %>
                </span>
                <h3 class="content-title">
                    <a href="<%- post.url %>" title=""><%- post.title %></a>
                </h3>
                <div class="content-excerpt">
                    <%= (post.html).slice(0, 150) %>
                </div>
                <p class="content-meta">
                    <span>
                        <i class="fa fa-user"></i>
                        <a href="#" title=""><%- post.author.name %></a>
                    </span>
                    <span>
                        <time class="entry-date">
                            <i class="fa fa-calendar"></i><%- new Date(post.published_at).toDateString() %>
                        </time>
                    </span>
                    <span>
                        <a href="#" class="meta-comments">
                            <i class="fa fa-comments-o"></i> 1 Comment
                        </a>
                    </span>
                </p>
                <a href="<%- post.url %>" class="read-more">
                    <i class="fa fa-chevron-circle-right"></i>Read More
                </a>
            </div>
        </div>
    </article>  

<% }); %>