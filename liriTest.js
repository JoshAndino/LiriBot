require("dotenv").config();
var axios = require("axios");

//var
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var moment = require("moment");

var Spotify = require("node-spotify-api");


var action = process.argv[2]
var inputs = process.argv[3]
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

function movie (movieName)
  {
    if(!movieName)
    {
      movieName = "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + inputs + "&y=&plot=short&apikey=trilogy";
      axios.get(queryUrl).then(function(response){
        if(!movieName){
          movieName = "Mr.Nobody";
        }
        console.log("\n_Movie Info_" + "\nTitle:" + response.data.Title + "\nRelease Year: " + response.data.Year + "\nRating" + response.data.Rated + "\nCountry "+ response.data.Country + "\nLanguage:" + response.data.Language + "\nPlot:" + response.data.Plot + "\nActors:" + response.data.Actors);
      });
  }



 
function concert(artist)
{ 
  var concertUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

  axios.get(concertUrl).then(function 
    (response) {
    console.log(response)
     console.log(" Upcoming Events");
     console.log("Artist: " + artist )
     console.log("Venue: " + response.data[0].venue.name)
     console.log("Location:" + response.data[0].venue.country)
     console.log("Date:" + response.data[0].datatime + "Rock on");
    }
    )
  
  }



function doIt(inputs)
{
  fs.readFile("random.txt", "utf-8", function(err,buf)
  {
    console.log(buf.toString());
  })
}

function spotify ()
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