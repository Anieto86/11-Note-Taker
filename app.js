// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");
let bodyParser = require("body-parser");

let app = express();
let PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true })); // esto para decodificar el formaot URL 
app.use(express.json()); // Esto lo convierte en JSON 


// middlewares 
//they can modify your request before it gets to your handlers
//it's like a pipeline, the request will move through those middlewares and they can optionally modify the request object


//GET method route
app.get('/notes', function (req, res) {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes/', function(req, res){
  filePath = __dirname + '/db/db.json'; 
  fs.readFile(filePath, function(err, json) {
    if (err) { throw err} 
    res.send(JSON.parse(json))  // va a mandar el JSON parse que es el arran en db.jason
  })

});

app.get('/index', function(req, res){
  res.json("index")
});


// POST method route, send the data in JSON format 
app.post('/api/notes/', function (req, res) {
  var note = req.body;
  let idPath = __dirname + '/db/id.js'
  var newId;

  fs.readFile(idPath, function(err, id) {
    newId = Number(id) + 1 // genera el ID para la nota guardada
    fs.writeFile(idPath, newId, function(err) {
      if (err) { throw err }
    })
  })




  let filePath = __dirname + '/db/db.json';

  fs.readFile(filePath, function(err, json) { // 
    var array = JSON.parse(json)
    note.id = (newId)
    array.push(note)
    fs.writeFile(filePath, JSON.stringify(array), function(err) {
      if (err) { throw err }
      res.status(200).json({
        message: "File successfully written"
      })
    })
  })
  
});



//Delete
app.delete('/api/notes/:id', function (req, res) {

  let noteId = req.params.id;
  let filePath = __dirname + '/db/db.json';
  
  fs.readFile(filePath, function(err, json) {
    var array = JSON.parse(json)
    console.log(array, 'array before filter')
    const newArray = array.filter(element => {
      return element.id !== Number(noteId)})
    console.log(newArray, 'this is after filter')
    
    fs.writeFile(filePath, JSON.stringify(newArray), function(err) {
      if (err) { throw err }
      res.status(200).json({
        message: "File successfully written"
      });
    });
  });

    
  });



//Listener
app.listen(PORT, function () {
  console.log('Server started on port ' + PORT);
});