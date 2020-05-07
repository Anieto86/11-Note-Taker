// Dependencies
const express = require ("express");
const path = require ("path");
const fs = require ("fs");
let bodyParser = require ("body-parser"); 



let app = express();
let PORT = 3000;


//Data


    let characters = [{
        routeName: "yoda",
        name: "Yoda",
        role: "Jedi Master",
        age: 900,
        forcePoints: 2000
      }, {
        routeName: "darthmaul",
        name: "Darth Maul",
        role: "Sith Lord",
        age: 200,
        forcePoints: 1200
      }, {
        routeName: "obiwankenobi",
        name: "Obi Wan Kenobi",
        role: "Jedi Knight",
        age: 60,
        forcePoints: 1350
      }];






//GET method route
app.get('/', function (req, res){
    res.send("Welcome");
});
app.get('/api/notes', function(req, res){
    res.json("notes")
});
app.get('/index', function(req, res){
    res.json("index")
});


// POST method route
app.post('/api/notes', function (req, res) {
    res.send('POST request to the homepage');

    //req.body
  });



//Delete
app.delete('/api/notes/:id', function (req, res) {
    res.send('DELETE request to homepage')

    //req.query
  })




//Listener
var PORT = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server started on port ' + port;
})









