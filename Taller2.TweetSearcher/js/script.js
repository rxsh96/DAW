function readTweets(){
  $.ajax({
    type: "GET",
		url: "twitter_search_to_rss.xml",
		dataType: "xml",
		success: function(xmlData){
			$(xmlData).find("item").each(function(){
				var title = $(this).find("title").text();
				var author = $(this).find("dc:creator").text();
				var description = $(this).find("description").text();
				var pubDate = $(this).find("pubDate").text();
				var link = $(this).find("link").text();
        addTweet(title, author, description, pubDate, link);
			});
		},
    error: function(){
      alert("PARSING ERROR");
    }
	});
}

function addTweet(title, author, description, pubDate, link){
  var t = $("<h4/>",{
    "class":"card-title",
    html: title
  });

  var a = $("<h5/>",{
    "class":"card-title",
    html: author
  });

  var d = $("<p/>",{
    "class":"card-title",
    html: description
  });

  var p = $("<p/>",{
    "class":"card-title pubTime",
    html: pubDate
  });

  var l = $('<a>',{
    "class":"linkClass",
    html: link
  });
  $('a').attr('href', link);

  var div = $( "<div/>", {
    "class": "card-body card"
  });

  t.appendTo(div);
  a.appendTo(div);
  d.appendTo(div);
  l.appendTo(div);
  p.appendTo(div);
  div.appendTo("#tweets");

}



$(document).ready(function(){
  readTweets();

  $("button").click(function(e){
    var text = $('input#searcher').val();
    if(text.length != 0) {
      var tweets = $('#tweets .card-body');
      tweets.filter(function(index){
        $(this).show();
        
        var tweet = $(this).text()
        if(tweet.indexOf(text) == -1) {
          $(this).hide()
        }

      });

    } else {
      $('#tweets .card-body .card').each(function(){
        $(this).show();
      });
    }
    return false;
  })

});