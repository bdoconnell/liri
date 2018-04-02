require("dotenv").config();
var http = require("http");
var keys = require("./keys.js");
var spotify = require("spotify");
var twitter = require("twitter");
var request = require("request");
var fs = require("fs");

var argOne = query.splice(0, 1);
var argTwo = query.join(" ");
var action = String(argOne);
var value = String(argTwo);

switch (action) {
  case "my-tweets":
    myTweets();
    logAction();
    break;

  case "spotify-this-song":
    spotifyThisSong();
    logAction();
    break;

  case "movie-this":
    movieThis();
    logAction();
    break;

  case "do-what-it-says":
    doThis();
    logAction();
    break;
}
// * `my-tweets`
function myTweets() {

  var twitterKeys = keys.twitterKeys;

  var client = new twitter({
    consumer_key: twitterKeys.consumer_key,
    consumer_secret: twitterKeys.consumer_secret,
    access_token_key: twitterKeys.access_token_key,
    access_token_secret: twitterKeys.access_token_secret
  });

  var params = { screen_name: "Joe Johnson", count: 20 };

  client.get("statuses/user_timeline", params, function (error, tweets, response) {
    if (error) {
      console.log(error);
    }

    for (var i = 0; i < tweets.length; i++) {
      console.log("************");
      console.log(tweets[i].text);
      console.log("************");
    }

  });
}
// * `spotify-this-song`
function spotifyThisSong() {

  var spotifyKeys = keys.spotifyKeys;

  var spotify = new spotify({
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
  });

  spotify.search({
    type: "track",
    query: value
  }, function (err, data) {

    if (err) {
      console.log("Error occurred: " + err);
      return;
    }
    // * if no song is provided then your program will default to
    //   * "The Sign" by Ace of Base
    if (value === "") {
      console.log("************");
      console.log("Artist: Ace of Base");
      console.log("Song: The Sign");
      console.log("Song Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE");
      console.log("Album: The Sign");
      console.log("************");
    }
    else {

      for (i = 0; i < 5; i++) {

        var results = data.tracks.items[i];

        var artist = results.artists[0].name;
        var songName = results.name;
        var songLink = results.external_urls.spotify;
        var album = results.album.name;

        //Need: artist(s), song's name, preview link of song, album//
        console.log("************");
        console.log("Artist: " + artist);
        console.log("Song: " + songName);
        console.log("Song Link: " + songLink);
        console.log("Album: " + album);
        console.log("************");
      }
    }
  });
}
// * `movie-this`
function movieThis()
var nodeArgs = process.argv;
var query = [];
var movieName = "";
for (var i = 2; i < nodeArgs.length; i++) {
  if (i > 2 && i < nodeArgs.length) {
    movieName = movieName + "+" + nodeArgs[i];
  }
  else {
    movieName += nodeArgs[i];
  }
}
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(queryUrl);
request(queryUrl, function(error, response, body) {  
  if (!error && response.statusCode === 200) { 

    console.log("************");
    console.log("Movie Name: Mr.Nobody");
    console.log("Release Date: 2009-09-11");
    console.log("Synopsis: Nemo Nobody leads an ordinary existence with his wife and 3 children; one day, he wakes up as a mortal centenarian in the year 2092.");
    console.log("Average Vote: 7.9");
    console.log("Language: en");
    console.log("************");
  }
  else {
    console.log("************");
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("Rated: " + JSON.parse(body).Rated);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
    console.log("Reviews: " + JSON.parse(body).Reviews);
    console.log("Director: " + JSON.parse(body).Director);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("************");
  }
});
// * `do-what-it-says`
function doThis() {

  fs.readFile("random.txt", "utf8", function (error, data) {

    var content = data.split(",");

    var array = data.toString().split("\n");   

    action = content[0];
    value = content[1];

    switch (action) {
      case "my-tweets":
        myTweets();
        break;

      case "spotify-this-song":
        spotifyThisSong();
        break;

      case "movie-this":
        movieThis();
        break;

      case "do-what-it-says":
        doThis();
        break;

    }

  });

}

function logAction() {

  var logItem = "\nSearch String:" + action + "," + value;
  console.log(logItem);

  fs.appendFile("log.txt", logItem, function (err) {

    if (err) {
      console.log(err);
    }

    else {
      console.log("Content Added!");
    }
  });
}
