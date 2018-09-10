const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


var app = express();
hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');
app.use(express.static(__dirname + '/public'));
hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear();
})

app.use((req,res,next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} : ${req.url}`;

  fs.appendFile('server.log',log + '\n',(error) => {
    if (error) {
      console.log('Unable to append in server.log');
    }
  });
next();
});


// app.use((req,res) => {
//   res.render('maintainence.hbs')
// })

app.get('/',(req,res) => {
  res.render('home.hbs',{
    pageTitle:'Home Page',
    welcomeMessage:'Welcome to Express App'
  });
});

app.get('/about',(req,res) => {
  res.render('about.hbs',{
    pageTitle:'About Page'
  });
});

app.get('/projects',(req,res) => {
  res.render('projects.hbs',{
    pageTitle:'Portfolio Page',
    welcomeMessage: 'https://github.com/sammy2511'
  });
});

app.listen(port);
