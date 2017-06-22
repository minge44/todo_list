var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

// Create app
var app = express();
const data = {
  "walk dog": false,
  "homework": false,
  "go shopping": false,
}
var output = ("{{walk dog}} {{homework}} {{go shopping}}");
console.log(output);

// Set app to use bodyParser()` middleware.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//'extended: false' parses strings and arrays.
//'extended: true' parses nested objects
//'expressValidator' must come after 'bodyParser', since data must be parsed first!
app.use(expressValidator());

app.get('/', function(req, res){
  // Set 'action' to '/'

  var html = '<form action="/" method="post">' +
             '<h1>To Do List</h1>' +
             '<input type="text" name="todo" placeholder="add a to do" />' +
             '<button type="submit">Add todo</button>' +
        '</form>';
  res.send(html);
});

// Receives data from form (action='/')
// 'req.body' now contains form data.
app.post('/', function(req, res){
  //Call req.checkBody function.
    //Pass inputs to validate.
    //Tell middleware which validators to apply (chain one or more).
    req.checkBody("todo", "You must enter a new task!").notEmpty();


    var errors = req.validationErrors();
    if (errors) {
      // Render validation error messages
      var html = errors;
      res.send(html);
    } else {
      var todo = req.body.todo;
      var html = '<p>Your user name is:' + todo + '</p>';


      res.send(html);
    }
  });

  app.listen(3000, function(){
  console.log('Started express application!')
  });
