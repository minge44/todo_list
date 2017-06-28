var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');

var app = express();
const todoList = [];

app.engine('mustache', mustacheExpress());

// const data = { todos: [
//   {
//     task: 'walk the dog',
//     status: false
//   },
//   {
//     task: 'clean house',
//     status: false
//   },
//   {
//     task: 'wash the car',
//     status: false
//   }
// ]}
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static('./public'));

app.get('/', function(req, res){
  res.render('index', {todoList: todoList});
  console.log(todoList);
});

app.post('/', function(req, res){

    req.checkBody("item", "You must enter a new task!").notEmpty();

    let errors = req.validationErrors();

    if (errors) {
    res.render('index', {errors: errors});
    } else {
      let todo = {
        'item': req.body.item,
        'checked': ""
      };
        todoList.push(todo);
        console.log(todo);
        res.render('index', {todoList: todoList});
    }

  });


  app.listen(3000, function(){
  console.log('Started express application!')
  });
