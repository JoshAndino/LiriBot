require("dotenv").config();

//var
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var moment = require("moment");

var Spotify = require("node-spotify-api");

var input = process.argv;
var action = input[2];
var inputs = input[3];
var axios = require("axios");

//switches for users action

switch (action) 
{
  case "spotify-this-song":
    spotify(inputs);
    break;

  case "movie-this":
    movie(inputs);
    break;

  case "do-what-it-says":
    doIt(inputs);
    break;

  case "concert-this":
    concert(inputs);
    break;
}


//omdb api call

function movie(inputs)
{
    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";
    request(queryUrl,function(error,response, body)
    {
        var results = JSON.parse(body);

        if(!error && response.statusCode === 200)
        {
            console.log("Title:" + results.Title);
            console.log("Release Year:" + results.Year);
            console.log("IMDB Rating:" + results.imdbRating);
            console.log("Rotten Tomatoes Rating:" + results.Ratings[1].Vaule);
            console.log("Country" + results.Country);
            console.log("Language:" + results.Language);
            console.log("Plot:" + results.Plot);
            console.log("Title:" + results.Title);
            console.log("Actors:" + results.Actors);
        }
        
    })
};

function concert(inputs)
{
    var queryUrl = "https://rest.bandsintown.com/artists" + inputs + "events?app_id=codingbootcamp";

    request(queryUrl,function(error,response, body)
    {

        var results = JSON.parse(body)[0];
        if(!error && response.statusCode === 200)
        {
          console.log("City:" + results.venue.city);
          console.log("Venue Name:" + results.venue.name);
          console.log("Date of Event:" + moment(results.datatime).format("MM/DD/YYYY"));
        }
    });
};

function doIt(inputs)
{
  fs.readFile("random.txt", "utf-8", function(err,buf)
  {
    console.log(buf.toString());
  })
}

function spotify (inputs)
{
var spotify = new Spotify({
  id:process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});

if(!inputs)
{
  inputs = "The Sign"
}
spotify.search({type:"track", query: inputs},function(err,data)
{
  if(err)
  {
    console.log("Error" + err);
    return;
  }

  var songInfo = data.tracks.items;
  console.log("Artist(s): " + songInfo[0].artists[0].name);
  console.log ("Song Name: "+ songInfo[0].name);
  console.log("Preview Link: " + songInfo[0].prewiew_url);
  console.log("Album: " + songInfo[0].album.name)

})
}

