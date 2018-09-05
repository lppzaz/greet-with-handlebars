'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const greetMe = require('./greet');
const PORT = process.env.PORT || 3100;

app.use(express.static('public'));
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        // 'formattedDate': function () {
        //     return moment(this.billTime).fromNow();
        // }
    }
}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
const greeter = greetMe()

// home route
app.get('/', function (req, res) {
    var context = {
        counter: greeter.counter()
    }
    res.render('home', context)
});

//greet route
app.post ('/greet', function(req,res){
    let name = req.body.name;
    let lang = req.body.Language;

    res.render('home',{
        greeting: greeter.greetMe(name,lang),
        counter: greeter.counter()
    })
});

app.get('/reset', function(req,res){
    greeter.clear()
    res.redirect("/")
});

app.listen(PORT, function () {
    console.log('INITIATING LAUNCH SEQUENCE IN 3,2,1 ON LOCAL PORT', PORT);
});