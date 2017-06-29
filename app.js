var express = require('express');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');
const path = require('path');
const models = require('./models');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(express.static('./public'));

app.get('/', function(req, res){
  models.task.findAll().then(function(tasks){

  res.render('index',{task: tasks})
    })
});

app.post('/', function(req, res){

  const task = models.task.build({
    task: req.body.task,
    // iscompleted: req.body.iscompleted
  }).save().then(() => {});
    res.redirect('/');
});





  app.listen(3000, function(){
  console.log('Started express application!')
  });
