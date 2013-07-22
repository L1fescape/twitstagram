// script element that will be injected into the page
var script = document.createElement('script');

function twitstagramClosure() {
  // checking whether dependencies exist (thanks @theabraham)
  function ready(callback) { 
    var wait = function() {
      setTimeout(function() {
        ready.call(null, callback); 
      }, 500); 
    };

    try {
      ( 
           isUndefined(window.$)
        || isUndefined(window.jQuery)
      ) ? wait() : setTimeout(function() { callback(); }, 3e3);
    } catch (err) {
      wait();
    }
  }

  function isUndefined(value) {
    return typeof value === 'undefined';
  }

  // once dependencies have been loaded, set bindings
  ready(function() {
    $('body').on('click', '.expanding-stream-item', function(e) {
      var urlInTweet = $(this).find(".js-display-url").html();
      // check if there's a url in the tweet, it contains a link to instagram, and that
      // instagram picture hasn't already been added.
      if (urlInTweet && urlInTweet.indexOf("instagram") != -1 && 
          !$(this).find(".twitstagram").length) {
        // use instagram api to get direct image src
        var imgSrc = "http://instagr.am/p/" + urlInTweet.split("/")[2] + "/media/";
        // if http or https isn't in the url, prepend it so we have a real link
        urlInTweet = (/^(http|https)/.exec(urlInTweet)) ? urlInTweet : "http://" + urlInTweet;
        var html = ' \
          <div class="card2 twitstagram" data-card2-name="photo"> \
            <div class="card2-photo card2-holder" data-card2-url="' + urlInTweet + '"> \
              <div class="card2-image-wrapper"> \
                <img class="card2-image-pic" src="' + imgSrc + '" alt="" /> \
              </div> \
              <div class="card2-footer"> \
              <a href="' + urlInTweet + '" target="_blank" class="js-card2-external-link"> \
                View on web \
              </a> \
            </div> \
           </div> \
          </div>';
        // add instagram image to the top of the 'details' div
        $(this).find(".js-tweet-details-fixer.tweet-details-fixer").prepend(html);
       }
    });
  });
}
// add source code to script element 
script.textContent = ";(" + twitstagramClosure.toString() + ")();";
// inject into page
document.body.appendChild(script);
