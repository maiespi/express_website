var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

app.set('views', path.join(__dirname, 'views'));  // need to tell Jade which folder the template files will be in, 'views'
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));  // lets us declare the static file that holds all of our stylesheets and public information

app.get('/', function(req, res){
  res.render('index', {title:'Welcome'});   // renders the index view
});

app.get('/about', function(req, res){
  res.render('about');   // renders the about view
});

app.get('/contact', function(req, res){
  res.render('contact');   // renders the contact view
});

app.post('/contact/send', function(req, res){
  // console.log('Test');
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'password'
    }
  });

  var mailOptions = {
    from: 'John Smith <johnsmith12345@test.com>',
    to: 'johnsmith54321@test.com',
    subject: 'Website Submission',
    text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
		html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
  }

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.redirect('/');
    } else {
      console.log('Message Sent: '+info.response);
      res.redirect('/');
    }
  });
});

app.listen(3000);
console.log('Server is running on port 3000...');
