require("dotenv").config();
var axios = require("axios");

//var
var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");
var moment = require("moment");

var Spotify = require("node-spotify-api");


var action = process.argv[2]
var inputs = process.argv.slice(3).join(' ')
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
        console.log("/n_Movie Info_ " + "Title:" + "Release Year: " + response.data.Year + "Rating" + response.data.Rated + "Country "+ response.data.Country + "Language:" + response.data.Language + "Plot:" + response.data.Plot + "Actors" + response.data.Actors);
      });
  }



 
// function concert(artist)
// { 
//   var concertUrl = "https://rest.bandsintown.com/artists" + artist + "/events?app_id=codingbootcamp";
  

//   axios.get(concertUrl).then(function(response)
//     {
//      console.log(" Upcoming Events");
//      console.log("Artist: " + artist + "Venue: " + response.data[0].venue.name +"Location:" + response.data[0].venue.country +  "Date:" + response.data[0].datatime + "Rock on");
//     })
  
//   }
// function concert(inputs)
// {
//     var queryUrl = "https://rest.bandsintown.com/artists" + inputs + "/events?app_id=codingbootcamp";

//     request(queryUrl,function(error,response, body)
//     {

//         var results = JSON.parse(body)[0];
//         if(!error && response.statusCode === 200)
//         {
//           console.log("City:" + results.venue.city);
//           console.log("Venue Name:" + results.venue.name);
//           console.log("Date of Event:" + moment(results.datatime).format("MM/DD/YYYY"));
//         }
//     });
// };

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

