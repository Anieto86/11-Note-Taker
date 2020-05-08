// Dependencies
const express = require ("express");
const path = require ("path");
const fs = require ("fs");
let bodyParser = require ("body-parser"); 

let app = express();
let PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public/'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
  // res.sendFile(path.join(__dirname, '/db/db.json'))
  //   res.send('welcome');
});
app.get('/api/notes/', function(req, res){
res.sendFile(path.join(__dirname, '/public/notes.html'))
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
  })
//Listener
app.listen(PORT, function() {
  console.log('Server started on port ' + PORT);
});