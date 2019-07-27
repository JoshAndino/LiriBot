require("dotenv").config();
var axios = require("axios");

//var
var keys = require("./keys.js");
var fs = require("fs");
var moment = require("moment");

var Spotify = require("node-spotify-api");


var action = process.argv[2]
var inputs = process.argv.slice(3).join(" ")

console.log(process.argv)
console.log(inputs)



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
    doIt();
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
for (var i = 0; i < response.data.length; i++)
{
  var date = response.data[i].datetime;
  var formatDate = moment(date).format("MM-DD-YYYY")
  // console.log(response)
  console.log("Artist: " + artist )
  console.log("Venue: " + response.data[i].venue.name)
  console.log("Location: " + response.data[i].venue.country)
  console.log("Date: " + formatDate + " Rock on \n");
}
    //  console.log(" Upcoming Events ");
    //  console.log("Artist: " + artist )
    //  console.log("Venue: " + response.data[0].venue.name)
    //  console.log("Location: " + response.data[0].venue.country)
    //  console.log("Date: " + formatDate + " Rock on");
      

    }
    )
  
  }



function doIt()
{
  fs.readFile("random.txt", "utf-8", function(err,buf)
  {
    console.log(buf.toString());
  })
}

function spotify ()
{
var spotify = new Spotify(keys.spotify);

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

  for (var i = 0; i < songInfo.length; i++) {

    console.log("Artist(s): " + songInfo[i].artists[0].name);
    console.log ("Song Name: "+ songInfo[i].name);
    console.log("Preview Link: " + songInfo[i].preview_url);
    console.log("Album: " + songInfo[i].album.name + '\n')
  }

})
}