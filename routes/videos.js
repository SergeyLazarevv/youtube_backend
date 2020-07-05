let videoGet = require('../api/youtubeVideosGetApi');
var express = require('express');
var router = express.Router();
let fs = require("fs");

/* GET users listing. */
router.get('/', function(req, res) {
  //reading data file...
  fs.readFile("data.txt", "utf8", function(error,data){ 
    if (error) {
      console.log('read file error')
      //if error, get data fom youtube api
      videoGet().then(function(data) {
        console.log(data)
        //send data to client...
        res.send(data);
        //...and save data in data.txt
        fs.writeFile("data.txt", JSON.stringify(data), function(){
          console.log('data file creating...')
        });
      })
    }
    if (data) {
      //sending data to client from data.txt file
      console.log('data from data.txt read successfully')
      res.send(data);
    }
});
});

module.exports = router;
