// Dependencies
const express = require ("express");
const path = require ("path");
const fs = require ("fs");
let bodyParser = require ("body-parser"); 

let app = express();
let PORT = process.env.PORT || 3000;

// middlewares 
//they can modify your request before it gets to your handlers
//it's like a pipeline, the request will move through those middlewares and they can optionally modify the request object

app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true })); // esto para decodificar el formaot URL 
app.use(express.json()); // Esto lo convierte en JSON 

//GET method route
app.get('/notes', function (req, res){
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes/', function(req, res){
  filePath = __dirname + '/db/db.json'; 
  fs.readFile(filePath, function(err, json) {
    if (err) { throw err} 
    res.send(JSON.parse(json))  // va a mandar el JSON parse que es el array en db.json  //se the JSON to db.jason
  })
});

app.get('/index', function(req, res){
    res.json("index")
});
// POST method route, send the data in JSON format 
app.post('/api/notes/', function (req, res) {
  console.log('llega hasta 1')
  

  var note = req.body;

  filePath = __dirname + '/db/db.json';
  fs.appendFile(filePath, JSON.stringify(note), function(err) {
		if (err) { throw err }
		res.status(200).json({
			message: "File successfully written"
    })
  })
});



//Delete
app.delete('/api/notes/:id', function (req, res) {
    res.send('DELETE request to homepage')
    //req.query
  });
//Listener
app.listen(PORT, function() {
  console.log('Server started on port ' + PORT);
});