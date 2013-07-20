// script element that will be injected into the page
var script = document.createElement('script');

function twitstagramClosure() {
  // save current console.log for later (twitter overrides it)
  // won't need it though when in production.
  window.log = console.log;
  // twitter doesn't load all tweets at once, so we need to re-bind
  // click events as more tweets are loaded.
  // TODO: better method of re-binding than setInterval
  setInterval(function() { 
    // reapply the normal console log (only needs to happen once after twitter does
    // its thing, but whatevs)
    console.log = window.log;
    // unbind all clicks twistagram applies (twitter has it's own binding system,
    // so this unbind doesn't break anything. if there are other extensions running 
    // on the page however, it might break those. TODO better binding)
    $(".expanding-stream-item").unbind("click");
    // bind to when a user expands a tweet
    $(".expanding-stream-item").click(function() {
      var urlInTweet = $(this).find(".js-display-url").html();
      // check if there's a url in the tweet, it contains a link to instagram, and that
      // instagram picture hasn't already been added.
      if (urlInTweet && urlInTweet.indexOf("instagram") != -1 && 
          !$(this).find(".expanded-content").children(".twitstagram").length) {
        var imgSrc = "http://instagr.am/p/" + urlInTweet.split("/")[2] + "/media/";
        $(this).find(".expanded-content").append("<img class='twitstagram' src='" + imgSrc + "' />");
      }
    });
  }, 1000);
}
// add source code to script element 
script.textContent = ";(" + twitstagramClosure.toString() + ")();";
// inject into page
document.body.appendChild(script);
